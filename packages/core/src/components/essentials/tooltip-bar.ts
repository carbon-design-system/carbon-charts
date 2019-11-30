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
		this.tooltip.style("max-width", null);

		// listen to show-tooltip Custom Events to render the tooltip
		this.services.events.addEventListener("show-tooltip", e => {
			// check the type of tooltip and that it is enabled
			if ((e.detail.type === TooltipTypes.DATAPOINT && Tools.getProperty(this.model.getOptions(), "tooltip", "datapoint", "enabled"))
				|| (e.detail.type === TooltipTypes.GRIDLINE && Tools.getProperty(this.model.getOptions(), "tooltip", "gridline", "enabled"))) {

				const hoveredElement = e.detail.hoveredElement.node();

				let defaultTooltip;
				if (e.detail.multidata) {
					// multi tooltip
					defaultTooltip = this.getMultilineTooltipHTML(e.detail.multidata);
				} else {
					defaultTooltip = this.getTooltipHTML(e.detail.hoveredElement.datum());
				}

				// if there is a provided tooltip HTML function call it and pass the defaultTooltip
				if (Tools.getProperty(this.model.getOptions(), "tooltip", "customHTML")) {
					tooltipTextContainer.html(this.model.getOptions().tooltip.customHTML(hoveredElement, defaultTooltip));
				} else {
					// default tooltip
					tooltipTextContainer.html(defaultTooltip);
				}

				const position = this.getTooltipPosition(hoveredElement);
				// Position the tooltip relative to the bars
				this.positionTooltip(e.detail.multidata ? undefined : position);

			} else if (e.detail.type === TooltipTypes.TITLE) {
				// use the chart size to enforce a max width on the tooltip
				const chart = DOMUtils.appendOrSelect(holder, `svg.${settings.prefix}--${chartprefix}--chart-svg`);
				// use the configs to determine how large the tooltip should be
				const tooltipMax = DOMUtils.getSVGElementSize(chart).width * Tools.getProperty(this.model.getOptions(), "tooltip", "title", "width");
				this.tooltip.style("max-width", tooltipMax);

				// use tooltip.ts to get the tooltip html for titles
				tooltipTextContainer.html(super.getTooltipHTML(e.detail.hoveredElement, TooltipTypes.TITLE));

				// get the position based on the title positioning (static)
				const position = super.getTooltipPosition(e.detail.hoveredElement.node());
				this.positionTooltip(position);
			}

			// Fade in
			this.tooltip.classed("hidden", false);
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

			return { placement: TooltipPosition.BOTTOM, position: tooltipPos };
		} else {
			// positive bars
			const tooltipPos = {
				left: (barPosition.left - holderPosition.left) + barPosition.width / 2,
				top: (barPosition.top - holderPosition.top) - verticalOffset
			};

			return { placement: TooltipPosition.TOP, position: tooltipPos };
		}
	}

	/**
	 * Returns the html for the bar single point tooltip
	 * @param data associated values for the hovered bar
	 */
	getTooltipHTML(data: any) {
		const valueFormatter = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter");
		const formattedValue = valueFormatter ? valueFormatter(data.value) : data.value.toLocaleString("en");

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
		const valueFormatter = Tools.getProperty(this.model.getOptions(), "tooltip", "valueFormatter");
		total = valueFormatter ? valueFormatter(total) : total.toLocaleString("en");

		return "<ul class='multi-tooltip'>" +
			points.map(datapoint => {
				const formattedValue = valueFormatter ? valueFormatter(datapoint.value) : datapoint.value.toLocaleString("en");
				const indicatorColor = this.model.getStrokeColor(datapoint.datasetLabel, datapoint.label, datapoint.value);

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
}
