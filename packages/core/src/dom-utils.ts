// D3 Imports
import { select } from "d3-selection";
import { Tools } from "./tools";
import { BaseChartOptions } from "./interfaces/index";

// MISC
import ResizeObserver from "resize-observer-polyfill";

export class DOMUtils {
	private holder: Element;
	private options: BaseChartOptions;

	constructor(holder: Element, options: BaseChartOptions) {
		this.options = options;
		this.holder = holder;

		// Add width & height to the chart holder if necessary, and add a classname
		this.styleHolderElement();

		if (this.options.containerResizable) {
			this.addResizeListener();
		}
	}

	styleHolderElement() {
		const holderElement = this.holder as HTMLElement;
		const { width, height } = this.options;

		// Add class to chart holder
		select(this.holder).classed("chart-holder", true);

		// If width exists in options
		if (width) {
			// Apply formatted width attribute to chart
			holderElement.style.width = Tools.formatWidthHeightValues(width);
		}

		// If height exists in options
		if (height) {
			// Apply formatted height attribute to chart
			holderElement.style.height = Tools.formatWidthHeightValues(height);
		}
	}

	addResizeListener() {
		let containerWidth = this.holder.clientWidth;
		let containerHeight = this.holder.clientHeight;

		const resizeObserver = new ResizeObserver((entries, observer) => {
			if (Math.abs(containerWidth - this.holder.clientWidth) > 1
				|| Math.abs(containerHeight - this.holder.clientHeight) > 1) {
				containerWidth = this.holder.clientWidth;
				containerHeight = this.holder.clientHeight;

				console.log("RESIZE CHART NOW");
				// selectAll(".legend-tooltip").style("display", "none");

				// this.hideTooltip();

				// this.resizeChart();
			}
		});

		resizeObserver.observe(this.holder);
	}
}
