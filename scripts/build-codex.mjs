// build-codex.mjs
//
// Spike build step: produce a Codex-compatible distribution of the claude-skills
// catalog under dist/codex/.
//
// What it does:
//   1. Walks every skills/<name>/ directory.
//   2. Copies each skill into dist/codex/.agents/skills/<name>/, preserving the
//      references/ subtree byte for byte.
//   3. Normalizes SKILL.md frontmatter to the portable core (name + description
//      only). Every other key is moved into a per-skill sidecar at
//      references/_claude-frontmatter-extras.yaml so the change is reversible.
//   4. Leaves the SKILL.md body untouched.
//   5. Detects MCP references and emits dist/codex/agents/openai.yaml as a
//      commented template (no fabricated server config).
//   6. Prints a transform log, then runs a validation pass (PASS/FAIL per check).
//
// Dependency free. Node ESM, built-in fs + path only. Frontmatter is parsed by
// hand (simple key: value YAML between --- delimiters).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SRC_SKILLS = path.join(REPO_ROOT, 'skills');
const OUT_ROOT = path.join(REPO_ROOT, 'dist', 'codex');
const OUT_SKILLS = path.join(OUT_ROOT, '.agents', 'skills');
const OUT_AGENTS = path.join(OUT_ROOT, 'agents');

// Portable core: the only frontmatter keys Codex skills keep.
const CORE_KEYS = new Set(['name', 'description']);

// Recognized MCP server names to detect in skill bodies. Curated so generic
// phrases ("the MCP", "hosted MCP") do not produce noise. Match is on
// "<name> MCP" / "<name> mcp" appearing in the text.
const KNOWN_MCPS = [
  'Ahrefs',
  'Similarweb',
  'Chrome',
  'Playwright',
  'Linear',
  'GitHub',
  'Windows',
];

const SIDECAR_NAME = '_claude-frontmatter-extras.yaml';

// ---------------------------------------------------------------------------
// Frontmatter parsing (by hand)
// ---------------------------------------------------------------------------

// Returns { front, body, raw } where `front` is the raw text between the two
// --- delimiters and `body` is everything after the closing delimiter. Returns
// null if the file does not open with a frontmatter block.
function splitFrontmatter(raw) {
  const m = raw.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/);
  if (!m) return null;
  return { front: m[1], body: raw.slice(m[0].length) };
}

// Parse a frontmatter block into ordered entries. Each entry keeps the raw
// source lines so kept/sidecar'd keys can be re-emitted without lossy
// re-serialization. A line that does not start a new "key:" is treated as a
// continuation of the previous key (defensive against wrapped values).
function parseEntries(front) {
  const lines = front.split(/\r?\n/);
  const entries = [];
  let current = null;
  const keyRe = /^([A-Za-z0-9_-]+):/;
  for (const line of lines) {
    const km = line.match(keyRe);
    if (km) {
      current = { key: km[1], lines: [line] };
      entries.push(current);
    } else if (current) {
      current.lines.push(line);
    } else {
      // Stray leading line before any key. Park it under a synthetic key so it
      // is preserved in the sidecar rather than silently dropped.
      current = { key: '_preamble', lines: [line] };
      entries.push(current);
    }
  }
  return entries;
}

// Extract the scalar value of a key entry (strips quotes, for validation only).
function entryValue(entry) {
  const first = entry.lines[0];
  const idx = first.indexOf(':');
  let v = first.slice(idx + 1).trim();
  const extra = entry.lines.slice(1).join('\n').trim();
  if (extra) v = (v + ' ' + extra).trim();
  if (
    (v.startsWith('"') && v.endsWith('"') && v.length > 1) ||
    (v.startsWith("'") && v.endsWith("'") && v.length > 1)
  ) {
    v = v.slice(1, -1);
  }
  return v;
}

// ---------------------------------------------------------------------------
// Filesystem helpers
// ---------------------------------------------------------------------------

function listSkillDirs() {
  return fs
    .readdirSync(SRC_SKILLS, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

// List every file under a directory, returned as paths relative to that dir.
function listFilesRel(dir) {
  const out = [];
  function walk(cur, rel) {
    for (const ent of fs.readdirSync(cur, { withFileTypes: true })) {
      const abs = path.join(cur, ent.name);
      const r = rel ? path.posix.join(rel, ent.name) : ent.name;
      if (ent.isDirectory()) walk(abs, r);
      else out.push(r);
    }
  }
  if (fs.existsSync(dir)) walk(dir, '');
  return out.sort();
}

function detectMcps(text) {
  const found = new Set();
  for (const name of KNOWN_MCPS) {
    const re = new RegExp('\\b' + name + '\\s+MCP\\b', 'i');
    if (re.test(text)) found.add(name);
  }
  const mentionsMcp = /\bMCP\b/.test(text);
  return { named: [...found].sort(), mentionsMcp };
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function build() {
  // Clean only our own output subtrees so the build is idempotent. PORT_NOTES.md
  // and README.md (written separately) are left in place.
  fs.rmSync(path.join(OUT_ROOT, '.agents'), { recursive: true, force: true });
  fs.rmSync(OUT_AGENTS, { recursive: true, force: true });
  fs.mkdirSync(OUT_SKILLS, { recursive: true });

  const skills = listSkillDirs();
  const log = {
    skillsCopied: 0,
    refFilesCopied: 0,
    perSkillExtras: {},
    mcpRefs: {},
  };

  for (const name of skills) {
    const srcDir = path.join(SRC_SKILLS, name);
    const destDir = path.join(OUT_SKILLS, name);

    // 2. Copy the whole skill dir byte for byte (preserves references subtree
    //    including nested folders).
    fs.cpSync(srcDir, destDir, { recursive: true });
    log.skillsCopied += 1;

    // 3. Normalize frontmatter on the emitted SKILL.md.
    const srcSkillMd = path.join(srcDir, 'SKILL.md');
    const raw = fs.readFileSync(srcSkillMd, 'utf8');
    const split = splitFrontmatter(raw);
    if (!split) {
      throw new Error('No frontmatter block found in ' + srcSkillMd);
    }
    const entries = parseEntries(split.front);
    const kept = entries.filter((e) => CORE_KEYS.has(e.key));
    const extras = entries.filter((e) => !CORE_KEYS.has(e.key));

    const keptText = kept.map((e) => e.lines.join('\n')).join('\n');
    const normalized = '---\n' + keptText + '\n---\n' + split.body;
    fs.writeFileSync(path.join(destDir, 'SKILL.md'), normalized);

    // Sidecar the extras into references/ so the change is reversible.
    const refDir = path.join(destDir, 'references');
    fs.mkdirSync(refDir, { recursive: true });
    const extraKeys = extras.map((e) => e.key);
    const sidecarLines = [
      '# Frontmatter keys removed from SKILL.md during the Codex port.',
      '# These are Claude catalog metadata that Codex does not consume.',
      '# To reverse the port, merge these keys back into the SKILL.md',
      '# frontmatter block (between the --- delimiters).',
      '# Source skill: ' + name,
      '',
    ];
    for (const e of extras) sidecarLines.push(...e.lines);
    sidecarLines.push('');
    fs.writeFileSync(path.join(refDir, SIDECAR_NAME), sidecarLines.join('\n'));

    log.perSkillExtras[name] = extraKeys;

    // 5. Detect MCP references (scan the full source SKILL.md text).
    const mcp = detectMcps(raw);
    if (mcp.mentionsMcp || mcp.named.length) {
      log.mcpRefs[name] = mcp;
    }

    // Count emitted reference files (source ref files, excludes our sidecar).
    log.refFilesCopied += listFilesRel(path.join(srcDir, 'references')).length;
  }

  emitOpenAiTemplate(log.mcpRefs);
  printTransformLog(skills, log);
  return { skills, log };
}

// 5. Emit the commented MCP template. No real server config is fabricated.
function emitOpenAiTemplate(mcpRefs) {
  fs.mkdirSync(OUT_AGENTS, { recursive: true });

  // Aggregate: named server -> sorted list of skills referencing it.
  const byServer = {};
  const genericOnly = [];
  for (const [skill, info] of Object.entries(mcpRefs)) {
    if (info.named.length === 0) {
      genericOnly.push(skill);
      continue;
    }
    for (const server of info.named) {
      (byServer[server] ||= []).push(skill);
    }
  }
  for (const k of Object.keys(byServer)) byServer[k].sort();
  genericOnly.sort();

  const lines = [];
  lines.push('# openai.yaml - MCP wiring template (Codex distribution)');
  lines.push('#');
  lines.push('# This is a COMMENTED TEMPLATE, not a working config. The skills');
  lines.push('# in this distribution reference the MCP servers listed below.');
  lines.push('# An operator must fill in the real server url / name / auth for');
  lines.push('# each server they want to enable, then uncomment the block.');
  lines.push('#');
  lines.push('# No real server endpoints or credentials are shipped here on');
  lines.push('# purpose: those are environment specific and must be supplied by');
  lines.push('# the operator.');
  lines.push('#');
  lines.push('# Detected MCP servers and the skills that reference them:');
  if (Object.keys(byServer).length === 0) {
    lines.push('#   (none detected by name)');
  }
  for (const [server, skills] of Object.entries(byServer).sort()) {
    lines.push('#');
    lines.push('#   ' + server + ' MCP  (' + skills.length + ' skill(s))');
    for (const s of skills) lines.push('#     - ' + s);
  }
  if (genericOnly.length) {
    lines.push('#');
    lines.push('#   Generic / unnamed MCP references (operator review needed):');
    for (const s of genericOnly) lines.push('#     - ' + s);
  }
  lines.push('#');
  lines.push('# The Ahrefs MCP is the key dependency: it powers the entire SEO');
  lines.push('# audit suite. Without it those skills degrade to manual guidance.');
  lines.push('#');
  lines.push('# ---------------------------------------------------------------');
  lines.push('# Uncomment and complete one block per server you enable:');
  lines.push('#');
  lines.push('# mcp_servers:');
  for (const server of Object.keys(byServer).sort()) {
    const key = server.toLowerCase();
    lines.push('#   ' + key + ':');
    lines.push('#     name: "' + server + ' MCP"          # operator: display name');
    lines.push('#     url: "<FILL IN server url>"        # operator: MCP server endpoint');
    lines.push('#     transport: "<sse|stdio|http>"      # operator: transport type');
    lines.push('#     # auth: configure credentials per your environment');
    lines.push('#');
  }
  fs.writeFileSync(path.join(OUT_AGENTS, 'openai.yaml'), lines.join('\n') + '\n');
}

function printTransformLog(skills, log) {
  console.log('=== Codex build: transform log ===');
  console.log('Skills copied:        ' + log.skillsCopied);
  console.log('Reference files copied: ' + log.refFilesCopied);
  console.log('');
  console.log('Frontmatter keys sidecar\'d per skill:');
  for (const name of skills) {
    console.log('  ' + name + ': [' + log.perSkillExtras[name].join(', ') + ']');
  }
  console.log('');
  console.log('MCP references detected (' + Object.keys(log.mcpRefs).length + ' skills):');
  for (const [name, info] of Object.entries(log.mcpRefs).sort()) {
    const named = info.named.length ? info.named.join(', ') : '(generic MCP mention)';
    console.log('  ' + name + ': ' + named);
  }
  console.log('');
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validate(srcSkills) {
  console.log('=== Codex build: validation ===');
  const results = [];

  // Check A: every emitted SKILL.md has non-empty name + description.
  const emitted = fs.existsSync(OUT_SKILLS)
    ? fs.readdirSync(OUT_SKILLS, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()
    : [];
  const badMeta = [];
  for (const name of emitted) {
    const p = path.join(OUT_SKILLS, name, 'SKILL.md');
    const split = splitFrontmatter(fs.readFileSync(p, 'utf8'));
    if (!split) {
      badMeta.push(name + ' (no frontmatter)');
      continue;
    }
    const entries = parseEntries(split.front);
    const map = {};
    for (const e of entries) map[e.key] = entryValue(e);
    if (!map.name || !map.name.trim()) badMeta.push(name + ' (empty name)');
    else if (!map.description || !map.description.trim()) badMeta.push(name + ' (empty description)');
  }
  results.push({
    name: 'A. every emitted SKILL.md has non-empty name + description',
    ok: badMeta.length === 0,
    detail: badMeta.length ? 'offenders: ' + badMeta.join('; ') : emitted.length + ' skills ok',
  });

  // Check B: emitted skill count equals source skill count.
  results.push({
    name: 'B. emitted skill count equals source skill count',
    ok: emitted.length === srcSkills.length,
    detail: 'source=' + srcSkills.length + ' emitted=' + emitted.length,
  });

  // Check C: every source references file has a counterpart in the emitted skill.
  const missing = [];
  for (const name of srcSkills) {
    const srcRefs = listFilesRel(path.join(SRC_SKILLS, name, 'references'));
    for (const rel of srcRefs) {
      const dest = path.join(OUT_SKILLS, name, 'references', rel);
      if (!fs.existsSync(dest)) missing.push(name + '/references/' + rel);
    }
  }
  results.push({
    name: 'C. every source references file has an emitted counterpart',
    ok: missing.length === 0,
    detail: missing.length ? missing.length + ' missing: ' + missing.slice(0, 5).join(', ') : 'all reference files present',
  });

  // Check D: no emitted frontmatter contains keys other than name / description.
  const dirty = [];
  for (const name of emitted) {
    const p = path.join(OUT_SKILLS, name, 'SKILL.md');
    const split = splitFrontmatter(fs.readFileSync(p, 'utf8'));
    if (!split) continue;
    const keys = parseEntries(split.front).map((e) => e.key);
    const extra = keys.filter((k) => !CORE_KEYS.has(k));
    if (extra.length) dirty.push(name + ': [' + extra.join(', ') + ']');
  }
  results.push({
    name: 'D. no emitted frontmatter has keys beyond name / description',
    ok: dirty.length === 0,
    detail: dirty.length ? 'offenders: ' + dirty.join('; ') : 'all frontmatter clean',
  });

  let allOk = true;
  for (const r of results) {
    const tag = r.ok ? 'PASS' : 'FAIL';
    if (!r.ok) allOk = false;
    console.log('[' + tag + '] ' + r.name + ' -- ' + r.detail);
  }
  console.log('');
  console.log(allOk ? 'ALL CHECKS PASSED' : 'ONE OR MORE CHECKS FAILED');
  return allOk;
}

// ---------------------------------------------------------------------------

function main() {
  const { skills } = build();
  const ok = validate(skills);
  if (!ok) process.exitCode = 1;
}

main();
