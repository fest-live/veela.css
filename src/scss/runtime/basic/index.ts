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

import basicStyles from "./index.scss?inline";

/**
 * Load basic veela styles
 */
export async function loadBasicStyles(): Promise<void> {
    try {
        if (basicStyles) {
            await loadAsAdopted(basicStyles);
            console.log("[Veela/Basic] Basic styles loaded");
        }
    } catch (e) {
        console.warn("[Veela/Basic] Failed to load basic styles:", e);
    }
}

// Re-export core utilities
export * from "../core/index";

export default loadBasicStyles;
