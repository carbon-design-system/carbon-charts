import { colorPalettes } from "../src/index";

export const setOrUpdateParam = (name, value) => {
    const params = new URLSearchParams(location.search)

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
    const params = new URLSearchParams(location.search)
    let themeName;
    if (params.has("theme") && colorPalettes[params.get("theme")]) {
        themeName = params.get("theme");
    } else {
        themeName = "DEFAULT";
    }
    const dropdownDefaultOption = document.querySelector("div.theme-selector li.bx--dropdown-text");
    const selectedOption = dropdownOptions.find(dO => dO.parentNode.getAttribute("data-value") === themeName);
    dropdownDefaultOption.innerHTML = selectedOption.innerText;
};

const initializeRightToLeftEnabler = () => {
    const rtlSwitchWrapper = document.querySelector("fieldset.rtl-switch");
    const rtlCheckbox = (rtlSwitchWrapper.querySelector("input#toggleRTLInput") as HTMLInputElement);
    const params = new URLSearchParams(location.search);

    // global
    window["isRTL"] = params.get("rtl") === "true";
	rtlCheckbox.checked = window["isRTL"];

    // Set click listener for rtl options
    rtlSwitchWrapper.querySelector("label.bx--toggle__label").addEventListener("click", () => {
		// Need the setTimeout
		// Here since carbon toggle
		// Does not provide a callback
		// Therefore we wait until the change in toggle
		// Status takes effect
        setTimeout(() => {
            const rtlMode = rtlCheckbox.checked;

            setOrUpdateParam("rtl", rtlMode);
        });
    });

    // Set state for right-to-left support
    if (params.has("rtl") && params.get("rtl") === "true") {
        rtlCheckbox.checked = true;
    } else {
        rtlCheckbox.checked = false;
    }

    const rtlDefaultOptions = document.querySelector("fieldset.rtl-switch .bx--toggle");
    const selectedOption = (rtlSwitchWrapper.querySelector("label.bx--toggle__label") as HTMLInputElement);
    rtlDefaultOptions.innerHTML = selectedOption.innerHTML;
};

export const initializeDemoOptions = () => {
    initializeThemeSelector();
    initializeRightToLeftEnabler();
};
