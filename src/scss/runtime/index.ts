import { whenAnyScreenChanges, updateVP, initVisibility, loadInlineStyle } from "fest/dom";
import { loadAllFonts } from "../../ts/font-loader";

//@ts-ignore
import runtimeStyles from "./index.scss?url";

//
/**
 * Initialize `@fest/dom` runtime behaviors and inject styles.
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
    initVisibility(ROOT); loadAllFonts()?.catch?.(console.error.bind(console));
    if (ROOT?.closest?.("html")) {
        whenAnyScreenChanges(updateVP);
    }
    return (loadedStyles ??= loadInlineStyle(runtimeStyles));
}

//
export default initialize;
