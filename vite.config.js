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

// Merge configs
export default objectAssign(
    baseConfig,
    {
        plugins: [
            ...(baseConfig?.plugins || []),
            fontEncoderPlugin
        ]
    }
);
