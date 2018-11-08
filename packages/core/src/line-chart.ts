// D3 Imports
import { select } from "d3-selection";
import { line } from "d3-shape";

import { BaseAxisChart } from "./base-axis-chart";
import * as Configuration from "./configuration";

import { getD3Curve } from "./services/curves";

export class LineChart extends BaseAxisChart {
	x: any;
	y: any;

	colorScale: any;

	lineGenerator: any;

	constructor(holder: Element, configs: any) {
		super(holder, configs);

		this.options.type = "line";
	}

	getLegendType() {
		return Configuration.legend.basedOn.SERIES;
	}

	addLabelsToDataPoints(d, index) {
		const { labels } = this.displayData;

		return d.data.map((datum, i) => ({
			label: labels[i],
			datasetLabel: d.label,
			value: datum
		}));
	}

	draw() {
		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		const { line: margins } = Configuration.charts.margin;
		const { scales } = this.options;

		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;
		const height = chartSize.height - this.getBBox(".x.axis").height;

		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		this.innerWrap.attr("transform", `translate(${margins.left}, ${margins.top})`);

		// D3 line generator function
		this.lineGenerator = line()
			.x((d, i) => this.x(this.displayData.labels[i]) + margins.left)
			.y((d: any) => this.y(d))
			.curve(getD3Curve(this.options.curve, this.options.curveOptions));

		const gLines = this.innerWrap.selectAll("g.lines")
			.data(this.displayData.datasets)
			.enter()
				.append("g")
				.classed("lines", true);

		gLines.append("path")
			.attr("stroke", d => this.colorScale[d.label]())
			.datum(d => d.data)
			.attr("class", "line")
			.attr("d", this.lineGenerator);

		gLines.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i))
			.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", d => this.x(d.label) + margins.left)
				.attr("cy", d => this.y(d.value))
				.attr("r", Configuration.charts.pointCircles.radius)
				.attr("stroke", d => this.colorScale[d.datasetLabel](d.label));

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the load event
		this.dispatchEvent("load");
	}

	interpolateValues(newData: any) {
		const { line: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;
		const height = chartSize.height - this.getBBox(".x.axis").height;

		// Apply new data to the lines
		const gLines = this.innerWrap.selectAll("g.lines")
			.data(newData.datasets);

		this.updateElements(true, gLines);

		// Add lines that need to be added now
		const addedLineGroups = gLines.enter()
			.append("g")
			.classed("lines", true);

		addedLineGroups.append("path")
			.attr("stroke", d => this.colorScale[d.label]())
			.datum(d => d.data)
			.style("opacity", 0)
			.transition(this.getDefaultTransition())
			.style("opacity", 1)
			.attr("class", "line")
			.attr("d", this.lineGenerator);

		// Add line circles
		addedLineGroups.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i))
			.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", (d, i) => this.x(d.label) + margins.left)
				.attr("cy", (d: any) => this.y(d.value))
				.attr("r", 4)
				.style("opacity", 0)
				.transition(this.getDefaultTransition())
				.style("opacity", 1)
				.attr("stroke", d => this.colorScale[d.datasetLabel](d.label));

		// Remove lines that are no longer needed
		gLines.exit()
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

	updateElements(animate: boolean, gLines?: any) {
		const { scales } = this.options;

		const chartSize = this.getChartSize();
		const height = chartSize.height - this.getBBox(".x.axis").height;

		if (!gLines) {
			gLines = this.innerWrap.selectAll("g.lines");
		}

		const transitionToUse = animate ? this.getFillTransition() : this.getInstantTransition();
		const self = this;
		gLines.selectAll("path.line")
			.datum(function(d) {
				const parentDatum = select(this.parentNode).datum() as any;

				return parentDatum.data;
			})
			.transition(transitionToUse)
			.attr("stroke", function(d) {
				const parentDatum = select(this.parentNode).datum() as any;

				return self.colorScale[parentDatum.label]();
			})
			.attr("class", "line")
			.attr("d", this.lineGenerator);

		const { line: margins } = Configuration.charts.margin;
		gLines.selectAll("circle.dot")
			.data(function(d, i) {
				const parentDatum = select(this).datum() as any;

				return self.addLabelsToDataPoints(parentDatum, i);
			})
			.transition(transitionToUse)
			.attr("cx", d => this.x(d.label) + margins.left)
			.attr("cy", d => this.y(d.value))
			.attr("r", Configuration.lines.points.strokeWidth)
			.attr("stroke", d => this.colorScale[d.datasetLabel](d.label));
	}

	resizeChart() {
		const chartSize: any = this.getChartSize(this.container);
		const dimensionToUseForScale = Math.min(chartSize.width, chartSize.height);

		// Resize the SVG
		select(this.holder).select("svg")
				.attr("width", `${dimensionToUseForScale}px`)
				.attr("height", `${dimensionToUseForScale}px`);

		this.updateXandYGrid(true);
		// Scale out the domains
		this.setXScale();
		this.setYScale();

		// Set the x & y axis as well as their labels
		this.setXAxis(true);
		this.setYAxis(true);

		this.updateElements(false, null);

		super.resizeChart();
	}

	addDataPointEventListener() {
		const self = this;
		const { thresholds } = this.options;

		this.svg.selectAll("circle.dot")
			.on("mouseover", function(d) {
				select(this)
					.attr("stroke", self.colorScale[d.datasetLabel](d.label))
					.attr("stroke-opacity", Configuration.lines.points.mouseover.strokeOpacity);
			})
			.on("mouseout", function(d) {
				select(this)
					.attr("stroke", self.colorScale[d.datasetLabel](d.label))
					.attr("stroke-opacity", Configuration.lines.points.mouseout.strokeOpacity);
			})
			.on("click", function(d) {
				self.showTooltip(d, this);
				self.reduceOpacity(this);
			});
	}
}
