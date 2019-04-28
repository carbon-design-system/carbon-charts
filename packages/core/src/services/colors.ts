const purplePalette = {
    30: "#d0b0ff",
    40: "#bb8eff",
    50: "#a970ff",
    60: "#8a3ffc",
    70: "#6e32c9",
    80: "#4f2196",
    90: "#38146b"
};

const magentaPalette = {
    30: "#ffa0c2",
    40: "#fa75a6",
    50: "#ee538b",
    60: "#d12765",
    70: "#a11950",
    80: "#760a3a",
    90: "#57002b"
};

const cyanPalette = {
    30: "#6ccaff",
    40: "#30b0ff",
    50: "#1193e8",
    60: "#0072c3",
    70: "#0058a1",
    80: "#003d73",
    90: "#002b50"
};

const tealPalette = {
    30: "#20d5d2",
    40: "#00bab6",
    50: "#009e9a",
    60: "#007d79",
    70: "#006161",
    80: "#004548",
    90: "#003137"
};

const getColor = (obj, shade) => obj[shade];

export default {
    purple: shade => getColor(purplePalette, shade),
    magenta: shade => getColor(magentaPalette, shade),
    cyan: shade => getColor(cyanPalette, shade),
    teal: shade => getColor(tealPalette, shade)
}
