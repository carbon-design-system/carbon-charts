import React from "react";

import { BarChart } from "@peretz/charts-react";

import { randomizeValue, colors } from "../utils";

const groupedBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				65000,
				29123,
				35213,
				51213,
				16932
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				32432,
				21312,
				56456,
				21312,
				34234
			]
		},
		{
			label: "Dataset 3",
			backgroundColors: [colors[2]],
			data: [
				12312,
				23232,
				34232,
				12312,
				34234
			]
		},
		{
			label: "Dataset 4",
			backgroundColors: [colors[3]],
			data: [
				32423,
				21313,
				64353,
				24134,
				32423
			]
		}
	]
};

const groupedBarOptions = {
	accessibility: true,
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			formatter: axisValue => {
				return `${axisValue / 1000}k`;
			},
			yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
		},
		y2: {
			ticks: {
				max: 1,
				min: 0
			}
		}
	},
	legendClickable: true,
	containerResizable: true
};

// Simple bar
const simpleBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: colors,
			data: [
				65000,
				29123,
				35213,
				51213,
				16932
			]
		}
	]
};

const simpleBarOptions = {
	accessibility: false,
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			formatter: axisValue => {
				return `${axisValue / 1000}k`;
			},
			yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
			stacked: false
		}
	},
	legendClickable: true,
	containerResizable: true,
};

// Stacked bar
const stackedBarOptions = {
	accessibility: false,
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			formatter: axisValue => {
				return `${axisValue / 1000}k`;
			},
			yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
			stacked: true
		}
	},
	legendClickable: true,
	containerResizable: true,
};

export default class Bar extends React.Component {
	changeDemoData(chartType: string) {
		const chartObject = this[chartType];

		const oldData = chartObject.data;
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

		chartObject.setData(newData);
	}

	render() {
		return (
			<div>
				<h2>Grouped</h2>

				<BarChart
					data={groupedBarData}
					options={groupedBarOptions}
					ref={groupedBarChart => this.groupedBarChart = groupedBarChart}
				/>

				<button className="btn--primary" onClick={this.changeDemoData.bind(this, "groupedBarChart")}>
					Change Data
				</button>

				<h2 style={{ marginTop: 60 }}>Simple</h2>

				<BarChart
					data={simpleBarData}
					options={simpleBarOptions}
					ref={simpleBarChart => this.simpleBarChart = simpleBarChart}
				/>

				<button className="btn--primary" onClick={this.changeDemoData.bind(this, "simpleBarChart")}>
					Change Data
				</button>

				<h2 style={{ marginTop: 60 }}>Stacked</h2>

				<BarChart
					data={groupedBarData}
					options={stackedBarOptions}
					ref={stackedBarChart => this.stackedBarChart = stackedBarChart}
				/>

				<button className="btn--primary" onClick={this.changeDemoData.bind(this, "stackedBarChart")}>
					Change Data
				</button>

			</div>
		)
	}
}
