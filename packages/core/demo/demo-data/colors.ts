import {
	colors as colorsService,
	themes
} from "../../src/index"

const urlParams = new URLSearchParams(window.location.search);
const theme = parseInt(urlParams.get('theme'));
let themeToUse = themes.LIGHT_1;

switch(theme) {
	case 2:
		themeToUse = themes.LIGHT_2;
		break;
	case 3:
		themeToUse = themes.LIGHT_3;
		break;
	case 4:
		themeToUse = themes.HC_3;
		break;
	case 5:
		themeToUse = themes.HC_4;
		break;
}

export const colors = window["isExperimental"] ?
	themeToUse:
	[
		"#00a68f",
		"#3b1a40",
		"#473793",
		"#3c6df0",
		"#56D2BB"
	];
