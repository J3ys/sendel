# ContextMCP Dockerized Icon Update Design

Date: 2026-07-30
Status: Approved for planning

## Goal

Update the `ContextMCP Dockerized` visual identity shown on the site so the icon clearly communicates a local private repository that has been vectorized for MCP usage.

The current icon reads as a generic technical/network mark. The new icon should make `private repo` the primary meaning and `vectorization/indexing` an explicit secondary meaning.

## Scope

Update the existing inline SVG icon in these locations:

1. `index.html`
2. `contextmcp/blog-beyond-context7.html`

No copy changes, layout changes, or palette rebrand are in scope.

## Chosen Direction

Use a `document/code box + shield` composition with an explicit vector layer.

Reading order of the icon:

1. Repository/docs/codebase
2. Vectorized/indexed representation
3. Private/self-hosted protection

This should make the product meaning legible as: `local private repository, vectorized for MCP`.

## Visual Structure

### Primary form

Use a rectangular document/code box as the base shape. It should visually suggest a repository or documentation source rather than a generic container.

Recommended cues inside the box:

- 2-3 horizontal code/document lines
- clean geometric framing
- no text glyphs that become noisy at small sizes

### Privacy form

Overlay a shield badge on the right side of the composition.

Requirements:

- shield must be visible at both large card size and small navbar/logo size
- shield should clearly read as privacy/protection, not enterprise security branding
- shield should not dominate the document box

### Vector form

Add an explicit vector/indexing cue below or adjacent to the document box.

Chosen treatment:

- three connected vector nodes or chips
- visually stronger than the earlier subtle dotted row
- clearly subordinate to the repository shape

This layer should imply semantic indexing/vectorization without requiring the viewer to already understand MCP.

## Style Constraints

Keep the existing visual language already used on the site:

- blue and purple palette
- clean inline SVG geometry
- minimal gradients or none, depending on readability
- consistent feel between homepage card and article header

The result should feel like an evolution of the current asset, not a new brand system.

## Size and Reuse Strategy

The same conceptual icon should be reused in both placements, but optimized for each size:

### Homepage card in `index.html`

- allows more detail
- can include the full document, shield, and vector-node composition
- should remain centered and readable inside the existing project card image block

### Article header logo in `contextmcp/blog-beyond-context7.html`

- smaller footprint (`40x40` class)
- requires simplified spacing and fewer fine details
- must preserve the same metaphor, not become a different symbol

If needed, the small version may simplify connector lines while preserving the document + shield + vector-node structure.

## Accessibility

- keep meaningful `aria-label` text aligned with the new icon meaning
- preserve decorative simplicity so the SVG does not become visually noisy
- ensure sufficient contrast against the existing light gradient background

## Out of Scope

- changing product naming
- changing project description text
- altering surrounding layout or card styling
- introducing external image assets
- replacing inline SVG with raster assets

## Testing Approach

Validation should be visual and lightweight:

1. Check homepage card rendering on desktop
2. Check article header rendering on desktop
3. Check small-screen readability in both locations
4. Confirm the icon still reads at reduced size without the vector cue turning into clutter

## Risks and Mitigations

### Risk: too much detail at small sizes

Mitigation: simplify connector lines and keep only three vector nodes.

### Risk: shield overwhelms repo meaning

Mitigation: keep the document/code box as the largest shape and use the shield as a badge, not a standalone icon.

### Risk: vectorization cue is still too subtle

Mitigation: make the vector nodes explicit and spatially distinct from the document box.

## Implementation Notes

- edit only the existing inline SVG blocks
- preserve surrounding markup and card layout
- prefer the smallest SVG changes that achieve the new semantics
- keep the two icon instances visually matched
