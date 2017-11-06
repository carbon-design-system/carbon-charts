import * as d3 from "d3";
import { Axis } from "./parts/axis";
import { Grid } from "./parts/grid";
import { Bars } from "./parts/bars";
import { StackedBars } from "./parts/stackedBars";
import { Lines } from "./parts/lines";
import { Combo } from "./types/combo";
import { DoubleAxis } from "./types/doubleAxis";
import { Legend } from "./parts/legend";
import { Configuration } from "./configuration";
import "./style.scss";


export namespace Charts {
	export let chartCount = 1;

	export const bars = Bars;
	export const lines = Lines;
	export const combo = Combo;
	export const stackedBars = StackedBars;
	export const doubleAxis = DoubleAxis;

	export function getActualChartSize(data, container, options) {
		let ratio, marginForLegendTop;
		let moreForY2Axis = 0;
		if (container.node().clientWidth > Configuration.charts.widthBreak &&
			Legend.getLegendItems(data, options).length > Configuration.legend.countBreak) {
			ratio = Configuration.charts.magicRatio;
			marginForLegendTop = 0;
		} else {
			marginForLegendTop = Configuration.charts.marginForLegendTop;
			ratio = 1;
		}
		if (options.type === "doubleAxis" || options.type === "combo") {
			moreForY2Axis = Configuration.charts.magicMoreForY2Axis;
		}
		return {
			height: container.node().clientHeight - marginForLegendTop,
			width: (container.node().clientWidth - Configuration.charts.margin.left - Configuration.charts.margin.right - moreForY2Axis) * ratio
		};
	}
	export function removeChart(container) {
		container.select("svg").remove();
	}
	export function renderChart(data, container, options) {
		container.classed("chart-wrapper", true);
		container.append("div").attr("class", "legend");
		options.chartSize = getActualChartSize(data, container, options);

		const svg = setSVG(data, container, options);
		const xScale = setXScale(data, options);
		const yScale = setYScale(svg, data, options, getActiveDataSeries(container));

		Axis.drawXAxis(svg, xScale, options);
		Axis.drawYAxis(svg, yScale, options);
		Grid.drawXGrid(svg, xScale, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			setClickableLegend(data, container, options);
		}
		drawChart(data, container, options);
	}

	function nextId() {
		return `chart-${chartCount++}`;
	}

	export function setSVG(data, container, options) {
		const chartSize = getActualChartSize(data, container, options);
		const svg = container.append("svg")
			.attr("class", "chart-svg")
			.append("g")
			.attr("class", "inner-wrap");
		svg.append("g")
			.attr("class", "y axis")
			.attr("transform", `translate(0, 0)`);
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", `translate(0, ${chartSize.height})`);
		const grid = svg.append("g")
			.attr("class", "grid")
			.attr("clip-path", `url(${window.location.origin}${window.location.pathname}#clip)`);
		grid.append("g")
			.attr("class", "x grid")
			.attr("transform", `translate(0, ${chartSize.width})`);
		grid.append("g")
			.attr("class", "y grid")
			.attr("transform", `translate(0, 0)`);
		return svg;
	}

	export function repositionSVG(container) {
		const yAxisWidth = container.select(".y.axis").node().getBBox().width;
		container.style("padding-left", `${yAxisWidth}px`);
	}

	export function drawChart(data, container, options) {
		d3.select(container).selectAll(".chart-tooltip").remove();
		d3.select(container).selectAll(".label-tooltip").remove();
		switch (options.type) {
			case "bar":
				Bars.drawChart(data, container, options);
				break;
			case "stackedBar":
				StackedBars.drawChart(data, container, options);
				break;
			case "line":
				Lines.drawChart(data, container, options);
				break;
			case "doubleAxis":
				DoubleAxis.drawChart(data, container, options);
				break;
			case "combo":
				Combo.drawChart(data, container, options);
				break;
			default:
				Bars.drawChart(data, container, options);
				break;
		}
	}

	export function setTooltip(chartID) {
		let tooltip = d3.select(`#tooltip-${chartID}`);
		if (tooltip.nodes().length <= 0) {
			tooltip = d3.select("body").append("div")
				.attr("class", "tooltip chart-tooltip")
				.attr("id", `tooltip-${chartID}`)
				.style("display", "none");
			tooltip.append("span")
				.attr("class", "text-box");

			addCloseBtn(tooltip, "xs")
				.on("click", () => {
					d3.selectAll(".tooltip").remove();
					resetOpacity();
				});
		}
	}

	export function addCloseBtn(tooltip, size, color?) {
		const closeBtn = tooltip.append("button");
		let classNames = `close--${size}`;
		classNames = color ? " close--" + color : classNames;
		closeBtn.attr("class", classNames)
			.attr("type", "button")
			.attr("aria-label", "Close")
			.append("svg").attr("class", "close_icon")
			.append("use").attr("href", "#x_12");
		return closeBtn;
	}

	export let resizeTimers = [];

	export function setResizeWhenContainerChange(data, container, options) {
		let containerWidth = container.clientWidth;
		let containerHeight = container.clientHeight;
		const intervalId = setInterval(resizeTimer, 800);
		resizeTimers.push(intervalId);
		function resizeTimer() {
			if (Math.abs(containerWidth - container.clientWidth) > 20
			|| Math.abs(containerHeight - container.clientHeight) > 20) {
				containerWidth = container.clientWidth;
				containerHeight = container.clientHeight;
				debounce(() => {
					window.clearTimeout(intervalId);
					d3.selectAll(".legend-tooltip").style("display", "none");
					drawChart(data, container, options);
				}, 500)();
			}
		}
		return intervalId;
	}

	function debounce(func, wait, immediate?) {
		let timeout;
		return function() {
			const context = this, args = arguments;
			const later = function() {
				timeout = null;
				if (!immediate) {
					func.apply(context, args);
				}
			};
			const callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) {
				func.apply(context, args);
			}
		};
	}

	export function setXScale(data, options) {
		return d3.scaleBand().range([0, options.chartSize.width])
			.domain(data.map(d => d[options.xDomain]));
	}

	export function setYScale(svg, data, options, activeSeries) {
		const yHeight = options.chartSize.height - svg.select(".x.axis").node().getBBox().height;
		const yScale = d3.scaleLinear().range([yHeight, 0]);
		const keys = activeSeries.length > 0 ? activeSeries : options.yDomain;
		if (options.type === "stackedBar") {
			const yMax = d3.max(data, d => keys.map(val => d[val]).reduce((acc, cur) => acc + cur, 0));
			yScale.domain([0, yMax]);
		} else {
			yScale.domain([0, d3.max(data, d =>
					d3.max(keys.map(domain => d[domain])))
				]);
		}
		return yScale;
	}

	export function setClickableLegend(data, parent, options) {
		parent.selectAll(".legend-btn").each(function() {
			d3.select(this).on("click", function() {
				parent.selectAll(".chart-tooltip").remove();
				parent.selectAll(".label-tooltip").remove();
				Legend.updateLegend(this);
				drawChart(data, parent.node(), options);
			});
		});
	}

	export function setClickableLegendInTooltip(data, parent, options) {
		const tooltip = parent.select(".legend-tooltip-content");
		tooltip.selectAll(".legend-btn").each(function() {
			d3.select(this).on("click", function() {
				Legend.updateLegend(this);
				drawChart(data, parent.node().parentNode, options);
			});
		});
	}

	export function getActiveDataSeries(container) {
		const activeSeries = [];
		if (container.selectAll(".legend-tooltip").nodes().length > 0) {
			container = container.select(".legend-tooltip");
		}
		container.selectAll(".legend-btn").filter(".active").each(function() {
			activeSeries.push(d3.select(this).select("text").text());
		});
		return activeSeries;
	}

	export function setChartIDContainer(parent) {
		let chartID, container;
		if (parent.select(".chart-wrapper").nodes().length > 0) {
			container = parent.select(".chart-wrapper");
			chartID = container.attr("chart-id");
			container.selectAll(".chart-svg").remove();
		} else {
			chartID = nextId();
			container = parent.append("div");
			container.attr("chart-id", chartID)
				.classed("chart-wrapper", true);
			if (container.select(".legend-wrapper").nodes().length === 0) {
				const legendWrapper = container.append("div").attr("class", "legend-wrapper");
				legendWrapper.append("ul").attr("class", "legend");
			}
		}
		return {chartID, container};
	}

	export function resetOpacity() {
		const svg = d3.selectAll("svg");
		svg.selectAll("path").attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		svg.selectAll("circle").attr("stroke-opacity", Configuration.charts.resetOpacity.opacity)
			.attr("fill", Configuration.charts.resetOpacity.circle.fill);
		svg.selectAll("rect").attr("fill-opacity", Configuration.charts.resetOpacity.opacity);
	}

	export function reduceOpacity(svg, exception) {
		svg.selectAll("rect").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);
		d3.select(exception).attr("fill-opacity", false);
		svg.selectAll("path").attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
		svg.selectAll("circle").attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
		d3.select(exception.parentNode).select("path").attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		d3.select(exception.parentNode).selectAll("circle").attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		d3.select(exception).attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		d3.select(exception).attr("fill", d3.select(exception).attr("stroke"));
	}
}
