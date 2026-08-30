(() => {
  "use strict";

  const THEME = "galaxy";
  const root = document.documentElement;
  const STARFIELD_ID = "galaxy-starfield";
  const SEED_KEY = "starpilot-galaxy-star-seed";
  let disposed = false;

  function getSeed() {
    try {
      const saved = Number(sessionStorage.getItem(SEED_KEY));
      if (Number.isInteger(saved) && saved > 0) return saved;

      const seed = Math.floor(Math.random() * 2147483646) + 1;
      sessionStorage.setItem(SEED_KEY, String(seed));
      return seed;
    } catch {
      return 8675309;
    }
  }

  function randomGenerator(seed) {
    let state = seed % 2147483647;
    return () => {
      state = (state * 16807) % 2147483647;
      return (state - 1) / 2147483646;
    };
  }

  function createStar(random, index) {
    const star = document.createElement("span");
    const sizeRoll = random();
    const size = sizeRoll < 0.82 ? 1 : sizeRoll < 0.98 ? 2 : 3;
    const accentColors = [
      "235, 88, 105",
      "235, 88, 105",
      "88, 158, 255",
      "88, 158, 255",
      "255, 211, 92",
      "255, 211, 92",
    ];
    const color = accentColors[index] || (random() < 0.94
      ? "210, 215, 225"
      : "190, 170, 225");

    star.className = "galaxy-star";
    star.style.left = `${random() * 100}%`;
    star.style.top = `${random() * 100}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.backgroundColor = `rgb(${color})`;
    star.style.setProperty("--star-glow-color", color);
    star.style.setProperty("--star-glow-radius", `${3 + size * 2.5}px`);
    star.style.setProperty("--star-dim-opacity", `${0.28 + random() * 0.2}`);
    const glowDuration = 7 + random() * 8;
    star.style.animationDuration = `${glowDuration}s`;
    star.style.animationDelay = `${-random() * glowDuration}s`;

    return star;
  }

  function ensureStarfield() {
    if (disposed || !document.body || root.dataset.siteTheme !== THEME || document.getElementById(STARFIELD_ID)) return;

    const field = document.createElement("div");
    const stars = document.createDocumentFragment();
    const random = randomGenerator(getSeed());
    const starCount = Math.min(90, Math.max(64, Math.round(window.innerWidth * window.innerHeight / 18000)));

    field.id = STARFIELD_ID;
    field.className = "galaxy-starfield";
    field.setAttribute("aria-hidden", "true");

    for (let index = 0; index < starCount; index += 1) {
      stars.appendChild(createStar(random, index));
    }

    field.appendChild(stars);
    document.body.prepend(field);
  }

  function cleanup() {
    if (disposed) return;
    disposed = true;
    document.getElementById(STARFIELD_ID)?.remove();
    document.removeEventListener("DOMContentLoaded", ensureStarfield);
    document.removeEventListener("site-theme:render", handleRender);
    document.removeEventListener("site-theme:unload", cleanup);
  }

  function handleRender(event) {
    if (event.detail?.theme === THEME) ensureStarfield();
  }

  document.addEventListener("site-theme:render", handleRender);
  document.addEventListener("site-theme:unload", cleanup);
  document.addEventListener("DOMContentLoaded", ensureStarfield, { once: true });
  ensureStarfield();
})();
