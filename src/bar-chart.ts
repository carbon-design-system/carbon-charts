import * as d3 from "d3";
import { BaseAxisChart } from "./base-axis-chart";
import { Configuration } from "./configuration";

export class BarChart extends BaseAxisChart {
	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "bar";
		if (this.options.containerResizable) {
			// this.setResizeWhenContainerChange();
			this.resizeWhenContainerChange();
		}
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

		this.setXScale();
		this.drawXAxis();
		this.setYScale();
		this.drawYAxis();
		this.drawXGrid();
		this.drawYGrid();

		this.draw();

		this.repositionSVG();
		this.addDataPointEventListener();
		this.positionLegend();
	}

	updateChart() {
		if (this.svg) {
			// update the root svg
			this.updateSVG();
			this.addLegend();
			if (this.options.legendClickable) {
				this.setClickableLegend();
			}
			// these don't explicitly add elements, so they're "safe" to call
			this.setXScale();
			this.updateXAxis();
			this.setYScale();
			this.updateYAxis();
			this.drawXGrid();
			this.drawYGrid();
			// update the actual chart
			this.update();

			this.repositionSVG();
			this.positionLegend();
		}
	}

	update() {
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		const activeSeries = this.getActiveDataSeries();
		const keys = activeSeries ? activeSeries : this.options.yDomain;
		const x1 = d3.scaleBand();
		x1.domain(keys).rangeRound([0, this.xScale.bandwidth()]);
		const color = d3.scaleOrdinal().range(this.options.colors).domain(this.options.yDomain);
		const bars = this.svg.select(".bars");
		bars.selectAll("g")
			.attr("transform", d => `translate(${this.xScale(d[this.options.xDomain])},0)`);
		bars.selectAll("g")
			.selectAll("rect")
			.attr("x", d => x1(d.series))
			.attr("y", d => this.yScale(d.value))
			.attr("height", d => yHeight - this.yScale(d.value))
			.attr("width", x1.bandwidth())
			.style("display", d => keys.includes(d.series) ? "initial" : "none");
	}

	draw() {
		this.xScale.padding(0.1);
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		const activeSeries = this.getActiveDataSeries();
		const keys = activeSeries ? activeSeries : this.options.yDomain;
		const x1 = d3.scaleBand();
		x1.domain(keys).rangeRound([0, this.xScale.bandwidth()]);
		const color = d3.scaleOrdinal().range(this.options.colors).domain(this.options.yDomain);
		this.svg.append("g")
			.attr("class", "bars")
			.selectAll("g")
			.data(this.data)
			.enter().append("g")
				.attr("transform", d => `translate(${this.xScale(d[this.options.xDomain])},0)`)
			.selectAll("rect")
			.data(d => keys.map(key => ({
				xAxis: this.options.xDomain,
				series: key,
				key: d[this.options.xDomain],
				value: d[key],
				formatter: this.options.yFormatter,
				color: color(key)
			})))
			.enter().append("rect")
				.attr("x", d => x1(d.series))
				.attr("y", d => yHeight)
				.attr("width", x1.bandwidth())
				.attr("height", 0)
				.attr("fill", d => d.color)
				.transition()
				.duration(1000)
				.ease(d3.easePolyOut, 0.5)
				.attr("y", d => this.yScale(d.value))
				.attr("height", d => yHeight - this.yScale(d.value));
	}

	addDataPointEventListener() {
		const self = this;
		this.svg.selectAll("rect")
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
				self.showTooltip(d);
				self.reduceOpacity(this);
			});
	}
}
