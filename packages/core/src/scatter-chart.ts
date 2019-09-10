// D3 Imports
import { select, mouse } from "d3-selection";

import { BaseAxisChart } from "./base-axis-chart";
import * as Configuration from "./configuration";
import { ChartConfig, ScatterChartOptions, ChartType } from "./configuration";
import { Tools } from "./tools";

export class ScatterChart extends BaseAxisChart {
	options: ScatterChartOptions = Tools.merge({}, Configuration.options.SCATTER);
	// determines how sensitive the grid is for hover-selection
	gridlineThreshold: Number;

	constructor(holder: Element, configs: ChartConfig<ScatterChartOptions>) {
		super(holder, configs);

		if (configs.options) {
			this.options = Tools.merge({}, this.options, configs.options);
		}

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
			.attr("fill-opacity", d => this.getCircleFillOpacity())
			.attr("stroke", d => this.getStrokeColor(d.datasetLabel, d.label, d.value));

		// Hide the overlay
		this.chartOverlay.hide();

		// Dispatch the load event
		this.dispatchEvent("load");

		// check if gridline tooltips are set on
		if (this.options.tooltip.gridline) {
			this.addGridXEventListener();
		}
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
		// If the radius of the point is smaller than minimum
		// Or the chart is only a scatter chart
		// And not a line chart for instance
		const circleShouldBeFilled = radius < Configuration.lines.points.minNonFilledRadius || this.constructor === ScatterChart;
		if (circleShouldBeFilled) {
			return this.getStrokeColor(d.datasetLabel, d.label, d.value);
		}
		// returns null which discards any attribute allocations using return value
		return null;
	}

	getCircleFillOpacity() {
		// If the chart is only a scatter chart
		// And not a line chart for instance
		if (this.constructor === ScatterChart) {
			return Configuration.options.SCATTER.points.fillOpacity;
		}

		return null;
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
			.attr("fill-opacity", d => this.getCircleFillOpacity())
			.attr("stroke", d => this.getStrokeColor(d.datasetLabel, d.label, d.value));

		// Remove dots that are no longer needed
		gDots.exit()
			.classed("removed", true)
			.transition(this.getDefaultTransition())
			.style("opacity", 0)
			.remove();

		// Add hover tooltips
		if (this.options.tooltip.enabled) {
			this.addDataPointEventListener();
		}

		// Hide the overlay
		this.chartOverlay.hide();

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

		this.setGridlineThreshold();

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
		select(exception).attr("fill-opacity", this.getCircleFillOpacity());
		select(exception).attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
		select(exception).attr("fill", (d: any) => this.getCircleFill(circleRadius, d));
	}

	addDataPointEventListener() {
		const self = this;
		const { accessibility } = this.options;
		const circleRadius = this.getCircleRadius();

		this.svg.selectAll("circle.dot")
			.on("click", d => self.dispatchEvent("line-onClick", d))
			.on("mouseover", function(d) {
				select(this)
					.attr("stroke-width", Configuration.lines.points.mouseover.strokeWidth)
					.attr("stroke", self.colorScale[d.datasetLabel](d.label))
					.attr("stroke-opacity", Configuration.lines.points.mouseover.strokeOpacity)
					.style("fill", self.colorScale[d.datasetLabel](d.label))
					.attr("fill-opacity", Configuration.lines.points.mouseover.fillOpacity);

				self.showTooltip(d, this);
			})
			.on("mousemove", d => self.tooltip.positionTooltip())
			.on("mouseout", function(d) {
				const { strokeWidth, strokeWidthAccessible } = Configuration.lines.points.mouseout;
				select(this)
					.attr("stroke-width", accessibility ? strokeWidthAccessible : strokeWidth)
					.attr("stroke", self.colorScale[d.datasetLabel](d.label))
					.attr("stroke-opacity", Configuration.lines.points.mouseout.strokeOpacity)
					.style("fill", self.getCircleFill(circleRadius, d))
					.attr("fill-opacity", self.getCircleFillOpacity());

				self.hideTooltip();
			});
	}

	/**
	 * Sets the threshold for the gridline tooltips. On resize, the threshold needs to be
	 * updated.
	 */
	setGridlineThreshold() {
		// use the space between axis grid ticks to adjust the threshold for the tooltips
		this.gridlineThreshold = this.x.step() * Configuration.tooltip.axisTooltip.axisThreshold;
	}

	/**
	 * Retrieves the d3 selection of all points with domain label
	 * @param domain The X-Axis domain label associated with data group
	 */
	getDataWithDomain(domain: any) {
		return this.svg.selectAll("circle.dot")
		.filter(function(d) { return d.label === domain; });
	}

	/**
	 * Returns d3 selection of all data points at xPosition
	 * @param xPosition position along the X-Axis to get data points
	 */
	getDataWithXValue(xPosition) {
		return this.svg.selectAll("circle.dot")
		.filter(function() { return Number(this.attributes.cx.value) === xPosition; });
	}

	/**
	 * Adds the listener on the X grid to trigger multiple point tooltips along the x axis.
	 */
	addGridXEventListener() {
		const self = this;
		const grid = Tools.appendOrSelect(this.svg, "rect.chart-grid-backdrop");

		this.setGridlineThreshold();

		grid
		.on("mousemove", function() {
			const chartContainer = this.parentNode;
			const pos = mouse(chartContainer);

			const allgridlines = self.svg.selectAll(".x.grid .tick");
			// remove the styling on the lines
			allgridlines.classed("active", false);

			const activeGridlines = self.getActiveGridLines(pos);
			if (activeGridlines.empty()) {
				self.hideTooltip();
				return;
			}

			// set active class to control dasharray and theme colors
			activeGridlines
			.classed("active", true);

			// get the items that should be highlighted
			let highlightItems;
			activeGridlines.each(function(d) {
				if (d) {
					// prioritize using domain to get all points
					// in case there are axis lines without labels
					highlightItems = self.getDataWithDomain(d);
				} else {
					const translatePos = Tools.getTranslationValues(this);
					highlightItems = self.getDataWithXValue(+translatePos.tx - 0.5);
				}
			});
			self.showTooltip(highlightItems.data());
		})
		.on("mouseout", function() {
			self.svg.selectAll(".x.grid .tick")
			.classed("active", false);
			self.hideTooltip();
		});
	}

}
