import { resolve  } from "node:path";
import { readFile } from "node:fs/promises";
import { fontEncoder } from "./vite-plugin-font-encoder.js";

//
const importConfig = (url, ...args)=>{ return import(url)?.then?.((m)=>m?.default?.(...args)); }
const objectAssign = (target, ...sources) => {
    if (!sources.length) return target;

    const source = sources.shift();
    if (source && typeof source === 'object') {
        for (const key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                if (source[key] && typeof source[key] === 'object') {
                    if (!target[key] || typeof target[key] !== 'object') {
                        target[key] = Array.isArray(source[key]) ? [] : {};
                    }
                    objectAssign(target[key], source[key]);
                } else {
                    target[key] = source[key];
                }
            }
        }
    }

    return objectAssign(target, ...sources);
}

//
export const NAME = "veela";
export const __dirname = resolve(import.meta.dirname, "./");

// Base config
const baseConfig = await importConfig(resolve(__dirname, "../../shared/vite.config.js"),
    NAME,
    JSON.parse(await readFile(resolve(__dirname, "./tsconfig.json"), {encoding: "utf8"})),
    __dirname
);

// Add font encoder plugin
const fontEncoderPlugin = fontEncoder({
    fontDir: resolve(__dirname, "./assets/fonts"),
    outputFile: resolve(__dirname, "./src/ts/font-registry.ts"),
    compress: false // woff2 files are already compressed
});

//
// WHY: Shared workspace Vite expects HTTPS on :443 — needs elevated ports/certs and breaks
// `npm run dev`/Puppeteer on typical machines. This package overrides to HTTP on VEELA_DEV_PORT.
//
const VEELA_DEV_PORT = Number(process.env.VEELA_DEV_PORT ?? process.env.PORT ?? "5176");
const VEELA_DEV_HOST = process.env.VEELA_DEV_HOST ?? "127.0.0.1";
const mayOpenBrowser =
    process.env.CI !== "true" && process.env.VEELA_OPEN !== "0";

// Merge configs
export default objectAssign(baseConfig, {
    plugins: [
        ...(baseConfig?.plugins || []),
        fontEncoderPlugin,
    ],
    server: objectAssign({}, baseConfig?.server ?? {}, {
        host: VEELA_DEV_HOST,
        port: VEELA_DEV_PORT,
        strictPort: true,
        https: false,
        /** `npm run dev` — opens default browser to the probe page (disable: VEELA_OPEN=0). */
        open: mayOpenBrowser,
        origin: `http://${VEELA_DEV_HOST === "0.0.0.0" ? "127.0.0.1" : VEELA_DEV_HOST}:${VEELA_DEV_PORT}`,
    }),
});
