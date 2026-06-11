#!/usr/bin/env python3
"""
Copy Jekyll _site/ into flat dist/ for cPanel / SFTP / static hosts.
Rewrites absolute paths (e.g. /assets/, /datasets/) to relative paths.

Run from repo root after `bundle exec jekyll build`.
"""
from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "_site"
DIST = ROOT / "dist"

# Main nav + legacy pages shipped as flat *.html at dist root
PAGE_DIRS = {
    "index": "",  # handled separately
    "challenge": "challenge",
    "datasets": "datasets",
    "leaderboard": "leaderboard",
    "paper": "paper",
    "about": "about",
    "models": "models",
    "methodology": "methodology",
}

# Slugs rewritten to *.html (order: hash links before bare slugs)
PAGE_SLUGS = (
    "challenge",
    "datasets",
    "leaderboard",
    "paper",
    "about",
    "models",
    "methodology",
)


def rewrite_text(text: str, *, is_under_assets_js: bool) -> str:
    """Rewrite absolute site paths to relative (flat HTML + assets/)."""

    def rep(pat: str, to: str, s: str) -> str:
        return re.sub(pat, to, s)

    s = text

    for slug in PAGE_SLUGS:
        s = rep(rf'href="/{slug}/#', f'href="{slug}.html#', s)
        s = rep(rf"href='/{slug}/#", f"href='{slug}.html#", s)
        s = rep(rf'href="/{slug}/?"', f'href="{slug}.html"', s)
        s = rep(rf"href='/{slug}/?'", f"href='{slug}.html'", s)

    # Legacy / removed from main nav but may appear in old content
    s = rep(r'href="/methodology/?"', 'href="methodology.html"', s)
    s = rep(r'href="/results/?"', 'href="index.html"', s)

    js_page = [
        ('href: "/challenge/"', 'href: "challenge.html"'),
        ('href: "/datasets/"', 'href: "datasets.html"'),
        ('href: "/leaderboard/"', 'href: "leaderboard.html"'),
        ('href: "/paper/"', 'href: "paper.html"'),
        ('href: "/about/"', 'href: "about.html"'),
        ('href: "/models/"', 'href: "models.html"'),
        ('href: "/methodology/"', 'href: "methodology.html"'),
    ]
    for old, new in js_page:
        s = s.replace(old, new)

    s = rep(r'href="/"', 'href="index.html"', s)
    s = rep(r"href='/'", "href='index.html'", s)

    s = rep(r'href="/assets/', 'href="assets/', s)
    s = rep(r"src='/assets/", "src='assets/", s)
    s = rep(r'src="/assets/', 'src="assets/', s)
    s = rep(r'href="/favicon', 'href="favicon', s)

    s = rep(r'href="https://example\.com/feed\.xml"', 'href="feed.xml"', s)

    s = rep(
        r'src="assets/js/bootstrap\.min\.js "',
        'src="assets/js/bootstrap.min.js"',
        s,
    )

    if is_under_assets_js:
        s = s.replace('from "/data/', 'from "../data/')
        s = s.replace('from "/assets/js/components.js"', 'from "./components.js"')
        s = s.replace(
            'from "/assets/js/leaderboard-table.js"',
            'from "./leaderboard-table.js"',
        )

    return s


def rewrite_file(path: Path) -> None:
    rel = path.relative_to(DIST)
    is_js = len(rel.parts) >= 2 and rel.parts[0] == "assets" and rel.parts[1] == "js"
    try:
        text = path.read_text(encoding="utf-8")
    except OSError:
        return
    new = rewrite_text(text, is_under_assets_js=is_js)
    if new != text:
        path.write_text(new, encoding="utf-8")


def main() -> int:
    if not SITE.is_dir():
        print("Run `bundle exec jekyll build` first; missing _site/", file=sys.stderr)
        return 1

    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)

    index_src = SITE / "index.html"
    if not index_src.is_file():
        print(f"Missing {index_src}", file=sys.stderr)
        return 1
    shutil.copy2(index_src, DIST / "index.html")

    for html_name, src_dir in PAGE_DIRS.items():
        if html_name == "index":
            continue
        src = SITE / src_dir / "index.html"
        if not src.is_file():
            print(f"Missing {src}", file=sys.stderr)
            return 1
        shutil.copy2(src, DIST / f"{html_name}.html")

    shutil.copytree(SITE / "assets", DIST / "assets")

    for extra in ("favicon.svg", "feed.xml", "robots.txt", "sitemap.xml"):
        p = SITE / extra
        if p.is_file():
            shutil.copy2(p, DIST / extra)

    text_suffixes = {".html", ".js", ".css", ".xml", ".txt", ".json", ".svg"}
    for path in DIST.rglob("*"):
        if path.is_file() and path.suffix.lower() in text_suffixes:
            rewrite_file(path)

    print(f"Static build written to {DIST}/")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
