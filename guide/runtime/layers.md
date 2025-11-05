[@fest/veela v0.0.0](../../README.md)

***

[@fest/veela](../../README.md) / scss/runtime / layers

# CSS Layers

Runtime defines the following CSS `@layer` ordering (see `src/scss/runtime/core/_layers.scss`):

```css
@layer ux-layers {
  @layer ux-variables, ux-properties, ux-normalize, ux-layout, ux-classes, ux-design, ux-misc, ux-states, ux-shapes, ux-shadows;
}
```

- `ux-variables`: design tokens and variable defaults
- `ux-properties`: `@property` registrations for custom properties
- `ux-normalize`: normalization and resets
- `ux-layout`: structural/layout utilities
- `ux-classes`: utility classes
- `ux-design`: theme and component styles
- `ux-misc`: optional helpers
- `ux-states`: state/variant rules
- `ux-shapes`: shape primitives
- `ux-shadows`: shadow/elevation system

Place your overrides in a later layer to ensure correct precedence.


