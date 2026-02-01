# Veela CSS Naming Conventions

## Class Name Standards

### BEM-inspired Pattern

Veela uses a BEM-inspired naming convention with the following pattern:

```
[namespace]-[block]__[element]--[modifier]
```

### Namespaces

| Namespace | Description | Example |
|-----------|-------------|---------|
| `vl-` | Veela layout components | `vl-grid`, `vl-stack` |
| `vc-` | Veela UI components | `vc-button`, `vc-card` |
| `vu-` | Veela utilities | `vu-hidden`, `vu-flex` |
| `vs-` | Veela state classes | `vs-active`, `vs-loading` |

### Legacy/Basic Classes (no namespace)

For backwards compatibility and Beer CSS compatibility:

| Class | Description |
|-------|-------------|
| `shell-basic` | Basic application container |
| `ctx-menu` | Context menu |
| `ux-anchor` | Anchor positioning |

### Component Classes

#### Containers
- `vl-container` - Page container
- `vl-grid` - CSS Grid container
- `vl-stack` - Vertical stack
- `vl-cluster` - Horizontal cluster

#### UI Components
- `vc-button` - Button component
- `vc-card` - Card component
- `vc-chip` - Chip/tag component
- `vc-field` - Form field wrapper
- `vc-dialog` - Dialog/modal

#### Navigation
- `vl-nav` - Navigation container
- `vl-nav__item` - Navigation item
- `vl-nav__link` - Navigation link

### State Classes

| Class | Description |
|-------|-------------|
| `vs-active` | Active state |
| `vs-disabled` | Disabled state |
| `vs-loading` | Loading state |
| `vs-error` | Error state |
| `vs-success` | Success state |
| `vs-hidden` | Hidden (display: none) |
| `vs-collapsed` | Collapsed (visibility) |

### Data Attributes

| Attribute | Description |
|-----------|-------------|
| `data-theme` | Theme variant (light/dark/system) |
| `data-scheme` | Color scheme override |
| `data-variant` | Component variant |
| `data-size` | Component size (sm/md/lg) |
| `data-dragging` | Element being dragged |
| `data-scrollable` | Scrollable container |

### CSS Custom Properties

#### Colors
```css
--basic-primary: oklch(...);
--basic-on-primary: oklch(...);
--basic-surface: oklch(...);
--basic-on-surface: oklch(...);
```

#### Spacing
```css
--space-xs: 0.25rem;
--space-sm: 0.5rem;
--space-md: 0.75rem;
--space-lg: 1rem;
--space-xl: 1.25rem;
```

#### Radii
```css
--basic-radius-sm: 8px;
--basic-radius-md: 12px;
--basic-radius-lg: 16px;
```

#### Elevation
```css
--basic-elev-1: 0 1px 3px rgba(0,0,0,.12);
--basic-elev-2: 0 3px 6px rgba(0,0,0,.16);
--basic-elev-3: 0 6px 12px rgba(0,0,0,.16);
```

### Beer CSS Compatibility

When using `veela-beercss`, these additional classes are available:

| Beer CSS | Veela Equivalent |
|----------|------------------|
| `primary` | `vc-primary` |
| `secondary` | `vc-secondary` |
| `surface` | `vc-surface` |
| `button` | `vc-button` |
| `card` | `vc-card` |
| `chip` | `vc-chip` |
| `field` | `vc-field` |

### Migration Guide

#### From Legacy Classes

```css
/* Old */
.card { ... }
.btn { ... }

/* New */
.vc-card { ... }
.vc-button { ... }
```

#### From CrossWord Basic

```css
/* Old */
.shell-basic { ... }
.card-wrap { ... }

/* New (unchanged for compatibility) */
.shell-basic { ... }
.vc-card-wrap { ... }
```
