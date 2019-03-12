// D3 Imports
import { select, mouse } from "d3-selection";
import { stack } from "d3-shape";
import { max } from "d3-array";

import * as Configuration from "./configuration";
import { ChartConfig, StackedBarChartOptions, ChartType } from "./configuration";
import { BaseAxisChart } from "./base-axis-chart";

// Add datasetLabel to each piece of data
// To be used to get the fill color
const addLabelsAndValueToData = (d) => {
	Object.keys(d).map(key => {
		if (typeof d[key] === "object") {
			d[key]["datasetLabel"] = d.key;
			d[key]["label"] = d[key].data["label"];
			d[key]["value"] = d[key].data[d.key];
		}
	});

	return d;
};

// TODO - Cleanup & add some comments
export class StackedBarChart extends BaseAxisChart {
	constructor(holder: Element, configs: ChartConfig<StackedBarChartOptions>) {
		super(holder, configs);

		this.options.type = ChartType.BAR;
	}

	getYMax() {
		const { datasets, labels } = this.displayData;
		const { scales } = this.options;
		let yMax;

		if (datasets.length === 1) {
			yMax = max(datasets[0].data);
		} else {
			yMax = max(labels.map((label, i) => {
				const correspondingValues = datasets.map(dataset => dataset.data[i]);
				const totalValue = correspondingValues.reduce((a, b) => a + b, 0);

				return totalValue;
			}));
		}

		if (scales.y.yMaxAdjuster) {
			yMax = scales.y.yMaxAdjuster(yMax);
		}

		return yMax;
	}

	getStackData() {
		// Create the stack datalist
		const stackDataArray = this.displayData.labels.map((label, i) => {
			const correspondingData = {};

			this.displayData.datasets.forEach(dataset => {
				correspondingData[dataset.label] = dataset.data[i];
			});

			correspondingData["label"] = label;

			return correspondingData;
		});

		return stackDataArray;
	}

	// currently unused, but required to match the BarChart class
	getBarX(d): number { return 0; }

	draw() {
		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		const { bar: margins } = Configuration.charts.margin;
		this.innerWrap
			.attr("transform", `translate(${margins.left}, ${margins.top})`);

		const stackDataArray = this.getStackData();
		const stackKeys = this.displayData.datasets.map(dataset => dataset.label);
		this.innerWrap.append("g")
			.classed("bars-wrapper", true)
			.selectAll("g")
			.data(stack().keys(stackKeys)(stackDataArray))
			.enter()
				.append("g")
				.classed("bars", true)
				.selectAll("rect")
				.data(d => addLabelsAndValueToData(d))
				.enter()
					.append("rect")
					.classed("bar", true)
					.attr("x", d => this.x(d.data.label))
					.attr("y", d => this.y(d[1]))
					.attr("height", d => this.y(d[0]) - this.y(d[1]))
					.attr("width", d => this.x.bandwidth())
					.attr("fill", d => this.getFillColor(d.datasetLabel, d.data.label, d.data.value))
					.attr("stroke", d => this.options.accessibility ? this.getStrokeColor(d.datasetLabel, d.label, d.value) : null)
					.attr("stroke-width", Configuration.bars.default.strokeWidth)
					.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0);

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the load event
		this.dispatchEvent("load");
	}

	interpolateValues(newData: any) {
		const stackDataArray = this.getStackData();
		const stackKeys = this.displayData.datasets.map(dataset => dataset.label);

		this.innerWrap.selectAll(".removed")
			.remove();

		const g = this.innerWrap.selectAll("g.bars-wrapper")
			.selectAll("g")
			.data(stack().keys(stackKeys)(stackDataArray));

		const rect = g.selectAll("rect.bar")
			.data(d => addLabelsAndValueToData(d));

		this.updateElements(true, g.selectAll("rect.bar"), g);

		const addRect = selection => {
			selection.enter()
				.append("rect")
				.classed("bar", true)
				.attr("x", d => this.x(d.data.label))
				.attr("y", d => this.y(d[1]))
				.attr("height", d => this.y(d[0]) - this.y(d[1]))
				.attr("width", d => this.x.bandwidth())
				.attr("fill", d => this.getFillColor(d.datasetLabel, d.data.label, d.data.value))
				.style("opacity", 0)
				.transition(this.getFillTransition())
				.style("opacity", 1)
				.attr("stroke", d => this.options.accessibility ? this.getStrokeColor(d.datasetLabel, d.label, d.value) : null)
				.attr("stroke-width", Configuration.bars.default.strokeWidth)
				.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0);
		};

		const rectsToAdd = g.enter()
			.append("g")
			.classed("bars", true)
			.selectAll("rect")
			.data(d => addLabelsAndValueToData(d));

		addRect(rectsToAdd);
		addRect(rect);

		g.exit()
			.classed("removed", true) // mark this element with "removed" class so it isn't reused
			.transition(this.getDefaultTransition())
			.style("opacity", 0)
			.remove();

		rect.exit()
			.classed("removed", true) // mark this element with "removed" class so it isn't reused
			.transition(this.getDefaultTransition())
			.style("opacity", 0)
			.remove();

		// Add slice hover actions, and clear any slice borders present
		this.addDataPointEventListener();

		// Hide the overlay
		this.updateOverlay().hide();

		// Dispatch the update event
		this.dispatchEvent("update");
	}

	resizeChart() {
		const actualChartSize: any = this.getChartSize(this.container);
		const dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);

		// Resize the SVG
		select(this.holder).select("svg")
			.attr("width", `${dimensionToUseForScale}px`)
			.attr("height", `${dimensionToUseForScale}px`);

		this.updateXandYGrid(true);
		// Scale out the domains
		this.setXScale();
		this.setYScale();

		// Set the x & y axis as well as their labels
		this.setXAxis(true);
		this.setYAxis(true);

		// Apply new data to the bars
		const g = this.innerWrap.selectAll("g.bars g");
		this.updateElements(false, null, g);

		super.resizeChart();
	}

	updateElements(animate: boolean, rect?: any, g?: any) {
		if (!rect) {
			rect = this.innerWrap.selectAll("rect.bar");
		}

		// Update existing bars
		rect
			.transition(animate ? this.getFillTransition() : this.getInstantTransition())
			.style("opacity", 1)
			.attr("x", d => this.x(d.data.label))
			.attr("y", d => this.y(d[1]))
			.attr("height", d => this.y(d[0]) - this.y(d[1]))
			.attr("width", d => this.x.bandwidth())
			.attr("fill", d => this.getFillColor(d.datasetLabel, d.data.label, d.data.value))
			.attr("stroke", d => this.options.accessibility ? this.getStrokeColor(d.datasetLabel, d.label, d.value) : null)
			.attr("stroke-width", Configuration.bars.default.strokeWidth)
			.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0);
	}

	addDataPointEventListener() {
		const self = this;
		const { accessibility } = this.options;

		this.svg.selectAll("rect")
			.on("click", function(d) {
				self.dispatchEvent("bar-onClick", d);
			})
			.on("mouseover", function(d) {
				select(this)
					.attr("stroke-width", Configuration.bars.mouseover.strokeWidth)
					.attr("stroke", self.getStrokeColor(d.datasetLabel, d.label, d.value))
					.attr("stroke-opacity", Configuration.bars.mouseover.strokeOpacity);

				self.showTooltip(d, this);
				self.reduceOpacity(this);
			})
			.on("mousemove", function(d) {
				const tooltipRef = select(self.holder).select("div.chart-tooltip");

				const relativeMousePosition = mouse(self.holder as HTMLElement);
				tooltipRef.style("left", relativeMousePosition[0] + Configuration.tooltip.magicLeft2 + "px")
					.style("top", relativeMousePosition[1] + "px");
			})
			.on("mouseout", function(d) {
				const { strokeWidth, strokeWidthAccessible } = Configuration.bars.mouseout;
				select(this)
					.attr("stroke-width", accessibility ? strokeWidthAccessible : strokeWidth)
					.attr("stroke", accessibility ? self.getStrokeColor(d.datasetLabel, d.label, d.value) : "none")
					.attr("stroke-opacity", Configuration.bars.mouseout.strokeOpacity);

				self.hideTooltip();
			});
	}
}
