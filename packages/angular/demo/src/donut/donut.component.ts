import { Component, Input, ViewChild } from "@angular/core";

// Chart imports
import { randomizeValue } from "../helpers/commons";

@Component({
	selector: "app-donut",
	templateUrl: "./donut.component.html"
})
export class DonutComponent {
	@ViewChild("donutChart") donutChart;

	@Input() donutOptions = {};
	@Input() donutData = {};

	changeDemoData() {
		const oldData = this.donutChart.data;

		// Randomize old data values
		const newData = Object.assign({}, oldData);
		newData.datasets = oldData.datasets.map(dataset => {
			const datasetNewData = dataset.data.map(dataPoint => randomizeValue(dataPoint));

			const newDataset = Object.assign({}, dataset, { data: datasetNewData });

			return newDataset;
		});

		this.donutData = newData;

		setTimeout(() => {
			// Update DonutCenter values
			const { number: centerNumber } = this.donutChart.center.configs;
			let newCenterNumber = Math.floor(Math.max(0.2 * centerNumber, centerNumber * Math.random() * (Math.random() * 5)));
			if (newCenterNumber <= 10) {
				newCenterNumber = 10000;
			}

			this.donutChart.center.configs.number = newCenterNumber;
			this.donutChart.center.update();
		}, 0);
	}

	// TODO - Remove on destroy
}
