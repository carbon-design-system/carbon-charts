import * as d3 from "d3";
import { Configuration } from "./configuration";
import { Tools } from "./tools";

export class BaseChart {
	static chartCount = 1;

	//#region
	id = "";
	container: any;
	holder: Element;
	svg: any;
	resizeTimers = [];
	options: any = {
		xDomain: [],
		yDomain: [],
		y2Domain: [],
		yTicks: 5,
		y2Ticks: 10,
		legendClickable: true,
		containerResizable: true,
		type: "basic",
		colors: [
			"#009BEF",
			"#95D13C",
			"#785EF0",
			"#F87EAC",
			"#FFB000",
			"#00B6CB",
			"#FF5C49",
			"#047CC0",
			"#FE8500",
			"#5A3EC8",
			"#40D5BB",
			"#FF509E"
		]
	};
	data: any;
	constructor(holder: Element, options?: any, data?: any) {
		this.id = `chart-${BaseChart.chartCount++}`;

		this.holder = holder;

		const {chartId, container} = this.setChartIDContainer();
		this.container = container;


		if (options) {
			this.options = Object.assign(this.options, options);
		}

		if (data) {
			this.data = data;
		}
	}

	getActualChartSize(container = this.container) {
		let ratio, marginForLegendTop;
		let moreForY2Axis = 0;
		if (container.node().clientWidth > Configuration.charts.widthBreak &&
			this.getLegendItems().length > Configuration.legend.countBreak) {
			ratio = Configuration.charts.magicRatio;
			marginForLegendTop = 0;
		} else {
			marginForLegendTop = Configuration.charts.marginForLegendTop;
			ratio = 1;
		}
		if (this.options.type === "double-axis-line" || this.options.type === "combo") {
			moreForY2Axis = Configuration.charts.magicMoreForY2Axis;
		}
		return {
			height: container.node().clientHeight - marginForLegendTop,
			width: (container.node().clientWidth - Configuration.charts.margin.left - Configuration.charts.margin.right - moreForY2Axis) * ratio
		};
	}

	/*
	 * removes the chart and any tooltips
	 */
	removeChart() {
		this.container.select("svg").remove();
		this.container.selectAll(".chart-tooltip").remove();
		this.container.selectAll(".label-tooltip").remove();
	}

	/*
	 * either creates or updates the chart
	 */
	redrawChart(data?: any) {
		if (!data) {
			this.updateChart();
		} else {
			this.removeChart();
			this.drawChart(data);
		}
	}

	setSVG(): any {
		const chartSize = this.getActualChartSize();
		this.svg = this.container.append("svg")
			.attr("class", "chart-svg")
			.append("g")
			.attr("class", "inner-wrap");
		this.svg.append("g")
			.attr("class", "y axis")
			.attr("transform", `translate(0, 0)`);
		this.svg.append("g")
			.attr("class", "x axis")
			.attr("transform", `translate(0, ${chartSize.height})`);
		const grid = this.svg.append("g")
			.attr("class", "grid")
			.attr("clip-path", `url(${window.location.origin}${window.location.pathname}#clip)`);
		grid.append("g")
			.attr("class", "x grid")
			.attr("transform", `translate(0, ${chartSize.width})`);
		grid.append("g")
			.attr("class", "y grid")
			.attr("transform", `translate(0, 0)`);
		return this.svg;
	}

	updateSVG() {
		const chartSize = this.getActualChartSize();
		this.svg.select(".x.axis")
			.attr("transform", `translate(0, ${chartSize.height})`);
		const grid = this.svg.select(".grid")
			.attr("clip-path", `url(${window.location.origin}${window.location.pathname}#clip)`);
		grid.select(".x.grid")
			.attr("transform", `translate(0, ${chartSize.width})`);
		grid.select(".y.grid")
			.attr("transform", `translate(0, 0)`);
	}

	repositionSVG() {
		const yAxisWidth = (this.container.select(".y.axis").node() as SVGGElement).getBBox().width;
		this.container.style("padding-left", `${yAxisWidth}px`);
	}

	/*
	 * creates the chart from scratch
	 * should only be called once (or removeChart should be called before)
	 */
	drawChart(data?: any) {
		if (data) {
			this.data = data;
		}

		console.warn("You should implement your own `drawChart()` function.");
	}

	/*
	 * called when the chart needs to be updated visually
	 * similar to drawChart but it should work from the existing chart
	 */
	updateChart() {
		console.warn("You should implement your own `updateChart() function.");
	}
	//#endregion
	setResizeWhenContainerChange() {
		let containerWidth = this.holder.clientWidth;
		let containerHeight = this.holder.clientHeight;
		const intervalId = setInterval(() => {
			if (Math.abs(containerWidth - this.holder.clientWidth) > 20
			|| Math.abs(containerHeight - this.holder.clientHeight) > 20) {
				containerWidth = this.holder.clientWidth;
				containerHeight = this.holder.clientHeight;
				Tools.debounce(() => {
					window.clearTimeout(intervalId);
					d3.selectAll(".legend-tooltip").style("display", "none");
					this.redrawChart();
				}, 500)();
			}
		}, 800);
		this.resizeTimers.push(intervalId);
		return intervalId;
	}

	resizeWhenContainerChange() {
		let containerWidth = this.holder.clientWidth;
		let containerHeight = this.holder.clientHeight;
		const frame = () => {
			if (Math.abs(containerWidth - this.holder.clientWidth) > 1
				|| Math.abs(containerHeight - this.holder.clientHeight) > 1) {
				containerWidth = this.holder.clientWidth;
				containerHeight = this.holder.clientHeight;
				d3.selectAll(".legend-tooltip").style("display", "none");
				this.updateChart();
			}
			requestAnimationFrame(frame);
		};
		requestAnimationFrame(frame);
	}

	setClickableLegend() {
		const self = this;
		const c = d3.select(this.holder);
		c.selectAll(".legend-btn").each(function() {
			d3.select(this).on("click", function() {
				c.selectAll(".chart-tooltip").remove();
				c.selectAll(".label-tooltip").remove();
				self.updateLegend(this);
				self.redrawChart();
			});
		});
	}

	setClickableLegendInTooltip() {
		const self = this;
		const c = d3.select(this.container);
		const tooltip = c.select(".legend-tooltip-content");
		tooltip.selectAll(".legend-btn").each(function() {
			d3.select(this).on("click", function() {
				self.updateLegend(this);
				self.redrawChart();
			});
		});
	}

	getActiveDataSeries() {
		const activeSeries = [];
		let c = this.container;
		if (c.selectAll(".legend-tooltip").nodes().length > 0) {
			c = c.select(".legend-tooltip");
		}
		c.selectAll(".legend-btn").filter(".active").each(function() {
			activeSeries.push(d3.select(this).select("text").text());
		});
		return activeSeries;
	}

	setChartIDContainer() {
		const parent = d3.select(this.holder);
		let chartId, container;
		if (parent.select(".chart-wrapper").nodes().length > 0) {
			container = parent.select(".chart-wrapper");
			chartId = container.attr("chart-id");
			container.selectAll(".chart-svg").remove();
		} else {
			chartId = this.id;
			container = parent.append("div");
			container.attr("chart-id", chartId)
				.classed("chart-wrapper", true);
			if (container.select(".legend-wrapper").nodes().length === 0) {
				const legendWrapper = container.append("div").attr("class", "legend-wrapper");
				legendWrapper.append("ul").attr("class", "legend");
			}
		}
		return {chartId, container};
	}

	resetOpacity() {
		const svg = d3.selectAll("svg");
		svg.selectAll("path").attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		svg.selectAll("circle").attr("stroke-opacity", Configuration.charts.resetOpacity.opacity)
			.attr("fill", Configuration.charts.resetOpacity.circle.fill);
		svg.selectAll("rect").attr("fill-opacity", Configuration.charts.resetOpacity.opacity);
	}

	reduceOpacity(exception) {
		this.svg.selectAll("rect").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);
		d3.select(exception).attr("fill-opacity", false);
		this.svg.selectAll("path").attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
		this.svg.selectAll("circle").attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
		d3.select(exception.parentNode).select("path").attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		d3.select(exception.parentNode).selectAll("circle").attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		d3.select(exception).attr("stroke-opacity", Configuration.charts.resetOpacity.opacity);
		d3.select(exception).attr("fill", d3.select(exception).attr("stroke"));
	}

	// Legend
	getLegendItems() {
		let legendItems = [];
		if (this.options.dimension) {
			const newKeys = <any>[];
			this.data.forEach(d => {
				if (!newKeys.includes(d[this.options.dimension])) {
					newKeys.push(d[this.options.dimension]);
				}
			});
			legendItems = newKeys;
		} else if (this.options.y2Domain) {
			legendItems = this.options.yDomain.concat(this.options.y2Domain);
		} else {
			legendItems = this.options.yDomain;
		}
		return legendItems;
	}

	updateLegend(legend) {
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

	addLegend() {
		if (this.container.select(".legend-tooltip").nodes().length > 0) {
			return;
		}
		const legendItems = this.getLegendItems();
		const legend = this.container.select(".legend")
			.attr("font-size", Configuration.legend.fontSize)
			.selectAll("div")
			.data(legendItems)
			.enter().append("li")
				.attr("class", "legend-btn active");

		legend.append("div")
			.attr("class", "legend-circle")
			.style("background-color", (d, i) => this.options.colors[i]);
		this.addLegendCircleHoverEffect();

		legend.append("text")
			.text(d => d);
	}

	positionLegend() {
		if (this.container.select(".legend-tooltip").nodes().length > 0
			&& this.container.select(".legend-tooltip").node().style.display === "block") {
			return;
		}
		this.container.selectAll(".legend-btn").style("display", "inline-block");
		const svgWidth = this.container.select(".inner-wrap").node().getBBox().width;
		if (this.isLegendOnRight()) {
			this.container.selectAll(".expand-btn").remove();
			this.container.select(".legend-wrapper").style("height", 0);
			const containerWidth = this.container.node().clientWidth;
			const legendWidth = containerWidth - svgWidth;
			this.container.select(".legend").classed("right-legend", true)
				.style("width", legendWidth + "px");
		} else {
			this.container.select(".legend-wrapper").style("height", Configuration.legend.wrapperHeight);
		}

		if (this.hasLegendExpandBtn()) {
			this.container.select(".legend").classed("right-legend", false)
				.style("width", null);
			const btns = this.container.selectAll(".legend-btn").nodes();
			let btnsWidth = 0;
			btns.forEach(btn => {
				if ((btnsWidth + btn.clientWidth + Configuration.legend.widthTolerance) > svgWidth) {
					d3.select(btn).style("display", "none");
				} else {
					btnsWidth += btn.clientWidth;
				}
			});
			if (this.container.select(".expand-btn").nodes().length === 0) {
				this.addTooltipOpenButtonToLegend();
			}
		}
	}

	addLegendCircleHoverEffect() {
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

	hasLegendExpandBtn() {
		return (
			this.container.node().clientWidth < Configuration.charts.widthBreak &&
			this.getLegendItems().length > Configuration.legend.countBreak
		);
	}

	isLegendOnRight() {
		return (
			this.container.node().clientWidth > Configuration.charts.widthBreak &&
			this.getLegendItems().length > Configuration.legend.countBreak
		);
	}

	addTooltipOpenButtonToLegend() {
		const thisLegend = this.container.select(".legend");
		const self = this;
		thisLegend.append("div")
			.attr("class", "expand-btn")
			.style("cursor", "pointer")
			.on("click", function() {
				self.openLegendTooltip(this);
			});
	}

	openLegendTooltip(target) {
		const mouseXPoint = d3.mouse(this.container.node())[0];
		const windowXPoint = d3.event.x;
		let tooltip;
		if (this.container.select(".legend-tooltip").nodes().length > 0) {
			tooltip = d3.selectAll(".legend-tooltip").style("display", "block");
			tooltip.select("arrow").remove();
		} else {
			tooltip = this.container.append("div")
				.attr("class", "tooltip legend-tooltip")
				.style("display", "block")
				.style("top", (d3.mouse(this.container.node())[1] - Configuration.legend.margin.top) + "px");
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
				.data(this.getLegendItems())
				.enter().append("li")
				.attr("class", "legend-btn active")
				.on("click", (clickedItem) => {
					this.updateLegend(d3.event.currentTarget);
					this.redrawChart();
				});

			legendContent.append("div")
				.attr("class", "legend-circle")
				.style("background-color", (d, i) => this.options.colors[i]);
			this.addLegendCircleHoverEffect();

			legendContent.append("text")
				.text(d => "" + d);
		}

		if (window.innerWidth - (windowXPoint + Configuration.tooltip.width) < 0) {
			tooltip.append("div").attr("class", "arrow arrow-right");
			tooltip.style("left", `${mouseXPoint - Configuration.tooltip.width - Configuration.tooltip.arrowWidth}px`);
		} else {
			tooltip.append("div").attr("class", "arrow arrow-left");
			tooltip.style("left", `${mouseXPoint + Configuration.tooltip.arrowWidth}px`);
		}
	}

	showLabelTooltip(d, leftSide) {
		d3.selectAll(".label-tooltip").remove();
		const mouseXPoint = d3.mouse(this.holder as SVGSVGElement)[0] + Configuration.tooltip.arrowWidth;
		const tooltip = this.container.append("div")
			.attr("class", "tooltip label-tooltip")
			.style("top", d3.mouse(this.holder as SVGSVGElement)[1] - Configuration.tooltip.magicTop1 + "px");
		Tools.addCloseBtn(tooltip, "xs")
			.on("click", () => {
				this.resetOpacity();
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

	showTooltip(d) {
		this.resetOpacity();
		d3.selectAll(".tooltip").remove();
		const tooltip = d3.select(this.holder).append("div")
			.attr("class", "tooltip chart-tooltip")
			.style("top", d3.mouse(this.holder as SVGSVGElement)[1] - Configuration.tooltip.magicTop2 + "px")
			.style("border-color", d.color);
		Tools.addCloseBtn(tooltip, "xs")
			.on("click", () => {
				this.resetOpacity();
				d3.selectAll(".tooltip").remove();
			});
		const dVal = d.formatter && d.formatter[d.series] ? d.formatter[d.series](d.value.toLocaleString()) : d.value.toLocaleString();
		let tooltipHTML = "<b>" + d.xAxis + ": </b>" + d.key + "<br/><b>" + d.series + ": </b>" + dVal;
		if (d.dimension) {
			tooltipHTML += "<br/><b>" + d.dimension + ": </b>" + d.dimVal;
		}
		tooltip.append("div").attr("class", "text-box").html(tooltipHTML);
		if (d3.mouse(this.holder as SVGSVGElement)[0] + (tooltip.node() as Element).clientWidth > this.holder.clientWidth) {
			tooltip.style(
				"left",
				d3.mouse(this.holder as SVGSVGElement)[0] - (tooltip.node() as Element).clientWidth - Configuration.tooltip.magicLeft1 + "px"
			);
			tooltip.append("div").attr("class", "arrow arrow-right");
		} else {
			tooltip.style("left", d3.mouse(this.holder as SVGSVGElement)[0] + Configuration.tooltip.magicLeft2 + "px");
			tooltip.append("div").attr("class", "arrow arrow-left");
		}
	}
}
