# My written specification for veela.css

## 1. Introduction

veela.css is a CSS framework for building modern, responsive, and accessible web applications. It is built on top of the veela.js library and provides a set of reusable components and utilities for building web applications.

## 2. Features

- Responsive design
- Accessible components
- Reusable utilities
- Customizable theme
- Built-in animations

## 3. Architecture

### Runtime side

- Color functions
- Atomic classes
- Animation keyframes
- Implementations (commons)

### SCSS library

- Theme mixins
- Layout mixins
- Utility mixins

### Design types

- VE design (default, but no priority)
- Material Design 3 (not completed yet)

---

## Color functions

Currently we used native CSS custom functions (and own implementations for veela.css runtime side).

- `--c2-surface(tone = 0, base-color = var(--current), scheme-id = 2)` - returns a surface color based on the tone, base color and theme id
- `--c2-on-surface(tone = 0, base-color = var(--current), scheme-id = 2)` - returns a on-surface color based on the tone, base color and theme id
- `--c2-contrast(tone = 0, base-color = var(--current), scheme-id = 2)` - returns a contrast color based on the tone, base color and theme id
- `--c2-on-contrast(tone = 0, base-color = var(--current), scheme-id = 2)` - returns a on-contrast color based on the tone, base color and theme id

### Alpha channel

- Can be got by relative color function, e.g. `oklch(from --c2-surface(tone = 0, base-color = var(--current), scheme-id = 2) l c h/ 0.5)`

### Scheme ID

- 0 - light
- 1 - dark
- 2 - default

### Tone (of function argument)

- 0% - light or black tone (depends on the scheme id)
- 50% - chromatic tone (depends on the base color and scheme id)
- 100% - white or white tone (depends on the scheme id)

### Base color

- `var(--current)` - the current color, default bound to primary color, but can be overridden by the user
- `var(--primary)` - the primary color (in MD3 adapted under --current)
- `var(--secondary)` - the secondary color (in MD3 adapted under --secondary)
- `var(--accent)` - the accent color (in MD3 adapted under --accent)
- `var(--success)` - the success color
- `var(--warning)` - the warning color
- `var(--error)` - the error color

### Example

```css
.example {
    background-color: var(--c2-surface(tone = 0, base-color = var(--current), scheme-id = 2));
}
```

## Color theme mixins

- `@mixin solid-colorize(selector = "&", options: ("shade": 0.0, "tint": 0.0, "scheme-id": 2, "role": null))` - colorizes the selector with the given options

### Options

- `shade` - the shade of the color, default is 0.0
- `tint` - the tint of the color, default is 0.0
- `scheme-id` - the scheme id, default is 2
    - 0 - light
    - 1 - dark
    - 2 - default
- `role` - the role of the color, default is null
    - MD3 specific, such as `primary`, `secondary`, `tertiary`, `error`, `surface`, `on-surface`, etc.
    - null - no role, default to current color

### Example

```css
.example {
    @include solid-colorize(selector = "&", options: ("shade": 0.0, "tint": 0.0, "scheme-id": 2, "role": null));
}