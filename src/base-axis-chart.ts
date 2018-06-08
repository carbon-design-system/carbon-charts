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

	setXAxis() {
		const margin = {top: 0, right: -40, bottom: 50, left: 40};
		const chartSize = this.getChartSize();
		const width = chartSize.width - margin.left - margin.right;
		const height = chartSize.height - margin.top - margin.bottom;

		this.x.domain(this.data.map(d => d.label));

		const xAxis = d3.axisBottom(this.x).tickSize(0);
		let xAxisRef = this.svg.select("g.x.axis");
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

		xAxisRef.attr("transform", "translate(0," + height + ")");
		xAxisRef.selectAll("text")
			.attr("y", Configuration.axis.magicY1)
			.attr("x", Configuration.axis.magicX1)
			.attr("dy", ".35em")
			.attr("transform", `rotate(${Configuration.axis.xAxisAngle})`)
			.style("text-anchor", "end");
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

			// this.x = d3.scaleBand().rangeRound([0, chartSize.width]).padding(0.1);
			// this.y = d3.scaleLinear().rangeRound([chartSize.height, 0]);
			// this.x.domain(this.data.map(d => d.label));
			// this.y.domain([0, yHeight]);

			// const xAxis = d3.axisBottom(this.x).tickSize(0);
			// this.svg.select(".x.axis").call(xAxis);

			// const yAxis = d3.axisLeft(this.y).ticks(5).tickSize(0);
			// this.svg.select(".y.axis").call(yAxis);
		}, 0);
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
