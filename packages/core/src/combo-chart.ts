import { BaseAxisChart } from "./base-axis-chart";

import * as ChartInstances from "./index";
import * as Configuration from "./configuration";
import { ChartConfig, ComboChartOptions, ChartType } from "./configuration";
import { Tools } from "./tools";

// TODO - Support adding/removing charts when updating data
export class ComboChart extends BaseAxisChart {
	// Includes all the sub-charts
	charts = [];

	options: ComboChartOptions;

	constructor(holder: Element, configs: ChartConfig<ComboChartOptions>) {
		super(holder, configs);

		this.options.type = ChartType.COMBO;
	}

	// Extract data related to the specific sub-chart
	extractDataForChart(chartType: string) {
		return Tools.merge({}, this.displayData, {
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

	draw() {
		// If charts have been initialized
		if (this.charts.length) {
			return;
		}

		this.displayData.datasets.forEach(dataset => {
			// If the chart type is valid
			if (ChartInstances[dataset.chartType]) {
				// If the chart for this dataset has not already been created
				if (this.charts.findIndex(chart => chart.type === dataset.chartType) === -1) {
					if (ChartInstances[dataset.chartType].prototype instanceof BaseAxisChart) {
						const chartConfigs = {
							data: this.extractDataForChart(dataset.chartType),
							options: Tools.merge({}, this.options, {
								axis: {
									x: this.x,
									y: this.y,
									y2: this.y2
								}
							})
						};

						const chart = new ChartInstances[dataset.chartType](
							this.holder,
							chartConfigs
						);

						// Override sub-chart update function
						chart.update = function () {
							this.displayData = this.updateDisplayData();

							this.interpolateValues(this.displayData);
						};

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
			chart.instance.setYScale(this.y);
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
