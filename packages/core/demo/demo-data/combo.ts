import { colors } from "./colors";

export const comboData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				65000,
				-29123,
				-35213,
				51213,
				16932
			],
			chartType: "BarChart"
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[2]],
			data: [
				-12312,
				23232,
				34232,
				-12312,
				-34234
			],
			chartType: "BarChart"
		},
		{
			label: "Dataset 3",
			backgroundColors: [colors[3]],
			data: [
				-32423,
				21313,
				64353,
				24134,
				32423
			],
			chartType: "BarChart"
		},
		{
			label: "Dataset 4",
			backgroundColors: [colors[1]],
			data: [
				32432,
				11312,
				3234,
				43534,
				34234
			],
			chartType: "LineChart"
		}
	]
};

export const comboOptions = {
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			formatter: axisValue => `${axisValue / 1000}k`,
			yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
		},
		y2: {
			ticks: {
				max: 70,
				min: -60
			}
		}
	},
	legendClickable: true,
	containerResizable: true,
	chartTitle: "Combo Chart"
};
