/**
 * SCSS Refactor - Git Commit & Deployment Guide
 * Veela.CSS Library | February 2026
 */

# Git Commit Guide & Deployment Steps

## Pre-Deployment Checklist

Before deploying refactored code:

- [ ] All linting passes: `npm run lint`
- [ ] Build succeeds: `npm run build`
- [ ] No console errors in dev mode: `npm run dev`
- [ ] Visual regression testing complete
- [ ] Team has reviewed changes
- [ ] Documentation reviewed and updated

---

## Commit Strategy: Incremental & Reviewable

The refactor has been organized into 4 incremental commits, each with a clear purpose.

### Commit 1: Extract Unified Property Registration

**Message:**
```
refactor: consolidate property registration into core/_register-properties.scss

- Extract duplicate register-property() and register-properties() mixins
  from core/_utils.scss and advanced/design/_utils.scss into a single
  unified module at core/_register-properties.scss
- Enhance default-value handling with extended type mappings
- Re-export unified module from both core and design layers
- Removes ~108 lines of duplicate code across 2 files
- No visual changes; all mixins available through re-exports
- Backward compatible; existing imports continue to work

Files changed:
- Created: lib/core/_register-properties.scss
- Updated: lib/core/_utils.scss (removed duplicate mixins, added re-export)
- Updated: lib/advanced/design/_utils.scss (removed duplicate mixins, added re-export)
- Updated: lib/core/_index.scss (added forward)
```

**Why first?**
- Foundation for other refactors
- Lowest risk (utilities layer)
- Enables clean imports in subsequent steps

---

### Commit 2: Consolidate Shared Overlay Patterns

**Message:**
```
refactor: extract shared overlay patterns into advanced/design/_shared-overlays.scss

- Consolidate button-overlays(), button-focus-ring(), and button-icon() mixins
  into reusable patterns: state-overlay(), focus-ring(), icon-button()
- Create shared %overlay-base placeholder for DRY pseudo-element styling
- Add state-opacity export helper for consistent token usage
- Refactor _buttons.scss to use new shared patterns (removes 38 lines)
- Removes ~40 lines of duplicated code
- No visual changes; computed CSS identical to original
- Backward compatible; existing button mixins preserved as thin wrappers

Files changed:
- Created: lib/advanced/design/_shared-overlays.scss
- Updated: lib/advanced/design/_buttons.scss (refactored to use shared patterns)
- Updated: lib/advanced/design/_index.scss (added forward)

Benefits:
- Patterns now reusable for forms, inputs, and other interactive elements
- Reduced code duplication across state handling
```

**Why second?**
- Depends on utilities layer (from Commit 1)
- Highly visible improvements in button code
- Sets foundation for design system consolidation

---

### Commit 3: Centralize Design Tokens

**Message:**
```
refactor: centralize design tokens into advanced/design/_design-tokens.scss

- Extract state opacity constants (hover: 0.08, press: 0.12, etc.)
  from magic numbers into semantic token maps
- Extract motion timing constants (fast: 140ms, normal: 160ms, etc.)
  and easing functions into centralized location
- Provide export mixins for CSS custom property generation
- Single source of truth for design-system constants
- No visual changes; constants identical to original
- Backward compatible; new module optional to adopt

Files changed:
- Created: lib/advanced/design/_design-tokens.scss
- Updated: lib/advanced/design/_index.scss (added forward)

Usage:
  @use "./design-tokens" as tokens;
  @include tokens.export-state-opacity();
  @include tokens.export-motion-timing();

Benefits:
- Easy to adjust opacity/timing globally (one change affects all uses)
- Semantic naming improves code readability
- Enables runtime customization via CSS variables
```

**Why third?**
- Depends on utilities layer
- Complements shared overlays (which use these tokens)
- Gradual adoption encouraged for existing code

---

### Commit 4: Update Module Exports

**Message:**
```
refactor: update module exports to include new shared modules

- Add @forward for core/_register-properties.scss from core/_index.scss
- Add @forward for design-tokens and shared-overlays from advanced/design/_index.scss
- Ensures new modules automatically available on library import
- Maintains clean, centralized export organization
- No visual changes; purely organizational

Files changed:
- Updated: lib/core/_index.scss (added forward for register-properties)
- Updated: lib/advanced/design/_index.scss (added forwards for design-tokens and shared-overlays)
```

**Why fourth?**
- Final step in organizing exports
- Depends on creation of all new modules
- Makes new utilities publicly available

---

## Deployment Steps

### Step 1: Verify All Tests Pass

```bash
# Run SCSS linting
npm run lint -- modules/projects/veela.css/src/scss/lib

# Build the library
npm run build

# Check for any console errors in dev mode
npm run dev  # then check browser console
```

### Step 2: Apply Commits

```bash
# If using Git rebasing (recommended for clean history)
git add modules/projects/veela.css/src/scss/lib
git commit -m "refactor: consolidate property registration into core/_register-properties.scss"
# ... repeat for each commit message above ...

# Or if directly committing:
# Apply all 4 commits in order as shown above
```

### Step 3: Visual Regression Testing

Test on each critical page/component:

```javascript
// Test buttons
- Filled buttons: hover, press, focus, disabled states
- Outlined buttons: hover, press, focus, disabled states
- Text buttons: hover, press, focus, disabled states
- Icon buttons: sizing, hover/press states

// Test forms
- Input fields: focus ring, disabled state
- Checkboxes: checked, disabled states
- Radio buttons: selected, disabled states
- Select dropdowns: open/close, hover states

// Test interactive elements
- Verify opacity matches spec (0.08, 0.12, 0.38, etc.)
- Verify timing matches spec (140ms, 160ms, 200ms)
- Verify transitions are smooth
```

### Step 4: Performance Check

```bash
# Compare dist CSS size before/after
ls -lh dist/styles.css

# Expected: ~2-5% reduction or similar size
# Risk: size increase indicates unexpected bloat
```

### Step 5: Document & Communicate

```markdown
## Refactor Deployed

New shared modules available for use:

### Core Layer
- `fest/core:register-properties` — Unified property registration

### Design Layer  
- `fest/design:design-tokens` — Centralized design constants
- `fest/design:shared-overlays` — Reusable overlay patterns

See REFACTOR_SUMMARY.md and REFACTOR_DETAILED_REPORT.md for complete details.
```

---

## Rollback Plan

If issues arise, revert is simple:

```bash
# Rollback last 4 commits
git revert HEAD~3..HEAD

# Or, reset to pre-refactor state
git reset --hard <pre-refactor-commit-hash>

# Verify build still works
npm run build
```

**Why safe to rollback:**
- All existing code paths preserved
- No dependencies on new modules (yet)
- Clean commit history allows targeted reverts

---

## Post-Deployment Tasks

### Week 1: Monitor
- [ ] Watch for unusual CSS behavior in production
- [ ] Monitor error logs for any selector issues
- [ ] Verify all interactive states work across browsers

### Week 2-3: Adoption
- [ ] Document new modules in team wiki
- [ ] Show team how to use `_shared-overlays.scss`
- [ ] Explain `_design-tokens.scss` usage

### Week 4+: Gradual Migration
- [ ] Update existing components to use new shared patterns (optional)
- [ ] Refactor oldest/most-duplicated components first
- [ ] Enforce new patterns in code reviews for new work

---

## Frequently Asked Questions

### Q: Will this break existing code?
**A:** No. All existing mixins are preserved. New modules are opt-in additions.

### Q: Do I need to update my imports?
**A:** No. Existing imports continue to work. New modules are available for new code.

### Q: How do I use the new shared overlays?
**A:** Import and use in your component:
```scss
@use "veela/advanced/design/shared-overlays" as overlays;

@include overlays.state-overlay($color);
```

### Q: Should I migrate existing code?
**A:** Gradually. New code should use new patterns. Existing code can be refactored when convenient.

### Q: What if I find a bug?
**A:** Report in issue tracker with:
1. Component affected
2. Browser/device where issue occurs
3. Screenshots of expected vs actual behavior
4. Steps to reproduce

---

## Support & Questions

For questions about:
- **Property registration:** See `_register-properties.scss` JSDoc
- **Overlay patterns:** See `_shared-overlays.scss` JSDoc
- **Design tokens:** See `_design-tokens.scss` JSDoc
- **Overall strategy:** See `REFACTOR_SUMMARY.md`
- **Detailed changes:** See `REFACTOR_DETAILED_REPORT.md`

---

## Success Metrics

Refactor is successful if:

✅ All tests pass
✅ No console errors
✅ CSS output identical to original
✅ No visual regressions reported
✅ Team members understand new modules
✅ New code adopts shared patterns
✅ Code review feedback is positive

---

## Timeline

| Phase | Duration | Owner | Status |
|-------|----------|-------|--------|
| Implement refactor | Complete | Engineering | ✅ Done |
| Code review | 1-2 days | Team | ⏳ Pending |
| QA/Testing | 2-3 days | QA | ⏳ Pending |
| Deploy to staging | 1 day | DevOps | ⏳ Pending |
| Monitor & verify | 1 week | Engineering | ⏳ Pending |
| Deploy to production | 1 day | DevOps | ⏳ Pending |
| Post-deploy support | As needed | Team | ⏳ Pending |

---

## Sign-Off

Once deployed and verified, document:

- [ ] Deployment date
- [ ] Deployer name
- [ ] QA sign-off
- [ ] Any issues found and resolved
- [ ] Performance impact (if any)

---

## References

- **Refactor Summary:** `REFACTOR_SUMMARY.md`
- **Detailed Report:** `REFACTOR_DETAILED_REPORT.md`
- **Core Module:** `lib/core/_register-properties.scss`
- **Design Module:** `lib/advanced/design/_shared-overlays.scss`
- **Design Tokens:** `lib/advanced/design/_design-tokens.scss`
