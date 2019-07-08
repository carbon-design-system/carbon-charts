// D3 Imports
import { select } from "d3-selection";
import { scaleBand, scaleLinear, ScaleBand, ScaleLinear } from "d3-scale";
import { axisBottom, axisLeft, axisRight, AxisScale, AxisDomain } from "d3-axis";
import { min, max } from "d3-array";

import { BaseChart } from "./base-chart";

import * as Configuration from "./configuration";
import { ChartConfig, AxisChartOptions } from "./configuration";
import { Tools } from "./tools";

export class BaseAxisChart extends BaseChart {
	x: ScaleBand<any>;
	y: ScaleLinear<any, any>;
	y2: ScaleLinear<any, any>;
	thresholdDimensions: any;

	options: any = Tools.merge({}, Configuration.options.AXIS);

	constructor(holder: Element, configs: ChartConfig<AxisChartOptions>) {
		super(holder, configs);

		if (configs.options) {
			this.options = Tools.merge({}, this.options, configs.options);
			const { axis } = configs.options;
			if (axis) {
				this.x = axis.x;
				this.y = axis.y;
				this.y2 = axis.y2;
			}
		}
	}

	setSVG(): any {
		super.setSVG();

		this.container.classed("chart-axis", true);
		this.innerWrap.append("g")
			.attr("class", "x grid");
		this.innerWrap.append("g")
			.attr("class", "y grid");

		return this.svg;
	}

	initialDraw(data?: any) {
		if (data) {
			this.displayData = data;
		}

		// If an axis exists
		const xAxisRef = select(this.holder).select(".axis.x");
		if (!xAxisRef.node()) {
			this.setSVG();

			// Scale out the domains
			// Set the x & y axis as well as their labels
			this.setXScale();
			this.setXAxis();
			this.setYScale();
			this.setYAxis();

			// Draw the x & y grid
			this.drawXGrid();
			this.drawYGrid();
			// Draw the backdrop
			this.drawBackdrop();

			this.addOrUpdateLegend();
		} else {
			const holderRef = select(this.holder);

			this.innerWrap = holderRef.select("g.inner-wrap");
			this.svg = holderRef.select("svg.chart-svg");
		}

		this.draw();

		this.addDataPointEventListener();
	}

	update() {
		this.displayData = this.updateDisplayData();

		this.updateXandYGrid();
		this.setXScale();
		this.setXAxis();
		this.setYScale();
		this.setYAxis();
		this.interpolateValues(this.displayData);
	}

	updateDisplayData() {
		const oldData = Tools.clone(this.data);
		const activeLegendItems = this.getActiveLegendItems();

		// Get new data by filtering the data based off of the legend
		const newDisplayData = Object.assign({}, oldData);
		if (this.getLegendType() === Configuration.legend.basedOn.SERIES) {
			newDisplayData.datasets = oldData.datasets.filter(dataset => {
				// If this datapoint is active on the legend
				const activeSeriesItemIndex = activeLegendItems.indexOf(dataset.label);

				return activeSeriesItemIndex !== -1;
			});
		} else {
			const dataIndeciesToRemove = [];
			newDisplayData.labels = oldData.labels.filter((label, index) => {
				// If this datapoint is active on the legend
				const activeSeriesItemIndex = activeLegendItems.indexOf(label);

				if (activeSeriesItemIndex === -1) {
					dataIndeciesToRemove.push(index);
				}

				return activeSeriesItemIndex !== -1;
			});

			if (dataIndeciesToRemove.length > 0) {
				newDisplayData.datasets = oldData.datasets.map(dataset => {
					dataset.data = dataset.data.filter((dataPoint, i) => {
						return dataIndeciesToRemove.indexOf(i) === -1;
					});

					return dataset;
				});
			}
		}

		return newDisplayData;
	}

	addLabelsToDataPoints(d, index) {
		const { datasets } = this.displayData;

		return datasets.map(dataset => ({
			label: d,
			datasetLabel: dataset.label,
			value: dataset.data[index]
		}));
	}

	draw() {
		console.warn("You should implement your own `draw()` function.");
	}

	interpolateValues(newData: any) {
		console.warn("You should implement your own `interpolateValues()` function.");
	}

	/**************************************
	 *  Computations/Calculations         *
	 *************************************/
	// TODO - Refactor
	getChartSize(container = this.container) {
		let ratio, marginForLegendTop;
		if (container.node().clientWidth > Configuration.charts.widthBreak) {
			ratio = Configuration.charts.magicRatio;
			marginForLegendTop = 0;
		} else {
			marginForLegendTop = Configuration.charts.marginForLegendTop;
			ratio = 1;
		}

		// Store computed actual size, to be considered for change if chart does not support axis
		const marginsToExclude = Configuration.charts.margin.left + Configuration.charts.margin.right;
		const computedChartSize = {
			height: container.node().clientHeight - marginForLegendTop,
			width: (container.node().clientWidth - marginsToExclude) * ratio
		};

		return {
			height: Math.max(computedChartSize.height, Configuration.charts.axisCharts.minHeight),
			width: Math.max(computedChartSize.width, Configuration.charts.axisCharts.minWidth)
		};
	}

	resizeChart() {
		// Reposition the legend
		this.positionLegend();

		if (this.innerWrap.select(".axis-label.x").nodes().length > 0 || this.options.scales.x.title) {
			this.repositionXAxisTitle();
		}

		if (this.innerWrap.select(".axis-label.y").nodes().length > 0 || this.options.scales.y.title) {
			this.repositionYAxisTitle();
		}

		this.dispatchEvent("resize");
	}

	/**************************************
	 *  Axis & Grids                      *
	 *************************************/

	setXScale(xScale?: any) {
		if (xScale) {
			this.x = xScale;
		} else {
			const { bar: margins } = Configuration.charts.margin;
			const { scales } = this.options;

			const chartSize = this.getChartSize();
			const width = chartSize.width - margins.left - margins.right;

			this.x = scaleBand().rangeRound([0, width]).padding(Configuration.scales.x.padding);
			this.x.domain(this.displayData.labels);
		}
	}

	setXAxis(noAnimation?: boolean) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - margins.top - margins.bottom;

		const t = noAnimation ? this.getInstantTransition() : this.getDefaultTransition();

		const xAxis = axisBottom(this.x)
			.tickSize(0)
			.tickSizeOuter(0);
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

	repositionXAxisTitle() {
		const xAxisRef = this.svg.select("g.x.axis");
		const tickHeight = this.getLargestTickHeight(xAxisRef.selectAll(".tick")) + Configuration.scales.tick.heightAddition;

		const xAxisTitleRef = this.svg.select("g.x.axis text.x.axis-label");
		xAxisTitleRef.attr("class", "x axis-label")
			.attr("text-anchor", "middle")
			.attr("transform", `translate(${xAxisRef.node().getBBox().width / 2}, ${tickHeight})`)
			.text(this.options.scales.x.title);
	}

	repositionYAxisTitle() {
		const yAxisRef = this.svg.select("g.y.axis");
		const tickHeight = this.getLargestTickHeight(yAxisRef.selectAll(".tick"));

		const yAxisTitleRef = this.svg.select("g.y.axis text.y.axis-label");

		const yAxisCenter = yAxisRef.node().getBBox().height / 2;
		const yAxisLabelWidth = this.innerWrap.select(".axis-label.y").node().getBBox().width;

		const yAxisTitleTranslate = {
			x: - yAxisCenter + yAxisLabelWidth / 2,
			y: - (tickHeight + Configuration.scales.tick.heightAddition)
		};

		// Align y axis title with y axis
		yAxisTitleRef.attr("class", "y axis-label")
		.attr("text-align", "center")
		.attr("transform", `rotate(-90) translate(${yAxisTitleTranslate.x}, ${yAxisTitleTranslate.y})`)
		.text(this.options.scales.y.title);
	}

	getYMax() {
		const { datasets } = this.displayData;
		const { scales } = this.options;
		let yMax;

		if (datasets.length === 1) {
			yMax = max(datasets[0].data);
		} else {
			yMax = max(datasets, (d: any) => (max(d.data)));
		}

		if (scales.y.yMaxAdjuster) {
			yMax = scales.y.yMaxAdjuster(yMax);
		}

		return yMax;
	}

	getYMin() {
		const { datasets } = this.displayData;
		const { scales } = this.options;
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
	}

	setYScale(yScale?: any) {
		const chartSize = this.getChartSize();
		const height = chartSize.height - this.innerWrap.select(".x.axis").node().getBBox().height;

		const { scales } = this.options;

		const yMin = this.getYMin();
		const yMax = this.getYMax();
		if (yScale) {
			this.y = yScale;
		} else {
			this.y = scaleLinear().range([height, 0]);
			this.y.domain([Math.min(yMin, 0), yMax]);
		}

		if (scales.y2 && scales.y2.ticks.max) {
			this.y2 = scaleLinear().rangeRound([height, 0]);
			this.y2.domain([scales.y2.ticks.min, scales.y2.ticks.max]);
		}
	}

	setYAxis(noAnimation?: boolean) {
		const chartSize = this.getChartSize();

		const { scales } = this.options;
		const t = noAnimation ? this.getInstantTransition() : this.getDefaultTransition();

		const yAxis = axisLeft(this.y)
			.ticks(scales.y.numberOfTicks || Configuration.scales.y.numberOfTicks)
			.tickSize(0)
			.tickFormat(scales.y.formatter);

		let yAxisRef = this.svg.select("g.y.axis");
		const horizontalLine = this.svg.select("line.domain");

		this.svg.select("g.x.axis path.domain")
			.remove();

		// If the <g class="y axis"> exists in the chart SVG, just update it
		if (yAxisRef.nodes().length > 0) {
			yAxisRef.transition(t)
				// Casting to any because d3 does not offer appropriate typings for the .call() function
				.call(yAxis as any);

			horizontalLine.transition(t)
				.attr("y1", this.y(0))
				.attr("y2", this.y(0))
				.attr("x1", 0)
				.attr("x2", chartSize.width);
		} else {
			yAxisRef = this.innerWrap.append("g")
				.attr("class", "y axis yAxes");

			yAxisRef.call(yAxis);

			yAxisRef.append("line")
				.classed("domain", true)
				.attr("y1", this.y(0))
				.attr("y2", this.y(0))
				.attr("x1", 0)
				.attr("x2", chartSize.width);
		}

		const tickHeight = this.getLargestTickHeight(yAxisRef.selectAll(".tick"));

		// Add y-axis title
		if (this.innerWrap.select(".axis-label.y").nodes().length === 0 && this.options.scales.y.title) {
			yAxisRef.append("text")
				.attr("class", "y axis-label")
				.text(this.options.scales.y.title);

			const yAxisCenter = yAxisRef.node().getBBox().height / 2;
			const yAxisLabelWidth = this.innerWrap.select(".axis-label.y").node().getBBox().width;

			const yAxisTitleTranslate = {
				x: - yAxisCenter + yAxisLabelWidth / 2,
				y: - (tickHeight + Configuration.scales.tick.heightAddition)
			};

			// Align y axis title on the y axis
			this.innerWrap.select(".axis-label.y")
				.attr("transform", `rotate(-90) translate(${yAxisTitleTranslate.x}, ${yAxisTitleTranslate.y})`);
		}

		Tools.moveToFront(horizontalLine);

		if (scales.y2 && scales.y2.ticks.max) {
			const secondaryYAxis = axisRight(this.y2)
				.ticks(scales.y2.numberOfTicks || Configuration.scales.y2.numberOfTicks)
				.tickSize(0)
				.tickFormat(scales.y2.formatter);

			const secondaryYAxisRef = this.svg.select("g.y2.axis");
			// If the <g class="y axis"> exists in the chart SVG, just update it
			if (secondaryYAxisRef.nodes().length > 0) {
				secondaryYAxisRef.transition(t)
					.attr("transform", `translate(${this.getChartSize().width}, 0)`)
					// Being cast to any because d3 does not offer appropriate typings for the .call() function
					.call(secondaryYAxis as any);
			} else {
				this.innerWrap.append("g")
					.attr("class", "y2 axis yAxes")
					.attr("transform", `translate(${this.getChartSize().width}, 0)`)
					.call(secondaryYAxis);
			}
		}
	}

	drawXGrid() {
		const yHeight = this.getChartSize().height - this.getBBox(".x.axis").height;
		const xGrid = axisBottom(this.x)
			.tickSizeInner(-yHeight)
			.tickSizeOuter(0);

		const g = this.innerWrap.select(".x.grid")
			.attr("transform", `translate(0, ${yHeight})`)
			.call(xGrid);

		this.cleanGrid(g);
	}

	drawYGrid() {
		const { scales } = this.options;
		const { thresholds } = this.options.scales.y;
		const yHeight = this.getChartSize().height - this.getBBox(".x.axis").height;

		const yGrid = axisLeft(this.y)
			.tickSizeInner(-this.getChartSize().width)
			.tickSizeOuter(0);

		yGrid.ticks(scales.y.numberOfTicks || Configuration.scales.y.numberOfTicks);

		const g = this.innerWrap.select(".y.grid")
			.attr("transform", "translate(0, 0)")
			.call(yGrid);

		this.cleanGrid(g);

		if (thresholds && thresholds.length > 0) {
			this.addOrUpdateThresholds(g, false);
		}
	}

	drawBackdrop() {
		// Get height from the grid
		const xgrid = this.innerWrap.select(".x.grid").node().getBBox().height;
		const ygrid = this.innerWrap.select(".y.grid").node().getBBox();

		this.innerWrap
			.append("rect")
			.classed("chart-grid-backdrop", true)
			.attr("x", ygrid.x)
			.attr("y", ygrid.y)
			.attr("width", ygrid.width)
			.attr("height", xgrid)
			.lower();
	}

	addOrUpdateThresholds(yGrid, animate?) {
		const t = animate === false ? this.getInstantTransition() : this.getDefaultTransition();

		const width = this.getChartSize().width;
		const { thresholds } = this.options.scales.y;

		// Check if the thresholds container <g> exists
		const thresholdContainerExists = this.innerWrap.select("g.thresholds").nodes().length > 0;
		const thresholdRects = thresholdContainerExists
			? this.innerWrap.selectAll("g.thresholds rect")
			: this.innerWrap.append("g").classed("thresholds", true).selectAll("rect").data(thresholds);

		const calculateYPosition = d => {
			return Math.max(0, this.y(d.range[1]));
		};

		const calculateHeight = d => {
			const height = Math.abs(this.y(d.range[1]) - this.y(d.range[0]));
			const yMax = this.y(this.y.domain()[0]);

			// If the threshold is getting cropped because it is extending beyond
			// the top of the chart, update its height to reflect the crop
			if (this.y(d.range[1]) < 0) {
				return Math.max(0, height + this.y(d.range[1]));
			} else if (this.y(d.range[1]) + height > yMax) {
				// If the threshold is getting cropped because it is extending beyond
				// the bottom of the chart, update its height to reflect the crop
				return Math.max(0, yMax - calculateYPosition(d));
			}

			return Math.max(0, height);
		};

		const calculateOpacity = d => {
			const height = Math.abs(this.y(d.range[1]) - this.y(d.range[0]));

			// If the threshold is to be shown anywhere
			// outside of the top edge of the chart, hide it
			if (this.y(d.range[1]) + height <= 0) {
				return 0;
			}

			return 1;
		};

		// Applies to thresholds being added
		thresholdRects.enter()
			.append("rect")
			.classed("threshold-bar", true)
			.attr("x", 0)
			.attr("y", d => calculateYPosition(d))
			.attr("width", width)
			.attr("height", d => calculateHeight(d))
			.attr("fill", d => Configuration.scales.y.thresholds.colors[d.theme])
			.style("opacity", 0)
			.transition(t)
			.style("opacity", d => calculateOpacity(d));

		// Update thresholds
		thresholdRects
			.transition(t)
			.attr("x", 0)
			.attr("y", d => calculateYPosition(d))
			.attr("width", width)
			.attr("height", d => calculateHeight(d))
			.style("opacity", d => calculateOpacity(d))
			.attr("fill", d => Configuration.scales.y.thresholds.colors[d.theme]);

		// Applies to thresholds getting removed
		thresholdRects.exit()
			.transition(t)
			.style("opacity", 0)
			.remove();
	}

	updateXandYGrid(noAnimation?: boolean) {
		const { thresholds } = this.options.scales.y;

		// setTimeout is needed here, to take into account the new position of bars
		// Right after transitions are initiated for the
		setTimeout(() => {
			const t = noAnimation ? this.getInstantTransition() : this.getDefaultTransition();

			// Update X Grid
			const chartSize = this.getChartSize();
			const yHeight = chartSize.height - this.getBBox(".x.axis").height;
			const xGrid = axisBottom(this.x)
				.tickSizeInner(-yHeight)
				.tickSizeOuter(0);

			const g_xGrid = this.innerWrap.select(".x.grid")
				.transition(t)
				.attr("transform", `translate(0, ${yHeight})`)
				.call(xGrid);

			this.cleanGrid(g_xGrid);

			// Update Y Grid
			const yGrid = axisLeft(this.y)
				.tickSizeInner(-chartSize.width)
				.tickSizeOuter(0)
				.tickFormat("" as any);

			const g_yGrid = this.innerWrap.select(".y.grid")
				.transition(t)
				.attr("transform", `translate(0, 0)`)
				.call(yGrid);

			g_yGrid.transition(t);

			this.cleanGrid(g_yGrid);

			if (thresholds && thresholds.length > 0) {
				this.addOrUpdateThresholds(g_yGrid, !noAnimation);
			}
		}, 0);
	}

	cleanGrid(g) {
		g.selectAll("line")
			.attr("stroke", Configuration.grid.strokeColor);
		g.selectAll("text").style("display", "none").remove();
		g.select(".domain").style("stroke", "none");
	}

	// TODO - Refactor
	wrapTick(ticks) {
		const self = this;
		const lineHeight = Configuration.scales.tick.lineHeight;

		ticks.each(function (t) {
			const text = select(this);
			let textContent = text.text();

			// If the text has already been broken down into parts
			if (text.selectAll("tspan").nodes().length > 1) {
				textContent = text.selectAll("tspan")
					.nodes()
					.map(node => select(node).text())
					.join(" ");
			}

			const words = textContent.split(/\s+/).reverse();
			const y = text.attr("y");
			const dy = parseFloat(text.attr("dy"));

			let word;
			let line = [];
			let lineNumber = 0;
			let tspan = text.text(null)
				.append("tspan")
				.attr("x", 0);

			// Set max length allowed to length of datapoints
			// In the x-scale
			const maxTextLengthAllowed = self.x.bandwidth();
			while (word = words.pop()) {
				line.push(word);
				tspan.text(line.join(" "));

				// Get text length and compare to maximum length allowed
				const tspanTextLength = tspan.node().getComputedTextLength();
				if (tspanTextLength > maxTextLengthAllowed) {
					line.pop();
					tspan.text(line.join(" "));
					line = [word];

					tspan = text.append("tspan")
						.attr("x", 0)
						.attr("y", y)
						.attr("dy", ++lineNumber * lineHeight + dy + "em")
						.text(word);
				}
			}
		});
	}

	// TODO - Refactor
	getLargestTickHeight(ticks) {
		let largestHeight = 0;
		ticks.each(function() {
			let tickLength = 0;
			try {
				tickLength = this.getBBox().height;
			} catch (e) {
				console.log(e);
			}
			if (tickLength > largestHeight) {
				largestHeight = tickLength;
			}

		});
		return largestHeight;
	}

	/**************************************
	 *  Events & User interactions        *
	 *************************************/
	addDataPointEventListener() {
		console.warn("You should implement your own `addDataPointEventListener()` function.");
	}
}
