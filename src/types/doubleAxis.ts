import * as d3 from "d3";
import { Axis } from "../parts/axis";
import { Grid } from "../parts/grid";
import { Lines } from "../parts/lines";
import { Legend } from "../parts/legend";
import "../style.scss";
import { Charts } from "../index";

export namespace DoubleAxis {
	export function drawChart(data, parent, options) {
		options.type = "double-axis-line";
		const parentSelection = d3.select(parent);
		const {chartID, container} = Charts.setChartIDContainer(parentSelection);
		options.chartSize = Charts.getActualChartSize(data, container, options);
		const svg = Charts.setSVG(data, container, options);
		Legend.addLegend(container, data, options);
		if (options.legendClickable) {
			Charts.setClickableLegend(data, parentSelection, options);
		}
		const activeSeries = <any>Charts.getActiveDataSeries(container);
		const y1ActiveSeries = options.yDomain.filter(val => activeSeries.includes(val));
		const y2ActiveSeries = options.y2Domain.filter(val => activeSeries.includes(val));

		const xScale = Charts.setXScale(data, options);
		Axis.drawXAxis(svg, xScale, options);
		const yScale = Charts.setYScale(svg, data, options, y1ActiveSeries);
		const y2Scale = Charts.setYScale(svg, data, options, y2ActiveSeries);
		Axis.drawYAxis(svg, yScale, options);
		svg.select(".inner-wrap").append("g")
			.attr("class", "y2 axis");
		Axis.drawY2Axis(svg, y2Scale, options);
		Grid.drawXGrid(svg, xScale, options, data);
		Grid.drawYGrid(svg, yScale, options, data);
		Legend.positionLegend(container, data, options);
		Charts.repositionSVG(container);
		Lines.draw(svg, xScale, yScale, options, data, y1ActiveSeries);
		Lines.draw(svg, xScale, y2Scale, options, data, y2ActiveSeries);
		Lines.addDataPointEventListener(parent, svg);
		if (options.containerResizable) {
			Charts.setResizeWhenContainerChange(data, parent, options);
		}
	}
}
