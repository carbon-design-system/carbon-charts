import { colorPalettes } from "../src/index";

export const setOrUpdateParam = (name, value) => {
	const params = new URLSearchParams(location.search);

	// Remove any existing "theme" param
	if (params.has(name)) {
		params.delete(name);
	}

	params.append(name, value);

	location.search = params.toString();
};

// Theme selector
const initializeThemeSelector = () => {
	const dropdownOptions = Array.prototype.slice.call(
		document.querySelectorAll("div.theme-selector a.bx--dropdown-link")
	);

	// Set click listeners for the dropdown options
	dropdownOptions.forEach(dropdownOption => {
		dropdownOption.addEventListener("click", e => {
			e.preventDefault();

			setOrUpdateParam("theme", e.target.parentNode.getAttribute("data-value"));
		});
	});

	// Set state for current theme
	const params = new URLSearchParams(location.search);
	let themeName;
	if (params.has("theme") && colorPalettes[params.get("theme")]) {
		themeName = params.get("theme");
	} else {
		themeName = "DEFAULT";
	}
	const dropdownDefaultOption = document.querySelector("div.theme-selector li.bx--dropdown-text");
	const selectedOption = dropdownOptions.find(dO => dO.parentNode.getAttribute("data-value") === themeName);
	dropdownDefaultOption.innerHTML = selectedOption.innerText;

	// Set dark theme on the window
	switch (themeName) {
		case "DARK_1":
			document.body.classList.add("carbon--dark");
			break;
		default:
			break;
	}
};

export const initializeDemoOptions = () => {
	initializeThemeSelector();
};
