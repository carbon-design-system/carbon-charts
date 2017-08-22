// export {HelloWorld} from './hello-world'
import * as d3 from 'd3'
import {Axis} from './parts/axis.ts'
import {Grid} from './parts/grid.ts'
import {Bars} from './parts/bars.ts'
import {StackedBars} from './parts/stackedBars.ts'
import {Lines} from './parts/lines.ts'
import {renderCombo} from './types/combo.ts'
import {renderDoubleAxis} from './types/doubleAxis.ts'
import {Legend} from './parts/legend.ts'
import {Tooltip} from './parts/tooltip.ts'
import './style.scss'


let localData = <any>{};
let localOptions = <any>{};

export namespace ibmD3 {
	export const margin = {
		top: 20,
		bottom: 50,
		left: 70,
		right: 20
	};
	export function getActualChartSize(options) {
		return {
			height: options.height - margin.top - margin.bottom,
			width: options.width - margin.left - margin.right
		}
	}
	export function updateData(data) {
		localData = data
	}
	export function removeChart(container) {
		container.select('svg').remove();
	}
	export function renderChart(data, container, options) {
		localData = data;
		container.classed("ibmD3-chart-wrapper", true);
		container.append("div").attr("class", "legend");
		options.chartSize = getActualChartSize(options);;
		localOptions = options;

		setResizable(container);
		let svg = setSVG(container, options);
		let xScale = setXScale(data, options);
		let yScale = setYScale(data, options, getActiveDataSeries(container));

		Axis.drawXAxis(svg, xScale, options, data);
		Axis.drawYAxis(svg, yScale, options, data);
		Grid.drawXGrid(svg, xScale, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			setClickableLegend(data, container, options)
		}
		drawChart(data, container, options);
		// drawChart(svg, xScale, yScale, options, data, getActiveDataSeries(container));
	}
	export function getData() {
		return
	}

	export function setSVG(container, options) {
		const chartSize = getActualChartSize(options);
		let svg = container.append("svg")
			.attr("width", options.width)
			.attr("height", options.height)
			.append("g")
			.attr("class", "inner-wrap")
			.attr("transform", `translate(${margin.left},${margin.top})`);
		svg.append("g")
			.attr("class", "y axis")
			.attr("transform", `translate(0, 0)`);
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", `translate(0, ${chartSize.height})`);
		let grid = svg.append("g")
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

	export function drawChart(data, container, options) {
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
				Lines.drawChart(data, container, options);
				break;
			case "combo":
				renderCombo(data, container, options);
				break;
			default:
				Bars.drawChart(data, container, options);
				break;
		}
	}

	export function setTooltip() {
		const tooltip = d3.selectAll(".chart-tooltip");
		if (tooltip.nodes().length < 1) {
			let tooltip = d3.select("body").append("div")
				.attr("class", "tooltip chart-tooltip")
				.style("display", "none");
			tooltip.append("span")
				.attr("class", "text-box")
			tooltip.append("span")
				.attr("class", "close-btn")
				.text("x")
		}
	}

	export function setTooltipCloseEventListener(opacityFunc) {
		d3.select(".close-btn").on("click", () => {
			Tooltip.hide()
			opacityFunc();
		});
	}

	export function addTooltipEventListener(svg, elements, reduceOpacity) {
		elements.on("click", function(d) {
			Tooltip.showTooltip(d)
			reduceOpacity(svg, this)
		})
	}

	export function setResizable(container) {
		// d3.select(window).on("resize", (event) => {
		// 	localOptions.chartSize.width =
		// 	updateChart(data, container, options		// });
	}

	export function setXScale(data, options) {
		return d3.scaleBand().range([0, options.width - margin.left - margin.right])
			.domain(data.map(d => d[options.xDomain]));
	}

	export function setYScale(data, options, activeSeries) {
		let yScale = d3.scaleLinear().range([options.height - margin.top - margin.bottom, 0]);
		const keys = activeSeries.length > 0 ? activeSeries : options.yDomain;
		if (options.type === 'stackedBar') {
			const yMax = d3.max(data, d => keys.map(val => d[val]).reduce((acc, cur) => acc + cur, 0));
			yScale.domain([0, yMax])
		} else {
			yScale.domain([0, d3.max(data, d =>
					d3.max(keys.map(domain => d[domain])))
				]);
		}
		return yScale
	}

	export function setClickableLegend(data, container, options) {
		container.selectAll(".legendBtn").each(function(d, i) {
			d3.select(this).on("click", function(d) {
				Legend.updateLegend(this);
				updateChart(data, container, options)
			});
		})
	}

	export function updateChart(data, container, options) {
		container.select("svg").remove();
		drawChart(data, container, options);
	}

	export function getActiveDataSeries(container) {
		const activeSeries = [];
		container.selectAll(".legendBtn").filter(".active").each(function(b) {
			activeSeries.push(d3.select(this).select("text").text())
		})
		return activeSeries;
	}

}

