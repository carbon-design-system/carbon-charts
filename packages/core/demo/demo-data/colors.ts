import {
	colors as colorsService,
	themes
} from "../../src/index"

export const colors = window["isExperimental"] ?
	[
		colorsService.purple(60),
		colorsService.teal(30),
		colorsService.magenta(50),
		colorsService.cyan(40),
		colorsService.magenta(60),
		colorsService.purple(30),
		colorsService.cyan(80)		
	]:
	[
		"#00a68f",
		"#3b1a40",
		"#473793",
		"#3c6df0",
		"#56D2BB"
	];
