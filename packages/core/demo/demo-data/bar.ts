import { colors } from "./colors";
import {
	demoLabels,
	demoDatasetLabels,
	demoYAxisTitle,
	demoXAxisTitle
} from "./commons";

export const groupedBarData = {
	labels: demoLabels,
	datasets: [
		{
			label: demoDatasetLabels[0],
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
			label: demoDatasetLabels[1],
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
			label: demoDatasetLabels[2],
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
			label: demoDatasetLabels[3],
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
			title: demoXAxisTitle,
		},
		y: {
			title: demoYAxisTitle,
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
	tooltip: {
		size: "compact"
	},
	legendClickable: true,
	rtl: true,
	containerResizable: true,
};

// Simple bar
export const simpleBarData = {
	labels: demoLabels,
	datasets: [
		{
			label: demoDatasetLabels[0],
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
			title: demoXAxisTitle,
		},
		y: {
			title: demoYAxisTitle,
			formatter: axisValue => `${axisValue / 1000}k`,
			yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
			stacked: false
		}
	},
	legendClickable: true,
	containerResizable: true,
	bars: {
		maxWidth: 50
	},
	rtl: true
};

// Stacked bar
export const stackedBarData = {
	labels: demoLabels,
	datasets: [
		{
			label: demoDatasetLabels[0],
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
			label: demoDatasetLabels[1],
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
			label: demoDatasetLabels[2],
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
			label: demoDatasetLabels[3],
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
	accessibility: false,
	scales: {
		x: {
			title: demoXAxisTitle,
		},
		y: {
			title: demoYAxisTitle,
			formatter: axisValue => `${axisValue / 1000}k`,
			yMaxAdjuster: yMaxValue => yMaxValue * 1.1,
			stacked: true
		}
	},
	tooltip: {
		size: "compact"
	},
	legendClickable: true,
	containerResizable: true,
	rtl: true
};
