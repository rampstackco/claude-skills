#!/usr/bin/env node
// build-tested-on.mjs - Write the "Tested on OpenAddict" blocks from the site's
// own JSON endpoints.
//
// openaddict.com measures skills from this catalog: the same tasks with the
// skill loaded and without it, per model, per way of running the model. This
// script reads what the site publishes and writes it here, in three places:
//
//   skills/<name>/README.md   one page per skill, generated in full. A measured
//                             skill gets its verdict per model, the tier, the
//                             dates and the link. A skill the site has not
//                             measured says so and links the coverage page.
//   openaddict.json           the same facts as data, plus the one-line
//                             catalog entry per skill. scripts/
//                             generate_readme_catalog.py reads it to write
//                             the line under each row of the README catalog.
//   workflows/README.md       the block between the OPENADDICT markers, for
//                             the workflows the site has run.
//   README.md                 the block between the OPENADDICT_FINDING
//                             markers near the top: two sentences, a table,
//                             the one-line-instruction sentence and two links,
//                             read from the openaddict.json object alone. The
//                             full paragraph is stored there as
//                             finding.paragraph for release notes.
//
// The verdict words are the site's, not ours. lib/tips/mark-state.ts in the
// site maps each verdict to the plain word its tip pages, /skills and topic
// pages print, and ORBIT_WORD below copies that map. A verdict the map does not
// know stops the build rather than being guessed at.
//
// The README.md beside each SKILL.md is not part of the skill: build-pi.mjs
// leaves it out of dist/pi, build-codex.mjs only ever copies SKILL.md and
// references/, and tools/gen_skills_lock.py leaves it out of SKILLS.lock. A
// new verdict therefore never reads as a changed skill.
//
// Dependency-free: Node 22 ESM, global fetch, fs and path only.
//
// Usage:
//   node scripts/build-tested-on.mjs          Fetch and write every output.
//   node scripts/build-tested-on.mjs --check  Fetch, build in memory, and exit
//                                             1 naming every file that differs
//                                             from what is committed. Run by
//                                             .github/workflows/dist-drift.yml
//                                             on PRs and on a daily schedule,
//                                             so a verdict that moves on the
//                                             site turns CI red here until
//                                             this script is rerun.

import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = dirname(SCRIPT_DIR);
const SKILLS_DIR = join(REPO_ROOT, 'skills');
const DATA_FILE = join(REPO_ROOT, 'openaddict.json');
const WORKFLOWS_README = join(REPO_ROOT, 'workflows', 'README.md');

const SITE = 'https://openaddict.com';
const REPO = 'rampstackco/claude-skills';
const COVERAGE_URL = `${SITE}/skills/coverage`;

const WORKFLOWS_START = '<!-- OPENADDICT:START -->';
const WORKFLOWS_END = '<!-- OPENADDICT:END -->';

// The site's plain word for each verdict, from lib/tips/mark-state.ts
// (ORBIT_MARK). Keep in step with that file; an unknown verdict throws.
const ORBIT_WORD = {
  Stable: 'Helped',
  'In free drift': 'No measured effect',
  Unobservable: 'Could not measure',
  'Past the horizon': 'Scored worse',
  Decaying: 'No longer holds',
};
const WITHHELD_WORD = 'Verdict withheld';
const NOT_RUN_WORD = 'not run';

// The two ways the site runs a model, in the words its job pages use.
const INSTRUMENTS = [
  { key: 'api', heading: 'Via API' },
  { key: 'claude-code', heading: 'In Claude Code' },
];

// The site's tier names (lib/models/at-a-glance TIER_WORD, lib/skills/
// tier-difficulty TIER_SHORT).
const TIER_SHORT = { t1: 'Tier 1', t2: 'Tier 2', t3: 'Tier 3' };

// What each word means, printed under a table only for the words in it.
const LEGEND = {
  Helped: 'the skill helped, by more than the margin the site needs before it calls a result.',
  'No measured effect': 'no difference large and certain enough to call.',
  'Could not measure': 'the test could not show a difference either way.',
  'Scored worse': 'the model did worse with the skill loaded.',
  'No longer holds': 'it held on an earlier run and did not on a later one.',
  [WITHHELD_WORD]: 'the run was kept and not scored; the site says why.',
  Mixed: 'the model was measured more than once and the results differ, so each is counted.',
  [NOT_RUN_WORD]: 'this model was not run this way.',
};

const NOT_YET_RUN = 'set up for testing, not yet run';

// What a cell's with-skill arm was compared against, from the site's baseline
// field. "One-line instruction instead" is the row the site's skill index
// prints for the instruction arm (app/components/skill-index-table.tsx).
const BASELINE_WORDS = {
  none: 'no skill',
  instruction: 'a one-line instruction',
};

const FINDING_START = '<!-- OPENADDICT_FINDING:START -->';
const FINDING_END = '<!-- OPENADDICT_FINDING:END -->';
const ROOT_README = join(REPO_ROOT, 'README.md');
const COMPARE_URL = `${SITE}/compare/claude-code-vs-codex`;
const WORKFLOWS_URL = `${SITE}/workflows`;

const GENERATED_NOTE =
  'Generated by `scripts/build-tested-on.mjs` from openaddict.com. CI checks it against the site, so edit the script, not this file.';

// --- fetch ---------------------------------------------------------------------

async function getJson(url) {
  let lastError;
  for (let attempt = 1; attempt <= 4; attempt++) {
    try {
      const res = await fetch(url, { headers: { accept: 'application/json' } });
      if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
      return await res.json();
    } catch (err) {
      lastError = err;
      await new Promise((r) => setTimeout(r, attempt * 1000));
    }
  }
  throw new Error(`Could not read ${url}: ${lastError.message}`);
}

// --- reading the site ------------------------------------------------------------

function slugOf(url) {
  return url.replace(/\.json$/, '').split('/').pop();
}

function plainWord(orbit) {
  const word = ORBIT_WORD[orbit];
  if (!word) {
    throw new Error(
      `openaddict.com published the verdict "${orbit}", which has no plain word here. ` +
        'Add it to ORBIT_WORD in scripts/build-tested-on.mjs, in the words the site uses.',
    );
  }
  return word;
}

// Model names and run dates are published on the job pages, not on the skill
// pages, so every job document is read once for them.
function collectNamesAndRuns(documents) {
  const names = new Map();
  const runDates = new Map();
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== 'object') return;
    if (typeof node.model === 'string') {
      const name = node.name ?? node.displayName;
      if (typeof name === 'string') names.set(node.model, name);
    }
    if (typeof node.id === 'string' && typeof node.date === 'string') {
      runDates.set(node.id, node.date);
    }
    Object.values(node).forEach(walk);
  };
  documents.forEach(walk);
  return { names, runDates };
}

async function readSite() {
  const [skillsIndex, jobsIndex, workflowsIndex, routing] = await Promise.all([
    getJson(`${SITE}/skills.json`),
    getJson(`${SITE}/jobs.json`),
    getJson(`${SITE}/workflows.json`),
    getJson(`${SITE}/models/routing.json`),
  ]);

  const ours = skillsIndex.skills.filter(
    (s) => s.identityPin?.repo === REPO && s.identityPin.path.startsWith('skills/'),
  );
  const skills = await Promise.all(ours.map((s) => getJson(s.json)));

  const jobs = new Map();
  await Promise.all(
    jobsIndex.jobs.map(async (j) => jobs.set(j.job, await getJson(j.data))),
  );

  const workflows = (
    await Promise.all(workflowsIndex.workflows.map((w) => getJson(w.json)))
  ).filter((w) => w.pin?.repo === REPO);

  const { names, runDates } = collectNamesAndRuns([...jobs.values(), workflowsIndex, routing]);
  return { skills, jobs, workflows, names, runDates };
}

// --- one skill -------------------------------------------------------------------

function modelName(names, model) {
  const name = names.get(model);
  if (!name) {
    throw new Error(
      `openaddict.com publishes no display name for "${model}" on any job page. ` +
        'The block will not print a raw model id in its place.',
    );
  }
  return name;
}

// Every result for one model on one instrument, collapsed into one phrase.
// One result, or several that agree, print the word alone. Results that
// disagree print every word with its count, so nothing is picked for the
// reader.
function phrase(words) {
  if (words.length === 0) return NOT_RUN_WORD;
  const counts = new Map();
  for (const w of words) counts.set(w, (counts.get(w) ?? 0) + 1);
  if (counts.size === 1) return words[0];
  const parts = [...counts.entries()].map(([w, n]) => `${w} ${n}`);
  return `Mixed, ${words.length} results: ${parts.join(', ')}`;
}

function shortPhrase(words) {
  if (words.length === 0) return NOT_RUN_WORD;
  return new Set(words).size === 1 ? words[0] : 'Mixed';
}

function measuredSkill(doc, site) {
  const name = doc.identityPin.path.split('/').pop();
  const job = site.jobs.get(doc.class) ?? null;

  // instrument -> model -> words, models kept in the order the site lists them.
  const byInstrument = new Map(INSTRUMENTS.map((i) => [i.key, new Map()]));
  const add = (instrument, model, word) => {
    const models = byInstrument.get(instrument);
    if (!models) throw new Error(`${doc.slug}: unknown instrument "${instrument}"`);
    if (!models.has(model)) models.set(model, []);
    models.get(model).push(word);
  };
  // Every cell again, one entry each, with what the skill was compared against.
  // The site writes baseline "instruction" where a one-line instruction stood
  // in for the skill and "none" where the comparison was no skill at all; a
  // Claude Code cell carries no baseline because it only ever ran those two
  // arms, so it is "none".
  const results = [];
  const record = (cell, verdict) => {
    add(cell.instrument, cell.model, verdict);
    results.push({
      model: cell.model,
      name: modelName(site.names, cell.model),
      instrument: INSTRUMENTS.find((i) => i.key === cell.instrument).heading,
      verdict,
      baseline: cell.baseline ?? 'none',
    });
  };
  const runs = new Set();
  for (const cell of doc.cells ?? []) {
    record(cell, plainWord(cell.orbit));
    runs.add(cell.run);
  }
  for (const cell of doc.claudeCodeCells ?? []) {
    record(cell, plainWord(cell.orbit));
    runs.add(cell.run);
  }
  for (const cell of doc.claudeCodeWithheld ?? []) {
    record(cell, WITHHELD_WORD);
  }
  for (const r of results) {
    if (!BASELINE_WORDS[r.baseline]) {
      throw new Error(`${doc.slug}: unknown baseline "${r.baseline}" for ${r.model}`);
    }
  }

  const modelOrder = [];
  for (const models of byInstrument.values()) {
    for (const model of models.keys()) if (!modelOrder.includes(model)) modelOrder.push(model);
  }
  const models = modelOrder.map((model) => {
    const row = { model, name: modelName(site.names, model) };
    for (const { key } of INSTRUMENTS) row[key] = byInstrument.get(key).get(model) ?? [];
    return row;
  });
  const instruments = INSTRUMENTS.filter(({ key }) => models.some((m) => m[key].length > 0));

  // Every skill result on the site's skill pages is from tier 1: the site
  // builds every skill row from the first tasks for the job, and draws the
  // harder-tier results separately (lib/skills/glance.ts tierClause). The
  // harder-tier results it lists as helping are on the job page.
  const harder = (job?.helps ?? [])
    .filter((h) => h.kind === 'skill' && slugOf(h.href) === doc.slug && h.tier && h.tier !== 't1')
    .map((h) => ({
      model: h.name,
      instrument: INSTRUMENTS.find((i) => i.key === h.instrument)?.heading ?? h.instrument,
      tier: TIER_SHORT[h.tier] ?? h.tier,
      lift: h.lift,
    }));

  const dated = [...runs].map((r) => site.runDates.get(r)).filter(Boolean).sort();
  return {
    status: 'measured',
    name,
    url: doc.url,
    json: `${doc.url}.json`,
    classLabel: doc.classLabel,
    job: job ? { label: job.jobLabel, url: job.url } : null,
    tier: job ? TIER_SHORT.t1 : null,
    harderTiers: harder,
    pinnedCommit: doc.identityPin.sha,
    pinnedOn: doc.identityPin.dateTested ?? null,
    newestRun: dated.length ? dated[dated.length - 1] : null,
    operatorOwned: doc.operatorOwned === true,
    instruments: instruments.map((i) => i.heading),
    models: models.map((m) => {
      const out = { model: m.model, name: m.name };
      for (const { key, heading } of instruments) out[heading] = phrase(m[key]);
      return out;
    }),
    results,
    shortModels: instruments.map(({ key, heading }) => ({
      heading,
      models: models
        .filter((m) => m[key].length > 0)
        .map((m) => `${m.name} (${shortPhrase(m[key])})`),
    })),
  };
}

function datesLine(entry) {
  const parts = [];
  const commit = `commit \`${entry.pinnedCommit.slice(0, 7)}\``;
  parts.push(entry.pinnedOn ? `pinned at ${commit} on ${entry.pinnedOn}` : `pinned at ${commit}`);
  if (entry.newestRun) parts.push(`newest run ${entry.newestRun}`);
  return parts.join('; ');
}

function tierLine(entry) {
  let line = entry.tier
    ? `${entry.tier}, the first tasks built for this job.`
    : 'The site publishes no tier for this job.';
  for (const h of entry.harderTiers) {
    const how = h.instrument.charAt(0).toLowerCase() + h.instrument.slice(1);
    line += ` Helped on ${h.tier}, ${h.model} ${how}: ${h.lift}.`;
  }
  return line;
}

function measuredBlock(entry) {
  const lines = [];
  lines.push('## Tested on OpenAddict');
  lines.push('');
  lines.push(
    `Measured on [OpenAddict](${entry.url}): the same ${entry.classLabel.toLowerCase()} tasks, ` +
      'with this skill loaded and without it, on each model below.',
  );
  lines.push('');
  lines.push(`- **Tier:** ${tierLine(entry)}`);
  lines.push(`- **Date:** ${datesLine(entry)}.`);
  lines.push(`- **Full results:** [${entry.url.replace('https://', '')}](${entry.url})`);
  lines.push('');
  lines.push(`| Model | ${entry.instruments.join(' | ')} |`);
  lines.push(`|---|${entry.instruments.map(() => '---').join('|')}|`);
  for (const m of entry.models) {
    lines.push(`| ${m.name} | ${entry.instruments.map((h) => m[h]).join(' | ')} |`);
  }
  lines.push('');
  const cells = entry.models.flatMap((m) => entry.instruments.map((h) => m[h])).join(' ');
  const legend = Object.entries(LEGEND)
    .filter(([word]) => cells.includes(word))
    .map(([word, meaning]) => `${word.charAt(0).toUpperCase() + word.slice(1)}: ${meaning}`);
  lines.push(`Each word is the verdict the site prints. ${legend.join(' ')}`);
  if (entry.operatorOwned) {
    lines.push('');
    lines.push(
      'OpenAddict is run by the people who publish this catalog, and these results are theirs. Nobody outside checked them.',
    );
  }
  return lines.join('\n');
}

function unmeasuredBlock() {
  return [
    '## Tested on OpenAddict',
    '',
    `Set up for testing, not yet run. What has been searched and run so far: [${COVERAGE_URL.replace('https://', '')}](${COVERAGE_URL}).`,
  ].join('\n');
}

function readme(name, entry) {
  return [
    `# ${name}`,
    '',
    `The skill is [SKILL.md](SKILL.md). ${GENERATED_NOTE}`,
    '',
    entry.status === 'measured' ? measuredBlock(entry) : unmeasuredBlock(),
    '',
  ].join('\n');
}

// The one line under the skill's row in the README catalog.
function catalogLine(name, entry) {
  if (entry.status !== 'measured') {
    return `Tested on OpenAddict: ${NOT_YET_RUN} ([coverage](${COVERAGE_URL})).`;
  }
  const date = entry.newestRun ? `newest run ${entry.newestRun}` : entry.pinnedOn ? `pinned ${entry.pinnedOn}` : null;
  const when = [entry.tier, date].filter(Boolean).join(', ');
  const groups = entry.shortModels
    .filter((g) => g.models.length > 0)
    .map((g) => `${g.heading}: ${g.models.join(', ')}.`)
    .join(' ');
  return (
    `Tested on [OpenAddict](${entry.url})${when ? ` (${when})` : ''}. ${groups} ` +
    `[Per model](skills/${name}/README.md).`
  );
}

// --- workflows -------------------------------------------------------------------

function pct(value) {
  return typeof value === 'number' ? `${(value * 100).toFixed(1)}%` : value;
}

function workflowsBlock(workflows) {
  const lines = [WORKFLOWS_START, '## Tested on OpenAddict', ''];
  lines.push(`${GENERATED_NOTE.replace('this file', 'this block')}`);
  lines.push('');
  if (workflows.length === 0) {
    lines.push(`No workflow here has been run on OpenAddict yet. The workflows the site has run: [openaddict.com/workflows](${SITE}/workflows).`);
  }
  const ordered = [...workflows].sort((a, b) => a.pin.path.localeCompare(b.pin.path));
  for (const w of ordered) {
    const file = w.pin.path.replace(/^workflows\//, '');
    lines.push(`### [${w.name}](${file})`);
    lines.push('');
    lines.push(
      `${w.summary} Pinned at commit \`${w.pin.sha.slice(0, 7)}\`, ${w.howRun}. ` +
        `Full results: [${w.url.replace('https://', '')}](${w.url}).`,
    );
    lines.push('');
    lines.push('| Model | Runs | Steps finished | Found | Of those, right | Said so when it was missing |');
    lines.push('|---|---|---|---|---|---|');
    for (const m of w.models) {
      lines.push(
        `| ${m.displayName} | ${m.notRun ? NOT_RUN_WORD : m.n} | ${pct(m.doneWhenCompletion)} | ${pct(m.recall)} | ${pct(m.precision)} | ${pct(m.honestStopRate)} |`,
      );
    }
    for (const n of w.notRun ?? []) {
      if (w.models.some((m) => m.model === n.model)) continue;
      lines.push(`| ${n.label} | ${NOT_RUN_WORD} | | | | |`);
    }
    const reasons = (w.notRun ?? []).filter((n) => n.plain);
    if (reasons.length) {
      lines.push('');
      for (const n of reasons) lines.push(`${n.label}, not run: ${n.plain}`);
    }
    lines.push('');
  }
  // One disclosure for the block: the site prints the same one on every workflow.
  const disclosures = [...new Set(ordered.map((w) => w.operatorDisclosure).filter(Boolean))];
  for (const d of disclosures) {
    lines.push(d);
    lines.push('');
  }
  lines.push(WORKFLOWS_END);
  return lines.join('\n');
}

function withBlock(text, block, startMarker, endMarker, file) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker);
  if (start === -1 || end === -1 || end < start) {
    throw new Error(`${file} has no ${startMarker} ... ${endMarker} pair.`);
  }
  return text.slice(0, start) + block + text.slice(end + endMarker.length);
}

// --- the finding, at the top of the root README ----------------------------------
//
// Read from the openaddict.json object only, after it is built, so the
// paragraph, the README section, the release notes and the Discussions post all
// say what that file holds and nothing else.

function listOf(items, conj = 'and') {
  if (items.length <= 1) return items.join('');
  return `${items.slice(0, -1).join(', ')} ${conj} ${items[items.length - 1]}`;
}

function lowerFirst(text) {
  return text.charAt(0).toLowerCase() + text.slice(1);
}

function inOrder(names, keep) {
  return [...new Set(names)].filter(keep);
}

// The measured skills, their results, every result that helped, and the models
// split into those a skill helped on and those it never did.
function findingFacts(data) {
  const all = Object.keys(data.skills);
  const measured = Object.entries(data.skills).filter(([, s]) => s.status === 'measured');
  const results = measured.flatMap(([skill, s]) => s.results.map((r) => ({ ...r, skill })));
  const helps = [
    ...results
      .filter((r) => r.verdict === ORBIT_WORD.Stable)
      .map((r) => ({ skill: r.skill, name: r.name, how: lowerFirst(r.instrument) })),
    ...measured.flatMap(([skill, s]) =>
      s.harderTiers.map((h) => ({ skill, name: h.model, how: `${lowerFirst(h.instrument)}, ${h.tier}` })),
    ),
  ];
  const helpedNames = new Set(helps.map((h) => h.name));
  const order = results.map((r) => r.name);
  const helped = inOrder([...order, ...helps.map((h) => h.name)], (n) => helpedNames.has(n));
  const quiet = inOrder(order, (n) => !helpedNames.has(n));
  return { all, measured, results, helps, helpedNames, helped, quiet };
}

function instructionSentence(results) {
  const instead = results.filter((r) => r.baseline === 'instruction');
  if (!instead.length) return null;
  const bySkill = new Map();
  for (const r of instead) {
    if (!bySkill.has(r.skill)) bySkill.set(r.skill, []);
    bySkill.get(r.skill).push(r.verdict);
  }
  const allSay = (word) => [...bySkill].filter(([, ws]) => ws.every((w) => w === word)).map(([s]) => s);
  const beat = allSay(ORBIT_WORD.Stable);
  const level = allSay(ORBIT_WORD['In free drift']);
  const other = [...bySkill]
    .filter(([s]) => !beat.includes(s) && !level.includes(s))
    .map(([s, ws]) => `${s} (${phrase(ws)})`);
  const clauses = [];
  if (beat.length) clauses.push(`the skill beat it on ${listOf(beat)}`);
  if (level.length) clauses.push(`had no measured effect over it on ${listOf(level)}`);
  if (other.length) clauses.push(`was mixed on ${listOf(other)}`);
  const hows = inOrder(instead.map((r) => lowerFirst(r.instrument)), () => true);
  const models = inOrder(instead.map((r) => r.name), () => true);
  return (
    `${BASELINE_WORDS.instruction.charAt(0).toUpperCase()}${BASELINE_WORDS.instruction.slice(1)} in place of the skill ` +
    `was tried only ${listOf(hows)} on ${listOf(models)}, and there ${listOf(clauses)}.`
  );
}

function findingParagraph(data) {
  const { all, measured, results, helps, helpedNames, helped, quiet } = findingFacts(data);

  const sentences = [
    `OpenAddict has measured ${measured.length} of the ${all.length} skills here, each on the same tasks with the skill loaded and without it.`,
  ];

  if (quiet.length) {
    const theirs = results.filter((r) => !helpedNames.has(r.name));
    const counts = new Map();
    for (const r of theirs) counts.set(r.verdict, (counts.get(r.verdict) ?? 0) + 1);
    const tally = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([w, n]) => `${w} ${n}`);
    sentences.push(
      `On ${listOf(quiet)}, no skill helped: the verdicts on their ${theirs.length} results were ${listOf(tally)}.`,
    );
  }

  if (helps.length) {
    const bySkill = new Map();
    for (const h of helps) {
      if (!bySkill.has(h.skill)) bySkill.set(h.skill, new Map());
      const models = bySkill.get(h.skill);
      if (!models.has(h.name)) models.set(h.name, new Set());
      models.get(h.name).add(h.how);
    }
    const parts = [...bySkill.entries()].map(
      ([skill, models]) =>
        `${skill} on ${listOf([...models.entries()].map(([n, hows]) => `${n} (${[...hows].join('; ')})`))}`,
    );
    sentences.push(`Every result where a skill helped was on ${listOf(helped, 'or')}: ${parts.join('; ')}.`);
  } else {
    sentences.push('No skill helped on any model measured.');
  }

  const instead = instructionSentence(results);
  if (instead) sentences.push(instead);
  return sentences.join(' ');
}

// Anthropic's frontier lines. The opening calls the models no skill helped on
// "the frontier Claude models" only while every one of them is on this list.
const FRONTIER_CLAUDE = /^Claude (Opus|Sonnet|Fable) /;
const COUNT_WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

function countWord(n) {
  return COUNT_WORDS[n] ?? String(n);
}

// The two sentences above the README table: where no skill helped, and where
// every skill that helped did. The table and finding.paragraph carry the rest.
function findingOpening(data) {
  const { results, helps, helpedNames, helped, quiet } = findingFacts(data);
  const sentences = [];
  if (quiet.length) {
    const who = quiet.every((n) => FRONTIER_CLAUDE.test(n))
      ? `the ${countWord(quiet.length)} frontier Claude model${quiet.length === 1 ? '' : 's'}`
      : listOf(quiet);
    const against = inOrder(
      results.filter((r) => !helpedNames.has(r.name)).map((r) => r.baseline),
      () => true,
    ).map((b) => (b === 'none' ? 'running without it' : `${BASELINE_WORDS[b]} in its place`));
    sentences.push(`On ${who}, no skill helped against ${listOf(against, 'or')}.`);
  }
  if (helps.length) {
    const short = helped.map((n) => n.replace(/^Claude /, ''));
    sentences.push(`Every skill that helped did so on ${listOf(short, 'or')}.`);
  } else {
    sentences.push('No skill helped on any model measured.');
  }
  return sentences.join(' ');
}

function findingSection(data) {
  const measured = Object.entries(data.skills).filter(([, s]) => s.status === 'measured');
  const lines = [FINDING_START, '## Which of these skills actually help?', ''];
  lines.push(findingOpening(data));
  lines.push('');

  // Models down the side, skills across: a model's words from every way it
  // was run, each word once, in the order the site gave them.
  const order = inOrder(
    measured.flatMap(([, s]) => s.results.map((r) => r.name)),
    () => true,
  );
  lines.push(`| | ${measured.map(([name, s]) => `[${name}](${s.url})`).join(' | ')} |`);
  lines.push(`|---|${measured.map(() => '---').join('|')}|`);
  lines.push(`| Tier | ${measured.map(([, s]) => s.tier ?? 'none published').join(' | ')} |`);
  lines.push(`| Newest run | ${measured.map(([, s]) => s.newestRun ?? s.pinnedOn ?? '').join(' | ')} |`);
  const used = new Set();
  for (const model of order) {
    const cells = measured.map(([, s]) => {
      const words = inOrder(
        s.results.filter((r) => r.name === model).map((r) => r.verdict),
        () => true,
      );
      if (words.length === 0) return NOT_RUN_WORD;
      words.forEach((w) => used.add(w));
      return words.join(' / ');
    });
    if (cells.includes(NOT_RUN_WORD)) used.add(NOT_RUN_WORD);
    lines.push(`| ${model} | ${cells.join(' | ')} |`);
  }
  lines.push('');
  const legend = Object.entries(LEGEND)
    .filter(([word]) => used.has(word))
    .map(([word, meaning]) => `${word.charAt(0).toUpperCase() + word.slice(1)}: ${meaning}`);
  lines.push(
    'Each word is the verdict openaddict.com prints for that model. Two words mean its results differ; ' +
      `the skill's own README splits them by how the model was run. ${legend.join(' ')}`,
  );
  const instead = instructionSentence(findingFacts(data).results);
  if (instead) {
    lines.push('');
    lines.push(instead);
  }
  lines.push('');
  lines.push(`- [Same prompts through both harnesses](${COMPARE_URL}): Claude Code and Codex on the same tasks.`);
  lines.push(
    `- [Workflows](${WORKFLOWS_URL}): whether a run said so when an input it needed was missing, or went ahead without it.`,
  );
  lines.push('');
  lines.push(GENERATED_NOTE.replace('this file', 'this block'));
  lines.push(FINDING_END);
  return lines.join('\n');
}

// --- build -----------------------------------------------------------------------

async function build() {
  const site = await readSite();
  const measured = new Map();
  for (const doc of site.skills) {
    const entry = measuredSkill(doc, site);
    measured.set(entry.name, entry);
  }

  const names = readdirSync(SKILLS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(SKILLS_DIR, e.name, 'SKILL.md')))
    .map((e) => e.name)
    .sort();
  const strays = [...measured.keys()].filter((n) => !names.includes(n));
  if (strays.length) {
    throw new Error(
      `openaddict.com measures ${strays.join(', ')} from ${REPO}, and no such skill is in skills/. ` +
        'A renamed or removed skill needs its results to follow it.',
    );
  }

  const outputs = new Map();
  const data = {
    source: SITE,
    generatedBy: 'scripts/build-tested-on.mjs',
    coverage: COVERAGE_URL,
    skills: {},
  };
  for (const name of names) {
    const entry = measured.get(name) ?? { status: 'not-yet-run', coverage: COVERAGE_URL };
    const { shortModels, ...stored } = entry;
    data.skills[name] = { ...stored, catalogLine: catalogLine(name, entry) };
    outputs.set(join(SKILLS_DIR, name, 'README.md'), readme(name, entry));
  }
  data.finding = { paragraph: findingParagraph(data) };
  outputs.set(DATA_FILE, JSON.stringify(data, null, 2) + '\n');
  outputs.set(
    WORKFLOWS_README,
    withBlock(
      readFileSync(WORKFLOWS_README, 'utf8'),
      workflowsBlock(site.workflows),
      WORKFLOWS_START,
      WORKFLOWS_END,
      'workflows/README.md',
    ),
  );
  outputs.set(
    ROOT_README,
    withBlock(readFileSync(ROOT_README, 'utf8'), findingSection(data), FINDING_START, FINDING_END, 'README.md'),
  );
  return { outputs, measured: measured.size, total: names.length, workflows: site.workflows.length };
}

function rel(p) {
  return p.slice(REPO_ROOT.length + 1).split('\\').join('/');
}

async function main() {
  const checking = process.argv.includes('--check');
  const { outputs, measured, total, workflows } = await build();
  const stale = [];
  for (const [file, content] of outputs) {
    const current = existsSync(file) ? readFileSync(file, 'utf8') : null;
    if (current === content) continue;
    if (checking) stale.push(rel(file));
    else writeFileSync(file, content);
  }
  if (checking) {
    if (stale.length) {
      console.error(
        `Tested on OpenAddict is stale in ${stale.length} file(s); the site has moved since they were written:`,
      );
      for (const f of stale) console.error(`  ${f}`);
      console.error(
        '\nRebuild and commit: node scripts/build-tested-on.mjs && python scripts/generate_readme_catalog.py --write',
      );
      process.exit(1);
    }
    console.log(
      `Tested on OpenAddict is current: ${measured} of ${total} skills measured, ${workflows} workflow(s).`,
    );
    return;
  }
  console.log(
    `Wrote Tested on OpenAddict: ${measured} of ${total} skills measured, ${workflows} workflow(s).`,
  );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
