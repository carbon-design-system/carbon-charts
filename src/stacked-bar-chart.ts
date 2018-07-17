import * as d3 from "d3";

import { Configuration } from "./configuration";
import { BaseAxisChart } from "./base-axis-chart";

export class StackedBarChart extends BaseAxisChart {
	constructor(holder: Element, configs: any) {
		super(holder, configs);

		this.options.type = "bar";
	}

	// Move into base-axis-chart
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

	draw() {
		const { data } = this;

		this.innerWrap.style("width", "100%")
			.style("height", "100%");

		const margin = {top: 0, right: -40, bottom: 50, left: 40};
		const chartSize = this.getChartSize();
		const height = chartSize.height - this.getBBox(".x.axis").height;

		const g = this.innerWrap
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

		// this.patternsService.addPatternSVGs(data, this.colorScale);
		// this.patternScale = d3.scaleOrdinal()
		// 	.range(this.patternsService.getFillValues())
		// 	.domain(this.getLegendItemKeys());

		const stackDataArray = this.displayData.labels.map((label, i) => {
			const correspondingData = {};

			this.displayData.datasets.forEach(dataset => {
				correspondingData[dataset.label] = dataset.data[i];
			});

			correspondingData["label"] = label;

			return correspondingData;
		});

		const stackKeys = this.displayData.datasets.map(dataset => dataset.label);

		// const stackData = d3.stack().keys(this.displayData.labels)(stackDataArray);
		this.innerWrap.append("g")
			.selectAll("g")
			.data(d3.stack().keys(stackKeys)(stackDataArray))
			.enter()
				.append("g")
				.attr("fill", d => "red")
				.selectAll("rect")
				.data(function(d) {
					// Add datasetLabel to each piece of data
					// To be used to get the fill color
					Object.keys(d).map(key => {
						if (typeof d[key] === "object") {
							d[key]["datasetLabel"] = d.key;
							d[key]["label"] = d[key].data["label"];
							d[key]["value"] = d[key].data[d.key];
						}
					});

					return d;
				})
				.enter()
					.append("rect")
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
		this.events.dispatchEvent(new Event("load"));
	}

	resizeChart() {
		console.log("RESIZE STACKED");
	}

	updateElements(animate: boolean, rect?: any, g?: any) {
	}
}
