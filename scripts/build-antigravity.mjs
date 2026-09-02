#!/usr/bin/env node
// build-antigravity.mjs
//
// Spike: transform the RampStack claude-skills catalog into an
// Antigravity-compatible distribution under dist/antigravity/.agents/skills/.
//
// Antigravity discovers skills on-demand from .agents/skills/<name>/SKILL.md by
// matching the `description` frontmatter field. It only needs a well-formed
// frontmatter block with `name` and `description`. This build keeps that
// portable core and moves every other Claude/RampStack frontmatter key into a
// per-skill sidecar so the transform is lossless and reversible.
//
// Dependency-free. Built-in fs/path only. Frontmatter is parsed by hand.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '..');
const SRC_SKILLS = path.join(REPO_ROOT, 'skills');
const OUT_ROOT = path.join(REPO_ROOT, 'dist', 'antigravity');
const OUT_SKILLS = path.join(OUT_ROOT, '.agents', 'skills');

// Frontmatter keys that Antigravity needs. Everything else is sidecar'd.
const PORTABLE_KEYS = ['name', 'description'];

// ---------------------------------------------------------------------------
// Tiny helpers
// ---------------------------------------------------------------------------

function listDirs(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

// Recursively copy a directory tree byte-for-byte. Returns count of files copied.
function copyTree(srcDir, destDir) {
  let count = 0;
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const srcPath = path.join(srcDir, entry.name);
    const destPath = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      count += copyTree(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
      count += 1;
    }
  }
  return count;
}

// Remove a directory tree if it exists (idempotent rebuilds).
function rmTree(dir) {
  fs.rmSync(dir, { recursive: true, force: true });
}

// Strip a single layer of matching surrounding quotes from a YAML scalar.
function unquote(value) {
  const v = value.trim();
  if (v.length >= 2) {
    const first = v[0];
    const last = v[v.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return v.slice(1, -1);
    }
  }
  return v;
}

// Split a SKILL.md into { frontmatterLines, body }. Throws if no valid block.
function splitFrontmatter(raw, label) {
  // Normalize to LF for parsing; we only emit our own frontmatter lines.
  const text = raw.replace(/\r\n/g, '\n');
  const lines = text.split('\n');
  if (lines[0].trim() !== '---') {
    throw new Error(`${label}: missing opening --- frontmatter delimiter`);
  }
  let close = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      close = i;
      break;
    }
  }
  if (close === -1) {
    throw new Error(`${label}: missing closing --- frontmatter delimiter`);
  }
  return {
    frontmatterLines: lines.slice(1, close),
    body: lines.slice(close + 1).join('\n'),
  };
}

// Parse simple `key: value` YAML lines into ordered [key, rawValue] pairs.
// Good enough for this catalog: flat scalars, no nested maps or block lists.
function parseFrontmatter(frontmatterLines, label) {
  const pairs = [];
  for (const line of frontmatterLines) {
    if (line.trim() === '') continue;
    const m = line.match(/^([A-Za-z0-9_-]+):\s?(.*)$/);
    if (!m) {
      throw new Error(`${label}: unparseable frontmatter line: ${line}`);
    }
    pairs.push([m[1], m[2]]);
  }
  return pairs;
}

// Emit a YAML scalar value, quoting defensively when needed.
function emitScalar(value) {
  const v = unquote(value);
  // Quote if it contains characters that would confuse a naive YAML reader,
  // or leading/trailing whitespace. Use double quotes, escaping embedded ones.
  const needsQuote = /[:#"']/.test(v) || v !== v.trim() || v === '';
  if (!needsQuote) return v;
  return '"' + v.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
}

// List every file under a root as sorted, posix-style relative paths.
function listFilesRel(root) {
  const out = [];
  const walk = (rel) => {
    const full = path.join(root, rel);
    for (const e of fs.readdirSync(full, { withFileTypes: true }).sort((a, b) => (a.name < b.name ? -1 : 1))) {
      const r = rel ? rel + '/' + e.name : e.name;
      if (e.isDirectory()) walk(r);
      else if (e.isFile()) out.push(r);
    }
  };
  if (fs.existsSync(root)) walk('');
  return out.sort();
}

// Diff two directory trees byte-for-byte. Returns differing relative paths,
// each tagged with the reason (only-in-A, only-in-B, content-differs).
function diffTrees(aRoot, bRoot) {
  const a = new Set(listFilesRel(aRoot));
  const b = new Set(listFilesRel(bRoot));
  const diffs = [];
  for (const p of a) {
    if (!b.has(p)) {
      diffs.push({ path: p, reason: 'only in ' + aRoot });
    } else if (!fs.readFileSync(path.join(aRoot, p)).equals(fs.readFileSync(path.join(bRoot, p)))) {
      diffs.push({ path: p, reason: 'content differs' });
    }
  }
  for (const p of b) {
    if (!a.has(p)) diffs.push({ path: p, reason: 'only in ' + bRoot });
  }
  return diffs.sort((x, y) => (x.path < y.path ? -1 : 1));
}

// Create a fresh, unique temp dir without importing node:os (env-resolved base).
let tempCounter = 0;
function makeTempDir(suffix) {
  const base = process.env.TMPDIR || process.env.TEMP || process.env.TMP || REPO_ROOT;
  const dir = path.join(base, `ag-build-${process.pid}-${tempCounter++}-${suffix}`);
  rmTree(dir);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

// Transform the catalog into <outRoot>/.agents/skills. Pure: no console output,
// no timestamps, no randomness, so two runs yield byte-identical trees.
function build(outRoot) {
  if (!fs.existsSync(SRC_SKILLS)) {
    throw new Error(`source skills dir not found: ${SRC_SKILLS}`);
  }

  const outSkills = path.join(outRoot, '.agents', 'skills');
  // Fresh output tree each run.
  rmTree(outSkills);
  fs.mkdirSync(outSkills, { recursive: true });

  const skillNames = listDirs(SRC_SKILLS);
  const report = [];
  let totalRefFiles = 0;

  for (const name of skillNames) {
    const srcDir = path.join(SRC_SKILLS, name);
    const srcSkillMd = path.join(srcDir, 'SKILL.md');
    if (!fs.existsSync(srcSkillMd)) {
      throw new Error(`${name}: no SKILL.md found, refusing to emit`);
    }

    const destDir = path.join(outSkills, name);
    fs.mkdirSync(destDir, { recursive: true });

    // 1. Copy references/ subtree byte-for-byte (recursive, preserves nesting).
    let refFiles = 0;
    const srcRefs = path.join(srcDir, 'references');
    if (fs.existsSync(srcRefs)) {
      refFiles = copyTree(srcRefs, path.join(destDir, 'references'));
    }
    totalRefFiles += refFiles;

    // 2. Parse + normalize frontmatter.
    const raw = fs.readFileSync(srcSkillMd, 'utf8');
    const { frontmatterLines, body } = splitFrontmatter(raw, name);
    const pairs = parseFrontmatter(frontmatterLines, name);

    const core = new Map();
    const extras = [];
    for (const [key, value] of pairs) {
      if (PORTABLE_KEYS.includes(key)) {
        core.set(key, value);
      } else {
        extras.push([key, value]);
      }
    }

    // Guarantee the fields Antigravity requires are present and non-empty.
    for (const key of PORTABLE_KEYS) {
      const val = core.has(key) ? unquote(core.get(key)) : '';
      if (val === '') {
        throw new Error(`${name}: required frontmatter field '${key}' missing or empty`);
      }
    }

    // 3. Write sidecar of extras (if any) into references/.
    let sidecarKeys = [];
    if (extras.length > 0) {
      const refDir = path.join(destDir, 'references');
      fs.mkdirSync(refDir, { recursive: true });
      const sidecarPath = path.join(refDir, '_claude-frontmatter-extras.yaml');
      const header = [
        '# Frontmatter keys carried over from the source Claude/RampStack',
        '# SKILL.md that Antigravity does not use. Preserved here so the port',
        '# is lossless and reversible. Not read by Antigravity.',
      ].join('\n');
      const lines = extras.map(([k, v]) => `${k}: ${emitScalar(v)}`);
      fs.writeFileSync(sidecarPath, header + '\n' + lines.join('\n') + '\n', 'utf8');
      sidecarKeys = extras.map(([k]) => k);
    }

    // 4. Emit normalized SKILL.md: clean frontmatter + untouched body.
    const fmOut = ['---'];
    for (const key of PORTABLE_KEYS) {
      fmOut.push(`${key}: ${emitScalar(core.get(key))}`);
    }
    fmOut.push('---');
    // Re-attach the body verbatim. `body` is the text starting at the first
    // line AFTER the closing ---, so we add back the newline that terminated
    // the --- line to preserve the original spacing (incl. a leading blank).
    const out = fmOut.join('\n') + '\n' + body;
    fs.writeFileSync(path.join(destDir, 'SKILL.md'), out, 'utf8');

    report.push({ name, refFiles, sidecarKeys });
  }

  // Taxonomy: every entry is on-demand procedural knowledge -> Antigravity Skill.
  const taxonomy = {
    Skills: skillNames.length,
    Rules: 0,
    Workflows: 0,
  };

  return { report, totalRefFiles, taxonomy, outSkills };
}

// ---------------------------------------------------------------------------
// Reporting + checks
// ---------------------------------------------------------------------------

function printTransformLog(res) {
  console.log('Antigravity build');
  console.log('=================');
  console.log(`source:      ${path.relative(REPO_ROOT, SRC_SKILLS)}`);
  console.log(`destination: ${path.relative(REPO_ROOT, OUT_SKILLS)}`);
  console.log('');
  console.log(`skills copied:        ${res.report.length}`);
  console.log(`reference files copied: ${res.totalRefFiles}`);
  console.log('');
  console.log('Per-skill frontmatter keys moved to sidecar:');
  for (const r of res.report) {
    const keys = r.sidecarKeys.length ? r.sidecarKeys.join(', ') : '(none)';
    console.log(`  ${r.name.padEnd(40)} refs=${String(r.refFiles).padStart(3)}  sidecar: ${keys}`);
  }
  console.log('');
  console.log('Taxonomy classification (Antigravity):');
  console.log(`  Skills:    ${res.taxonomy.Skills}  (on-demand, matched by description)`);
  console.log(`  Rules:     ${res.taxonomy.Rules}  (always-on guardrails)`);
  console.log(`  Workflows: ${res.taxonomy.Workflows}  (slash-triggered macros)`);
}

// Build twice into separate temp dirs and assert byte-identical output.
// Returns true on PASS. Sets process.exitCode on FAIL.
function checkDeterminism() {
  const a = makeTempDir('det-a');
  const b = makeTempDir('det-b');
  try {
    build(a);
    build(b);
    const diffs = diffTrees(path.join(a, '.agents', 'skills'), path.join(b, '.agents', 'skills'));
    console.log('Check - determinism (two builds byte-identical):');
    if (diffs.length === 0) {
      console.log('  PASS');
      return true;
    }
    console.log(`  FAIL: ${diffs.length} differing path(s):`);
    for (const d of diffs.slice(0, 20)) console.log(`    ${d.path} (${d.reason})`);
    process.exitCode = 1;
    return false;
  } finally {
    rmTree(a);
    rmTree(b);
  }
}

// Rebuild into a temp dir and diff against the committed dist/antigravity tree.
// Staleness guard: fails (nonzero exit) if committed output has drifted from
// what the current source + build produce.
function checkDrift() {
  const t = makeTempDir('check');
  try {
    build(t);
    const diffs = diffTrees(path.join(t, '.agents', 'skills'), OUT_SKILLS);
    console.log('Check - committed dist matches a fresh build (--check):');
    if (diffs.length === 0) {
      console.log('  PASS');
      return true;
    }
    console.log(`  FAIL: ${diffs.length} differing path(s) vs committed dist:`);
    for (const d of diffs.slice(0, 50)) console.log(`    ${d.path} (${d.reason})`);
    if (diffs.length > 50) console.log(`    ... and ${diffs.length - 50} more`);
    return false;
  } finally {
    rmTree(t);
  }
}

// ---------------------------------------------------------------------------
// Description-discrimination audit (HEURISTIC, not a runtime trigger test)
// ---------------------------------------------------------------------------
//
// Antigravity decides whether to load a skill by matching the live task against
// each skill's `description`. We cannot run that matcher here, so this is a
// best-effort proxy: token-overlap scoring of a few fixed prompts against the
// emitted descriptions, plus static lint of the descriptions themselves. Treat
// every number below as a smoke signal, not a guarantee of runtime behavior.

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'this', 'that', 'use', 'when', 'whenever',
  'your', 'you', 'are', 'was', 'has', 'have', 'will', 'from', 'into', 'out',
  'how', 'what', 'who', 'why', 'can', 'our', 'their', 'they', 'them', 'its',
  'about', 'also', 'any', 'all', 'not', 'but', 'get', 'got', 'want', 'need',
  'wants', 'needs', 'skill', 'triggers', 'trigger', 'using', 'used', 'over',
  'than', 'then', 'some', 'such', 'these', 'those', 'each', 'even', 'more',
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter((t) => t.length >= 3 && !STOPWORDS.has(t));
}

function readEmittedDescriptions() {
  const skills = [];
  for (const name of listDirs(OUT_SKILLS)) {
    const p = path.join(OUT_SKILLS, name, 'SKILL.md');
    const raw = fs.readFileSync(p, 'utf8');
    const { frontmatterLines } = splitFrontmatter(raw, name);
    const pairs = parseFrontmatter(frontmatterLines, name);
    const fm = Object.fromEntries(pairs.map(([k, v]) => [k, unquote(v)]));
    skills.push({ name, description: fm.description || '' });
  }
  return skills;
}

function firstSentence(desc) {
  const m = desc.match(/^(.*?[.!?])(\s|$)/);
  return (m ? m[1] : desc).trim().toLowerCase();
}

// Static lint of every description.
function lintDescriptions(skills) {
  const cueRe = /\buse (this|when|to|for|it)\b|\btrigger(s)?\b|\buse this skill\b/i;
  const flags = { short: [], noCue: [], dupExact: [], dupFirstSentence: [] };

  const byDesc = new Map();
  const byFirst = new Map();
  for (const s of skills) {
    const d = s.description.trim();
    if (d.length < 40) flags.short.push({ name: s.name, len: d.length });
    if (!cueRe.test(d)) flags.noCue.push({ name: s.name });
    const dk = d.toLowerCase();
    byDesc.set(dk, (byDesc.get(dk) || []).concat(s.name));
    const fk = firstSentence(d);
    byFirst.set(fk, (byFirst.get(fk) || []).concat(s.name));
  }
  for (const [, names] of byDesc) if (names.length > 1) flags.dupExact.push(names);
  for (const [, names] of byFirst) if (names.length > 1) flags.dupFirstSentence.push(names);
  return flags;
}

// Fixture prompts. Expected targets are derived from skill names, not tuned.
const FIXTURE = [
  { prompt: 'write a creative brief to kick off a new website project', expected: 'creative-brief' },
  { prompt: 'optimize the on-page SEO of my landing page: title tags, headers, internal links', expected: 'seo-onpage' },
  { prompt: 'pick a brand archetype and build a brand personality system', expected: 'brand-archetype-system' },
  { prompt: 'run a WCAG accessibility audit and give me a remediation plan', expected: 'accessibility-audit' },
  { prompt: 'review my web app code for security bugs before merging this PR', expected: 'code-review-web' },
  { prompt: 'set up feature flags for a gradual rollout with targeting rules', expected: 'feature-flagging' },
  { prompt: 'design a multi step onboarding wizard for new users', expected: 'onboarding-wizard-design' },
  { prompt: 'improve my Core Web Vitals and reduce page load time', expected: 'performance-optimization' },
];

function scorePrompt(promptTokens, skill) {
  // Score = count of distinct prompt tokens that appear in the skill's
  // description or name token bag. Simple overlap; deliberately crude.
  const bag = new Set([...tokenize(skill.description), ...tokenize(skill.name)]);
  let score = 0;
  for (const t of new Set(promptTokens)) if (bag.has(t)) score += 1;
  return score;
}

function rankFixture(skills) {
  return FIXTURE.map((f) => {
    const ptokens = tokenize(f.prompt);
    const ranked = skills
      .map((s) => ({ name: s.name, score: scorePrompt(ptokens, s) }))
      .sort((a, b) => (b.score - a.score) || (a.name < b.name ? -1 : 1));
    const pos = ranked.findIndex((r) => r.name === f.expected) + 1;
    return {
      prompt: f.prompt,
      expected: f.expected,
      rank: pos,
      inTop3: pos >= 1 && pos <= 3,
      top3: ranked.slice(0, 3),
    };
  });
}

function buildAuditDoc() {
  const skills = readEmittedDescriptions();
  const lint = lintDescriptions(skills);
  const ranked = rankFixture(skills);
  const lowConfidence = ranked.filter((r) => !r.inTop3 || r.rank !== 1);

  const L = [];
  L.push('# Skill discovery audit (heuristic)');
  L.push('');
  L.push('> HEURISTIC, NOT A RUNTIME TEST. Antigravity selects skills by matching');
  L.push('> the live task against each skill `description` with its own (unknown to');
  L.push('> us) matcher. This report approximates that with crude token-overlap');
  L.push('> scoring and static lint. Every result here is a smoke signal only; the');
  L.push('> authoritative check is the owner running the skills live in Antigravity.');
  L.push('');
  L.push(`Skills audited: **${skills.length}**. Method: lowercase, strip punctuation,`);
  L.push('drop short/stop words, then count distinct prompt tokens that appear in a');
  L.push("skill's description-plus-name token bag. Top 3 by score is the proxy for");
  L.push('"would Antigravity surface this skill for this prompt".');
  L.push('');
  L.push('## Fixture prompts vs expected skill');
  L.push('');
  L.push('| Prompt | Expected skill | Rank | In top 3? | Top 3 (skill:score) |');
  L.push('| --- | --- | --- | --- | --- |');
  for (const r of ranked) {
    const top = r.top3.map((t) => `${t.name}:${t.score}`).join(', ');
    const rank = r.rank === 0 ? 'not ranked' : `#${r.rank}`;
    L.push(`| ${r.prompt} | \`${r.expected}\` | ${rank} | ${r.inTop3 ? 'yes' : 'NO'} | ${top} |`);
  }
  L.push('');
  const hits = ranked.filter((r) => r.inTop3).length;
  const exact = ranked.filter((r) => r.rank === 1).length;
  L.push(`Summary: expected skill in top 3 for **${hits}/${ranked.length}** prompts; ` +
    `ranked #1 for **${exact}/${ranked.length}**.`);
  L.push('');
  L.push('## Low-confidence prompts');
  L.push('');
  L.push('Prompts where the expected skill was not the single top match. Not');
  L.push('necessarily a defect: token overlap is blunt and several skills share');
  L.push('vocabulary. Listed so the owner can spot-check these in Antigravity.');
  L.push('');
  if (lowConfidence.length === 0) {
    L.push('_None: every fixture prompt ranked its expected skill #1._');
  } else {
    for (const r of lowConfidence) {
      const rank = r.rank === 0 ? 'not ranked' : `#${r.rank}`;
      L.push(`- "${r.prompt}" -> expected \`${r.expected}\` at ${rank}. ` +
        `Top match was \`${r.top3[0].name}\` (score ${r.top3[0].score}).`);
    }
  }
  L.push('');
  L.push('## Flagged descriptions (static lint)');
  L.push('');
  L.push(`- Under ~40 chars: ${lint.short.length === 0 ? 'none' :
    lint.short.map((s) => `\`${s.name}\` (${s.len})`).join(', ')}`);
  L.push(`- Missing an explicit use cue (no "use this/when/to/for" or "trigger"): ` +
    `${lint.noCue.length === 0 ? 'none' : lint.noCue.map((s) => `\`${s.name}\``).join(', ')}`);
  L.push(`- Identical full descriptions: ${lint.dupExact.length === 0 ? 'none' :
    lint.dupExact.map((g) => g.join(' = ')).join('; ')}`);
  L.push(`- Identical first sentence: ${lint.dupFirstSentence.length === 0 ? 'none' :
    lint.dupFirstSentence.map((g) => g.join(' = ')).join('; ')}`);
  L.push('');
  L.push('Note: a missing explicit "use" cue is not automatically a problem if the');
  L.push('description is otherwise specific and keyword-rich, but cue phrasing tends');
  L.push('to help description-matching engines. Flagged for owner review only.');
  L.push('');

  const outPath = path.join(OUT_ROOT, 'SKILL_DISCOVERY_AUDIT.md');
  fs.writeFileSync(outPath, L.join('\n'), 'utf8');

  // Console summary.
  console.log('Description-discrimination audit (heuristic):');
  console.log(`  skills audited:        ${skills.length}`);
  console.log(`  fixture top-3 hits:    ${hits}/${ranked.length}`);
  console.log(`  fixture ranked #1:     ${exact}/${ranked.length}`);
  console.log(`  short descriptions:    ${lint.short.length}`);
  console.log(`  missing use cue:       ${lint.noCue.length}`);
  console.log(`  duplicate full desc:   ${lint.dupExact.length}`);
  console.log(`  duplicate 1st sentence:${lint.dupFirstSentence.length}`);
  console.log(`  wrote: ${path.relative(REPO_ROOT, outPath)}`);
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);

if (args.includes('--check')) {
  // Drift guard only. Does not modify the committed tree.
  const ok = checkDrift();
  process.exit(ok ? 0 : 1);
} else if (args.includes('--audit')) {
  // Regenerate the heuristic discovery audit from the committed dist.
  buildAuditDoc();
} else {
  // Normal build: regenerate dist, log the transform, then self-test determinism.
  const res = build(OUT_ROOT);
  printTransformLog(res);
  console.log('');
  checkDeterminism();
}
