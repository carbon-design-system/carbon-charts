// Internal Imports
import { Component } from "../component";
import { Tools } from "../../tools";
import { ScaleTypes } from "../../interfaces";
import { DOMUtils } from "../../services";

// D3 Imports
import { extent } from "d3-array";
import { brushX } from "d3-brush";
import { event } from "d3-selection";
import { scaleTime } from "d3-scale";

export class Brush extends Component {
	type = "brush";

	render(animate = true) {
		const svg = this.parent;
		const { cartesianScales } = this.services;
		const mainXAxisPosition = cartesianScales.getMainXAxisPosition();
		const mainXScaleType = cartesianScales.getScaleTypeByPosition(
			mainXAxisPosition
		);

		// get axes margins
		let axesLeftMargin = 0;
		const axesMargins = this.model.get("axesMargins");
		if (axesMargins && axesMargins.left) {
			axesLeftMargin = axesMargins.left;
		}

		const mainXScale = this.services.cartesianScales.getMainXScale();
		const mainYScale = this.services.cartesianScales.getMainYScale();

		const [xScaleStart, xScaleEnd] = mainXScale.range();
		const [yScaleEnd, yScaleStart] = mainYScale.range();

		if (mainXScale) {
			const displayData = this.model.getDisplayData();

			if (mainXScaleType === ScaleTypes.TIME) {
				// Get all date values provided in data
				// @todo - Could be re-used through the model
				let allDates = [];
				displayData.forEach((data) => {
					allDates = allDates.concat(Number(data.date));
				});
				allDates = Tools.removeArrayDuplicates(allDates).sort();

				// Go through all date values
				// And get corresponding data from each dataset
				const stackDataArray = allDates.map((date) => {
					let count = 0;
					let correspondingSum = 0;
					const correspondingData = {};

					displayData.forEach((data) => {
						if (Number(data.date) === Number(date)) {
							++count;
							correspondingSum += data.value;
						}
					});
					correspondingData["date"] = date;
					correspondingData["value"] = correspondingSum;

					return correspondingData;
				});

				const { width } = DOMUtils.getSVGElementSize(this.parent, {
					useAttrs: true
				});

				let zoomDomain = this.model.get("zoomDomain");
				if (zoomDomain === undefined) {
					zoomDomain = extent(stackDataArray, (d: any) => d.date); // default to full range
					this.model.set(
						{ zoomDomain: zoomDomain },
						{ animate: false }
					);
				}

				const brushed = () => {
					const selection = event.selection;

					if (selection !== null) {
						// get current zoomDomain
						zoomDomain = this.model.get("zoomDomain");
						// create xScale based on current zoomDomain
						const xScale = scaleTime()
							.range([axesLeftMargin, width])
							.domain(zoomDomain);

						let newDomain = [
							xScale.invert(selection[0]),
							xScale.invert(selection[1])
						];

						// check if slected start time and end time are the same
						if (newDomain[0].valueOf() === newDomain[1].valueOf()) {
							// same as d3 behavior and zoombar behavior: set to default full range
							newDomain = extent(
								stackDataArray,
								(d: any) => d.date
							);
						}

						// only if the brush event comes from mouseup event
						if (event.sourceEvent != null) {
							// only if zoomDomain needs update
							if (
								zoomDomain[0].valueOf() !==
									newDomain[0].valueOf() ||
								zoomDomain[1].valueOf() !==
									newDomain[1].valueOf()
							) {
								this.model.set(
									{ zoomDomain: newDomain },
									{ animate: false }
								);
							}
							// call external callback
							const zoomBarOptions = this.model.getOptions()
								.zoomBar;
							if (
								zoomBarOptions.selectionEnd !== undefined &&
								event.type === "end"
							) {
								zoomBarOptions.selectionEnd(
									selection,
									newDomain
								);
							}
						}
					}
				};

				const brush = brushX()
					.extent([
						[xScaleStart, 0],
						[width, yScaleEnd]
					])
					.on("end", brushed);

				const brushArea = DOMUtils.appendOrSelect(
					svg,
					"g.chart-brush"
				).call(brush);
				// no need for having default brush selection
				// @todo try to hide brush after selection
				setTimeout(() => {
					brushArea.call(brush.move);
				}, 0);
			}
		}
	}
}
