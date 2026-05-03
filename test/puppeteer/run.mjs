#!/usr/bin/env node
/**
 * Headless probes for index.html → `test/browser/runner.ts` — starts Vite on this package root.
 *
 * WHY: CI-friendly regression without relying on privileged HTTPS/:443 defaults.
 */

import net from "node:net";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

import puppeteer from "puppeteer";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..", "..");

function pickEphemeralPort() {
    return new Promise((resolve, reject) => {
        const srv = net.createServer();
        srv.listen(0, "127.0.0.1", () => {
            const addr = srv.address();
            srv.close(() => resolve(typeof addr === "object" && addr ? addr.port : 0));
        });
        srv.on("error", reject);
    });
}

async function main() {
    // Avoid spawning a GUI browser during embedded Vite (open is enabled for `npm run dev`).
    process.env.VEELA_OPEN ??= "0";

    if (!process.env.VEELA_DEV_PORT && !process.env.PORT) {
        const ephemeral = await pickEphemeralPort();
        process.env.VEELA_DEV_PORT = String(ephemeral || 5176);
    }
    process.env.VEELA_DEV_HOST ??= "127.0.0.1";

    const server = await createServer({
        root,
        configFile: path.join(root, "vite.config.js"),
    });
    await server.listen();
    const local = server.resolvedUrls?.local?.[0];
    if (!local) throw new Error("Vite resolved no local URL (check listen)");

    let ok = false;
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        try {
            const page = await browser.newPage();
            page.on("pageerror", (e) => {
                console.error("[veela:test:puppeteer] page error:", e);
            });
            await page.goto(
                (() => {
                    const u = new URL(local);
                    u.searchParams.set("veela_ci", "1");
                    return u.href;
                })(),
                {
                    waitUntil: "networkidle0",
                    timeout: 120_000,
                },
            );
            await page.waitForFunction(
                () => globalThis.__VEELA_TEST_COMPLETE__ === true,
                { timeout: 120_000 },
            );

            /** @type {import("../shared/harness.ts").VeelaBrowserReport | undefined} */
            const report = await page.evaluate(() => globalThis.__VEELA_TEST_REPORT__);
            ok = !!(report?.ok);

            console.log(JSON.stringify(report, null, 2));

            // eslint-disable-next-line n/no-process-exit -- deliberate script termination
            if (!report) {
                console.error("Missing __VEELA_TEST_REPORT__");
                ok = false;
            }
            if (!ok) process.exitCode = 1;
        } finally {
            await browser.close();
        }
    } finally {
        await server.close();
        if (!ok && !process.exitCode) process.exitCode = 1;
    }
}

void main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
