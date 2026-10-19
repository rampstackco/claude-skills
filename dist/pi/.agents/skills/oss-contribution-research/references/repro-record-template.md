# Repro record

The evidence a `pr` item carries for gate 8. It records what actually ran, with numbers a second person can check without trusting the first. An intake item does not need one: it asks before any patch, and its Summary says what was confirmed from the code. A `pr` item without a repro record is not a `pr` item.

## The browser rule

A bug that shows in a browser is reproduced in a browser. That needs a connected browser tool in the session: one that loads the page, runs the assertion and captures the screen. Reading the renderer's source and the fixture files can explain a bug; it does not reproduce it. Without a connected browser, the run may still file intake items, and the `pr` item waits for a session that has one.

The same rule applies to any surface the agent cannot drive from the session: a mobile build, a desktop app, a device. If the assertion cannot run, the record stays empty and the item stays intake.

## Fields

Every field is filled. A field that does not apply says why, in words, not with a dash.

```
target:       owner/repo#n, in a code span when the record is pasted into a queue item
surface:      where the assertion ran: a local build at http://localhost:<port>, a CLI command, a test runner, a hosted page
steps:        numbered; one navigation or one in-page action per line; the exact file, URL or input each step used
assertion:    one measurable check (a selector count, an exit code, a returned value, a log line), with
              expected: the value a fixed build gives
              observed: the value the unpatched build gave
control:      the one change that flips the observed value to the expected one (a patch, a config line, an input edit), and the value after it
second case:  a second input that shows the same failure, with its expected and observed values
regression:   an input that must not change: its value before and after the control
environment:  browser and version, runtime and version, the repo's commit SHA, the OS
evidence:     paths to the screenshot or GIF, and the raw output of the assertion before and after
```

## Rules

- **Observed means run.** Every number in the record came from the assertion running on the surface named. A value worked out from the source is a prediction and goes in the Summary, labeled as such.
- **The control is one change.** If flipping the result took two changes, the record names both and the patch is probably too big for the size gate.
- **Second case and regression are different inputs.** The second case fails the same way; the regression input does not change. One input cannot be both.
- **Environment names a commit.** The repo's SHA at which the record was taken, so the critic can rerun it at the same head.
- **Evidence is a file, not a sentence.** The critic reruns the assertion and compares its output with the files named here.
- **Paste the record, not a summary of it.** The `pr` item's repro gate line names the record's path and the before and after values; the record itself goes into the item in full, as a fenced block at the end of the Summary section after the Files touched line. The poster reads a fenced block as content, so the record never breaks its parse.

## Filled example

A fictional repo, `example-org/chartkit`, ships a hosted viewer for saved chart files. Issue `example-org/chartkit#88` reports that files written before schema 3.2 show no rows in the Timing panel, although the data is in the file.

```
target:       `example-org/chartkit#88`
surface:      local build of the viewer at http://localhost:8080, served from the repo's `viewer/dist`
steps:        1. Open http://localhost:8080/?file=http://localhost:8080/fixtures/chart-3.0.json
              2. Wait for the Timing panel heading to render
              3. In the console, run document.querySelectorAll('#timing .ck-row').length
assertion:    document.querySelectorAll('#timing .ck-row').length
              expected: 12 (the 12 timing entries in chart-3.0.json)
              observed: 0
control:      in viewer/src/compat.js, add groups.timing = {title: 'Timing'} when the file has timing entries and no timing group; after it, the count is 12
second case:  fixtures/chart-2.8.json, expected 9, observed 0; after the control, 9
regression:   fixtures/chart-3.4.json (current schema), 15 before and 15 after the control
environment:  Chrome 131.0.6778.86, Node 22.11.0, chartkit at 4f2c9e1b7d3a0c5e8b6f1a2d9c4e7f0b3a6d8e1c, Windows 11
evidence:     repro/chartkit-88/timing-before.png, repro/chartkit-88/timing-after.gif,
              repro/chartkit-88/assertion-before.json ({"chart-3.0": 0, "chart-2.8": 0, "chart-3.4": 15}),
              repro/chartkit-88/assertion-after.json ({"chart-3.0": 12, "chart-2.8": 9, "chart-3.4": 15})
```

In the `pr` item, the repro gate line reads `- repro: PASS | repro/chartkit-88/record.md, assertion 0 before and 12 after at 4f2c9e1` and the record above sits in a fenced block at the end of the Summary section.
