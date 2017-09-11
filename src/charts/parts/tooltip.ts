import * as d3 from 'd3'

export namespace Tooltip {
  export function showLabelTooltip(container, d) {
  	const mouseXPoint = d3.mouse(container)[0];
  	const windowXPoint = d3.event.x;
  	let tooltip = d3.select(container).append("div")
  		.attr("class", "tooltip label-tooltip")
  		.style("left", mouseXPoint + "px")
  		.style("top", (d3.mouse(container)[1]) + "px")
  	tooltip.append('p').text(d)
  		.on('click', function() {d3.selectAll(".tooltip").remove()} )
	}
  export function showTooltip(chartID, d) {
		const div = d3.select("#tooltip-" + chartID)
			.style("display", "block")
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY) + "px");
		const dVal = d.formatter && d.formatter[d.series] ? d.formatter[d.series](d.value.toLocaleString()) : d.value.toLocaleString();
		let tooltipHTML = "<b>" + d.xAxis + ": </b>" + d.key + "<br/><b>" + d.series + ": </b>" + dVal;
		if (d.dimension) {
			tooltipHTML += "<br/><b>" + d.dimension + ": </b>" + d.dimVal;
		}
		div.select(".text-box").html(tooltipHTML)
	}

	export function hide() {
		d3.selectAll(".tooltip").style("display", "none");
	}
}
