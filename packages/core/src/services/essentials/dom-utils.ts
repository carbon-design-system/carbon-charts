// Internal Imports
import * as Configuration from "../../configuration";
import { Service } from "../service";

// D3 Imports
import { select } from "d3-selection";
import { Tools } from "../../tools";

// MISC
import ResizeObserver from "resize-observer-polyfill";

export class DOMUtils extends Service {
	private _svg: Element;

	init() {
		// Add width & height to the chart holder if necessary, and add a classname
		this.styleHolderElement();

		this.addSVGElement();

		if (this._model.getOptions().containerResizable) {
			this.addResizeListener();
		}
	}

	styleHolderElement() {
		const holderElement = this._model.get("holder") as HTMLElement;
		const { width, height } = this._model.getOptions();

		// Add class to chart holder
		select(this._model.get("holder")).classed("chart-holder", true);

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
		return this._model.get("holder");
	}

	addSVGElement() {
		const svg = select(this._model.get("holder"))
				.append("svg")
				.classed("chart-svg", true)
				.attr("height", "100%")
				.attr("width", "100%");

		this._svg = svg.node();
	}

	getSVG() {
		return this._svg;
	}

	addResizeListener() {
		let containerWidth = this._model.get("holder").clientWidth;
		let containerHeight = this._model.get("holder").clientHeight;

		const resizeObserver = new ResizeObserver((entries, observer) => {
			if (Math.abs(containerWidth - this._model.get("holder").clientWidth) > 1
				|| Math.abs(containerHeight - this._model.get("holder").clientHeight) > 1) {
				containerWidth = this._model.get("holder").clientWidth;
				containerHeight = this._model.get("holder").clientHeight;

				console.log("RESIZE CHART NOW");
				// selectAll(".legend-tooltip").style("display", "none");

				// this.hideTooltip();

				// this.resizeChart();
			}
		});

		resizeObserver.observe(this._model.get("holder"));
	}

	getChartSize() {
		// let ratio, marginForLegendTop;
		// if (this._model.get("holder").clientWidth > Configuration.charts.widthBreak) {
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
			height: svg.node().clientHeight || svg.node().getBBox().height || svg.attr("height"),
			width: svg.node().clientWidth || svg.node().getBBox().width || svg.attr("width")
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
