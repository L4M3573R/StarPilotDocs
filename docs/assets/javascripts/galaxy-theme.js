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

  localStorage.setItem(galaxyStorageKey, theme);

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


/* Correct selector on initial load */
document.addEventListener(
  "DOMContentLoaded",
  updateThemeSelector
);


/* MkDocs instant-navigation support */
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    updateThemeSelector();
  });
}
