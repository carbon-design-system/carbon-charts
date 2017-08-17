import * as d3 from 'd3'

export namespace Tooltip {
  export function showTooltip(d) {
		const div = d3.select(".chart-tooltip")
			.style("display", "block")
			.style("left", (d3.event.pageX) + "px")
			.style("top", (d3.event.pageY) + "px");
		let tooltipHTML = "<b>" + d.xAxis + ": </b>" + d.key + "<br/><b>" + d.series + ": </b>" + d.value;
		if (d.dimension) {
			tooltipHTML += "<br/><b>" + d.dimension + ": </b>" + d.dimVal;
		}


		div.select(".text-box").html(tooltipHTML)
	}

	export function hide() {
		d3.select(".chart-tooltip").style("display", "none");
	}
}
