import * as d3 from "d3";

import { BaseAxisChart } from "./base-axis-chart";
import { Configuration } from "./configuration";

import PatternsService from "./services/patterns";

export class LineChart extends BaseAxisChart {
	x: any;
	x1: any;
	y: any;
	colorScale: any;

	constructor(holder: Element, configs: any) {
		super(holder, configs);

		this.options.type = "line";
	}

	addLabelsToDataPoints(d, index) {
		const { labels } = this.displayData;

		return d.data.map((datum, i) => {
			return {
				label: labels[i],
				datasetLabel: d.label,
				value: datum
			};
		});
	}

	draw() {
		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		const { line: margins } = Configuration.charts.margin;
		const { axis } = this.options;

		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;
		const height = chartSize.height - this.getBBox(".x.axis").height;

		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		this.innerWrap.attr("transform", "translate(" + margins.left + "," + margins.top + ")");

		// D3 line generator function
		const line = d3.line()
			.x((d, i) => this.x(this.displayData.labels[i]) + margins.left)
			.y((d: any) => this.y(d))
			.curve(d3.curveNatural);

		const { datasets } = this.displayData;
		const gLines = this.innerWrap.selectAll("g.lines")
			.data(datasets)
			.enter()
			.append("g")
			.classed("lines", true);

		gLines.append("path")
			.attr("stroke", d => {
				return this.colorScale[d.label]();
			})
			.datum(d => d.data)
			.attr("class", "line")
			.attr("d", line);

		gLines.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i))
			.enter()
			.append("circle")
			.attr("class", "dot")
			.attr("cx", (d, i) => this.x(d.label) + margins.left)
			.attr("cy", (d: any) => this.y(d.value))
			.attr("r", 4)
			.attr("stroke", d => this.colorScale[d.datasetLabel](d.label));

		// const gBars = this.innerWrap
		// 	.attr("transform", "translate(" + margins.left + "," + margins.top + ")")
		// 	.append("g")
		// 	.classed("bars", true)
		// 	.attr("width", width);

		// gBars.selectAll("g")
		// 	.data(this.displayData.labels)
		// 	.enter()
		// 		.append("g")
		// 		.attr("transform", d => "translate(" + this.x(d) + ",0)")
		// 		.selectAll("rect.bar")
		// 		.data((d, index) => this.addLabelsToDataPoints(d, index))
		// 			.enter()
		// 				.append("rect")
		// 				.classed("bar", true)
		// 				.attr("x", d => this.x1(d.datasetLabel))
		// 				.attr("y", d => this.y(d.value))
		// 				.attr("width", this.x1.bandwidth())
		// 				.attr("height", d => height - this.y(d.value))
		// 				.attr("fill", d => this.colorScale[d.datasetLabel](d.label));

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the load event
		this.events.dispatchEvent(new Event("load"));
	}

	interpolateValues(newData: any) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;
		const height = chartSize.height - this.getBBox(".x.axis").height;

		// Apply new data to the bars
		const rect = this.innerWrap.select("g.bars")
			.attr("width", width)
			.selectAll("g")
			.data(this.displayData.labels)
				.attr("transform", d => "translate(" + this.x(d) + ",0)")
				.selectAll("rect.bar")
				.data((d, index) => this.addLabelsToDataPoints(d, index));

		this.updateElements(true, rect);

		// Add bars that need to be added now
		rect.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", d => this.x1(d.datasetLabel))
			.attr("y", d => this.y(d.value))
			.attr("width", this.x1.bandwidth())
			.attr("height", d => height - this.y(d.value))
			.attr("opacity", 0)
			.transition(this.getFillTransition())
			.attr("fill", d => this.getFillScale()[d.datasetLabel](d.label))
			.attr("opacity", 1)
			.attr("stroke", (d: any) => this.colorScale[d.datasetLabel](d.label))
			.attr("stroke-width", this.options.accessibility ? 2 : 0);

		// Remove bars that are no longer needed
		rect.exit()
			.transition(this.getDefaultTransition())
			.style("opacity", 0)
			.remove();

		// Add slice hover actions, and clear any slice borders present
		this.addDataPointEventListener();

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the update event
		this.events.dispatchEvent(new Event("update"));
	}

	updateElements(animate: boolean, rect?: any, g?: any) {
		const { axis } = this.options;

		const chartSize = this.getChartSize();
		const height = chartSize.height - this.getBBox(".x.axis").height;

		if (!rect) {
			rect = this.innerWrap.selectAll("rect.bar");
		}

		if (g) {
			g.attr("transform", d => "translate(" + this.x(d) + ",0)");
		}

		// Update existing bars
		rect
			.transition(animate ? this.getFillTransition() : this.getInstantTransition())
			// TODO
			// .ease(d3.easeCircle)
			.attr("x", d => this.x1(d.datasetLabel))
			.attr("y", d => this.y(d.value))
			.attr("width", this.x1.bandwidth())
			.attr("height", d => height - this.y(d.value))
			.attr("fill", d => this.getFillScale()[d.datasetLabel](d.label));
	}

	resizeChart() {
		const actualChartSize: any = this.getChartSize(this.container);
		const dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);

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
		this.updateElements(false, null, g);

		super.resizeChart();
	}
}
