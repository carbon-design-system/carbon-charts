// Internal Imports
import { Component } from "../component";
import { Tools } from "../../tools";
import { ScaleTypes } from "../../interfaces";
import { DOMUtils } from "../../services";

// D3 Imports
import { area, line } from "d3-shape";
import { extent } from "d3-array";
import { drag } from "d3-drag";
import { event, select, selectAll } from "d3-selection";

export class ZoomBar extends Component {
	type = "zoom-bar";

	ogXScale: any;

	dragged = Tools.debounce((element, d, e) => {
		element = select(element);
		const startingHandle = element.attr("class").indexOf("start") !== -1;

		let domain;
		if (startingHandle) {
			domain = [
				this.ogXScale.invert(e.x),
				this.ogXScale.domain()[1]
				// Math.min(this.ogXScale.invert(e.x), this.ogXScale.domain()[1])
			];
		} else {
			domain = [
				this.ogXScale.domain()[0],
				this.ogXScale.invert(e.x)
				// Math.min(this.ogXScale.invert(e.x), this.ogXScale.domain()[1])
			];
		}
		this.model.set({ zoomDomain: domain }, { animate: false });
	}, 2.5);

	render(animate = true) {
		const svg = this.getContainerSVG();

		const { cartesianScales } = this.services;
		const mainXAxisPosition = cartesianScales.getMainXAxisPosition();
		const mainYAxisPosition = cartesianScales.getMainYAxisPosition();
		const mainXScale = cartesianScales.getMainXScale();
		const mainYScale = cartesianScales.getMainYScale();
		const mainXScaleType = cartesianScales.getScaleTypeByPosition(mainXAxisPosition);
		const mainYScaleType = cartesianScales.getScaleTypeByPosition(mainYAxisPosition);

		const height = 32;
		const container = DOMUtils.appendOrSelect(svg, "svg.zoom-container")
			// .attr("transform", "translateX(10)")
			.attr("width", "100%")
			.attr("height", height)
			.attr("opacity", 1);

		const spacer = DOMUtils.appendOrSelect(svg, "rect.zoom-spacer")
			.attr("x", 0)
			.attr("y", 32)
			.attr("width", "100%")
			.attr("height", 20)
			.attr("opacity", 1)
			.attr("fill", "none");

		const zoomBG = DOMUtils.appendOrSelect(container, "rect.zoom-bg")
			.attr("x", 0)
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
				displayData.datasets.forEach(dataset => {
					allDates = allDates.concat(dataset.data.map(datum => Number(datum.date)));
				});
				allDates = Tools.removeArrayDuplicates(allDates).sort();

				// Go through all date values
				// And get corresponding data from each dataset
				const stackDataArray = allDates.map((date) => {
					let count = 0;
					let correspondingSum = 0;
					const correspondingData = {};

					displayData.datasets.forEach(dataset => {
						const correspondingDatum = dataset.data.find(datum => Number(datum.date) === Number(date));
						if (correspondingDatum) {
							++count;
							correspondingSum += correspondingDatum.value;
						}
					});
					correspondingData["label"] = date;
					correspondingData["value"] = correspondingSum;

					return correspondingData;
				});

				const xScale = mainXScale.copy();
				if (!this.ogXScale) {
					this.ogXScale = xScale;
				}

				const yScale = mainYScale.copy();

				const { width } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });

				xScale.range([0, +width])
					.domain(extent(stackDataArray, (d: any) => d.label));

				yScale.range([0, height - 6])
					.domain(extent(stackDataArray, (d: any) => d.value));

				const zoomDomain = this.model.get("zoomDomain");

				// D3 line generator function
				const lineGenerator = line()
					.x((d, i) => cartesianScales.getValueFromScale(xScale, mainXScaleType, d, i))
					.y((d, i) => height - cartesianScales.getValueFromScale(yScale, mainYScaleType, d, i))
					.curve(this.services.curves.getD3Curve());
					// .defined((d: any, i) => {
					// 	if (zoomDomain) {
					// 		const dTimestamp = +d.label;

					// 		return dTimestamp >= +zoomDomain[0] && dTimestamp <= +zoomDomain[1];
					// 	}

					// 	return true;
					// });

				const lineGraph = DOMUtils.appendOrSelect(container, "path.zoom-graph-line")
					.attr("stroke", "#8e8e8e")
					.attr("stroke-width", 3)
					.attr("fill", "none")
					.datum(stackDataArray)
					.transition(this.services.transitions.getTransition("zoom-pan-line-update", animate))
					.attr("d", lineGenerator);

				const areaGenerator = area()
					.x((d, i) => cartesianScales.getValueFromScale(xScale, mainXScaleType, d, i))
					.y0(height)
					.y1((d, i) => height - cartesianScales.getValueFromScale(yScale, mainYScaleType, d, i));

				const areaGraph = DOMUtils.appendOrSelect(container, "path.zoom-graph-area")
					.attr("fill", "#e0e0e0")
					.datum(stackDataArray)
					.transition(this.services.transitions.getTransition("zoom-pan-area-update", animate))
					.attr("d", areaGenerator);

				const startHandlePosition = zoomDomain ? xScale(+zoomDomain[0]) : 0;
				// Handle #1
				const startHandle = DOMUtils.appendOrSelect(container, "rect.zoom-handle.start")
					.attr("x", startHandlePosition)
					.attr("width", 5)
					.attr("height", "100%")
					.attr("fill", "#525252");

				DOMUtils.appendOrSelect(container, "rect.zoom-handle-bar.start")
					.attr("x", startHandlePosition + 2)
					.attr("y", 10)
					.attr("width", 1)
					.attr("height", 12)
					.attr("fill", "#fff");
				const endHandlePosition = zoomDomain ? xScale(+zoomDomain[1]) : xScale.range()[1];
				// console.log("endHandlePosition", endHandlePosition)

				// Handle #2
				const handle2 = DOMUtils.appendOrSelect(container, "rect.zoom-handle.end")
					.attr("x", endHandlePosition - 5)
					.attr("width", 5)
					.attr("height", "100%")
					.attr("fill", "#525252");

				DOMUtils.appendOrSelect(container, "rect.zoom-handle-bar.end")
					.attr("x", endHandlePosition - 5 + 2)
					.attr("y", 10)
					.attr("width", 1)
					.attr("height", 12)
					.attr("fill", "#fff");

				const outboundRangeRight = DOMUtils.appendOrSelect(container, "rect.outbound-range.right")
				.attr("x", endHandlePosition)
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("fill", "#fff")
				.attr("fill-opacity", 0.85);

				const self = this;
				// handle2.on("click", this.zoomIn.bind(this));
				selectAll("rect.zoom-handle").call(
					drag()
						.on("start", function() {
							select(this).classed("dragging", true);
						})
						.on("drag", function(d) {
							self.dragged(this, d, event);
						})
						.on("end", function() {
							select(this).classed("dragging", false);
						})
				);
			}
		}
	}

	zoomIn() {
		const mainXScale = this.services.cartesianScales.getMainXScale();
		console.log("zoom in", mainXScale.domain());
	}
}
