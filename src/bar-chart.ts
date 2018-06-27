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
			// .ease(d3.easeCircle)
			.attr("x", d => this.x1(d.datasetLabel))
			.attr("y", d => this.y(d.value))
			.attr("width", this.x1.bandwidth())
			.attr("height", d => height - this.y(d.value))
			.attr("fill", d => this.colorScale[d.datasetLabel](d.label));
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
	}

	interpolateValues(newData: any) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - this.getBBox(".x.axis").height;

		// Apply new data to the bars
		const { datasets } = this.displayData;
		const rect = this.innerWrap.selectAll("g.bars g")
			.data(this.displayData.labels)
				.attr("transform", d => "translate(" + this.x(d) + ",0)")
				.selectAll("rect.bar")
				.data((d, index) => {
					return datasets.map(dataset => {
						return {
							label: d,
							datasetLabel: dataset.label,
							value: dataset.data[index]
						};
					});
				});

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
					return datasets.map(dataset => {
						return {
							label: d,
							datasetLabel: dataset.label,
							value: dataset.data[index]
						};
					});
				})
					.enter()
						.append("rect")
						.classed("bar", true)
						.attr("x", d => this.x1(d.datasetLabel))
						.attr("y", d => this.y(d.value))
						.attr("width", this.x1.bandwidth())
						.attr("height", d => height - this.y(d.value))
						.attr("fill", d => this.colorScale[d.datasetLabel](d.label));

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the load event
		this.events.dispatchEvent(new Event("load"));
	}

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
