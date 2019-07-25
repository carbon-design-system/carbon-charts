import * as Configuration from "../configuration";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// D3 Imports
import { select, selectAll, mouse } from "d3-selection";
import { Tools } from "../tools";

export class ChartTooltip {
	container: HTMLElement;
	positionService: Position = new Position();

	constructor(container: Element) {
		this.container = container as HTMLElement;
	}

	getRef = () => select(this.container).select("div.chart-tooltip").node() as HTMLElement;

	positionTooltip() {
		const target = this.getRef();
		const mouseRelativePos = mouse(this.container);

		// Find out whether tooltip should be shown on the left or right side
		const bestPlacementOption = this.positionService.findBestPlacementAt(
			{
				left: mouseRelativePos[0],
				top: mouseRelativePos[1]
			},
			target,
			[
				PLACEMENTS.RIGHT,
				PLACEMENTS.LEFT
			],
			() => ({
				width: this.container.offsetWidth,
				height: this.container.offsetHeight
			})
		);

		let { magicLeft2: horizontalOffset } = Configuration.tooltip;
		if (bestPlacementOption === PLACEMENTS.LEFT) {
			horizontalOffset *= -1;
		}

		// Get coordinates to where tooltip should be positioned
		const pos = this.positionService.findPositionAt(
			{
				left: mouseRelativePos[0] + horizontalOffset,
				top: mouseRelativePos[1]
			},
			target,
			bestPlacementOption
		);

		this.positionService.setElement(target, pos);
	}

	// Tooltips should aim to be beside the corresponding datapoints, however they should not overlap
	positionGridTooltips() {
		console.log('here');
		const tooltips = selectAll(".gridline-tooltip");
		console.log(tooltips);
		// .each(function(d) {
		// 	console.log(d);

		// });
		// translate them up half the object size


		// translate them RIGHT the distance in config
	}

	show(contentHTML, gridlineTooltips?: any) {
		// Remove existing tooltips on the page
		// TODO - Update class to not conflict with other elements on page
		selectAll(".chart-tooltip").remove();


		// check if supplied a list of tooltips or just one
		if (gridlineTooltips) {

			// until the refactor comes out we need to account for when charts have a title or not
			const translateWrap = Tools.getTranslationValues(this.container);

			// iterate through all the tooltips and add them
			gridlineTooltips.forEach(datapoint => {

				// draw tooltips
				const tooltip = select(this.container).append("div")
				.attr("class", "tooltip chart-tooltip gridline-tooltip")
				.html(datapoint.html)
				.style("opacity", 0);

				tooltip
				.transition()
				.duration(Configuration.tooltip.fadeIn.duration)
				.style("opacity", 1);

				const elRef = tooltip.node() as HTMLElement;
				const elBound = elRef.getBoundingClientRect();
				const position = {
					top: datapoint.dataPosition.y  - (elBound.height/2),
					left: +datapoint.dataPosition.x + Configuration.tooltip.axisTooltip.paddingLeft + (elBound.width/2)  };


				// add to data position
				this.positionService.setElement(elRef, position);

			});
			// This repositions the tooltips so that they don't overlap
			//this.positionGridTooltips();

		} else {
		// Draw tooltip
		const tooltip = select(this.container).append("div")
			.attr("class", "tooltip chart-tooltip");

		// Apply html content to the tooltip
		tooltip.append("div")
			.attr("class", "text-box")
			.html(contentHTML);

		// Position the tooltip
		this.positionTooltip();

		// Fade in
		tooltip.style("opacity", 0)
			.transition()
			.duration(Configuration.tooltip.fadeIn.duration)
			.style("opacity", 1);
		}

		// this.addEventListeners();
	}

	hide() {
		const tooltipRef = select(this.container).selectAll("div.chart-tooltip");

		// Fade out and remove
		tooltipRef.style("opacity", 1)
			.transition()
			.duration(Configuration.tooltip.fadeOut.duration)
			.style("opacity", 0)
			.remove();

		this.removeEventLinteners();
	}

	handleTooltipEvents(evt: Event) {
		// If keyboard event
		if (evt["key"]) {
			if (evt["key"] === "Escape" || evt["key"] === "Esc") {
				this.hide();
			}
		} else {
			const targetTagName = evt.target["tagName"];
			const targetsToBeSkipped = Configuration.options.BASE.tooltip.targetsToSkip;
			if (targetsToBeSkipped.indexOf(targetTagName) === -1) {
				// If mouse event
				this.hide();
			}
		}
	}

	addEventListeners() {
		const tooltipRef = select(this.container).select("div.chart-tooltip");

		// Apply the event listeners to close the tooltip
		// setTimeout is there to avoid catching the click event that opened the tooltip
		setTimeout(() => {
			// When ESC is pressed
			window.addEventListener("keydown", this.handleTooltipEvents);

			// If clicked outside
			this.container.addEventListener("click", this.handleTooltipEvents);

			// Stop clicking inside tooltip from bubbling up to window
			tooltipRef.on("click", () => {
				event.stopPropagation();
			});
		}, 0);
	}

	removeEventLinteners() {
		// Remove eventlistener to close tooltip when ESC is pressed
		window.removeEventListener("keydown", this.handleTooltipEvents);

		// Remove eventlistener to close tooltip when clicked outside
		this.container.removeEventListener("click", this.handleTooltipEvents);
	}
}
