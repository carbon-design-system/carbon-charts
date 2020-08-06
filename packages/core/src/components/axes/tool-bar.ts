// Internal Imports
import { Component } from "../component";
import { Events } from "../../interfaces";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";
import { ChartModel } from "../../model";
import * as Configuration from "../../configuration";

// D3 Imports
import { event, select } from "d3-selection";

// import the settings for the css prefix
import settings from "carbon-components/es/globals/js/settings";

export class ToolBar extends Component {
	type = "tool-bar";

	zoomInStart = 700;

	zoomOutStart = 0;

	overflowMenuStart = 0;

	zoomRatio;

	// ul options list element
	overflowMenuOptions;

	// overflow menu icon rect
	overflowMenuIcon;

	// y coordinate of overflow menu icon
	overflowMenuIconBottom = 0;

	menuOptionsList;

	overflowIconClass = "icon-overflowRect";

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);

		this.init();
	}

	init() {
		const options = this.model.getOptions();
		this.zoomRatio = Tools.getProperty(options, "zoomBar", "toolBar", "zoomRatio");
		this.menuOptionsList = Tools.getProperty(options, "zoomBar", "toolBar", "overflowMenuItems");

		// Grab the tooltip element
		const holder = select(this.services.domUtils.getHolder());
		const chartprefix = Tools.getProperty(
			options,
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
		const isDataLoading = Tools.getProperty(
			this.model.getOptions(),
			"data",
			"loading"
		);
		this.overflowMenuOptions.classed("hidden", true);

		const svg = this.getContainerSVG();
		const { width } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true
		});
		// get current zoomDomain
		const zoomDomain = this.model.get("zoomDomain");
		if (!isDataLoading && zoomDomain === undefined) {
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

		this.overflowMenuStart = width - Configuration.toolBar.iconSize;
		this.zoomOutStart =
			this.overflowMenuStart - Configuration.toolBar.iconSize;
		this.zoomInStart = this.zoomOutStart - Configuration.toolBar.iconSize;

		const container = DOMUtils.appendOrSelect(svg, "svg.toolbar-container")
			.attr("width", "100%")
			.attr("height", Configuration.toolBar.height)
			.attr("opacity", 1);

		// clean children first
		container.html(null);
		if (isDataLoading) {
			// put an empty rect to keep space unchanged
			DOMUtils.appendOrSelect(container, "svg.toolbar-loading-space")
				.append("rect")
				.attr("height", Configuration.toolBar.height)
				.attr("width", 1) // value doesn't matter but can't be empty
				.attr("opacity", 0);
		} else {
			const self = this;

			// zoom in icon and event
			const zoomInContainer = DOMUtils.appendOrSelect(
				container,
				"svg.toolbar-zoomIn"
			);
			zoomInContainer.html(this.getZoomInIcon());

			zoomInContainer.on("click", function () {
				self.handleZoomInEvent(
					self,
					zoomDomain,
					axesLeftMargin,
					width,
					xScale
				);
			});

			// zoom out icon and event
			const zoomOutContainer = DOMUtils.appendOrSelect(
				container,
				"svg.toolbar-zoomOut"
			);
			zoomOutContainer.html(this.getZoomOutIcon());

			zoomOutContainer.on("click", function () {
				self.handleZoomOutEvent(
					self,
					zoomDomain,
					axesLeftMargin,
					width,
					xScale
				);
			});

			// overflow menu icon and event
			const overflowMenuContainer = DOMUtils.appendOrSelect(
				container,
				"svg.toolbar-overflow-menu"
			);
			overflowMenuContainer.html(this.getOverflowMenuIcon());
			this.overflowMenuIcon = DOMUtils.appendOrSelect(
				overflowMenuContainer,
				`rect.${this.overflowIconClass}`
			);

			overflowMenuContainer.on("click", function () {
				self.handleOverflowMenuEvent(
					this.parentNode,
					self,
					axesLeftMargin,
					width
				);
			});

			const hasOpenedOverflowMenuOptions =  self.overflowMenuOptions
				.selectAll("ul.bx--overflow-menu-options--open")
				.size() > 0;

			document.body.addEventListener("click", function () {
				if (hasOpenedOverflowMenuOptions) {
					self.overflowIconClass = "icon-overflowRect";
					self.overflowMenuIcon.attr("class", self.overflowIconClass);
					self.services.events.dispatchEvent(Events.Toolbar.HIDE);
				}
			});

			this.overflowIconClass =
				hasOpenedOverflowMenuOptions
					? "icon-overflowRect-hover"
					: "icon-overflowRect";
			this.overflowMenuOptions.html(
				this.overflowIconClass === "icon-overflowRect"
					? null
					: this.getOverflowMenuHTML()
			);
		}
	}

	getZoomInIcon() {
		// zoom in icon background left padding is 5px
		return `
			<rect class="icon-zoomInRect"
			x="${this.zoomInStart}px" y="0px"
			width="${Configuration.toolBar.iconSize}px" height="${
			Configuration.toolBar.iconSize
		}px"/>
				<?xml version="1.0" encoding="utf-8"?>
				<!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="${
					this.zoomInStart + Configuration.toolBar.iconLeftPadding
				}px" y="5px"
					width="20px" height="20px" viewBox="0 0 15 15" xml:space="preserve">
					<polygon points="9,6 7,6 7,4 6,4 6,6 4,6 4,7 6,7 6,9 7,9 7,7 9,7 "/>
					<path d="M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7
						L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z"/>
				</svg>`;
	}

	getZoomOutIcon() {
		// zoom out icon background left padding is 5px
		return `
			<rect class="icon-zoomOutRect"
			x="${this.zoomOutStart}px" y="0px"
			width="${Configuration.toolBar.iconSize}px" height="${
			Configuration.toolBar.iconSize
		}px"/>
			<?xml version="1.0" encoding="utf-8"?>
			<!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
			<svg version="1.1" class="icon-zoomOut" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="${
				this.zoomOutStart + Configuration.toolBar.iconLeftPadding
			}px" y="5px"
				width="20px" height="20px" viewBox="0 0 15 15" xml:space="preserve">
				<title>Zoom out</title>
				<rect class="rect-zoomOut" x="4" y="6" width="5" height="1"/>
				<path d="M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7
					L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z"/>
			</svg>`;
	}

	getOverflowMenuIcon() {
		// overflow menu icon background left padding is 5px
		return `
			<rect class="${this.overflowIconClass}"
			x="${this.overflowMenuStart}px" y="0px"
			width="${Configuration.toolBar.iconSize}px" height="${
			Configuration.toolBar.iconSize
		}px" />
			<svg class="toolbar-overflow-menu-icon" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" x="${
				this.overflowMenuStart + Configuration.toolBar.iconLeftPadding
			}px" y="5px"
				width="20" height="20" viewBox="0 0 15 15" aria-hidden="true">
				<circle cx="8" cy="3" r="1"></circle>
				<circle cx="8" cy="8" r="1"></circle>
				<circle cx="8" cy="13" r="1"></circle>
				<rect class="icon-overflow-menu" width="20" height="20"/>
			</svg>`;
	}

	getOverflowMenuHTML() {
		let defaultHTML;

		const options = this.getMenuOptions();
		// overflow menu icon background left padding is 5px
		// oferflow menu option width is 160px
		// width of overflow menu icon with background is 30px
		defaultHTML =
			`<div data-floating-menu-container="true"
			data-floating-menu-direction="bottom" role="main">
			<ul class="bx--overflow-menu-options bx--overflow-menu--flip bx--overflow-menu-options--open"
				tabindex="-1" role="menu" aria-label="Menu" data-floating-menu-direction="bottom"
				style="left:${
					this.overflowMenuStart -
					(160 - Configuration.toolBar.iconSize)
				}px; top:${this.overflowMenuIconBottom}px;">` +
			options
				.map(
					(option) =>
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
		return this.menuOptionsList;
	}

	handleZoomIconClickEvent(
		type,
		self,
		zoomDomain,
		xScale,
		axesLeftMargin,
		width
	) {
		let selectionRange = self.model.get("selectionRange");
		if (!selectionRange) {
			selectionRange = [axesLeftMargin, width];
		}
		const startPoint =
			type === "out"
				? selectionRange[0] - ((width - axesLeftMargin) / 2) * (self.zoomRatio / 2)
				: selectionRange[0] + ((width - axesLeftMargin) / 2) * (self.zoomRatio / 2);
		const endPoint =
			type === "out"
				? selectionRange[1] + ((width - axesLeftMargin) / 2) * (self.zoomRatio / 2)
				: selectionRange[1] - ((width - axesLeftMargin) / 2) * (self.zoomRatio / 2);

		zoomDomain =
			type === "out"
				? self.services.zoom.getDefaultZoomBarDomain()
				: zoomDomain;
		xScale.range([axesLeftMargin, width]).domain(zoomDomain);
		const newDomain = [xScale.invert(startPoint), xScale.invert(endPoint)];

		return [newDomain, zoomDomain, startPoint, endPoint];
	}

	handleDomainChange(newDomain, startPoint, endPoint, self) {
		self.model.set(
			{ zoomDomain: newDomain, selectionRange: [startPoint, endPoint] },
			{ animate: false }
		);
		self.services.events.dispatchEvent(Events.ZoomDomain.CHANGE, {
			newDomain
		});
	}

	handleZoomInEvent(self, zoomDomain, axesLeftMargin, width, xScale) {
		let [
			newDomain,
			originalZoomDomain,
			startPoint,
			endPoint
		] = self.handleZoomIconClickEvent(
			"in",
			self,
			zoomDomain,
			xScale,
			axesLeftMargin,
			width
		);
		// if selected start time and end time are the same
		// reset to default full range
		if (
			newDomain[0].valueOf() > newDomain[1].valueOf() ||
			newDomain[0].valueOf() === newDomain[1].valueOf()
		) {
			// same as d3 behavior and zoom bar behavior: set to default full range
			newDomain = self.services.zoom.getDefaultZoomBarDomain();
			startPoint = axesLeftMargin;
			endPoint = width;
		}

		// only if zoomDomain needs update
		if (
			zoomDomain[0].valueOf() !== newDomain[0].valueOf() ||
			zoomDomain[1].valueOf() !== newDomain[1].valueOf()
		) {
			self.handleDomainChange(newDomain, startPoint, endPoint, self);
		}
	}

	handleZoomOutEvent(self, zoomDomain, axesLeftMargin, width, xScale) {
		let [
			newDomain,
			originalZoomDomain,
			startPoint,
			endPoint
		] = self.handleZoomIconClickEvent(
			"out",
			self,
			zoomDomain,
			xScale,
			axesLeftMargin,
			width
		);
		zoomDomain = originalZoomDomain;
		// if selected start time and end time are the same
		// reset to default full range
		if (newDomain[0].valueOf() === newDomain[1].valueOf()) {
			// same as d3 behavior and zoom bar behavior: set to default full range
			newDomain = self.services.zoom.getDefaultZoomBarDomain();
		}

		if (newDomain[0] <= zoomDomain[0]) {
			newDomain[0] = zoomDomain[0];
			startPoint = axesLeftMargin;
		}
		if (newDomain[1] >= zoomDomain[1]) {
			newDomain[1] = zoomDomain[1];
			endPoint = width;
		}

		self.handleDomainChange(newDomain, startPoint, endPoint, self);
	}

	handleOverflowMenuEvent(parentNode, self, axesLeftMargin, width) {
		if (
			self.overflowMenuOptions
				.selectAll("ul.bx--overflow-menu-options--open")
				.size() > 0
		) {
			// Hide toolbar
			self.overflowIconClass = "icon-overflowRect";
			self.overflowMenuIcon.attr("class", self.overflowIconClass);
			self.services.events.dispatchEvent(Events.Toolbar.HIDE);
		} else {
			self.overflowMenuIconBottom =
				parseFloat(self.parent.node().getAttribute("y")) +
				parentNode.getBBox().height;
			self.overflowIconClass = "icon-overflowRect-hover";
			self.overflowMenuIcon.attr("class", self.overflowIconClass);
			self.services.events.dispatchEvent(Events.Toolbar.SHOW);
			document.getElementById("reset-Btn").addEventListener(
				"click",
				function () {
					const newDomain = self.services.zoom.getDefaultZoomBarDomain();
					self.handleDomainChange(
						newDomain,
						axesLeftMargin,
						width,
						self
					);
					self.overflowIconClass = "icon-overflowRect";
					self.overflowMenuIcon.attr("class", self.overflowIconClass);
					self.services.events.dispatchEvent(Events.Toolbar.HIDE);
				},
				true
			);
		}
		event.stopImmediatePropagation();
	}
}
