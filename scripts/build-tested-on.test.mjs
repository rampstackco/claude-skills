// build-tested-on.test.mjs - The measured-count line under Install follows
// openaddict.json, not a typed number.
//
// Run: node --test scripts/build-tested-on.test.mjs (no network, no model calls).

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { measuredCountLine } from './build-tested-on.mjs';

const REPO_ROOT = dirname(dirname(fileURLToPath(import.meta.url)));
const data = JSON.parse(readFileSync(join(REPO_ROOT, 'openaddict.json'), 'utf8'));
const readme = readFileSync(join(REPO_ROOT, 'README.md'), 'utf8');

const measuredCount = () =>
  Object.values(data.skills).filter((s) => (s.results ?? []).length > 0).length;

test('the README line is the one built from the committed openaddict.json', () => {
  assert.ok(readme.includes(measuredCountLine(data)));
  assert.match(measuredCountLine(data), new RegExp(`\\n${measuredCount()} skills here have been`));
});

// Six today; the test adds one more to whatever the committed count is.
test('one more measured skill (a seventh, today) changes the line', () => {
  const n = measuredCount();
  const before = measuredCountLine(data);
  const unmeasured = Object.keys(data.skills).find((name) => !(data.skills[name].results ?? []).length);
  const result = { model: 'm', name: 'Model', instrument: 'Via API', verdict: 'Helped', baseline: 'none' };
  const after = measuredCountLine({
    ...data,
    skills: { ...data.skills, [unmeasured]: { ...data.skills[unmeasured], status: 'measured', results: [result] } },
  });
  assert.match(before, new RegExp(`\\n${n} skills here have been`));
  assert.match(after, new RegExp(`\\n${n + 1} skills here have been`));
  assert.notEqual(after, before);
});
