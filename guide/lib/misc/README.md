[@fest/veela v0.0.0](../../../README.md)

***

[@fest/veela](../../../README.md) / scss/lib/misc

# scss/lib/misc

Miscellaneous helpers and pseudo-selector utilities.

## Import

```scss
@use "@fest/veela/src/scss/lib/misc" as *;
```

## Utilities

Partial files (prefixed with `_ps-`) provide focused helpers:

- `_ps-anchor.scss`: anchor positioning and transform helpers
- `_ps-centered.scss`: quick centering helpers
- `_ps-cursor.scss`: cursor/interaction helpers
- `_ps-draggable.scss`: drag affordances
- `_ps-mechanic.scss`: mechanical/animation helpers
- `_ps-properties.scss`: common CSS custom properties shortcuts
- `_ps-resizable.scss`: resize handles and patterns

Usage depends on the partial; import via the top-level lib index for convenience:

```scss
@use "@fest/veela/src/scss/lib" as *;

.resizable { @include ps-resizable; }
```


