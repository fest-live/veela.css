/**
 * Veela CSS - Runtime Entry Point
 *
 * Unified runtime module providing access to all veela style variants.
 *
 * Variants:
 * - core: Shared foundation (normalize, layout, states)
 * - basic: Lightweight styles (core + essential components)
 * - advanced: Full-featured styles (core + comprehensive library)
 * - beercss: Beer CSS compatible (basic + Beer CSS class names)
 *
 * @example
 * ```ts
 * // Load specific variant
 * import { loadBasicStyles } from "fest/veela/runtime";
 * await loadBasicStyles();
 *
 * // Or use the variant loader
 * import { loadVeelaVariant } from "fest/veela/runtime";
 * await loadVeelaVariant("advanced");
 * ```
 */

// ============================================================================
// TYPES
// ============================================================================

export type VeelaVariant = "core" | "basic" | "advanced" | "beercss";

export interface VeelaConfig {
    variant: VeelaVariant;
    loaded: boolean;
}

// ============================================================================
// STATE
// ============================================================================

let _loadedVariant: VeelaVariant | null = null;

// ============================================================================
// VARIANT LOADERS
// ============================================================================

import { loadCoreStyles } from "./core/index";
import { loadBasicStyles } from "./basic/index";
import { loadAdvancedStyles } from "./advanced/index";
import { loadBeerCssStyles } from "./beercss/index";

// ============================================================================
// UNIFIED LOADER
// ============================================================================

/**
 * Load a specific veela style variant
 *
 * @param variant - The style variant to load
 * @returns Promise that resolves when styles are loaded
 */
export async function loadVeelaVariant(variant: VeelaVariant): Promise<void> {
    if (_loadedVariant === variant) {
        console.log(`[Veela] Variant '${variant}' already loaded`);
        return;
    }

    console.log(`[Veela] Loading variant: ${variant}`);

    await loadCoreStyles();

    switch (variant) {
        case "core": {
            await loadCoreStyles();
            break;
        }
        case "basic": {
            await loadBasicStyles();
            break;
        }
        case "advanced": {
            await loadAdvancedStyles();
            break;
        }
        case "beercss": {
            await loadBeerCssStyles();
            break;
        }
        default:
            console.warn(`[Veela] Unknown variant: ${variant}, using basic`);
            await loadBasicStyles();
            break;
    }

    _loadedVariant = variant;
}

/**
 * Get the currently loaded variant
 */
export function getLoadedVariant(): VeelaVariant | null {
    return _loadedVariant;
}

/**
 * Check if a specific variant is loaded
 */
export function isVariantLoaded(variant: VeelaVariant): boolean {
    return _loadedVariant === variant;
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default loadVeelaVariant;
