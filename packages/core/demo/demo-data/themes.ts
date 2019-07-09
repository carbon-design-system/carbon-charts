
const urlParams = new URLSearchParams(window.location.search);
const { ChartTheme } = require("./../../src/configuration");

export const getTheme = () => {
	if (urlParams.has("theme")) {
		switch (urlParams.get("theme")) {
			case "DARK_1":
				return ChartTheme.DARK;
			default:
				return ChartTheme.LIGHT;
		}
	} else {
		return ChartTheme.LIGHT;
	}
};
