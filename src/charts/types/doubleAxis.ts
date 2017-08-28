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
		parent.style('padding-right', '80px')
		let {chartID, container} = Charts.setChartIDContainer(parent)
		Charts.setResizable()
		options.chartSize = Charts.getActualChartSize(container, options);
		localOptions = options;
		let svg = Charts.setSVG(container, options);
		let xScale = Charts.setXScale(data, options);
		let yScale = Charts.setYScale(data, options, Charts.getActiveDataSeries(container));
		let y2Scale = Charts.setYScale(data, options, options.y2Domain);

		Axis.drawXAxis(svg, xScale, options, data);
		Axis.drawYAxis(svg, yScale, options, data);
		Grid.drawXGrid(svg, xScale, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		svg.select(".inner-wrap").append("g")
			.attr("class", "y2 axis")
		Axis.drawY2Axis(svg, y2Scale, options, data);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			Charts.setClickableLegend(data, parent, options)
		}
		Charts.redrawFunctions[chartID] = {
			self: this,
			data, parent, options
		}

		Lines.draw(svg, xScale, yScale, options, data, Charts.getActiveDataSeries(container));
		Lines.setTooltip(chartID, svg);
	}
}
