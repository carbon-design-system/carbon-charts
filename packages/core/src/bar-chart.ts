// D3 Imports
import { select, mouse } from "d3-selection";
import { scaleBand, ScaleBand } from "d3-scale";
import { min } from "d3-array";

import { BaseAxisChart } from "./base-axis-chart";
import { StackedBarChart } from "./stacked-bar-chart";
import * as Configuration from "./configuration";
import { ChartConfig, BarChartOptions, ChartType } from "./configuration";

import { Tools } from "./tools";

const getYMin = configs => {
	const { datasets } = configs.data;
	const { scales } = configs.options;
	let yMin;

	if (datasets.length === 1) {
		yMin = min(datasets[0].data);
	} else {
		yMin = min(datasets, (d: any) => (min(d.data)));
	}

	if (scales.y.yMinAdjuster) {
		yMin = scales.y.yMinAdjuster(yMin);
	}

	return yMin;
};

// returns the configured max width or the calculated bandwidth
// whichever is lower
// defaults to the calculated bandwidth if no maxWidth is defined
const getMaxBarWidth = (maxWidth, currentBandWidth) => {
	if (!maxWidth) {
		return currentBandWidth;
	}
	if (currentBandWidth <= maxWidth) {
		return currentBandWidth;
	}
	return maxWidth;
};

// returns true if the calculated bandwidth is greater than the maxWidth (if defined)
// i.e. if we should be constraining ourselves to a specific bar width
const isWidthConstrained = (maxWidth, currentBandWidth) => {
	if (!maxWidth) {
		return false;
	}
	if (currentBandWidth <= maxWidth) {
		return false;
	}
	return true;
};

export class BarChart extends BaseAxisChart {
	x1?: ScaleBand<any>;

	options: BarChartOptions;

	constructor(holder: Element, configs: ChartConfig<BarChartOptions>) {
		// If this is a stacked bar chart, change the object prototype
		if (configs.options.scales.y.stacked) {
			if (getYMin(configs) >= 0) {
				return new StackedBarChart(holder, configs);
			} else {
				console.error("Negative values are not supported in StackedBarChart, using GroupedBarChart instead to render!");
			}
		}

		super(holder, configs);

		// initialize options
		if (configs.options) {
			this.options = Tools.merge({}, Configuration.options.BAR, configs.options);
		} else {
			this.options = Tools.merge({}, Configuration.options.BAR);
		}

		// To be used for combo chart instances of a bar chart
		const { axis } = configs.options;
		if (axis) {
			const { bar: margins } = Configuration.charts.margin;
			const chartSize = this.getChartSize();
			const width = chartSize.width - margins.left - margins.right;

			this.x1 = scaleBand().rangeRound([0, width]).padding(Configuration.bars.spacing.bars);
			this.x1.domain(this.data.datasets.map(dataset => dataset.label))
				.rangeRound([0, getMaxBarWidth(Tools.getProperty(this.options, "bars", "maxWidth"), this.x.bandwidth())]);
		}

		this.options.type = ChartType.BAR;
	}

	setXScale(xScale?: any) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;

		if (xScale) {
			this.x = xScale;
		} else {
			this.x = scaleBand().rangeRound([0, width]).padding(Configuration.bars.spacing.datasets);
			this.x.domain(this.displayData.labels);
		}

		// if it's a grouped bar, use additoinal padding so the bars don't group up
		if (this.displayData.datasets.length > 1) {
			this.x1 = scaleBand().rangeRound([0, width]).padding(Configuration.bars.spacing.bars);
		} else {
			this.x1 = scaleBand().rangeRound([0, width]);
		}

		this.x1.domain(this.displayData.datasets.map(dataset => dataset.label))
			.rangeRound([0, getMaxBarWidth(Tools.getProperty(this.options, "bars", "maxWidth"), this.x.bandwidth())]);
	}

	getBarX(d) {
		if (!isWidthConstrained(Tools.getProperty(this.options, "bars", "maxWidth"), this.x.bandwidth())) {
			return this.x1(d.datasetLabel);
		}

		return (this.x.bandwidth() / 2) - (Tools.getProperty(this.options, "bars", "maxWidth") / 2);
	}

	draw() {
		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		const { bar: margins } = Configuration.charts.margin;

		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;
		const height = chartSize.height - this.getBBox(".x.axis").height;

		const gBars = this.innerWrap
			.attr("transform", `translate(${margins.left}, ${margins.top})`)
			.append("g")
			.classed("bars", true)
			.attr("width", width);

		gBars.selectAll("g")
			.data(this.displayData.labels)
			.enter()
				.append("g")
				.attr("transform", d => `translate(${this.x(d)}, 0)`)
				.selectAll("rect.bar")
				.data((d, index) => this.addLabelsToDataPoints(d, index))
					.enter()
						.append("rect")
						.classed("bar", true)
						.attr("x", this.getBarX.bind(this))
						.attr("y", d => this.y(Math.max(0, d.value)))
						.attr("width", this.x1.bandwidth())
						.attr("height", d => Math.abs(this.y(d.value) - this.y(0)))
						.attr("fill", d => this.getFillColor(d.datasetLabel, d.label, d.value))
						.attr("stroke", d => this.options.accessibility ? this.getStrokeColor(d.datasetLabel, d.label, d.value) : null)
						.attr("stroke-width", Configuration.bars.default.strokeWidth)
						.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0);

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the load event
		this.dispatchEvent("load");
	}

	interpolateValues(newData: any) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;
		const height = chartSize.height - this.getBBox(".x.axis").height;

		// Apply new data to the bars
		const g = this.innerWrap.select("g.bars")
			.attr("width", width)
			.selectAll("g")
			.data(this.displayData.labels);

		const rect = g.selectAll("rect.bar")
			.data((d, index) => this.addLabelsToDataPoints(d, index));

		this.updateElements(true, rect, g);

		// Add bar groups that need to be added now
		const addedBars = g.enter()
			.append("g")
			.classed("bars", true)
			.attr("transform", d => `translate(${this.x(d)}, 0)`);

		// Add bars that need to be added now
		g.selectAll("rect.bar")
			.data((d, index) => this.addLabelsToDataPoints(d, index))
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", this.getBarX.bind(this))
			.attr("y", d => this.y(Math.max(0, d.value)))
			.attr("width", this.x1.bandwidth())
			.attr("height", d => Math.abs(this.y(d.value) - this.y(0)))
			.style("opacity", 0)
			.transition(this.getFillTransition())
			.attr("fill", d => this.getFillColor(d.datasetLabel, d.label, d.value))
			.style("opacity", 1)
			.attr("stroke", (d: any) => this.getStrokeColor(d.datasetLabel, d.label, d.value))
			.attr("stroke-width", Configuration.bars.default.strokeWidth);

		addedBars.selectAll("rect.bar")
			.data((d, index) => this.addLabelsToDataPoints(d, index))
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", this.getBarX.bind(this))
			.attr("y", d => this.y(Math.max(0, d.value)))
			.attr("width", this.x1.bandwidth())
			.attr("height", d => Math.abs(this.y(d.value) - this.y(0)))
			.style("opacity", 0)
			.transition(this.getFillTransition())
			.attr("fill", d => this.getFillColor(d.datasetLabel, d.label, d.value))
			.style("opacity", 1)
			.attr("stroke", (d: any) => this.getStrokeColor(d.datasetLabel, d.label, d.value))
			.attr("stroke-width", Configuration.bars.default.strokeWidth);

		// Remove bar groups are no longer needed
		g.exit()
			.transition(this.getDefaultTransition())
			.style("opacity", 0)
			.remove();

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
		this.dispatchEvent("update");
	}

	updateElements(animate: boolean, rect?: any, g?: any) {
		if (!rect) {
			rect = this.innerWrap.selectAll("rect.bar");
		}

		if (g) {
			g.transition(animate ? this.getDefaultTransition() : this.getInstantTransition())
				.attr("transform", d => `translate(${this.x(d)}, 0)`)
				.style("opacity", 1);
		}

		// Update existing bars
		rect
			.transition(animate ? this.getFillTransition() : this.getInstantTransition())
			// TODO
			// .ease(d3.easeCircle)
			.style("opacity", 1)
			.attr("x", this.getBarX.bind(this))
			.attr("y", d => this.y(Math.max(0, d.value)))
			.attr("width", this.x1.bandwidth())
			.attr("height", d => Math.abs(this.y(d.value) - this.y(0)))
			.attr("fill", d => this.getFillColor(d.datasetLabel, d.label, d.value))
			.attr("stroke", d => this.options.accessibility ? this.getStrokeColor(d.datasetLabel, d.label, d.value) : null);
	}

	resizeChart() {
		const actualChartSize: any = this.getChartSize(this.container);
		const dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);

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

		// Apply new data to the bars
		const g = this.innerWrap.selectAll("g.bars g");
		this.updateElements(false, null, g);

		super.resizeChart();
	}

	addDataPointEventListener() {
		const self = this;
		const { accessibility } = this.options;

		this.svg.selectAll("rect.bar")
			.on("click", function(d) {
				self.dispatchEvent("bar-onClick", d);
			})
			.on("mouseover", function(d) {
				select(this)
					.attr("stroke-width", Configuration.bars.mouseover.strokeWidth)
					.attr("stroke", self.getStrokeColor(d.datasetLabel, d.label, d.value))
					.attr("stroke-opacity", Configuration.bars.mouseover.strokeOpacity);

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
				const { strokeWidth, strokeWidthAccessible } = Configuration.bars.mouseout;
				select(this)
					.attr("stroke-width", accessibility ? strokeWidthAccessible : strokeWidth)
					.attr("stroke", accessibility ? self.getStrokeColor(d.datasetLabel, d.label, d.value) : "none")
					.attr("stroke-opacity", Configuration.bars.mouseout.strokeOpacity);

				self.hideTooltip();
			});
	}
}
