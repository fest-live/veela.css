import { whenAnyScreenChanges, updateVP, initVisibility, loadAsAdopted } from "fest/dom";

// =============================================================================
// RUNTIME STYLES LOADER
// Modular, optional loading of veela.css runtime styles
// =============================================================================

// Lazy-load runtime styles only when needed
let runtimeStylesPromise: Promise<string> | null = null;
const getRuntimeStyles = (): Promise<string> => {
    if (!runtimeStylesPromise) {
        runtimeStylesPromise = import("./index.scss?inline").then(m => m.default);
    }
    return runtimeStylesPromise;
};

// Cached stylesheet reference
let runtimeSheet: CSSStyleSheet | null = null;

/**
 * Get or create the runtime stylesheet.
 * Uses CSSStyleSheet for optimal performance with adoptedStyleSheets.
 */
export const ensureRuntimeStyleSheet = async (): Promise<CSSStyleSheet | null> => {
    if (typeof document === "undefined" || typeof CSSStyleSheet === "undefined") return null;
    if (runtimeSheet) return runtimeSheet;

    runtimeSheet = new CSSStyleSheet();
    if (!document.adoptedStyleSheets?.includes(runtimeSheet)) {
        document.adoptedStyleSheets?.push(runtimeSheet);
    }

    // Async parse to avoid blocking
    const styles = await getRuntimeStyles();
    await runtimeSheet.replace?.(`@layer veela-runtime { ${styles} }`).catch(() => {});
    return runtimeSheet;
};

/**
 * Synchronous version for compatibility - uses pre-loaded styles if available.
 */
export const ensureRuntimeStyleSheetSync = (): CSSStyleSheet | null => {
    if (typeof document === "undefined" || typeof CSSStyleSheet === "undefined") return null;
    if (runtimeSheet) return runtimeSheet;

    // If styles haven't been loaded yet, start loading but return null
    getRuntimeStyles();
    return null;
};

// =============================================================================
// FONT LOADING (Optional, lazy)
// =============================================================================

let fontsLoaded = false;

/**
 * Load fonts asynchronously. Call only when fonts are needed.
 */
export const loadFonts = async (): Promise<void> => {
    if (fontsLoaded) return;
    fontsLoaded = true;

    try {
        const { loadAllFonts } = await import("../../ts/font-loader");
        await loadAllFonts?.();
    } catch (e) {
        console.warn("[veela] Font loading failed:", e);
    }
};

// =============================================================================
// INITIALIZATION OPTIONS
// =============================================================================

export interface InitOptions {
    /** Load runtime styles (default: true) */
    styles?: boolean;
    /** Load fonts (default: true) */
    fonts?: boolean;
    /** Initialize visibility observers (default: true) */
    visibility?: boolean;
    /** Initialize viewport observers (default: true) */
    viewport?: boolean;
}

const defaultOptions: Required<InitOptions> = {
    styles: true,
    fonts: true,
    visibility: true,
    viewport: true,
};

// =============================================================================
// MAIN INITIALIZATION
// =============================================================================

let initialized = false;
let loadedStyles: CSSStyleSheet | null = null;

/**
 * Initialize veela.css runtime with optional features.
 *
 * @param ROOT - Root element for visibility/viewport observers (default: document.body)
 * @param options - Feature flags to enable/disable specific functionality
 * @returns Promise resolving to the loaded stylesheet (if styles enabled)
 *
 * @example
 * // Full initialization
 * await initialize();
 *
 * @example
 * // Minimal - styles only, no fonts
 * await initialize(document.body, { fonts: false });
 *
 * @example
 * // No styles - just observers
 * await initialize(document.body, { styles: false, fonts: false });
 */
export const initialize = async (
    ROOT: HTMLElement | null = document?.body ?? null,
    options: InitOptions = {}
): Promise<CSSStyleSheet | null> => {
    const opts = { ...defaultOptions, ...options };

    // Visibility observers
    if (opts.visibility && ROOT) {
        initVisibility(ROOT);
    }

    // Styles
    if (opts.styles) {
        loadedStyles ??= await ensureRuntimeStyleSheet() ?? null;
        if (!loadedStyles) {
            // Fallback for older browsers
            const styles = await getRuntimeStyles();
            loadAsAdopted(styles);
        }
    }

    // Fonts (async, non-blocking)
    if (opts.fonts) {
        loadFonts().catch(() => {});
    }

    // Viewport observers
    if (opts.viewport && ROOT?.closest?.("html")) {
        whenAnyScreenChanges(updateVP);
    }

    initialized = true;
    return loadedStyles;
};

/**
 * Check if veela.css has been initialized.
 */
export const isInitialized = (): boolean => initialized;

/**
 * Get the loaded stylesheet (if any).
 */
export const getStyleSheet = (): CSSStyleSheet | null => loadedStyles;

// =============================================================================
// FEATURE-SPECIFIC LOADERS
// =============================================================================

/**
 * Load only styles without observers or fonts.
 */
export const loadStyles = async (): Promise<CSSStyleSheet | null> => {
    return initialize(null, { styles: true, fonts: false, visibility: false, viewport: false });
};

/**
 * Initialize observers only without loading styles.
 */
export const initObservers = (ROOT: HTMLElement = document.body): void => {
    initialize(ROOT, { styles: false, fonts: false, visibility: true, viewport: true });
};

// Legacy default export
export default initialize as any;
