// D3 Imports
import { select, mouse } from "d3-selection";

import { BaseAxisChart } from "./base-axis-chart";
import * as Configuration from "./configuration";
import { ChartConfig, ScatterChartOptions, ChartType } from "./configuration";
import { Tools } from "./tools";

export class ScatterChart extends BaseAxisChart {
	options: ScatterChartOptions = Tools.merge({}, Configuration.options.SCATTER);

	constructor(holder: Element, configs: ChartConfig<ScatterChartOptions>) {
		super(holder, configs);

		this.options.type = ChartType.SCATTER;
	}

	draw() {
		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		const { line: margins } = Configuration.charts.margin;

		this.innerWrap.style("width", "100%").style("height", "100%");

		this.innerWrap.attr("transform", `translate(${margins.left}, ${margins.top})`);

		const gDots = this.innerWrap.selectAll("g.dots")
			.data(this.displayData.datasets)
			.enter()
				.append("g")
				.classed("dots", true);

		const circleRadius = this.getCircleRadius();
		gDots.selectAll("circle.dot")
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

	getCircleRadius() {
		return this.options.points.radius || Configuration.charts.points.radius;
	}

	getCircleFill(radius, d) {
		const circleShouldBeFilled = radius < Configuration.lines.points.minNonFilledRadius;
		return circleShouldBeFilled ? this.getStrokeColor(d.datasetLabel, d.label, d.value) : "white";
	}

	interpolateValues(newData: any) {
		const { line: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;
		const height = chartSize.height - this.getBBox(".x.axis").height;

		// Apply new data to the lines
		const gDots = this.innerWrap.selectAll("g.dots")
			.data(newData.datasets);

		this.updateElements(true, gDots);

		// Add lines that need to be added now
		const addedDotGroups = gDots.enter()
			.append("g")
			.classed("dots", true);

		// Add line circles
		const circleRadius = this.getCircleRadius();
		addedDotGroups.selectAll("circle.dot")
			.data((d, i) => this.addLabelsToDataPoints(d, i))
			.enter()
				.append("circle")
				.attr("class", "dot")
				.attr("cx", (d, i) => this.x(d.label) + this.x.step() / 2)
				.attr("cy", (d: any) => this.y(d.value))
				.attr("r", circleRadius)
				.style("opacity", 0)
				.transition(this.getDefaultTransition())
				.style("opacity", 1)
				.attr("fill", d => this.getCircleFill(circleRadius, d))
				.attr("stroke", d => this.getStrokeColor(d.datasetLabel, d.label, d.value));

		// Remove dots that are no longer needed
		gDots.exit()
			.classed("removed", true)
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

	updateElements(animate: boolean, gDots?: any) {
		if (!gDots) {
			gDots = this.innerWrap.selectAll("g.dots");
		}

		const transitionToUse = animate ? this.getFillTransition() : this.getInstantTransition();
		const self = this;

		const circleRadius = this.getCircleRadius();
		gDots.selectAll("circle.dot")
			.data(function(d, i) {
				const parentDatum = select(this).datum() as any;

				return self.addLabelsToDataPoints(parentDatum, i);
			})
			.transition(transitionToUse)
			.attr("cx", d => this.x(d.label) + this.x.step() / 2)
			.attr("cy", d => this.y(d.value))
			.attr("r", circleRadius)
			.attr("fill", d => this.getCircleFill(circleRadius, d))
			.attr("stroke", d => this.getStrokeColor(d.datasetLabel, d.label, d.value));
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

	setXScale () {
		super.setXScale();

		this.x.padding(0); // override BaseAxisChart padding so points aren't misaligned by a few pixels.
	}

	resetOpacity() {
		const circleRadius = this.getCircleRadius();
		this.innerWrap.selectAll("circle")
			.attr("stroke-opacity", Configuration.charts.resetOpacity.opacity)
			.attr("fill", d => this.getCircleFill(circleRadius, d));
	}

	reduceOpacity(exception) {
		const circleRadius = this.getCircleRadius();
		select(exception).attr("fill-opacity", false);
		select(exception).attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
		select(exception).attr("fill", (d: any) => this.getCircleFill(circleRadius, d));
	}

	addDataPointEventListener() {
		const self = this;
		const { accessibility } = this.options;

		this.svg.selectAll("circle.dot")
			.on("click", function(d) {
				self.dispatchEvent("line-onClick", d);
			})
			.on("mouseover", function(d) {
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
