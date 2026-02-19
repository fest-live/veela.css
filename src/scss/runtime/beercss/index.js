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
export async function loadBeerCssStyles() {
    try {
        const beerStyles = await import("./_index.scss?inline");
        if (beerStyles.default) {
            await loadAsAdopted(beerStyles.default);
            console.log("[Veela/BeerCSS] Beer CSS compatible styles loaded");
        }
    }
    catch (e) {
        console.warn("[Veela/BeerCSS] Failed to load Beer CSS styles:", e);
    }
}
// Re-export basic utilities
export * from "../basic/index";
export default loadBeerCssStyles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztHQWFHO0FBRUgsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV6Qzs7R0FFRztBQUNILE1BQU0sQ0FBQyxLQUFLLFVBQVUsaUJBQWlCO0lBQ25DLElBQUksQ0FBQztRQUNELE1BQU0sVUFBVSxHQUFHLE1BQU0sTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDeEQsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDckIsTUFBTSxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUNyRSxDQUFDO0lBQ0wsQ0FBQztJQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLGlEQUFpRCxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7QUFDTCxDQUFDO0FBRUQsNEJBQTRCO0FBQzVCLGNBQWMsZ0JBQWdCLENBQUM7QUFFL0IsZUFBZSxpQkFBaUIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVmVlbGEgQ1NTIC0gQmVlciBDU1MgQ29tcGF0aWJsZSBSdW50aW1lIExvYWRlclxuICpcbiAqIFByb3ZpZGVzIHN0eWxpbmcgY29tcGF0aWJsZSB3aXRoIEJlZXIgQ1NTIChodHRwczovL3d3dy5iZWVyY3NzLmNvbS8pXG4gKiBJbmhlcml0cyBiYXNpYyBmb3VuZGF0aW9uICsgYWRkcyBCZWVyIENTUyBjbGFzcyBuYW1lcyBhbmQgdmFyaWFibGVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgbG9hZEJlZXJDc3NTdHlsZXMgfSBmcm9tIFwiZmVzdC92ZWVsYS9iZWVyY3NzXCI7XG4gKiBhd2FpdCBsb2FkQmVlckNzc1N0eWxlcygpO1xuICogYGBgXG4gKlxuICogQHNlZSBodHRwczovL3d3dy5iZWVyY3NzLmNvbS8gZm9yIEJlZXIgQ1NTIGRvY3VtZW50YXRpb25cbiAqL1xuXG5pbXBvcnQgeyBsb2FkQXNBZG9wdGVkIH0gZnJvbSBcImZlc3QvZG9tXCI7XG5cbi8qKlxuICogTG9hZCBCZWVyIENTUyBjb21wYXRpYmxlIHN0eWxlc1xuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZEJlZXJDc3NTdHlsZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgYmVlclN0eWxlcyA9IGF3YWl0IGltcG9ydChcIi4vX2luZGV4LnNjc3M/aW5saW5lXCIpO1xuICAgICAgICBpZiAoYmVlclN0eWxlcy5kZWZhdWx0KSB7XG4gICAgICAgICAgICBhd2FpdCBsb2FkQXNBZG9wdGVkKGJlZXJTdHlsZXMuZGVmYXVsdCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIltWZWVsYS9CZWVyQ1NTXSBCZWVyIENTUyBjb21wYXRpYmxlIHN0eWxlcyBsb2FkZWRcIik7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIltWZWVsYS9CZWVyQ1NTXSBGYWlsZWQgdG8gbG9hZCBCZWVyIENTUyBzdHlsZXM6XCIsIGUpO1xuICAgIH1cbn1cblxuLy8gUmUtZXhwb3J0IGJhc2ljIHV0aWxpdGllc1xuZXhwb3J0ICogZnJvbSBcIi4uL2Jhc2ljL2luZGV4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGxvYWRCZWVyQ3NzU3R5bGVzO1xuIl19