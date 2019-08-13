import { Component, Input, ViewChild } from "@angular/core";

// Chart imports
import { randomizeValue } from "../helpers/commons";

@Component({
	selector: "app-area",
	templateUrl: "./area.component.html"
})
export class AreaComponent {
	@ViewChild("areaChart") areaChart;

	@Input() areaOptions = {};
	@Input() areaData = {};

	changeDemoData() {
		const oldData = this.areaChart.data;
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

		this.areaData = newData;
	}
}
