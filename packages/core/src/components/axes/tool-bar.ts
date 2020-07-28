// Internal Imports
import { Component } from "../component";
import { Events, ScaleTypes } from "../../interfaces";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";
import { ChartModel } from "../../model";

// D3 Imports
import { event, select, selectAll } from "d3-selection";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// import the settings for the css prefix
import settings from "carbon-components/es/globals/js/settings";

export class ToolBar extends Component {
	type = "tool-bar";

	height = 20;

	spacerHeight = 10;

	zoomInStart = 700;

	zoomOutStart = 0;

	overflowMenuStart = 0;

	zoomRatio;

	overflowMenuOptions;

	overflowMenuId = "overflowMenu-" + Math.floor(Math.random() * 99999999999);


	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);

		this.init();
	}

	init() {
		this.services.events.addEventListener(Events.ZoomBar.UPDATE, () => {
			this.render();
		});
		this.zoomRatio = this.model.getOptions().zoomBar.zoomRatio;

		// Grab the tooltip element
		const holder = select(this.services.domUtils.getHolder());
		const chartprefix = Tools.getProperty(
			this.model.getOptions(),
			"style",
			"prefix"
		);
		this.overflowMenuOptions = DOMUtils.appendOrSelect(
			holder,
			`div.${settings.prefix}--${chartprefix}--overflowMenu`
		);

		// Apply html content to the tooltip
		const toolbarTextContainer = DOMUtils.appendOrSelect(
			this.overflowMenuOptions,
			"div.content-box"
		);
		this.overflowMenuOptions.style("max-width", null);

		// listen to show-tooltip Custom Events to render the tooltip
		this.services.events.addEventListener(Events.Toolbar.SHOW, () => {
			const defaultHTML = this.getOverflowMenuHTML();
			this.overflowMenuOptions.classed("hidden", false);
			this.overflowMenuOptions.html(defaultHTML);
		});

		// listen to hide-tooltip Custom Events to hide the tooltip
		this.services.events.addEventListener(Events.Toolbar.HIDE, () => {
			this.overflowMenuOptions.classed("hidden", true);
			this.overflowMenuOptions.html(null);
		});

	}

	render(animate = true) {
		this.overflowMenuOptions.classed("hidden", true);

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

		this.overflowMenuStart = width - 20;
		this.zoomOutStart = this.overflowMenuStart - 30;
		this.zoomInStart = this.zoomOutStart - 30;

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

		const zoomInContainer = DOMUtils.appendOrSelect(container, "g.toolbar-zoomIn");
		const zoomInGroup = zoomInContainer.html(this.getZoomInIcon());
		const zoomIn = zoomInGroup.select("svg#icon-zoomIn");
		const self = this;
		zoomIn.on("click", function () {
			let selectionRange = self.model.get("selectionRange");
			if (!selectionRange) {
				selectionRange = [axesLeftMargin, width];
			}
			xScale.range([axesLeftMargin, width]).domain(zoomDomain);
			let startPoint = selectionRange[0] + ((width - axesLeftMargin) / 2) * (self.zoomRatio / 2);
			let endPoint = selectionRange[1] - ((width - axesLeftMargin) / 2) * (self.zoomRatio / 2);
			let newDomain = [
				xScale.invert(startPoint),
				xScale.invert(endPoint)
			];
			// if selected start time and end time are the same
			// reset to default full range
			if ( newDomain[0].valueOf() > newDomain[1].valueOf() || newDomain[0].valueOf() === newDomain[1].valueOf()) {
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
				self.services.events.dispatchEvent(Events.ZoomDomain.CHANGE, {
					newDomain
				});
			}
		});
		const zoomOutContainer = DOMUtils.appendOrSelect(container, "g.toolbar-zoomOut");
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
				newDomain[0] = zoomDomain[0];
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
			self.services.events.dispatchEvent(Events.ZoomDomain.CHANGE, {
				newDomain
			});

		});

		const overflowMenuContainer = DOMUtils.appendOrSelect(container, "g.toolbar-overflow-menu");
		const overflowMenuGroup =  overflowMenuContainer.html(this.getOverflowMenuIcon());
		const overflowMenu = overflowMenuGroup.select("svg#toolbar-overflow-menu-icon");

		overflowMenu.on("click", function() {
			if (self.overflowMenuOptions.selectAll("ul.bx--overflow-menu-options--open").size() > 0) {
				// Hide toolbar
				self.services.events.dispatchEvent(Events.Toolbar.HIDE);
			} else {
				self.services.events.dispatchEvent(Events.Toolbar.SHOW);
				document.getElementById("reset-Btn").addEventListener("click", function () {
					const newDomain = self.model.getDefaultZoomBarDomain();
					self.model.set(
						{ zoomDomain: newDomain, selectionRange: [axesLeftMargin, width] },
						{ animate: false }
					);
					self.services.events.dispatchEvent(Events.ZoomDomain.CHANGE, {
						newDomain
					});
					self.services.events.dispatchEvent(Events.Toolbar.HIDE);
				}, true);
			}
			event.stopImmediatePropagation();
		});

		document.body.addEventListener("click", function(e) {
			if (self.overflowMenuOptions.selectAll("ul.bx--overflow-menu-options--open").size() > 0) {
				self.services.events.dispatchEvent(Events.Toolbar.HIDE);
			}
		});

	}

	getZoomInIcon() {
		return `
			<?xml version="1.0" encoding="utf-8"?>
			<!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
			<svg version="1.1" id="icon-zoomIn" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="${this.zoomInStart}px" y="0px"
				width="20px" height="20px" viewBox="0 0 15 15" xml:space="preserve">
				<title>Zoom in</title>
				<rect id="rect-zoomIn" class="icon-zoom" width="20" height="20"/>
				<polygon points="9,6 7,6 7,4 6,4 6,6 4,6 4,7 6,7 6,9 7,9 7,7 9,7 "/>
				<path d="M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7
					L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z"/>
			</svg>`;
	}

	getZoomOutIcon() {
		return `
			<?xml version="1.0" encoding="utf-8"?>
			<!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
			<svg version="1.1" id="icon-zoomOut" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="${this.zoomOutStart}px" y="0px"
				width="20px" height="20px" viewBox="0 0 15 15" xml:space="preserve">
				<title>Zoom out</title>
				<rect id="rect-zoomOut" class="icon-zoom" width="20" height="20"/>
				<rect class="icon-zoomOut" x="4" y="6" width="5" height="1"/>
				<path d="M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7
					L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z"/>
			</svg>`;
	}

	getOverflowMenuIcon() {
		return `
			<svg id="toolbar-overflow-menu-icon" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" x="${this.overflowMenuStart}px" y="0px"
				width="20" height="20" viewBox="0 0 15 15" aria-hidden="true">
				<circle cx="8" cy="3" r="1"></circle>
				<circle cx="8" cy="8" r="1"></circle>
				<circle cx="8" cy="13" r="1"></circle>
				<rect class="icon-overflow-menu" width="20" height="20"/>
			</svg>`;
	}

	getOverflowMenuHTML() {

		const chartprefix = Tools.getProperty(
			this.model.getOptions(),
			"style",
			"prefix"
		);

		let defaultHTML;

		const options = this.getMenuOptions();

		defaultHTML =
			`<div data-floating-menu-container="true"
			data-floating-menu-direction="bottom" role="main">
			<ul class="bx--overflow-menu-options bx--overflow-menu--flip bx--overflow-menu-options--open"
				tabindex="-1" role="menu" aria-label="Menu" data-floating-menu-direction="bottom"
				style="left:${this.overflowMenuStart - (160 - 20 - 15 / 2)}px; top:70px;">` +
			options
				.map(
					(option, index) =>
						`<li
						class="bx--overflow-menu-options__option">
						<button class="bx--overflow-menu-options__btn" role="menuitem"  title="Reset"
							data-floating-menu-primary-focus
							id="reset-Btn">
							<div class="bx--overflow-menu-options__option-content">
								${option}
							</div>
						</button>
					</li>`
				)
				.join("") +
			`</ul></div>`;

		return defaultHTML;
	}

	getMenuOptions() {
		return ["Reset zoom"];
	}

	destroy() {
		this.services.events.removeEventListener(Events.ZoomBar.UPDATE, () => {
			this.render();
		});
	}

}
