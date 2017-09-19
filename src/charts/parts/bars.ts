import * as d3 from 'd3'
import {Axis} from './axis.ts'
import {Grid} from './grid.ts'
import {Legend} from './legend.ts'
import {Tooltip} from './tooltip.ts'
import '../style.scss'
import {Charts} from '../index.ts'

export namespace Bars {
	export function drawChart(data, parent, options) {
		options.type = 'bar';
		let parentSelection = d3.select(parent);
		let {chartID, container} = Charts.setChartIDContainer(parentSelection);
		options.chartSize = Charts.getActualChartSize(data, container, options);
		let svg = Charts.setSVG(data, container, options);
		let xScale = Charts.setXScale(data, options);
		const activeDataSeries = Charts.getActiveDataSeries(container)
		let yScale = Charts.setYScale(data, options, Charts.getActiveDataSeries(container));

		Axis.drawXAxis(svg, xScale, options, data);
		Axis.drawYAxis(svg, yScale, options, data);
		Grid.drawXGrid(svg, xScale, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			Charts.setClickableLegend(data, parent, options)
		}
		if (!Charts.redrawFunctions[chartID]) {
			Charts.redrawFunctions[chartID] = {
				self: this,
				data, parentSelection, options
			}
		}

		draw(svg, xScale, yScale, options, data, Charts.getActiveDataSeries(container));
		Charts.addTooltipEventListener(parent, svg, svg.selectAll("rect"), reduceOpacity, resetBarOpacity);
		if (options.containerResizable) {
			Charts.setResizeWhenContainerChange(data, parent, options);
		}
		if (options.windowResizable) {
			Charts.setResizableWindow();
		}
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
			.data(d => keys.map(key => ({
				xAxis: options.xDomain,
				series: key,
				key: d[options.xDomain],
				value: d[key],
				formatter: options.yFormatter
			})))
			.enter().append("rect")
				.attr("x", d => x1(d.series))
				.attr("y", d => options.chartSize.height)
				.attr("width", x1.bandwidth())
				.attr("height", 0)
				.attr("fill", d => color(d.series))
				.transition()
				.duration(1000)
				.ease(d3.easePolyOut, 0.5)
				.attr("y", d => yScale(d.value))
				.attr("height", d => options.chartSize.height - yScale(d.value))
		svg.selectAll("rect")
			.on('mouseover', function (d) {
				d3.select(this)
	      	.attr("stroke-width", 4)
	      	.attr("stroke", color(d.series))
	      	.attr("stroke-opacity", 0.5)
	    })
	    .on('mouseout', function (d) {
	    	d3.select(this)
	      	.attr("stroke-width", 0)
	      	.attr("stroke", "none")
	      	.attr("stroke-opacity", 1)
	    })
	}

	export function resetBarOpacity() {
		d3.selectAll("svg").selectAll("rect").attr("fill-opacity", 1)
	}
}

function reduceOpacity(svg, exceptionRect) {
	svg.selectAll("rect").attr("fill-opacity", 0.25)
	d3.select(exceptionRect).attr("fill-opacity", false)
}


