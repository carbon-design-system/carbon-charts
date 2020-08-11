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

export class Toolbar extends Component {
	type = "toolbar";

	isZoomBarEnabled: boolean;

	// ul options list element
	overflowMenuOptions;

	// overflow menu icon rect to control background
	overflowMenuIcon: any;

	resetZoomMenuItemId = "resetZoomMenuItem";

	// x, y coordinate of overflow menu
	overflowMenuX = 0;
	overflowMenuY = 0;

	// overflow menu icon background padding
	iconPadding = Configuration.toolbar.iconPadding;

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);

		this.init();
	}

	init() {
		const options = this.model.getOptions();

		// Grab the tooltip element
		const holder = select(this.services.domUtils.getHolder());
		const chartprefix = Tools.getProperty(options, "style", "prefix");

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
		this.services.events.addEventListener(
			Events.Toolbar.SHOW_DROPDOWN,
			() => {
				this.overflowMenuOptions.html(this.getOverflowMenuHTML());
			}
		);

		// listen to hide-tooltip Custom Events to hide the tooltip
		this.services.events.addEventListener(
			Events.Toolbar.HIDE_DROPDOWN,
			() => {
				this.overflowMenuOptions.html(null);
			}
		);
	}

	render(animate = true) {
		const isDataLoading = this.services.zoom.isDataLoading();
		this.isZoomBarEnabled =
			this.services.zoom.isZoomBarEnabled() &&
			!this.services.zoom.isEmptyState();
		// size of overflow menu icon with background
		const iconSize = Configuration.toolbar.iconSize;

		const svg = this.getContainerSVG();
		const { width } = DOMUtils.getSVGElementSize(
			this.services.domUtils.getMainSVG(),
			{
				useAttrs: true
			}
		);

		// overflow menu option width is 160px
		// it's set by Carbon component
		const overflowMenuOptionWidth = 160;
		// no good solution to get correct Toolbar position
		// parent x doesn't work well
		// assume the overflowMenu button has right alignment in layout
		this.overflowMenuX = width - overflowMenuOptionWidth;
		this.overflowMenuY =
			parseFloat(this.parent.node().getAttribute("y")) + iconSize;

		const container = DOMUtils.appendOrSelect(svg, "svg.toolbar-container")
			.attr("width", "100%")
			.attr("height", Configuration.toolbar.height)
			.attr("opacity", 1);

		// clean children first
		container.html(null);
		// loading or empty state
		if (isDataLoading) {
			// put an empty rect to keep space unchanged
			DOMUtils.appendOrSelect(container, "svg.toolbar-loading-spacer")
				.append("rect")
				.attr("height", Configuration.toolbar.height)
				.attr("width", iconSize * 3) // value doesn't matter but can't be empty
				.attr("opacity", 0);
		} else {
			const self = this;

			const buttonList = [];
			// add zoom in/out button only if zoom bar is enabled
			if (this.isZoomBarEnabled) {
				buttonList.push(this.getZoomInButtonConfig());
				buttonList.push(this.getZoomOutButtonConfig());
			}
			buttonList.push(this.getOverFlowMenuButtonConfig());

			// render buttons sequentially
			let buttonXPosition = 0;
			buttonList.forEach((button) => {
				// zoom in icon and event
				const buttonContainer = DOMUtils.appendOrSelect(
					container,
					`svg.${button.id}`
				);
				// add icon back ground rect
				let buttonSVG = `<rect class="icon-${button.iconId}" x="${buttonXPosition}px" y="0px"
					width="${iconSize}px" height="${iconSize}px"/>`;
				buttonSVG += button.iconSVG(buttonXPosition);
				buttonContainer.html(buttonSVG);
				buttonContainer.on("click", button.clickFunction);
				buttonXPosition += iconSize;
			});

			this.overflowMenuIcon = DOMUtils.appendOrSelect(
				this.getContainerSVG(),
				"rect.icon-overflowRect"
			);

			const hasOpenedOverflowMenuOptions =
				this.overflowMenuOptions
					.selectAll("ul.bx--overflow-menu-options--open")
					.size() > 0;

			document.body.addEventListener("click", function () {
				// always clear menu icon hover state
				self.setOverflowMenuIconHover(false);
				self.services.events.dispatchEvent(
					Events.Toolbar.HIDE_DROPDOWN
				);
			});

			if (hasOpenedOverflowMenuOptions) {
				this.setOverflowMenuIconHover(true);
				this.overflowMenuOptions.html(this.getOverflowMenuHTML());
			} else {
				this.setOverflowMenuIconHover(false);
				this.overflowMenuOptions.html(null);
			}
		}
	}

	getOverflowMenuHTML() {
		// supports only reset zoom for now
		// if getResetZoomMenuItem() return nothing
		// don't render whole overflow menu
		if (!this.getResetZoomMenuItem()) {
			return "";
		}

		let defaultHTML;
		defaultHTML = `<div data-floating-menu-container="true"
			data-floating-menu-direction="bottom" role="main">
			<ul class="bx--overflow-menu-options bx--overflow-menu--flip bx--overflow-menu-options--open"
				tabindex="-1" role="menu" aria-label="Menu" data-floating-menu-direction="bottom"
				style="left:${this.overflowMenuX}px; top:${this.overflowMenuY}px;">`;
		defaultHTML += this.getResetZoomMenuItem();
		defaultHTML += `</ul></div>`;

		return defaultHTML;
	}

	getResetZoomMenuItem() {
		const resetZoomOption = Tools.getProperty(
			this.model.getOptions(),
			"toolbar",
			"overflowItems",
			"resetZoom"
		);
		if (!resetZoomOption.enabled || !this.isZoomBarEnabled) {
			return "";
		} else {
			return `<li
						class="bx--overflow-menu-options__option">
						<button class="bx--overflow-menu-options__btn" role="menuitem"  title="Reset"
							data-floating-menu-primary-focus
							id="${this.resetZoomMenuItemId}">
							<div class="bx--overflow-menu-options__option-content">
								${resetZoomOption.text}
							</div>
						</button>
					</li>`;
		}
	}

	handleOverflowMenuEvent() {
		if (
			this.overflowMenuOptions
				.selectAll("ul.bx--overflow-menu-options--open")
				.size() > 0
		) {
			// hide overflow menu
			this.setOverflowMenuIconHover(false);
			this.services.events.dispatchEvent(Events.Toolbar.HIDE_DROPDOWN);
		} else {
			// show overflow menu
			this.setOverflowMenuIconHover(true);
			this.services.events.dispatchEvent(Events.Toolbar.SHOW_DROPDOWN);
			const self = this;
			const resetZoomButtonElement = document.getElementById(
				this.resetZoomMenuItemId
			);
			if (resetZoomButtonElement !== null) {
				resetZoomButtonElement.addEventListener(
					"click",
					function () {
						self.services.zoom.resetZoomDomain();

						self.setOverflowMenuIconHover(false);

						self.services.events.dispatchEvent(
							Events.Toolbar.HIDE_DROPDOWN
						);
					},
					true
				);
			}
		}
		event.stopImmediatePropagation();
	}

	setOverflowMenuIconHover(enable) {
		const overflowIconClass = enable
			? "icon-overflowRect-hover"
			: "icon-overflowRect";

		this.overflowMenuIcon.attr("class", overflowIconClass);
	}

	getZoomInButtonConfig() {
		return {
			id: "toolbar-zoomIn",
			iconId: "zoomInRect",
			iconSVG: (startPosition) => this.getZoomInIcon(startPosition),
			clickFunction: () => this.services.zoom.zoomIn()
		};
	}
	getZoomOutButtonConfig() {
		return {
			id: "toolbar-zoomOut",
			iconId: "zoomOutRect",
			iconSVG: (startPosition) => this.getZoomOutIcon(startPosition),
			clickFunction: () => this.services.zoom.zoomOut()
		};
	}

	getOverFlowMenuButtonConfig() {
		return {
			id: "toolbar-overflow-menu",
			iconId: "overflowRect",
			iconSVG: (startPosition) => this.getOverflowMenuIcon(startPosition),
			clickFunction: () => this.handleOverflowMenuEvent()
		};
	}

	getZoomInIcon(startPosition) {
		return `<?xml version="1.0" encoding="utf-8"?>
				<!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
					x="${startPosition + this.iconPadding}px" y="${this.iconPadding}px"
					width="20px" height="20px" viewBox="0 0 15 15" xml:space="preserve">
					<polygon points="9,6 7,6 7,4 6,4 6,6 4,6 4,7 6,7 6,9 7,9 7,7 9,7 "/>
					<path d="M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7
						L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z"/>
				</svg>`;
	}

	getZoomOutIcon(startPosition) {
		return `
			<?xml version="1.0" encoding="utf-8"?>
			<!-- Generator: Adobe Illustrator 23.0.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
			<svg version="1.1" class="icon-zoomOut" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
				x="${startPosition + this.iconPadding}px" y="${this.iconPadding}px"
				width="20px" height="20px" viewBox="0 0 15 15" xml:space="preserve">
				<title>Zoom out</title>
				<rect class="rect-zoomOut" x="4" y="6" width="5" height="1"/>
				<path d="M10.7,10C11.5,9,12,7.8,12,6.5C12,3.5,9.5,1,6.5,1S1,3.5,1,6.5S3.5,12,6.5,12c1.3,0,2.5-0.5,3.5-1.3l3.8,3.8l0.7-0.7
					L10.7,10z M6.5,11C4,11,2,9,2,6.5S4,2,6.5,2S11,4,11,6.5S9,11,6.5,11L6.5,11z"/>
			</svg>`;
	}

	getOverflowMenuIcon(startPosition) {
		return `
			<?xml version="1.0" encoding="utf-8"?>
			<svg class="toolbar-overflow-menu-icon" focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg"
			x="${startPosition + this.iconPadding}px" y="${this.iconPadding}px"
			width="20" height="20" viewBox="0 0 15 15" aria-hidden="true">
				<circle cx="8" cy="3" r="1"></circle>
				<circle cx="8" cy="8" r="1"></circle>
				<circle cx="8" cy="13" r="1"></circle>
			</svg>`;
	}
}
