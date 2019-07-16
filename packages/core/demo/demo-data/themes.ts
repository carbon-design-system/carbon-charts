const urlParams = new URLSearchParams(window.location.search);
const { ChartTheme } = require("./../../src/configuration");

export const getTheme = () => {
	if (urlParams.has("theme")) {
		switch (urlParams.get("theme")) {
			case "G10":
				return ChartTheme.G10;
			case "G90":
				return ChartTheme.G90;
			case "G100":
				return ChartTheme.G100;
			default:
				return ChartTheme.WHITE;
		}
	} else {
		return ChartTheme.WHITE;
	}
};
