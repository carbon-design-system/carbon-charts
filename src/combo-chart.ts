import * as d3 from "d3";
import { BaseAxisChart } from "./base-axis-chart";
import { Configuration } from "./configuration";

export class ComboChart extends BaseAxisChart {
	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "combo";
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

		const activeSeries = <any>this.getActiveDataSeries();

		const barData = [];
		const lineData = [];
		this.data.forEach((d) => {
			const barDataObj = {};
			const lineDataObj = {};
			barDataObj[this.options.xDomain] = d[this.options.xDomain];
			lineDataObj[this.options.xDomain] = d[this.options.xDomain];
			barDataObj[this.options.yDomain] = d[this.options.yDomain];
			barData.push(barDataObj);
			for (let i = 0; i < this.options.y2Domain.length; i++) {
				lineDataObj[this.options.y2Domain[i]] = d[this.options.y2Domain[i]];
			}
			lineData.push(lineDataObj);
		});
		const activeBar =  activeSeries.includes(this.options.yDomain[0]);
		const activeLineSeries = activeBar ? activeSeries.slice(1, activeSeries.length) : activeSeries;

		const xScaleBar = this.setXScale(barData);
		const xScaleLine = this.setXScale(lineData);
		this.drawXAxis(xScaleBar);
		const yScale = this.setYScale(barData);
		const y2Scale = this.setYScale(lineData);
		this.drawYAxis(yScale);
		this.drawY2Axis(y2Scale);
		this.drawXGrid(xScaleBar);
		this.drawYGrid(yScale);
		this.positionLegend();
		this.repositionSVG();
		if (activeBar) {
			this.drawBars(xScaleBar, yScale);
		}
		this.drawLines(xScaleLine, y2Scale, activeLineSeries);
		this.addDataPointEventListener();
	}

	updateChart() {
		if (this.svg) {
			const activeSeries = <any>this.getActiveDataSeries();
			// pull out the bar/line data
			// this would probably be done better in a setdata method and stored as props
			const barData = [];
			const lineData = [];
			this.data.forEach((d) => {
				const barDataObj = {};
				const lineDataObj = {};
				barDataObj[this.options.xDomain] = d[this.options.xDomain];
				lineDataObj[this.options.xDomain] = d[this.options.xDomain];
				barDataObj[this.options.yDomain] = d[this.options.yDomain];
				barData.push(barDataObj);
				for (let i = 0; i < this.options.y2Domain.length; i++) {
					lineDataObj[this.options.y2Domain[i]] = d[this.options.y2Domain[i]];
				}
				lineData.push(lineDataObj);
			});
			const activeBar = activeSeries.includes(this.options.yDomain[0]);
			const activeLineSeries = activeBar ? activeSeries.slice(1, activeSeries.length) : activeSeries;

			// update the root svg
			this.updateSVG();
			// these don't explicitly add elements, so they're "safe" to call
			const xScaleBar = this.setXScale(barData);
			const xScaleLine = this.setXScale(lineData);
			this.updateXAxis(xScaleBar);
			const yScale = this.setYScale(barData);
			const y2Scale = this.setYScale(lineData);
			this.updateYAxis(yScale);
			this.updateY2Axis(y2Scale);
			this.drawXGrid(xScaleBar);
			this.drawYGrid(yScale);
			// update the actual chart
			this.updateBars(xScaleBar, yScale, activeBar);
			this.updateLines(xScaleLine, y2Scale, activeLineSeries);

			this.repositionSVG();
			this.positionLegend();
		}
	}

	drawBars(xScale, yScale) {
		xScale.padding(0.1);
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		const keys = this.options.yDomain;
		const x1 = d3.scaleBand();
		x1.domain(keys).rangeRound([0, xScale.bandwidth()]);
		const color = d3.scaleOrdinal().range(this.options.colors).domain(this.options.yDomain);
		this.svg.append("g")
			.attr("class", "bars")
			.selectAll("g")
			.data(this.data)
			.enter().append("g")
				.attr("transform", d => `translate(${xScale(d[this.options.xDomain])},0)`)
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
				.attr("y", d => yScale(d.value))
				.attr("height", d => yHeight - yScale(d.value));
	}

	updateBars(xScale, yScale, active: boolean) {
		const bars = this.svg.select(".bars");
		if (!active) {
			bars.style("display", "none");
			return;
		} else {
			bars.style("display", "initial");
		}
		xScale.padding(0.1);
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		const keys = this.options.yDomain;
		const x1 = d3.scaleBand();
		x1.domain(keys).rangeRound([0, xScale.bandwidth()]);
		const color = d3.scaleOrdinal().range(this.options.colors).domain(this.options.yDomain);
		bars.selectAll("g")
			.attr("transform", d => `translate(${xScale(d[this.options.xDomain])},0)`);
		bars.selectAll("g")
			.selectAll("rect")
			.attr("x", d => x1(d.series))
			.attr("y", d => yScale(d.value))
			.attr("height", d => yHeight - yScale(d.value))
			.attr("width", x1.bandwidth())
			.style("display", d => keys.includes(d.series) ? "initial" : "none");
	}

	drawLines(xScale, yScale, activeSeries) {
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
		} else if (this.options.y2Domain) {
			keys = this.options.yDomain.concat(this.options.y2Domain);
		} else {
			keys = this.options.yDomain;
		}
		const color = d3.scaleOrdinal().range(this.options.colors).domain(keys);
		keys = activeSeries ? activeSeries : keys;
		const line = d3.line<any>()
			.x(d => xScale(d.key) + this.getActualChartSize().width / dataList.length / 2)
			.y(d => yScale(d.value));
		const lines = this.svg.append("g");
		lines.attr("class", "lines");
		keys.forEach((value, idx) => {
			const colorKey = value;
			if (this.options.dimension) {
				dataList = this.data.filter(d => d[this.options.dimension] === value);
				value = this.options.yDomain[0];
			}
			const valueData = dataList.map(d => (<any>{
				xAxis: this.options.xDomain,
				key: d[this.options.xDomain],
				series: value,
				value: d[value],
				dimension: this.options.dimension,
				dimVal: d[this.options.dimension],
				formatter: this.options.yFormatter,
				color: color(colorKey)
			}));
			const series = lines.append("g");
			series.attr("class", "line");
			series.append("path")
				.data([valueData])
				.attr("fill", Configuration.lines.path.fill)
				.attr("stroke", Configuration.lines.path.stroke)
				.attr("stroke-linejoin", Configuration.lines.path.strokeLinejoin)
				.attr("stroke-linecap", Configuration.lines.path.strokeLinecap)
				.attr("stroke-width", Configuration.lines.path.strokeWidth)
				.attr("d", line)
				.style("stroke", color(colorKey))
				.style("opacity", 0)
				.transition()
				.duration(Configuration.lines.path.duration)
				.style("opacity", 1);

			series.selectAll("dot")
				.data(valueData)
				.enter().append("circle")
				.attr("r", Configuration.lines.dot.r)
				.attr("fill", Configuration.lines.dot.fill)
				.attr("stroke", color(colorKey))
				.attr("stroke-width", Configuration.lines.dot.strokeWidth)
				.attr("cx", d => xScale(d.key) + this.getActualChartSize().width / dataList.length / 2)
				.attr("cy", d => yScale(d.value))
				.style("opacity", 0)
				.transition()
				.duration(Configuration.lines.dot.duration)
				.style("opacity", 1);

		});
	}

	updateLines(xScale, yScale, activeSeries) {
		const dataList = this.data;
		const lines = this.svg.selectAll(".lines");
		const line = d3.line<any>()
			.x(d => xScale(d.key) + this.getActualChartSize().width / dataList.length / 2)
			.y(d => yScale(d.value));
		const keys = activeSeries;
		const allActiveSeries: any = this.getActiveDataSeries();
		lines.selectAll("path")
			.attr("d", line);
		// hide hidden series, and prevent them from being clicked
		lines.selectAll("path").style("display", d => allActiveSeries.includes(d[0].series) ? "initial" : "none");
		lines.selectAll("circle")
			.filter(d => keys.includes(d.series))
			.attr("cx", d => xScale(d.key) + this.getActualChartSize().width / dataList.length / 2)
			.attr("cy", d => yScale(d.value));
		lines.selectAll("circle").style("display", d => allActiveSeries.includes(d.series) ? "initial" : "none");
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
