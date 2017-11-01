import * as d3 from "d3";

export namespace Grid {
	export function drawXGrid(svg, xScale, options, data) {
	const yHeight = options.chartSize.height - svg.select(".x.axis").node().getBBox().height;
		const xGrid = d3.axisBottom(xScale)
			.tickSizeInner(-yHeight)
			.tickSizeOuter(0);
		const g = svg.select(".x.grid")
			.attr("transform", `translate(0, ${yHeight})`)
			.call(xGrid);
		g.selectAll("line")
			.attr("stroke", "#ECEEEF");
		g.selectAll("text").remove();
		g.select(".domain").remove();
	}

	export function drawYGrid(svg, yScale, options, data) {
		const tickNum = options.y2Ticks ? d3.max([options.yTicks, options.y2Ticks]) : options.yTicks;
		const yGrid = d3.axisLeft(yScale)
			.tickSizeInner(-options.chartSize.width)
			.tickSizeOuter(0)
			.ticks(tickNum);
		const g = svg.select(".y.grid")
			.attr("transform", `translate(0, 0)`)
			.call(yGrid);
		g.selectAll("line")
			.attr("stroke", "#ECEEEF");
		g.selectAll("text").remove();
		g.select(".domain").remove();
		g.select(".tick").remove();
	}
}

