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
import {ibmD3} from '../main.ts'

let localData = <any>{};
let localOptions = <any>{};
export namespace DoubleAxis {
	export function drawChart(data, parent, options) {
		parent.style('padding-right', '80px')
		let {chartID, container} = ibmD3.setChartIDContainer(parent)
		ibmD3.setResizable()
		options.chartSize = ibmD3.getActualChartSize(container, options);
		localOptions = options;
		let svg = ibmD3.setSVG(container, options);
		let xScale = ibmD3.setXScale(data, options);
		let yScale = ibmD3.setYScale(data, options, ibmD3.getActiveDataSeries(container));
		let y2Scale = ibmD3.setYScale(data, options, options.y2Domain);

		Axis.drawXAxis(svg, xScale, options, data);
		Axis.drawYAxis(svg, yScale, options, data);
		Grid.drawXGrid(svg, xScale, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		svg.select(".inner-wrap").append("g")
			.attr("class", "y2 axis")
		Axis.drawY2Axis(svg, y2Scale, options, data);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			ibmD3.setClickableLegend(data, parent, options)
		}
		ibmD3.redrawFunctions[chartID] = {
			self: this,
			data, parent, options
		}

		Lines.draw(svg, xScale, yScale, options, data, ibmD3.getActiveDataSeries(container));
		Lines.setTooltip(chartID, svg);
	}
}
