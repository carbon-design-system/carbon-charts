import * as d3 from "d3";
import { BaseChart } from "./base-chart";
import { Configuration } from "./configuration";

export class PieChart extends BaseChart {
	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "pie";
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

		this.positionLegend();
		this.repositionSVG();
		this.draw();
		this.addDataPointEventListener();
		if (this.options.containerResizable) {
			this.setResizeWhenContainerChange();
		}
	}

	draw(activeSeries = this.getActiveDataSeries()) {
		let keys: any;
		let dataList = this.data;
		if (this.options.y2Domain) {
			keys = this.options.yDomain.concat(this.options.y2Domain);
		} else {
			keys = this.options.yDomain;
		}

		const actualChartSize: any = this.getActualChartSize(this.container);
		const radius: number = Math.min(actualChartSize.width, actualChartSize.height) / 2;
		const color = d3.scaleOrdinal()
			.range(this.options.colors);

		d3.select(this.holder).select("svg")
			.attr("width", actualChartSize.width)
			.attr("height", actualChartSize.height);

		this.svg
			.attr("transform", "translate(" + (actualChartSize.width / 2) +  "," + (actualChartSize.height / 2) + ")");

		const arc = d3.arc()
			.innerRadius(0)
			.outerRadius(radius);

		const pie = d3.pie()
			.value(function(d: any) { return d.value; })
			.sort(null);

		const path = this.svg.selectAll("path")
			.data(pie(dataList))
			.enter()
			.append("path")
			.attr("d", arc)
			.attr("fill", function(d, i) {
				return color(d.data.label);
			});
	}

	addDataPointEventListener() {
		// const self = this;
		// this.svg.selectAll("circle")
		// .on("click", function(d) {
		// 	self.showTooltip(d);
		// 	self.reduceOpacity(this);
		// })
		// .on("mouseover", function(d) {
		// 	self.svg.append("circle").attr("class", Configuration.lines.mouseover.class)
		// 		.attr("r", Configuration.lines.mouseover.r)
		// 		.attr("fill", Configuration.lines.mouseover.fill)
		// 		.attr("stroke-width", Configuration.lines.mouseover.strokeWidth)
		// 		.attr("stroke", d.color)
		// 		.attr("stroke-opacity", Configuration.lines.mouseover.strokeOpacity)
		// 		.attr("cx", this.cx.baseVal.value)
		// 		.attr("cy", this.cy.baseVal.value);
		// })
		// .on("mouseout", function() {
		// 	self.svg.selectAll(`.${Configuration.lines.mouseover.class}`).remove();
		// });
	}
}
