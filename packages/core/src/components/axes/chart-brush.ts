// Internal Imports
import { Component } from "../component";
import { Events, ScaleTypes } from "../../interfaces";
import { DOMUtils } from "../../services";

// D3 Imports
import { brushX } from "d3-brush";
import { event } from "d3-selection";
import { scaleTime } from "d3-scale";

// This class is used for handle brush events in chart
export class ChartBrush extends Component {
	static DASH_LENGTH = 4;

	type = "chart-brush";

	selectionSelector = "rect.selection"; // needs to match the class name in d3.brush

	selectionElementId = "ChartBrushSelectionId";

	render(animate = true) {
		const svg = this.parent;
		const backdrop = DOMUtils.appendOrSelect(
			svg,
			"svg.chart-grid-backdrop"
		);
		const { width, height } = DOMUtils.getSVGElementSize(backdrop, {
			useAttrs: true
		});

		const { cartesianScales } = this.services;
		const mainXScaleType = cartesianScales.getMainXScaleType();
		const mainXScale = cartesianScales.getMainXScale();

		if (mainXScale && mainXScaleType === ScaleTypes.TIME) {
			// get current zoomDomain
			let zoomDomain = this.model.get("zoomDomain");
			if (zoomDomain === undefined) {
				// default to full range with extended domain
				zoomDomain = this.model.getDefaultZoomBarDomain();
				this.model.set({ zoomDomain: zoomDomain }, { animate: false });
			}

			const updateSelectionDash = (selection) => {
				// set end drag point to dash
				const selectionWidth = selection[1] - selection[0];
				let dashArray = "0," + selectionWidth.toString(); // top (invisible)

				// right
				const dashCount = Math.floor(height / ChartBrush.DASH_LENGTH);
				const totalRightDash = dashCount * ChartBrush.DASH_LENGTH;
				for (let i = 0; i < dashCount; i++) {
					dashArray += "," + ChartBrush.DASH_LENGTH; // for each full length dash
				}
				dashArray += "," + (height - totalRightDash); // for rest of the right height
				// if dash count is even, one more ",0" is needed to make total right dash pattern even
				if (dashCount % 2 === 1) {
					dashArray += ",0";
				}

				dashArray += "," + selectionWidth.toString(); // bottom (invisible)
				dashArray += "," + height.toString(); // left

				brushArea
					.select(this.selectionSelector)
					.attr("stroke-dasharray", dashArray);
			};

			const eventHandler = () => {
				const selection = event.selection;
				if (selection === null) {
					return;
				}

				updateSelectionDash(selection);

				const xScale = scaleTime().range([0, width]).domain(zoomDomain);

				const newDomain = [
					xScale.invert(selection[0]),
					xScale.invert(selection[1])
				];

				if (
					selection != null &&
					event.sourceEvent != null &&
					(event.sourceEvent.type === "mousemove" ||
						event.sourceEvent.type === "mouseup" ||
						event.sourceEvent.type === "mousedown")
				) {
					// dispatch selection events
					let zoomBarEventType;
					if (event.type === "start") {
						zoomBarEventType = Events.ZoomBar.SELECTION_START;
					} else if (event.type === "brush") {
						zoomBarEventType = Events.ZoomBar.SELECTION_IN_PROGRESS;
					} else if (event.type === "end") {
						zoomBarEventType = Events.ZoomBar.SELECTION_END;
					}
					this.services.events.dispatchEvent(zoomBarEventType, {
						selection,
						newDomain
					});
				}
			};
			const brushed = () => {
				const selection = event.selection;

				if (selection !== null) {
					// create xScale based on current zoomDomain
					const xScale = scaleTime()
						.range([0, width])
						.domain(zoomDomain);

					let newDomain = [
						xScale.invert(selection[0]),
						xScale.invert(selection[1])
					];

					// if selected start time and end time are the same
					// reset to default full range
					if (newDomain[0].valueOf() === newDomain[1].valueOf()) {
						// same as d3 behavior and zoom bar behavior: set to default full range
						newDomain = this.model.getDefaultZoomBarDomain();
					}

					// only if zoomDomain needs update
					if (
						zoomDomain[0].valueOf() !== newDomain[0].valueOf() ||
						zoomDomain[1].valueOf() !== newDomain[1].valueOf()
					) {
						this.model.set(
							{ zoomDomain: newDomain },
							{ animate: false }
						);
					}

					// clear brush selection
					brushArea.call(brush.move, null);
				}
			};

			// leave some space to display selection strokes besides axis
			const brush = brushX()
				.extent([
					[0, 0],
					[width - 1, height]
				])
				.on("start brush end", eventHandler)
				.on("end.brushed", brushed);

			const brushArea = DOMUtils.appendOrSelect(
				backdrop,
				`g.${this.type}`
			).call(brush);

			// set an id for rect.selection to be referred
			brushArea
				.select(this.selectionSelector)
				.attr("id", this.selectionElementId);

			// create the chart brush group
			const [xScaleStart, xScaleEnd] = mainXScale.range();
			const selectionArea = this.getContainerSVG().attr(
				"transform",
				`translate(${xScaleStart},0)`
			);
			// clear old svg
			selectionArea.selectAll("svg").remove();
			// create a svg referring to d3 brush rect.selection
			// this is to draw the selection above all graphs
			selectionArea
				.append("svg")
				.append("use")
				.attr("xlink:href", `#${this.selectionElementId}`);
		}
	}
}
