// Internal Imports
import { Component } from "../component";
import { AxisPositions, ScaleTypes, Roles } from "../../interfaces";
import { Tools } from "../../tools";
import { ChartModel } from "../../model";
import { DOMUtils } from "../../services";
import * as Configuration from "../../configuration";
import { computeTimeIntervalName, formatTick, isTickPrimary } from "../../services/time-series";

// D3 Imports
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";

export class Axis extends Component {
	type = "axes";

	margins: any;

	scale: any;
	scaleType: ScaleTypes;

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);

		if (configs) {
			this.configs = configs;
		}

		this.margins = this.configs.margins;
	}

	render(animate = true) {
		const { position: axisPosition } = this.configs;
		const options = this.model.getOptions();
		const axisOptions = Tools.getProperty(options, "axes", axisPosition);
		const timeScaleOptions = Tools.getProperty(options, "timeScale");

		const svg = this.getContainerSVG();
		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });

		let startPosition, endPosition;
		if (axisPosition === AxisPositions.BOTTOM || axisPosition === AxisPositions.TOP) {
			startPosition = this.configs.axes[AxisPositions.LEFT] ? this.margins.left : 0;
			endPosition = this.configs.axes[AxisPositions.RIGHT] ? width - this.margins.right : width;
		} else {
			startPosition = height - this.margins.bottom;
			endPosition = this.margins.top;
		}

		// Grab the scale off of the Scales service
		const scale = this.services.cartesianScales.getScaleByPosition(axisPosition);

		if (this.scaleType === ScaleTypes.LABELS) {
			scale.rangeRound([startPosition, endPosition]);
		} else {
			scale.range([startPosition, endPosition]);
		}

		// Identify the corresponding d3 axis function
		let axisFunction;
		switch (axisPosition) {
			case AxisPositions.LEFT:
				axisFunction = axisLeft;
				break;
			case AxisPositions.BOTTOM:
				axisFunction = axisBottom;
				break;
			case AxisPositions.RIGHT:
				axisFunction = axisRight;
				break;
			case AxisPositions.TOP:
				axisFunction = axisTop;
				break;
		}

		const isTimeScaleType = this.scaleType === ScaleTypes.TIME || axisOptions.scaleType === ScaleTypes.TIME;

		// Initialize axis object
		const axis = axisFunction(scale).tickSizeOuter(0);

		if (scale.ticks) {
			const numberOfTicks = Tools.getProperty(axisOptions, "ticks", "number") || Configuration.axis.ticks.number;
			axis.ticks(numberOfTicks);

			if (isTimeScaleType) {
				let tickValues = scale
					.ticks(numberOfTicks)
					.concat(scale.domain())
					.map(date => +date)
					.sort();
				tickValues = Tools.removeArrayDuplicates(tickValues);

				// Remove labels on the edges
				// If there are more than 2 labels to show
				if (Tools.getProperty(options, "timeScale", "addSpaceOnEdges") && tickValues.length > 2) {
					tickValues.splice(tickValues.length - 1, 1);
					tickValues.splice(0, 1);
				}

				axis.tickValues(tickValues);
			}

			//// WIP ////
			// if (isTimeScaleType) {
			// 	if (Tools.getProperty(options, "timeScale", "addSpaceOnEdges") > 0) {
			// 		scale.nice(numberOfTicks);
			// 	}
			// 	const tickValues = scale.ticks(numberOfTicks).map(date => +date);

			// 	axis.tickValues(tickValues);
			// }
			//// WIP ////

			// create the right ticks formatter
			let formatter;
			if (isTimeScaleType) {
				const timeInterval = computeTimeIntervalName(axis.tickValues());
				formatter = (t: number, i: number) => formatTick(t, i, timeInterval, timeScaleOptions);
			} else {
				formatter = Tools.getProperty(axisOptions, "ticks", "formatter");
			}

			// Set ticks formatter
			axis.tickFormat(formatter);
		}

		// Add axis into the parent
		const container = DOMUtils.appendOrSelect(svg, `g.axis.${axisPosition}`);
		const axisRefExists = !container.select(`g.ticks`).empty();
		let axisRef = DOMUtils.appendOrSelect(container, `g.ticks`);
		if (!axisRefExists) {
			axisRef.attr("role", `${Roles.GRAPHICS_OBJECT} ${Roles.GROUP}`);
		}

		// We draw the invisible axis because of the async nature of d3 transitions
		// To be able to tell the final width & height of the axis when initiaing the transition
		// The invisible axis is updated instantly and without a transition
		const invisibleAxisRef = DOMUtils.appendOrSelect(container, `g.ticks.invisible`)
			.style("opacity", "0")
			.attr("aria-hidden", true);

		// Position and transition the axis
		switch (axisPosition) {
			case AxisPositions.LEFT:
				axisRef.attr("transform", `translate(${this.margins.left}, 0)`);
				break;
			case AxisPositions.BOTTOM:
				axisRef.attr("transform", `translate(0, ${height - this.margins.bottom})`);
				break;
			case AxisPositions.RIGHT:
				axisRef.attr("transform", `translate(${width - this.margins.right}, 0)`);
				break;
			case AxisPositions.TOP:
				axisRef.attr("transform", `translate(0, ${this.margins.top})`);
				break;
		}

		// Position the axis title
		if (axisOptions.title) {
			const axisTitleRef = DOMUtils.appendOrSelect(container, `text.axis-title`)
				.text(axisOptions.title);

			switch (axisPosition) {
				case AxisPositions.LEFT:
					axisTitleRef.attr("transform", "rotate(-90)")
						.attr("y", 0)
						.attr("x", -(scale.range()[0] / 2))
						.attr("dy", "1em")
						.style("text-anchor", "middle");
					break;
				case AxisPositions.BOTTOM:
					axisTitleRef.attr("transform", `translate(${this.margins.left / 2 + scale.range()[1] / 2}, ${height})`)
						.style("text-anchor", "middle");
					break;
				case AxisPositions.RIGHT:
					axisTitleRef.attr("transform", "rotate(90)")
						.attr("y", -width)
						.attr("x", scale.range()[0] / 2)
						.attr("dy", "1em")
						.style("text-anchor", "middle");
					break;
				case AxisPositions.TOP:
					const { height: titleHeight } = DOMUtils.getSVGElementSize(axisTitleRef, { useBBox: true });
					axisTitleRef.attr("transform", `translate(${this.margins.left / 2 + scale.range()[1] / 2}, ${titleHeight / 2})`)
						.style("text-anchor", "middle");
					break;
			}
		}

		// Apply new axis to the axis element
		if (isTimeScaleType) {
			const timeInterval = computeTimeIntervalName(axis.tickValues());
			const showDayName = timeScaleOptions.showDayName;

			if (animate) {
				axisRef = axisRef.transition(this.services.transitions.getTransition("axis-update"));
			}
			axisRef = axisRef.call(axis);

			// Manipulate tick labels to make bold those that are in long format
			const ticks = axisRef.selectAll("g.tick > text");
			ticks.style("font-weight", (tickValue: number, i: number) => {
				return isTickPrimary(tickValue, i, timeInterval, showDayName) ? "bold" : "normal";
			});
		} else {
			if (!animate || !axisRefExists) {
				axisRef = axisRef.call(axis);
			} else {
				axisRef = axisRef
					.transition(this.services.transitions.getTransition("axis-update"))
					.call(axis);
			}
		}

		invisibleAxisRef.call(axis);

		if (axisPosition === AxisPositions.BOTTOM || axisPosition === AxisPositions.TOP) {
			let rotateTicks = false;

			// If we're dealing with a discrete scale type
			// We're able to grab the spacing between the ticks
			if (scale.step) {
				const textNodes = invisibleAxisRef.selectAll("g.tick text").nodes();

				// If any ticks are any larger than the scale step size
				rotateTicks = textNodes.some(textNode => DOMUtils.getSVGElementSize(textNode, { useBBox: true }).width >= scale.step());
			} else {
				// When dealing with a continuous scale
				// We need to calculate an estimated size of the ticks
				const minTickSize = Tools.getProperty(axisOptions, "ticks", "rotateIfSmallerThan") || Configuration.axis.ticks.rotateIfSmallerThan;
				const estimatedTickSize = width / scale.ticks().length / 2;

				rotateTicks = estimatedTickSize < minTickSize;
			}

			if (rotateTicks) {
				container.selectAll("g.ticks g.tick text")
					.attr("transform", `rotate(45)`)
					.style("text-anchor", axisPosition === AxisPositions.TOP ? "end" : "start");
			} else {
				container.selectAll("g.ticks g.tick text")
					.attr("transform", null)
					.style("text-anchor", null);
			}
		}
	}

	getInvisibleAxisRef() {
		const { position: axisPosition } = this.configs;

		return this.getContainerSVG()
			.select(`g.axis.${axisPosition} g.ticks.invisible`);
	}

	getTitleRef() {
		const { position: axisPosition } = this.configs;

		return this.getContainerSVG()
			.select(`g.axis.${axisPosition} text.axis-title`);
	}
}
