import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const url = "https://www.solugen.com/";

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n");
}

function writeText(filePath, data) {
  fs.writeFileSync(filePath, data.endsWith("\n") ? data : data + "\n");
}

async function runViewport({ name, width, height, deviceScaleFactor }) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor,
    userAgent:
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();

  const requests = [];
  page.on("request", (req) => {
    const resourceType = req.resourceType();
    if (
      resourceType === "image" ||
      resourceType === "media" ||
      resourceType === "font" ||
      resourceType === "stylesheet" ||
      resourceType === "script"
    ) {
      requests.push({
        url: req.url(),
        resourceType,
      });
    }
  });

  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const screenshotPath = path.join(
    "docs/design-references/solugen.com",
    `home-${name}-${width}x${height}.png`,
  );
  await page.screenshot({ path: screenshotPath, fullPage: true });

  const extracted = await page.evaluate(() => {
    const uniq = (arr) => [...new Set(arr)].filter(Boolean);
    const cssColor = (v) => (typeof v === "string" ? v.trim() : v);

    const fontFamilies = uniq(
      [...document.querySelectorAll("*")]
        .slice(0, 400)
        .map((el) => getComputedStyle(el).fontFamily),
    );

    const linkHrefs = [...document.querySelectorAll("link[href]")].map((l) => ({
      rel: l.getAttribute("rel"),
      href: l.href,
      as: l.getAttribute("as"),
      type: l.getAttribute("type"),
      sizes: l.getAttribute("sizes"),
    }));

    const scripts = [...document.querySelectorAll("script[src]")].map((s) => s.src);

    const favicons = linkHrefs.filter((l) => (l.rel || "").includes("icon"));

    const sections = [...document.querySelectorAll("section")].map((s, idx) => ({
      idx,
      id: s.id || null,
      className: s.className || null,
      dataInit: s.getAttribute("data-init-section"),
      textPreview: (s.textContent || "").trim().replace(/\s+/g, " ").slice(0, 140),
    }));

    const header = document.querySelector("header");
    const headerTop = header ? getComputedStyle(header) : null;

    const sampleColors = (els) =>
      uniq(
        els.flatMap((el) => {
          const cs = getComputedStyle(el);
          return [
            cssColor(cs.color),
            cssColor(cs.backgroundColor),
            cssColor(cs.borderTopColor),
            cssColor(cs.borderRightColor),
            cssColor(cs.borderBottomColor),
            cssColor(cs.borderLeftColor),
          ];
        }),
      );

    const keyEls = [
      document.body,
      document.querySelector(".page-lead__heading"),
      document.querySelector(".page-lead__subheadline"),
      document.querySelector(".markets-slider"),
      document.querySelector(".bioforge"),
      document.querySelector("footer"),
    ].filter(Boolean);

    const colors = sampleColors(keyEls);

    const hasLenis = Boolean(document.querySelector(".lenis"));
    const hasLocomotive = Boolean(
      document.querySelector(".locomotive-scroll, [data-scroll-container]"),
    );

    return {
      title: document.title,
      fonts: fontFamilies,
      colors,
      favicons,
      links: linkHrefs,
      scripts,
      sections,
      smoothScrollHints: {
        hasLenis,
        hasLocomotive,
      },
      headerStylesAtTop: headerTop
        ? {
            position: headerTop.position,
            top: headerTop.top,
            backgroundColor: headerTop.backgroundColor,
            backdropFilter: headerTop.backdropFilter,
            boxShadow: headerTop.boxShadow,
            height: headerTop.height,
          }
        : null,
    };
  });

  // scroll sweep: capture header styles at top and after scrolling
  const headerStylesAfterScroll = await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    window.scrollTo(0, 0);
    await sleep(300);
    window.scrollTo(0, 220);
    await sleep(600);
    const header = document.querySelector("header");
    if (!header) return null;
    const cs = getComputedStyle(header);
    return {
      position: cs.position,
      top: cs.top,
      backgroundColor: cs.backgroundColor,
      backdropFilter: cs.backdropFilter,
      boxShadow: cs.boxShadow,
      height: cs.height,
    };
  });

  // click sweep (lightweight): try opening nav menu if present
  const clickSweep = await page.evaluate(async () => {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    const out = {};
    const navTrigger =
      document.querySelector(".nav__menu-trigger") ||
      document.querySelector(".js-nav-trigger") ||
      document.querySelector("button[aria-label*='menu' i]");
    if (navTrigger instanceof HTMLElement) {
      navTrigger.click();
      await sleep(600);
      out.navOpened = true;
      out.bodyClassAfterNav = document.body.className || null;
      out.navVisible = Boolean(
        document.querySelector(".nav") &&
          getComputedStyle(document.querySelector(".nav")).display !== "none",
      );
      // close if possible
      navTrigger.click();
      await sleep(300);
    } else {
      out.navOpened = false;
    }
    return out;
  });

  await browser.close();

  return {
    viewport: { name, width, height, deviceScaleFactor },
    screenshotPath,
    extracted,
    headerStylesAfterScroll,
    clickSweep,
    requests,
  };
}

async function main() {
  ensureDir("docs/research/solugen.com");
  ensureDir("docs/design-references/solugen.com");

  const desktop = await runViewport({
    name: "desktop",
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
  });

  const mobile = await runViewport({
    name: "mobile",
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
  });

  const out = {
    url,
    capturedAt: new Date().toISOString(),
    desktop,
    mobile,
  };

  writeJson("docs/research/solugen.com/recon.json", out);

  const md = [];
  md.push(`# Solugen Reconnaissance\n`);
  md.push(`- **URL**: \`${url}\``);
  md.push(`- **Captured at**: \`${out.capturedAt}\`\n`);
  md.push(`## Screenshots\n`);
  md.push(`- Desktop: \`${desktop.screenshotPath}\``);
  md.push(`- Mobile: \`${mobile.screenshotPath}\`\n`);

  md.push(`## Fonts (sampled)\n`);
  md.push(`Desktop fonts (unique, first 40):`);
  md.push("");
  md.push(
    desktop.extracted.fonts
      .slice(0, 40)
      .map((f) => `- \`${f}\``)
      .join("\n"),
  );
  md.push("");

  md.push(`## Color samples (from key elements)\n`);
  md.push(`Desktop colors:`);
  md.push("");
  md.push(desktop.extracted.colors.map((c) => `- \`${c}\``).join("\n"));
  md.push("");

  md.push(`## Smooth scroll hints\n`);
  md.push(
    `- Desktop: lenis=${desktop.extracted.smoothScrollHints.hasLenis}, locomotive=${desktop.extracted.smoothScrollHints.hasLocomotive}`,
  );
  md.push(
    `- Mobile: lenis=${mobile.extracted.smoothScrollHints.hasLenis}, locomotive=${mobile.extracted.smoothScrollHints.hasLocomotive}\n`,
  );

  md.push(`## Header style changes (scroll 0 → 220px)\n`);
  md.push(`### Desktop\n`);
  md.push(`- Top: \`${JSON.stringify(desktop.extracted.headerStylesAtTop)}\``);
  md.push(`- Scrolled: \`${JSON.stringify(desktop.headerStylesAfterScroll)}\`\n`);

  md.push(`### Mobile\n`);
  md.push(`- Top: \`${JSON.stringify(mobile.extracted.headerStylesAtTop)}\``);
  md.push(`- Scrolled: \`${JSON.stringify(mobile.headerStylesAfterScroll)}\`\n`);

  md.push(`## Sections (from DOM)\n`);
  const summarize = (s) =>
    `- ${s.idx}. id=${s.id ?? "—"} data-init=${s.dataInit ?? "—"} class=\`${(s.className || "").split(" ").slice(0, 5).join(" ")}\``;
  md.push(`### Desktop\n`);
  md.push(desktop.extracted.sections.slice(0, 30).map(summarize).join("\n"));
  md.push("");

  md.push(`## Favicons\n`);
  md.push(desktop.extracted.favicons.map((f) => `- \`${f.href}\``).join("\n"));
  md.push("");

  md.push(`## Notes\n`);
  md.push(
    `This recon is automated and intentionally conservative; component-level specs still require per-section computed style extraction once we decide which sections to build first.`,
  );

  writeText("docs/research/solugen.com/BEHAVIORS.md", md.join("\n") + "\n");
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});

