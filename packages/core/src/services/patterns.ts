// D3 Imports
import { select } from "d3-selection";

import PATTERN_SVGS from "../assets/patterns/index";
import * as Configuration from "../configuration";

const selectors = {
	PATTERNS_CONTAINER: "carbon-charts-patterns"
};

// Helper functions
const trimSVG = (htmlString: string) => {
	// Remove the CSS style block
	const htmlBeforeStyleBlock = htmlString.substring(0, htmlString.indexOf("<style type=\"text/css\">"));
	const htmlAfterStyleBlock = htmlString.substring(htmlString.indexOf("</style>") + "</style>".length);

	htmlString = htmlBeforeStyleBlock + htmlAfterStyleBlock;

	// Remove Adobe comments
	htmlString = htmlString.replace(/<!--[\s\S]*?-->/g, "");

	return htmlString;
};

export default class PatternsService {
	container: any;

	patternAccum = 0;
	idAccum = 0;

	patternURLs = {};

	constructor() {
		this.setDiv();
	}

	/**
	 * Sets the container div for pattern SVGs in DOM
	 *
	 * @memberof PatternsService
	 */
	setDiv() {
		this.container = document.getElementById(selectors.PATTERNS_CONTAINER);
		if (!this.container) {
			const div = document.createElement("div");
			div.id = selectors.PATTERNS_CONTAINER;

			this.container = document.body.appendChild(div);
		}
	}

	/**
	 * Adds all the pattern SVGs to the container div, applying a unique ID to each one
	 *
	 * @memberof PatternsService
	 */
	addPatternSVGs(d: any, colorScale: any, chartContainerID: string, legendType: string) {
		select(this.container)
			.style("display", "table")
			.style("max-height", 0);

		d.datasets.forEach(dataset => {
			let datasetPattern: string;

			dataset.data.forEach((dataPoint, i) => {
				const index = i + 1;
				const id = ++this.idAccum;

				if (!datasetPattern || legendType === Configuration.legend.basedOn.LABELS) {
					datasetPattern = PATTERN_SVGS[this.patternAccum++].default;
				}

				// Create SVG container div
				const svgContainer = document.createElement("div");
				svgContainer.id = `carbon-${chartContainerID}-pattern-container-${id}`;
				svgContainer.innerHTML = trimSVG(datasetPattern);

				// Apply id to the svg element
				const mountedSVG = svgContainer.querySelector("svg");
				mountedSVG.id = `carbon-${chartContainerID}-pattern-${id}-svg`;

				// Apply id to the pattern element
				const patternElement = mountedSVG.querySelector("pattern");
				patternElement.id = `carbon-${chartContainerID}-pattern-${id}`;

				// Remove all IDs to avoid duplicate IDs (accessibility violation)
				mountedSVG.querySelector("g").removeAttribute("id");

				// Apply fills to everything
				const allElementsInsideSVG = Array.prototype.slice.call(mountedSVG.querySelectorAll("pattern g *"));
				allElementsInsideSVG.forEach((element, elementIndex) => {
					if (elementIndex > 0) {
						element.style.fill = colorScale[dataset.label](d.labels[i]);
						element.style.stroke = colorScale[dataset.label](d.labels[i]);
					} else {
						element.style.fill = "transparent";
					}

					// Remove ID to avoid duplicate IDs (accessibility violation)
					element.removeAttribute("id");
					element.removeAttribute("class");
				});

				const allRectsInsideSVG = Array.prototype.slice.call(mountedSVG.querySelectorAll("rect"));
				allRectsInsideSVG.forEach(rectElement => {
					// Remove all IDs to avoid duplicate IDs (accessibility violation)
					rectElement.removeAttribute("id");
				});

				// Update pattern widths & heights
				patternElement.setAttribute("width", `${Configuration.charts.patternFills.width}`);
				patternElement.setAttribute("height", `${Configuration.charts.patternFills.height}`);

				this.container.appendChild(svgContainer);

				// Add pattern to the list of patterns
				const patternURL = `url(#carbon-${chartContainerID}-pattern-${id})`;
				if (this.patternURLs[dataset.label]) {
					this.patternURLs[dataset.label].push(patternURL);
				} else {
					this.patternURLs[dataset.label] = [patternURL];
				}
			});
		});
	}

	getFillValues() {
		return this.patternURLs;
	}
}
