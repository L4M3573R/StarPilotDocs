(() => {
  "use strict";

  if (window.__starPilotThemeLoader) return;
  window.__starPilotThemeLoader = true;

  const STORAGE_KEY = "starpilot-site-theme";
  const DEFAULT_THEME = "galaxy";
  const THEMES = new Set(["galaxy", "material"]);
  const root = document.documentElement;
  const loaderUrl = new URL(document.currentScript.src);
  const assetBase = new URL("themes/", loaderUrl);
  let activationId = 0;
  let instantNavigationSubscription;

  function readSavedTheme() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return THEMES.has(saved) ? saved : DEFAULT_THEME;
    } catch {
      return DEFAULT_THEME;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // The selected theme still works when storage is unavailable.
    }
  }

  function themeAsset(theme, filename) {
    return new URL(`${theme}/${filename}`, assetBase).href;
  }

  function preserveAsset(asset) {
    const assetHost = document.getElementById("site-theme-assets") || document.body;
    if (assetHost && asset.parentElement !== assetHost) {
      assetHost.appendChild(asset);
    }
  }

  function preserveThemeAssets() {
    document.querySelectorAll("[data-site-theme-asset]").forEach(preserveAsset);
  }

  function removeThemeAssets() {
    document.dispatchEvent(new CustomEvent("site-theme:unload"));
    document.querySelectorAll("[data-site-theme-asset]").forEach((asset) => asset.remove());
  }

  function updateSelector(theme) {
    const selector = document.getElementById("theme-selector");
    if (selector && selector.value !== theme) selector.value = theme;
  }

  function placeThemeSelector() {
    const menu = document.querySelector(".site-theme-menu");
    const navigation = document.querySelector(".md-sidebar--primary");
    if (menu && navigation && menu.parentElement !== navigation) navigation.appendChild(menu);
  }

  function loadStylesheet(theme, id) {
    return new Promise((resolve, reject) => {
      const existing = document.getElementById(id);
      if (existing) {
        resolve();
        return;
      }

      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = themeAsset(theme, "theme.css");
      link.dataset.siteThemeAsset = theme;
      link.addEventListener("load", () => {
        preserveAsset(link);
        resolve();
      }, { once: true });
      link.addEventListener("error", reject, { once: true });
      document.head.appendChild(link);
    });
  }

  function loadScript(theme, id) {
    if (document.getElementById(id)) return;

    const script = document.createElement("script");
    script.id = id;
    script.src = themeAsset(theme, "theme.js");
    script.dataset.siteThemeAsset = theme;
    (document.getElementById("site-theme-assets") || document.body || document.head).appendChild(script);
  }

  async function activateTheme(requestedTheme, persist = true) {
    const theme = THEMES.has(requestedTheme) ? requestedTheme : DEFAULT_THEME;
    const currentActivation = ++activationId;

    removeThemeAssets();
    root.dataset.siteTheme = theme;
    updateSelector(theme);
    if (persist) saveTheme(theme);

    try {
      await loadStylesheet(theme, `site-theme-${theme}-css`);
      if (currentActivation !== activationId || root.dataset.siteTheme !== theme) return;
      loadScript(theme, `site-theme-${theme}-js`);
    } catch (error) {
      console.error(`Unable to load the ${theme} theme.`, error);
    }
  }

  document.addEventListener("change", (event) => {
    if (event.target instanceof HTMLSelectElement && event.target.id === "theme-selector") {
      activateTheme(event.target.value);
    }
  });

  function handlePageRender() {
    const theme = root.dataset.siteTheme || readSavedTheme();
    preserveThemeAssets();
    placeThemeSelector();
    updateSelector(theme);
    document.dispatchEvent(new CustomEvent("site-theme:render", { detail: { theme } }));
  }

  function initializePageLifecycle() {
    preserveThemeAssets();

    if (!instantNavigationSubscription && typeof document$ !== "undefined") {
      instantNavigationSubscription = document$.subscribe(handlePageRender);
    } else {
      handlePageRender();
    }
  }

  document.addEventListener("DOMContentLoaded", initializePageLifecycle, { once: true });

  activateTheme(readSavedTheme(), false);
})();
