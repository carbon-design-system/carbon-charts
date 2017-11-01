import * as d3 from "d3";
import { Charts } from "../index";

export namespace Tooltip {
	let resetOpacityFunctions = [];
	export function showLabelTooltip(container, d, leftSide) {
		d3.selectAll(".label-tooltip").remove();
		const mouseXPoint = d3.mouse(container)[0] + 10;
		const tooltip = d3.select(container).append("div")
			.attr("class", "tooltip label-tooltip")
			.style("top", d3.mouse(container)[1] - 21 + "px");
		Charts.addCloseBtn(tooltip, "xs")
			.on("click", () => {
				resetOpacityFunctions.forEach(f => f());
				resetOpacityFunctions = [];
				d3.selectAll(".tooltip").remove();
			});
		tooltip.append("p").text(d);

		if (leftSide) {
			tooltip.style("left", mouseXPoint + "px");
			tooltip.append("div").attr("class", "arrow arrow-left");
		} else {
			const xPoint = mouseXPoint - tooltip.node().clientWidth - 20;
			tooltip.style("left", xPoint + "px");
			tooltip.append("div").attr("class", "arrow arrow-right");
		}
	}

	export function showTooltip(container, d, resetOpacity) {
		resetOpacityFunctions.forEach(f => f());
		resetOpacityFunctions = [];
		resetOpacityFunctions.push(resetOpacity);
		d3.selectAll(".tooltip").remove();
		const tooltip = d3.select(container).append("div")
			.attr("class", "tooltip chart-tooltip")
			.style("top", d3.mouse(container)[1] - 22 + "px")
			.style("border-color", d.color);
		Charts.addCloseBtn(tooltip, "xs")
			.on("click", () => {
				resetOpacityFunctions.forEach(f => f());
				resetOpacityFunctions = [];
				d3.selectAll(".tooltip").remove();
			});
		const dVal = d.formatter && d.formatter[d.series] ? d.formatter[d.series](d.value.toLocaleString()) : d.value.toLocaleString();
		let tooltipHTML = "<b>" + d.xAxis + ": </b>" + d.key + "<br/><b>" + d.series + ": </b>" + dVal;
		if (d.dimension) {
			tooltipHTML += "<br/><b>" + d.dimension + ": </b>" + d.dimVal;
		}
		tooltip.append("div").attr("class", "text-box").html(tooltipHTML);
		if (d3.mouse(container)[0] + tooltip.node().clientWidth > container.clientWidth) {
			tooltip.style("left", d3.mouse(container)[0] - tooltip.node().clientWidth - 12 + "px");
			tooltip.append("div").attr("class", "arrow arrow-right");
		} else {
			tooltip.style("left", d3.mouse(container)[0] + 11 + "px");
			tooltip.append("div").attr("class", "arrow arrow-left");
		}
	}
}
