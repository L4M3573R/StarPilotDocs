const galaxyStorageKey = "starpilot-galaxy-theme";

function setGalaxyTheme(enabled) {
  if (enabled) {
    document.documentElement.setAttribute("data-galaxy-theme", "true");
    localStorage.setItem(galaxyStorageKey, "true");
  } else {
    document.documentElement.removeAttribute("data-galaxy-theme");
    localStorage.removeItem(galaxyStorageKey);
  }

  updateGalaxyButton(enabled);
}

function updateGalaxyButton(enabled) {
  const button = document.querySelector("#galaxy-theme-toggle");

  if (!button) return;

  button.setAttribute("aria-label",
    enabled
      ? "Disable Galaxy theme"
      : "Enable Galaxy theme"
  );

  button.title =
    enabled
      ? "Disable Galaxy theme"
      : "Enable Galaxy theme";
}

function toggleGalaxyTheme() {
  const enabled =
    document.documentElement.getAttribute("data-galaxy-theme") === "true";

  setGalaxyTheme(!enabled);
}


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
