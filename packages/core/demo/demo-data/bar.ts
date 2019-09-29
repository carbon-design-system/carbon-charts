import { colors } from "./colors";
import { getTheme } from "./themes";

export const groupedBarData = {
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
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				32432,
				-21312,
				-56456,
				-21312,
				34234
			]
		},
		{
			label: "Dataset 3",
			backgroundColors: [colors[2]],
			data: [
				-12312,
				23232,
				34232,
				-12312,
				-34234
			]
		},
		{
			label: "Dataset 4",
			backgroundColors: [colors[3]],
			data: [
				-32423,
				21313,
				64353,
				24134,
				32423
			]
		}
	]
};

export const groupedBarOptions = {
	scales: {
		x: {
			title: "2018 Annual Sales Figures",
		},
		y: {
			title: "Dollars (CAD)",
			formatter: axisValue => `${axisValue / 1000}k`,
			yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
		},
		y2: {
			ticks: {
				max: 1,
				min: 0
			},
			formatter: axisValue => `${axisValue * 100}%`
		}
	},
	legendClickable: true,
	resizable: true,
	theme: getTheme()
};

// Simple bar
export const simpleBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Miscellaneous"],
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
	axes: {
		left: {
			primary: true
		},
		bottom: {
			type: "labels",
			secondary: true,
		}
	},
	theme: getTheme()
};

// Stacked bar
export const stackedBarData = {
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

export const stackedBarOptions = {
	title: "Stacked Bar Chart",
	axes: {
		left: {
			primary: true,
			stacked: true
		},
		bottom: {
			type: "labels",
			secondary: true,
		}
	},
	theme: getTheme()
};


export const stackedBarTimeSeriesData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			backgroundColors: [colors[0]],
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 10000
				},
				{
					date: new Date(2019, 0, 5),
					value: 65000
				},
				{
					date: new Date(2019, 0, 8),
					value: 10000
				},
				{
					date: new Date(2019, 0, 13),
					value: 49213
				},
				{
					date: new Date(2019, 0, 17),
					value: 51213
				}
			]
		},
		{
			label: "Dataset 2",
			backgroundColors: [colors[1]],
			data: [
				{
					date: new Date(2019, 0, 3),
					value: 75000
				},
				{
					date: new Date(2019, 0, 6),
					value: 57312
				},
				{
					date: new Date(2019, 0, 8),
					value: 21432
				},
				{
					date: new Date(2019, 0, 15),
					value: 70323
				},
				{
					date: new Date(2019, 0, 19),
					value: 21300
				}
			]
		},
		{
			label: "Dataset 3",
			backgroundColors: [colors[2]],
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 50000
				},
				{
					date: new Date(2019, 0, 5),
					value: 15000
				},
				{
					date: new Date(2019, 0, 8),
					value: 20000
				},
				{
					date: new Date(2019, 0, 13),
					value: 39213
				},
				{
					date: new Date(2019, 0, 17),
					value: 61213
				}
			]
		},
		{
			label: "Dataset 4",
			backgroundColors: [colors[3]],
			data: [
				{
					date: new Date(2019, 0, 2),
					value: 10
				},
				{
					date: new Date(2019, 0, 6),
					value: 37312
				},
				{
					date: new Date(2019, 0, 8),
					value: 51432
				},
				{
					date: new Date(2019, 0, 15),
					value: 40323
				},
				{
					date: new Date(2019, 0, 19),
					value: 31300
				}
			]
		}
	]
};

export const stackedBarTimeSeriesOptions = {
	title: "Stacked Bar Chart - Time Series",
	axes: {
		left: {
			primary: true,
			stacked: true
		},
		bottom: {
			type: "time",
			secondary: true,
		}
	},
	theme: getTheme()
};
