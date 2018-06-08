import * as d3 from "d3";

import { BaseChart } from "./base-chart";

import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class BaseAxisChart extends BaseChart {
	x: any;
	y: any;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "bar";
	}

	setSVG(): any {
		super.setSVG();

		const chartSize = this.getChartSize();

		this.container.classed(`chart-${this.options.type}`, true);
		this.innerWrap.append("g")
			.attr("class", "x grid");
		this.innerWrap.append("g")
			.attr("class", "y grid");

		return this.svg;
	}

	initialDraw(data?: any) {
		if (data) {
			this.data = data;
		}

		this.setSVG();

		// Set the color scale based on the keys present in the data
		const keys = this.data.map(dataPoint => dataPoint.label);
		this.setColorScale(keys);

		// Scale out the domains
		this.setXScale();
		this.setYScale();

		// Set the x & y axis as well as their labels
		this.setXAxis();
		this.setYAxis();

		// Draw the x & y grid
		this.drawXGrid();
		this.drawYGrid();

		this.draw();

		this.addOrUpdateLegend();
		this.addDataPointEventListener();
	}

	update(newData?: any) {
		const oldData = this.data;
		const activeLegendItems = this.getActiveLegendItems();
		if (newData === undefined) {
			// Get new data by filtering the data based off of the legend
			newData = oldData.filter(dataPoint => {
				// If this datapoint is active on the legend
				const activeSeriesItemIndex = activeLegendItems.indexOf(dataPoint.label);

				return activeSeriesItemIndex > -1;
			});
		}

		this.updateXandYGrid();
		this.setXScale();
		this.setXAxis();
		this.setYScale();
		this.setYAxis();
		this.interpolateValues(newData);
	}

	/**************************************
	 *  Computations/Calculations         *
	 *************************************/

	getChartSize(container = this.container) {
		let ratio, marginForLegendTop;
		let moreForY2Axis = 0;
		if (container.node().clientWidth > Configuration.charts.widthBreak) {
			ratio = Configuration.charts.magicRatio;
			marginForLegendTop = 0;
		} else {
			marginForLegendTop = Configuration.charts.marginForLegendTop;
			ratio = 1;
		}

		if (this.options.type === "double-axis-line" || this.options.type === "combo") {
			moreForY2Axis = Configuration.charts.magicMoreForY2Axis;
		}

		// Store computed actual size, to be considered for change if chart does not support axis
		const marginsToExclude = Configuration.charts.margin.left + Configuration.charts.margin.right;
		const computedChartSize = {
			height: container.node().clientHeight - marginForLegendTop,
			width: (container.node().clientWidth - marginsToExclude - moreForY2Axis) * ratio
		};

		return computedChartSize;
	}

	/**************************************
	 *  Axis & Grids                      *
	 *************************************/

	setXScale() {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const width = chartSize.width - margins.left - margins.right;

		this.x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
		this.x.domain(this.data.map(d => d.label));
	}

	setXAxis() {
		const margin = {top: 0, right: -40, bottom: 50, left: 40};
		const chartSize = this.getChartSize();
		const height = chartSize.height - margin.top - margin.bottom;

		const xAxis = d3.axisBottom(this.x).tickSize(0);
		let xAxisRef = this.svg.select("g.x.axis");

		// If the <g class="x axis"> exists in the chart SVG, just update it
		if (xAxisRef.nodes().length > 0) {
			xAxisRef = this.svg.select("g.x.axis")
				.transition()
				.duration(750)
				.attr("transform", "translate(0," + height + ")")
				// Being cast to any because d3 does not offer appropriate typings for the .call() function
				.call(d3.axisBottom(this.x).tickSize(0) as any);
		} else {
			xAxisRef = this.innerWrap.append("g")
				.attr("class", "x axis")
				.call(xAxis);
		}

		// Update the position of the x-axis and all the pieces of text inside it
		xAxisRef.attr("transform", "translate(0," + height + ")");
		xAxisRef.selectAll("text")
			.attr("y", Configuration.axis.magicY1)
			.attr("x", Configuration.axis.magicX1)
			.attr("dy", ".35em")
			.attr("transform", `rotate(${Configuration.axis.xAxisAngle})`)
			.style("text-anchor", "end");
	}

	setYScale() {
		const { bar: margins } = Configuration.charts.margin;
		const chartSize = this.getChartSize();
		const height = chartSize.height - margins.top - margins.bottom;
		const yEnd = d3.max(this.data, (d: any) => d.value);

		this.y = d3.scaleLinear().rangeRound([height, 0]);
		this.y.domain([0, yEnd]);
	}

	setYAxis() {
		const yAxis = d3.axisLeft(this.y).ticks(5).tickSize(0);

		const yAxisRef = this.svg.select("g.y.axis");
		// If the <g class="y axis"> exists in the chart SVG, just update it
		if (yAxisRef.nodes().length > 0) {
			yAxisRef.transition()
				.duration(750)
				// Being cast to any because d3 does not offer appropriate typings for the .call() function
				.call(yAxis as any);
		} else {
			this.innerWrap.append("g")
				.attr("class", "y axis")
				.call(yAxis);
		}
	}

	setColorScale(keys: any) {
		this.color = d3.scaleOrdinal().range(this.options.colors).domain(keys);
	}

	drawXGrid() {
		const yHeight = this.getChartSize().height - this.innerWrap.select(".x.axis").node().getBBox().height;
		const xGrid = d3.axisBottom(this.x)
			.tickSizeInner(-yHeight)
			.tickSizeOuter(0);
		const g = this.innerWrap.select(".x.grid")
			.attr("transform", `translate(0, ${yHeight})`)
			.call(xGrid);

		cleanGrid(g);
	}

	drawYGrid() {
		const yGrid = d3.axisLeft(this.y)
			.tickSizeInner(-(this.getChartSize().width))
			.tickSizeOuter(0)
			.ticks(10);
		const g = this.innerWrap.select(".y.grid")
			.attr("transform", `translate(0, 0)`)
			.call(yGrid);

		cleanGrid(g);
	}

	updateXandYGrid(instant?: boolean) {
		// setTimeout is needed here, to take into account the new position of bars
		// Right after transitions are initiated for the
		setTimeout(() => {
			const t = d3.transition().duration(instant ? 0 : 750);

			// Update X Grid
			const chartSize = this.getChartSize();
			const yHeight = chartSize.height - this.innerWrap.select(".x.axis").node().getBBox().height;
			const xGrid = d3.axisBottom(this.x)
				.tickSizeInner(-yHeight)
				.tickSizeOuter(0);

			const g_xGrid = this.innerWrap.select(".x.grid")
				.transition(t)
				.attr("transform", `translate(0, ${yHeight})`)
				.call(xGrid);

			cleanGrid(g_xGrid);

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

			cleanGrid(g_yGrid);
		}, 0);
	}

	/**************************************
	 *  Events & User interactions        *
	 *************************************/

	addDataPointEventListener() {
		const self = this;
		this.svg.selectAll("rect")
			.on("mouseover", function(d) {
				d3.select(this)
					.attr("stroke-width", Configuration.bars.mouseover.strokeWidth)
					.attr("stroke", self.color(d.label))
					.attr("stroke-opacity", Configuration.bars.mouseover.strokeOpacity);
			})
			.on("mouseout", function() {
				d3.select(this)
					.attr("stroke-width", Configuration.bars.mouseout.strokeWidth)
					.attr("stroke", "none")
					.attr("stroke-opacity", Configuration.bars.mouseout.strokeOpacity);
			})
			.on("click", function(d) {
				self.showTooltip(d);
				self.reduceOpacity(this);
			});
	}
}

// Helper functions
const cleanGrid = g => {
	g.selectAll("line")
		.attr("stroke", Configuration.grid.strokeColor);
	g.selectAll("text").style("display", "none").remove();
	g.select(".domain").style("stroke", "none");
	g.select(".tick").remove();
};
