// Internal Imports
import { Component } from "../component";
import { ScaleTypes } from "../../interfaces";
import { DOMUtils } from "../../services";

// D3 Imports
import { brushX } from "d3-brush";
import { event } from "d3-selection";
import { scaleTime } from "d3-scale";

// This class is used for handle brush events in chart
export class ChartBrush extends Component {
	type = "chart-brush";

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

			const eventHandler = () => {
				const selection = event.selection;
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
					// call external callback
					const zoomBarOptions = this.model.getOptions().zoomBar;
					if (
						zoomBarOptions.selectionStart !== undefined &&
						event.type === "start"
					) {
						zoomBarOptions.selectionStart(selection, newDomain);
					}
					if (
						zoomBarOptions.selectionInProgress !== undefined &&
						event.type === "brush"
					) {
						zoomBarOptions.selectionInProgress(
							selection,
							newDomain
						);
					}
					if (
						zoomBarOptions.selectionEnd !== undefined &&
						event.type === "end"
					) {
						zoomBarOptions.selectionEnd(selection, newDomain);
					}
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
					[2, 0],
					[width - 1, height - 1]
				])
				.on("start brush end", eventHandler)
				.on("end.brushed", brushed);

			const brushArea = DOMUtils.appendOrSelect(
				backdrop,
				`g.${this.type}`
			).call(brush);
		}
	}
}
