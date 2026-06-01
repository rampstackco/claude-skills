# Pi-compatible skills distribution

This directory is a Pi-compatible build of the RampStack skills catalog. It is
generated from the read-only `skills/` source tree by `scripts/build-pi.mjs`.
Every source skill is copied byte-for-byte into `.agents/skills/<name>/`, with
its native frontmatter preserved intact (Pi accepts arbitrary frontmatter keys,
so nothing is trimmed and there is no sidecar file).

Pi reference: https://pi.dev and https://github.com/earendil-works/pi

## What is here

```
dist/pi/
  .agents/
    skills/
      <skill-name>/
        SKILL.md            preserved byte-for-byte from source
        references/...      preserved byte-for-byte from source
  README.md                 this file
  PORT_NOTES.md             port decisions, live-check results, future options
```

102 skills, 488 reference files. See `PORT_NOTES.md` for details.

## Pi discovery paths

Pi resolves skills from the following locations. Later sources override earlier
ones on name collision:

- Global / user: `~/.pi/agent/skills/` and `~/.agents/skills/`
- Project: `.pi/skills/` and `.agents/skills/`, searched in the current working
  directory and every parent up to the git root (ancestor discovery)
- Packages: a `skills/` directory or a `pi.skills` entry in `package.json`
- Settings: a `skills` array (files or directories) in Pi settings
- CLI: the `--skill <path>` flag (a skill file or directory; repeatable)

Because this build emits `.agents/skills/`, dropping the `.agents` directory at
the root of any project (or any ancestor of where you run Pi, up to the git
root) makes every skill discoverable with no further configuration.

## Install

Copy the `.agents` directory into the root of your target project:

```
cp -r dist/pi/.agents <target-project>/
```

Then run `pi` from anywhere inside that project. Skills are discovered
automatically via ancestor discovery. To verify discovery without committing
the directory, you can instead point Pi at the tree directly:

```
pi --skill dist/pi/.agents/skills/creative-brief
```

## Invoking a skill

Pi loads skill descriptions into context at startup (progressive disclosure)
and loads the full `SKILL.md` on demand when a task matches. You can also invoke
a skill explicitly:

```
/skill:<name>
```

Arguments typed after the command are appended to the skill content as a user
message (`User: <args>`). For example:

```
/skill:creative-brief a landing page for a B2B onboarding tool
```
