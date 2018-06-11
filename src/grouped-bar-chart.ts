import * as d3 from "d3";

import { BarChart } from "./bar-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class GroupedBarChart extends BarChart {
	x: any;
	y: any;
	color: any;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "grouped-bar";
	}

	updateElements(rect: any, noAnimation?: boolean) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - margins.top - margins.bottom;

		const t = d3.transition().duration(noAnimation ? 0 : 750);

		// Update existing bars
		rect
			.transition(t)
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d.label))
			.attr("y", (d: any, i) => this.y(d.value))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => height - this.y(d.value))
			.attr("fill", (d: any) => this.color(d.label).toString());
	}

	interpolateValues(newData: any) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - margins.top - margins.bottom;

		// Apply new data to the bars
		const rect = this.innerWrap
			.selectAll("rect.bar")
			.data(newData);

		this.updateElements(rect, false);

		// Add bars that need to be added now
		rect.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d.label))
			.attr("y", (d: any, i) => this.y(d.value))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => height - this.y(d.value))
			.attr("opacity", 0)
			.transition()
			.duration(750)
			.attr("opacity", 1)
			.attr("fill", (d: any) => this.color(d.label).toString());

		// Remove bars that are no longer needed
		rect.exit()
			.transition()
			.duration(750)
			.style("opacity", 0)
			.remove();

		// Add slice hover actions, and clear any slice borders present
		this.addDataPointEventListener();

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the update event
		this.events.dispatchEvent(new Event("update"));
	}

	draw() {
		const { data } = this;

		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		const margin = {top: 0, right: -40, bottom: 50, left: 40};
		const chartSize = this.getChartSize();
		const width = chartSize.width - margin.left - margin.right;
		const height = chartSize.height - margin.top - margin.bottom;

		const g = this.innerWrap
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		g.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d.label))
			.attr("y", (d: any, i) => this.y(d.value))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => height - this.y(d.value))
			.attr("fill", (d: any) => this.color(d.label).toString());

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the load event
		this.events.dispatchEvent(new Event("load"));
	}

	resizeChart() {
		const { pie: pieConfigs } = Configuration;

		const actualChartSize: any = this.getChartSize(this.container);
		const dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);
		const scaleRatio = dimensionToUseForScale / pieConfigs.maxWidth;
		const radius: number = dimensionToUseForScale / 2;

		// Resize the SVG
		d3.select(this.holder).select("svg")
				.attr("width", `${dimensionToUseForScale}px`)
				.attr("height", `${dimensionToUseForScale}px`);

		this.updateXandYGrid(true);
		// Scale out the domains
		this.setXScale(true);
		this.setYScale();

		// Set the x & y axis as well as their labels
		this.setXAxis(true);
		this.setYAxis(true);

		// Apply new data to the bars
		const rect = this.innerWrap.selectAll("rect.bar");
		this.updateElements(rect, true);

		// this.svg
		// 	.style("transform", `translate(${radius}px,${radius}px)`);

		// // Resize the arc
		// const marginedRadius = radius - (pieConfigs.label.margin * scaleRatio);
		// this.arc = d3.arc()
		// 	.innerRadius(this.options.type === "donut" ? (marginedRadius * (2 / 3)) : 0)
		// 	.outerRadius(marginedRadius);

		// this.svg.selectAll("path")
		// 	.attr("d", this.arc);

		// this.svg
		// 	.selectAll("text.chart-label")
		// 	.attr("transform", (d) => {
		// 		return this.deriveTransformString(d, radius);
		// 	});

		// Reposition the legend
		this.positionLegend();
	}
}
