import { BaseAxisChart } from "./base-axis-chart";
import * as d3 from "d3";
import { Configuration } from "./configuration";

export class BaseAxisNewChart extends BaseAxisChart {
	x: any;
	y: any;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "bar";
		if (this.options.containerResizable) {
			this.resizeWhenContainerChange();
		}

		this.events = new EventTarget();
	}

	drawXGrid() {
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		const xGrid = d3.axisBottom(this.x)
			.tickSizeInner(-yHeight)
			.tickSizeOuter(0);
		const g = this.svg.select(".x.grid")
			.attr("transform", `translate(0, ${yHeight})`)
			.call(xGrid);

		cleanGrid(g);
	}

	drawYGrid() {
		const yGrid = d3.axisLeft(this.y)
			.tickSizeInner(-this.getActualChartSize().width)
			.tickSizeOuter(0)
			.ticks(10);
		const g = this.svg.select(".y.grid")
			.attr("transform", `translate(0, 0)`)
			.call(yGrid);

		cleanGrid(g);
	}

	updateXandYGrid() {
		const t = d3.transition().duration(750);

		// Update X Grid
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		const xGrid = d3.axisBottom(this.x)
			.tickSizeInner(-yHeight)
			.tickSizeOuter(0);

		const g_xGrid = this.svg.select(".x.grid")
			.transition(t)
			.call(xGrid);

		cleanGrid(g_xGrid);

		// Update Y Grid
		const yGrid = d3.axisLeft(this.y)
			.tickSizeInner(-this.getActualChartSize().width)
			.tickSizeOuter(0)
			.tickFormat("" as any)
			.ticks(10);
		const g_yGrid = this.svg.select(".y.grid")
			.transition(t)
			.call(yGrid);

		cleanGrid(g_yGrid);
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
