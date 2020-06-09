// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";
import { Roles, TooltipTypes, Events, GaugeTypes, Statuses, ArrowDirections } from "../../interfaces";
import { Tools } from "../../tools";

// D3 Imports
import { select } from "d3-selection";
import { arc } from "d3-shape";

// arrow paths for delta
const ARROW_UP = "4,10 8,6 12,10";
const ARROW_DOWN = "12,6 8,10 4,6";

export class Gauge extends Component {
	type = "gauge";

	// We need to store our arcs
	// So that addEventListeners()
	// Can access them
	arc: any;
	backgroundArc: any;

	init() {
		const eventsFragment = this.services.events;
	}

	getValue(): number {
		const data = this.model.getData();
		return data.find((d) => d.group === "value").value;
	}

	getValueRatio(): number {
		const value = Tools.clamp(this.getValue(), 0, 100);
		return value / 100;
	}

	getDelta(): number {
		const data = this.model.getData();
		const delta = data.find((d) => d.group === "delta");
		return delta ? delta.value : null;
	}

	getArcRatio(): number {
		const options = this.model.getOptions();
		const type = Tools.getProperty(options, "gauge", "type");
		const arcRatio = type === GaugeTypes.FULL ? 1 : 0.5;
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

	// use provided arrow direction or default to using the delta
	getArrow(delta): string {
		const options = this.model.getOptions();
		const arrowDirection = Tools.getProperty(options, "gauge", "arrowDirection");

		switch (arrowDirection) {
			case ArrowDirections.UP:
				return ARROW_UP;
			case ArrowDirections.DOWN:
				return ARROW_DOWN;
			default:
				return delta > 0 ? ARROW_UP : ARROW_DOWN;
		}
	}


	render(animate = true) {
		const self = this;
		const svg = this.getContainerSVG();
		const options = this.model.getOptions();
		const value = this.getValue();
		const valueRatio = this.getValueRatio();
		const delta = this.getDelta();
		const arcSize = this.getArcSize();
		const arcType = Tools.getProperty(options, "gauge", "arcType");
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
		const numbersYPosition =
			arcType === GaugeTypes.SEMI
				? -(deltaFontSize + distanceBetweenNumbers)
				: 0;

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

		// draw the container
		DOMUtils.appendOrSelect(svg, "path.arc-background")
			.attr("d", this.backgroundArc)
			.attr("role", Roles.GROUP);


		// Add data arc
		const arcValue = svg.selectAll("path.arc-foreground")
			.data([value]);

		arcValue
			.enter()
			.append("path")
			.attr("class", "arc-foreground")
			.merge(arcValue)
			.attr("d", this.arc)
			.attr("fill", Tools.getProperty(options, "gauge", "fillColor"))
			// a11y
			.attr("role", Roles.GRAPHICS_SYMBOL)
			.attr("aria-roledescription", "value")
			.attr("aria-label", d => d.value);

		// Position Arc
		svg.attr(
			"transform",
			`translate(${radius}, ${radius})`
		);

		// Add the numbers at the center
		const numbersG = DOMUtils.appendOrSelect(svg, "g.gauge-numbers").attr(
			"transform",
			`translate(0, ${numbersYPosition})`
		);

		// Add the big number
		const valueNumberG = DOMUtils.appendOrSelect(
			numbersG,
			"g.gauge-value-number"
		).attr("transform", `translate(-10, 0)`); // Optical centering for the presence of the smaller % symbol

		const numberFormatter = Tools.getProperty(options, "gauge", "numberFormatter");
		const valueNumber = valueNumberG.selectAll("text.gauge-value-number")
			.data([value]);

		valueNumber
			.enter()
			.append("text")
			.attr("class", "gauge-value-number")
			.merge(valueNumber)
			.style("font-size", `${valueFontSize}px`)
			.attr("text-anchor", "middle")
			.text(d => `${numberFormatter(d)}`);

		const {
			width: valueNumberWidth
		} = DOMUtils.getSVGElementSize(DOMUtils.appendOrSelect(svg, "text.gauge-value-number"), { useBBox: true });

		DOMUtils.appendOrSelect(valueNumberG, "text.gauge-value-symbol")
			.style("font-size", `${valueFontSize / 2}px`)
			.attr("x", valueNumberWidth / 2)
			.text("%");

		// Add the smaller number of the delta
		const deltaGroup = DOMUtils.appendOrSelect(
			numbersG,
			"g.gauge-delta"
		).attr(
			"transform",
			`translate(0, ${deltaFontSize + distanceBetweenNumbers})`
		);

		const deltaNumber = deltaGroup.selectAll("text.gauge-delta-number")
			.data(delta != null ? [delta] : []);

		deltaNumber
			.enter()
			.append("text")
			.merge(deltaNumber)
			.attr("class", "gauge-delta-number")
			.attr("text-anchor", "middle")
			.style("font-size", `${deltaFontSize}px`)
			.text(d => `${numberFormatter(d)}%`);

		// Add the caret for the delta number
		const {
			width: deltaNumberWidth
		} = DOMUtils.getSVGElementSize(DOMUtils.appendOrSelect(svg, "g.gauge-delta"), { useBBox: true });

		const deltaArrow = deltaGroup.selectAll("svg.gauge-delta-arrow")
			.data(delta != null ? [delta] : []);

		deltaArrow
			.enter()
			.append("svg")
			.merge(deltaArrow)
			.attr("class", "gauge-delta-arrow")
			.attr("x", -arrowSize - deltaNumberWidth / 2)
			.attr("y", -arrowSize / 2 - deltaFontSize * 0.35)
			.attr("width", arrowSize)
			.attr("height", arrowSize)
			.attr("viewBox", `0 0 16 16`);

		// Needed to correctly size SVG in Firefox
		DOMUtils.appendOrSelect(deltaArrow, "rect.gauge-delta-arrow-backdrop")
			.attr("width", `16`)
			.attr("height", `16`)
			.attr("fill", "none");

		// Draw the arrow with status
		const status = Tools.getProperty(options, "gauge", "status");
		DOMUtils.appendOrSelect(deltaArrow, "polygon.gauge-delta-arrow-polygon")
			.classed(`status--${status}`, status != null)
			.attr("fill", () => status == null ? "currentColor" : null)
			.attr("points", self.getArrow(delta));

		deltaArrow.exit().remove();
		deltaNumber.exit().remove();
		arcValue.exit().remove();

		// Add event listeners
		this.addEventListeners();
	}

	getInnerRadius() {
		// Compute the outer radius needed
		const radius = this.computeRadius();
		const arcWidth = Tools.getProperty(this.model.getOptions(), "gauge", "arcWidth");
		return radius - arcWidth;
	}

	addEventListeners() {
		const self = this;
		this.parent
			.selectAll("path.arc")
			.on("mouseover", function(datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEOVER, {
					element: select(this),
					datum
				});
			})
			.on("mousemove", function(datum) {
				const hoveredElement = select(this);

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
			.on("click", function(datum) {
				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_CLICK, {
					element: select(this),
					datum
				});
			})
			.on("mouseout", function(datum) {
				const hoveredElement = select(this);

				// Dispatch mouse event
				self.services.events.dispatchEvent(Events.Gauge.ARC_MOUSEOUT, {
					element: hoveredElement,
					datum
				});

				// Hide tooltip
				self.services.events.dispatchEvent(Events.Tooltip.HIDE, {
					hoveredElement
				});
			});
	}

	// Helper functions
	protected computeRadius() {
		const options = this.model.getOptions();
		const arcType = Tools.getProperty(options, "gauge", "arcType");

		const { width, height } = DOMUtils.getSVGElementSize(this.parent, {
			useAttrs: true
		});
		const radius =
			arcType === GaugeTypes.SEMI
				? Math.min(width / 2, height)
				: Math.min(width / 2, height / 2);

		return radius;
	}
}
