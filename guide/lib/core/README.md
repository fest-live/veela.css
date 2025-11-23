[@fest/veela v0.0.0](../../../README.md)

***

[@fest/veela](../../../README.md) / scss/lib/core

# scss/lib/core

Low-level mixins for layout, spacing, sizing, display, grid/flex, typography, and responsive helpers.

## Import

```scss
@use "@fest/veela/src/scss/lib/core" as *;
```

## Spacing

```scss
.box { @include padding(1rem); }
.section { @include margin(2rem); }
.item { @include spacing(0.5rem, 1rem); }
```

## Borders, radius, shadow, outline

```scss
.card { @include border(1px, solid, oklch(85% 0.02 240)); @include radius(0.5rem); }
.focus-ring { @include outline(2px, solid, color-mix(in oklch, currentColor 60%, transparent)); }
.elevated { @include shadow(0 4px 16px oklch(0% 0 0 / 0.15)); }
```

## Alignment and centering

```scss
.center-both { @include center("both"); }
.center-x { @include center("x"); }
.center-y { @include center("y"); }
```

## Size and position

```scss
.cover { @include size(100%, 100%); }
.square { @include size(auto, auto, 1 / 1); }
.overlay { @include position(fixed, 0); }
```

## Display helpers

```scss
.flex-row { @include display(flex, row, center, space-between); }
.grid-auto { @include grid-auto-fill(220px); }
.grid-layer { @include grid-layered; }
```

## Grid and flex utilities

```scss
.grid { @include grid(minmax(0,1fr) minmax(0,1fr), minmax(0,auto) minmax(0,1fr)); }
.row { @include grid-row; }
.col { @include grid-column; }
.flow-col { @include flex-flow(column); }
```

## Scrollbars

```scss
.scroll { @include scrollable("y"); }
.no-scrollbar { @include hide-scrollbar; }
```

## Responsive helpers

```scss
.only-mobile { @include breakpoint(md) { display: block; } }
.desktop-up { @include breakpoint-up(lg) { display: grid; } }
.within { @include container-query(720px) { padding: 1rem; } }
```

## Typography

```scss
.body { @include text(var(--text-base), 400); }
.title { @include font-style(&, ("size": "xl", "weight": 600)); }
```

## Host and web-component helpers

```scss
@include host-related(".widget", ".slot") { color: var(--fg); }
@include host-context(":where(.theme-dark)") { --bg: black; --fg: white; }
```


