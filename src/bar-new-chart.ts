import * as d3 from "d3";
import { BaseAxisNewChart } from "./base-axis-new-chart";
import { Configuration } from "./configuration";
import { Tools } from "./tools";
import { Transition, thresholdScott } from "d3";

export class BarNewChart extends BaseAxisNewChart {
	x: any;
	y: any;
	color: any;

	constructor(holder: Element, options?: any, data?: any) {
		super(holder, options, data);

		this.options.type = "bar-new";
		if (this.options.containerResizable) {
			this.resizeWhenContainerChange();
		}
	}

	setData(data: any) {
		const { selectors } = Configuration;
		const innerWrapElement = this.holder.querySelector(selectors.INNERWRAP);
		const initialDraw = innerWrapElement === null;
		const newDataIsAPromise = Promise.resolve(data) === data;

		// Dispatch the update event
		this.events.dispatchEvent(new Event("data-change"));

		if (initialDraw || newDataIsAPromise) {
			this.updateOverlay().show();
		}

		Promise.resolve(data).then(value => {
			// Dispatch the update event
			this.events.dispatchEvent(new Event("data-load"));

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
			const oldLegendItems = this.getActiveLegendItems();
			const keysArray = Object.keys(keys);
			const { missing: removedItems, added: newItems } = Tools.arrayDifferences(oldLegendItems, keysArray);

			// Update keys for legend use the latest data keys
			this.options.keys = keys;

			// Perform the draw or update chart
			if (initialDraw) {
				this.initialDraw();
			} else {
				if (removedItems.length > 0 || newItems.length > 0) {
					this.addOrUpdateLegend();
				}

				this.update(value);
			}
		});
	}

	initialDraw(data?: any) {
		if (data) {
			this.data = data;
		}

		this.setSVG();

		this.draw();

		// this.setXScale();
		// this.drawXAxis();
		// this.setYScale();
		// this.drawYAxis();

		// this.draw();
		// this.repositionBasedOnYAxis();

		this.addOrUpdateLegend();
		this.addDataPointEventListener();
	}

	update(newData?: any) {
		const oldData = this.data;
		const activeLegendItems = this.getActiveLegendItems();
		if (newData === undefined) {
			// Get new data by filtering the data based off of the legend
			newData = oldData.filter(dataPoint => {
				// If this datapoint is active on the legend
				const activeSeriesItemIndex = activeLegendItems.indexOf(dataPoint.label);

				return activeSeriesItemIndex > -1;
			});
		}

		this.updateXandYGrid();
		this.interpolateValues(newData);
	}

	interpolateValues(newData: any) {
		const margin = {top: 0, right: -40, bottom: 50, left: 40};
		const chartSize = this.getActualChartSize();
		const width = chartSize.width - margin.left - margin.right;
		const height = chartSize.height - margin.top - margin.bottom;

		const rect = this.svg
			.selectAll("rect.bar")
			.data(newData);

		const yEnd = d3.max(newData, (d: any) => d.value);

		this.x.domain(newData.map(d => d.label));
		this.y.domain([0, yEnd]);

		rect
			.transition()
			.duration(750)
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d.label))
			.attr("y", (d: any, i) => this.y(d.value))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => height - this.y(d.value))
			.attr("fill", (d: any) => this.color(d.label).toString());

		const yAxis = d3.axisLeft(this.y).ticks(5).tickSize(0);
		const svg = d3.select("div#classy-bar-new-chart-holder svg");

		const xAxisRef = svg.select("g.x.axis")
			.transition()
			.duration(750)
			.attr("transform", "translate(0," + height + ")")
			// Being cast to any because d3 does not offer appropriate typings for the .call() function
			.call(d3.axisBottom(this.x).tickSize(0) as any);

		xAxisRef.attr("transform", "translate(0," + height + ")");
		xAxisRef.selectAll("text")
			.attr("y", Configuration.axis.magicY1)
			.attr("x", Configuration.axis.magicX1)
			.attr("dy", ".35em")
			.attr("transform", `rotate(${Configuration.axis.xAxisAngle})`)
			.style("text-anchor", "end");

		svg.select("g.y.axis")
			.transition()
			.duration(750)
			// Being cast to any because d3 does not offer appropriate typings for the .call() function
			.call(yAxis as any);

		rect.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d.label))
			.attr("y", (d: any, i) => this.y(d.value))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => height - this.y(d.value))
			.attr("opacity", 0)
			.transition()
			.duration(750)
			.attr("opacity", 1)
			.attr("fill", (d: any) => this.color(d.label).toString());

		rect.exit()
			.transition()
			.duration(750)
			.style("opacity", 0)
			.remove();

		// Add slice hover actions, and clear any slice borders present
		this.addDataPointEventListener();

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the update event
		this.events.dispatchEvent(new Event("update"));
	}

	draw() {
		const { data } = this;

		const svg = d3.select("div#classy-bar-new-chart-holder svg");
		svg.style("width", "100%")
			.style("height", "100%");

		const margin = {top: 0, right: -40, bottom: 50, left: 40};
		const chartSize = this.getActualChartSize();
		const width = chartSize.width - margin.left - margin.right;
		const height = chartSize.height - margin.top - margin.bottom;

		console.log(width);

		const keys = data.map(dataPoint => dataPoint.label);

		this.x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
		this.y = d3.scaleLinear().rangeRound([height, 0]);

		const g = svg.select("g.inner-wrap")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		const yEnd = parseFloat(d3.max(data, (d: any) => d.value));

		this.x.domain(data.map(d => d.label));
		this.y.domain([0, yEnd]);

		const xAxis = d3.axisBottom(this.x).tickSize(0);
		const xAxisRef = g.append("g")
			.attr("class", "x axis")
			.call(xAxis);

		xAxisRef.attr("transform", "translate(0," + height + ")");
		xAxisRef.selectAll("text")
			.attr("y", Configuration.axis.magicY1)
			.attr("x", Configuration.axis.magicX1)
			.attr("dy", ".35em")
			.attr("transform", `rotate(${Configuration.axis.xAxisAngle})`)
			.style("text-anchor", "end");

		const yAxis = d3.axisLeft(this.y).ticks(5).tickSize(0);
		g.append("g")
			.attr("class", "y axis")
			.call(yAxis);

		this.color = d3.scaleOrdinal().range(this.options.colors).domain(keys);
		g.selectAll(".bar")
			.data(data)
			.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", (d: any) => this.x(d.label))
			.attr("y", (d: any, i) => this.y(d.value))
			.attr("width", this.x.bandwidth())
			.attr("height", (d: any) => height - this.y(d.value))
			.attr("fill", (d: any) => this.color(d.label).toString());

		this.drawXGrid();
		this.drawYGrid();

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the load event
		this.events.dispatchEvent(new Event("load"));
	}

	addDataPointEventListener() {
		const self = this;
		this.svg.selectAll("rect")
			.on("mouseover", function(d) {
				d3.select(this)
					.attr("stroke-width", Configuration.bars.mouseover.strokeWidth)
					.attr("stroke", self.color(d.label))
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

	resizeChart() {
		// Trigger then resize event
		this.events.dispatchEvent(new Event("resize"));
	}
}
