// D3 Imports
import { select, mouse } from "d3-selection";
import { area } from "d3-shape";
import { scaleTime, extent, timeFormat, timeParse, scaleBand } from "d3";
import { axisBottom, axisLeft, axisRight } from "d3-axis";

import { BaseAxisChart } from "./base-axis-chart";
import * as Configuration from "./configuration";

import { getD3Curve } from "./services/curves";

export class AreaChart extends BaseAxisChart {
	x: any;
	y: any;

	colorScale: any;

	areaGenerator: any;

	constructor(holder: Element, configs: any) {
		super(holder, configs);

		this.options.type = "area";
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


	setXScale(xScale?: any) {
		const { line: margins } = Configuration.charts.margin;

		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;

		const formatTime = timeParse("%Y/%m/%d");
		if (xScale) {
			this.x = xScale;
		} else {

			// console.log(this.displayData.labels.map(dataset => formatTime(dataset)));

			this.x = scaleTime();
			this.x.domain(extent(this.displayData.labels.map(dataset => formatTime(dataset))));
			this.x.range([0, width]);

			// console.log(this.x.ticks());
		}
	}


	setXAxis(noAnimation?: boolean) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - margins.top - margins.bottom;

		const t = noAnimation ? this.getInstantTransition() : this.getDefaultTransition();
		const formatTime = timeParse("%Y/%m/%d");

		const xAxis = axisBottom(this.x)
			.tickSize(0)
			.tickSizeOuter(0)
			.tickFormat(timeFormat("%Y/%m/%d")).tickValues(this.displayData.labels.map(dataset => formatTime(dataset)));
		let xAxisRef = this.svg.select("g.x.axis");

		// If the <g class="x axis"> exists in the chart SVG, just update it
		if (xAxisRef.nodes().length > 0) {
			xAxisRef = this.svg.select("g.x.axis")
				.transition(t)
				.attr("transform", `translate(0, ${height})`)
				// Casting to any because d3 does not offer appropriate typings for the .call() function
				.call(xAxis);
		} else {
			xAxisRef = this.innerWrap.append("g")
				.attr("class", "x axis");

			xAxisRef.call(xAxis);
		}

		// Update the position of the pieces of text inside x-axis
		xAxisRef.selectAll("g.tick text")
			.attr("y", Configuration.scales.magicY1)
			.attr("x", Configuration.scales.magicX1)
			.attr("dy", ".35em")
			.attr("transform", `rotate(${Configuration.scales.xAxisAngle})`)
			.style("text-anchor", "end")
			.call(text => this.wrapTick(text));

		// get the tickHeight after the ticks have been wrapped
		const tickHeight = this.getLargestTickHeight(xAxisRef.selectAll(".tick")) + Configuration.scales.tick.heightAddition;
		// Add x-axis title
		if (this.innerWrap.select(".axis-label.x").nodes().length === 0 && this.options.scales.x.title) {
			xAxisRef.append("text")
				.attr("class", "x axis-label")
				.attr("text-anchor", "middle")
				.attr("transform", `translate(${xAxisRef.node().getBBox().width / 2}, ${tickHeight})`)
				.text(this.options.scales.x.title);
		}

		// get the yHeight after the height of the axis has settled
		const yHeight = this.getChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		xAxisRef.attr("transform", `translate(0, ${yHeight})`);
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

		// D3 area generator function
		this.areaGenerator = area()
			.x((d,i)=>this.x(new Date(this.displayData.labels[i])))
			.y1((d) => this.y(d))
			.y0(d => this.y(0))
			.curve(getD3Curve("curveLinear"));

		const gLines = this.innerWrap.selectAll("g.lines")
			.data(this.displayData.datasets)
			.enter()
				.append("g")
				.classed("lines", true);

		gLines.append("path")
			.attr("stroke", d => this.colorScale[d.label]())
			.attr("fill", d => this.colorScale[d.label]())
			.attr("opacity", 0.4)
			.datum(d => d.data)
			.attr("class", "area")
			.attr("d", this.areaGenerator);


		gLines.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i))
			.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", d => this.x(new Date(d.label)))
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

		// Add lines that need to be added now, area under line is calculated
		const addedLineGroups = gLines.enter()
			.append("g")
			.classed("lines", true);

		addedLineGroups.append("path")
			.attr("stroke", d => this.colorScale[d.label]())
			.datum(d => d.data)
			.style("opacity", 0)
			.transition(this.getDefaultTransition())
			.style("opacity", 1)
			.attr("class", "area")
			.attr("d", this.areaGenerator);

		// Add line circles
		addedLineGroups.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i))
			.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", (d, i) => this.x(new Date(d.label))  )
				.attr("cy", (d: any) => this.y(d.value))
				.attr("r", 4)
				.style("opacity", 0)
				.transition(this.getDefaultTransition())
				.style("opacity", 1)
				.attr("stroke", d => this.colorScale[d.datasetLabel](d.label));

		// Remove lines that are no longer needed
		// gLines.exit()
		// 	.transition(this.getDefaultTransition())
		// 	.style("opacity", 0)
		// 	.remove();

		// Add slice hover actions, and clear any slice borders present
		this.addDataPointEventListener();

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the update event
		this.dispatchEvent("update");
	}

	updateElements(animate: boolean, gLines?: any) {
		console.log("updated called at start");
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
			.attr("d", this.areaGenerator);

		const { line: margins } = Configuration.charts.margin;
		gLines.selectAll("circle.dot")
			.data(function(d, i) {
				const parentDatum = select(this).datum() as any;

				return self.addLabelsToDataPoints(parentDatum, i);
			})
			.transition(transitionToUse)
			.attr("cx", d => this.x(new Date(d.label)))
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
		const { accessibility } = this.options;

		this.svg.selectAll("circle.dot")
			.on("click", function(d) {
				self.dispatchEvent("line-onClick", d);
			})
			.on("mouseover", function(d) {
				select(this.parentNode)
					.raise()
					.attr("opacity", 1);
				select(this)
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
