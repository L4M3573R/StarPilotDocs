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
  let preservedNavigationScroll;
  let selectionAnimation;
  let pageFlipAnimations = [];
  let pendingPageFlip;
  let pageFlipTimeout;
  const tabNavigationBypass = new WeakSet();
  const sidebarNavigationBypass = new WeakSet();
  const homeNavigationBypass = new WeakSet();

  function isVisibleElement(element) {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  // Tab links swap the whole spread, so the navigation turns with the page.
  // Sidebar links only change the article, so the navigation stays put.
  function pageFlipElements(axis) {
    const selectors = axis === "x"
      ? [
          ".md-sidebar--primary .md-sidebar__scrollwrap",
          ".md-content",
          ".md-sidebar--secondary .md-sidebar__scrollwrap",
        ]
      : [".md-content", ".md-sidebar--secondary .md-sidebar__scrollwrap"];
    return selectors
      .map((selector) => document.querySelector(selector))
      .filter((element) => element && isVisibleElement(element));
  }

  // Columns are separate elements, so they only read as one sheet of paper
  // when they share a hinge line and a vanishing point. The hinge sits in the
  // middle of the spread so the page turns on its centre like a card.
  function preparePageFlip(pages, axis) {
    const rects = pages.map((page) => page.getBoundingClientRect());
    const originY = window.innerHeight / 2;
    const originX = axis === "x"
      ? (Math.min(...rects.map((rect) => rect.left)) +
         Math.max(...rects.map((rect) => rect.right))) / 2
      : window.innerWidth / 2;

    pages.forEach((page, index) => {
      const rect = rects[index];
      page.style.transformOrigin = `${originX - rect.left}px ${originY - rect.top}px`;

      // An article runs far past the fold, and turning it on a horizontal
      // hinge swings those far ends through the camera, which tears the
      // geometry and drops frames. Only the part on screen can be seen
      // mid-turn, so turn that slice and leave the rest unpainted.
      if (axis === "y") {
        const above = Math.max(0, Math.round(-rect.top));
        const below = Math.max(0, Math.round(rect.bottom - window.innerHeight));
        page.style.clipPath = `inset(${above}px 0 ${below}px 0)`;
      }
    });
  }

  function clearPageFlipStyles(pages) {
    pages.forEach((page) => {
      page.style.removeProperty("transform-origin");
      page.style.removeProperty("clip-path");
    });
  }

  // The vertical turn only spans a viewport-tall slice, so it needs a nearer
  // camera than the full-width horizontal one to swing just as far.
  function pageFlipTransform(axis, degrees) {
    return axis === "x"
      ? `perspective(1400px) rotateY(${degrees}deg)`
      : `perspective(1100px) rotateX(${degrees}deg)`;
  }

  // A quarter turn leaves the spread edge-on, so the swap to the next page
  // happens out of sight and the incoming half reads as the reverse face.
  function pageFlipAngle(axis, direction) {
    return (axis === "x" ? -90 : 90) * direction;
  }

  function cancelPageFlipAnimations() {
    pageFlipAnimations.forEach((animation) => animation.cancel());
    pageFlipAnimations = [];
  }

  function endPageFlip(pages) {
    clearTimeout(pageFlipTimeout);
    clearPageFlipStyles(pages);
    root.classList.remove("site-page-flipping");
  }

  function startPageFlip(link, bypass, axis, direction) {
    const pages = pageFlipElements(axis);
    if (!pages.length) return false;

    pendingPageFlip = { axis, direction };
    cancelPageFlipAnimations();
    root.classList.add("site-page-flipping");
    preparePageFlip(pages, axis);
    pageFlipAnimations = pages.map((page) => page.animate([
        { transform: pageFlipTransform(axis, 0), filter: "brightness(1)" },
        {
          transform: pageFlipTransform(axis, pageFlipAngle(axis, direction)),
          filter: "brightness(0.55)",
        },
      ], {
        duration: 230,
        easing: "cubic-bezier(0.4, 0, 0.9, 0.6)",
        fill: "forwards",
      }));

    // The half-turned spread is invisible, so never leave it there if the
    // navigation it is waiting on never lands.
    clearTimeout(pageFlipTimeout);
    pageFlipTimeout = setTimeout(() => {
      if (!pendingPageFlip) return;
      pendingPageFlip = undefined;
      cancelPageFlipAnimations();
      endPageFlip(pages);
    }, 4000);

    Promise.all(pageFlipAnimations.map((animation) => animation.finished.catch(() => undefined))).then(() => {
      bypass.add(link);
      link.click();
    });
    return true;
  }

  // Second half of the same turn: the new page starts on the far face and
  // rotates back to square.
  function animateIncomingPage() {
    if (!pendingPageFlip) return;
    const { axis, direction } = pendingPageFlip;
    pendingPageFlip = undefined;
    const pages = pageFlipElements(axis);
    if (!pages.length) {
      endPageFlip(pages);
      return;
    }

    cancelPageFlipAnimations();
    root.classList.add("site-page-flipping");
    preparePageFlip(pages, axis);
    pageFlipAnimations = pages.map((page) => page.animate([
        {
          transform: pageFlipTransform(axis, -pageFlipAngle(axis, direction)),
          filter: "brightness(0.55)",
        },
        { transform: pageFlipTransform(axis, 0), filter: "brightness(1)" },
      ], {
        duration: 300,
        easing: "cubic-bezier(0.1, 0.4, 0.6, 1)",
      }));
    Promise.all(pageFlipAnimations.map((animation) => animation.finished.catch(() => undefined))).then(() => {
      endPageFlip(pages);
    });
  }

  function visibleElement(elements) {
    return Array.from(elements).find(isVisibleElement);
  }

  function animateNavigationSelection(link) {
    const tabs = link.closest(".md-tabs");
    const sidebar = link.closest(".md-sidebar--primary");
    if (!tabs && !sidebar) return;

    const scope = tabs || sidebar;
    const activeSelector = tabs
      ? ".md-tabs__item--active > .md-tabs__link, .md-tabs__link--active"
      : ".md-nav__link--active";
    const active = visibleElement(scope.querySelectorAll(activeSelector));
    const source = active?.querySelector(".md-ellipsis") || active;
    const target = link.querySelector(".md-ellipsis") || link;
    if (!source || source === target) return;

    const from = source.getBoundingClientRect();
    const to = target.getBoundingClientRect();
    if (!from.width || !to.width) return;

    selectionAnimation?.cancel();
    document.querySelector(".nav-selection-glider")?.remove();

    const glider = document.createElement("span");
    const movementClass = tabs
      ? "nav-selection-moving--tabs"
      : "nav-selection-moving--sidebar";
    glider.className = `nav-selection-glider ${tabs ? "nav-selection-glider--tabs" : "nav-selection-glider--sidebar"}`;
    Object.assign(glider.style, {
      left: `${from.left}px`,
      top: `${from.bottom + 2}px`,
      width: `${from.width}px`,
    });
    document.body.appendChild(glider);
    document.documentElement.classList.add(movementClass);

    selectionAnimation = glider.animate([
      { left: `${from.left}px`, top: `${from.bottom + 2}px`, width: `${from.width}px` },
      { left: `${to.left}px`, top: `${to.bottom + 2}px`, width: `${to.width}px` },
    ], {
      duration: 280,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "forwards",
    });

    selectionAnimation.addEventListener("finish", () => {
      glider.remove();
      document.documentElement.classList.remove(movementClass);
      selectionAnimation = undefined;
    }, { once: true });

    selectionAnimation.addEventListener("cancel", () => {
      glider.remove();
      document.documentElement.classList.remove(movementClass);
    }, { once: true });
  }

  function animatableClick(event) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  function tabLinks() {
    const tabs = document.querySelector(".md-tabs");
    return Array.from(tabs?.querySelectorAll("a.md-tabs__link") || []);
  }

  function activeTabLink() {
    const tabs = document.querySelector(".md-tabs");
    return tabs?.querySelector(".md-tabs__item--active > .md-tabs__link, .md-tabs__link--active");
  }

  function samePage(a, b) {
    const path = (url) => new URL(url, location.href).pathname.replace(/index\.html$/, "");
    return path(a) === path(b);
  }

  function animateTabPageFlip(event, link) {
    if (!animatableClick(event)) return false;

    const links = tabLinks();
    const active = activeTabLink();
    const fromIndex = links.indexOf(active);
    const toIndex = links.indexOf(link);
    const page = document.querySelector(".md-main");
    if (!active || active === link || fromIndex < 0 || toIndex < 0 || !page) return false;

    event.preventDefault();
    event.stopImmediatePropagation();

    return startPageFlip(link, tabNavigationBypass, "x", toIndex > fromIndex ? 1 : -1);
  }

  // The sidebar entry the header logo and wordmark lead back to. The lifted
  // nav repeats the tab itself as a hidden link with the same target, so only
  // the entry a reader can actually see is worth gliding the marker to.
  function homeSidebarEntry(link) {
    const sidebar = document.querySelector(".md-sidebar--primary");
    const entries = sidebar?.querySelectorAll("a.md-nav__link[href]") || [];
    return Array.from(entries).find(
      (entry) => samePage(entry.href, link.href) && isVisibleElement(entry)
    );
  }

  // The header logo and wordmark jump back to whichever tab owns the homepage,
  // so give them the page turn that clicking that tab would have given.
  function animateHomePageFlip(event, link) {
    if (!animatableClick(event)) return false;
    if (samePage(location.href, link.href)) return false;

    const links = tabLinks();
    const fromIndex = links.indexOf(activeTabLink());
    const toIndex = links.findIndex((tab) => samePage(tab.href, link.href));

    // The homepage already sits in the open tab, so the spread around the
    // article never changes. Hand the turn to its sidebar entry instead, so
    // the wordmark behaves exactly like clicking that entry in the navigation.
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
      const entry = homeSidebarEntry(link);
      const direction = entry ? sidebarFlipDirection(entry) : 0;
      if (!direction) return false;

      event.preventDefault();
      event.stopImmediatePropagation();

      animateNavigationSelection(entry);
      return startPageFlip(link, homeNavigationBypass, "y", direction);
    }

    event.preventDefault();
    event.stopImmediatePropagation();

    animateNavigationSelection(links[toIndex]);
    return startPageFlip(link, homeNavigationBypass, "x", toIndex > fromIndex ? 1 : -1);
  }

  // Navigation entries turn on the horizontal hinge, and which way they turn
  // follows whether the destination sits above or below the entry that is
  // open. Zero means this entry has nothing to turn away from.
  function sidebarFlipDirection(entry) {
    const sidebar = entry.closest(".md-sidebar--primary");
    const active = visibleElement(sidebar?.querySelectorAll("a.md-nav__link--active") || []);
    const source = active?.querySelector(".md-ellipsis") || active;
    const target = entry.querySelector(".md-ellipsis") || entry;
    if (!active || active === entry || !source || !target) return 0;

    return target.getBoundingClientRect().top > source.getBoundingClientRect().top ? 1 : -1;
  }

  function animateSidebarPageFlip(event, link) {
    if (!animatableClick(event)) return false;

    const direction = sidebarFlipDirection(link);
    const page = document.querySelector(".md-content");
    if (!direction || !page) return false;

    event.preventDefault();
    event.stopImmediatePropagation();

    return startPageFlip(link, sidebarNavigationBypass, "y", direction);
  }

  if (!window.__starPilotSidebarScrollGuard) {
    const nativeScrollTo = HTMLElement.prototype.scrollTo;

    HTMLElement.prototype.scrollTo = function (...args) {
      if (this.matches?.(".md-sidebar--primary .md-sidebar__scrollwrap")) return;
      return nativeScrollTo.apply(this, args);
    };

    window.__starPilotSidebarScrollGuard = true;
  }

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
    animateIncomingPage();
    const theme = root.dataset.siteTheme || readSavedTheme();
    preserveThemeAssets();
    updateSelector(theme);
    document.dispatchEvent(new CustomEvent("site-theme:render", { detail: { theme } }));

    if (preservedNavigationScroll !== undefined) {
      const scrollTop = preservedNavigationScroll;
      preservedNavigationScroll = undefined;
      const restore = () => {
        const scrollwrap = document.querySelector(
          ".md-sidebar--primary .md-sidebar__scrollwrap"
        );
        if (scrollwrap) scrollwrap.scrollTop = scrollTop;
      };

      restore();
      requestAnimationFrame(restore);
    }
  }

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const homeLink = target.closest(".md-header .md-logo, .md-header .starpilot-header-brand");
    if (homeLink) {
      if (homeNavigationBypass.has(homeLink)) {
        homeNavigationBypass.delete(homeLink);
      } else if (animateHomePageFlip(event, homeLink)) {
        return;
      }
    }

    const tabLink = target.closest(".md-tabs a.md-tabs__link");
    if (tabLink) {
      if (tabNavigationBypass.has(tabLink)) {
        tabNavigationBypass.delete(tabLink);
      } else {
        animateNavigationSelection(tabLink);
        if (animateTabPageFlip(event, tabLink)) return;
      }
    }

    const link = target.closest(".md-sidebar--primary a.md-nav__link");
    if (!link) return;

    const scrollwrap = link.closest(".md-sidebar__scrollwrap");
    if (scrollwrap) preservedNavigationScroll = scrollwrap.scrollTop;

    if (sidebarNavigationBypass.has(link)) {
      sidebarNavigationBypass.delete(link);
    } else {
      animateNavigationSelection(link);
      animateSidebarPageFlip(event, link);
    }
  }, true);

  function initializePageLifecycle() {
    root.classList.remove("site-page-flipping");
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
