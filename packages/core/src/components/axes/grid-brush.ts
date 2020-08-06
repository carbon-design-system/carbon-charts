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

	type = "grid-brush";

	selectionSelector = "rect.selection"; // needs to match the class name in d3.brush

	frontSelectionSelector = "rect.frontSelection"; // needs to match the class name in _grid-brush.scss

	render(animate = true) {
		const svg = this.parent;
		// use this area to display selection above all graphs
		const frontSelectionArea = this.getContainerSVG();
		const backdrop = DOMUtils.appendOrSelect(
			svg,
			"svg.chart-grid-backdrop"
		);
		// use this area to handle d3 brush events
		const brushArea = DOMUtils.appendOrSelect(backdrop, `g.${this.type}`);

		// set an id for rect.selection to be referred
		const d3Selection = DOMUtils.appendOrSelect(
			brushArea,
			this.selectionSelector
		);

		const { width, height } = DOMUtils.getSVGElementSize(backdrop, {
			useAttrs: true
		});

		const { cartesianScales } = this.services;
		const mainXScaleType = cartesianScales.getMainXScaleType();
		const mainXScale = cartesianScales.getMainXScale();
		const [xScaleStart, xScaleEnd] = mainXScale.range();
		frontSelectionArea.attr("transform", `translate(${xScaleStart},0)`);
		const frontSelection = DOMUtils.appendOrSelect(
			frontSelectionArea,
			this.frontSelectionSelector
		);

		if (mainXScale && mainXScaleType === ScaleTypes.TIME) {
			// get current zoomDomain
			let zoomDomain = this.model.get("zoomDomain");
			if (zoomDomain === undefined) {
				// default to full range with extended domain
				zoomDomain = this.services.zoom.getDefaultZoomBarDomain();
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

				frontSelection.attr("stroke-dasharray", dashArray);
			};

			const eventHandler = () => {
				const selection = event.selection;
				if (selection === null) {
					return;
				}

				// copy the d3 selection attrs to front selection element
				frontSelection
					.attr("x", d3Selection.attr("x"))
					.attr("y", d3Selection.attr("y"))
					.attr("width", d3Selection.attr("width"))
					.attr("height", d3Selection.attr("height"))
					.style("cursor", "pointer")
					.style("display", null);

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
						newDomain = this.services.zoom.getDefaultZoomBarDomain();
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
					// hide frontSelection
					frontSelection.style("display", "none");
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

			brushArea.call(brush);
		}
	}
}
