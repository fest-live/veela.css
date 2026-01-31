/**
 * Veela CSS - Advanced Runtime Loader
 *
 * Provides full-featured styling with advanced components and effects.
 * Inherits core foundation + adds comprehensive component library.
 *
 * @example
 * ```ts
 * import { loadAdvancedStyles } from "fest/veela/advanced";
 * await loadAdvancedStyles();
 * ```
 */

import { loadAsAdopted } from "fest/dom";

/**
 * Load advanced veela styles
 */
export async function loadAdvancedStyles(): Promise<void> {
    try {
        const advancedStyles = await import("./_index.scss?inline");
        if (advancedStyles.default) {
            await loadAsAdopted(advancedStyles.default);
            console.log("[Veela/Advanced] Advanced styles loaded");
        }
    } catch (e) {
        console.warn("[Veela/Advanced] Failed to load advanced styles:", e);
    }
}

// Re-export core utilities
export * from "../core/index";

export default loadAdvancedStyles;
