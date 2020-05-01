// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { TooltipTypes, ScaleTypes } from "../../interfaces";
import { Tools } from "../../tools";

// D3 Imports
import { mouse, Selection } from "d3-selection";
import { scaleLinear } from "d3-scale";

type GenericSvgSelection = Selection<SVGElement, any, SVGElement, any>;

const THRESHOLD = 5;

/** check if x is inside threshold area extents  */
function pointIsWithinThreshold(dx: number, x: number) {
	return dx > x - THRESHOLD && dx < x + THRESHOLD;
}

/**
 * a compatibility function that accepts ordinal scales too
 * as those do not support .invert() by default,
 * so a scale clone is created to invert domain with range
 */
function invertedScale(scale) {
	if (scale.invert) {
		return scale.invert;
	}

	return scaleLinear()
		.domain(scale.range())
		.range(scale.domain());
}

export class Ruler extends Component {
	type = "ruler";
	backdrop: GenericSvgSelection;
	hoveredElements: GenericSvgSelection;

	render() {
		this.drawBackdrop();
		this.addBackdropEventListeners();
	}

	showRuler([x, y]: [number, number]) {
		const svg = this.parent;
		const ruler = DOMUtils.appendOrSelect(svg, "g.ruler");
		const line = DOMUtils.appendOrSelect(ruler, "line.ruler-line");
		const dataPointElements: GenericSvgSelection = svg.selectAll(
			"[role=graphics-symbol]"
		);
		const displayData = this.model.getDisplayData();
		const domainScale = this.services.cartesianScales.getDomainScale();
		const rangeScale = this.services.cartesianScales.getRangeScale();
		const [yScaleEnd, yScaleStart] = rangeScale.range();

		const scaledData: {domainValue: number, originalData: any}[] = displayData.map((d, i) => ({
			domainValue: this.services.cartesianScales.getDomainValue(d, i),
			originalData: d
		}));

		/**
		 * Find matches, reduce is used instead of filter
		 * to only get elements which belong to the same axis coordinate
		 */
		const dataPointsMatchingRulerLine: {domainValue: number, originalData: any}[] =
			scaledData.reduce((accum, currentValue) => {
				// store the first element of the accumulator array to compare it with current element being processed
				const sampleAccumValue = accum[0] ? accum[0].domainValue : undefined;

				// if accumulator is not empty and current value is bigger than already existing value in the accumulator, skip current iteration
				if (sampleAccumValue !== undefined && currentValue.domainValue > sampleAccumValue) {
					return accum;
				}

				// there's a match and currentValue is either less then or equal to already stored values
				if (pointIsWithinThreshold(currentValue.domainValue, x)) {
					if (sampleAccumValue !== undefined && currentValue < sampleAccumValue) {
						// there's a closer data point in the threshold area, so reinstantiate array
						accum = [currentValue];
					} else {
						// currentValue is equal to already stored values, there's another match on the same coordinate
						accum.push(currentValue);
					}
				}

				return accum;
			}, []);

		// some data point match
		if (dataPointsMatchingRulerLine.length > 0) {
			const highlightItems = dataPointsMatchingRulerLine.map(d => d.originalData)
				.filter(d => {
					const rangeIdentifier = this.services.cartesianScales.getRangeIdentifier();
					const value = d[rangeIdentifier];
					return value !== null && value !== undefined;
				});

			// get elements on which we should trigger mouse events
			const hoveredElements = dataPointElements.filter((d, i) =>
				dataPointsMatchingRulerLine.includes(d)
			);

			/** if we pass from a trigger area to another one
			 * mouseout on previous elements won't get dispatched
			 * so we need to do it manually
			 */
			if (
				this.hoveredElements &&
				this.hoveredElements.size() > 0 &&
				!Tools.isEqual(this.hoveredElements, hoveredElements)
			) {
				this.hideRuler();
			}

			hoveredElements.dispatch("mouseover");

			// set current hovered elements
			this.hoveredElements = hoveredElements;

			this.services.events.dispatchEvent("show-tooltip", {
				hoveredElement: line,
				multidata: highlightItems,
				type: TooltipTypes.GRIDLINE
			});

			ruler.attr("opacity", 1);

			// line snaps to matching point
			const sampleMatch = dataPointsMatchingRulerLine[0];
			line.attr("y1", yScaleStart)
				.attr("y2", yScaleEnd)
				.attr("x1", sampleMatch.domainValue)
				.attr("x2", sampleMatch.domainValue);
		} else {
			ruler.attr("opacity", 0);
			dataPointElements.dispatch("mouseout");
		}
	}

	hideRuler() {
		const svg = this.parent;
		const ruler = DOMUtils.appendOrSelect(svg, "g.ruler");
		const dataPointElements = svg.selectAll("[role=graphics-symbol]");

		dataPointElements.dispatch("mouseout");
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
				self.services.events.dispatchEvent("hide-tooltip");
			});
	}

	drawBackdrop() {
		const svg = this.parent;

		const domainScale = this.services.cartesianScales.getDomainScale();
		const rangeScale = this.services.cartesianScales.getRangeScale();

		const [xScaleStart, xScaleEnd] = domainScale.range();
		const [yScaleEnd, yScaleStart] = rangeScale.range();

		// Get height from the grid
		this.backdrop = DOMUtils.appendOrSelect(svg, "svg.chart-grid-backdrop");
		const backdropRect = DOMUtils.appendOrSelect(
			this.backdrop,
			"rect.chart-grid-backdrop"
		);

		this.backdrop
			.merge(backdropRect)
			.attr("x", xScaleStart)
			.attr("y", yScaleStart)
			.attr("width", xScaleEnd - xScaleStart)
			.attr("height", yScaleEnd - yScaleStart)
			.lower();

		backdropRect.attr("width", "100%").attr("height", "100%");
	}
}
