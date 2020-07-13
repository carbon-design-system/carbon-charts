import * as Configuration from "../../configuration";
import { Component } from "../component";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";
import { ChartModel } from "../../model";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// import the settings for the css prefix
import settings from "carbon-components/es/globals/js/settings";

// D3 Imports
import { select, mouse, event } from "d3-selection";
import {
	TooltipTypes,
	TooltipPosition,
	Events,
	AxisPositions,
	ScaleTypes
} from "../../interfaces";

export class Tooltip extends Component {
	type = "tooltip";

	tooltip: any;
	positionService = new Position();

	constructor(model: ChartModel, services: any, configs?: any) {
		super(model, services, configs);

		this.init();
	}

	init() {
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
		this.services.events.addEventListener(Events.Tooltip.MOVE, () => {
			this.positionTooltip();
		});

		// listen to show-tooltip Custom Events to render the tooltip
		this.services.events.addEventListener(Events.Tooltip.SHOW, (e) => {
			const data = e.detail.data;
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
			this.positionTooltip();

			// Fade in
			this.tooltip.classed("hidden", false);
		});

		// listen to hide-tooltip Custom Events to hide the tooltip
		this.services.events.addEventListener(Events.Tooltip.HIDE, () => {
			this.tooltip.classed("hidden", true);
		});
	}

	getItems(e: CustomEvent) {
		if (e.detail.items) {
			return e.detail.items;
		}

		return [];
	}

	getTooltipHTML(e: CustomEvent) {
		let defaultHTML;
		if (e.detail.content) {
			defaultHTML = `<div class="title-tooltip">${e.detail.content}</div>`;
		} else {
			const items = this.getItems(e);
			defaultHTML =
				`<ul class='multi-tooltip'>` +
				items
					.map(
						(item) =>
							`<li>
							<div class="datapoint-tooltip ${item.bold ? "bold" : ""}">
								${
									item.color
										? '<a style="background-color: ' +
										  item.color +
										  '" class="tooltip-color"></a>'
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
		const valueFormatter = Tools.getProperty(options, "tooltip", "valueFormatter");

		if (valueFormatter) {
			return valueFormatter(value);
		}

		return value.toLocaleString();
	}

	render() {
		this.tooltip.classed("hidden", true);
	}

	positionTooltip(positionOverride?: any) {
		const holder = this.services.domUtils.getHolder();
		const target = this.tooltip.node();
		const mouseRelativePos = mouse(holder);
		let pos;

		// override position to place tooltip at {placement:.., position:{top:.. , left:..}}
		if (positionOverride) {
			// placement determines whether the tooltip is centered above or below the position provided
			const placement =
				positionOverride.placement === TooltipPosition.TOP
					? PLACEMENTS.TOP
					: PLACEMENTS.BOTTOM;

			pos = this.positionService.findPositionAt(
				positionOverride.position,
				target,
				placement
			);
		} else {
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

			let { horizontalOffset } = this.model.getOptions().tooltip;
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
		}

		this.positionService.setElement(target, pos);
	}
}
