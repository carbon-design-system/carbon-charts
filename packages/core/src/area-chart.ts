// D3 Imports
import { select, mouse } from "d3-selection";
import { area } from "d3-shape";

import * as Configuration from "./configuration";

import { getD3Curve } from "./services/curves";
import { ScatterChart } from "./scatter-chart";

export class AreaChart extends ScatterChart {
	x: any;
	y: any;

	colorScale: any;

	areaGenerator: any;

	constructor(holder: Element, configs: any) {
		super(holder, configs);

		this.options.type = "area";
	}

	draw() {
		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		const { line: margins } = Configuration.charts.margin;

		this.innerWrap.attr("transform", `translate(${margins.left}, ${margins.top})`);

		// D3 area generator function
		this.areaGenerator = area()
			.x((d, i) => this.x(this.displayData.labels[i]) + this.x.step() / 2)
			.y1((d: any) => this.y(d))
			.y0(d => this.y(0))
			.curve(getD3Curve("curveLinear"));

		const gArea = this.innerWrap.selectAll("g.areas")
			.data(this.displayData.datasets)
			.enter()
				.append("g")
				.classed("areas", true);

		gArea.append("path")
			.attr("fill", d => this.colorScale[d.label]())
			.datum(d => d.data)
			.attr("opacity", 0.8)
			.attr("class", "area")
			.attr("d", this.areaGenerator);

		const circleRadius = super.getCircleRadius();
		gArea.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i))
			.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", d => this.x(d.label) + this.x.step() / 2)
				.attr("cy", d => this.y(d.value))
				.attr("r", circleRadius)
				.attr("fill", d => this.getCircleFill(circleRadius, d))
				.attr("stroke", d => this.getStrokeColor(d.datasetLabel, d.label, d.value));

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the load event
		this.dispatchEvent("load");
	}

	interpolateValues(newData: any) {
		this.innerWrap.selectAll(".removed")
			.remove();

		// Apply new data to the area
		const gArea = this.innerWrap.selectAll("g.areas")
			.data(newData.datasets);

		this.updateElements(true, gArea);

		// Add areas that need to be added now
		const addedAreaGroups = gArea.enter()
			.append("g")
			.classed("areas", true);

		addedAreaGroups.append("path")
			.attr("fill", d => this.colorScale[d.label]())
			.datum(d => d.data)
			.style("opacity", 0)
			.transition(this.getDefaultTransition())
			.style("opacity", 0.8)
			.attr("class", "area")
			.attr("d", this.areaGenerator);

		// Add point circles
		const circleRadius = this.getCircleRadius();
		addedAreaGroups.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i))
			.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", (d, i) => this.x(d.label) + this.x.step() / 2)
				.attr("cy", (d: any) => this.y(d.value))
				.attr("r", 4)
				.style("opacity", 0)
				.transition(this.getDefaultTransition())
				.style("opacity", 1)
				.attr("fill", d => this.getCircleFill(circleRadius, d))
				.attr("stroke", d => this.getStrokeColor(d.datasetLabel, d.label, d.value));

		// Remove areas that are no longer needed
		gArea.exit()
			.classed("removed", true) // mark this element with "removed" class so it isn't reused
			.transition(this.getDefaultTransition())
			.style("opacity", 0)
			.remove();

		// Add slice hover actions, and clear any slice borders present
		this.addDataPointEventListener();

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the update event
		this.dispatchEvent("update");
	}

	updateElements(animate: boolean, gArea?: any) {
		if (!gArea) {
			gArea = this.innerWrap.selectAll("g.areas");
		}

		const transitionToUse = animate ? this.getFillTransition() : this.getInstantTransition();
		const self = this;
		gArea.selectAll("path.area")
			.datum(function(d) {
				const parentDatum = select(this.parentNode).datum() as any;

				return parentDatum.data;
			})
			.transition(transitionToUse)
			.style("opacity", 0.8)
			.attr("fill", function(d) {
				const parentDatum = select(this.parentNode).datum() as any;

				return self.colorScale[parentDatum.label]();
			})
			.attr("class", "area")
			.attr("d", this.areaGenerator);

		const circleRadius = this.getCircleRadius();
		gArea.selectAll("circle.dot")
			.data(function(d, i) {
				const parentDatum = select(this).datum() as any;

				return self.addLabelsToDataPoints(parentDatum, i);
			})
			.transition(transitionToUse)
			.attr("cx", d => this.x(d.label) + this.x.step() / 2)
			.attr("cy", d => this.y(d.value))
			.attr("r", Configuration.lines.points.strokeWidth)
			.attr("fill", d => this.getCircleFill(circleRadius, d))
			.attr("stroke", d => this.getStrokeColor(d.datasetLabel, d.label, d.value));
	}

	addDataPointEventListener() {
		const self = this;
		const { accessibility } = this.options;

		this.svg.selectAll("circle.dot")
			.on("click", function(d) {
				self.dispatchEvent("line-onClick", d);
			})
			.on("mouseover", function(d) {
				select(this.parentNode)
					.raise();
				select(this)
					.style("opacity", 1)
					.attr("stroke-width", Configuration.lines.points.mouseover.strokeWidth)
					.attr("stroke", self.colorScale[d.datasetLabel](d.label))
					.attr("stroke-opacity", Configuration.lines.points.mouseover.strokeOpacity);

				self.showTooltip(d, this);
				self.reduceOpacity(this);
			})
			.on("mousemove", function(d) {
				const tooltipRef = select(self.holder).select("div.chart-tooltip");

				const relativeMousePosition = mouse(self.holder as HTMLElement);
				tooltipRef.style("left", relativeMousePosition[0] + Configuration.tooltip.magicLeft2 + "px")
					.style("top", relativeMousePosition[1] + "px");
			})
			.on("mouseout", function(d) {
				const { strokeWidth, strokeWidthAccessible } = Configuration.lines.points.mouseout;
				select(this)
					.attr("stroke-width", accessibility ? strokeWidthAccessible : strokeWidth)
					.attr("stroke", self.colorScale[d.datasetLabel](d.label))
					.attr("stroke-opacity", Configuration.lines.points.mouseout.strokeOpacity);

				self.hideTooltip();
			});
	}
}
