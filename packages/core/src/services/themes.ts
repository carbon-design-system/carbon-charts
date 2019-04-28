import colors from "./colors";

// Generates array of color values
// For all available colors within the shades provided
const generateTheme = (firstShade, secondShade) => {
	const firstPalette = [];
	const secondPalette = [];

	const colorKeys = Object.keys(colors);
	for (let i = 0; i < 2; i++) {
		colorKeys.forEach((colorKey, j) => {
			const shadeToUse = (i + j) % 2 === 0 ? secondShade : firstShade;
			console.log("shadeToUse", colorKey, shadeToUse);
			firstPalette.push(
				colors[colorKey](shadeToUse)
			);
		});
	}

	return firstPalette.concat(secondPalette);
};

export const HC_1 = generateTheme(80, 50);
export const HC_2 = generateTheme(70, 40);
export const HC_3 = generateTheme(60, 40);
export const HC_4 = generateTheme(80, 40);
