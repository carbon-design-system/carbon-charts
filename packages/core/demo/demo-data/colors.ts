import { themes, defaultColors } from "../../src/index";

const urlParams = new URLSearchParams(window.location.search);

// Grab "theme" param from query string
let themeToUse = urlParams.has("theme") ? themes[urlParams.get("theme")] : defaultColors;

export const colors = themeToUse;
