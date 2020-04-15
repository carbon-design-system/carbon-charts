// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { TooltipTypes, ScaleTypes } from "../../interfaces";
import { Tools } from "../../tools";

// D3 Imports
import { mouse, Selection } from "d3-selection";

type GenericSvgSelection = Selection<SVGElement, any, SVGElement, any>;

const THRESHOLD = 5;

/** check if x is inside threshold area extents  */
function pointIsWithinThreshold(dx: number, x: number) {
	return dx > x - THRESHOLD && dx < x + THRESHOLD;
}

export class Ruler extends Component {
	type = "ruler";
	backdrop: GenericSvgSelection;
	hoveredElements: GenericSvgSelection;

	render() {
		const domainAxisPosition = this.services.cartesianScales.getDomainAxisPosition();
		const domainScaleType = this.services.cartesianScales.getScaleTypeByPosition(
			domainAxisPosition
		);
		const isTimeSeries = domainScaleType === ScaleTypes.TIME;

		// if scale type is not timeSeries do not show rule
		if (!isTimeSeries) {
			return;
		}

		this.drawBackdrop();
		this.addBackdropEventListeners();
	}

	showRuler([x, y]: [number, number]) {
		const svg = this.parent;
		const ruler = DOMUtils.appendOrSelect(svg, "g.ruler");
		const line = DOMUtils.appendOrSelect(ruler, "line.ruler-line");
		const dataPoints: GenericSvgSelection = svg.selectAll(
			"[role=graphics-symbol]"
		);
		const displayData = this.model.getDisplayData();
		const domainScale = this.services.cartesianScales.getDomainScale();
		const rangeScale = this.services.cartesianScales.getRangeScale();
		const [yScaleEnd, yScaleStart] = rangeScale.range();

		const scaledData: number[] = displayData.map((d, i) =>
			this.services.cartesianScales.getDomainValue(d, i)
		);

		/**
		 * Find matches, reduce is used instead of filter
		 * to only get elements which belong to the same axis coordinate
		 */
		const scaledValuesMatches: number[] = scaledData.reduce((accum, currentValue) => {
			// store the first element of the accumulator array to compare it with current element being processed
			const sampleAccumValue = accum[0];

			// if accumulator is not empty and current value is bigger than already existing value in the accumulator, skip current iteration
			if (sampleAccumValue && currentValue > sampleAccumValue) {
				return accum;
			}

			// there's a match and currentValue is either less then or equal to already stored values
			if (pointIsWithinThreshold(currentValue, x)) {
				if (sampleAccumValue && currentValue < sampleAccumValue) {
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
		if (scaledValuesMatches.length > 0) {
			const sampleMatch = scaledValuesMatches[0];

			const highlightItems = this.services.cartesianScales.getDataFromDomain(
				domainScale.invert(sampleMatch)
			).filter(d => d.value);

			const hoveredElements = dataPoints.filter((d, i) =>
				scaledValuesMatches.includes(
					Number(this.services.cartesianScales.getDomainValue(d))
				)
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
			line.attr("y1", yScaleStart)
				.attr("y2", yScaleEnd)
				.attr("x1", sampleMatch)
				.attr("x2", sampleMatch);
		} else {
			ruler.attr("opacity", 0);
			dataPoints.dispatch("mouseout");
		}
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
