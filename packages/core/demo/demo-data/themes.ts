
const urlParams = new URLSearchParams(window.location.search);

export const getTheme = () => {
	if (urlParams.has("theme")) {
		switch (urlParams.get("theme")) {
			case "DARK_1":
				return "g100";
			default:
				return "white";
		}
	} else {
		return "white";
	}
};
