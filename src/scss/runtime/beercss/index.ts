/**
 * Veela CSS - Beer CSS Compatible Runtime Loader
 *
 * Provides styling compatible with Beer CSS (https://www.beercss.com/)
 * Inherits basic foundation + adds Beer CSS class names and variables.
 *
 * @example
 * ```ts
 * import { loadBeerCssStyles } from "fest/veela/beercss";
 * await loadBeerCssStyles();
 * ```
 *
 * @see https://www.beercss.com/ for Beer CSS documentation
 */

import { loadAsAdopted } from "fest/dom";

/**
 * Load Beer CSS compatible styles
 */
export async function loadBeerCssStyles(): Promise<void> {
    try {
        const beerStyles = await import("./_index.scss?inline");
        if (beerStyles.default) {
            await loadAsAdopted(beerStyles.default);
            console.log("[Veela/BeerCSS] Beer CSS compatible styles loaded");
        }
    } catch (e) {
        console.warn("[Veela/BeerCSS] Failed to load Beer CSS styles:", e);
    }
}

// Re-export basic utilities
export * from "../basic/index";

export default loadBeerCssStyles;
