import { colors } from "./colors";

// Demo turkish locale for simple bar time-series
const turkishLocale = require("d3-time-format/locale/tr-TR.json");

export const groupedBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
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
	title: "Grouped bar (discrete)",
	axes: {
		left: {
			primary: true,
		},
		bottom: {
			scaleType: "labels",
			secondary: true,
		},
		top: {
			scaleType: "labels",
		}
	}
};

// Simple bar
export const simpleBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
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
	title: "Simple bar (discrete)",
	axes: {
		left: {
			primary: true
		},
		bottom: {
			scaleType: "labels",
			secondary: true,
		}
	}
};


export const simpleBarTimeSeriesData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Miscellaneous"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{
					date: new Date(2019, 0, 1),
					value: 10000
				},
				{
					date: new Date(2019, 0, 2),
					value: 65000
				},
				{
					date: new Date(2019, 0, 3),
					value: 10000
				},
				{
					date: new Date(2019, 0, 6),
					value: 49213
				},
				{
					date: new Date(2019, 0, 7),
					value: 51213
				}
			]
		}
	]
};

export const simpleBarTimeSeriesOptions = {
	title: "Simple bar (time series - Turkish)",
	axes: {
		left: {
			primary: true
		},
		bottom: {
			scaleType: "time",
			secondary: true,
		}
	},
	locale: {
		time: turkishLocale
	}
};

// Stacked bar
export const stackedBarData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
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
	title: "Stacked bar (discrete)",
	axes: {
		left: {
			primary: true,
			stacked: true
		},
		bottom: {
			scaleType: "labels",
			secondary: true,
		}
	}
};


export const stackedBarTimeSeriesData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
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
	title: "Stacked bar (time series)",
	axes: {
		left: {
			primary: true,
			stacked: true
		},
		bottom: {
			scaleType: "time",
			secondary: true
		}
	}
};
