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
import styles from "./index.scss?inline";
/**
 * Load core veela styles (normalize + layout + states)
 */
export async function loadCoreStyles() {
    try {
        await loadAsAdopted(styles);
        console.log("[Veela/Core] Core styles loaded");
    }
    catch (e) {
        console.warn("[Veela/Core] Failed to load core styles:", e);
    }
}
export default loadCoreStyles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7R0FXRztBQUVILE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFFekMsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFFekM7O0dBRUc7QUFDSCxNQUFNLENBQUMsS0FBSyxVQUFVLGNBQWM7SUFDaEMsSUFBSSxDQUFDO1FBQ0QsTUFBTSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1FBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQywwQ0FBMEMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0FBQ0wsQ0FBQztBQUVELGVBQWUsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBWZWVsYSBDU1MgLSBDb3JlIFJ1bnRpbWUgTG9hZGVyXG4gKlxuICogUHJvdmlkZXMgdGhlIHNoYXJlZCBmb3VuZGF0aW9uIHN0eWxlcyBmb3IgYWxsIHZlZWxhIHZhcmlhbnRzLlxuICogVXNlIHRoaXMgd2hlbiB5b3Ugb25seSBuZWVkIHRoZSBlc3NlbnRpYWwgbm9ybWFsaXplIGFuZCBsYXlvdXQgdXRpbGl0aWVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgbG9hZENvcmVTdHlsZXMgfSBmcm9tIFwiZmVzdC92ZWVsYS9jb3JlXCI7XG4gKiBhd2FpdCBsb2FkQ29yZVN0eWxlcygpO1xuICogYGBgXG4gKi9cblxuaW1wb3J0IHsgbG9hZEFzQWRvcHRlZCB9IGZyb20gXCJmZXN0L2RvbVwiO1xuXG5pbXBvcnQgc3R5bGVzIGZyb20gXCIuL2luZGV4LnNjc3M/aW5saW5lXCI7XG5cbi8qKlxuICogTG9hZCBjb3JlIHZlZWxhIHN0eWxlcyAobm9ybWFsaXplICsgbGF5b3V0ICsgc3RhdGVzKVxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZENvcmVTdHlsZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgbG9hZEFzQWRvcHRlZChzdHlsZXMpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIltWZWVsYS9Db3JlXSBDb3JlIHN0eWxlcyBsb2FkZWRcIik7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbVmVlbGEvQ29yZV0gRmFpbGVkIHRvIGxvYWQgY29yZSBzdHlsZXM6XCIsIGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgbG9hZENvcmVTdHlsZXM7XG4iXX0=