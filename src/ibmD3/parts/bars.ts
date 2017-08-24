import * as d3 from 'd3'
import {Axis} from './axis.ts'
import {Grid} from './grid.ts'
import {Legend} from './legend.ts'
import {Tooltip} from './tooltip.ts'
import '../style.scss'
import {ibmD3} from '../main.ts'

export namespace Bars {
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
		setTooltip(chartID, svg)
	}

	export function setTooltip(chartID, svg) {
		ibmD3.setTooltip(chartID);
		ibmD3.setTooltipCloseEventListener(chartID, resetBarOpacity);
		ibmD3.addTooltipEventListener(chartID, svg, svg.selectAll("rect"), reduceOpacity);
	}

	export function draw(svg, xScale, yScale, options, data, activeSeries) {
		xScale.padding(0.1)
		const keys = activeSeries ? activeSeries : options.yDomain;
		const x1 = d3.scaleBand();
		x1.domain(keys).rangeRound([0, xScale.bandwidth()]);
		const color = d3.scaleOrdinal().range(options.colors).domain(options.yDomain);
		svg.append("g")
			.attr("class", "bars")
			.selectAll("g")
			.data(data)
			.enter().append("g")
				.attr("transform", d => "translate(" + xScale(d[options.xDomain]) + ",0)")
			.selectAll("rect")
			.data(d => keys.map(key => ({xAxis: options.xDomain, series: key, key: d[options.xDomain], value: d[key]})))
			.enter().append("rect")
				.attr("x", d => x1(d.series))
				.attr("y", d => yScale(d.value))
				.attr("width", x1.bandwidth())
				.attr("height", d => options.chartSize.height - yScale(d.value))
				.attr("fill", d => color(d.series));
	}

}

function reduceOpacity(svg, exceptionRect) {
	svg.selectAll("rect").attr("fill-opacity", 0.25)
	d3.select(exceptionRect).attr("fill-opacity", false)
}

function resetBarOpacity() {
	d3.selectAll("svg").selectAll("rect").attr("fill-opacity", 1)
}

