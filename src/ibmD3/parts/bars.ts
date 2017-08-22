import * as d3 from 'd3'
import {Axis} from './axis.ts'
import {Grid} from './grid.ts'
import {Legend} from './legend.ts'
import {Tooltip} from './tooltip.ts'
import '../style.scss'
import {ibmD3} from '../main.ts'
let localData = <any>{};
let localOptions = <any>{};

export namespace Bars {
	export function drawChart(data, container, options) {
		localData = data;
		container.classed("ibmD3-chart-wrapper", true);
		if (container.select(".legend").nodes().length === 0) {
			container.append("div").attr("class", "legend");
		}
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
		ibmD3.setTooltip();
		ibmD3.setTooltipCloseEventListener(resetBarOpacity);
		ibmD3.addTooltipEventListener(svg, d3.selectAll("rect"), reduceOpacity);
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
	d3.select("svg").selectAll("rect").attr("fill-opacity", 1)
}

