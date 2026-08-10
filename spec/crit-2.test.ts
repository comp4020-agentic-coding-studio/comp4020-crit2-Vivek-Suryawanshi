import { readdirSync, readFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// Turns the mechanically-checkable lines of the crit-2 spec ("Unsolicited
// redesign") into tests. The lines a person has to judge — that you can say
// why you like the organisation and what their site gets wrong, that yours is
// better in some articulable way, and how you directed/corrected the agent —
// aren't testable here; they're for the crit conversation. See spec/README.md.
const DIST = resolve("dist");

function htmlFiles(dir: string = DIST): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

const pages = htmlFiles().map((path) => ({
  name: relative(DIST, path),
  doc: new JSDOM(readFileSync(path, "utf8")).window.document,
}));

function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

describe("crit-2: links to the real organisation", () => {
  it("links out to the real organisation's actual site somewhere", () => {
    const externalLinks = pages.flatMap(({ doc }) =>
      [...doc.querySelectorAll("a[href]")]
        .map((a) => a.getAttribute("href") ?? "")
        .filter(isExternal),
    );
    expect(
      externalLinks.length,
      "no <a href=\"https://...\"> found — the spec asks for a link to the real organisation's own site",
    ).toBeGreaterThan(0);
  });
});

describe("crit-2: restructured, not a single dump", () => {
  it("has more than one page, reflecting a restructured site rather than a single pasted page", () => {
    expect(
      pages.length,
      "only one page built — the spec asks the org's info to be restructured, not pasted onto a single page",
    ).toBeGreaterThan(1);
  });
});

describe("crit-2: how to find them", () => {
  it("gives a way to actually reach or locate the organisation", () => {
    const hasContactSignal = pages.some(({ doc }) => {
      const hasMailto = doc.querySelector('a[href^="mailto:"]');
      const hasTel = doc.querySelector('a[href^="tel:"]');
      const hasAddress = doc.querySelector("address");
      const hasMapLink = [...doc.querySelectorAll("a[href]")].some((a) =>
        /google\.com\/maps|openstreetmap\.org/i.test(
          a.getAttribute("href") ?? "",
        ),
      );
      return Boolean(hasMailto || hasTel || hasAddress || hasMapLink);
    });
    expect(
      hasContactSignal,
      "no mailto:/tel: link, <address>, or map link found anywhere — the spec asks the site to say how to find the organisation",
    ).toBe(true);
  });
});
