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

export const LIGHT_1 = [
	colors.purple(60),
	colors.teal(30),
	colors.magenta(50),
	colors.cyan(40),
	colors.magenta(80),
	colors.purple(30),
	colors.cyan(80)
];

export const LIGHT_2 = [
	colors.purple(60),
	colors.magenta(30),
	colors.teal(80),
	colors.cyan(40),
	colors.magenta(70),
	colors.teal(30),
	colors.cyan(70)
];

export const LIGHT_3 = [
	colors.purple(60),
	colors.magenta(30),
	colors.teal(70),
	colors.cyan(40),
	colors.magenta(70),
	colors.teal(30),
	colors.cyan(70)
];

export const DARK_1 = [
	colors.purple(60),
	colors.teal(30),
	colors.magenta(50),
	colors.green(40),
	colors.purple(20),
	colors.teal(60),
	colors.magenta(30)
];

export const HC_1 = generateTheme(80, 50);
export const HC_2 = generateTheme(70, 40);
export const HC_3 = generateTheme(60, 40);
export const HC_4 = generateTheme(80, 40);
