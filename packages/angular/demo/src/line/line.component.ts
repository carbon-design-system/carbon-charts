import { Component, Input, ViewChild } from "@angular/core";

// Chart imports
import { randomizeValue } from "@peretz/charts-angular/demo/src/helpers/commons";

@Component({
	selector: "app-line",
	templateUrl: "./line.component.html"
})
export class LineComponent {
	@ViewChild("lineChart") lineChart;

	@Input() lineOptions = {};
	@Input() lineData = {};

	changeDemoData() {
		const oldData = this.lineChart.data;
		const removeADataset = Math.random() > 0.5;

		const newData = Object.assign({}, oldData);
		newData.datasets = oldData.datasets.map(dataset => {
			const datasetNewData = dataset.data.map(dataPoint => randomizeValue(dataPoint));

			const newDataset = Object.assign({}, dataset, { data: datasetNewData });

			return newDataset;
		});

		if (removeADataset) {
			const randomIndex = Math.floor(Math.random() * (newData.datasets.length - 1));
			newData.datasets.splice(randomIndex, randomIndex);
		}

		this.lineData = newData;
	}
}
