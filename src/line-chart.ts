import * as d3 from "d3";
import { BaseAxisChart } from "./base-axis-chart";
import { Configuration } from "./configuration";

export class LineChart extends BaseAxisChart {
	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);
		this.options.type = "line";
		if (this.options.containerResizable) {
			this.resizeWhenContainerChange();
		}
	}

	drawChart(data?: any) {
		if (data) {
			this.data = data;
		}

		this.setSVG();

		this.setXScale();
		this.drawXAxis();
		this.setYScale();
		this.drawYAxis();
		this.drawXGrid();
		this.drawYGrid();
		if (this.options.xDomain) {
			this.addLegend();
			if (this.options.legendClickable) {
				this.setClickableLegend();
			}
		}

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

	update(yScale: d3.ScaleLinear<number, number> = this.yScale, activeSeries = this.getActiveDataSeries()) {
		const dataList = this.data;
		const lines = this.svg.selectAll(".lines");
		const line = d3.line<any>()
			.x(d => this.xScale(d.key) + this.getActualChartSize().width / dataList.length / 2)
			.y(d => yScale(d.value));
		const keys = activeSeries ? activeSeries : this.options.yDomain;
		const allActiveSeries: any = this.getActiveDataSeries();
		lines.selectAll(".line")
			.select("path")
			// filter to include just the relevant series (mostly useful for 2 axis charts)
			.filter(d => keys.includes(d[0].series))
			.attr("d", line);
		// hide hidden series, and prevent them from being clicked
		lines.selectAll("path").style("display", d => allActiveSeries.includes(d[0].series) ? "initial" : "none");
		lines.selectAll("circle")
			.filter(d => keys.includes(d.series))
			.attr("cx", d => this.xScale(d.key) + this.getActualChartSize().width / dataList.length / 2)
			.attr("cy", d => yScale(d.value));
		lines.selectAll("circle").style("display", d => allActiveSeries.includes(d.series) ? "initial" : "none");
	}

	draw(yScale: d3.ScaleLinear<number, number> = this.yScale, activeSeries = this.getActiveDataSeries()) {
		let keys: any;
		let dataList = this.data;
		if (this.options.dimension) {
			const newKeys = <any>[];
			dataList.forEach(d => {
				if (!newKeys.includes(d[this.options.dimension])) {
					newKeys.push(d[this.options.dimension]);
				}
			});
			keys = newKeys;
		} else if (this.options.secondaryYDomain) {
			keys = this.options.yDomain.concat(this.options.secondaryYDomain);
		} else {
			keys = this.options.yDomain;
		}
		const color = d3.scaleOrdinal().range(this.options.colors).domain(keys);
		keys = activeSeries ? activeSeries : keys;
		const line = d3.line<any>()
			.x(d => this.xScale(d.key) + this.getActualChartSize().width / dataList.length / 2)
			.y(d => yScale(d.value));
		const lines = this.svg.append("g");
		lines.attr("class", "lines");
		keys.forEach(value => {
			const series = value;
			if (this.options.dimension) {
				dataList = this.data.filter(d => d[this.options.dimension] === value);
				value = this.options.yDomain[0];
			}
			const valueData = dataList.map(d => (<any>{
				xAxis: this.options.xDomain,
				key: d[this.options.xDomain],
				series,
				value: d[value],
				valueName: value,
				dimension: this.options.dimension,
				dimVal: d[this.options.dimension],
				formatter: this.options.yFormatter,
				color: color(series)
			}));
			const lineGroup = lines.append("g");
			lineGroup.attr("class", "line");
			lineGroup.append("path")
				.data([valueData])
				.attr("fill", Configuration.lines.path.fill)
				.attr("stroke", Configuration.lines.path.stroke)
				.attr("stroke-linejoin", Configuration.lines.path.strokeLinejoin)
				.attr("stroke-linecap", Configuration.lines.path.strokeLinecap)
				.attr("stroke-width", Configuration.lines.path.strokeWidth)
				.attr("d", line)
				.style("stroke", color(series))
				.style("opacity", 0)
				.transition()
				.duration(Configuration.lines.path.duration)
				.style("opacity", 1);

			lineGroup.selectAll("dot")
				.data(valueData)
				.enter().append("circle")
				.attr("r", Configuration.lines.dot.r)
				.attr("fill", Configuration.lines.dot.fill)
				.attr("stroke", color(series))
				.attr("stroke-width", Configuration.lines.dot.strokeWidth)
				.attr("cx", d => this.xScale(d.key) + this.getActualChartSize().width / dataList.length / 2)
				.attr("cy", d => yScale(d.value))
				.style("opacity", 0)
				.transition()
				.duration(Configuration.lines.dot.duration)
				.style("opacity", 1);
		});
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
