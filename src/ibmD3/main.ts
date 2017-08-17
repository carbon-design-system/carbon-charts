// export {HelloWorld} from './hello-world'
import * as d3 from 'd3'
import {Axis} from './parts/axis.ts'
import {Grid} from './parts/grid.ts'
import {Bars} from './parts/bars.ts'
import {StackedBars} from './parts/stackedBars.ts'
import {Lines} from './parts/lines.ts'
import {Legend} from './parts/legend.ts'
import {Tooltip} from './parts/tooltip.ts'
import './style.scss'

const margin = {
	top: 20,
	bottom: 50,
	left: 70,
	right: 20
};

let localData = <any>{};
let localOptions = <any>{};

export namespace ibmD3 {
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
		const chartSize = {
			height: options.height - margin.top - margin.bottom,
			width: options.width - margin.left - margin.right
		}
		options.chartSize = chartSize;
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
			setClickableLegend(container)
		}

		putDataIn(svg, xScale, yScale, options, data, getActiveDataSeries(container));
	}
	export function getData() {
		return
	}
}

function setSVG(container, options) {
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
		.attr("transform", `translate(0, ${options.chartSize.height})`);
	let grid = svg.append("g")
		.attr("class", "grid")
		.attr("clip-path", `url(${window.location.origin}${window.location.pathname}#clip)`);
	grid.append("g")
		.attr("class", "x grid")
		.attr("transform", `translate(0, ${options.chartSize.width})`);
	grid.append("g")
		.attr("class", "y grid")
		.attr("transform", `translate(0, 0)`);
	return svg;
}

function putDataIn(svg, xScale, yScale, options, data, activeSeries) {
	switch (options.type) {
		case "bar":
			setTooltip(resetBarOpacity(svg, 1));
			Bars.draw(svg, xScale, yScale, options, data, activeSeries);
			break;
		case "stackedBar":
			setTooltip(resetBarOpacity(svg, 1));
			StackedBars.draw(svg, xScale, yScale, options, data, activeSeries);
			break;
		case "line":
			setTooltip(resetLineOpacity(svg, 1));
			Lines.draw(svg, xScale, yScale, options, data, activeSeries);
			break;
		default:
			Bars.draw(svg, xScale, yScale, options, data, activeSeries);
			break;
	}
}

function resetBarOpacity(container, opacity) {
	return function() {
		container.selectAll("rect").attr("fill-opacity", opacity)
	}
}

function resetLineOpacity(container, opacity) {
	return function() {
		container.selectAll("path").attr("stroke-opacity", opacity)
		container.selectAll("circle").attr("stroke-opacity", opacity)
	}
}

function setTooltip(opacityFunc) {
	if (d3.selectAll(".chart-tooltip").nodes().length < 1) {
		let tooltip = d3.select("body").append("div")
			.attr("class", "tooltip chart-tooltip")
			.style("display", "none");
		tooltip.append("span")
			.attr("class", "text-box")
		tooltip.append("span")
			.attr("class", "close-btn")
			.text("x")
			.on("click", () => {
				Tooltip.hide()
				console.log(opacityFunc)
				opacityFunc();
			});
	}
}

function setResizable(container) {
	// d3.select(window).on("resize", (event) => {
	// 	localOptions.chartSize.width =
	// 	updateChart(container)
	// });
}

function setXScale(data, options) {
	return d3.scaleBand().range([0, options.width - margin.left - margin.right])
		.domain(data.map(d => d[options.xDomain]));
}

function setYScale(data, options, activeSeries) {
	let yScale = d3.scaleLinear().range([options.height - margin.top - margin.bottom, 0]);
	const keys = activeSeries ? activeSeries : options.yDomain;
	if (options.type === 'stackedBar') {
		const yMax = d3.max(data, d => keys.map(val => d[val]).reduce((acc, cur) => acc + cur, 0));
		yScale.domain([0, yMax])
	} else {
		yScale.domain([0, d3.max(data, d =>
				d3.max(options.yDomain.map(domain => d[domain])))
			]);
	}
	return yScale
}

function setClickableLegend(container) {
	container.selectAll(".legendBtn").each(function(d, i) {
		d3.select(this).on("click", function(d) {
			Legend.updateLegend(this);
			updateChart(container)
		});
	})
}

function updateChart(container) {
	container.select("svg").remove();
	let svg = setSVG(container, localOptions)
	let xScale = setXScale(localData, localOptions);
	let yScale = setYScale(localData, localOptions, getActiveDataSeries(container));

	Axis.drawXAxis(svg, xScale, localOptions, localData);
	Axis.drawYAxis(svg, yScale, localOptions, localData);
	Grid.drawXGrid(svg, xScale, localOptions, localData);
	Grid.drawYGrid(svg, yScale, localOptions, localData);
	// container.selectAll(".legend").remove();
	Legend.addLegend(container, localData, localOptions);
	if (localOptions.legendClickable) {
		setClickableLegend(container)
	}
	putDataIn(svg, xScale, yScale, localOptions, localData, getActiveDataSeries(container));
}

function getActiveDataSeries(container) {
	const activeSeries = [];
	container.selectAll(".legendBtn").filter(".active").each(function(b) {
		activeSeries.push(d3.select(this).select("text").text())
	})
	return activeSeries;
}

