import { whenAnyScreenChanges, updateVP, initVisibility, loadInlineStyle, loadAsAdopted } from "fest/dom";

//@ts-ignore
import runtimeStylesInline from "./index.scss?inline";
export const runtimeStyles = runtimeStylesInline;

let runtimeSheet: CSSStyleSheet | null = null;
export const ensureRuntimeStyleSheet = (): CSSStyleSheet | null => {
    if (typeof document === "undefined" || typeof CSSStyleSheet === "undefined") return null;
    if (runtimeSheet) return runtimeSheet;

    runtimeSheet = new CSSStyleSheet();
    if (!document.adoptedStyleSheets?.includes(runtimeSheet)) {
        document.adoptedStyleSheets?.push(runtimeSheet);
    }

    // Async parse to avoid blocking (runtime CSS can be large).
    // @ts-ignore
    runtimeSheet.replace?.(`@layer veela-runtime { ${runtimeStylesInline} }`)?.catch?.(() => {});
    return runtimeSheet;
};

//
/**
 * Initialize `@fest-lib/dom` runtime behaviors and inject styles.
 *
 * - Preloads and clones project styles from `fest/veela` and appends them to `document.head` when attached to an HTML root.
 * - Sets up visibility decorators and viewport observers to react on screen changes.
 *
 * @param ROOT The root element to initialize against. Defaults to `document.body`.
 * @returns A promise that resolves to the appended style element (or its clone).
 */

let loadedStyles: any = null;

//
export const initialize = async (ROOT: any = document.body)=>{
    initVisibility(ROOT);
    // Ensure styles are installed once, without blocking render.
    loadedStyles ??= (ensureRuntimeStyleSheet() ?? loadAsAdopted(runtimeStyles));

    import("../../ts/font-loader")?.then?.(({ loadAllFonts })=>{
        loadAllFonts()?.catch?.(console.error.bind(console));
    })?.catch?.(console.error.bind(console));

    if (ROOT?.closest?.("html")) {
        whenAnyScreenChanges(updateVP);
    }

    return loadedStyles;
};

//
export default initialize as any;
