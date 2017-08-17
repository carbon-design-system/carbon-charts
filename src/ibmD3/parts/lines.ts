import * as d3 from 'd3'
import {Tooltip} from './tooltip.ts'

export namespace Lines {
	export function draw(svg, xScale, yScale, options, data, activeSeries) {
		let keys: any;
		let dataList = data;
		if (options.dimension) {
			let newKeys = <any>[];
			dataList.forEach(d => {
				if (!newKeys.includes(d[options.dimension])) {
					newKeys.push(d[options.dimension]);
				}
			});
			keys = newKeys;
		} else {
			keys = options.yDomain;
		}
		const color = d3.scaleOrdinal().range(options.colors).domain(keys);
		keys = activeSeries ? activeSeries : keys;
		const line = d3.line<any>()
			.x(d => xScale(d.key) + options.chartSize.width / dataList.length / 2)
			.y(d => yScale(d.value));
		keys.forEach((value, idx) => {
			const colorKey = value;
			if (options.dimension) {
				dataList = data.filter(d => d[options.dimension] === value);
				value = options.yDomain[0];
			}
			const valueData = dataList.map(d => (<any>{
				xAxis: options.xDomain,
				key: d[options.xDomain],
				series: value,
				value: d[value],
				dimension: options.dimension,
				dimVal: d[options.dimension]
			}));
			const series = svg.append("g");
			series.append("path")
				.data([valueData])
				.attr("fill", "none")
				.attr("stroke", "steelblue")
				.attr("stroke-linejoin", "round")
				.attr("stroke-linecap", "round")
				.attr("stroke-width", 1.5)
				.attr("d", line)
				.style("stroke", color(colorKey));

			series.selectAll("dot")
				.data(valueData)
				.enter().append("circle")
				.attr("r", 3.5)
				.attr("fill", "white")
				.attr("stroke", color(colorKey))
				.attr("stroke-widget", "10%")
				.attr("cx", d => xScale(d.key) + options.chartSize.width / dataList.length / 2)
				.attr("cy", d => yScale(d.value))
				// .on("mouseover", d => {
				// 	this.
				// })
				.on("click", function(d) {
					Tooltip.showTooltip(d)
					reduceOpacity(svg, this)
				})
				// .on("mouseout", () => Tooltip.hideTooltip());
		});
	}

}

function reduceOpacity(svg, exceptionPath) {
	console.log(exceptionPath, svg.selectAll("path"))
	svg.selectAll("path").attr("stroke-opacity", 0.25)
	svg.selectAll("circle").attr("stroke-opacity", 0.25)

	// d3.select(exceptionPath).attr("stroke-opacity", 1)
	d3.select(exceptionPath.parentNode).select("path").attr("stroke-opacity", 1)
	d3.select(exceptionPath).attr("stroke-opacity", 1)
	console.log(d3.select(exceptionPath).attr("fill"))
	d3.select(exceptionPath).attr("fill", d3.select(exceptionPath).attr("stroke"))
}
