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

export function renderDoubleAxis(data, container, options, type) {
	Lines.drawChart(data, container, options)
	console.log(options)
	const svg = container.select('svg')
	let yScale = ibmD3.setYScale(data, options, options.y2Domain);
	svg.select(".inner-wrap").append("g")
		.attr("class", "y2 axis")
	Axis.drawY2Axis(svg, yScale, options, data);
}
