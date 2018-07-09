import { colors } from "./colors";

export const groupedBarData = {
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

export const groupedBarOptions = {
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
	containerResizable: true,
};

// Simple bar
export const simpleBarData = {
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

export const simpleBarOptions = {
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
		}
	},
	legendClickable: true,
	containerResizable: true,
};

// Stacked bar
export const stackedBarData = [
	{
		label: "Q1",
		Qty: 12313,
		More: 34234,
		Sold: 12312,
		Restocking: 32523,
		Misc: 21312
	},
	{
		label: "Q2",
		Qty: 35213,
		More: 10031,
		Sold: 21321,
		Restocking: 12312,
		Misc: 12311
	},
	{
		label: "Q3",
		Qty: 13212,
		More: 23123,
		Sold: 43222,
		Restocking: 21412,
		Misc: 5322
	},
	{
		label: "Q4",
		Qty: 12312,
		More: 34233,
		Sold: 32111,
		Restocking: 21313,
		Misc: 43223
	},
];

export const stackedBarOptions = {
	accessibility: false,
	scales: {
		x: {
			domain: "label",
			title: "2017 Financials"
		},
		y: {
			formatter: axisValue => {
				return `${axisValue / 1000}k`;
			},
			numberOfTicks: 10
		},
		y2: {

		}
	},
	legendClickable: true,
	containerResizable: true,
	colors
};
