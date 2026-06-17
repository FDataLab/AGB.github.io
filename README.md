# Adversarial Graph Benchmark (AGB) Website

A standardized benchmark for evaluating adversarial attacks and defenses on Graph Neural Networks (GNNs). AGB provides unified datasets, reproducible evaluation protocols, benchmark leaderboards, and comprehensive robustness analysis across poisoning and evasion attack scenarios.

## Requirements

- **Ruby** 2.7+ (3.x recommended)
- **Bundler** (`gem install bundler`)
- **Python** 3.8+ (post-process step only; stdlib only)
- **npm** (optional convenience wrapper for `npm run build`)

## Installation

```bash
git clone <your-repo-url>
cd AGB-WEB

bundle install
npm install   # optional; no runtime npm dependencies
```

Configure site metadata in `_config.yml` before deploying (at minimum `url`, `git_address`, and `paper_address`).

## Local development

```bash
bundle exec jekyll serve
```

Open http://127.0.0.1:4000/ (Jekyll default). Pages use directory-style URLs (e.g. `/leaderboard/`).

## Production build

```bash
npm run build
```

Equivalent:

```bash
bundle exec jekyll build
python3 scripts/prepare-static-deploy.py
```

**Output folder:** `dist/`

Contents are static only: HTML, CSS, JS, images, fonts, `favicon.svg`, `feed.xml`, and `robots.txt` when present. Nav pages are flat files at the root (`index.html`, `challenge.html`, `datasets.html`, etc.) with relative asset paths for root hosting on cPanel.

### Main routes (after build)

| Page | File in `dist/` |
|------|-----------------|
| Home | `index.html` |
| AGB Challenge | `challenge.html` |
| Datasets | `datasets.html` |
| Leaderboard | `leaderboard.html` |
| Paper | `paper.html` |
| GitHub | External link (`git_address` in `_config.yml`) |

Preview locally:

```bash
npx --yes serve dist
# or: python3 -m http.server 8080 --directory dist
```

## Deployment

### Git-based (cPanel / static host)

1. Run `npm run build` locally or in CI.
2. Upload **only** the contents of `dist/` to the web root (`public_html` or equivalent).
3. Do **not** upload `node_modules/`, `_site/`, source Ruby files, or `.env` files.
4. Update `_config.yml` `url` to your live domain and rebuild so feed/SEO tags are correct.

### SFTP

1. Build locally: `npm run build`.
2. SFTP into `public_html` (or your docroot).
3. Sync `dist/` → remote docroot (overwrite old files).
4. Confirm `index.html` loads and nav links open the correct `.html` pages.

### What not to commit

- `dist/`, `_site/`, `node_modules/`
- `.env`, `.env.local`
- `agb.zip` or other deployment archives
- API keys, credentials, or local-only data files

## Project layout (source)

| Path | Purpose |
|------|---------|
| `*.html`, `_includes/`, `_layouts/` | Jekyll pages and templates |
| `assets/` | SCSS, JS modules, images, fonts, data |
| `_config.yml` | Site configuration |
| `scripts/prepare-static-deploy.py` | Flat `dist/` export + relative URL rewrite |

## License

See `LICENSE` in the repository.
