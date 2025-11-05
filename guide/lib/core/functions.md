[@fest/veela v0.0.0](../../../README.md)

***

[@fest/veela](../../../README.md) / scss/lib/core / functions

# SCSS Functions

Collected from:

- `src/scss/lib/core/_logical.scss`
- `src/scss/lib/core/_viewport.scss`
- `src/scss/lib/core/_layout.scss`

## Logical and Math helpers

- `mix($a, $b, $i)` → CSS `calc` mix between `$a` and `$b` by ratio `$i`
- `abs($a)` / `sign($a)` → CSS `abs()` and `sign()` passthroughs
- `land($a, $b)` → logical AND via multiply
- `lor($a, $b)` → logical OR via `max()`
- `inv-mul($a, $b)` → 1 − (1 − a)·b
- `gt($a, $b)`, `lt($a, $b)`, `ge($a, $b)`, `le($a, $b)`, `ne($a, $b)`, `eq($a, $b)` → comparators producing 0/1
- `lenToNum($l, $d: 1px)` → convert length to number (auxiliary)

## Viewport helpers

- `_rem($value, $mod)` → CSS `rem(value, mod)` passthrough
- `perfect-translate($x: 0px, $y: 0px)` → subpixel-rounded translate3d for crisp rendering

## Layout helpers

- `limit-by-size($pwidth, $basis: 100%, $min: 0px)` → clamp padding by available size

Usage pattern:

```scss
@use "@fest/veela/src/scss/lib/core" as *;

.thumb {
  --r: #{mix(0.25rem, 1rem, 0.5)};
  transform: perfect-translate(1px, 0);
}
```


