[@fest-lib/veela v0.0.0](../README.md)

***

[@fest-lib/veela](../README.md) / scss

# scss

SCSS sources for Veela CSS. Import `src/scss/index.scss` to get the full stack (runtime + library).

## Modules

- [lib](lib/README.md)
- [runtime](runtime/README.md)

## Quick start

```scss
// Get mixins, helpers, and design tokens
@use "@fest-lib/veela/src/scss/index" as veela;

.card {
  @include veela.padding(1rem);
  @include veela.radius(0.5rem);
}
```


