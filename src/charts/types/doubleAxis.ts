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

let localData = <any>{};
let localOptions = <any>{};
export namespace DoubleAxis {
	export function drawChart(data, parent, options) {
		options.type = 'doubleAxis';
		let parentSelection = d3.select(parent);
		let {chartID, container} = Charts.setChartIDContainer(parentSelection)
		if (options.windowResizable) {
			Charts.setResizableWindow();
		}
		options.chartSize = Charts.getActualChartSize(data, container, options);
		localOptions = options;
		let svg = Charts.setSVG(data, container, options);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			Charts.setClickableLegend(data, parentSelection, options)
		}
		const activeSeries = <any>Charts.getActiveDataSeries(container);
		const y1ActiveSeries = options.yDomain.filter(val => activeSeries.includes(val))
		const y2ActiveSeries = options.y2Domain.filter(val => activeSeries.includes(val))
		let xScale = Charts.setXScale(data, options);
		let yScale = Charts.setYScale(data, options, y1ActiveSeries);
		let y2Scale = Charts.setYScale(data, options, y2ActiveSeries);

		Axis.drawXAxis(svg, xScale, options, data);
		Axis.drawYAxis(svg, yScale, options, data);
		Grid.drawXGrid(svg, xScale, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		svg.select(".inner-wrap").append("g")
			.attr("class", "y2 axis")
		Axis.drawY2Axis(svg, y2Scale, options, data);
		Charts.redrawFunctions[chartID] = {
			self: this,
			data, parentSelection, options
		}
		Legend.positionLegend(container, data, options);
		Lines.draw(svg, xScale, yScale, options, data, y1ActiveSeries);
		Lines.draw(svg, xScale, y2Scale, options, data, y2ActiveSeries);
		Charts.addTooltipEventListener(parent, svg, svg.selectAll("circle"), Lines.reduceOpacity, Lines.resetLineOpacity);
		if (options.containerResizable) {
			Charts.setResizeWhenContainerChange(data, parent, options);
		}
	}
}
