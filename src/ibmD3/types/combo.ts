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

export function renderCombo(data, container, options) {
	localData = data;
	container.classed("ibmD3-chart-wrapper", true);
	container.append("div").attr("class", "legend");
	const chartSize = {
		height: options.height - ibmD3.margin.top - ibmD3.margin.bottom,
		width: options.width - ibmD3.margin.left - ibmD3.margin.right
	}
	Legend.addLegend(container, data, options);
	if (options.legendClickable) {
		ibmD3.setClickableLegend(data, container, options)
	}
	options.chartSize = chartSize;
	localOptions = options;

	const barOption = Object.assign({}, options, {yDomain: [options.yDomain[0]]});
	const lineOption = Object.assign({}, options, {colors: options.colors.slice(1), yDomain: options.yDomain.slice(1)});
	const barData = [];
	const lineData = [];
	data.forEach((d) => {
		let barDataObj = {};
		let lineDataObj = {};
		barDataObj[barOption.xDomain] = d[barOption.xDomain];
		lineDataObj[lineOption.xDomain] = d[lineOption.xDomain];
		barDataObj[barOption.yDomain[0]] = d[barOption.yDomain[0]];
		barData.push(barDataObj);
		for (let i = 0; i < lineOption.yDomain.length; i++) {
			lineDataObj[lineOption.yDomain[i]] = d[lineOption.yDomain[i]];
		}
		lineData.push(lineDataObj);
	})
	d3.max(data, d => d3.max(options.yDomain.map(domain => d[domain])))

	let svg = ibmD3.setSVG(container, options);
	let xScaleBar = ibmD3.setXScale(barData, barOption);
	let xScaleLine = ibmD3.setXScale(lineData, lineOption);
	let yScale = ibmD3.setYScale(data, options, options.yDomain);
	let yScaleBar = ibmD3.setYScale(barData, barOption, barOption.yDomain);
	let yScaleLine = ibmD3.setYScale(lineData, lineOption, lineOption.yDomain);

	Axis.drawXAxis(svg, xScaleBar, barOption, data);
	Axis.drawYAxis(svg, yScale, options, data);
	Grid.drawXGrid(svg, xScaleBar, barOption, data);
	Grid.drawYGrid(svg, yScale, options, data);

	Bars.draw(svg, xScaleBar, yScale, barOption, barData, barOption.yDomain);
	Lines.draw(svg, xScaleLine, yScaleLine, lineOption, lineData, lineOption.yDomain);
}
