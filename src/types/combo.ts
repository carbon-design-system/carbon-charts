import * as d3 from "d3";
import { Axis } from "../parts/axis";
import { Grid } from "../parts/grid";
import { Bars } from "../parts/bars";
import { Lines } from "../parts/lines";
import { Legend } from "../parts/legend";
import { Tooltip } from "../parts/tooltip";
import "../style.scss";
import { Charts } from "../index";
import { Configuration } from "../configuration";

export namespace Combo {
	export function drawChart(data, parent, options) {
		options.type = "combo";
		const parentSelection = d3.select(parent);
		const {chartID, container} = Charts.setChartIDContainer(parentSelection);

		options.chartSize = Charts.getActualChartSize(data, container, options);
		const svg = Charts.setSVG(data, container, options);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			Charts.setClickableLegend(data, parentSelection, options);
		}
		const activeSeries = <any>Charts.getActiveDataSeries(container);

		const barData = [];
		const lineData = [];
		data.forEach((d) => {
			const barDataObj = {};
			const lineDataObj = {};
			barDataObj[options.xDomain] = d[options.xDomain];
			lineDataObj[options.xDomain] = d[options.xDomain];
			barDataObj[options.yDomain] = d[options.yDomain];
			barData.push(barDataObj);
			for (let i = 0; i < options.y2Domain.length; i++) {
				lineDataObj[options.y2Domain[i]] = d[options.y2Domain[i]];
			}
			lineData.push(lineDataObj);
		});
		const activeBar =  activeSeries.includes(options.yDomain[0]);
		const activeLineSeries = activeBar ? activeSeries.slice(1, activeSeries.length) : activeSeries;

		const xScaleBar = Charts.setXScale(barData, options);
		const xScaleLine = Charts.setXScale(lineData, options);
		Axis.drawXAxis(svg, xScaleBar, options);
		const yScale = Charts.setYScale(svg, barData, options, options.yDomain);
		const y2Scale = Charts.setYScale(svg, lineData, options, activeLineSeries);
		Axis.drawYAxis(svg, yScale, options);
		Axis.drawY2Axis(svg, y2Scale, options);
		Grid.drawXGrid(svg, xScaleBar, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		Legend.positionLegend(container, data, options);
		Charts.repositionSVG(container);
		if (activeBar) {
			Bars.draw(svg, xScaleBar, yScale, options, data, options.yDomain);
		}
		Lines.draw(svg, xScaleLine, y2Scale, options, data, activeLineSeries);
		addDataPointEventListener(parent, svg);
		if (options.containerResizable) {
			Charts.setResizeWhenContainerChange(data, parent, options);
		}
	}
}

function addDataPointEventListener(parent, svg) {
	svg.selectAll("rect")
		.on("mouseover", function(d) {
			d3.select(this)
				.attr("stroke-width", Configuration.bars.mouseover.strokeWidth)
				.attr("stroke", d.color)
				.attr("stroke-opacity", Configuration.bars.mouseover.strokeOpacity);
		})
		.on("mouseout", function() {
			d3.select(this)
				.attr("stroke-width", Configuration.bars.mouseout.strokeWidth)
				.attr("stroke", "none")
				.attr("stroke-opacity", Configuration.bars.mouseout.strokeOpacity);
		})
		.on("click", function(d) {
			Tooltip.showTooltip(parent, d);
			Charts.reduceOpacity(svg, this);
		});
	svg.selectAll("circle")
		.on("click", function(d) {
			Tooltip.showTooltip(parent, d);
			Charts.reduceOpacity(svg, this);
		})
		.on("mouseover", function(d) {
			svg.append("circle").attr("class", Configuration.lines.mouseover.class)
				.attr("r", Configuration.lines.mouseover.r)
				.attr("fill", Configuration.lines.mouseover.fill)
				.attr("stroke-width", Configuration.lines.mouseover.strokeWidth)
				.attr("stroke", d.color)
				.attr("stroke-opacity", Configuration.lines.mouseover.strokeOpacity)
				.attr("cx", this.cx.baseVal.value)
				.attr("cy", this.cy.baseVal.value);
		})
		.on("mouseout", function() {
			svg.selectAll(`.${Configuration.lines.mouseover.class}`).remove();
		});
}
