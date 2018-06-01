// Dropdown menu buttons
const buttonAddonElements = Array.prototype.slice.call(document.querySelectorAll("button.btn--primary-addon"));
buttonAddonElements.forEach(buttonElement => {
	buttonElement.onclick = (e: MouseEvent) => {
		const targetElement = <HTMLElement>e.currentTarget;
		const parentElement = targetElement.parentElement;
		const dropdownElement = <HTMLElement>parentElement.querySelector("ul.btn_menu");

		// Make dropdown menu visible
		toggleClass(dropdownElement, "visible");

		const svgElement = parentElement.querySelector("svg use");
		toggleChevronSVG(svgElement);


		// // If menu items are clicked, close menu
		// const menuItemElements = Array.prototype.slice.call(dropdownElement.querySelectorAll("li"));
		// menuItemElements.forEach(menuItemElement => {
		// 	menuItemElement.onclick = () => {
		// 		toggleClass(dropdownElement, "visible");
		// 		toggleChevronSVG(svgElement);
		// 	};
		// });
	};
});

// Functions
const toggleClass = (element: HTMLElement, className: string) => {
	if (element.classList.contains(className)) {
		element.classList.remove(className);
	} else {
		element.classList.add(className);
	}
};

const toggleChevronSVG = (svgElement) => {
	const direction = svgElement.getAttribute("href").indexOf("down") > -1 ? "up" : "down";

	svgElement.removeAttribute("href");
	svgElement.setAttributeNS("http://www.w3.org/1999/xlink",
		"href", `https://peretz-icons.mybluemix.net/arrows_chevrons.svg#chevron_${direction}_16`);
};
