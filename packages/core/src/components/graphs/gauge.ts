// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { clamp, groupBy } from "lodash-es";
import {
	Roles,
	TooltipTypes,
	Events
} from "../../interfaces";

// D3 Imports
import { select } from "d3-selection";
import { arc } from "d3-shape";
import { interpolateNumber } from "d3-interpolate";

export class Gauge extends Component {
	type = "gauge";

	// We need to store our arcs
	// So that addEventListeners()
	// Can access them
	arc: any;
	hoverArc: any;
	backgroundArc: any;

	init() {
		const eventsFragment = this.services.events;

		// Highlight correct circle on legend item hovers
		eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);

		// Un-highlight circles on legend item mouseouts
		eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
	}

	getDataList() {
		const displayData = this.model.getDisplayData();
		const current = displayData.find(d => d.key === "current");
		const old = displayData.find(d => d.key === "old");
		const total = displayData.find(d => d.key === "total");
		return [
			{
				label: "Dataset",
				current: current ? current.value : 0,
				total: total ? total.value : 0,
				old: old ? old.value : 0,
				value: current ? current.value : 0
			}
		];
	}

	getCurrentRatio(): number {
		const total = this.getTotal();
		const current = this.getCurrent();
		const ratio = total === 0 ? 0 : current / total;
		return clamp(ratio, 0, 1);
	}

	getDelta(): number {
		const current = this.getCurrent();
		const old = this.getOld();
		const delta = current - old;
		const ratio = old === 0 ? Infinity : delta / old;
		return clamp(ratio, -1, Infinity);
	}

	getTotal(): number {
		const datalist = this.getDataList();
		console.log('datalist', datalist)
		const value = datalist[0].total || 0;
		return value;
	}

	getCurrent(): number {
		const datalist = this.getDataList();
		const value = datalist[0].current || 0;
		return value;
	}

	getOld(): number {
		const datalist = this.getDataList();
		const value = datalist[0].old || 0;
		return value;
	}

	getArcSize(): number {
		const options = this.model.getOptions();
		const { arcRatio = 1 } = options.gauge;
		const clampedArcRatio = clamp(arcRatio, 0, 1);
		return clampedArcRatio * Math.PI * 2;
	}

	getStartAngle(): number {
		const arcSize = this.getArcSize();
		if (arcSize === 2 * Math.PI) {
			return 0;
		}
		return -arcSize / 2;
	}

	render(animate = true) {
		const self = this;
		const svg = this.getContainerSVG();
		const options = this.model.getOptions();
		const ratio = this.getCurrentRatio();
		const datalist = this.getDataList();
		const delta = this.getDelta();
		const arcSize = this.getArcSize();
		const startAngle = this.getStartAngle();
		const rotationAngle = ratio * arcSize;
		const currentAngle = startAngle + rotationAngle;
		const endAngle = startAngle + arcSize;

		// Compute the outer radius needed
		const radius = this.computeRadius();

		this.backgroundArc = arc()
			.innerRadius(this.getInnerRadius())
			.outerRadius(radius)
			.startAngle(currentAngle)
			.endAngle(endAngle);

		this.arc = arc()
			.innerRadius(this.getInnerRadius())
			.outerRadius(radius)
			.startAngle(startAngle)
			.endAngle(currentAngle);

		// Set the hover arc radius
		this.hoverArc = arc()
			.innerRadius(this.getInnerRadius())
			.outerRadius(radius + options.pie.hoverArc.outerRadiusOffset)
			.startAngle(startAngle)
			.endAngle(currentAngle);

		// Add background arc

		DOMUtils.appendOrSelect(svg, "g.background")
			.append("path")
			.attr("d", this.backgroundArc)
			.attr("fill", "#bbb")
			.attr("role", Roles.GROUP);

		// Add data arc

		DOMUtils.appendOrSelect(svg, "g.arc")
			.append("path")
			.data(datalist)
			.attr("d", this.arc)
			.classed("arc", true)
			.attr("fill", "#00f");

		// Position Pie
		const gaugeTranslateX = radius + options.pie.xOffset;
		const gaugeTranslateY = radius + options.pie.yOffset;
		svg.attr("transform", `translate(${gaugeTranslateX}, ${gaugeTranslateY})`);

		// Add the number shown in the center of the gauge and the delta
		// under it.

		DOMUtils.appendOrSelect(svg, "text.gauge-value")
			.attr("text-anchor", "middle")
			.attr("alignment-baseline", "middle")
			.style("font-size", () => options.gauge.center.valueFontSize(radius, arcSize))
			.transition(this.services.transitions.getTransition("donut-figure-enter-update", animate))
			.attr("y", options.gauge.center.valueYPosition(radius, arcSize))
			.tween("text", function() {
				return self.centerNumberTween(select(this), ratio * 100);
			});

		DOMUtils.appendOrSelect(svg, "text.gauge-delta")
			.attr("text-anchor", "middle")
			.attr("alignment-baseline", "middle")
			.style("font-size", () => options.gauge.center.deltaFontSize(radius, arcSize))
			.attr("y", options.gauge.center.deltaYPosition(radius, arcSize))
			.text(() => {
				const sign = Math.sign(delta)
				const deltaPerc = (delta * 100).toFixed(2);
				const arrow = sign === 0 ? "=" : sign === -1 ? "▼" : "▲";
				return `${arrow}  ${deltaPerc}%`;
			});

		// Add event listeners
		this.addEventListeners();
	}


	getInnerRadius() {
		// Compute the outer radius needed
		const radius = this.computeRadius();
		return radius * (3 / 4);
	}

	centerNumberTween(d3Ref, value: number) {
		const options = this.model.getOptions();
		// Remove commas from the current value string, and convert to an int
		const currentValue = parseInt(d3Ref.text().replace(/[, ]+/g, ""), 10) || 0;
		const i = interpolateNumber(currentValue, value);

		return t => {
			const { numberFormatter } = options.gauge.center;
			const number = i(t);
			const formattedNumber = numberFormatter(number);
			return d3Ref.text(formattedNumber);
		};
	}

	// Highlight elements that match the hovered legend item
	handleLegendOnHover = (event: CustomEvent) => {
		const { hoveredElement } = event.detail;

		this.parent.selectAll("path.arc")
			.transition(this.services.transitions.getTransition("legend-hover-bar"))
			.attr("opacity", d => (d.data.label !== hoveredElement.datum()["key"]) ? 0.3 : 1);
	}

	// Un-highlight all elements
	handleLegendMouseOut = (event: CustomEvent) => {
		this.parent.selectAll("path.arc")
			.transition(this.services.transitions.getTransition("legend-mouseout-bar"))
			.attr("opacity", 1);
	}

	addEventListeners() {
		const self = this;
		this.parent.selectAll("path.arc")
			.on("mouseover", function (datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEOVER, {
					element: select(this),
					datum
				});
			})
			.on("mousemove", function (datum) {
				const hoveredElement = select(this);

				hoveredElement.classed("hovered", true)
					.transition(self.services.transitions.getTransition("pie_slice_mouseover"))
					.attr("d", self.hoverArc);

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEMOVE, {
					element: hoveredElement,
					datum
				});

				// Show tooltip
				self.services.events.dispatchEvent("show-tooltip", {
					hoveredElement,
					type: TooltipTypes.DATAPOINT
				});
			})
			.on("click", function (datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_CLICK, {
					element: select(this),
					datum
				});
			})
			.on("mouseout", function (datum) {
				const hoveredElement = select(this);
				hoveredElement.classed("hovered", false)
					.transition(self.services.transitions.getTransition("pie_slice_mouseover"))
					.attr("d", self.arc);

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEOUT, {
					element: hoveredElement,
					datum
				});

				// Hide tooltip
				self.services.events.dispatchEvent("hide-tooltip", { hoveredElement });
			});
	}

	// Helper functions
	protected computeRadius() {
		const arcSize = this.getArcSize();
		const options = this.model.getOptions();
		const multiplier = Math.min(Math.PI / arcSize, 1);

		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });
		const radius: number = Math.min(width, height) * multiplier;

		return radius + options.pie.radiusOffset;
	}
}
