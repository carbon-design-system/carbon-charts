import * as d3 from "d3";
import { LineChart } from "./line-chart";
import { Configuration } from "./configuration";

export class DoubleAxisLineChart extends LineChart {
	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "double-axis-line";
	}

	drawChart(data?: any) {
		if (data) {
			this.data = data;
		}

		this.setSVG();

		this.addLegend();
		if (this.options.legendClickable) {
			this.setClickableLegend();
		}

		const activeSeries = <any>this.getActiveDataSeries();
		const y1ActiveSeries = this.options.yDomain.filter(val => activeSeries.includes(val));
		const y2ActiveSeries = this.options.y2Domain.filter(val => activeSeries.includes(val));

		this.setXScale();
		this.drawXAxis();
		const yScale = this.setYScale(this.data, y1ActiveSeries);
		const y2Scale = this.setYScale(this.data, y2ActiveSeries);
		this.drawYAxis(yScale);
		this.svg.select(".inner-wrap").append("g")
			.attr("class", "y2 axis");
		this.drawY2Axis(y2Scale);
		this.drawXGrid();
		this.drawYGrid(yScale);
		this.positionLegend();
		this.repositionSVG();
		this.draw(yScale, y1ActiveSeries);
		this.draw(y2Scale, y2ActiveSeries);

		this.positionLegend();
		this.repositionSVG();

		this.addDataPointEventListener();
		if (this.options.containerResizable) {
			this.setResizeWhenContainerChange();
		}
	}


	addDataPointEventListener() {
		const self = this;
		this.svg.selectAll("circle")
		.on("click", function(d) {
			self.showTooltip(d);
			self.reduceOpacity(this);
		})
		.on("mouseover", function(d) {
			self.svg.append("circle").attr("class", Configuration.lines.mouseover.class)
				.attr("r", Configuration.lines.mouseover.r)
				.attr("fill", Configuration.lines.mouseover.fill)
				.attr("stroke-width", Configuration.lines.mouseover.strokeWidth)
				.attr("stroke", d.color)
				.attr("stroke-opacity", Configuration.lines.mouseover.strokeOpacity)
				.attr("cx", this.cx.baseVal.value)
				.attr("cy", this.cy.baseVal.value);
		})
		.on("mouseout", function() {
			self.svg.selectAll(`.${Configuration.lines.mouseover.class}`).remove();
		});
	}
}
