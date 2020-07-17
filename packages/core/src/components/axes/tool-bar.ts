// Internal Imports
import { Component } from "../component";
import { Events, ScaleTypes } from "../../interfaces";
import { DOMUtils } from "../../services";

// D3 Imports
import { extent } from "d3-array";
import { line } from "d3-shape";
import { event, select, selectAll } from "d3-selection";
import { scaleTime } from "d3-scale";

// Carbon component import

export class ToolBar extends Component {
	type = "tool-bar";
	// The minimum selection x range to trigger handler update
	// Smaller number may introduce a handler flash during initialization
	// Bigger number may not trigger handler update while selection area on chart is very small
	MIN_SELECTION_DIFF = 9e-10;

	height = 20;

	spacerHeight = 10;

	zoomInStart = 700;

	zoomOutStart = 0;

	previousZoomDomain;

	zoomRatio;

	init() {
		this.services.events.addEventListener(Events.ZoomBar.UPDATE, () => {
			this.render();
		});
		this.zoomRatio = this.model.getOptions().zoomBar.zoomRatio;

	}

	render(animate = true) {
		const svg = this.getContainerSVG();
		const { width } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true
		});
		// get current zoomDomain
		let zoomDomain = this.model.get("zoomDomain");
		if (zoomDomain === undefined) {
			// do nothing, initialization not completed yet
			// don't update brushHandle to avoid flash
			return;
		}
		const { cartesianScales } = this.services;
		const mainXScale = cartesianScales.getMainXScale();
		const xScale = mainXScale.copy();

		// get axes margins
		let axesLeftMargin = 0;
		const axesMargins = this.model.get("axesMargins");
		if (axesMargins && axesMargins.left) {
			axesLeftMargin = axesMargins.left;
		}

		this.zoomOutStart = width - (axesLeftMargin + 70);
		this.zoomInStart = this.zoomOutStart - 25;

		const container = DOMUtils.appendOrSelect(svg, "svg.toolbar-container")
			.attr("width", "100%")
			.attr("height", this.height)
			.attr("opacity", 1);

		const spacer = DOMUtils.appendOrSelect(svg, "rect.toolbar-spacer")
			.attr("x", 0)
			.attr("y", this.height)
			.attr("width", "100%")
			.attr("height", this.spacerHeight)
			.attr("opacity", 1)
			.attr("fill", "none");
		
		const zoomInContainer = DOMUtils.appendOrSelect(container, "g.toolbar-zoomIn")
		const zoomInGroup = zoomInContainer.html(this.getZoomInIcon());
		const zoomIn = zoomInGroup.select("svg#icon-zoomIn");
		var self = this;
		zoomIn.on("click", function () {
			let selectionRange = self.model.get("selectionRange");
			if (!selectionRange) {
				selectionRange = [axesLeftMargin, width];
			}
			xScale.range([axesLeftMargin, width]).domain(zoomDomain);
			let startPoint = selectionRange[0] + ((width - axesLeftMargin)/2) * (self.zoomRatio / 2);
			let endPoint = selectionRange[1] - ((width - axesLeftMargin)/2) * (self.zoomRatio / 2);
			let newDomain = [
				xScale.invert(startPoint),
				xScale.invert(endPoint)
			];
			// if selected start time and end time are the same
			// reset to default full range
			if (newDomain[0].valueOf() === newDomain[1].valueOf()) {
				// same as d3 behavior and zoom bar behavior: set to default full range
				newDomain = self.model.getDefaultZoomBarDomain();
				startPoint = axesLeftMargin;
				endPoint = width;
			}

			// only if zoomDomain needs update
			if (
				zoomDomain[0].valueOf() !== newDomain[0].valueOf() ||
				zoomDomain[1].valueOf() !== newDomain[1].valueOf()
			) {
				self.model.set(
					{ zoomDomain: newDomain, selectionRange: [startPoint, endPoint] },
					{ animate: false }
				);
			}
		});
		const zoomOutContainer = DOMUtils.appendOrSelect(container, "g.toolbar-zoomOut")
		const zoomOutGroup = zoomOutContainer.html(this.getZoomOutIcon());
		const zoomOut = zoomOutGroup.select("svg#icon-zoomOut");
		zoomOut.on("click", function () {
			let currentSelection = self.model.get("selectionRange");
			if (!currentSelection) {
				currentSelection = [axesLeftMargin, width];
			}
			let startPoint = currentSelection[0] - ((width - axesLeftMargin) / 2) * (self.zoomRatio / 2);
			let endPoint =  currentSelection[1] + ((width - axesLeftMargin) / 2) * (self.zoomRatio / 2);
			zoomDomain = self.model.getDefaultZoomBarDomain();
			xScale.range([axesLeftMargin, width]).domain(zoomDomain);

			let newDomain = [
				xScale.invert(startPoint),
				xScale.invert(endPoint)
			];
			// if selected start time and end time are the same
			// reset to default full range
			if (newDomain[0].valueOf() === newDomain[1].valueOf()) {
				// same as d3 behavior and zoom bar behavior: set to default full range
				newDomain = self.model.getDefaultZoomBarDomain();
			}

			if (newDomain[0] <= zoomDomain[0]) {
				newDomain[0] = zoomDomain[0]
				startPoint = axesLeftMargin;
			}
			if (newDomain[1] >= zoomDomain[1]) {
				newDomain[1] = zoomDomain[1];
				endPoint = width;
			}

			self.model.set(
				{ zoomDomain: newDomain, selectionRange: [startPoint, endPoint] },
				{ animate: false }
			);
		
		});


	}

	getZoomInIcon() {
		return `
			<?xml version="1.0" encoding="utf-8"?>
			<!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
			<svg version="1.1" id="icon-zoomIn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="${this.zoomInStart}px" y="0px"
				width="20px" height="20px" viewBox="0 0 15 15" xml:space="preserve">
				<title>Zoom in</title>
				<polygon points="9,6 7,6 7,4 6,4 6,6 4,6 4,7 6,7 6,9 7,9 7,7 9,7 "/>
				<path d="M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7
					L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z"/>
				<rect id="rect-zoomIn" class="icon-zoom" width="20" height="20"/>
			</svg>`;
	}

	getZoomOutIcon() {
		return `
			<?xml version="1.0" encoding="utf-8"?>
			<!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
			<svg version="1.1" id="icon-zoomOut" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="${this.zoomOutStart}px" y="0px"
				width="20px" height="20px" viewBox="0 0 15 15" xml:space="preserve">
				<title>Zoom out</title>
				<rect class="icon-zoomOut" x="4" y="6" width="5" height="1"/>
				<path d="M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7
					L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z"/>
				<rect id="rect-zoomOut" class="icon-zoom" width="20" height="20"/>
			</svg>`;
	}


	
	destroy() {
		this.services.events.removeEventListener(Events.ZoomBar.UPDATE, () => {
			this.render();
		});
	}
	
}
