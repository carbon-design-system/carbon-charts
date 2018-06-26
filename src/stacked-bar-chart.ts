import * as d3 from "d3";

import { BarChart } from "./bar-chart";
import { Configuration } from "./configuration";

export class StackedBarChart extends BarChart {
	x: any;
	y: any;
	colorScale: any;

	constructor(holder: Element, configs: any) {
		super(holder, configs);

		this.options.type = "stacked-bar";
	}

	updateElements(animate: boolean, rect?: any) {
		const { bar: margins } = Configuration.charts.margin;
		const { axis } = this.options;

		if (!rect) {
			rect = this.innerWrap.selectAll("rect.bar");
		}

		// Update existing bars
		rect
			.transition(this.getFillTransition(animate))
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d.data[axis.x.domain]))
			.attr("y", (d: any, i) => this.y(d[1]))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => this.y(d[0]) - this.y(d[1]))
			.transition(this.getFillTransition())
			.attr("fill", d => this.getFillScale()(d[axis.x.domain]))
			.attr("stroke", d => this.colorScale(d[axis.x.domain]))
			.attr("stroke-width", this.options.accessibility ? 2 : 0);
	}

	updateDisplayData() {
		const oldData = this.data;
		const activeLegendItems = this.getActiveLegendItems();

		const { axis } = this.options;

		// Get new data by looping through the data and keeping only the active legend items
		const newDisplayData = oldData.map(dataPoint => {
			const updatedDataPoint = {};

			activeLegendItems.forEach(activeLegendItem => {
				updatedDataPoint[activeLegendItem] = dataPoint[activeLegendItem];
			});

			updatedDataPoint[axis.x.domain] = dataPoint[axis.x.domain];

			return updatedDataPoint;
		});

		return this.dataProcessor(newDisplayData, true);
	}

	addLabelsToDataPoints(d: any) {
		d.forEach(dataPoint => {
			if (Array.isArray(dataPoint)) {
				dataPoint[this.options.axis.x.domain] = d.key;
			}
		});

		return d;
	}

	interpolateValues(newData: any) {
		const { axis } = this.options;

		const stackData = d3.stack().keys(axis.y.domain)(newData);

		// Apply new data to the bars
		const g = this.innerWrap.selectAll("g.bars-wrapper g.bars")
			.data(stackData);
		const rect = g.selectAll("rect")
				.data(d => this.addLabelsToDataPoints(d));

		this.updateElements(true, rect);

		// Add bars that need to be added now
		rect.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d.data[axis.x.domain]))
			.attr("y", (d: any, i) => this.y(d[1]))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => this.y(d[0]) - this.y(d[1]))
			.attr("opacity", 0)
			.transition(this.getFillTransition())
			.attr("fill", d => this.getFillScale()(d[axis.x.domain]))
			.attr("stroke", d => this.colorScale(d[axis.x.domain]))
			.attr("opacity", 1)
			.attr("stroke-width", this.options.accessibility ? 2 : 0);

		// Remove bars that are no longer needed
		rect.exit()
			.each(d => console.log("rect removing"))
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
		const { axis } = this.options;

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

		const stackData = d3.stack().keys(axis.y.domain)(data);
		const addedBars = g.append("g")
			.classed("bars-wrapper", true)
			.selectAll("g.bars")
				.data(stackData)
				.enter()
					.append("g")
					.attr("class", d => `bars ${d.key}`)
					.selectAll("rect")
					.data(d => this.addLabelsToDataPoints(d))
					.enter()
						.append("rect")
						.attr("class", "bar")
						.attr("x", (d: any) => this.x(d.data[axis.x.domain]))
						.attr("y", (d: any, i) => this.y(d[1]))
						.attr("width", this.x.bandwidth())
						.attr("height", (d: any) => this.y(d[0]) - this.y(d[1]))
						.attr("fill", d => this.getFillScale()(d[axis.x.domain]))
						.attr("stroke", d => this.getFillScale()(d[axis.x.domain]));

		if (this.options.accessibility) {
			addedBars.attr("stroke-width", 2);
		}

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the load event
		this.events.dispatchEvent(new Event("load"));
	}
}
