# Running a workflow

Each workflow in this directory is a runnable procedure, not an essay. The shape is identical across all of them:

1. Install the catalog once: /plugin marketplace add rampstackco/claude-skills then /plugin install rampstack-skills@rampstack
2. Open the workflow file. Check "when to use / when not to use" first; half the value of the tier is the routing between workflows.
3. Work the prerequisites checklist. If it names a data export, enable it before anything else; the exports named here do not backfill.
4. Run the phases in order. Each phase names the skills it invokes, the input it consumes, a Run block you copy and adapt, the output artifact it produces, and a binary done-when. Phases marked as declared gaps carry their procedure inline; the capability-class line tells you what to substitute if you are off-catalog.
5. Respect the lanes. Divergent phases end at a human decision. Gate phases report and never fix. Nothing in any workflow publishes, merges, or changes platform state on its own.
6. Record what happened. The minimum record is the per-phase artifacts and the human's merge note. The full schema, if you want to implement the operated version, is AGREEMENT-LOG.md.

Statuses are honest and defined in the README: everything starts as a template, and a workflow is validated only when it has been executed as written on a real property with a linked run record. You can watch that happen in this repo's history.
