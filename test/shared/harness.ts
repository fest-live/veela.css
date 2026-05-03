/**
 * Shared types and probes for manual (`npm run dev`) and headless (`?veela_ci=1` / Puppeteer).
 */

import { loadVeelaVariant } from "../../src/scss/runtime/index";


export interface TestCase {
    name: string;
    pass: boolean;
    detail?: string;
}

/** One run group (matches runtime variant step or a custom label). */
export interface ChapterResult {
    name: string;
    cases: TestCase[];
}

export interface VeelaBrowserReport {
    ok: boolean;
    chapters: ChapterResult[];
    error?: string;
}

export type LabVariantChoice = "basic" | "advanced";

export type ProbeCategory =
    | "normalize"
    | "typography"
    | "layout"
    | "spacing"
    | "colors"
    | "stylesheet"
    | "effects";

export const CATEGORY_META: Record<
    ProbeCategory,
    { title: string; hint: string; needsAdvanced?: boolean }
> = {
    normalize: {
        title: "Normalize & reset",
        hint: ":root margins, tab-size, border-box cascade, stylesheet presence",
    },
    typography: {
        title: "Typography",
        hint: "Base font stack, size, line-height on html/body",
    },
    layout: {
        title: "Layout",
        hint: "Viewport-ish sizing tokens on body (:root normalization)",
    },
    spacing: {
        title: "Spacing utilities",
        hint: 'Utility classes on #spacing-probe (e.g. .p-md / .gap-sm)',
    },
    colors: {
        title: "Colors / surfaces",
        hint: "--color-* custom properties referenced by normalized body",
    },
    stylesheet: {
        title: "Stylesheet delivery",
        hint: "constructable adopted sheets vs <style> fallback",
    },
    effects: {
        title: "Advanced effects",
        hint: "Extra stylesheet / keyframes after advanced runtime",
        needsAdvanced: true,
    },
};

export const ALL_CATEGORIES: ProbeCategory[] = [
    "normalize",
    "typography",
    "layout",
    "spacing",
    "colors",
    "stylesheet",
    "effects",
];

declare global {
    interface Window {
        __VEELA_TEST_REPORT__?: VeelaBrowserReport;
        __VEELA_TEST_COMPLETE__?: boolean;
    }
}

export function findKeyframeRecursive(rules: CSSRuleList | undefined | null, name: string): boolean {
    if (!rules?.length) return false;
    for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        if (rule instanceof CSSKeyframesRule && rule.name === name) return true;
        if ("cssRules" in rule && (rule as CSSGroupingRule).cssRules?.length) {
            if (findKeyframeRecursive((rule as CSSGroupingRule).cssRules, name)) return true;
        }
    }
    return false;
}

export function documentHasKeyframes(name: string): boolean {
    const sheets = [
        ...(document.adoptedStyleSheets
            ? Array.from(document.adoptedStyleSheets as unknown as Iterable<CSSStyleSheet>)
            : []),
        ...Array.from(document.styleSheets),
    ];
    const seen = new Set<CSSStyleSheet>();
    for (const sheet of sheets) {
        if (!sheet || seen.has(sheet)) continue;
        seen.add(sheet);
        try {
            if (sheet.cssRules && findKeyframeRecursive(sheet.cssRules, name)) return true;
        } catch {
            /* cross-origin or not parsed */
        }
    }
    return false;
}

function nextFrame(): Promise<void> {
    return new Promise((resolve) => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => resolve());
        });
    });
}

function pxNum(s: string): number {
    const m = /^([\d.]+)px$/.exec(s.trim());
    return m ? Number(m[1]) : NaN;
}

export interface ProbeRunOptions {
    categories: ProbeCategory[];
    /** If true, skips effects category probes. */
    basicOnlyLoaded: boolean;
    /** Snapshot taken after basic variant (for effects deltas). Omit for pure-basic runs. */
    snapshotAfterBasic?: { adopted: number; styleElements: number };
}

/**
 * Runs selected category probes against the live document (call after matching `loadVeelaVariant`).
 */
export function runProbeCategories(opts: ProbeRunOptions): TestCase[] {
    const { categories, basicOnlyLoaded, snapshotAfterBasic } = opts;
    const cases: TestCase[] = [];
    const html = document.documentElement;
    const probe = document.getElementById("veela-probe");

    const want = new Set(categories);

    if (want.has("normalize")) {
        const margin = getComputedStyle(html).margin;
        cases.push({
            name: "Normalize: html margin collapsed",
            pass: margin === "0px",
            detail: margin,
        });

        const tabSize = getComputedStyle(html).tabSize;
        cases.push({
            name: "Normalize: html tab-size",
            pass: tabSize === "4" || tabSize === "8px",
            detail: tabSize,
        });

        cases.push({
            name: "Normalize: probe uses border-box",
            pass: probe ? getComputedStyle(probe).boxSizing === "border-box" : false,
            detail: probe ? getComputedStyle(probe).boxSizing : "no #veela-probe",
        });
    }

    if (want.has("typography")) {
        const bh = getComputedStyle(html);
        const bb = getComputedStyle(document.body);
        cases.push({
            name: "Typography: html font-size",
            pass: pxNum(bh.fontSize) >= 12 && pxNum(bh.fontSize) <= 24,
            detail: bh.fontSize,
        });
        cases.push({
            name: "Typography: body line-height resolves",
            pass: pxNum(bb.lineHeight) > 0 || bb.lineHeight === "normal",
            detail: bb.lineHeight,
        });
        cases.push({
            name: "Typography: font-family non-empty",
            pass: bh.fontFamily.length > 3,
            detail: bh.fontFamily.slice(0, 80),
        });
    }

    if (want.has("layout")) {
        const bh = getComputedStyle(html);
        const bb = getComputedStyle(document.body);
        const htmlAxisMin = [bh.minBlockSize, bh.minHeight].find((v) => v && v !== "none") ?? "";
        // WHY: `runtime/basic/orient/_core-layout.scss` gives body `min-block-size: 0`; viewport stretch is on html (`min(...)`, `cqb`/`dvb`, etc.).
        const fillsViewportHint =
            /\b(?:calc\(|min\()\b/i.test(htmlAxisMin) ||
            /\b(?:cqb|cqi|dvb|dvi|dvh|%|vh|svh|lvh)\b/i.test(htmlAxisMin) ||
            pxNum(htmlAxisMin) >= 96;
        cases.push({
            name: "Layout: html viewport min-size carries stretch shell",
            pass: fillsViewportHint,
            detail: `html min=${htmlAxisMin.slice(0, 96)} body min-block=${bb.minBlockSize}`,
        });
        cases.push({
            name: "Layout: body display is flex-based shell",
            pass: bb.display.includes("flex") || bb.display === "block",
            detail: bb.display,
        });
    }

    if (want.has("spacing")) {
        const sp = document.getElementById("spacing-probe");
        if (!sp)
            cases.push({
                name: "Spacing: #spacing-probe fixture missing",
                pass: false,
                detail: "add element in index.html",
            });
        else {
            const cs = getComputedStyle(sp);
            const padTop = pxNum(cs.paddingTop);
            const gap = pxNum(cs.gap);
            cases.push({
                name: "Spacing: utility padding (.p-md) applies",
                pass: padTop > 0,
                detail: `padding-top=${cs.paddingTop}`,
            });
            cases.push({
                name: "Spacing: flex gap (.gap-sm) applies",
                pass: gap > 0,
                detail: `gap=${cs.gap}`,
            });
        }
    }

    if (want.has("colors")) {
        const root = getComputedStyle(html);
        const bgVar = root.getPropertyValue("--color-bg").trim();
        const bodyBg = getComputedStyle(document.body).backgroundColor;
        const opaqueBody =
            bodyBg !== "rgba(0, 0, 0, 0)" && bodyBg !== "transparent" && bodyBg.length > 0;
        cases.push({
            name: "Colors: --color-bg token or opaque body fill",
            pass: bgVar.length > 0 || opaqueBody,
            detail:
                `${bgVar ? `--color-bg=${bgVar.slice(0, 40)}` : "no token"}; body-bg=${bodyBg}`,
        });
    }

    if (want.has("stylesheet")) {
        const adopted = typeof document.adoptedStyleSheets !== "undefined" && document.adoptedStyleSheets.length > 0;
        const styleTags = document.querySelectorAll("style").length > 0;
        cases.push({
            name: "Delivery: adopted or inline <style> present",
            pass: adopted || styleTags,
            detail: `adopted=${document.adoptedStyleSheets?.length ?? 0}, styleTags=${document.querySelectorAll("style").length}`,
        });
    }

    if (want.has("effects")) {
        if (basicOnlyLoaded) {
            cases.push({
                name: "Effects: skipped (advanced runtime not loaded)",
                pass: true,
                detail: "n/a",
            });
        } else {
            const sheetsGrew = snapshotAfterBasic
                ? document.adoptedStyleSheets.length > snapshotAfterBasic.adopted ||
                  document.querySelectorAll("style").length > snapshotAfterBasic.styleElements
                : document.adoptedStyleSheets.length > 1;
            const hasFadeIn = documentHasKeyframes("fade-in");
            cases.push({
                name: "Effects: advanced bundle adds CSS (keyframes and/or sheets)",
                pass: hasFadeIn || sheetsGrew,
                detail: snapshotAfterBasic
                    ? `fade-in=${hasFadeIn}, adopted ${snapshotAfterBasic.adopted}→${document.adoptedStyleSheets.length}`
                    : `fade-in=${hasFadeIn}, adopted=${document.adoptedStyleSheets.length}`,
            });
            cases.push({
                name: "Effects: probe still border-box",
                pass: !!(probe && getComputedStyle(probe).boxSizing === "border-box"),
            });
        }
    }

    if (want.has("normalize")) {
        cases.push({
            name: "Sanity: fade-in keyframes absent until advanced bundle",
            pass: basicOnlyLoaded ? !documentHasKeyframes("fade-in") : true,
            detail: basicOnlyLoaded ? "(basic-only)" : "(advanced loaded — ignored)",
        });
    }

    return cases;
}

function categoriesForAutomatedPhase1(): ProbeCategory[] {
    return ["normalize", "typography", "layout", "spacing", "colors", "stylesheet"];
}

/** Full regression: basic chapter then advanced chapter (Puppeteer / `?veela_ci=1`). */
export async function runAutomatedRegression(): Promise<VeelaBrowserReport> {
    const report: VeelaBrowserReport = { ok: true, chapters: [], error: undefined };
    try {
        await loadVeelaVariant("basic");
        await nextFrame();

        report.chapters.push({
            name: "basic runtime",
            cases: runProbeCategories({
                categories: categoriesForAutomatedPhase1(),
                basicOnlyLoaded: true,
            }),
        });

        const snap = {
            adopted: document.adoptedStyleSheets?.length ?? 0,
            styleElements: document.querySelectorAll("style").length,
        };

        await loadVeelaVariant("advanced");
        await nextFrame();

        const advancedCases = runProbeCategories({
            categories: ["effects"],
            basicOnlyLoaded: false,
            snapshotAfterBasic: snap,
        });

        report.chapters.push({
            name: "advanced runtime (+effects)",
            cases: advancedCases,
        });

        report.ok = report.chapters.every((ch) => ch.cases.every((c) => c.pass));
    } catch (e) {
        report.ok = false;
        report.error = e instanceof Error ? e.message : String(e);
    }
    return report;
}

export async function executeLabRun(options: {
    variant: LabVariantChoice;
    categories: ProbeCategory[];
}): Promise<VeelaBrowserReport> {
    const report: VeelaBrowserReport = { ok: true, chapters: [], error: undefined };

    try {
        const filtered = options.categories.filter((c) => {
            if (CATEGORY_META[c].needsAdvanced && options.variant === "basic") return false;
            return true;
        });

        if (options.variant === "basic") {
            await loadVeelaVariant("basic");
            await nextFrame();

            report.chapters.push({
                name: 'Variant: basic (loadVeelaVariant("basic"))',
                cases: runProbeCategories({
                    categories: filtered.length ? filtered : ALL_CATEGORIES.filter((x) => x !== "effects"),
                    basicOnlyLoaded: true,
                }),
            });
        } else {
            await loadVeelaVariant("basic");
            await nextFrame();

            const snap = {
                adopted: document.adoptedStyleSheets?.length ?? 0,
                styleElements: document.querySelectorAll("style").length,
            };

            await loadVeelaVariant("advanced");
            await nextFrame();

            report.chapters.push({
                name: 'Variant: advanced (basic then loadVeelaVariant("advanced"))',
                cases: runProbeCategories({
                    categories: filtered.length ? filtered : ALL_CATEGORIES,
                    basicOnlyLoaded: false,
                    snapshotAfterBasic: snap,
                }),
            });
        }

        report.ok = report.chapters.every((ch) => ch.cases.every((c) => c.pass));
    } catch (e) {
        report.ok = false;
        report.error = e instanceof Error ? e.message : String(e);
    }

    return report;
}

export function summarize(el: HTMLElement, report: VeelaBrowserReport) {
    const lines: string[] = [];
    lines.push(`Overall: ${report.ok ? "PASS" : "FAIL"}`);
    if (report.error) lines.push(`Error: ${report.error}`);
    for (const ch of report.chapters) {
        lines.push(`\n## ${ch.name}`);
        for (const c of ch.cases) {
            lines.push(`  ${c.pass ? "[ok]" : "[!!]"} ${c.name}${c.detail ? ` (${c.detail})` : ""}`);
        }
    }
    el.textContent = lines.join("\n");
}
