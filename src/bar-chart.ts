import * as d3 from "d3";

import { BaseAxisChart } from "./base-axis-chart";
import { Configuration } from "./configuration";

import PatternsService from "./services/patterns";

export class BarChart extends BaseAxisChart {
	x: any;
	x1: any;
	y: any;
	colorScale: any;

	constructor(holder: Element, configs: any) {
		super(holder, configs);

		this.options.type = "bar";
	}

	updateElements(animate: boolean, rect?: any) {
		const { axis } = this.options;

		const chartSize = this.getChartSize();
		const height = chartSize.height - this.getBBox(".x.axis").height;

		if (!rect) {
			rect = this.innerWrap.selectAll("rect.bar");
		}

		// Update existing bars
		rect
			.transition(animate ? this.getFillTransition() : 0)
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d[axis.x.domain]))
			.attr("y", (d: any, i) => this.y(d.value))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => height - this.y(d.value))
			.attr("stroke", (d: any) => this.colorScale(d[axis.x.domain]))
			.attr("fill", (d: any) => this.getFillScale()(d.label).toString());
	}

	setXScale(noAnimation?: boolean) {
		const { bar: margins } = Configuration.charts.margin;
		const { axis } = this.options;

		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;

		this.x = d3.scaleBand().rangeRound([0, width]).padding(0.25);
		this.x1 = d3.scaleBand().padding(0.2);

		const activeLegendItems = this.getActiveLegendItems();
		// Apply legened filters, OLD VERSION axis.y.domain.filter(item => activeLegendItems.indexOf(item) > -1)

		this.x.domain(this.displayData.labels);
		this.x1.domain(this.displayData.datasets.map(dataset => dataset.label)).rangeRound([0, this.x.bandwidth()]);

		console.log("this.x.bandwidth()", this.x.bandwidth(), this.displayData.datasets.map(dataset => dataset.label));
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

		const { bar: margins } = Configuration.charts.margin;
		const { axis } = this.options;

		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;
		const height = chartSize.height - this.getBBox(".x.axis").height;

		const gBars = this.innerWrap
			.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
			.append("g")
			.classed("bars", true);

		const { datasets } = this.displayData;
		gBars.selectAll("g")
			.data(this.displayData.labels)
			.enter()
				.append("g")
				.attr("transform", d => "translate(" + this.x(d) + ",0)")
				.selectAll("rect.bar")
				.data((d, index) => {
					console.log(datasets.map(dataset => {
						return {
							label: d,
							datasetLabel: dataset.label,
							value: dataset.data[index]
						};
					}));

					return datasets.map(dataset => {
						return {
							label: d,
							datasetLabel: dataset.label,
							value: dataset.data[index]
						};
					});
				})
					.enter()
						.each(d => console.log("d", d))
						.append("rect")
						.classed("bar", true)
						.attr("x", d => this.x1(d.datasetLabel))
						.attr("y", d => this.y(d.value)) // this.y(d.value)
						.attr("width", this.x1.bandwidth())
						.attr("height", d => height - this.y(d.value)) // this.y(d.value)
						.attr("fill", d => this.colorScale[d.datasetLabel](d.label));

		// 		.attr("x", d => this.x1(d.label))
		// 		.attr("y", d => this.y(d.value))
		// 		.attr("width", this.x1.bandwidth())
		// 		.attr("height", d => height - this.y(d.value))
		// 		.attr("fill", d => this.colorScale(d.label));

		// g.append("g")
		// .classed("bars", true)
		// .selectAll("g")
		// .data(data)
		// .enter().append("g")
		// 	.attr("transform", d => "translate(" + this.x(d[axis.x.domain]) + ",0)")
		// 	.selectAll("rect.bar")
		// 	.data(d => this.getLegendItemKeys().map(function(key) { return {label: key, value: d[key]}; }))
		// 	.enter().append("rect")
		// 		.classed("bar", true)
		// 		.attr("x", d => this.x1(d.label))
		// 		.attr("y", d => this.y(d.value))
		// 		.attr("width", this.x1.bandwidth())
		// 		.attr("height", d => height - this.y(d.value))
		// 		.attr("fill", d => this.colorScale(d.label));

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the load event
		this.events.dispatchEvent(new Event("load"));
	}

	// draw() {
	// 	const { data } = this;

	// 	console.log("BAR DRAW");
	// 	console.log("data", data);

	// 	this.innerWrap.style("width", "100%")
	// 		.style("height", "100%");

	// 	const margin = {top: 0, right: -40, bottom: 50, left: 40};
	// 	const chartSize = this.getChartSize();
	// 	const height = chartSize.height - this.getBBox(".x.axis").height;

	// 	const g = this.innerWrap
	// 		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// 	this.patternsService.addPatternSVGs(data, this.colorScale);
	// 	this.patternScale = d3.scaleOrdinal()
	// 		.range(this.patternsService.getFillValues())
	// 		.domain(this.getLegendItemKeys());

	// 	const fillScale = this.getFillScale();

	// 	const addedBars = g.selectAll(".bar")
	// 		.data(data)
	// 		.enter()
	// 		.append("rect")
	// 		.attr("class", "bar")
	// 		.attr("x", (d: any) => this.x(d.label))
	// 		.attr("y", (d: any, i) => this.y(d.value))
	// 		.attr("width", this.x.bandwidth())
	// 		.attr("height", (d: any) => height - this.y(d.value))
	// 		.attr("fill", (d: any) => fillScale(d.label).toString())
	// 		.attr("stroke", (d: any) => this.colorScale(d.label));

	// 	if (this.options.accessibility) {
	// 		addedBars.attr("stroke-width", 2);
	// 	}

	// 	// Hide the overlay
	// 	this.updateOverlay().hide();

	// 	// Dispatch the load event
	// 	this.events.dispatchEvent(new Event("load"));
	// }

	repositionXAxisTitle() {
		const xAxisRef = this.svg.select("g.x.axis");
		const tickHeight = this.getLargestTickHeight(xAxisRef.selectAll(".tick")) + Configuration.axis.tick.heightAddition;

		const xAxisTitleRef = this.svg.select("g.x.axis text.x.axis-label");
		xAxisTitleRef.attr("class", "x axis-label")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (xAxisRef.node().getBBox().width / 2) + "," + tickHeight + ")")
			.text(this.options.axis.x.title);
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

		if (this.innerWrap.select(".axis-label.x").nodes().length > 0 && this.options.axis.x.title) {
			this.repositionXAxisTitle();
		}

		this.events.dispatchEvent(new Event("resize"));
	}
}
