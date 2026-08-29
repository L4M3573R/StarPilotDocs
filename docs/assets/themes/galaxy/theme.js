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

  function createStar(random) {
    const star = document.createElement("span");
    const sizeRoll = random();
    const size = sizeRoll < 0.82 ? 1 : sizeRoll < 0.98 ? 2 : 3;
    const colorRoll = random();
    const color = colorRoll < 0.86
      ? "210, 215, 225"
      : colorRoll < 0.92
        ? "115, 155, 215"
        : colorRoll < 0.98
          ? "150, 115, 205"
          : "190, 170, 225";

    star.className = "galaxy-star";
    star.style.left = `${random() * 100}%`;
    star.style.top = `${random() * 100}%`;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.backgroundColor = `rgba(${color}, ${0.16 + random() * 0.38})`;

    if (size > 1 && random() > 0.72) {
      star.style.boxShadow = `0 0 ${size * 2}px rgba(${color}, 0.22)`;
    }

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
      stars.appendChild(createStar(random));
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
