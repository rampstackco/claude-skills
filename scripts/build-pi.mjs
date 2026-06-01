#!/usr/bin/env node
// build-pi.mjs - Build a Pi-compatible distribution of the skills catalog.
//
// Pi (pi.dev, github.com/earendil-works/pi) discovers skills from
// `.agents/skills/<name>/SKILL.md`. Pi accepts arbitrary frontmatter keys,
// so this build copies every source skill directory byte-for-byte into
// dist/pi/.agents/skills/ with native frontmatter preserved intact. No
// trimming, no sidecar (this is the key difference from the Codex and
// Antigravity dists, which trim frontmatter into a sidecar file).
//
// Dependency-free: Node ESM, fs and path only.
//
// Usage:
//   node scripts/build-pi.mjs            Build dist/pi/.agents/skills/
//   node scripts/build-pi.mjs --check    Rebuild to a temp dir and diff
//                                         against committed output; exit
//                                         nonzero if anything differs.
//   node scripts/build-pi.mjs --validate Validate emitted output against
//                                         the Pi skill rules and source.

import {
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  rmSync,
  existsSync,
} from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, relative } from 'path';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = dirname(SCRIPT_DIR);
const SRC_SKILLS = join(REPO_ROOT, 'skills');
const DIST_ROOT = join(REPO_ROOT, 'dist', 'pi');
const DIST_SKILLS = join(DIST_ROOT, '.agents', 'skills');

// --- small fs helpers (sorted, deterministic) --------------------------------

function listDirsSorted(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

// Return all file paths under `dir`, relative to `dir`, sorted. Uses forward
// slashes so output is identical across platforms (determinism).
function listFilesSorted(dir) {
  const out = [];
  function walk(current) {
    const entries = readdirSync(current, { withFileTypes: true });
    for (const e of entries) {
      const full = join(current, e.name);
      if (e.isDirectory()) walk(full);
      else if (e.isFile()) out.push(relative(dir, full).split('\\').join('/'));
    }
  }
  walk(dir);
  return out.sort();
}

function copyFileBytes(srcFile, destFile) {
  mkdirSync(dirname(destFile), { recursive: true });
  // Buffer copy: no encoding transform, byte-for-byte identical.
  writeFileSync(destFile, readFileSync(srcFile));
}

// --- build --------------------------------------------------------------------

// Build the .agents/skills tree under `destSkills`. Returns counts.
function build(destSkills) {
  // Clean target so removed source skills never linger (determinism).
  if (existsSync(destSkills)) rmSync(destSkills, { recursive: true, force: true });
  mkdirSync(destSkills, { recursive: true });

  const skills = listDirsSorted(SRC_SKILLS);
  let referenceFiles = 0;
  let skillFiles = 0;

  for (const name of skills) {
    const srcDir = join(SRC_SKILLS, name);
    const destDir = join(destSkills, name);
    const files = listFilesSorted(srcDir);
    for (const rel of files) {
      copyFileBytes(join(srcDir, rel), join(destDir, rel));
      if (rel === 'SKILL.md') skillFiles++;
      if (rel.startsWith('references/')) referenceFiles++;
    }
  }

  return { skills: skills.length, skillFiles, referenceFiles };
}

// --- check (staleness guard) --------------------------------------------------

function check() {
  const tmp = join(REPO_ROOT, '.pi-check-tmp');
  if (existsSync(tmp)) rmSync(tmp, { recursive: true, force: true });
  const tmpSkills = join(tmp, '.agents', 'skills');
  build(tmpSkills);

  const committed = DIST_SKILLS;
  if (!existsSync(committed)) {
    console.error('FAIL: committed output not found at ' + rel(committed));
    rmSync(tmp, { recursive: true, force: true });
    process.exit(1);
  }

  const freshFiles = new Set(listFilesSorted(tmpSkills));
  const committedFiles = new Set(listFilesSorted(committed));
  const differing = [];

  for (const f of freshFiles) {
    if (!committedFiles.has(f)) {
      differing.push('missing in committed: ' + f);
      continue;
    }
    const a = readFileSync(join(tmpSkills, f));
    const b = readFileSync(join(committed, f));
    if (!a.equals(b)) differing.push('content differs: ' + f);
  }
  for (const f of committedFiles) {
    if (!freshFiles.has(f)) differing.push('stale in committed (no source): ' + f);
  }

  rmSync(tmp, { recursive: true, force: true });

  if (differing.length) {
    console.error('FAIL: committed dist/pi is stale. ' + differing.length + ' difference(s):');
    for (const d of differing) console.error('  ' + d);
    process.exit(1);
  }
  console.log('PASS: committed dist/pi/.agents/skills matches a fresh build (byte-identical).');
}

// --- validate -----------------------------------------------------------------

// Parse the frontmatter block (between the first two `---` lines) into a flat
// map of top-level keys. Quotes are stripped from values for length checks.
function parseFrontmatter(text) {
  const lines = text.split(/\r?\n/);
  if (lines[0].trim() !== '---') return null;
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      end = i;
      break;
    }
  }
  if (end === -1) return null;
  const map = {};
  for (let i = 1; i < end; i++) {
    const line = lines[i];
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s?(.*)$/);
    if (!m) continue;
    let val = m[2].trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    map[m[1]] = val;
  }
  return map;
}

const PI_NAME_RE = /^[a-z0-9-]{1,64}$/;

function validate() {
  const results = [];
  const pass = (label) => results.push(['PASS', label]);
  const fail = (label) => results.push(['FAIL', label]);
  // WARN is reported loudly but does not fail the run. Used where Pi itself
  // only warns (and still loads the skill) and where this build is forbidden
  // from fixing the source (preserve-native frontmatter, no trimming).
  const warn = (label) => results.push(['WARN', label]);

  if (!existsSync(DIST_SKILLS)) {
    console.error('FAIL: ' + rel(DIST_SKILLS) + ' does not exist. Run the build first.');
    process.exit(1);
  }

  const emitted = listDirsSorted(DIST_SKILLS);
  const source = listDirsSorted(SRC_SKILLS);

  // 1. Frontmatter validity + non-empty name/description.
  const badFrontmatter = [];
  const emptyFields = [];
  // 2. Name rules.
  const badNames = [];
  // 3. Description length.
  const longDescriptions = [];

  for (const name of emitted) {
    const text = readFileSync(join(DIST_SKILLS, name, 'SKILL.md'), 'utf8');
    const fm = parseFrontmatter(text);
    if (!fm) {
      badFrontmatter.push(name);
      continue;
    }
    if (!fm.name || !fm.name.trim()) emptyFields.push(name + ' (name)');
    if (!fm.description || !fm.description.trim()) emptyFields.push(name + ' (description)');

    const n = fm.name || '';
    if (!PI_NAME_RE.test(n) || n.includes('--')) badNames.push(name + ' -> "' + n + '"');

    if ((fm.description || '').length > 1024) {
      longDescriptions.push(name + ' (' + fm.description.length + ' chars)');
    }
  }

  if (badFrontmatter.length === 0) pass('Every emitted SKILL.md has valid --- frontmatter');
  else fail('Invalid frontmatter: ' + badFrontmatter.join(', '));

  if (emptyFields.length === 0) pass('Every emitted SKILL.md has non-empty name and description');
  else fail('Empty name/description: ' + emptyFields.join(', '));

  if (badNames.length === 0) pass('Every name conforms to Pi rules (lowercase a-z/0-9/hyphen, <=64, no consecutive hyphens)');
  else fail('Names violating Pi rules (reported, not renamed): ' + badNames.join('; '));

  if (longDescriptions.length === 0) pass('Every description is <= 1024 chars');
  else warn('Descriptions over 1024 chars (Pi loads with a warning; preserved as-is from source, not trimmed): ' + longDescriptions.join(', '));

  // 4. Emitted count equals source.
  if (emitted.length === source.length) pass('Emitted skill count equals source (' + emitted.length + ')');
  else fail('Emitted count ' + emitted.length + ' != source count ' + source.length);

  // 5. Every source references file has an emitted counterpart.
  const missingRefs = [];
  let refTotal = 0;
  for (const name of source) {
    const srcRefDir = join(SRC_SKILLS, name, 'references');
    if (!existsSync(srcRefDir)) continue;
    for (const rf of listFilesSorted(srcRefDir)) {
      refTotal++;
      const counterpart = join(DIST_SKILLS, name, 'references', rf);
      if (!existsSync(counterpart)) missingRefs.push(name + '/references/' + rf);
    }
  }
  if (missingRefs.length === 0) pass('Every source references file has an emitted counterpart (' + refTotal + ' files)');
  else fail('Missing emitted references: ' + missingRefs.join(', '));

  // Report.
  let failed = 0;
  let warned = 0;
  for (const [status, label] of results) {
    console.log(status + ': ' + label);
    if (status === 'FAIL') failed++;
    if (status === 'WARN') warned++;
  }
  console.log('');
  const suffix = warned ? ' (' + warned + ' warning(s))' : '';
  console.log(failed === 0 ? 'VALIDATION PASS' + suffix : 'VALIDATION FAIL (' + failed + ' check(s) failed)');
  if (failed) process.exit(1);
}

function rel(p) {
  return relative(REPO_ROOT, p).split('\\').join('/');
}

// --- entrypoint ---------------------------------------------------------------

const arg = process.argv[2];

if (arg === '--check') {
  check();
} else if (arg === '--validate') {
  validate();
} else if (arg) {
  console.error('Unknown flag: ' + arg);
  console.error('Usage: node scripts/build-pi.mjs [--check|--validate]');
  process.exit(2);
} else {
  const { skills, skillFiles, referenceFiles } = build(DIST_SKILLS);
  console.log('Pi build complete -> ' + rel(DIST_SKILLS));
  console.log('  skills copied:          ' + skills);
  console.log('  SKILL.md files copied:  ' + skillFiles);
  console.log('  reference files copied: ' + referenceFiles);
}
