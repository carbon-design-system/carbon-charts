// Internal Imports
import { Service } from "./service";
import { Tools } from "../tools";

// D3 Imports
import { brushX } from "d3-brush";
import { event } from "d3-selection";

export class AxisZoom extends Service {
	brush: any;

	brushed(e) {
		if (event) {
			const selectedRange = event.selection;

			const mainXAxis = this.services.axes.getMainXAxis();
			const mainXAxisRangeStart = mainXAxis.scale.range()[0];

			const newDomain = selectedRange.map(d => d + mainXAxisRangeStart)
				.map(mainXAxis.scale.invert, mainXAxis.scale);

			this.model.set({
				zoomDomain: newDomain.map(d => new Date(+d))
			});
		}
	}

	// We need a custom debounce function here
	// because of the async nature of d3.event
	debounceWithD3Event(func, wait) {
		let timeout;
		return function() {
			const e = Object.assign({}, event);
			const context = this;
			const later = function() {
				timeout = null;
				func.apply(context, [e]);
			};
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
		};
	}

	getZoomInstance() {
		const mainXAxis = this.services.axes.getMainXAxis();
		const mainYAxis = this.services.axes.getMainYAxis();
		const xMaxRange = mainXAxis.scale.range()[1];
		const yMaxRange = mainYAxis.scale.range()[0];

		this.brush = brushX()
			.extent([
				[0, 0],
				[xMaxRange, yMaxRange]
			])
			.on("end", this.brushed.bind(this));


		return this.brush;
	}
}
