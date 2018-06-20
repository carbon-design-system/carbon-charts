import * as d3 from "d3";

import { BaseAxisChart } from "./base-axis-chart";
import { Configuration } from "./configuration";

export class StackedBarChart extends BaseAxisChart {
	x: any;
	y: any;
	colorScale: any;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "bar";
	}

	updateElements(animate: boolean, rect?: any) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - this.getBBox(".x.axis").height;

		if (!rect) {
			rect = this.innerWrap.selectAll("rect.bar");
		}

		// Update existing bars
		rect
			.transition(animate ? this.getFillTransition() : 0)
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d.label))
			.attr("y", (d: any, i) => this.y(d.value))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => height - this.y(d.value))
			.attr("stroke", (d: any) => this.colorScale(d.label))
			.attr("fill", (d: any) => this.getFillScale()(d.label).toString());
	}

	interpolateValues(newData: any) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - this.getBBox(".x.axis").height;

		// Apply new data to the bars
		const rect = this.innerWrap
			.selectAll("rect.bar")
			.data(newData);

		this.updateElements(true, rect);

		// Add bars that need to be added now
		rect.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d.label))
			.attr("y", (d: any, i) => this.y(d.value))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => height - this.y(d.value))
			.attr("opacity", 0)
			.transition(this.getFillTransition())
			.attr("fill", (d: any) => this.getFillScale()(d.label).toString())
			.attr("opacity", 1)
			.attr("stroke", (d: any) => this.colorScale(d.label))
			.attr("stroke-width", this.options.accessibility ? 2 : 0);

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
		const height = chartSize.height - this.getBBox(".x.axis").height;

		const g = this.innerWrap
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		this.patternsService.addPatternSVGs(data, this.colorScale);
		this.patternScale = d3.scaleOrdinal()
			.range(this.patternsService.getFillValues())
			.domain(this.getLegendItemKeys());

		const fillScale = this.getFillScale();

		const stackData = d3.stack().keys(this.options.yDomain)(data);
		const addedBars = g.append("g")
			// TODO - Rename to bars
			.classed("all-bars", true)
			.selectAll(".bars")
				.data(stackData)
				.enter()
					.append("g")
					// TODO - Rename to bars-${dKey}
					.classed("bars", true)
					.selectAll("rect")
					.data(function(d) { return d; })
					.enter()
						.append("rect")
						.attr("class", "bar")
						.attr("x", (d: any) => this.x(d.data[this.options.xDomain]))
						.attr("y", (d: any, i) => this.y(d[1]))
						.attr("width", this.x.bandwidth())
						.attr("height", (d: any) => this.y(d[0]) - this.y(d[1]))
						// TODO - Find a way to access key here
						.attr("fill", (d: any) => {
							const dValue = d[1] - d[0];
							const dKey = Object.keys(d.data).find(key => d.data[key] === dValue);

							return this.getFillScale()(dKey);
						})
						.attr("stroke", (d: any) => {
							const dValue = d[1] - d[0];
							const dKey = Object.keys(d.data).find(key => d.data[key] === dValue);

							return this.getFillScale()(dKey);
						});

		if (this.options.accessibility) {
			addedBars.attr("stroke-width", 2);
		}

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
		this.updateElements(false);

		// Reposition the legend
		this.positionLegend();

		this.events.dispatchEvent(new Event("resize"));
	}
}
