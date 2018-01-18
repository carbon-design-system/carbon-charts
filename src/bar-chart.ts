import * as d3 from "d3";
import { BaseAxisChart } from "./base-axis-chart";
import { Configuration } from "./configuration";

export class BarChart extends BaseAxisChart {
	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "bar";
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
		this.repositionSVG();
		this.draw();
		this.addDataPointEventListener();
	}

	updateChart() {
		if (this.svg) {
			// update the root svg
			this.updateSVG();
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
		if (yHeight > 0) {
			return;
		}
		let keys = this.getXKeys();
		const activeSeries = this.getActiveDataSeries();
		keys = activeSeries.length > 0 ? activeSeries : keys;
		const x1 = this.options.xDomain.length > 0 ? this.getXDomain(keys, this.xScale) : this.xScale;
		const color = d3.scaleOrdinal().range(this.options.colors).domain(keys);
		const bars = this.svg.select(".bars");
		bars.selectAll("g")
			.attr("transform", d => this.transformXDomain(this.options.xDomain, this.xScale(d[this.options.xDomain])));
		bars.selectAll("g")
			.selectAll("rect")
			.attr("x", d => x1(d.series))
			.attr("y", d => this.yScale(d.value))
			.attr("height", d => yHeight - this.yScale(d.value))
			.attr("width", x1.bandwidth())
			.style("display", d => keys.includes(d.series) ? "initial" : "none");
	}

	draw() {
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		if (yHeight > 0) {
			return;
		}
		let keys = this.getXKeys();
		const activeSeries = this.getActiveDataSeries();
		keys = activeSeries.length > 0 ? activeSeries : keys;
		const x1 = this.options.xDomain.length > 0 ? this.getXDomain(keys, this.xScale) : this.xScale;
		const color = d3.scaleOrdinal().range(this.options.colors).domain(keys);
		const barGroup = this.svg.append("g");
		barGroup.append("g")
			.attr("class", "bars")
			.selectAll("g")
			.data(this.data)
			.enter().append("g")
			.attr("transform", d => this.transformXDomain(this.options.xDomain, this.xScale(d[this.options.xDomain])))
			.selectAll("rect")
			.data(d => keys.map((value, idx) => {
				let series = value;
				if (this.options.dimension) {
					value = this.options.yDomain[0];
					series = d[this.options.dimension];
				}
				return {
					xAxis: this.options.xDomain,
					key: d[this.options.xDomain],
					value: d[value],
					formatter: this.options.yFormatter,
					dimension: this.options.dimension,
					dimVal: d[this.options.dimension],
					series,
					valueName: value,
					color: color(series)
				};
			}))
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
