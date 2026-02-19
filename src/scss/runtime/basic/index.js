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
export async function loadBasicStyles() {
    try {
        if (basicStyles) {
            await loadAsAdopted(basicStyles);
            console.log("[Veela/Basic] Basic styles loaded");
        }
    }
    catch (e) {
        console.warn("[Veela/Basic] Failed to load basic styles:", e);
    }
}
// Re-export core utilities
export * from "../core/index";
export default loadBasicStyles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7R0FXRztBQUVILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFekMsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFFOUM7O0dBRUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGVBQWU7SUFDakMsSUFBSSxDQUFDO1FBQ0QsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUNkLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLENBQUMsQ0FBQztRQUNyRCxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLDRDQUE0QyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7QUFDTCxDQUFDO0FBRUQsMkJBQTJCO0FBQzNCLGNBQWMsZUFBZSxDQUFDO0FBRTlCLGVBQWUsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBWZWVsYSBDU1MgLSBCYXNpYyBSdW50aW1lIExvYWRlclxuICpcbiAqIFByb3ZpZGVzIGxpZ2h0d2VpZ2h0IHN0eWxpbmcgZm9yIG1pbmltYWwgYXBwbGljYXRpb25zLlxuICogSW5oZXJpdHMgY29yZSBmb3VuZGF0aW9uICsgYWRkcyBiYXNpYyBjb21wb25lbnQgc3R5bGVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgbG9hZEJhc2ljU3R5bGVzIH0gZnJvbSBcImZlc3QvdmVlbGEvYmFzaWNcIjtcbiAqIGF3YWl0IGxvYWRCYXNpY1N0eWxlcygpO1xuICogYGBgXG4gKi9cblxuaW1wb3J0IHsgbG9hZEFzQWRvcHRlZCB9IGZyb20gXCJmZXN0L2RvbVwiO1xuXG5pbXBvcnQgYmFzaWNTdHlsZXMgZnJvbSBcIi4vaW5kZXguc2Nzcz9pbmxpbmVcIjtcblxuLyoqXG4gKiBMb2FkIGJhc2ljIHZlZWxhIHN0eWxlc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEJhc2ljU3R5bGVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChiYXNpY1N0eWxlcykge1xuICAgICAgICAgICAgYXdhaXQgbG9hZEFzQWRvcHRlZChiYXNpY1N0eWxlcyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltWZWVsYS9CYXNpY10gQmFzaWMgc3R5bGVzIGxvYWRlZFwiKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW1ZlZWxhL0Jhc2ljXSBGYWlsZWQgdG8gbG9hZCBiYXNpYyBzdHlsZXM6XCIsIGUpO1xuICAgIH1cbn1cblxuLy8gUmUtZXhwb3J0IGNvcmUgdXRpbGl0aWVzXG5leHBvcnQgKiBmcm9tIFwiLi4vY29yZS9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBsb2FkQmFzaWNTdHlsZXM7XG4iXX0=