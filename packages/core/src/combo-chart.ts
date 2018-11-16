import { BaseAxisChart } from "./base-axis-chart";

import * as ChartTypes from "./index";

import { select } from "d3-selection";

// TODO - Support adding/removing charts when updating data
export class ComboChart extends BaseAxisChart {
	// Includes all the sub-charts
	charts = [];

	constructor(holder: Element, configs: any) {
		super(holder, configs);

		this.options.type = "combo";
	}

	// Extract data related to the specific sub-chart
	extractDataForChart(chartType: string) {
		return Object.assign({}, this.displayData, {
			datasets: this.displayData.datasets.filter(_dataset => _dataset.chartType === chartType)
		});
	}

	update() {
		super.update();

		if (this.charts && this.charts.length > 0) {
			this.updateChildrenScales();
			this.setChildrenData();
		}
	}

	// This only needs to be performed in the sub-chart instances
	interpolateValues(newData: any) {
		return;
	}

	// This only needs to be performed in the sub-chart instances
	addDataPointEventListener() {
		return;
	}

	resizeChart(){
		const chartSize: any = this.getChartSize(this.container);
		const dimensionToUseForScale = Math.min(chartSize.width, chartSize.height);

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

		super.resizeChart();

		this.charts.forEach(chart => {
			chart.instance.setXScale(this.x);
			chart.instance.setYScale(this.y);

			const chartType = chart.instance.options.type;
			if (chartType == "line") {
				chart.instance.updateElements(false, null);
			} 
			else if (chartType == "bar") {
				const g = this.innerWrap.selectAll("g.bars g");
				chart.instance.updateElements(false, null, g);
			}
		});
	}

	draw() {
		// If charts have been initialized
		if (this.charts.length) {
			return;
		}

		this.displayData.datasets.forEach(dataset => {
			// If the chart type is valid
			if (ChartTypes[dataset.chartType]) {
				// If the chart for this dataset has not already been created
				if (this.charts.findIndex(chart => chart.type === dataset.chartType) === -1) {
					if (ChartTypes[dataset.chartType].prototype instanceof BaseAxisChart) {
						const chartConfigs = {
							data: this.extractDataForChart(dataset.chartType),
							options: Object.assign({}, this.options, {
								axis: {
									x: this.x,
									y: this.y,
									y2: this.y2
								}
							})
						};

						const chart = new ChartTypes[dataset.chartType](
							this.holder,
							chartConfigs
						);

						// Override sub-chart update function
						chart.update = function () {
							this.displayData = this.updateDisplayData();

							this.interpolateValues(this.displayData);
						};

						chart.resizeChart = null;

						// Add chart to the array of sub-charts
						this.charts.push({
							type: dataset.chartType,
							instance: chart
						});
					} else {
						console.error(`Chart type ${dataset.chartType} not supported in Combo - your chart should extend BaseAxisChart`);
					}
				}
			} else {
				console.error(`Invalid chart type: "${dataset.chartType}"`);
			}
		});
	}

	// Pass down the x & y scales to the sub-charts
	updateChildrenScales() {
		this.charts.forEach(chart => {
			chart.instance.setXScale(this.x);
			chart.instance.setXAxis();
			chart.instance.setYScale(this.y);
			chart.instance.setYAxis();
		});
	}

	// Extract data related to each sub-chart and set them
	setChildrenData() {
		this.charts.forEach(chart => {
			const chartData = this.extractDataForChart(chart.type);

			chart.instance.setData(chartData);

			console.log(`SET ${chart.type} data to`, chartData);
		});
	}
}
