// =============================================================================
// VEELA.CSS - CSS Framework Entry Point
// =============================================================================

// Runtime module (styles, fonts, observers)
export * from "./scss/runtime/index";
export {
    initialize,
    loadStyles,
    loadFonts,
    initObservers,
    isInitialized,
    getStyleSheet,
    ensureRuntimeStyleSheet,
    type InitOptions
} from "./scss/runtime/index";

// Font utilities
export * from "./ts/font-loader";

// Default export for backwards compatibility
import forDefault from "./scss/runtime/index";
export default forDefault;
