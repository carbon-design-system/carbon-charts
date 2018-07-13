// Functions
const toggleClass = (element: HTMLElement, className: string) => {
	if (element.classList.contains(className)) {
		element.classList.remove(className);
	} else {
		element.classList.add(className);
	}
};

const toggleChevronSVG = (svgElement) => {
	// const direction = svgElement.getAttribute("direction");

	svgElement.classList.toggle("flipped-y");
};

// Dropdown menu buttons
const buttonAddonElements = Array.prototype.slice.call(document.querySelectorAll("button.btn--primary-addon"));
buttonAddonElements.forEach(buttonElement => {
	buttonElement.onclick = (e: MouseEvent) => {
		const targetElement = <HTMLElement>e.currentTarget;
		const parentElement = targetElement.parentElement;
		const dropdownElement = <HTMLElement>parentElement.querySelector("ul.btn_menu");

		// Make dropdown menu visible
		dropdownElement.classList.toggle("visible");

		const svgElement = parentElement.querySelector("svg");
		toggleChevronSVG(svgElement);

		// If menu items are clicked, close menu
		const menuItemElements = Array.prototype.slice.call(dropdownElement.querySelectorAll("li"));
		menuItemElements.forEach(menuItemElement => {
			menuItemElement.addEventListener("click", () => {
				dropdownElement.classList.toggle("visible");
				toggleChevronSVG(svgElement);
			});
		});
	};
});
