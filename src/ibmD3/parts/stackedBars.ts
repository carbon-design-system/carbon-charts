import * as d3 from 'd3'
import {Axis} from './axis.ts'
import {Grid} from './grid.ts'
import {Legend} from './legend.ts'
import {Tooltip} from './tooltip.ts'
import '../style.scss'
import {ibmD3} from '../main.ts'
let localData = <any>{};
let localOptions = <any>{};

export namespace StackedBars {
	export function drawChart(data, container, options) {
		ibmD3.setTooltip(resetBarOpacity);
		localData = data;
		container.classed("ibmD3-chart-wrapper", true);
		container.append("div").attr("class", "legend");
		const chartSize = {
			height: options.height - ibmD3.margin.top - ibmD3.margin.bottom,
			width: options.width - ibmD3.margin.left - ibmD3.margin.right
		}
		options.chartSize = chartSize;
		localOptions = options;

		let svg = ibmD3.setSVG(container, options);
		let xScale = ibmD3.setXScale(data, options);
		let yScale = ibmD3.setYScale(data, options, ibmD3.getActiveDataSeries(container));

		Axis.drawXAxis(svg, xScale, options, data);
		Axis.drawYAxis(svg, yScale, options, data);
		Grid.drawXGrid(svg, xScale, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			ibmD3.setClickableLegend(data, container, options)
		}

		draw(svg, xScale, yScale, options, data, ibmD3.getActiveDataSeries(container));
	}

	export function draw(svg, xScale, yScale, options, data, activeSeries) {
		ibmD3.setTooltip(resetBarOpacity);
		const keys = activeSeries ? activeSeries : options.yDomain;
		const x1 = d3.scaleBand();
		xScale.paddingInner(0.2);
		x1.domain(keys).rangeRound([0, xScale.bandwidth()]);
		const color = d3.scaleOrdinal().range(options.colors).domain(options.yDomain);
		data.forEach(d => {
			let y0 = 0;
			let key = d[options.xDomain];
			const xAxis = options.xDomain;
			d.series = keys.map(function(seriesVal) {
				return {xAxis, series: seriesVal, key, y0: y0, y1: y0 += +d[seriesVal], value: d[seriesVal]}; });
			d.total = options.yDomain.map(val => d[val]).reduce((acc, cur) => acc + cur, 0);
		});

		let series = svg.selectAll(".series")
				.data(data)
			.enter().append("g")
			.attr("class", "g")
			.attr("transform", d => "translate(" + (xScale(d[options.xDomain])) + ",0)");

		series.selectAll("rect")
			.data(d => d.series)
			.enter().append("rect")
			.attr("width", xScale.bandwidth())
			.attr("y", d => yScale(d.y1))
			.attr("height", d => yScale(d.y0) - yScale(d.y1))
			.style("fill", d => color(d.series))
			.on("click", function(d) {
				Tooltip.showTooltip(d)
				reduceOpacity(svg, this)
			})
			// .on("mouseover", d => this.tooltipService.updateTooltip(d))
			// .on("mouseout", () => this.tooltipService.hideTooltip());
	}
}

function reduceOpacity(svg, exceptionRect) {
	svg.selectAll("rect").attr("fill-opacity", 0.25)
	d3.select(exceptionRect).attr("fill-opacity", false)
}

function resetBarOpacity() {
	d3.select("svg").selectAll("rect").attr("fill-opacity", 1)
}

