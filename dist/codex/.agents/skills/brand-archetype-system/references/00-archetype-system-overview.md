# Archetype system overview

This document explains the taxonomy and how the layers fit together. Read this first when working with the archetype system for the first time.

## The two layers

**Core archetypes** (12 files) are the aesthetic families themselves. They span verticals; an archetype like Editorial Restrained appears in B2B SaaS, in media publishing, in DTC fashion. The core archetype files describe the family in pure form: what makes it recognizable, the color tendencies, the type pairings, the voice character.

**Vertical applications** (18 files) describe how the archetypes manifest in specific industries with named brands. They are discovery surfaces: a user working on a fintech brand should be able to find their vertical, see which archetypes are common, see specific brand-to-archetype mappings, and decide which core archetype to start from.

## How the agent should use the system

Two entry patterns:

**Entry by archetype** (user references an aesthetic family): "I want something Editorial Restrained for my analytics product." Agent loads the Editorial Restrained core archetype file, plus the B2B SaaS Data and Analytics vertical file for context. Composes defaults adapted to the brief.

**Entry by vertical** (user references their industry): "I'm designing a consumer fintech app, what archetypes work here?" Agent loads the Fintech Consumer vertical file first, sees the brand-to-archetype mappings, picks the most relevant core archetype, then loads that for full defaults.

## What this system is and is not

**It is**: a library of pre-composed defaults that accelerate brand work by providing known-good starting points with documented rationale.

**It is not**: a substitute for design judgment. The defaults are anchor points; the brief specifies where to land within the archetype's design space.

**It is not**: a comprehensive theory of brand aesthetics. The 12 archetypes capture the most recognizable contemporary Western brand aesthetics. They are not exhaustive. Regional, cultural, and historical archetypes are deferred to future expansions of the catalog.

## When archetypes compose

Two archetypes can blend. Linear is Editorial Restrained with Technical Precise undertones. Stripe is Technical Precise with Editorial Restrained surfaces. Glossier is Vibrant Saturated with Minimal Essentialist composition.

When the brief calls for blending, the agent picks two core archetypes and notes which contributes which dimension (for example "Editorial Restrained for type and whitespace, Technical Precise for color and density").

## The failure modes

1. **Verbatim copying**: pulling the exact starter palette into a new brand without adaptation. Produces generic output.
2. **Archetype mismatch with audience**: picking an archetype because the user likes its exemplars rather than because it fits the audience.
3. **Cross-archetype tokens**: pulling a color from one archetype and type from another without considering coherence. Often produces incoherent output.
4. **Stale exemplars**: assuming a brand still exemplifies an archetype after a redesign. The archetype is durable; the brand is not.

Each core archetype file's "Adaptation guidance" section addresses these.
