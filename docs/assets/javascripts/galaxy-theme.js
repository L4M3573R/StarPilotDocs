const galaxyStorageKey = "starpilot-theme";

function applyTheme(theme) {
  const galaxy = theme === "galaxy";

  if (galaxy) {
    document.documentElement.setAttribute(
      "data-galaxy-theme",
      "true"
    );

    createStarfield();
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

  selector.value =
    document.documentElement.hasAttribute(
      "data-galaxy-theme"
    )
      ? "galaxy"
      : "default";
}


/* =========================================================
   STARFIELD
   ========================================================= */

function createStarfield() {
  if (
    document.querySelector(".galaxy-starfield")
  ) {
    return;
  }

  const field =
    document.createElement("div");

  field.className = "galaxy-starfield";

  /*
   * Sparse like the Nocturnal Souls reference.
   * Increase this slightly if you want more stars.
   */
  const starCount = 95;

  for (let i = 0; i < starCount; i++) {
    const star =
      document.createElement("span");

    star.className = "galaxy-star";

    /*
     * Random position across viewport
     */
    star.style.left =
      `${Math.random() * 100}%`;

    star.style.top =
      `${Math.random() * 100}%`;


    /*
     * Most stars are tiny.
     */
    const sizeRoll = Math.random();

    let size;

    if (sizeRoll < 0.80) {
      size = 1;
    } else if (sizeRoll < 0.97) {
      size = 2;
    } else {
      size = 3;
    }

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;


    /*
     * Mostly neutral stars.
     * Small percentage get subtle color.
     */
    const colorRoll = Math.random();

    let color;

    if (colorRoll < 0.84) {
      color = "210, 215, 225";
    } else if (colorRoll < 0.91) {
      color = "105, 150, 210";
    } else if (colorRoll < 0.97) {
      color = "145, 105, 190";
    } else {
      color = "175, 155, 215";
    }


    /*
     * Keep most of them faint.
     */
    const opacity =
      0.18 + Math.random() * 0.40;

    star.style.backgroundColor =
      `rgba(${color}, ${opacity})`;


    /*
     * Only the rare brighter stars
     * get a tiny glow.
     */
    if (size >= 2 && Math.random() > 0.65) {
      star.style.boxShadow =
        `0 0 ${size * 2}px rgba(${color}, 0.25)`;
    }


    field.appendChild(star);
  }

  document.body.prepend(field);
}


/* =========================================================
   INITIAL THEME
   ========================================================= */

const savedTheme =
  localStorage.getItem(galaxyStorageKey);

if (savedTheme === "galaxy") {
  document.documentElement.setAttribute(
    "data-galaxy-theme",
    "true"
  );
}


/* =========================================================
   THEME DROPDOWN
   ========================================================= */

document.addEventListener(
  "change",
  (event) => {
    if (
      event.target.id ===
      "theme-selector"
    ) {
      applyTheme(
        event.target.value
      );
    }
  }
);


/* =========================================================
   INITIALIZATION
   ========================================================= */

function initializeGalaxyTheme() {
  updateThemeSelector();

  if (
    document.documentElement
      .hasAttribute(
        "data-galaxy-theme"
      )
  ) {
    createStarfield();
  }
}

document.addEventListener(
  "DOMContentLoaded",
  initializeGalaxyTheme
);


/*
 * MkDocs Material instant navigation
 */
if (typeof document$ !== "undefined") {
  document$.subscribe(() => {
    initializeGalaxyTheme();
  });
}
