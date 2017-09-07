import * as d3 from 'd3'
import {Charts} from '../index.ts'

export namespace Legend {
	export function getLegendItems(data, options) {
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
		return legendItems;
	}

	export function hasLegendExpandBtn(container, legendItems) {
		return container.node().clientWidth < 600 && legendItems.length > 4
	}

	export function isLegendOnRight(container, legendItems) {
		return container.node().clientWidth > 600 && legendItems.length > 4
	}

	export function addLegend(container, data, options) {
		let legendItems = getLegendItems(data, options)
		let legend = container.select(".legend")
					.attr("font-size", 10)
				.selectAll("div")
				.data(legendItems)
				.enter().append("li")
					.attr("class", "legend-btn active")

				legend.append("div")
					.attr("class", "legend-circle")
					.style("background-color", (d, i) => options.colors[i])

				legend.append("text")
					.text(function(d) { return d; });
		container.selectAll(".legend-btn").style("display", "inline-block")
		if (hasLegendExpandBtn(container, legendItems)) {
			container.select(".legend").classed("right-legend", false)
			let numberOfLegendAvail = Math.floor((container.node().clientWidth) / 130)
			let btns = container.selectAll(".legend-btn").nodes();
			for (let i = numberOfLegendAvail; i < legendItems.length; i++) {
				d3.select(btns[i]).style("display", "none")
			}
			if (container.select(".expand-btn").nodes().length === 0) {
				addTooltipOpenBtn(container, legendItems, options, data)
			}
		} else if (isLegendOnRight(container, legendItems)) {
			container.selectAll(".expand-btn").remove();
			container.select(".legend").classed("right-legend", true)
				.style("width", container.node().clientWidth * 0.3)
		}
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

	function addTooltipOpenBtn(container, legendItems, options, data) {
		const thisLegend = container.select(".legend");
		thisLegend.append("span").text('+')
			.attr("class", "expand-btn")
			.on("click", function() {
				openLegendTooltip(this, container, legendItems, options, data)
			})
	}

	function openLegendTooltip(target, container, legendItems, options, data) {
		d3.selectAll(".legend-tooltip").remove();
		const mouseXPoint = d3.mouse(container.node())[0];
		const windowXPoint = d3.event.x;
		let leftPos = window.innerWidth - (windowXPoint + 200) < 0 ? mouseXPoint - 200 : mouseXPoint;
		let tooltip = container.append("div")
			.attr("class", "tooltip legend-tooltip")
			.style("display", "block")
			.style("left", leftPos + "px")
			.style("top", (d3.mouse(container.node())[1]) + "px");
		tooltip.append("h2").text("Legend")
		tooltip.append('ul')
			.attr("class", "legend-tooltip-content")
			.attr("font-size", 10)
		tooltip.append("span")
		  .attr("class", "close-btn")
		  .text("x")
		  .on("click", () => {
  			d3.selectAll(".legend-tooltip").remove();
  		});

		const legendContent = d3.select(".legend-tooltip-content")
			.attr("font-size", 10)
		.selectAll("div")
		.data(legendItems)
		.enter().append("li")
			.attr("class", "legend-btn active")

		legendContent.append("div")
			.attr("class", "legend-circle")
			.style("background-color", (d, i) => options.colors[i])

		legendContent.append("text")
			.text(function(d) { return d; });

		Charts.setClickableLegendInTooltip(data, container, options)
	}
}
