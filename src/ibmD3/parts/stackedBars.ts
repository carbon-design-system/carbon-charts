import * as d3 from 'd3'
import {Tooltip} from './tooltip.ts'

export namespace StackedBars {
	export function draw(svg, xScale, yScale, options, data, activeSeries) {
		const keys = activeSeries ? activeSeries : options.yDomain;
		const x1 = d3.scaleBand();
		xScale.paddingInner(0.2);
		x1.domain(keys).rangeRound([0, xScale.bandwidth()]);
		const color = d3.scaleOrdinal().range(options.colors).domain(options.yDomain);
		data.forEach(d => {
			let y0 = 0;
			let key = d[options.xDomain];
			const xAxis = options.xDomain;
			d.series = keys.map(function(seriesVal) {
				return {xAxis, series: seriesVal, key, y0: y0, y1: y0 += +d[seriesVal], value: d[seriesVal]}; });
			d.total = options.yDomain.map(val => d[val]).reduce((acc, cur) => acc + cur, 0);
		});

		let series = svg.selectAll(".series")
				.data(data)
			.enter().append("g")
			.attr("class", "g")
			.attr("transform", d => "translate(" + (xScale(d[options.xDomain])) + ",0)");

		series.selectAll("rect")
			.data(d => d.series)
			.enter().append("rect")
			.attr("width", xScale.bandwidth())
			.attr("y", d => yScale(d.y1))
			.attr("height", d => yScale(d.y0) - yScale(d.y1))
			.style("fill", d => color(d.series))
			.on("click", d => {
				Tooltip.showTooltip(d)
			})
			// .on("mouseover", d => this.tooltipService.updateTooltip(d))
			// .on("mouseout", () => this.tooltipService.hideTooltip());
	}


}
