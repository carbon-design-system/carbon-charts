import PATTERN_SVGS from "../assets/patterns/index";

const selectors = {
	PATTERNS_CONTAINER: "peretz-charts-patterns"
};

export default class PatternsService {
	container: any;

	constructor() {
		this.setDiv();
	}

	setDiv() {
		const divExists = document.getElementById(selectors.PATTERNS_CONTAINER);
		if (!divExists) {
			const div = document.createElement("div");
			div.id = selectors.PATTERNS_CONTAINER;

			document.body.appendChild(div);

			this.container = div;
		}
	}

	addPatternSVGs() {
		PATTERN_SVGS.forEach((patternSVG, i) => {
			const svgContainer = document.createElement("div");
			svgContainer.id = `peretz-charts-pattern-container-${i}`;
			svgContainer.innerHTML = removeComments(patternSVG);

			const mountedSVG = svgContainer.querySelector("svg");
			mountedSVG.id = `peretz-charts-pattern-${i}-svg`;

			mountedSVG.querySelector("pattern").id = `peretz-charts-pattern-${i}`;

			this.container.appendChild(svgContainer);
		});
	}
}

const removeComments = htmlString => htmlString.replace(/<!--[\s\S]*?-->/g, "");
