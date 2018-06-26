import * as d3 from "d3";

import PATTERN_SVGS from "../assets/patterns/index";

const selectors = {
	PATTERNS_CONTAINER: "peretz-charts-patterns"
};

export default class PatternsService {
	container: any;
	accum = 0;

	constructor() {
		this.setDiv();
	}

	/**
	 * Sets the container div for pattern SVGs in DOM
	 *
	 * @memberof PatternsService
	 */
	setDiv() {
		const containerDiv = document.getElementById(selectors.PATTERNS_CONTAINER);
		if (!containerDiv) {
			const div = document.createElement("div");
			div.id = selectors.PATTERNS_CONTAINER;

			const mountedDiv = document.body.appendChild(div);
			this.container = mountedDiv;
		} else {
			this.container = containerDiv;
		}
	}

	/**
	 * Adds all the pattern SVGs to the container div, applying a unique ID to each one
	 *
	 * @memberof PatternsService
	 */
	addPatternSVGs(data: any, colorScale: any) {
		// d3.select(this.container)
		// 	.style("display", "table")
		// 	.style("max-height", 0);

		// data.forEach((dataPoint, i) => {
		// 	const index = i + 1;
		// 	const id = ++this.accum;

		// 	// Create SVG container div
		// 	const svgContainer = document.createElement("div");
		// 	svgContainer.id = `peretz-charts-pattern-container-${id}`;
		// 	svgContainer.innerHTML = trimSVG(PATTERN_SVGS[i]);

		// 	// Apply id to the svg element
		// 	const mountedSVG = svgContainer.querySelector("svg");
		// 	mountedSVG.id = `peretz-charts-pattern-${id}-svg`;

		// 	// Apply id to the pattern element
		// 	const patternElement = mountedSVG.querySelector("pattern");
		// 	patternElement.id = `peretz-charts-pattern-${id}`;

		// 	// Apply fills to everything
		// 	const allElementsInsideSVG = Array.prototype.slice.call(mountedSVG.querySelectorAll("pattern g *"));
		// 	allElementsInsideSVG.forEach((element, elementIndex) => {
		// 		if (elementIndex > 0) {
		// 			element.style.fill = colorScale(dataPoint.label);
		// 			element.style.stroke = colorScale(dataPoint.label);
		// 		} else {
		// 			element.style.fill = "transparent";
		// 		}

		// 		element.removeAttribute("id");
		// 		element.removeAttribute("class");
		// 	});

		// 	// Update pattern widths & heights
		// 	patternElement.setAttribute("width", "20");
		// 	patternElement.setAttribute("height", "20");

		// 	if (index === 2 || index === 4) {
		// 		patternElement.setAttribute("width", "30");
		// 		patternElement.setAttribute("height", "30");
		// 	}

		// 	if (index === 5 || index === 1) {
		// 		patternElement.setAttribute("width", "40");
		// 		patternElement.setAttribute("height", "40");
		// 	}

		// 	this.container.appendChild(svgContainer);
		// });
	}

	getFillValues() {
		return PATTERN_SVGS.map((patternSVG, i) => `url(#peretz-charts-pattern-${i + 1})`);
	}
}

// Helper functions
const trimSVG = (htmlString: any) => {
	// Remove the CSS style block
	const htmlBeforeStyleBlock = htmlString.substring(0, htmlString.indexOf("<style type=\"text/css\">"));
	const htmlAfterStyleBlock = htmlString.substring(htmlString.indexOf("</style>") + "</style>".length);

	htmlString = htmlBeforeStyleBlock + htmlAfterStyleBlock;

	// Remove Adobe comments
	htmlString = htmlString.replace(/<!--[\s\S]*?-->/g, "");

	return htmlString;
};
