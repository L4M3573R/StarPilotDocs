const galaxyStorageKey = "starpilot-theme";

function applyTheme(theme) {
  if (theme === "galaxy") {
    document.documentElement.setAttribute(
      "data-galaxy-theme",
      "true"
    );
  } else {
    document.documentElement.removeAttribute(
      "data-galaxy-theme"
    );
  }

  localStorage.setItem(
    galaxyStorageKey,
    theme
  );

  updateThemeSelector();
}

function updateThemeSelector() {
  const selector =
    document.getElementById("theme-selector");

  if (!selector) return;

  const galaxyEnabled =
    document.documentElement.getAttribute(
      "data-galaxy-theme"
    ) === "true";

  selector.value =
    galaxyEnabled
      ? "galaxy"
      : "default";
}


/* Restore saved theme */
const savedTheme =
  localStorage.getItem(galaxyStorageKey);

if (savedTheme === "galaxy") {
  document.documentElement.setAttribute(
    "data-galaxy-theme",
    "true"
  );
}


/* Listen for dropdown changes */
document.addEventListener("change", (event) => {
  if (event.target.id === "theme-selector") {
    applyTheme(event.target.value);
  }
});


/* Set dropdown correctly on first page load */
document.addEventListener(
  "DOMContentLoaded",
  updateThemeSelector
);


/* MkDocs Material instant-navigation support */
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    updateThemeSelector();
  });
}      ? "galaxy"
      : "default";
}


/*
 * Load saved theme immediately.
 */
const savedTheme =
  localStorage.getItem(galaxyStorageKey);

if (savedTheme === "galaxy") {
  document.documentElement.setAttribute(
    "data-galaxy-theme",
    "true"
  );
}


/*
 * Event delegation means this keeps working even when
 * MkDocs Material replaces parts of the page.
 */
document.addEventListener("change", (event) => {
  if (event.target.id === "theme-selector") {
    applyTheme(event.target.value);
  }
});


document.addEventListener(
  "DOMContentLoaded",
  updateThemeSelector
);


/*
 * MkDocs Material instant navigation support.
 */
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    updateThemeSelector();
  });
}    document.querySelector("#theme-galaxy");

  if (defaultButton) {
    defaultButton.classList.toggle(
      "active",
      !galaxy
    );
  }

  if (galaxyButton) {
    galaxyButton.classList.toggle(
      "active",
      galaxy
    );
  }
}

function setupThemeButtons() {
  const defaultButton =
    document.querySelector("#theme-default");

  const galaxyButton =
    document.querySelector("#theme-galaxy");

  if (defaultButton) {
    defaultButton.onclick = () =>
      setGalaxyTheme(false);
  }

  if (galaxyButton) {
    galaxyButton.onclick = () =>
      setGalaxyTheme(true);
  }

  updateThemeButtons();
}

if (
  localStorage.getItem(
    galaxyStorageKey
  ) === "true"
) {
  document.documentElement.setAttribute(
    "data-galaxy-theme",
    "true"
  );
}

document.addEventListener(
  "DOMContentLoaded",
  setupThemeButtons
);

if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    setupThemeButtons();
  });
}}


/*
 * Restore saved preference before the user interacts.
 */
if (localStorage.getItem(galaxyStorageKey) === "true") {
  document.documentElement.setAttribute(
    "data-galaxy-theme",
    "true"
  );
}


/*
 * MkDocs Material uses instant navigation, so initialization
 * needs to survive page changes.
 */
document.addEventListener("DOMContentLoaded", () => {

  const button =
    document.querySelector("#galaxy-theme-toggle");

  if (button) {
    button.addEventListener(
      "click",
      toggleGalaxyTheme
    );
  }

  updateGalaxyButton(
    document.documentElement
      .getAttribute("data-galaxy-theme") === "true"
  );
});
