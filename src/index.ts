// =============================================================================
// VEELA.CSS - CSS Framework Entry Point
// =============================================================================

// Runtime module (styles, fonts, observers)
export * from "./scss/runtime/index";
export { loadVeelaVariant } from "./scss/runtime/index";

// Default export for backwards compatibility
import forDefault from "./scss/runtime/index";
export default forDefault;
