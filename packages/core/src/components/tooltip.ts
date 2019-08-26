import * as Configuration from "../configuration";

// Carbon position service
import Position, { PLACEMENTS } from "@carbon/utils-position";

// D3 Imports
import { select, selectAll, mouse } from "d3-selection";

export class ChartTooltip {
	container: HTMLElement;
	positionService: Position = new Position();

	constructor(container: Element) {
		this.container = container as HTMLElement;
	}

	getRef = () => select(this.container).select("div.chart-tooltip").node() as HTMLElement;

	/**
	 * Positions the tooltip using mouse relative spacing unless an override is present,
	 * in which case it will use the override placement and position for the tooltip.
	 * @param positionOverride object containing the placement (top/bottom) and a target position object that
	 * uses top, left for absolute positioning
	 */
	positionTooltip(positionOverride?: any) {
		const target = this.getRef();

		// override position to place tooltip at {placement:.., position:{top:.. , left:..}}
		if (positionOverride) {
			// placement determines whether the tooltip is centered above or below the position provided
			const placement = positionOverride.placement === Configuration.TooltipPosition.TOP ? PLACEMENTS.TOP : PLACEMENTS.BOTTOM;

			// Get coordinates to where tooltip should be positioned
			const position = this.positionService.findPositionAt(
				positionOverride.position,
				target,
				placement
			);

			this.positionService.setElement(target, position);
			return;
		}

		// otherwise/default place the tooltip using the mouse
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

		let { magicLeft2: horizontalOffset } = Configuration.tooltip.dataLabel;
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

	/**
	 * Shows a tooltip for the Chart. Tooltip can be a single datapoint or multi datapoint tooltip.
	 * @param contentHTML an array of HTML content for all points to display
	 */
	show(contentHTML, positionOverride?) {
		// Remove existing tooltips on the page
		// TODO - Update class to not conflict with other elements on page
		const existingTooltips = selectAll(".chart-tooltip");
		const fadeIn = existingTooltips.size() > 0 ? false : true;
		existingTooltips.remove();

		// Draw tooltip
		const tooltip  = select(this.container)
			.append("div")
			.attr("class", "tooltip chart-tooltip");

		// Apply html content to the tooltip
		tooltip.append("div")
			.attr("class", "content-box")
			.html(contentHTML);

		this.positionTooltip(positionOverride);

		// only want to fade in if a tooltip doesn't already exist
		// if we always fade in, we get some blinking if the tooltip is placed using mouse relative
		if (fadeIn) {
		// Fade in
			tooltip
			.style("opacity", 0)
				.transition()
				.duration(Configuration.tooltip.fadeIn.duration)
				.style("opacity", 1);
		}

		// this.addEventListeners();
	}

	hide() {
		// hide all tooltips (might be multiple for gridline tooltips)
		const tooltipRef = select(this.container).selectAll("div.chart-tooltip");

		// Fade out and remove
		tooltipRef
			.style("opacity", 1)
			.transition()
			.duration(Configuration.tooltip.fadeOut.duration)
			.style("opacity", 0)
			.remove();

		// this.removeEventListeners();
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

	removeEventListeners() {
		// Remove eventlistener to close tooltip when ESC is pressed
		window.removeEventListener("keydown", this.handleTooltipEvents);

		// Remove eventlistener to close tooltip when clicked outside
		this.container.removeEventListener("click", this.handleTooltipEvents);
	}
}
