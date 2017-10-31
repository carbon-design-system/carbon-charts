import * as d3 from "d3";
import { Axis } from "../parts/axis";
import { Grid } from "../parts/grid";
import { Bars } from "../parts/bars";
import { StackedBars } from "../parts/stackedBars";
import { Lines } from "../parts/lines";
import { Legend } from "../parts/legend";
import { Tooltip } from "../parts/tooltip";
import "../style.scss";
import { Charts } from "../index";

export namespace Combo {
	export function drawChart(data, parent, options) {
		options.type = "combo";
		const parentSelection = d3.select(parent);
		const {chartID, container} = Charts.setChartIDContainer(parentSelection);
		if (options.windowResizable) {
			Charts.setResizableWindow();
		}

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
		Charts.redrawFunctions[chartID] = {
			self: this,
			data, parentSelection, options
		};
		const activeBar =  activeSeries.includes(options.yDomain[0]);
		const activeLineSeries = activeBar ? activeSeries.slice(1, activeSeries.length) : activeSeries;

		const xScaleBar = Charts.setXScale(barData, options);
		const xScaleLine = Charts.setXScale(lineData, options);
		Axis.drawXAxis(svg, xScaleBar, options, data);
		const yScale = Charts.setYScale(svg, barData, options, options.yDomain);
		const y2Scale = Charts.setYScale(svg, lineData, options, activeLineSeries);
		const yScaleBar = Charts.setYScale(svg, barData, options, options.yDomain);
		const yScaleLine = Charts.setYScale(svg, lineData, options, activeLineSeries);
		Axis.drawYAxis(svg, yScale, options, barData);
		Axis.drawY2Axis(svg, y2Scale, options, lineData);
		Grid.drawXGrid(svg, xScaleBar, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		Legend.positionLegend(container, data, options);
		Charts.repositionSVG(container);
		if (activeBar) {
			Bars.draw(svg, xScaleBar, yScale, options, data, options.yDomain);
		}
		Lines.draw(svg, xScaleLine, yScaleLine, options, data, activeLineSeries);
		addDataPointEventListener(parent, svg);
		if (options.containerResizable) {
			Charts.setResizeWhenContainerChange(chartID, data, parent, options);
		}
	}
}

function addDataPointEventListener(parent, svg) {
	svg.selectAll("rect")
		.on("mouseover", function (d) {
			d3.select(this)
				.attr("stroke-width", 6)
				.attr("stroke", d.color)
				.attr("stroke-opacity", 0.5);
		})
		.on("mouseout", function (d) {
			d3.select(this)
				.attr("stroke-width", 0)
				.attr("stroke", "none")
				.attr("stroke-opacity", 1);
		})
		.on("click", function(d) {
			Tooltip.showTooltip(parent, d, resetLineBarOpacity);
			reduceOpacity(svg, this);
		});
	svg.selectAll("circle")
		.on("click", function(d) {
			Tooltip.showTooltip(parent, d, resetLineBarOpacity);
			reduceOpacity(svg, this);
		})
		.on("mouseover", function (d) {
			svg.append("circle").attr("class", "hover-glow")
				.attr("r", 5.5)
				.attr("fill", "none")
				.attr("stroke-width", 4)
				.attr("stroke", d.color)
				.attr("stroke-opacity", 0.5)
				.attr("cx", this.cx.baseVal.value)
				.attr("cy", this.cy.baseVal.value);
		})
		.on("mouseout", function (d) {
			svg.selectAll(".hover-glow").remove();
		});
}

function reduceOpacity(svg, exception) {
	if (exception.tagName === "rect") {
		svg.selectAll("rect").attr("fill-opacity", 0.25);
		d3.select(exception).attr("fill-opacity", false);
		svg.selectAll("path").attr("stroke-opacity", 0.25);
		svg.selectAll("circle").attr("stroke-opacity", 0.25);
	} else if (exception.tagName === "circle") {
		svg.selectAll("rect").attr("fill-opacity", 0.25);
		svg.selectAll("path").attr("stroke-opacity", 0.25);
		svg.selectAll("circle").attr("stroke-opacity", 0.25);
		d3.select(exception.parentNode).select("path").attr("stroke-opacity", 1);
		d3.select(exception.parentNode).selectAll("circle").attr("stroke-opacity", 1);
		d3.select(exception).attr("stroke-opacity", 1);
		d3.select(exception).attr("fill", d3.select(exception).attr("stroke"));
	}
}

function resetLineBarOpacity() {
	const svg = d3.selectAll("svg");
	svg.selectAll("path").attr("stroke-opacity", 1);
	svg.selectAll("circle").attr("stroke-opacity", 1)
		.attr("fill", "white");
	svg.selectAll("rect").attr("fill-opacity", 1);
}
