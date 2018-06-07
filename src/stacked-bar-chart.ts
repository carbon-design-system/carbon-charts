import * as d3 from "d3";
import { BarChart } from "./bar-chart";
import { Configuration } from "./configuration";

export class StackedBarChart extends BarChart {
	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);
		this.options.type = "stacked-bar";
		if (this.options.containerResizable) {
			this.resizeWhenContainerChange();
		}
	}

	drawChart(data?: any) {
		if (data) {
			this.data = data;
		}

		this.setSVG();
		if (this.options.xDomain) {
			this.addLegend();
			if (this.options.legendClickable) {
				this.setClickableLegend();
			}
		}

		this.setXScale();
		this.drawXAxis();
		this.setYScale();
		this.drawYAxis();
		this.drawXGrid();
		this.drawYGrid();

		this.positionLegend();
		this.repositionBasedOnYAxis();
		this.draw();
		this.addDataPointEventListener();
	}

	update() {
		const yHeight = this.getChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		if (yHeight <= 0) {
			return;
		}
		const activeSeries = this.getActiveLegendItems();
		const keys = activeSeries ? activeSeries : this.options.yDomain;
		const color = d3.scaleOrdinal().range(this.options.colors).domain(this.options.yDomain);
		const bars = this.svg.select(".stacked-bars");
		this.xScale.paddingInner(0.2);

		// TODO: only do this data update if the number of selected keys has changed
		this.data.forEach(d => {
			let y0 = 0;
			const key = d[this.options.xDomain];
			const xAxis = this.options.xDomain;
			d.series = keys.map(seriesVal => {
				return {
					xAxis,
					series: seriesVal,
					key,
					y0: y0,
					y1: y0 += +d[seriesVal],
					value: d[seriesVal],
					formatter: this.options.yFormatter,
					color: color(seriesVal)
				};
			});
			d.total = this.options.yDomain.map(val => d[val]).reduce((acc, cur) => acc + cur, 0);
		});

		bars.selectAll(".series")
			.data(this.data)
			.attr("transform", d => `translate(${this.xScale(d[this.options.xDomain])},0)`);

		const s = bars.selectAll(".series")
			.selectAll("rect")
			.data(d => d.series);
		s.attr("y", d => this.yScale(d.y1))
			.style("fill", d => d.color)
			.attr("height", d => this.yScale(d.y0) - this.yScale(d.y1))
			.attr("width", this.xScale.bandwidth());
		s.enter()
			.append("rect")
			.attr("width", this.xScale.bandwidth())
			.style("fill", d => d.color)
			.attr("y", d => this.yScale(d.y1))
			.attr("height", d => this.yScale(d.y0) - this.yScale(d.y1));
		s.exit()
			.remove();
	}

	draw() {
		const yHeight = this.getChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		if (yHeight <= 0) {
			return;
		}
		const activeSeries = this.getActiveLegendItems();
		const keys = activeSeries ? activeSeries : this.options.yDomain;
		this.xScale.paddingInner(0.2);
		const color = d3.scaleOrdinal().range(this.options.colors).domain(this.options.yDomain);
		this.data.forEach(d => {
			let y0 = 0;
			const key = d[this.options.xDomain];
			const xAxis = this.options.xDomain;
			d.series = keys.map(seriesVal => {
				return {
					xAxis,
					series: seriesVal,
					key,
					y0: y0,
					y1: y0 += +d[seriesVal],
					value: d[seriesVal],
					formatter: this.options.yFormatter,
					color: color(seriesVal)
				};
			});
			d.total = this.options.yDomain.map(val => d[val]).reduce((acc, cur) => acc + cur, 0);
		});

		const bars = this.svg.append("g").attr("class", "stacked-bars");

		const series = bars.selectAll(".series")
			.data(this.data)
			.enter()
			.append("g")
			.attr("class", "series")
			.attr("transform", d => `translate(${this.xScale(d[this.options.xDomain])},0)`);

		series.selectAll("rect")
			.data(d => d.series)
			.enter()
			.append("rect")
			.attr("width", this.xScale.bandwidth())
			.style("fill", d => d.color)
			.attr("y", yHeight)
			.attr("height", 0)
			.transition()
			.delay((d, i) => i * 30)
			.ease(d3.easePolyOut, 0.5)
			.attr("y", d => this.yScale(d.y1))
			.attr("height", d => this.yScale(d.y0) - this.yScale(d.y1));
	}
}
