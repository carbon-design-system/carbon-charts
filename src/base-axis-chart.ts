import * as d3 from "d3";
import { BaseChart } from "./base-chart";
import { Configuration } from "./configuration";

export class BaseAxisChart extends BaseChart {
	xScale: d3.ScaleBand<string>;
	yScale: d3.ScaleLinear<number, number>;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "basic-axis";
	}

	setXScale(data?): d3.ScaleBand<string> {
		if (data) {
			// setting scale for arbitrary data if provided (used for things like combo chart)
			const xScale = d3.scaleBand().range([0, this.getActualChartSize().width])
			.domain(data.map(d => d[this.options.xDomain]));
			return xScale;
		}

		this.xScale = d3.scaleBand().range([0, this.getActualChartSize().width])
			.domain(this.data.map(d => d[this.options.xDomain]));
		return this.xScale;
	}

	setYScale(data?, activeSeries?): d3.ScaleLinear<number, number> {
		let yHeight = undefined;
		let keys = undefined;

		if (data) {
			yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
			const yScale = d3.scaleLinear().range([yHeight, 0]);
			activeSeries = activeSeries ? activeSeries : this.getActiveDataSeries();
			keys = activeSeries.length > 0 ? activeSeries : this.options.yDomain;
			if (this.options.type === "stacked-bar") {
				const yMax = d3.max(data, d => keys.map(val => d[val]).reduce((acc, cur) => acc + cur, 0));
				yScale.domain([0, +yMax]);
			} else {
				yScale.domain([0, +d3.max(data, d =>
					d3.max(keys.map(domain => d[domain])))
				]);
			}
			return yScale;
		}

		yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		this.yScale = d3.scaleLinear().range([yHeight, 0]);
		activeSeries = activeSeries ? activeSeries : this.getActiveDataSeries();
		keys = activeSeries.length > 0 ? activeSeries : this.options.yDomain;
		if (this.options.type === "stacked-bar") {
			const yMax = d3.max(this.data, d => keys.map(val => d[val]).reduce((acc, cur) => acc + cur, 0));
			this.yScale.domain([0, +yMax]);
		} else {
			this.yScale.domain([0, +d3.max(this.data, d =>
				d3.max(keys.map(domain => d[domain])))
			]);
		}
		return this.yScale;
	}

	drawXAxis(xScale: d3.ScaleBand<string> = this.xScale) {
		const xAxis = d3.axisBottom(xScale)
			.tickSizeInner(0)
			.tickSizeOuter(0);
		const g = this.svg.select(".x.axis").call(xAxis);
		g.selectAll("text")
			.attr("y", Configuration.axis.magicY1)
			.attr("x", Configuration.axis.magicX1)
			.attr("dy", ".35em")
			.attr("transform", `rotate(${Configuration.axis.xAxisAngle})`)
			.style("text-anchor", "end")
			.call(text => this.wrapTick(text));
		// get the tickHeight after the ticks have been wrapped
		const tickHeight = this.getLargestTickHeight(g.selectAll(".tick")) + Configuration.axis.tick.heightAddition;
		g.select(".domain")
			.attr("stroke", Configuration.axis.domain.color)
			.attr("fill", Configuration.axis.domain.color)
			.attr("stroke-width", Configuration.axis.domain.strokeWidth);

		g.append("text")
			.attr("class", "x axis-label")
			.attr("text-anchor", "middle")
			.attr("transform", "translate(" + (g.node().getBBox().width / 2) + "," + tickHeight + ")")
			.text(this.options.xDomain);
		// get the yHeight after the height of the axis has settled
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		g.attr("transform", `translate(0, ${yHeight})`);
	}

	updateXAxis(xScale: d3.ScaleBand<string> = this.xScale) {
		// configure the axis with no visible ticks
		const xAxis = d3.axisBottom(xScale)
			.tickSizeInner(0)
			.tickSizeOuter(0);

		// update the axis
		const g = this.svg.select(".x.axis").call(xAxis);

		g.selectAll(".tick")
			.select("text")
			.call(text => this.wrapTick(text));
		// get the yHeight and tickHeight after the ticks have been wrapped
		const tickHeight = this.getLargestTickHeight(g.selectAll(".tick")) + Configuration.axis.tick.heightAddition;
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		// center the label
		g.select(".x.axis-label")
			.attr("transform", "translate(" + (g.node().getBBox().width / 2) + "," + tickHeight + ")");
		// set the axis to sit at the bottom of the chart correctly
		g.attr("transform", `translate(0, ${yHeight})`);
	}

	drawYAxis(yScale: d3.ScaleLinear<number, number> = this.yScale) {
		const yAxis = d3.axisLeft(yScale);
		this.setTickStyle(yAxis, this.options.yTicks);
		const g = this.svg.select(".y.axis")
			.attr("transform", `translate(0, 0)`)
			.call(yAxis);
		g.select(".domain").remove();
		if (this.options.yFormatter && this.options.yFormatter[this.options.yDomain[0]]) {
			this.addUnits(g.selectAll("text"), this.options.yFormatter[this.options.yDomain[0]]);
		}
		const label = this.options.yDomain.join(", ");

		this.appendYAxisLabel(g, label, "y")
			.attr("class", "y axis-label");
	}

	updateYAxis(yScale: d3.ScaleLinear<number, number> = this.yScale) {
		const yAxis = d3.axisLeft(yScale);
		this.setTickStyle(yAxis, this.options.yTicks);
		const g = this.svg.select(".y.axis")
			.attr("transform", `translate(0, 0)`)
			.call(yAxis);
		g.select(".domain").remove();
		if (this.options.yFormatter && this.options.yFormatter[this.options.yDomain[0]]) {
			this.addUnits(g.selectAll("text"), this.options.yFormatter[this.options.yDomain[0]]);
		}
	}

	drawY2Axis(yScale: d3.ScaleLinear<number, number> = this.yScale) {
		this.svg.append("g")
			.attr("class", "y2 axis");
		const yAxis = d3.axisRight(yScale);
		this.setTickStyle(yAxis, this.options.y2Ticks);

		const g = this.svg.select(".y2.axis")
			.attr("transform", `translate(${this.getActualChartSize().width}, 0)`)
			.call(yAxis);
		g.select(".domain").remove();
		if (this.options.yFormatter && this.options.yFormatter[this.options.y2Domain[0]]) {
			this.addUnits(g.selectAll("text"), this.options.yFormatter[this.options.y2Domain[0]]);
		}
		const label = this.options.y2Domain.join(", ");
		this.appendYAxisLabel(g, label, "y2");
	}

	updateY2Axis(yScale: d3.ScaleLinear<number, number> = this.yScale) {
		const yAxis = d3.axisRight(yScale);
		this.setTickStyle(yAxis, this.options.y2Ticks);
		const g = this.svg.select(".y2.axis")
			.attr("transform", `translate(${this.getActualChartSize().width}, 0)`)
			.call(yAxis);
		g.select(".domain").remove();
		if (this.options.yFormatter && this.options.yFormatter[this.options.yDomain[0]]) {
			this.addUnits(g.selectAll("text"), this.options.yFormatter[this.options.yDomain[0]]);
		}
	}

	appendYAxisLabel(g, label, labelNum) {
		const self = this;
		let tickWidth = -(this.getLargestTickWidth(g.selectAll(".tick")) + Configuration.axis.tick.widthAdditionY);
		if (labelNum === "y2") {
			tickWidth = this.getLargestTickWidth(g.selectAll(".tick")) + Configuration.axis.tick.widthAdditionY2;
		}
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		const axisLabel = g.append("text")
			.attr("dy", Configuration.axis.magicDy1)
			.attr("class", `${labelNum} axis-label`)
			.attr("text-anchor", "middle")
			.text(label);
		if (axisLabel.node().getBBox().width > Configuration.axis.maxWidthOfAxisLabel) {
			const marginToTicks = labelNum === "y" ? -10 : 7;
			axisLabel.attr(
				"transform",
				`translate(${tickWidth + axisLabel.node().getBBox().height + marginToTicks}, ${yHeight / 2})rotate(${Configuration.axis.yAxisAngle})`
			);
			const wrappedLabel = this.wrapLabel(axisLabel);
			wrappedLabel.on("click", d => {
				const leftAxis = labelNum === "y";
				self.showLabelTooltip(label, leftAxis);
			});
		} else {
			axisLabel.attr("transform", `translate(${tickWidth}, ${yHeight / 2})rotate(${Configuration.axis.yAxisAngle})`);
		}
		return axisLabel;
	}

	wrapTick(ticks) {
		const self = this;
		const letNum = Configuration.axis.tick.maxLetNum;
		ticks.each(function(t) {
			if (t.length > letNum / 2) {
				const tick = d3.select(this);
				const y = tick.attr("y");
				tick.text("");
				const tspan1 = tick.append("tspan")
					.attr("x", 0).attr("y", y).attr("dx", Configuration.axis.dx).attr("dy", `-${Configuration.axis.tick.dy}`);
				const tspan2 = tick.append("tspan")
					.attr("x", 0).attr("y", y).attr("dx", Configuration.axis.dx).attr("dy", Configuration.axis.tick.dy);
				if (t.length < letNum - 3) {
					tspan1.text(t.substring(0, t.length / 2));
					tspan2.text(t.substring(t.length / 2 + 1, t.length));
				} else {
					tspan1.text(t.substring(0, letNum / 2));
					tspan2.text(t.substring(letNum / 2, letNum - 3) + "...");
					tick.on("click", dd => {
						self.showLabelTooltip(dd, true);
					});
				}
			}
		});
	}

	wrapLabel(label) {
		const letNum = Configuration.axis.maxNumOfAxisLabelLetters;
		const text = label.text();
		const y = label.attr("y");
		label.text("");
		const tspan1 = label.append("tspan")
			.attr("x", 0).attr("y", y).attr("dx", Configuration.axis.dx).attr("dy", `-${Configuration.axis.label.dy}`);
		const tspan2 = label.append("tspan")
			.attr("x", 0).attr("y", y).attr("dx", Configuration.axis.dx).attr("dy", Configuration.axis.label.dy);
		if (text.length < Configuration.axis.maxNumOfAxisLabelLetters) {
			tspan1.text(text.substring(0, text.length / 2));
			tspan2.text(text.substring(text.length / 2 + 1, text.length));
		} else {
			tspan1.text(text.substring(0, letNum / 2));
			tspan2.text(text.substring(letNum / 2, letNum) + "...");
		}
		return label;
	}

	getLargestTickHeight(ticks) {
		let largestHeight = 0;
		ticks.each(function() {
			const tickLength = this.getBBox().height;
			if (tickLength > largestHeight) {
				largestHeight = tickLength;
			}
		});
		return largestHeight;
	}

	getLargestTickWidth(ticks) {
		let largestWidth = 0;
		ticks.each(function() {
			const tickLength = this.getBBox().width;
			if (tickLength > largestWidth) {
				largestWidth = tickLength;
			}
		});
		return largestWidth;
	}

	setTickStyle(axis, tickNum) {
		axis.tickSizeInner(0)
			.tickSizeOuter(0)
			.tickPadding(10)
			.ticks(tickNum);
	}

	addUnits(ticks, formatters) {
		ticks.nodes().forEach(t => {
			t.textContent = formatters(t.textContent);
		});
	}

	drawXGrid(xScale: d3.ScaleBand<string> = this.xScale) {
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		const xGrid = d3.axisBottom(xScale)
			.tickSizeInner(-yHeight)
			.tickSizeOuter(0);
		const g = this.svg.select(".x.grid")
			.attr("transform", `translate(0, ${yHeight})`)
			.call(xGrid);
		g.selectAll("line")
			.attr("stroke", Configuration.grid.strokeColor);
		g.selectAll("text").remove();
		g.select(".domain").remove();
	}

	drawYGrid(yScale: d3.ScaleLinear<number, number> = this.yScale) {
		const tickNum = this.options.y2Ticks ? d3.max([this.options.yTicks, this.options.y2Ticks]) : this.options.yTicks;
		const yGrid = d3.axisLeft(yScale)
			.tickSizeInner(-this.getActualChartSize().width)
			.tickSizeOuter(0)
			.ticks(tickNum);
		const g = this.svg.select(".y.grid")
			.attr("transform", `translate(0, 0)`)
			.call(yGrid);
		g.selectAll("line")
			.attr("stroke", Configuration.grid.strokeColor);
		g.selectAll("text").remove();
		g.select(".domain").remove();
		g.select(".tick").remove();
	}
}
