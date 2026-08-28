const galaxyStorageKey = "starpilot-galaxy-theme";

function setGalaxyTheme(enabled) {
  if (enabled) {
    document.documentElement.setAttribute(
      "data-galaxy-theme",
      "true"
    );

    localStorage.setItem(
      galaxyStorageKey,
      "true"
    );
  } else {
    document.documentElement.removeAttribute(
      "data-galaxy-theme"
    );

    localStorage.removeItem(
      galaxyStorageKey
    );
  }

  updateThemeButtons();
}

function updateThemeButtons() {
  const galaxy =
    document.documentElement.getAttribute(
      "data-galaxy-theme"
    ) === "true";

  const defaultButton =
    document.querySelector("#theme-default");

  const galaxyButton =
    document.querySelector("#theme-galaxy");

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
