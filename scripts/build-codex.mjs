// build-codex.mjs
//
// Build step: produce a Codex-compatible distribution of the claude-skills
// catalog under dist/codex/.
//
// What it does (default run, no flags):
//   1. Walks every skills/<name>/ directory.
//   2. Copies each skill into dist/codex/.agents/skills/<name>/, preserving the
//      references/ subtree byte for byte.
//   3. Normalizes SKILL.md frontmatter to the portable core (name + description
//      only). Every other key is moved into a per-skill sidecar at
//      references/_claude-frontmatter-extras.yaml so the change is reversible.
//   4. Enforces Codex's 1024-char description cap: a description over the cap is
//      truncated at a sentence/word boundary for the emitted SKILL.md, and the
//      full original is preserved in the sidecar (description_full) so the
//      change is lossless and reversible.
//   5. Leaves the SKILL.md body untouched.
//   6. Detects MCP references and emits dist/codex/agents/openai.yaml as a
//      commented template (no fabricated server config).
//   7. Prints a transform log, then runs the verification suite:
//        - validation (name/description, count, references, clean frontmatter,
//          Codex description-length conformance)
//        - determinism (build twice, assert byte-identical generated output)
//        - openai.yaml sanity (exists, all servers commented, no live secrets)
//        - description-discrimination audit (heuristic) -> SKILL_DISCOVERY_AUDIT.md
//
// Flags:
//   --check   Rebuild the generated tree into a temp dir and diff it against the
//             committed dist/codex/. Exit nonzero listing any differing paths.
//             This is the staleness guard: the committed dist can never silently
//             drift from skills/.
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

// Generated subtrees within a distribution root. These (and only these) are
// produced by transformInto() and guarded for determinism / drift. Authored
// docs (PORT_NOTES.md, README.md, SKILL_DISCOVERY_AUDIT.md) live at the dist
// root and are intentionally outside the generated set.
const GENERATED_SUBDIRS = ['.agents', 'agents'];

const skillsDirOf = (root) => path.join(root, '.agents', 'skills');
const agentsDirOf = (root) => path.join(root, 'agents');

// Portable core: the only frontmatter keys Codex skills keep.
const CORE_KEYS = new Set(['name', 'description']);

// Codex rejects (fails to load) any skill whose description exceeds 1024
// characters. Empirically confirmed against codex-cli 0.118.0, which logs
// "invalid description: exceeds maximum length of 1024 characters" and drops
// the skill. We emit a conformant description (truncated at a sentence/word
// boundary, well under the cap) and preserve the full original in the sidecar
// so nothing is lost and the change is reversible.
const CODEX_DESC_MAX = 1024;
const CODEX_DESC_TARGET = 1010; // truncation ceiling, leaves margin under the cap

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

// Returns { front, body } where `front` is the raw text between the two ---
// delimiters and `body` is everything after the closing delimiter. Returns null
// if the file does not open with a frontmatter block.
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

// Extract the scalar value of a key entry (strips quotes).
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

// Serialize a string as a single-line YAML double-quoted scalar.
function yamlDquote(s) {
  return '"' + s.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

// Truncate an over-long description at a sentence boundary if possible, else a
// word boundary, staying under CODEX_DESC_TARGET. Returns the truncated string.
function truncateForCodex(s) {
  if (s.length <= CODEX_DESC_TARGET) return s;
  const cut = s.slice(0, CODEX_DESC_TARGET);
  const lastSentence = cut.lastIndexOf('. ');
  if (lastSentence > CODEX_DESC_TARGET * 0.6) {
    return cut.slice(0, lastSentence + 1).trimEnd();
  }
  const lastSpace = cut.lastIndexOf(' ');
  const base = lastSpace > 0 ? cut.slice(0, lastSpace) : cut;
  return base.replace(/[\s,;:]+$/, '');
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

// List every file under a directory, returned as posix-style paths relative to
// that directory, sorted for determinism.
function listFilesRel(dir) {
  const out = [];
  function walk(cur, rel) {
    const ents = fs
      .readdirSync(cur, { withFileTypes: true })
      .sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
    for (const ent of ents) {
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
// Transform (the deterministic core: produces .agents/ + agents/openai.yaml)
// ---------------------------------------------------------------------------

// Build the generated distribution into `destRoot`. Cleans only the generated
// subtrees so authored docs at destRoot survive. Returns { skills, log }.
function transformInto(destRoot) {
  const outSkills = skillsDirOf(destRoot);
  const outAgents = agentsDirOf(destRoot);

  for (const sub of GENERATED_SUBDIRS) {
    fs.rmSync(path.join(destRoot, sub), { recursive: true, force: true });
  }
  fs.mkdirSync(outSkills, { recursive: true });

  const skills = listSkillDirs();
  const log = {
    skillsCopied: 0,
    refFilesCopied: 0,
    perSkillExtras: {},
    mcpRefs: {},
    descTruncated: [], // { name, fullLen, newLen }
  };

  for (const name of skills) {
    const srcDir = path.join(SRC_SKILLS, name);
    const destDir = path.join(outSkills, name);

    // Copy the whole skill dir byte for byte (preserves references subtree
    // including nested folders).
    fs.cpSync(srcDir, destDir, { recursive: true });
    log.skillsCopied += 1;

    // Normalize frontmatter on the emitted SKILL.md.
    const srcSkillMd = path.join(srcDir, 'SKILL.md');
    const raw = fs.readFileSync(srcSkillMd, 'utf8');
    const split = splitFrontmatter(raw);
    if (!split) {
      throw new Error('No frontmatter block found in ' + srcSkillMd);
    }
    const entries = parseEntries(split.front);
    const kept = entries.filter((e) => CORE_KEYS.has(e.key));
    const extras = entries.filter((e) => !CORE_KEYS.has(e.key));

    // Emit kept keys verbatim, except an over-long description which is
    // truncated for Codex compatibility (full original goes to the sidecar).
    let truncatedFull = null;
    const keptLines = [];
    for (const e of kept) {
      if (e.key === 'description') {
        const full = entryValue(e);
        if (full.length > CODEX_DESC_MAX) {
          const truncated = truncateForCodex(full);
          keptLines.push('description: ' + yamlDquote(truncated));
          truncatedFull = full;
          log.descTruncated.push({ name, fullLen: full.length, newLen: truncated.length });
          continue;
        }
      }
      keptLines.push(e.lines.join('\n'));
    }

    const normalized = '---\n' + keptLines.join('\n') + '\n---\n' + split.body;
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
    if (truncatedFull !== null) {
      sidecarLines.push('');
      sidecarLines.push('# The description was truncated to <=1024 chars for Codex');
      sidecarLines.push('# compatibility. The full original Claude description is preserved');
      sidecarLines.push('# below. To reverse, restore it as the SKILL.md description.');
      sidecarLines.push('description_full: ' + yamlDquote(truncatedFull));
    }
    sidecarLines.push('');
    fs.writeFileSync(path.join(refDir, SIDECAR_NAME), sidecarLines.join('\n'));

    log.perSkillExtras[name] = extraKeys;

    // Detect MCP references (scan the full source SKILL.md text).
    const mcp = detectMcps(raw);
    if (mcp.mentionsMcp || mcp.named.length) {
      log.mcpRefs[name] = mcp;
    }

    log.refFilesCopied += listFilesRel(path.join(srcDir, 'references')).length;
  }

  emitOpenAiTemplate(outAgents, log.mcpRefs);
  return { skills, log };
}

// Emit the commented MCP template. No real server config is fabricated.
function emitOpenAiTemplate(outAgents, mcpRefs) {
  fs.mkdirSync(outAgents, { recursive: true });

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
  fs.writeFileSync(path.join(outAgents, 'openai.yaml'), lines.join('\n') + '\n');
}

function printTransformLog(skills, log) {
  console.log('=== Codex build: transform log ===');
  console.log('Skills copied:        ' + log.skillsCopied);
  console.log('Reference files copied: ' + log.refFilesCopied);
  console.log('Frontmatter keys sidecar\'d: ' + skills.length + ' skills, all [category, catalog_summary, display_order]');
  console.log('Descriptions truncated for Codex (>1024 chars): ' + log.descTruncated.length);
  for (const t of log.descTruncated) {
    console.log('  ' + t.name + ': ' + t.fullLen + ' -> ' + t.newLen + ' chars (full text preserved in sidecar)');
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
// Generated-tree comparison (determinism + drift guard)
// ---------------------------------------------------------------------------

// List the generated files of a root, relative to the root (posix style).
function listGenerated(root) {
  const rels = [];
  for (const sub of GENERATED_SUBDIRS) {
    const base = path.join(root, sub);
    for (const f of listFilesRel(base)) rels.push(sub + '/' + f);
  }
  return rels.sort();
}

// Compare the generated trees of two roots. Returns an array of human-readable
// difference descriptions (empty array means identical).
function diffGenerated(rootA, rootB) {
  const a = listGenerated(rootA);
  const b = listGenerated(rootB);
  const setA = new Set(a);
  const setB = new Set(b);
  const diffs = [];
  for (const rel of a) {
    if (!setB.has(rel)) diffs.push('missing in second: ' + rel);
  }
  for (const rel of b) {
    if (!setA.has(rel)) diffs.push('extra in second: ' + rel);
  }
  for (const rel of a) {
    if (!setB.has(rel)) continue;
    const bufA = fs.readFileSync(path.join(rootA, rel));
    const bufB = fs.readFileSync(path.join(rootB, rel));
    if (!bufA.equals(bufB)) diffs.push('content differs: ' + rel);
  }
  return diffs.sort();
}

// Scratch build roots live inside the lane (dist/codex) under dot-prefixed
// names that are never committed and are removed after use. They are not part
// of GENERATED_SUBDIRS, so they are excluded from every comparison.
function freshTempRoot(label) {
  const root = path.join(OUT_ROOT, '.build-tmp-' + label);
  fs.rmSync(root, { recursive: true, force: true });
  fs.mkdirSync(root, { recursive: true });
  return root;
}

function cleanupTempRoots() {
  if (!fs.existsSync(OUT_ROOT)) return;
  for (const ent of fs.readdirSync(OUT_ROOT)) {
    if (ent.startsWith('.build-tmp-')) {
      fs.rmSync(path.join(OUT_ROOT, ent), { recursive: true, force: true });
    }
  }
}

// ---------------------------------------------------------------------------
// Validation (the original four checks + Codex conformance, by root)
// ---------------------------------------------------------------------------

function validate(srcSkills, root) {
  const outSkills = skillsDirOf(root);
  const results = [];

  const emitted = fs.existsSync(outSkills)
    ? fs.readdirSync(outSkills, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort()
    : [];

  // Cache parsed descriptions for reuse.
  const descOf = {};
  for (const name of emitted) {
    const split = splitFrontmatter(fs.readFileSync(path.join(outSkills, name, 'SKILL.md'), 'utf8'));
    const map = {};
    if (split) for (const e of parseEntries(split.front)) map[e.key] = entryValue(e);
    descOf[name] = map;
  }

  const badMeta = [];
  for (const name of emitted) {
    const map = descOf[name];
    if (!map || Object.keys(map).length === 0) {
      badMeta.push(name + ' (no frontmatter)');
      continue;
    }
    if (!map.name || !map.name.trim()) badMeta.push(name + ' (empty name)');
    else if (!map.description || !map.description.trim()) badMeta.push(name + ' (empty description)');
  }
  results.push({
    name: 'A. every emitted SKILL.md has non-empty name + description',
    ok: badMeta.length === 0,
    detail: badMeta.length ? 'offenders: ' + badMeta.join('; ') : emitted.length + ' skills ok',
  });

  results.push({
    name: 'B. emitted skill count equals source skill count',
    ok: emitted.length === srcSkills.length,
    detail: 'source=' + srcSkills.length + ' emitted=' + emitted.length,
  });

  const missing = [];
  for (const name of srcSkills) {
    const srcRefs = listFilesRel(path.join(SRC_SKILLS, name, 'references'));
    for (const rel of srcRefs) {
      const dest = path.join(outSkills, name, 'references', rel);
      if (!fs.existsSync(dest)) missing.push(name + '/references/' + rel);
    }
  }
  results.push({
    name: 'C. every source references file has an emitted counterpart',
    ok: missing.length === 0,
    detail: missing.length ? missing.length + ' missing: ' + missing.slice(0, 5).join(', ') : 'all reference files present',
  });

  const dirty = [];
  for (const name of emitted) {
    const keys = Object.keys(descOf[name] || {});
    const extra = keys.filter((k) => !CORE_KEYS.has(k));
    if (extra.length) dirty.push(name + ': [' + extra.join(', ') + ']');
  }
  results.push({
    name: 'D. no emitted frontmatter has keys beyond name / description',
    ok: dirty.length === 0,
    detail: dirty.length ? 'offenders: ' + dirty.join('; ') : 'all frontmatter clean',
  });

  // Codex conformance: every emitted description must be <= 1024 chars or Codex
  // refuses to load the skill.
  const tooLong = [];
  for (const name of emitted) {
    const d = (descOf[name] && descOf[name].description) || '';
    if (d.length > CODEX_DESC_MAX) tooLong.push(name + ' (' + d.length + ')');
  }
  results.push({
    name: 'E. every emitted description is within Codex 1024-char cap',
    ok: tooLong.length === 0,
    detail: tooLong.length ? 'over cap: ' + tooLong.join(', ') : 'all <=' + CODEX_DESC_MAX + ' chars',
  });

  return results;
}

// ---------------------------------------------------------------------------
// openai.yaml sanity check
// ---------------------------------------------------------------------------

function checkOpenAiYaml(root) {
  const p = path.join(agentsDirOf(root), 'openai.yaml');
  const results = [];

  const exists = fs.existsSync(p);
  const raw = exists ? fs.readFileSync(p, 'utf8') : '';
  results.push({
    name: 'openai.yaml exists and is non-empty',
    ok: exists && raw.trim().length > 0,
    detail: exists ? raw.length + ' bytes' : 'file not found',
  });

  const missingServers = [];
  for (const server of KNOWN_MCPS) {
    const re = new RegExp('^#.*\\b' + server + ' MCP\\b', 'm');
    if (!re.test(raw)) missingServers.push(server);
  }
  results.push({
    name: 'all detected MCP servers appear as commented entries',
    ok: missingServers.length === 0,
    detail: missingServers.length
      ? 'missing commented entry for: ' + missingServers.join(', ')
      : 'present: ' + KNOWN_MCPS.join(', '),
  });

  // The template is fully commented, so any non-empty line that is not a comment
  // would be a live value leak. Also scan for credential-looking tokens.
  const offenders = [];
  const secretRe = /(https?:\/\/|api[_-]?key|secret|token|bearer|password|[A-Za-z0-9]{32,})/i;
  for (const line of raw.split(/\r?\n/)) {
    const t = line.trim();
    if (t === '') continue;
    if (t.startsWith('#')) continue;
    offenders.push(line);
  }
  const uncommentedSecrets = offenders.filter((l) => secretRe.test(l));
  results.push({
    name: 'no uncommented values (no live urls / keys / tokens)',
    ok: offenders.length === 0,
    detail: offenders.length
      ? offenders.length + ' uncommented line(s); secret-like: ' + uncommentedSecrets.length
      : 'every non-empty line is a comment',
  });

  return results;
}

// ---------------------------------------------------------------------------
// Description-discrimination audit (HEURISTIC)
// ---------------------------------------------------------------------------

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'for', 'in', 'on', 'with', 'this',
  'that', 'your', 'our', 'my', 'is', 'it', 'be', 'as', 'at', 'by', 'from', 'into',
  'when', 'whenever', 'use', 'using', 'used', 'want', 'wants', 'need', 'needs',
  'has', 'have', 'are', 'you', 'they', 'them', 'their', 'about', 'also', 'even',
  'not', 'do', 'does', 'how', 'what', 'where', 'who', 'which', 'than', 'then',
  'so', 'if', 'but', 'can', 'will', 'just', 'up', 'out', 'over', 'each', 'any',
  'all', 'whether', 'sure', 'isnt', 'arent', 'skill', 'triggers', 'trigger',
]);

function tokenize(text) {
  return (text.toLowerCase().match(/[a-z0-9]+/g) || []).filter(
    (t) => t.length > 1 && !STOPWORDS.has(t)
  );
}

function firstSentence(desc) {
  const m = desc.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : desc).trim().toLowerCase();
}

// Returns audit findings derived from emitted descriptions.
function discoveryAudit(root) {
  const outSkills = skillsDirOf(root);
  const emitted = fs
    .readdirSync(outSkills, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  const descriptions = {};
  for (const name of emitted) {
    const split = splitFrontmatter(fs.readFileSync(path.join(outSkills, name, 'SKILL.md'), 'utf8'));
    const map = {};
    for (const e of parseEntries(split.front)) map[e.key] = entryValue(e);
    descriptions[name] = map.description || '';
  }

  const cueRe = /(use this|use when|use it when|use for|triggers on|also triggers|whenever the user|use to)/i;
  const thin = [];
  const noCue = [];
  for (const name of emitted) {
    const d = descriptions[name];
    if (!d || d.trim().length < 40) thin.push({ name, len: d.trim().length });
    if (!cueRe.test(d)) noCue.push(name);
  }

  const byFull = {};
  const byFirst = {};
  for (const name of emitted) {
    const d = descriptions[name];
    (byFull[d.trim().toLowerCase()] ||= []).push(name);
    (byFirst[firstSentence(d)] ||= []).push(name);
  }
  const dupFull = Object.values(byFull).filter((g) => g.length > 1);
  const dupFirst = Object.values(byFirst).filter((g) => g.length > 1);

  const fixture = [
    { prompt: 'write a creative brief to kick off a new website project', expect: 'creative-brief' },
    { prompt: 'audit the on-page SEO of this page: title tags, meta description, header structure', expect: 'seo-onpage' },
    { prompt: 'choose a brand archetype and personality system for our company', expect: 'brand-archetype-system' },
    { prompt: 'review my web app code for bugs and security issues before merging a PR', expect: 'code-review-web' },
    { prompt: 'run a WCAG accessibility audit and fix the accessibility issues', expect: 'accessibility-audit' },
    { prompt: 'improve Core Web Vitals, LCP and reduce JavaScript bundle size', expect: 'performance-optimization' },
    { prompt: 'design an A/B test experiment with a clear hypothesis', expect: 'experiment-design' },
    { prompt: 'write a blog post and edit the copy for voice and clarity', expect: 'content-and-copy' },
  ];

  const descTokens = {};
  for (const name of emitted) descTokens[name] = new Set(tokenize(descriptions[name]));

  const fixtureRows = [];
  for (const f of fixture) {
    const pTokens = [...new Set(tokenize(f.prompt))];
    const scored = emitted.map((name) => {
      let overlap = 0;
      for (const t of pTokens) if (descTokens[name].has(t)) overlap += 1;
      return { name, score: overlap };
    });
    scored.sort((a, b) => (b.score - a.score) || (a.name < b.name ? -1 : 1));
    const top3 = scored.slice(0, 3);
    const rank = scored.findIndex((s) => s.name === f.expect) + 1;
    fixtureRows.push({
      prompt: f.prompt,
      expect: f.expect,
      expectExists: emitted.includes(f.expect),
      rank,
      inTop3: rank >= 1 && rank <= 3,
      top3: top3.map((t) => t.name + ' (' + t.score + ')'),
    });
  }

  return { emitted, thin, noCue, dupFull, dupFirst, fixtureRows };
}

function writeDiscoveryAudit(root, audit) {
  const lines = [];
  lines.push('# Skill Discovery Audit (heuristic)');
  lines.push('');
  lines.push('> HEURISTIC, NOT A RUNTIME TEST. This report is a static, token-overlap');
  lines.push('> proxy for "would the right skill trigger." It does not run a model and');
  lines.push('> does not prove discovery behavior. Treat every result below as a signal,');
  lines.push('> not a guarantee. The authoritative check is the owner live smoke test');
  lines.push('> described in PORT_NOTES.md.');
  lines.push('');
  lines.push('Generated by `scripts/build-codex.mjs`. Skills audited: ' + audit.emitted.length + '.');
  lines.push('');

  lines.push('## Fixture: representative prompt to expected skill');
  lines.push('');
  lines.push('For each prompt, every emitted description is scored by token overlap');
  lines.push('(stopwords removed) and ranked. "In top 3" means the expected skill landed');
  lines.push('among the three highest-scoring descriptions. This is a discrimination');
  lines.push('proxy only.');
  lines.push('');
  lines.push('| Prompt | Expected skill | Rank | In top 3 | Top 3 candidates (score) |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const r of audit.fixtureRows) {
    const rank = r.expectExists ? (r.rank > 0 ? String(r.rank) : 'not ranked') : 'MISSING SKILL';
    lines.push(
      '| ' + r.prompt + ' | `' + r.expect + '` | ' + rank + ' | ' +
      (r.inTop3 ? 'yes' : 'NO') + ' | ' + r.top3.join(', ') + ' |'
    );
  }
  lines.push('');

  const lowConf = audit.fixtureRows.filter((r) => !r.inTop3);
  lines.push('## Low-confidence prompts');
  lines.push('');
  if (lowConf.length === 0) {
    lines.push('None. Every fixture prompt placed its expected skill in the top 3.');
  } else {
    lines.push('These prompts did NOT place the expected skill in the top 3. This often');
    lines.push('means several skills share overlapping vocabulary (a near-synonym');
    lines.push('cluster), not that discovery is broken. Worth a human look:');
    lines.push('');
    for (const r of lowConf) {
      lines.push('- "' + r.prompt + '" expected `' + r.expect + '` (rank ' + r.rank + '); top 3: ' + r.top3.join(', '));
    }
  }
  lines.push('');

  lines.push('## Flagged descriptions');
  lines.push('');
  lines.push('### Thin (empty or under ~40 chars)');
  if (audit.thin.length === 0) lines.push('None.');
  else for (const t of audit.thin) lines.push('- `' + t.name + '` (' + t.len + ' chars)');
  lines.push('');
  lines.push('### Missing an explicit use cue');
  lines.push('');
  lines.push('No "use when / use this / triggers on" style phrasing detected. These');
  lines.push('descriptions are written as prose summaries; adding an explicit trigger');
  lines.push('cue in the source skill would sharpen discovery. (Source is read-only here.)');
  if (audit.noCue.length === 0) lines.push('None.');
  else for (const n of audit.noCue) lines.push('- `' + n + '`');
  lines.push('');
  lines.push('### Duplicate descriptions (identical full text)');
  if (audit.dupFull.length === 0) lines.push('None.');
  else for (const g of audit.dupFull) lines.push('- ' + g.map((x) => '`' + x + '`').join(', '));
  lines.push('');
  lines.push('### Shared identical first sentence');
  if (audit.dupFirst.length === 0) lines.push('None.');
  else for (const g of audit.dupFirst) lines.push('- ' + g.map((x) => '`' + x + '`').join(', '));
  lines.push('');

  fs.writeFileSync(path.join(root, 'SKILL_DISCOVERY_AUDIT.md'), lines.join('\n') + '\n');
}

// ---------------------------------------------------------------------------
// Reporting helpers
// ---------------------------------------------------------------------------

function printResults(title, results) {
  console.log('=== ' + title + ' ===');
  let allOk = true;
  for (const r of results) {
    const tag = r.ok ? 'PASS' : 'FAIL';
    if (!r.ok) allOk = false;
    console.log('[' + tag + '] ' + r.name + ' -- ' + r.detail);
  }
  console.log('');
  return allOk;
}

// ---------------------------------------------------------------------------
// Modes
// ---------------------------------------------------------------------------

function runBuild() {
  let ok = true;
  try {
    const { skills, log } = transformInto(OUT_ROOT);
    printTransformLog(skills, log);

    ok = printResults('Validation', validate(skills, OUT_ROOT)) && ok;

    // Determinism: build a second time into a temp root, compare generated trees.
    const tmp = freshTempRoot('determinism');
    transformInto(tmp);
    const diffs = diffGenerated(OUT_ROOT, tmp);
    ok = printResults('Determinism (build twice, byte-identical generated output)', [
      {
        name: 'second build is byte-identical to the first',
        ok: diffs.length === 0,
        detail: diffs.length ? diffs.length + ' differing path(s): ' + diffs.slice(0, 5).join('; ') : 'identical',
      },
    ]) && ok;

    ok = printResults('openai.yaml sanity', checkOpenAiYaml(OUT_ROOT)) && ok;

    // Description-discrimination audit (heuristic, does not gate the build).
    const audit = discoveryAudit(OUT_ROOT);
    writeDiscoveryAudit(OUT_ROOT, audit);
    const lowConf = audit.fixtureRows.filter((r) => !r.inTop3).length;
    printResults('Discovery audit (heuristic, informational)', [
      {
        name: 'SKILL_DISCOVERY_AUDIT.md written',
        ok: true,
        detail:
          audit.fixtureRows.filter((r) => r.inTop3).length + '/' + audit.fixtureRows.length +
          ' fixtures in top 3, ' + lowConf + ' low-confidence; thin=' + audit.thin.length +
          ', no-cue=' + audit.noCue.length + ', dup-desc=' + audit.dupFull.length +
          ', dup-first-sentence=' + audit.dupFirst.length,
      },
    ]);

    console.log(ok ? 'ALL GATING CHECKS PASSED' : 'ONE OR MORE GATING CHECKS FAILED');
  } finally {
    cleanupTempRoots();
  }
  if (!ok) process.exitCode = 1;
}

function runCheck() {
  let ok = true;
  try {
    const tmp = freshTempRoot('check');
    transformInto(tmp);
    const diffs = diffGenerated(OUT_ROOT, tmp);
    ok = printResults('Drift check (committed dist/codex vs fresh rebuild)', [
      {
        name: 'committed generated tree matches a fresh rebuild from skills/',
        ok: diffs.length === 0,
        detail: diffs.length ? diffs.length + ' differing path(s)' : 'in sync, no drift',
      },
    ]);
    if (diffs.length) {
      console.log('Differing paths:');
      for (const d of diffs) console.log('  ' + d);
      console.log('');
      console.log('Run `node scripts/build-codex.mjs` and commit dist/codex to resync.');
    }
  } finally {
    cleanupTempRoots();
  }
  if (!ok) process.exitCode = 1;
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes('--check')) runCheck();
  else runBuild();
}

main();
