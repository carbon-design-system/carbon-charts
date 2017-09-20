// export {HelloWorld} from './hello-world'
import * as d3 from 'd3'
import {Axis} from '../parts/axis.ts'
import {Grid} from '../parts/grid.ts'
import {Bars} from '../parts/bars.ts'
import {StackedBars} from '../parts/stackedBars.ts'
import {Lines} from '../parts/lines.ts'
import {Legend} from '../parts/legend.ts'
import {Tooltip} from '../parts/tooltip.ts'
import '../style.scss'
import {Charts} from '../index.ts'

export namespace Combo {
	export function drawChart(data, parent, options) {
		options.type = 'combo';
		let parentSelection = d3.select(parent);
		parentSelection.style('padding-right', '80px');
		let {chartID, container} = Charts.setChartIDContainer(parentSelection)
		if (options.windowResizable) {
			Charts.setResizableWindow();
		}

		options.chartSize = Charts.getActualChartSize(data, container, options);
		let svg = Charts.setSVG(data, container, options);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			Charts.setClickableLegend(data, parentSelection, options)
		}
		const activeSeries = <any>Charts.getActiveDataSeries(container);
		const activeBar =  activeSeries.includes(options.yDomain[0]);
		const activeLineSeries = activeBar ? activeSeries.slice(1, activeSeries.length) : activeSeries;

		const barData = [];
		const lineData = [];
		data.forEach((d) => {
			let barDataObj = {};
			let lineDataObj = {};
			barDataObj[options.xDomain] = d[options.xDomain];
			lineDataObj[options.xDomain] = d[options.xDomain];
			barDataObj[options.yDomain] = d[options.yDomain];
			barData.push(barDataObj);
			for (let i = 0; i < options.y2Domain.length; i++) {
				lineDataObj[options.y2Domain[i]] = d[options.y2Domain[i]];
			}
			lineData.push(lineDataObj);
		})
		Charts.redrawFunctions[chartID] = {
			self: this,
			data, parentSelection, options
		}

		let xScaleBar = Charts.setXScale(barData, options);
		let xScaleLine = Charts.setXScale(lineData, options);
		let yScale = Charts.setYScale(barData, options, options.yDomain);
		let y2Scale = Charts.setYScale(lineData, options, activeLineSeries);
		let yScaleBar = Charts.setYScale(barData, options, options.yDomain);
		let yScaleLine = Charts.setYScale(lineData, options, activeLineSeries);

		Axis.drawXAxis(svg, xScaleBar, options, data);
		Axis.drawYAxis(svg, yScale, options, barData);
		Axis.drawY2Axis(svg, y2Scale, options, lineData);
		Grid.drawXGrid(svg, xScaleBar, options, data);
		Grid.drawYGrid(svg, yScale, options, data);

		if (activeBar) {
			Bars.draw(svg, xScaleBar, yScale, options, data, options.yDomain);
		}
		Lines.draw(svg, xScaleLine, yScaleLine, options, data, activeLineSeries);
		Charts.addTooltipEventListener(parent, svg, svg.selectAll("rect"), reduceOpacity, resetLineBarOpacity);
		Charts.addTooltipEventListener(parent, svg, svg.selectAll("circle"), reduceOpacity, resetLineBarOpacity);
		if (options.containerResizable) {
			Charts.setResizeWhenContainerChange(data, parent, options);
		}
	}
}

function reduceOpacity(svg, exception) {
	if (exception.tagName === "rect") {
		svg.selectAll("rect").attr("fill-opacity", 0.25)
		d3.select(exception).attr("fill-opacity", false)
		svg.selectAll("path").attr("stroke-opacity", 0.25)
		svg.selectAll("circle").attr("stroke-opacity", 0.25)
	} else if (exception.tagName === "circle") {
		svg.selectAll("rect").attr("fill-opacity", 0.25)
		svg.selectAll("path").attr("stroke-opacity", 0.25)
		svg.selectAll("circle").attr("stroke-opacity", 0.25)
		d3.select(exception.parentNode).select("path").attr("stroke-opacity", 1)
		d3.select(exception.parentNode).selectAll("circle").attr("stroke-opacity", 1)
		d3.select(exception).attr("stroke-opacity", 1)
		d3.select(exception).attr("fill", d3.select(exception).attr("stroke"))
	}
}

function resetLineBarOpacity() {
	const svg = d3.selectAll("svg");
	svg.selectAll("path").attr("stroke-opacity", 1)
	svg.selectAll("circle").attr("stroke-opacity", 1)
		.attr("fill", "white")
	svg.selectAll("rect").attr("fill-opacity", 1)
}
