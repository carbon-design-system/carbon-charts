import * as d3 from "d3";
import { Charts } from "../index";
import { Configuration } from "../configuration";
import { Tools } from "../tools";

export namespace Legend {
	export function getLegendItems(data, options) {
		let legendItems = [];
		if (options.dimension) {
			const newKeys = <any>[];
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
		return container.node().clientWidth < Configuration.charts.widthBreak && legendItems.length > Configuration.legend.countBreak;
	}

	export function isLegendOnRight(container, legendItems) {
		return container.node().clientWidth > Configuration.charts.widthBreak && legendItems.length > Configuration.legend.countBreak;
	}

	export function addLegend(container, data, options) {
		if (container.select(".legend-tooltip").nodes().length > 0) {
			return;
		}
		const legendItems = getLegendItems(data, options);
		const legend = container.select(".legend")
			.attr("font-size", Configuration.legend.fontSize)
			.selectAll("div")
			.data(legendItems)
			.enter().append("li")
				.attr("class", "legend-btn active");

		legend.append("div")
			.attr("class", "legend-circle")
			.style("background-color", (d, i) => options.colors[i]);
		addCircleHoverEffect();

		legend.append("text")
			.text(d => d);
	}

	export function positionLegend(container, data, options) {
		if (container.select(".legend-tooltip").nodes().length > 0
			&& container.select(".legend-tooltip").node().style.display === "block") {
			return;
		}
		container.selectAll(".legend-btn").style("display", "inline-block");
		const svgWidth = container.select(".inner-wrap").node().getBBox().width;
		if (isLegendOnRight(container, getLegendItems(data, options))) {
			container.selectAll(".expand-btn").remove();
			container.select(".legend-wrapper").style("height", 0);
			const containerWidth = container.node().clientWidth;
			const legendWidth = containerWidth - svgWidth;
			container.select(".legend").classed("right-legend", true)
				.style("width", legendWidth + "px");
		} else {
			container.select(".legend-wrapper").style("height", Configuration.legend.wrapperHeight);
		}

		if (hasLegendExpandBtn(container, getLegendItems(data, options))) {
			container.select(".legend").classed("right-legend", false)
				.style("width", null);
			const btns = container.selectAll(".legend-btn").nodes();
			let btnsWidth = 0;
			btns.forEach(btn => {
				if ((btnsWidth + btn.clientWidth + Configuration.legend.widthTolerance) > svgWidth) {
					d3.select(btn).style("display", "none");
				} else {
					btnsWidth += btn.clientWidth;
				}
			});
			if (container.select(".expand-btn").nodes().length === 0) {
				addTooltipOpenBtn(container, getLegendItems(data, options), options, data);
			}
		}
	}

	export function updateLegend(legend) {
		const thisLegend = d3.select(legend);
		const circle = d3.select(legend).select(".legend-circle");
		thisLegend.classed("active", !thisLegend.classed("active"));
		if (thisLegend.classed("active")) {
			circle.style("background-color", circle.style("border-color"))
				.style("border-color", Configuration.legend.active.borderColor)
				.style("border-style", Configuration.legend.active.borderStyle)
				.style("border-width", Configuration.legend.active.borderWidth);
		} else {
			circle.style("border-color", circle.style("background-color"))
			.style("background-color", Configuration.legend.inactive.backgroundColor)
			.style("border-style", Configuration.legend.inactive.borderStyle)
			.style("border-width", Configuration.legend.inactive.borderWidth);
		}
	}

	function addTooltipOpenBtn(container, legendItems, options, data) {
		const thisLegend = container.select(".legend");
		thisLegend.append("div")
			.attr("class", "expand-btn")
			.on("click", function() {
				openLegendTooltip(this, container, legendItems, options, data);
			});
	}

	function openLegendTooltip(target, container, legendItems, options, data) {
		const mouseXPoint = d3.mouse(container.node())[0];
		const windowXPoint = d3.event.x;
		let tooltip;
		if (container.select(".legend-tooltip").nodes().length > 0) {
			tooltip = d3.selectAll(".legend-tooltip").style("display", "block");
			tooltip.select("arrow").remove();
		} else {
			tooltip = container.append("div")
				.attr("class", "tooltip legend-tooltip")
				.style("display", "block")
				.style("top", (d3.mouse(container.node())[1] - Configuration.legend.margin.top) + "px");
			tooltip.append("p").text("Legend")
				.attr("class", "legend-tooltip-header");
			tooltip.append("ul")
				.attr("class", "legend-tooltip-content")
				.attr("font-size", Configuration.legend.fontSize);
			Tools.addCloseBtn(tooltip, "md", "white")
				.on("click", () => {
					d3.selectAll(".legend-tooltip").style("display", "none");
				});

			const legendContent = d3.select(".legend-tooltip-content")
				.attr("font-size", Configuration.legend.fontSize)
				.selectAll("div")
				.data(legendItems)
				.enter().append("li")
				.attr("class", "legend-btn active");

			legendContent.append("div")
				.attr("class", "legend-circle")
				.style("background-color", (d, i) => options.colors[i]);
			addCircleHoverEffect();

			legendContent.append("text")
				.text(d => "" + d);

			Charts.setClickableLegendInTooltip(data, container, options);
		}

		if (window.innerWidth - (windowXPoint + Configuration.tooltip.width) < 0) {
			tooltip.append("div").attr("class", "arrow arrow-right");
			tooltip.style("left", `${mouseXPoint - Configuration.tooltip.width - Configuration.tooltip.arrowWidth}px`);
		} else {
			tooltip.append("div").attr("class", "arrow arrow-left");
			tooltip.style("left", `${mouseXPoint + Configuration.tooltip.arrowWidth}px`);
		}
	}

	export function addCircleHoverEffect() {
		d3.selectAll(".legend-circle")
			.on("mouseover", function() {
				const color = (this as HTMLElement).style.backgroundColor.substring(4, (this as HTMLElement).style.backgroundColor.length - 1);
				d3.select(this).style(
					"box-shadow",
					`0 0 0 ${Configuration.legend.hoverShadowSize} rgba(${color}, ${Configuration.legend.hoverShadowTransparency})`
				);
			})
			.on("mouseout", function() {
				d3.select(this).style("box-shadow", "none");
			});
	}
}
