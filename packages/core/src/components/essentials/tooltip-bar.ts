import * as Configuration from "../../configuration";
import { Tooltip } from "./tooltip";
import { Tools } from "../../tools";
import { DOMUtils } from "../../services";
import { TooltipPosition, TooltipTypes } from "./../../interfaces/enums";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// import the settings for the css prefix
import settings from "carbon-components/src/globals/js/settings";

// D3 Imports
import { mouse, select } from "d3-selection";

export class TooltipBar extends Tooltip {
	init() {
		// Grab the tooltip element
		const holder = select(this.services.domUtils.getHolder());
		const chartprefix = Tools.getProperty(this.model.getOptions(), "style", "prefix");
		this.tooltip = DOMUtils.appendOrSelect(holder, `div.${settings.prefix}--${chartprefix}--tooltip`);

		// Apply html content to the tooltip
		const tooltipTextContainer = DOMUtils.appendOrSelect(this.tooltip, "div.content-box");

		// listen to show-tooltip Custom Events to render the tooltip
		this.services.events.addEventListener("show-tooltip", e => {
			// check the type of tooltip and that it is enabled
			if ((e.detail.type === TooltipTypes.DATAPOINT && Tools.getProperty(this.model.getOptions(), "tooltip", "datapoint", "enabled"))
				|| (e.detail.type === TooltipTypes.GRIDLINE && Tools.getProperty(this.model.getOptions(), "tooltip", "gridline", "enabled")) ) {

				const hoveredElement = e.detail.hoveredElement.node();

				let defaultHTML;
				if (e.detail.multidata) {
					// multi tooltip
					defaultHTML = this.getMultilineTooltipHTML(e.detail.multidata);
				} else {
					defaultHTML = this.getTooltipHTML(e.detail.hoveredElement.datum());
				}

				// if there is a provided tooltip HTML function call it and pass the defaultHTML
				if (Tools.getProperty(this.model.getOptions(), "tooltip", "customHTML")) {
					tooltipTextContainer.html(this.model.getOptions().tooltip.customHTML(hoveredElement, defaultHTML));
				} else {
					// default tooltip
					tooltipTextContainer.html(defaultHTML);
				}

				const position = this.getTooltipPosition(hoveredElement);
				// Position the tooltip relative to the bars
				this.positionTooltip(e.detail.multidata ? undefined : position );
				// Fade in
				this.tooltip.classed("hidden", false);
			}
		});

		// listen to hide-tooltip Custom Events to hide the tooltip
		this.services.events.addEventListener("hide-tooltip", () => {
			this.tooltip.classed("hidden", true);
		});
	}

	/**
	 * Get the position of the tooltip relative to the active hovered bar. Tooltip should appear above
	 * positive valued data and below negative value data.
	 * @param hoveredElement
	 */
	getTooltipPosition(hoveredElement) {
		const data = select(hoveredElement).datum() as any;

		const holderPosition = select(this.services.domUtils.getHolder()).node().getBoundingClientRect();
		const barPosition = hoveredElement.getBoundingClientRect();

		const { verticalOffset } = this.model.getOptions().tooltip.datapoint;
		// if there is a negative value bar chart, need to place the tooltip below the bar
		if (data.value <= 0) {
			// negative bars
			const tooltipPos = {
				left: (barPosition.left - holderPosition.left) + barPosition.width / 2,
				top: (barPosition.bottom - holderPosition.top) + verticalOffset
			};

			return {placement: TooltipPosition.BOTTOM, position: tooltipPos};
		} else {
			// positive bars
			const tooltipPos = {
				left: (barPosition.left - holderPosition.left) + barPosition.width / 2,
				top: (barPosition.top - holderPosition.top) - verticalOffset
			};

			return {placement: TooltipPosition.TOP, position: tooltipPos};
		}
	}

	/**
	 * Returns the html for the bar single point tooltip
	 * @param data associated values for the hovered bar
	 */
	getTooltipHTML(data: any) {
		const formattedValue = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
		this.model.getOptions().tooltip.valueFormatter(data.value) : data.value.toLocaleString("en");

		return `<div class="datapoint-tooltip"><p class="value">${formattedValue}</p></div>`;
	}

	/**
	 * Multip tooltips for bar charts include totals for each stack
	 * @param data
	 */
	getMultilineTooltipHTML(data: any) {
		const points = data;

		points.reverse();

		// get the total for the stacked tooltip
		let total = points.reduce((sum, item) => sum + item.value, 0);

		// format the total value
		total = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
		this.model.getOptions().tooltip.valueFormatter(total) : total.toLocaleString("en");

		return  "<ul class='multi-tooltip'>" +
			points.map(datapoint => {
				const formattedValue = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
				this.model.getOptions().tooltip.valueFormatter(datapoint.value) : datapoint.value.toLocaleString("en");

				const indicatorColor = this.model.getStrokeColor(datapoint.datasetLabel, datapoint.label, datapoint.value, datapoint);

				return `
				<li>
					<div class="datapoint-tooltip">
						<a style="background-color:${indicatorColor}" class="tooltip-color"></a>
						<p class="label">${datapoint.datasetLabel}</p>
						<p class="value">${formattedValue}</p>
					</div>
				</li>`;
			}).join("") +
				`<li>
					<div class='total-val'>
						<p class='label'>Total</p>
						<p class='value'>${total}</p>
					</div>
				</li>
			</ul>`;
	}

	positionTooltip(positionOverride?: any) {
		const holder = this.services.domUtils.getHolder();
		const target = this.tooltip.node();
		const mouseRelativePos = mouse(holder);
		let pos;

		// override position to place tooltip at {placement:.., position:{top:.. , left:..}}
		if (positionOverride) {
			// placement determines whether the tooltip is centered above or below the position provided
			const placement = positionOverride.placement === TooltipPosition.TOP ? PLACEMENTS.TOP : PLACEMENTS.BOTTOM;

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

			let { horizontalOffset } = this.model.getOptions().tooltip.datapoint;
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
