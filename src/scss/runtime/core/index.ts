/**
 * Veela CSS - Core Runtime Loader
 *
 * Provides the shared foundation styles for all veela variants.
 * Use this when you only need the essential normalize and layout utilities.
 *
 * @example
 * ```ts
 * import { loadCoreStyles } from "fest/veela/core";
 * await loadCoreStyles();
 * ```
 */

import { loadAsAdopted } from "fest/dom";

/**
 * Load core veela styles (normalize + layout + states)
 */
export async function loadCoreStyles(): Promise<void> {
    try {
        const coreStyles = await import("./_index.scss?inline");
        if (coreStyles.default) {
            await loadAsAdopted(coreStyles.default);
            console.log("[Veela/Core] Core styles loaded");
        }
    } catch (e) {
        console.warn("[Veela/Core] Failed to load core styles:", e);
    }
}

export default loadCoreStyles;
