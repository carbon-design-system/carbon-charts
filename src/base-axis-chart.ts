import * as d3 from "d3";

import { BaseChart } from "./base-chart";

import { Configuration } from "./configuration";
import { Tools } from "./tools";
import { axisBottom } from "d3";

export class BaseAxisChart extends BaseChart {
	x: any;
	y: any;
	y2: any;

	constructor(holder: Element, configs: any) {
		super(holder, configs);
	}

	setSVG(): any {
		super.setSVG();

		const chartSize = this.getChartSize();
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

		this.draw();

		this.addOrUpdateLegend();
		this.addDataPointEventListener();
	}

	update() {
		const newDisplayData = this.updateDisplayData();
		this.displayData = newDisplayData;

		this.updateXandYGrid();
		this.setXScale();
		this.setXAxis();
		this.setYScale();
		this.setYAxis();
		this.interpolateValues(newDisplayData);
	}

	updateDisplayData() {
		const oldData = Tools.passObjectByValue(this.data);
		const activeLegendItems = this.getActiveLegendItems();

		// Get new data by filtering the data based off of the legend
		const newDisplayData = Object.assign({}, oldData);
		if (this.getLegendType() === Configuration.legend.basedOn.SERIES) {
			newDisplayData.datasets = oldData.datasets.filter(dataset => {
				// If this datapoint is active on the legend
				const activeSeriesItemIndex = activeLegendItems.indexOf(dataset.label);

				return activeSeriesItemIndex > -1;
			});
		} else {
			const dataIndeciesToRemove = [];
			newDisplayData.labels = oldData.labels.filter((label, index) => {
				// If this datapoint is active on the legend
				const activeSeriesItemIndex = activeLegendItems.indexOf(label);

				if (activeSeriesItemIndex === -1) {
					dataIndeciesToRemove.push(index);
				}

				return activeSeriesItemIndex > -1;
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

		return datasets.map(dataset => {
			return {
				label: d,
				datasetLabel: dataset.label,
				value: dataset.data[index]
			};
		});
	}

	draw() {
		console.warn("You should implement your own `draw() function.");
	}

	interpolateValues(newData: any) {
		console.warn("You should implement your own `interpolateValues() function.");
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

		return computedChartSize;
	}

	resizeChart() {
		// Reposition the legend
		this.positionLegend();

		if (this.innerWrap.select(".axis-label.x").nodes().length > 0 && this.options.scales.x.title) {
			this.repositionXAxisTitle();
		}

		this.events.dispatchEvent(new Event("resize"));
	}

	/**************************************
	 *  Axis & Grids                      *
	 *************************************/

	setXScale(noAnimation?: boolean) {
		const { bar: margins } = Configuration.charts.margin;
		const { scales } = this.options;

		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;

		this.x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
		this.x.domain(this.displayData.labels);
	}

	setXAxis(noAnimation?: boolean) {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - margins.top - margins.bottom;
		const t = d3.transition().duration(noAnimation ? 0 : 750);

		const xAxis = d3.axisBottom(this.x).tickSize(0);
		let xAxisRef = this.svg.select("g.x.axis");

		// If the <g class="x axis"> exists in the chart SVG, just update it
		if (xAxisRef.nodes().length > 0) {
			xAxisRef = this.svg.select("g.x.axis")
				// .transition(t)
				.attr("transform", "translate(0," + height + ")")
				// Being cast to any because d3 does not offer appropriate typings for the .call() function
				.call(d3.axisBottom(this.x).tickSize(0) as any);
		} else {
			xAxisRef = this.innerWrap.append("g")
				.attr("class", "x axis")
				.call(xAxis);
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
		xAxisRef.select(".domain")
			.attr("stroke", Configuration.scales.domain.color)
			.attr("fill", Configuration.scales.domain.color)
			.attr("stroke-width", Configuration.scales.domain.strokeWidth);

		// Add x-axis title
		if (this.innerWrap.select(".axis-label.x").nodes().length === 0 && this.options.scales.x.title) {
			xAxisRef.append("text")
				.attr("class", "x axis-label")
				.attr("text-anchor", "middle")
				.attr("transform", "translate(" + (xAxisRef.node().getBBox().width / 2) + "," + tickHeight + ")")
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
			.attr("transform", "translate(" + (xAxisRef.node().getBBox().width / 2) + "," + tickHeight + ")")
			.text(this.options.scales.x.title);
	}

	setYScale() {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - this.innerWrap.select(".x.axis").node().getBBox().height;

		const { datasets } = this.displayData;
		const { scales } = this.options;
		let yMax;

		if (datasets.length === 1) {
			yMax = d3.max(datasets[0].data);
		} else {
			yMax = d3.max(datasets, (d: any) => d3.max(d.data));
		}

		if (scales.y.yMaxAdjuster) {
			yMax = scales.y.yMaxAdjuster(yMax);
		}

		this.y = d3.scaleLinear().rangeRound([height, 0]);
		this.y.domain([0, yMax]);

		if (scales.y2 && scales.y2.ticks.max) {
			this.y2 = d3.scaleLinear().rangeRound([height, 0]);
			this.y2.domain([scales.y2.ticks.min, scales.y2.ticks.max]);
		}
	}

	setYAxis(noAnimation?: boolean) {
		const { scales } = this.options;
		const t = d3.transition().duration(noAnimation ? 0 : 750);
		const yAxis = d3.axisLeft(this.y)
			.ticks(scales.y.numberOfTicks || 5)
			.tickSize(0)
			.tickFormat(scales.y.formatter);
		const yAxisRef = this.svg.select("g.y.axis");
		// If the <g class="y axis"> exists in the chart SVG, just update it
		if (yAxisRef.nodes().length > 0) {
			yAxisRef.transition(t)
				// Being cast to any because d3 does not offer appropriate typings for the .call() function
				.call(yAxis as any);
		} else {
			this.innerWrap.append("g")
				.attr("class", "y axis yAxes")
				.call(yAxis);
		}

		if (scales.y2 && scales.y2.ticks.max) {
			const secondaryYAxis = d3.axisRight(this.y2)
				.ticks(scales.y2.numberOfTicks || 5)
				.tickSize(0)
				.tickFormat(scales.y2.formatter);

			const secondaryYAxisRef = this.svg.select("g.y2.axis");
			// If the <g class="y axis"> exists in the chart SVG, just update it
			if (secondaryYAxisRef.nodes().length > 0) {
				secondaryYAxisRef.transition(t)
					.attr("transform", "translate(" + this.getChartSize().width + " ,0)")
					// Being cast to any because d3 does not offer appropriate typings for the .call() function
					.call(secondaryYAxis as any);
			} else {
				this.innerWrap.append("g")
					.attr("class", "y2 axis yAxes")
					.attr("transform", "translate(" + this.getChartSize().width + " ,0)")
					.call(secondaryYAxis);
			}
		}
	}

	drawXGrid() {
		const yHeight = this.getChartSize().height - this.getBBox(".x.axis").height;
		const xGrid = d3.axisBottom(this.x)
			.tickSizeInner(-yHeight)
			.tickSizeOuter(0);

		const g = this.innerWrap.select(".x.grid")
			.attr("transform", `translate(0, ${yHeight})`)
			.call(xGrid);

		this.cleanGrid(g);
	}

	drawYGrid() {
		const yHeight = this.getChartSize().height - this.getBBox(".x.axis").height;
		const yGrid = d3.axisLeft(this.y)
			.tickSizeInner(-(this.getChartSize().width))
			.tickSizeOuter(0)
			.ticks(10);
		const g = this.innerWrap.select(".y.grid")
			.attr("transform", `translate(0, 0)`)
			.call(yGrid);

		this.cleanGrid(g);
	}

	updateXandYGrid(noAnimation?: boolean) {
		// setTimeout is needed here, to take into account the new position of bars
		// Right after transitions are initiated for the
		setTimeout(() => {
			const t = d3.transition().duration(noAnimation ? 0 : 750);

			// Update X Grid
			const chartSize = this.getChartSize();
			const yHeight = chartSize.height - this.getBBox(".x.axis").height;
			const xGrid = d3.axisBottom(this.x)
				.tickSizeInner(-yHeight)
				.tickSizeOuter(0);

			const g_xGrid = this.innerWrap.select(".x.grid")
				.transition(t)
				.attr("transform", `translate(0, ${yHeight})`)
				.call(xGrid);

			this.cleanGrid(g_xGrid);

			// Update Y Grid
			const yGrid = d3.axisLeft(this.y)
				.tickSizeInner(-(chartSize.width))
				.tickSizeOuter(0)
				.tickFormat("" as any)
				.ticks(10);
			const g_yGrid = this.innerWrap.select(".y.grid")
				.transition(t)
				.attr("transform", `translate(0, 0)`)
				.call(yGrid);

			this.cleanGrid(g_yGrid);
		}, 0);
	}

	cleanGrid (g) {
		g.selectAll("line")
			.attr("stroke", Configuration.grid.strokeColor);
		g.selectAll("text").style("display", "none").remove();
		g.select(".domain").style("stroke", "none");
		g.select(".tick").remove();
	}

	// TODO - Refactor
	wrapTick(ticks) {
		const self = this;
		const letNum = Configuration.scales.tick.maxLetNum;
		ticks.each(function(t) {
			if (t && t.length > letNum / 2) {
				const tick = d3.select(this);
				const y = tick.attr("y");
				tick.text("");
				const tspan1 = tick.append("tspan")
					.attr("x", 0).attr("y", y).attr("dx", Configuration.scales.dx).attr("dy", `-${Configuration.scales.tick.dy}`);
				const tspan2 = tick.append("tspan")
					.attr("x", 0).attr("y", y).attr("dx", Configuration.scales.dx).attr("dy", Configuration.scales.tick.dy);
				if (t.length < letNum - 3) {
					tspan1.text(t.substring(0, t.length / 2));
					tspan2.text(t.substring(t.length / 2 + 1, t.length));
				} else {
					tspan1.text(t.substring(0, letNum / 2));
					tspan2.text(t.substring(letNum / 2, letNum - 3) + "...");
					tick.on("click", dd => {
						self.showLabelTooltip(dd, true);
					});
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
		const self = this;
		const { accessibility } = this.options;

		this.svg.selectAll("rect")
			.on("mouseover", function(d) {
				d3.select(this)
					.attr("stroke-width", Configuration.bars.mouseover.strokeWidth)
					.attr("stroke", self.colorScale[d.datasetLabel](d.label))
					.attr("stroke-opacity", Configuration.bars.mouseover.strokeOpacity);
			})
			.on("mouseout", function(d) {
				d3.select(this)
					.attr("stroke-width", accessibility ? 2 : Configuration.bars.mouseout.strokeWidth)
					.attr("stroke", accessibility ? self.colorScale[d.datasetLabel](d.label) : "none")
					.attr("stroke-opacity", Configuration.bars.mouseout.strokeOpacity);
			})
			.on("click", function(d) {
				self.showTooltip(d, this);
				self.reduceOpacity(this);
			});

		this.svg.selectAll("circle.dot")
			.on("mouseover", function(d) {
				d3.select(this)
					.attr("stroke", self.colorScale[d.datasetLabel](d.label))
					.attr("stroke-opacity", Configuration.lines.points.mouseover.strokeOpacity);
			})
			.on("mouseout", function(d) {
				d3.select(this)
					.attr("stroke", self.colorScale[d.datasetLabel](d.label))
					.attr("stroke-opacity", Configuration.lines.points.mouseout.strokeOpacity);
			})
			.on("click", function(d) {
				self.showTooltip(d, this);
				self.reduceOpacity(this);
			});
	}
}
