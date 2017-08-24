import * as d3 from 'd3'
import {Axis} from './axis.ts'
import {Grid} from './grid.ts'
import {Legend} from './legend.ts'
import {Tooltip} from './tooltip.ts'
import '../style.scss'
import {ibmD3} from '../main.ts'

export namespace StackedBars {
	export function drawChart(data, parent, options) {
		let {chartID, container} = ibmD3.setChartIDContainer(parent)
		ibmD3.setResizable();
		options.chartSize = ibmD3.getActualChartSize(container, options);

		let svg = ibmD3.setSVG(container, options);
		let xScale = ibmD3.setXScale(data, options);
		let yScale = ibmD3.setYScale(data, options, ibmD3.getActiveDataSeries(container));

		Axis.drawXAxis(svg, xScale, options, data);
		Axis.drawYAxis(svg, yScale, options, data);
		Grid.drawXGrid(svg, xScale, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			ibmD3.setClickableLegend(data, parent, options)
		}
		ibmD3.redrawFunctions[chartID] = {
			self: this,
			data, parent, options
		}

		draw(svg, xScale, yScale, options, data, ibmD3.getActiveDataSeries(container));
		setTooltip(chartID, svg);
	}

	export function setTooltip(chartID, svg) {
		ibmD3.setTooltip(chartID);
		ibmD3.setTooltipCloseEventListener(chartID, resetBarOpacity);
		ibmD3.addTooltipEventListener(chartID, svg, svg.selectAll("rect"), reduceOpacity);
	}

	export function draw(svg, xScale, yScale, options, data, activeSeries) {
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
			.style("fill", d => color(d.series));
	}
}

function reduceOpacity(svg, exceptionRect) {
	svg.selectAll("rect").attr("fill-opacity", 0.25)
	d3.select(exceptionRect).attr("fill-opacity", false)
}

function resetBarOpacity() {
	d3.selectAll("svg").selectAll("rect").attr("fill-opacity", 1)
}

