/**
 * Veela CSS - Basic Runtime Loader
 *
 * Provides lightweight styling for minimal applications.
 * Inherits core foundation + adds basic component styles.
 *
 * @example
 * ```ts
 * import { loadBasicStyles } from "fest/veela/basic";
 * await loadBasicStyles();
 * ```
 */

import { loadAsAdopted } from "fest/dom";

/**
 * Load basic veela styles
 */
export async function loadBasicStyles(): Promise<void> {
    try {
        const basicStyles = await import("./_index.scss?inline");
        if (basicStyles.default) {
            await loadAsAdopted(basicStyles.default);
            console.log("[Veela/Basic] Basic styles loaded");
        }
    } catch (e) {
        console.warn("[Veela/Basic] Failed to load basic styles:", e);
    }
}

// Re-export core utilities
export * from "../core/index";

export default loadBasicStyles;
