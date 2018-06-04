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

	setData(data: any) {
		const { selectors } = Configuration;
		const innerWrapElement = this.holder.querySelector(selectors.INNERWRAP);
		const initialDraw = innerWrapElement === null;
		const newDataIsAPromise = Promise.resolve(data) === data;

		if (initialDraw || newDataIsAPromise) {
			this.updateOverlay().show();
		}

		Promise.resolve(data).then(value => {
			// Process data
			const keys: any = {};
			this.data = value;

			// Build out the keys array of objects to represent the legend items
			this.data.forEach(entry => {
				keys[entry.label] = Configuration.legend.items.status.ACTIVE;
			});

			// Grab the old legend items, the keys from the current data
			// Compare the two, if there are any differences (additions/removals)
			// Completely remove the legend and render again
			// const oldLegendItems = this.getActiveLegendItems();
			// const keysArray = Object.keys(keys);
			// const { missing: removedItems, added: newItems } = Tools.arrayDifferences(oldLegendItems, keysArray);

			// Update keys for legend use the latest data keys
			this.options.keys = keys;

			// Perform the draw or update chart
			if (initialDraw) {
				console.log("initialDraw()");

				this.initialDraw();
			} else {
				// if (removedItems.length > 0 || newItems.length > 0) {
				// 	this.addOrUpdateLegend();
				// }

				console.log("update()", value);
				// this.update(value);
			}
		});
	}

	initialDraw(data?: any) {
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

		this.draw();
		this.repositionBasedOnYAxis();

		this.addOrUpdateLegend();
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

			this.repositionBasedOnYAxis();
			this.positionLegend();
		}
	}

	update() {
		const yHeight = this.getActualChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
		if (yHeight <= 0) {
			return;
		}
		let keys = this.getXKeys();
		const activeSeries = this.getActiveLegendItems();
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
		if (yHeight <= 0) {
			return;
		}
		let keys = this.getXKeys();
		const activeSeries = this.getActiveLegendItems();
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

		this.updateOverlay().hide();
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
