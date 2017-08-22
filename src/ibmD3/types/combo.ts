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
	options.type = 'combo';
	localData = data;
	container.classed("ibmD3-chart-wrapper", true);
	if (container.select(".legend").nodes().length === 0) {
		container.append("div").attr("class", "legend");
	}
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
	const activeSeries = <any>ibmD3.getActiveDataSeries(container);
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

	let svg = ibmD3.setSVG(container, options);
	let xScaleBar = ibmD3.setXScale(barData, options);
	let xScaleLine = ibmD3.setXScale(lineData, options);
	let yScale = ibmD3.setYScale(barData, options, options.yDomain);
	let y2Scale = ibmD3.setYScale(lineData, options, activeLineSeries);
	let yScaleBar = ibmD3.setYScale(barData, options, options.yDomain);
	let yScaleLine = ibmD3.setYScale(lineData, options, activeLineSeries);

	Axis.drawXAxis(svg, xScaleBar, options, data);
	Axis.drawYAxis(svg, yScale, options, barData);
	Axis.drawY2Axis(svg, y2Scale, options, lineData);
	Grid.drawXGrid(svg, xScaleBar, options, data);
	Grid.drawYGrid(svg, yScale, options, data);

	if (activeBar) {
		Bars.draw(svg, xScaleBar, yScale, options, data, options.yDomain);
	}
	Lines.draw(svg, xScaleLine, yScaleLine, options, data, activeLineSeries);

	ibmD3.setTooltip();
	ibmD3.addTooltipEventListener(svg, d3.selectAll("rect"), reduceOpacity);
	ibmD3.addTooltipEventListener(svg, d3.selectAll("circle"), reduceOpacity);
	ibmD3.setTooltipCloseEventListener(resetLineBarOpacity);
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
	const svg = d3.select("svg");
	svg.selectAll("path").attr("stroke-opacity", 1)
	svg.selectAll("circle").attr("stroke-opacity", 1)
		.attr("fill", "white")
	svg.selectAll("rect").attr("fill-opacity", 1)
}
