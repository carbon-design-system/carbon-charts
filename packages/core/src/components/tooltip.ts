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

	positionMouseTooltip() {
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
	 * Finds the best placement for the tooltip with respect to the datapoint and places element at that position.
	 * @param elRef The HTML element reference
	 * @param position Ideal position for the datapoint
	 */
	positionGridTooltip(elRef, position) {
		// find the best placement in respect to the data point position and the container for the tooltip (this.container)
		const bestPlacementOption = this.positionService.findBestPlacementAt(
			{
				left: position.left,
				top: position.top
			},
			elRef,
			[
				PLACEMENTS.RIGHT,
				PLACEMENTS.LEFT
			],
			() => ({
				width: this.container.offsetWidth,
				height: this.container.offsetHeight
			})
		);

		const pos = this.positionService.findPositionAt(
			{
				left: position.left,
				top: position.top
			},
			elRef,
			bestPlacementOption
		);

		// adjust padding to be on the left or right of the tooltip
		if (bestPlacementOption === PLACEMENTS.LEFT) {
			pos.left -= +Configuration.tooltip.axisTooltip.horizontalOffset;
		} else {
			pos.left += Configuration.tooltip.axisTooltip.horizontalOffset;
		}

		// add to data position
		this.positionService.setElement(elRef, pos);
	}

	/**
	 * Formatter to make sure grid tooltips do not overlap for points that are close or the same Y value.
	 * Sorts the tooltips by the Y value (ascending) and translates tooltips down sequentially.
	 */
	distributeGridTooltips() {
		const tooltips = Array.from(this.container.querySelectorAll(".gridline-tooltip"));
		// sort them by the y value, points that are lower should be translated down (list view)
		tooltips.sort(function (a, b) {
			return a.getBoundingClientRect().top <= b.getBoundingClientRect().top ? -1 : 1;
		});

		for (let i = 0; i < tooltips.length; i++) {
			if (tooltips[i + 1]) {
				// get the tooltip location (bound) and use next sibling's top location to check for overlap
				const tooltipBound = parseFloat(getComputedStyle(tooltips[i]).top) + +tooltips[i].getBoundingClientRect().height;
				// use the original location to check, and then translate the sibling tooltip lower
				const siblingPos = {
					top: parseFloat(getComputedStyle(tooltips[i + 1]).top),
					left: parseFloat(getComputedStyle(tooltips[i + 1]).left)
				};
				// if a tooltip's next sibling is overlapping, translate it down
				if (siblingPos.top < (tooltipBound + Configuration.tooltip.axisTooltip.stackedPadding)) {
					siblingPos.top = tooltipBound + Configuration.tooltip.axisTooltip.stackedPadding;
					this.positionService.setElement(tooltips[i + 1], siblingPos);
				}
			}
		}
	}

	/**
	 * Shows a tooltip for the Chart. Tooltip can be a single datapoint or gridline tooltip with multiple datapoints.
	 * @param contentHTML HTML content for single datapoint tooltip
	 * @param gridlineTooltips Array containing HTML and position data for gridline tooltips
	 */
	show(contentHTML, gridlineTooltips?: any) {
		// Remove existing tooltips on the page
		// TODO - Update class to not conflict with other elements on page
		selectAll(".chart-tooltip").remove();


		// check if supplied ONE tooltip (takes precedence over gridline tooltips)
		if (contentHTML) {
			// Draw tooltip
			const tooltip = select(this.container).append("div")
				.attr("class", "tooltip chart-tooltip");

			// Apply html content to the tooltip
			tooltip.append("div")
				.attr("class", "text-box")
				.html(contentHTML);

			// Position the tooltip
			this.positionMouseTooltip();

			// Fade in
			tooltip
			.style("opacity", 0)
				.transition()
				.duration(Configuration.tooltip.dataLabel.fadeIn.duration)
				.style("opacity", 1);

		} else {

			if (!gridlineTooltips) {
				return;
			}

			// until the refactor comes out we need to account for when charts have a title any other reason
			// the innerWrap is translated
			const innerWrap = this.container.querySelector("g.inner-wrap") as HTMLElement;
			const translateWrap = Tools.getTranslationValues(innerWrap);

			// iterate through all the tooltips and add them
			gridlineTooltips.forEach(datapoint => {

				// draw tooltips
				const tooltip = select(this.container).append("div")
					.attr("class", "tooltip chart-tooltip gridline-tooltip")
					.html(datapoint.html);

				const elRef = tooltip.node() as HTMLElement;

				// aim to position each tip vertically centered at the best position (left or right) of the datapoint
				// take any translations on the innerwrap (use as offset to the datapoint position) until refactor
				const position = {
					top: +datapoint.dataPosition.y + (+translateWrap.ty),
					left: +datapoint.dataPosition.x + (+translateWrap.tx)
				};

				// uses position service to find appripriate position (Left or Right)
				this.positionGridTooltip(elRef, position);

			});
			// repositions all the tooltips (if needed) so that they don't overlap
			this.distributeGridTooltips();
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
			.duration(
				tooltipRef.size() > 1 ?
				Configuration.tooltip.dataLabel.fadeOut.duration :
				Configuration.tooltip.axisTooltip.fadeOut.duration)
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
