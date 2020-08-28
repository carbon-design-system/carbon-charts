import { Component } from "../component";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";
import { ChartModel } from "../../model";
import { Events, TruncationTypes } from "../../interfaces";
import * as Configuration from "../../configuration";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// import the settings for the css prefix
import settings from "carbon-components/es/globals/js/settings";

// D3 Imports
import { select, mouse } from "d3-selection";

export class Tooltip extends Component {
	type = "tooltip";

	tooltip: any;
	positionService = new Position();
	isTooltipEnabled = Tools.getProperty(
		this.model.getOptions(),
		"tooltip",
		"enabled"
	);

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);

		this.init();
	}

	init() {
		if (this.isTooltipEnabled) {
			// Grab the tooltip element
			const holder = select(this.services.domUtils.getHolder());
			const chartprefix = Tools.getProperty(
				this.model.getOptions(),
				"style",
				"prefix"
			);
			this.tooltip = DOMUtils.appendOrSelect(
				holder,
				`div.${settings.prefix}--${chartprefix}--tooltip`
			);

			// Apply html content to the tooltip
			const tooltipTextContainer = DOMUtils.appendOrSelect(
				this.tooltip,
				"div.content-box"
			);
			this.tooltip.style("max-width", null);

			// listen to move-tooltip Custom Events to move the tooltip
			this.services.events.addEventListener(
				Events.Tooltip.MOVE,
				(e: CustomEvent) => {
					this.positionTooltip(e);
				}
			);

			// listen to show-tooltip Custom Events to render the tooltip
			this.services.events.addEventListener(
				Events.Tooltip.SHOW,
				(e: CustomEvent) => {
					const data = e.detail.data || e.detail.items;
					const defaultHTML = this.getTooltipHTML(e);

					// if there is a provided tooltip HTML function call it
					if (
						Tools.getProperty(
							this.model.getOptions(),
							"tooltip",
							"customHTML"
						)
					) {
						tooltipTextContainer.html(
							this.model
								.getOptions()
								.tooltip.customHTML(data, defaultHTML)
						);
					} else {
						// Use default tooltip
						tooltipTextContainer.html(defaultHTML);
					}

					// Position the tooltip
					this.positionTooltip(e);

					// Fade in
					this.tooltip.classed("hidden", false);
				}
			);

			// listen to hide-tooltip Custom Events to hide the tooltip
			this.services.events.addEventListener(Events.Tooltip.HIDE, () => {
				this.tooltip.classed("hidden", true);
			});
		}
	}

	getItems(e: CustomEvent) {
		if (e.detail.items) {
			return e.detail.items;
		}

		return [];
	}

	formatItems(items) {
		const options = this.model.getOptions();

		// get user provided custom values for truncation
		const truncationType = Tools.getProperty(
			options,
			"tooltip",
			"truncation",
			"type"
		);

		const truncationThreshold = Tools.getProperty(
			options,
			"tooltip",
			"truncation",
			"threshold"
		);

		const truncationNumCharacter = Tools.getProperty(
			options,
			"tooltip",
			"truncation",
			"numCharacter"
		);

		// truncate the label if it's too long
		// only applies to discrete type
		if (truncationType !== TruncationTypes.NONE) {
			return items.map((item) => {
				if (item.label && item.label.length > truncationThreshold) {
					item.label = Tools.truncateLabel(
						item.label,
						truncationType,
						truncationNumCharacter
					);
				}

				if (item.value && item.value.length > truncationThreshold) {
					item.value = Tools.truncateLabel(
						item.value,
						truncationType,
						truncationNumCharacter
					);
				}

				return item;
			});
		}

		return items;
	}

	getTooltipHTML(e: CustomEvent) {
		let defaultHTML;
		if (e.detail.content) {
			defaultHTML = `<div class="title-tooltip">${e.detail.content}</div>`;
		} else {
			const items = this.getItems(e);
			const formattedItems = this.formatItems(items);
			defaultHTML =
				`<ul class='multi-tooltip'>` +
				formattedItems
					.map(
						(item) =>
							`<li>
							<div class="datapoint-tooltip ${item.bold ? "bold" : ""}">
								${
									item.color
										? "<a style=\"background-color: " +
										  item.color +
										  "\" class=\"tooltip-color\"></a>"
										: ""
								}
								<p class="label">${item.label}</p>
								<p class="value">${item.value}</p>
							</div>
						</li>`
					)
					.join("") +
				`</ul>`;
		}

		return defaultHTML;
	}

	valueFormatter(value: any) {
		const options = this.model.getOptions();
		const valueFormatter = Tools.getProperty(
			options,
			"tooltip",
			"valueFormatter"
		);

		if (valueFormatter) {
			return valueFormatter(value);
		}

		return value.toLocaleString();
	}

	render() {
		if (this.isTooltipEnabled) {
			this.tooltip.classed("hidden", true);
		}
	}

	positionTooltip(e: CustomEvent) {
		const holder = this.services.domUtils.getHolder();
		const target = this.tooltip.node();
		const isTopZoomBarEnabled = Tools.getProperty(
			this.model.getOptions(),
			"zoomBar",
			"top",
			"enabled"
		);

		let mouseRelativePos = Tools.getProperty(e, "detail", "mousePosition");
		if (!mouseRelativePos) {
			mouseRelativePos = mouse(holder);
		} else {
			const zoombarType = Tools.getProperty(
				this.model.getOptions(),
				"zoomBar",
				"top",
				"type"
			);
			const zoombarHeight = Configuration.zoomBar.height[zoombarType];

			// if the mouse position is from event (ruler)
			// we need add zoom bar height
			if (isTopZoomBarEnabled) {
				mouseRelativePos[1] +=
					zoombarHeight + Configuration.zoomBar.spacerHeight;

				// TODO - we need to add toolbar height when toolbar is available
			}
		}

		let pos;

		// Find out whether tooltip should be shown on the left or right side
		const bestPlacementOption = this.positionService.findBestPlacementAt(
			{
				left: mouseRelativePos[0],
				top: mouseRelativePos[1]
			},
			target,
			[
				PLACEMENTS.RIGHT,
				PLACEMENTS.LEFT,
				PLACEMENTS.TOP,
				PLACEMENTS.BOTTOM
			],
			() => ({
				width: holder.offsetWidth,
				height: holder.offsetHeight
			})
		);

		let { horizontalOffset } = Configuration.tooltips;
		if (bestPlacementOption === PLACEMENTS.LEFT) {
			horizontalOffset *= -1;
		}

		// Get coordinates to where tooltip should be positioned
		pos = this.positionService.findPositionAt(
			{
				left: mouseRelativePos[0] + horizontalOffset,
				top: mouseRelativePos[1]
			},
			target,
			bestPlacementOption
		);

		this.positionService.setElement(target, pos);
	}
}
