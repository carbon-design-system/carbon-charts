// Internal Imports
import { Component } from "../component";
import { Tools } from "../../tools";
import { ScaleTypes } from "../../interfaces";
import { DOMUtils } from "../../services";

// D3 Imports
import { extent } from "d3-array";
import { brushX } from "d3-brush";
import { area, line } from "d3-shape";
import { event, select, selectAll } from "d3-selection";

export class ZoomBar extends Component {
	type = "zoom-bar";

	height = 32;

	ogXScale: any;

	render(animate = true) {
		// TODO - get correct axis left width
		const axisLeftWidth = 23;
		const svg = this.getContainerSVG();

		const { cartesianScales } = this.services;
		const mainXAxisPosition = cartesianScales.getMainXAxisPosition();
		const mainYAxisPosition = cartesianScales.getMainYAxisPosition();
		const mainXScale = cartesianScales.getMainXScale();
		const mainYScale = cartesianScales.getMainYScale();
		const mainXScaleType = cartesianScales.getScaleTypeByPosition(
			mainXAxisPosition
		);
		const mainYScaleType = cartesianScales.getScaleTypeByPosition(
			mainYAxisPosition
		);

		const container = DOMUtils.appendOrSelect(svg, "svg.zoom-container")
			.attr("width", "100%")
			.attr("height", this.height)
			.attr("opacity", 1);

		const spacer = DOMUtils.appendOrSelect(svg, "rect.zoom-spacer")
			.attr("x", 0)
			.attr("y", 32)
			.attr("width", "100%")
			.attr("height", 20)
			.attr("opacity", 1)
			.attr("fill", "none");

		const zoomBG = DOMUtils.appendOrSelect(container, "rect.zoom-bg")
			.attr("x", axisLeftWidth)
			.attr("y", 0)
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("fill", "white")
			.attr("stroke", "#e8e8e8");

		if (mainXScale) {
			const displayData = this.model.getDisplayData();

			if (mainXScaleType === ScaleTypes.TIME) {
				// Get all date values provided in data
				// TODO - Could be re-used through the model
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

				if (!this.ogXScale) {
					this.ogXScale = cartesianScales.getDomainScale();
				}
				const xScale = mainXScale.copy();
				if (!this.ogXScale) {
					this.ogXScale = xScale;
				}
				const yScale = mainYScale.copy();

				const { width } = DOMUtils.getSVGElementSize(this.parent, {
					useAttrs: true
				});

				xScale
					.range([axisLeftWidth, width])
					.domain(extent(stackDataArray, (d: any) => d.date));

				yScale
					.range([0, this.height - 6])
					.domain(extent(stackDataArray, (d: any) => d.value));

				const zoomDomain = this.model.get("zoomDomain");

				// D3 line generator function
				const lineGenerator = line()
					.x((d, i) =>
						cartesianScales.getValueFromScale(
							xScale,
							mainXScaleType,
							mainXAxisPosition,
							d,
							i
						)
					)
					.y(
						(d, i) =>
							this.height -
							cartesianScales.getValueFromScale(
								yScale,
								mainYScaleType,
								mainYAxisPosition,
								d,
								i
							)
					)
					.curve(this.services.curves.getD3Curve());
				// .defined((d: any, i) => {
				// 	if (zoomDomain) {
				// 		const dTimestamp = +d.label;

				// 		return dTimestamp >= +zoomDomain[0] && dTimestamp <= +zoomDomain[1];
				// 	}

				// 	return true;
				// });
				const lineGraph = DOMUtils.appendOrSelect(
					container,
					"path.zoom-graph-line"
				)
					.datum(stackDataArray)
					.transition(
						this.services.transitions.getTransition(
							"zoom-pan-line-update",
							animate
						)
					)
					.attr("d", lineGenerator);

				const areaGenerator = area()
					.x((d, i) =>
						cartesianScales.getValueFromScale(
							xScale,
							mainXScaleType,
							mainXAxisPosition,
							d,
							i
						)
					)
					.y0(this.height)
					.y1(
						(d, i) =>
							this.height -
							cartesianScales.getValueFromScale(
								yScale,
								mainYScaleType,
								mainYAxisPosition,
								d,
								i
							)
					);

				const areaGraph = DOMUtils.appendOrSelect(
					container,
					"path.zoom-graph-area"
				)
					.datum(stackDataArray)
					.transition(
						this.services.transitions.getTransition(
							"zoom-pan-area-update",
							animate
						)
					)
					.attr("d", areaGenerator);

				const updateBrushHandle = (g, selection) => {
					const handleSize = 5;
					// handle
					svg.select("g.brush")
						.selectAll("rect.handle")
						.data([{ type: "w" }, { type: "e" }])
						.attr("x", function (d) {
							if (d.type === "w") {
								return selection[0] - 3;
							} else if (d.type === "e") {
								return selection[1] - 3;
							}
						})
						.attr("y", 0)
						.attr("width", handleSize)
						.attr("height", 32)
						.style("display", null); // always display
					// handle-bar
					svg.select("g.brush")
						.selectAll("rect.handle-bar")
						.data([{ type: "w" }, { type: "e" }])
						.join("rect")
						.attr("class", function (d) {
							return "handle-bar handle-bar--" + d.type;
						})
						.attr("x", function (d) {
							if (d.type === "w") {
								return selection[0] - 1;
							} else if (d.type === "e") {
								return selection[1] - 1;
							}
						})
						.attr("y", 10)
						.attr("width", 1)
						.attr("height", 12);
				};

				const brushed = () => {
					let selection = event.selection;
					if (selection === null) {
						// set to default full range
						selection = xScale.range();
					} else {
						// TODO - pass selection to callback function or update scaleDomain
					}
					// update brush handle position
					select(svg).call(updateBrushHandle, selection);

					const newDomain = [
						xScale.invert(selection[0]),
						xScale.invert(selection[1])
					];

					// only if the brush event comes from mouseup event
					if (event.sourceEvent != null) {
						// only if zoomDomain is never set or needs update
						if (
							zoomDomain === undefined ||
							zoomDomain[0] !== newDomain[0] ||
							zoomDomain[1] !== newDomain[1]
						) {
							this.model.set(
								{ zoomDomain: newDomain },
								{ animate: false }
							);
						}
					}
				};

				const brush = brushX()
					.extent([
						[0 + axisLeftWidth, 0],
						[700, this.height]
					])
					.on("start brush end", brushed);

				const brushArea = DOMUtils.appendOrSelect(svg, "g.brush").call(
					brush
				);
				if (zoomDomain === undefined) {
					brushArea.call(brush.move, xScale.range()); // default to full range
				}
			}
		}
	}

	zoomIn() {
		const mainXScale = this.services.cartesianScales.getMainXScale();
		console.log("zoom in", mainXScale.domain());
	}
}
