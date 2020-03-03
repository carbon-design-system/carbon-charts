// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { TooltipTypes } from "../../interfaces";

// D3 Imports
import { mouse, Selection } from "d3-selection";
import { scaleLinear } from "d3-scale";

import textWidth from "text-width";
import { isEqual } from "lodash-es";

type GraphicsSymbolsSelection = Selection<SVGElement, any, SVGElement, any>;

const THRESHOLD = 5;
const AXIS_TOOLTIP_TEXT_SIZE = 12;

function pointIsMatch(dx: number, x: number) {
	return dx > x - THRESHOLD && dx < x + THRESHOLD;
}

function invertedScale(scale) {
	if (scale.invert) {
		return scale.invert;
	} else {
		const scaleClone = scaleLinear()
			.domain(scale.range())
			.range(scale.domain());

		return scaleClone;
	}
}

export class Ruler extends Component {
	type = "ruler";
	backdrop: any;
	hoveredElements: GraphicsSymbolsSelection;

	render() {
		this.drawBackdrop();
		this.addBackdropEventListeners();
	}

	showRuler([x, y]: [number, number]) {
		const svg = this.parent;
		const ruler = DOMUtils.appendOrSelect(svg, "g.ruler");
		const line = DOMUtils.appendOrSelect(ruler, "line.ruler-line");
		const dataPoints: GraphicsSymbolsSelection = svg.selectAll("[role=graphics-symbol]");
		const height = DOMUtils.getSVGElementSize(this.backdrop).height;
		const scale = this.services.cartesianScales.getMainXScale();
		let lineX = x;

		const scaledData: number[] = Array.prototype.concat(
			...this.model
				.getData()
				.datasets.map(dataset =>
					dataset.data.map((d, i) =>
						Number(this.services.cartesianScales.getDomainValue(d, i))
					)
				)
		);

		/**
		 * Find matches, reduce is used instrad of filter
		 * to only store elements which belong to the same axis position
		 */
		const scaledValuesMatches: number[] = scaledData.reduce((acc, cur) => {
			const sampleAccValue = acc[0];

			// if current value is bigger than already existing values don't store it
			if (sampleAccValue && cur > sampleAccValue) {
				return acc;
			} else if (pointIsMatch(cur, x)) {
				acc.push(cur);
			}

			return acc;
		}, []);

		// some data point match
		if (scaledValuesMatches.length > 0) {
			const sampleMatch = scaledValuesMatches[0];

			const highlightItems = this.services.cartesianScales.getDataFromDomain(
				invertedScale(scale)(sampleMatch)
			);

			const hoveredElements = dataPoints.filter((d, i) => {
				return scaledValuesMatches.includes(
					Number(this.services.cartesianScales.getDomainValue(d))
				);
			});

			/** if we pass from a trigger area to another one
			 * mouseout on previous elements won't get dispatched
			 * so we need to do it manually
			 */
			if (
				this.hoveredElements &&
				this.hoveredElements.size() > 0 &&
				!isEqual(this.hoveredElements, hoveredElements)
			) {
				this.hoveredElements.dispatch("mouseout");
			}

			hoveredElements.dispatch("mouseover");

			// set current hovered elements
			this.hoveredElements = hoveredElements;

			this.services.events.dispatchEvent("show-tooltip", {
				hoveredElement: line,
				multidata: highlightItems,
				type: TooltipTypes.GRIDLINE
			});

			// line snaps to matching point
			lineX = sampleMatch;
		} else {
			dataPoints.dispatch("mouseout");
		}

		ruler.attr("opacity", 1);
		line.attr("y1", 0)
			.attr("y2", height)
			.attr("x1", lineX)
			.attr("x2", lineX);

		// if scale is not continuous don't show axis tooltip
		if (!scale.invert) {
			return;
		}

		// append axis tooltip
		const axisTooltip = DOMUtils.appendOrSelect(ruler, "g.ruler-axis-tooltip");
		const axisTooltipValue = `${scale.invert(lineX)}`.substr(0, 10);
		const axisTooltipWidth = textWidth(axisTooltipValue, {
			size: AXIS_TOOLTIP_TEXT_SIZE
		});
		const axisTooltipHeight = 20;
		const axisTooltipOffset = 5;

		DOMUtils.appendOrSelect(axisTooltip, "rect.axis-tooltip-box")
			.attr("x", lineX - axisTooltipWidth / 2)
			.attr("y", height + axisTooltipOffset)
			.attr("width", axisTooltipWidth)
			.attr("height", axisTooltipHeight);

		DOMUtils.appendOrSelect(axisTooltip, "text.axis-tooltip-text")
			.attr("x", lineX)
			.attr("y", height + axisTooltipOffset + axisTooltipHeight / 2)
			.text(axisTooltipValue);
	}

	hideRuler() {
		const svg = this.parent;
		const ruler = DOMUtils.appendOrSelect(svg, "g.ruler");
		const dataPoints = svg.selectAll("[role=graphics-symbol]");

		dataPoints.dispatch("mouseout");
		ruler.attr("opacity", 0);
	}

	/**
	 * Adds the listener on the X grid to trigger multiple point tooltips along the x axis.
	 */
	addBackdropEventListeners() {
		const self = this;

		this.backdrop
			.on("mousemove mouseover", function() {
				const chartContainer = self.services.domUtils.getMainSVG();
				const pos = mouse(chartContainer);

				self.showRuler(pos);
			})
			.on("mouseout", function() {
				self.hideRuler();
				self.services.events.dispatchEvent("hide-tooltip", {});
			});
	}

	drawBackdrop() {
		const svg = this.parent;

		const mainXScale = this.services.cartesianScales.getMainXScale();
		const mainYScale = this.services.cartesianScales.getMainYScale();

		const [xScaleStart, xScaleEnd] = mainXScale.range();
		const [yScaleEnd, yScaleStart] = mainYScale.range();

		// Get height from the grid
		this.backdrop = DOMUtils.appendOrSelect(svg, "svg.chart-grid-backdrop");
		const backdropRect = DOMUtils.appendOrSelect(this.backdrop, "rect.chart-grid-backdrop");

		this.backdrop
			.merge(backdropRect)
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart)
			.style("cursor", "crosshair")
			.lower();

		backdropRect.attr("width", "100%").attr("height", "100%");
	}
}
