import * as d3 from "d3";
import { Charts } from "../index";
import { Configuration } from "../configuration";
import { Tools } from "../tools";

export namespace Tooltip {
	export function showLabelTooltip(container, d, leftSide) {
		d3.selectAll(".label-tooltip").remove();
		const mouseXPoint = d3.mouse(container)[0] + Configuration.tooltip.arrowWidth;
		const tooltip = d3.select(container).append("div")
			.attr("class", "tooltip label-tooltip")
			.style("top", d3.mouse(container)[1] - Configuration.tooltip.magicTop1 + "px");
		Tools.addCloseBtn(tooltip, "xs")
			.on("click", () => {
				Charts.resetOpacity();
				d3.selectAll(".tooltip").remove();
			});
		tooltip.append("p").text(d);

		if (leftSide) {
			tooltip.style("left", mouseXPoint + "px");
			tooltip.append("div").attr("class", "arrow arrow-left");
		} else {
			const xPoint = mouseXPoint - (tooltip.node() as Element).clientWidth - Configuration.tooltip.magicXPoint2;
			tooltip.style("left", xPoint + "px");
			tooltip.append("div").attr("class", "arrow arrow-right");
		}
	}

	export function showTooltip(container, d) {
		Charts.resetOpacity();

		d3.selectAll(".tooltip").remove();
		const tooltip = d3.select(container).append("div")
			.attr("class", "tooltip chart-tooltip")
			.style("top", d3.mouse(container)[1] - Configuration.tooltip.magicTop2 + "px")
			.style("border-color", d.color);
		Tools.addCloseBtn(tooltip, "xs")
			.on("click", () => {
				Charts.resetOpacity();
				d3.selectAll(".tooltip").remove();
			});
		const dVal = d.formatter && d.formatter[d.series] ? d.formatter[d.series](d.value.toLocaleString()) : d.value.toLocaleString();
		let tooltipHTML = "<b>" + d.xAxis + ": </b>" + d.key + "<br/><b>" + d.series + ": </b>" + dVal;
		if (d.dimension) {
			tooltipHTML += "<br/><b>" + d.dimension + ": </b>" + d.dimVal;
		}
		tooltip.append("div").attr("class", "text-box").html(tooltipHTML);
		if (d3.mouse(container)[0] + (tooltip.node() as Element).clientWidth > container.clientWidth) {
			tooltip.style("left", d3.mouse(container)[0] - (tooltip.node() as Element).clientWidth - Configuration.tooltip.magicLeft1 + "px");
			tooltip.append("div").attr("class", "arrow arrow-right");
		} else {
			tooltip.style("left", d3.mouse(container)[0] + Configuration.tooltip.magicLeft2 + "px");
			tooltip.append("div").attr("class", "arrow arrow-left");
		}
	}
}
