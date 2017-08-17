import * as d3 from 'd3'
import {Tooltip} from './tooltip.ts'

export namespace Bars {
	export function draw(svg, xScale, yScale, options, data, activeSeries) {
			xScale.padding(0.1)
			const keys = activeSeries ? activeSeries : options.yDomain;
			const x1 = d3.scaleBand();
			// const y = d3.scaleLinear().rangeRound([options.height, 0]);
			x1.domain(keys).rangeRound([0, xScale.bandwidth()]);
			const color = d3.scaleOrdinal().range(options.colors).domain(options.yDomain);
			// console.log(data)
			svg.append("g")
				.attr("class", "bars")
				.selectAll("g")
				.data(data)
				.enter().append("g")
					.attr("transform", d => "translate(" + xScale(d[options.xDomain]) + ",0)")
				.selectAll("rect")
				.data(d => keys.map(key => ({xAxis: options.xDomain, series: key, key: d[options.xDomain], value: d[key]})))
				.enter().append("rect")
					.on("click", function(d) {
						Tooltip.showTooltip(d)
						reduceOpacity(svg, this)
					})
					.attr("x", d => x1(d.series))
					.attr("y", d => yScale(d.value))
					.attr("width", x1.bandwidth())
					.attr("height", d => options.chartSize.height - yScale(d.value))
					.attr("fill", d => color(d.series))
					// .on("mouseover", d => this.tooltipService.updateTooltip(d))
					// .on("mouseout", () => this.tooltipService.hideTooltip());
	}

}

function reduceOpacity(svg, exceptionRect) {
	console.log(exceptionRect, svg.selectAll("rect"))
	svg.selectAll("rect").attr("fill-opacity", 0.25)
	d3.select(exceptionRect).attr("fill-opacity", false)
}
