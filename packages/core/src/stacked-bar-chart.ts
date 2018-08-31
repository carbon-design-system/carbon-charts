import * as d3 from "d3";

import { Configuration } from "./configuration";
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
	constructor(holder: Element, configs: any) {
		super(holder, configs);

		this.options.type = "bar";
	}

	getYMax() {
		const { datasets, labels } = this.displayData;
		const { scales } = this.options;
		let yMax;

		if (datasets.length === 1) {
			yMax = d3.max(datasets[0].data);
		} else {
			yMax = d3.max(labels.map((label, i) => {
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
			.data(d3.stack().keys(stackKeys)(stackDataArray))
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
					.attr("fill", d => this.getFillScale()[d.datasetLabel](d.data.label))
					.attr("stroke", d => this.options.accessibility ? this.colorScale[d.datasetLabel](d.data.label) : null)
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

		const g = this.innerWrap.selectAll("g.bars-wrapper")
			.selectAll("g")
			.data(d3.stack().keys(stackKeys)(stackDataArray));

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
				.attr("fill", d => this.getFillScale()[d.datasetLabel](d.data.label))
				.attr("opacity", 0)
				.transition(this.getFillTransition())
				.attr("opacity", 1)
				.attr("stroke", d => this.options.accessibility ? this.colorScale[d.datasetLabel](d.data.label) : null)
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
			.transition(this.getDefaultTransition())
			.style("opacity", 0)
			.remove();

		rect.exit()
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
		d3.select(this.holder).select("svg")
			.attr("width", `${dimensionToUseForScale}px`)
			.attr("height", `${dimensionToUseForScale}px`);

		this.updateXandYGrid(true);
		// Scale out the domains
		this.setXScale(true);
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
			.attr("x", d => this.x(d.data.label))
			.attr("y", d => this.y(d[1]))
			.attr("height", d => this.y(d[0]) - this.y(d[1]))
			.attr("width", d => this.x.bandwidth())
			.attr("fill", d => this.getFillScale()[d.datasetLabel](d.data.label))
			.attr("stroke", d => this.options.accessibility ? this.colorScale[d.datasetLabel](d.data.label) : null)
			.attr("stroke-width", Configuration.bars.default.strokeWidth)
			.attr("stroke-opacity", d => this.options.accessibility ? 1 : 0);
	}
}
