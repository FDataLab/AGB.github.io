/** Reusable premium page shell: backgrounds, hero, scroll reveal. */

const NETWORK_SVG = `
  <svg class="agb-page-network" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
    <line class="agb-page-net-line" x1="60" y1="320" x2="220" y2="120" />
    <line class="agb-page-net-line" x1="220" y1="120" x2="420" y2="280" />
    <line class="agb-page-net-line" x1="420" y1="280" x2="680" y2="80" />
    <line class="agb-page-net-line agb-page-net-line--faint" x1="140" y1="240" x2="560" y2="160" />
    <circle class="agb-page-net-node" cx="220" cy="120" r="4" />
    <circle class="agb-page-net-node" cx="420" cy="280" r="4" />
    <circle class="agb-page-net-node" cx="680" cy="80" r="3.5" />
    <circle class="agb-page-net-node" cx="60" cy="320" r="3" />
  </svg>
`;

const THEME_DECOR = {
  challenge: "",
  leaderboard: `
    <span class="agb-page-blob agb-page-blob--1" aria-hidden="true"></span>
    <span class="agb-page-blob agb-page-blob--2" aria-hidden="true"></span>
  `,
  datasets: `<span class="agb-page-float-node agb-page-float-node--1"></span>`,
  paper: `<span class="agb-page-paper-line agb-page-paper-line--1"></span>`,
  github: `<i class="fa fa-github agb-page-theme-icon agb-page-theme-icon--github" aria-hidden="true"></i>`
};

const PARTICLE_COUNTS = {
  challenge: 0,
  leaderboard: 0,
  datasets: 2,
  paper: 2,
  github: 2,
  default: 2
};

const CLEAN_THEMES = new Set(["challenge"]);
const LIGHT_THEMES = new Set(["datasets", "paper", "github", "leaderboard"]);

function renderParticles(count) {
  let html = "";
  for (let i = 1; i <= count; i += 1) {
    html += `<span class="agb-page-particle agb-page-particle--${i}"></span>`;
  }
  return html;
}

export function pageBackground(theme = "default") {
  const decor = THEME_DECOR[theme] || "";
  const particleCount = PARTICLE_COUNTS[theme] ?? PARTICLE_COUNTS.default;
  const isClean = CLEAN_THEMES.has(theme);
  const isLight = LIGHT_THEMES.has(theme);

  const dotsHtml = isClean
    ? ""
    : theme === "leaderboard" || !isLight
      ? `<span class="agb-page-dots agb-page-dots--tr"></span>
         <span class="agb-page-dots agb-page-dots--bl"></span>`
      : '<span class="agb-page-dots agb-page-dots--tr"></span>';

  return `
    <div class="agb-page-bg" aria-hidden="true">
      <span class="agb-page-glow agb-page-glow--${theme}"></span>
      ${dotsHtml}
      ${NETWORK_SVG}
      ${renderParticles(particleCount)}
      ${decor}
    </div>
  `;
}

export function pageHero({ title, subtitle, theme = "default", titleHtml = "", compact = false }) {
  const titleContent = titleHtml || title;
  const subtitleHtml = subtitle ? `<p class="agb-page-hero-subtitle">${subtitle}</p>` : "";
  const compactClass = compact ? " agb-page-hero--compact" : "";

  return `
    <header class="agb-page-hero agb-page-hero--${theme}${compactClass} agb-page-reveal">
      <span class="agb-page-hero-glow" aria-hidden="true"></span>
      <div class="container agb-page-hero-inner">
        <h1 class="agb-page-hero-title">${titleContent}</h1>
        ${subtitleHtml}
      </div>
    </header>
  `;
}

export function pageHeader({ title, subtitle, theme = "default", compact = false }) {
  return pageHero({ title, subtitle, theme, compact });
}

export function pageDashboardHeader({ title, subtitle }) {
  const leadHtml = subtitle ? `<p class="agb-dashboard-lead">${subtitle}</p>` : "";

  return `
    <header class="agb-dashboard-header">
      <span class="agb-dashboard-header-glow" aria-hidden="true"></span>
      <h1 class="agb-dashboard-title">${title}</h1>
      ${leadHtml}
    </header>
  `;
}

export function pageWrap({ theme, hero = "", body, className = "" }) {
  let pageMods = `agb-page agb-page--${theme}`;
  if (CLEAN_THEMES.has(theme)) pageMods += " agb-page--clean";
  if (LIGHT_THEMES.has(theme)) pageMods += " agb-page--decor-light";
  if (className) pageMods += ` ${className}`;

  return `
    <div class="${pageMods}">
      ${pageBackground(theme)}
      ${hero}
      ${body}
    </div>
  `;
}

export function sectionGraphDivider() {
  return `
    <div class="agb-section-graph-divider agb-page-reveal" aria-hidden="true">
      <svg viewBox="0 0 640 48" preserveAspectRatio="xMidYMid meet">
        <line class="agb-section-graph-line" x1="40" y1="24" x2="200" y2="24" />
        <circle class="agb-section-graph-node" cx="200" cy="24" r="4" />
        <line class="agb-section-graph-line" x1="200" y1="24" x2="320" y2="12" />
        <circle class="agb-section-graph-node" cx="320" cy="12" r="3.5" />
        <line class="agb-section-graph-line" x1="320" y1="12" x2="480" y2="36" />
        <circle class="agb-section-graph-node" cx="480" cy="36" r="4" />
        <line class="agb-section-graph-line" x1="480" y1="36" x2="600" y2="24" />
      </svg>
    </div>
  `;
}

export function sectionWaveBottom(fill = "#f6f9ff") {
  return `
    <div class="agb-section-wave agb-section-wave--bottom" aria-hidden="true">
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,28 C360,56 720,0 1080,28 C1260,42 1380,14 1440,28 L1440,56 L0,56 Z" fill="${fill}" />
      </svg>
    </div>
  `;
}

export function initPageEffects(rootEl) {
  if (!rootEl) return;

  const reveals = rootEl.querySelectorAll(".agb-page-reveal:not(.agb-page-reveal-visible)");
  if (!reveals.length) return;

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("agb-page-reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("agb-page-reveal-visible"));
  }
}

export function sectionWrapper({ title, content }) {
  return `
    <section class="agb-section">
      <div class="container">
        <h2>${title}</h2>
        ${content}
      </div>
    </section>
  `;
}

export function card({ title, body, badge = "" }) {
  const badgeHtml = badge ? `<p class="agb-card-badge">${badge}</p>` : "";
  return `
    <article class="agb-card">
      ${badgeHtml}
      <h3>${title}</h3>
      <p>${body}</p>
    </article>
  `;
}

export function listRenderer(items, renderItem, containerClass = "row") {
  return `<div class="${containerClass}">${items.map(renderItem).join("")}</div>`;
}

export {
  LEADERBOARD_COLUMNS,
  normalizeEntry,
  prepareLeaderboardGroups,
  renderLeaderboardTable,
  sortAndRankEntries
} from "./leaderboard-table.js";
