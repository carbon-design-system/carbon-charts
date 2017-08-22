import * as d3 from 'd3'

export namespace Legend {
	export function addLegend(container, data, options) {
		// if (container.select(".legend").nodes().length > 0) {
		// 	container.selectAll(".legend").remove();
		// }
		let legendItems = [];
		if (options.dimension) {
			let newKeys = <any>[];
			data.forEach(d => {
				if (!newKeys.includes(d[options.dimension])) {
					newKeys.push(d[options.dimension]);
				}
			});
			legendItems = newKeys;
		} else if (options.y2Domain) {
			legendItems = options.yDomain.concat(options.y2Domain);
		} else {
			legendItems = options.yDomain;
		}
		const legend = container.select(".legend")
			.attr("font-size", 10)
		.selectAll("div")
		.data(legendItems)
		.enter().append("div")
			.attr("class", "legendBtn active")

		legend.append("div")
			.attr("class", "legend-circle")
			.style("background-color", (d, i) => options.colors[i])

		legend.append("text")
			.text(function(d) { return d; });
	}

	export function updateLegend(legend) {
		const thisLegend = d3.select(legend);
	 	const circle = d3.select(legend).select(".legend-circle");
	 	const text = d3.select(legend).select("text");
		thisLegend.classed("active", !thisLegend.classed("active"));
		if (thisLegend.classed("active")) {
			circle.style("background-color", circle.style("border-color"))
				.style("border-color", false)
				.style("border-style", false)
				.style("border-width", false)
		} else {
			circle.style("border-color", circle.style("background-color"))
				.style("background-color", "white")
				.style("border-style", "solid")
				.style("border-width", "2");
		}
	}
}
