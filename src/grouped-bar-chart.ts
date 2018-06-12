import * as d3 from "d3";

import { BarChart } from "./bar-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class GroupedBarChart extends BarChart {
	x1: any;
	groups: any;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "grouped-bar";
	}

	getKeysFromData() {
		this.setGroups();

		return super.getKeysFromData();
	}

	updateData() {
		// Immutable data copy
		const oldData = this.data.map(item => Object.assign({}, item));

		const disabledLegendItems = this.getDisabledLegendItems();

		// Get new data by filtering the data based off of the legend
		const newDisplayData = oldData.map(dataPoint => {
			disabledLegendItems.forEach(disabledItem => {
				delete dataPoint[disabledItem];
			});

			return dataPoint;
		});

		return newDisplayData;
	}

	setGroups() {
		const { xDomain } = this.options;
		const groups = this.displayData.map(item => item[xDomain]);

		this.groups = Tools.removeArrayDuplicates(groups);
	}

	updateElements(g: any, rect: any, noAnimation?: boolean) {
		const { xDomain } = this.options;
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - margins.top - margins.bottom;

		const t = d3.transition().duration(noAnimation ? 0 : 750);

		// Update existing groups
		g.transition(t)
			.attr("transform", d => "translate(" + this.x(d[xDomain]) + ",0)");

		// Update existing bars
		rect
			.transition(t)
			.attr("x", d => this.x1(d.label))
			.attr("y", d => this.y(d.value))
			.attr("width", this.x1.bandwidth())
			.attr("height", d => height - this.y(d.value))
			.attr("fill", d => this.color(d.label));
	}

	interpolateValues(newData: any) {
		const { xDomain } = this.options;
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - margins.top - margins.bottom;

		// Apply new data to the bars
		const g = this.innerWrap
			.select("g.bars")
			.selectAll("g")
			.data(newData);

		const rect = g.selectAll("rect.bar")
			.data(d => this.getActiveLegendItems().map(function(key) { return {label: key, value: d[key]}; }));

		this.updateElements(g, rect, false);

		rect.enter()
				.append("rect")
				.classed("bar", true)
				.attr("y", d => this.y(d.value))
				.attr("height", d => height - this.y(d.value))
				.style("opacity", 0)
				.transition()
				.duration(750)
				.style("opacity", 1)
				.attr("x", d => this.x1(d.label))
				.attr("width", this.x1.bandwidth())
				.attr("fill", d => this.color(d.label));

		rect.exit()
			.each(function(d) { console.log("EXITOONG"); })
			.transition()
			.duration(750)
			.style("opacity", 0)
			.remove();

		console.log("NUYU DATA", newData);

		// Add groups that need to be added now
		const groupsAdded: any = [];
		g.enter().append("g")
				.style("opacity", 0)
				.transition()
				.duration(750)
				.style("opacity", 1)
				.attr("transform", d => "translate(" + this.x(d[xDomain]) + ",0)")
				.each(function(d) { groupsAdded.push(this); });

		// Add bars that need to be added now
		groupsAdded.forEach(groupAdded => {
			const groupRect = d3.select(groupAdded)
				.selectAll("rect.bar")
				.data(d => this.getActiveLegendItems().map(function(key) { console.log(key); return {label: key, value: d[key]}; }));

			groupRect.enter()
				.append("rect")
				.each(function(d) { console.log("ENTERED"); })
				.classed("bar", true)
				.attr("x", d => this.x1(d.label))
				.attr("y", d => this.y(d.value))
				.attr("height", d => height - this.y(d.value))
				.transition()
				.duration(750)
				.attr("width", this.x1.bandwidth())
				.attr("fill", d => this.color(d.label));
		});

		// Remove groups that are no longer needed
		g.exit()
			.each(function(d) { console.log("EXITOONG"); })
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

	/**************************************
	 *  Axis & Grids                      *
	 *************************************/

	setXScale(noAnimation?: boolean) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;

		this.x = d3.scaleBand().rangeRound([0, width]).padding(0.25);
		this.x1 = d3.scaleBand().padding(0.2);

		const activeLegendItems = this.getActiveLegendItems();
		const keysToShowOnAxis = this.options.yDomain.filter(item => activeLegendItems.indexOf(item) > -1);
		this.x.domain(this.groups);
		this.x1.domain(keysToShowOnAxis).rangeRound([0, this.x.bandwidth()]);
	}

	setYScale() {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - margins.top - margins.bottom;
		const yEnd = d3.max(this.displayData, d => d3.max(this.getLegendItemKeys(), key => d[key]));

		this.y = d3.scaleLinear().rangeRound([height, 0]);
		this.y.domain([0, yEnd]);
	}

	draw() {
		const { data } = this;

		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		const margin = {top: 0, right: -40, bottom: 50, left: 40};
		const chartSize = this.getChartSize();
		const width = chartSize.width - margin.left - margin.right;
		const height = chartSize.height - margin.top - margin.bottom;
		const { xDomain } = this.options;

		const g = this.innerWrap
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		g.append("g")
			.classed("bars", true)
			.selectAll("g")
			.data(data)
			.enter().append("g")
				.attr("transform", d => "translate(" + this.x(d[xDomain]) + ",0)")
				.selectAll("rect.bar")
				.data(d => this.getLegendItemKeys().map(function(key) { return {label: key, value: d[key]}; }))
				.enter().append("rect")
					.classed("bar", true)
					.attr("x", d => this.x1(d.label))
					.attr("y", d => this.y(d.value))
					.attr("width", this.x1.bandwidth())
					.attr("height", d => height - this.y(d.value))
					.attr("fill", d => this.color(d.label));

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
		const g = this.innerWrap.selectAll("g.bars g");
		const rect = this.innerWrap.selectAll("rect.bar");
		this.updateElements(g, rect, true);

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

// Helper functions
const cleanGrid = g => {
	g.selectAll("line")
		.attr("stroke", Configuration.grid.strokeColor);
	g.selectAll("text").style("display", "none").remove();
	g.select(".domain").style("stroke", "none");
	g.select(".tick").remove();
};
