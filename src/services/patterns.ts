import * as d3 from "d3";

import PATTERN_SVGS from "../assets/patterns/index";

const selectors = {
	PATTERNS_CONTAINER: "peretz-charts-patterns"
};

export default class PatternsService {
	container: any;

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
	addPatternSVGs() {
		d3.select(this.container)
			.style("display", "table")
			.style("max-height", 0);

		PATTERN_SVGS.forEach((patternSVG, i) => {
			const index = i + 1;

			const svgContainer = document.createElement("div");
			svgContainer.id = `peretz-charts-pattern-container-${index}`;
			svgContainer.innerHTML = removeComments(patternSVG);

			const mountedSVG = svgContainer.querySelector("svg");
			mountedSVG.id = `peretz-charts-pattern-${index}-svg`;

			const patternElement = mountedSVG.querySelector("pattern");
			patternElement.id = `peretz-charts-pattern-${index}`;

			// Update pattern widths & heights
			patternElement.setAttribute("width", "20");
			patternElement.setAttribute("height", "20");

			if (index === 2 || index === 4) {
				patternElement.setAttribute("width", "30");
				patternElement.setAttribute("height", "30");
			}

			if (index === 5 || index === 1) {
				patternElement.setAttribute("width", "40");
				patternElement.setAttribute("height", "40");
			}

			this.container.appendChild(svgContainer);
		});
	}

	getFillValues() {
		return PATTERN_SVGS.map((patternSVG, i) => `url(#peretz-charts-pattern-${i + 1})`);
	}
}

const removeComments = htmlString => htmlString.replace(/<!--[\s\S]*?-->/g, "");
