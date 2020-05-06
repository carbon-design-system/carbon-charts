// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Roles, TooltipTypes, Events, GaugeTypes } from "../../interfaces";

// D3 Imports
import { select } from "d3-selection";
import { arc } from "d3-shape";

const ARC_TYPES_RATIOS = {
	semi: 0.5,
	full: 1
};

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

	getValue(): number {
		const displayData = this.model.getDisplayData();
		return displayData.find(d => d.key === "value").value;
	}

	getValueRatio(): number {
		return this.getValue() / 100;
	}

	getDelta(): number {
		const displayData = this.model.getDisplayData();
		return displayData.find(d => d.key === "delta").value;
	}

	getArcType(): GaugeTypes {
		const options = this.model.getOptions();
		const { type = "semi" } = options.gauge;
		return type;
	}

	getArcRatio(): number {
		const type = this.getArcType();
		const arcRatio = ARC_TYPES_RATIOS[type];
		if (arcRatio === undefined) {
			throw new Error("Gauge chart arc type not compatible");
		}
		return arcRatio;
	}

	getArcSize(): number {
		return this.getArcRatio() * Math.PI * 2;
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
		const value = this.getValue();
		const valueRatio = this.getValueRatio();
		const delta = this.getDelta();
		const arcSize = this.getArcSize();
		const arcType = this.getArcType();
		const startAngle = this.getStartAngle();
		const rotationAngle = valueRatio * arcSize;
		const currentAngle = startAngle + rotationAngle;
		const endAngle = startAngle + arcSize;

		// Compute the outer radius needed
		const radius = this.computeRadius();
		const innerRadius = this.getInnerRadius();

		// Sizing and positions relative to the radius
		const arrowSize = radius / 8;
		const valueFontSize = radius / 2.5;
		const deltaFontSize = radius / 8;
		const distanceBetweenNumbers = 10;
		const numbersYPosition = arcType === "semi" ? -(deltaFontSize + distanceBetweenNumbers) : 0;

		this.backgroundArc = arc()
			.innerRadius(innerRadius)
			.outerRadius(radius)
			.startAngle(currentAngle)
			.endAngle(endAngle);

		this.arc = arc()
			.innerRadius(innerRadius)
			.outerRadius(radius)
			.startAngle(startAngle)
			.endAngle(currentAngle);

		// Set the hover arc radius
		this.hoverArc = arc()
			.innerRadius(innerRadius)
			.outerRadius(radius + options.gauge.hoverArc.outerRadiusOffset)
			.startAngle(startAngle)
			.endAngle(currentAngle);

		// Add background arc

		DOMUtils.appendOrSelect(svg, "path.arc-background")
			.attr("d", this.backgroundArc)
			.attr("fill", options.gauge.arcBackgroundColor)
			.attr("role", Roles.GROUP);

		// Add data arc

		DOMUtils.appendOrSelect(svg, "path.arc-foreground")
			.attr("d", this.arc)
			.classed("arc", true)
			.attr("fill", options.gauge.arcForegroundColor);

		// Position Arc
		const gaugeTranslateX = radius + options.gauge.hoverArc.outerRadiusOffset; // Leaves space for the hover animation
		const gaugeTranslateY = radius + options.gauge.hoverArc.outerRadiusOffset;
		svg.attr("transform", `translate(${gaugeTranslateX}, ${gaugeTranslateY})`);

		// Add the numbers at the center
		const numbersG = DOMUtils.appendOrSelect(svg, "g.gauge-numbers")
			.attr("transform", `translate(0, ${numbersYPosition})`);

		// Add the big number
		const valueNumberG = DOMUtils.appendOrSelect(numbersG, "g.gauge-value-number")
			.attr("transform", `translate(-10, 0)`); // Optical centering for the presence of the smaller % symbol

		const valueNumber = DOMUtils.appendOrSelect(valueNumberG, "text.gauge-value-number")
			.style("font-size", `${valueFontSize}px`)
			.attr("text-anchor", "middle")
			.text(`${options.gauge.numberFormatter(value)}`);

		const { width: valueNumberWidth } = DOMUtils.getSVGElementSize(valueNumber, { useBBox: true });
		DOMUtils.appendOrSelect(valueNumberG, "text.gauge-value-symbol")
			.style("font-size", `${valueFontSize / 2}px`)
			.attr("x", valueNumberWidth / 2)
			.text("%");

			console.log(DOMUtils.getSVGElementSize(valueNumber, { useBBox: true }))
			setTimeout(() => console.log(DOMUtils.getSVGElementSize(valueNumber, { useBBox: true })), 1000)

		// Add the smaller number of the delta
		const deltaNumberG = DOMUtils.appendOrSelect(numbersG, "g.gauge-delta")
			.attr("transform", `translate(0, ${deltaFontSize + distanceBetweenNumbers})`);

		const deltaNumber = DOMUtils.appendOrSelect(deltaNumberG, "text.gauge-delta-number")
			.attr("text-anchor", "middle")
			.style("font-size", `${deltaFontSize}px`)
			.text(`${options.gauge.numberFormatter(delta)}%`);

		const { width: deltaNumberWidth } = DOMUtils.getSVGElementSize(deltaNumber, { useBBox: true });
		const deltaArrow = DOMUtils.appendOrSelect(deltaNumberG, "svg.gauge-delta-arrow")
			.attr("x", -arrowSize - deltaNumberWidth / 2)
			.attr("y", -arrowSize / 2 - deltaFontSize * 0.35)
			.attr("width", arrowSize)
			.attr("height", arrowSize)
			.attr("viewBox", `0 0 16 16`);

		const ARROW_UP = "4,10 8,6 12,10";
		const ARROW_DOWN = "12,6 8,10 4,6";
		DOMUtils.appendOrSelect(deltaArrow, "rect.gauge-delta-arrow-backdrop") // Needed to correctly size SVG in Firefox
			.attr("width", `16`)
			.attr("height", `16`)
			.attr("fill", "none");
		DOMUtils.appendOrSelect(deltaArrow, "polygon.gauge-delta-arrow-polygon")
			.attr("points", delta > 0 ? ARROW_UP : ARROW_DOWN)
			.attr("fill", options.gauge.arrowColor);

		// Add event listeners
		this.addEventListeners();
	}


	getInnerRadius() {
		// Compute the outer radius needed
		const radius = this.computeRadius();
		const options = this.model.getOptions();
		return radius - options.gauge.arcWidth;
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
				self.services.events.dispatchEvent(Events.Tooltip.SHOW, {
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
					.transition(self.services.transitions.getTransition("gauge_slice_mouseover"))
					.attr("d", self.arc);

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEOUT, {
					element: hoveredElement,
					datum
				});

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, { hoveredElement });
			});
	}

	// Helper functions
	protected computeRadius() {
		const arcType = this.getArcType();
		const options = this.model.getOptions();

		const { width, height } = DOMUtils.getSVGElementSize(this.parent, { useAttrs: true });
		const radius = arcType === "semi"
			? Math.min(width / 2, height)
			: Math.min(width / 2, height / 2);

		return radius - options.gauge.hoverArc.outerRadiusOffset;
	}
}
