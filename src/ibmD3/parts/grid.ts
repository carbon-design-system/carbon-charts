import * as d3 from 'd3'

export namespace Grid {
  export function drawXGrid(svg, xScale, options, data) {
		const xGrid = d3.axisBottom(xScale)
			.tickSizeInner(-options.chartSize.height)
			.tickSizeOuter(0);
		let g = svg.select(".x.grid")
			.attr("transform", `translate(0, ${options.chartSize.height})`)
			.call(xGrid);
		g.selectAll("line")
			.attr("stroke", "#ECEEEF");
		g.selectAll("text").remove();
		g.select(".domain").remove();
	}

  export function drawYGrid(svg, yScale, options, data) {
		let yGrid = d3.axisLeft(yScale)
			.tickSizeInner(-(options.chartSize.width))
			.tickSizeOuter(0)
			.ticks(options.yTicks);
		let g = svg.select(".y.grid")
			.attr("transform", `translate(0, 0)`)
			.call(yGrid);
		g.selectAll("line")
			.attr("stroke", "#ECEEEF");
		g.selectAll("text").remove();
		g.select(".domain").remove();
	}
}

