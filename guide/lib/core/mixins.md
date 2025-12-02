[@fest-lib/veela v0.0.0](../../../README.md)

***

[@fest-lib/veela](../../../README.md) / scss/lib/core / mixins

# Core Mixins

Grouped by area; see source under `src/scss/lib/core`.

## Host and component

- `host-related($host, $child)`
- `host-context($host)`

## Spacing and borders

- `padding($value: null)`
- `margin($value: null)`
- `spacing($p: null, $m: null)`
- `border($width: null, $style: null, $color: null)`
- `outline($width: null, $style: null, $color: null)`
- `radius($r: null)` / `border-radius($r: null)`
- `shadow($value: null)`
- `box($r: null, $ov: null)`
- `color($bg: null, $color: null)`

## Alignment and display

- `center($axis: "both")`
- `display($type: null, $direction: null, $items: null, $content: null)`
- `interaction($pointerEvents: null, $cursor: null, $userSelect: null)`

## Size and position

- `size($inline: null, $block: null, $aspect-ratio: null)`
- `position($type: null, $inset: null)`

## Scrollbars

- `scrollbar($overflow: null, $width: null, $color: null, $gutter: null)`
- `scrollable($direction: "y")`
- `hide-scrollbar`

## Grid and flex

- `place($method: stretch, $items: center)`
- `grid-flow($direction: row)`
- `grid-center`
- `flex-flow($direction: row)`
- `grid-column`
- `grid-row`
- `flex-column`
- `grid-layered`
- `grid-rows-3c`
- `grid-layout($columns, $rows, $type: inline)`
- `grid-auto-fill($min-size: null)`
- `grid(minmax..., rows...)`

## Responsive and container queries

- `breakpoint($size)` / `breakpoint-up($size)`
- `container-query($size)`
- `container-base($size: stretch, $strict: false, $type: size, $name: auto, $contain: strict)`
- `container-layout($type: ui-container, $contain: strict)`
- `container($size)`
- `media-up($breakpoint)` / `media-down($breakpoint)` / `media-between($min, $max)`

## Typography

- `text($size, $weight: 400, $color: currentColor)`
- `text-ellipsis`
- `sr-only`
- `truncate`
- `aspect-ratio($width, $height)`
- `typography($fs, $ff: $def-ff, $weight: 400)`
- `font-style($selector: "&", $options: ("size": "base", "weight": 400, "family": "inherit"))`

## Render and viewport

- `HQRendering($importance: null)` / `LQRendering($importance: null)`
- `hw-optimize()` / `disable-transform()` / `hide-scrollbars()`
- `oriented($property, $portrait, $landscape)`
- `compute_os_conditions`
- `compute_os_size_to_cs` / `compute_cs_size_to_os`
- `compute_from_os_to_cs` / `compute_from_cs_to_os`
- `portrait-size` / `landscape-size`
- `init-os-size-by-native` / `init-cs-size`
- `centered-self($transforms: null)` / `centered-with-offset`
- `use-inset`
- `use_dvp` / `use_lvp` / `vp-vars` / `fit-viewport`
- `compute_grid_item_cell`
- `compute_orient_grid_layout`

Usage example:

```scss
@use "@fest-lib/veela/src/scss/lib/core" as *;

.container {
  @include grid-auto-fill(260px);
  @include breakpoint-up(md) { gap: var(--gap-lg); }
}
```


