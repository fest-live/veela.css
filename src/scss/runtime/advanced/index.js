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
import advancedStyles from "./index.scss?inline";
/**
 * Load advanced veela styles
 */
export async function loadAdvancedStyles() {
    try {
        if (advancedStyles) {
            await loadAsAdopted(advancedStyles);
            console.log("[Veela/Advanced] Advanced styles loaded");
        }
    }
    catch (e) {
        console.warn("[Veela/Advanced] Failed to load advanced styles:", e);
    }
}
// Re-export core utilities
export * from "../core/index";
export default loadAdvancedStyles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7R0FXRztBQUVILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFekMsT0FBTyxjQUFjLE1BQU0scUJBQXFCLENBQUM7QUFFakQ7O0dBRUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGtCQUFrQjtJQUNwQyxJQUFJLENBQUM7UUFDRCxJQUFJLGNBQWMsRUFBRSxDQUFDO1lBQ2pCLE1BQU0sYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztRQUMzRCxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLGtEQUFrRCxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7QUFDTCxDQUFDO0FBRUQsMkJBQTJCO0FBQzNCLGNBQWMsZUFBZSxDQUFDO0FBRTlCLGVBQWUsa0JBQWtCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFZlZWxhIENTUyAtIEFkdmFuY2VkIFJ1bnRpbWUgTG9hZGVyXG4gKlxuICogUHJvdmlkZXMgZnVsbC1mZWF0dXJlZCBzdHlsaW5nIHdpdGggYWR2YW5jZWQgY29tcG9uZW50cyBhbmQgZWZmZWN0cy5cbiAqIEluaGVyaXRzIGNvcmUgZm91bmRhdGlvbiArIGFkZHMgY29tcHJlaGVuc2l2ZSBjb21wb25lbnQgbGlicmFyeS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHNcbiAqIGltcG9ydCB7IGxvYWRBZHZhbmNlZFN0eWxlcyB9IGZyb20gXCJmZXN0L3ZlZWxhL2FkdmFuY2VkXCI7XG4gKiBhd2FpdCBsb2FkQWR2YW5jZWRTdHlsZXMoKTtcbiAqIGBgYFxuICovXG5cbmltcG9ydCB7IGxvYWRBc0Fkb3B0ZWQgfSBmcm9tIFwiZmVzdC9kb21cIjtcblxuaW1wb3J0IGFkdmFuY2VkU3R5bGVzIGZyb20gXCIuL2luZGV4LnNjc3M/aW5saW5lXCI7XG5cbi8qKlxuICogTG9hZCBhZHZhbmNlZCB2ZWVsYSBzdHlsZXNcbiAqL1xuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWRBZHZhbmNlZFN0eWxlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgICBpZiAoYWR2YW5jZWRTdHlsZXMpIHtcbiAgICAgICAgICAgIGF3YWl0IGxvYWRBc0Fkb3B0ZWQoYWR2YW5jZWRTdHlsZXMpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbVmVlbGEvQWR2YW5jZWRdIEFkdmFuY2VkIHN0eWxlcyBsb2FkZWRcIik7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIltWZWVsYS9BZHZhbmNlZF0gRmFpbGVkIHRvIGxvYWQgYWR2YW5jZWQgc3R5bGVzOlwiLCBlKTtcbiAgICB9XG59XG5cbi8vIFJlLWV4cG9ydCBjb3JlIHV0aWxpdGllc1xuZXhwb3J0ICogZnJvbSBcIi4uL2NvcmUvaW5kZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgbG9hZEFkdmFuY2VkU3R5bGVzO1xuIl19