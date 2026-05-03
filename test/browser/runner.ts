/**
 * Veela probe lab:
 * - Manual: choose runtime variant + categories, click **Run probes** (`npm run dev`).
 * - CI / Puppeteer: open with `?veela_ci=1` for unattended full regression (same gates as `npm test`).
 */

import type { VeelaBrowserReport } from "../shared/harness";
import type { LabVariantChoice } from "../shared/harness";
import type { ProbeCategory } from "../shared/harness";
import {
    ALL_CATEGORIES,
    CATEGORY_META,
    executeLabRun,
    runAutomatedRegression,
    summarize,
} from "../shared/harness";

function getVariantChoice(): LabVariantChoice {
    const basic = document.getElementById("lab-variant-basic") as HTMLInputElement | null;
    return basic?.checked ? "basic" : "advanced";
}

function getSelectedCategories(): ProbeCategory[] {
    const out: ProbeCategory[] = [];
    for (const c of ALL_CATEGORIES) {
        const el = document.getElementById(`cat-${c}`) as HTMLInputElement | null;
        if (el?.checked) out.push(c);
    }
    return out;
}

function syncEffectsAvailability(): void {
    const adv = CATEGORY_META.effects;
    const box = document.getElementById("cat-effects") as HTMLInputElement | null;
    const basicChosen = getVariantChoice() === "basic";
    if (box) {
        box.disabled = basicChosen;
        if (basicChosen) box.checked = false;
        const lbl = box.closest("label");
        if (lbl) lbl.style.opacity = basicChosen ? "0.55" : "1";
        if (basicChosen && lbl)
            lbl.setAttribute("title", `${adv.title} — pick “Advanced runtime”`);
        else if (lbl) lbl.removeAttribute("title");
    }
}

function finishReport(report: VeelaBrowserReport, pre: HTMLElement | null) {
    window.__VEELA_TEST_REPORT__ = report;
    window.__VEELA_TEST_COMPLETE__ = true;
    if (pre) summarize(pre, report);
    console.log("[veela:test]", report);
}

async function runCiMode(pre: HTMLElement | null): Promise<void> {
    window.__VEELA_TEST_COMPLETE__ = false;
    const report = await runAutomatedRegression();
    finishReport(report, pre);
}

async function runInteractive(pre: HTMLElement | null): Promise<void> {
    const btn = document.getElementById("lab-run") as HTMLButtonElement | null;
    if (!btn || !pre) return;

    window.__VEELA_TEST_COMPLETE__ = false;
    pre.textContent = "Running probes…";

    btn.disabled = true;
    try {
        const cats = getSelectedCategories();
        if (cats.length === 0) {
            finishReport(
                {
                    ok: false,
                    chapters: [],
                    error:
                        'Select at least one category above, then click “Run probes”.',
                },
                pre,
            );
            return;
        }

        const report = await executeLabRun({
            variant: getVariantChoice(),
            categories: cats,
        });
        finishReport(report, pre);
    } finally {
        btn.disabled = false;
    }
}

function buildCategoryGrid(): void {
    const root = document.getElementById("category-grid");
    if (!root) return;
    root.replaceChildren();
    for (const id of ALL_CATEGORIES) {
        const m = CATEGORY_META[id];
        const wrap = document.createElement("label");
        wrap.className = "cat-label";
        wrap.htmlFor = `cat-${id}`;

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.id = `cat-${id}`;
        cb.checked = id !== "effects";

        const span = document.createElement("span");
        const t = document.createElement("strong");
        t.textContent = m.title;
        const h = document.createElement("small");
        h.className = "cat-hint";
        h.textContent = m.hint;
        span.append(t, document.createElement("br"), h);

        wrap.append(cb, span);
        root.append(wrap);
    }
}

function bootstrapUi(): void {
    buildCategoryGrid();
    const pre = document.getElementById("veela-test-summary");

    document.querySelectorAll('input[name="lab-variant"]').forEach((el) => {
        el.addEventListener("change", syncEffectsAvailability);
    });
    syncEffectsAvailability();

    const runBtn = document.getElementById("lab-run");
    runBtn?.addEventListener("click", () => void runInteractive(pre));

    document.getElementById("lab-select-all")?.addEventListener("click", () => {
        for (const c of ALL_CATEGORIES) {
            const el = document.getElementById(`cat-${c}`) as HTMLInputElement | null;
            if (el && !el.disabled) el.checked = true;
        }
        syncEffectsAvailability();
    });

    document.getElementById("lab-select-none")?.addEventListener("click", () => {
        for (const c of ALL_CATEGORIES) {
            const el = document.getElementById(`cat-${c}`) as HTMLInputElement | null;
            if (el) el.checked = false;
        }
    });

    if (pre && !new URL(location.href).searchParams.has("veela_ci"))
        pre.textContent =
            "Choose variant + categories below, then click “Run probes”. Headless regression uses ?veela_ci=1.";
}

async function main() {
    const pre = document.getElementById("veela-test-summary");

    const ci = new URL(location.href).searchParams.has("veela_ci");

    if (ci) await runCiMode(pre);
    else bootstrapUi();
}

void main();
