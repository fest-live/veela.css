[@fest/veela v0.0.0](../../../README.md)

***

[@fest/veela](../../../README.md) / scss/lib/design

# scss/lib/design

Design systems and tokens. By default, the Veela (VE) design is forwarded.

## Import

```scss
@use "@fest/veela/src/scss/lib/design" as *; // forwards ./ve
```

To enable Material Design 3 instead of VE, switch the forward in `src/scss/lib/design/index.scss` (uncomment MD3, comment VE).

## VE design

See: [`src/scss/lib/design/ve`](../../../../src/scss/lib/design/ve) and its [README](../../../../src/scss/lib/design/ve/README.md)

Provides:

- Tokens: color surfaces, radii, shadows, spacing, typography sizes
- Component-level variables under `:root` and layers via runtime
- Mixins/utilities tailored to VE naming

## Usage

```scss
@use "@fest/veela/src/scss/index" as veela;

.button {
  @include veela.padding(var(--space-sm));
  @include veela.radius(var(--radius-md));
  @include veela.color(var(--c-surface), var(--c-on-surface));
}
```


