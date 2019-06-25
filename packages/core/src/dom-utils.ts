// Internal Imports
import * as Configuration from "./configuration";

// D3 Imports
import { select } from "d3-selection";
import { Tools } from "./tools";
import { AxisChartOptions } from "./interfaces/index";

// MISC
import ResizeObserver from "resize-observer-polyfill";

export class DOMUtils {
	private _holder: Element;
	private _svg: Element;
	private _options: AxisChartOptions;

	constructor(holder: Element, options: AxisChartOptions) {
		this._options = options;
		this._holder = holder;

		// Add width & height to the chart holder if necessary, and add a classname
		this.styleHolderElement();

		this.addSVGElement();

		if (this._options.containerResizable) {
			this.addResizeListener();
		}
	}

	styleHolderElement() {
		const holderElement = this._holder as HTMLElement;
		const { width, height } = this._options;

		// Add class to chart holder
		select(this._holder).classed("chart-holder", true);

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

	getHolder() {
		return this._holder;
	}

	addSVGElement() {
		const svg = select(this._holder)
				.append("svg")
				.attr("height", "100%")
				.attr("width", "100%");

		this._svg = svg.node();
	}

	getSVG() {
		return this._svg;
	}

	addResizeListener() {
		let containerWidth = this._holder.clientWidth;
		let containerHeight = this._holder.clientHeight;

		const resizeObserver = new ResizeObserver((entries, observer) => {
			if (Math.abs(containerWidth - this._holder.clientWidth) > 1
				|| Math.abs(containerHeight - this._holder.clientHeight) > 1) {
				containerWidth = this._holder.clientWidth;
				containerHeight = this._holder.clientHeight;

				console.log("RESIZE CHART NOW");
				// selectAll(".legend-tooltip").style("display", "none");

				// this.hideTooltip();

				// this.resizeChart();
			}
		});

		resizeObserver.observe(this._holder);
	}

	getChartSize() {
		// let ratio, marginForLegendTop;
		// if (this._holder.clientWidth > Configuration.charts.widthBreak) {
		// 	ratio = Configuration.charts.magicRatio;
		// 	marginForLegendTop = 0;
		// } else {
		// 	marginForLegendTop = Configuration.charts.marginForLegendTop;
		// 	ratio = 1;
		// }

		// Store computed actual size, to be considered for change if chart does not support axis
		// const marginsToExclude = Configuration.charts.margin.left + Configuration.charts.margin.right;
		const computedChartSize = {
			height: this._svg.clientHeight,
			width: this._svg.clientWidth
		};

		return {
			height: Math.max(computedChartSize.height, Configuration.charts.axisCharts.minHeight),
			width: Math.max(computedChartSize.width, Configuration.charts.axisCharts.minWidth)
		};
	}

	getSVGSize(svg: any) {
		return {
			height: svg.node().getBBox().height || svg.node().clientHeight || svg.attr("height"),
			width: svg.node().getBBox().width || svg.node().clientWidth || svg.attr("width")
		};
	}

	appendOrSelect(parent, query) {
		const l = query.split(".");
		const elementToAppend = l[0];

		const g = parent.select(query);
		if (g.empty()) {
			return parent.append(elementToAppend)
				.attr("class", l.slice(1).join(" "));
		}

		return g;
	}
}
