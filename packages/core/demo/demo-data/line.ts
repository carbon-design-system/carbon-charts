import { colors } from "./colors";
import { Tools } from "../../src/tools";

export const lineTimeSeriesData = {
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
					date: new Date(2019, 0, 2),
					value: 0
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

export const lineTimeSeriesOptions = {
	title: "Line (time series)",
	axes: {
		left: {
			secondary: true
		},
		bottom: {
			scaleType: "time",
			primary: true
		}
	},
	curve: "curveMonotoneX"
};

export const lineTimeSeriesWithCustomStroke = {
	...lineTimeSeriesOptions,
	title: "Line (custom stroke, fill colors)",
	getStrokeColor: (datasetLabel, label, value, datum, originalStrokeColor)=>{
		console.log(`originalStrokeColor: ${originalStrokeColor}`);
		return value > 60000 ? '#FF0000' : originalStrokeColor;
	},
	getFillColor: (datasetLabel, label, value, datum, originalFillColor)=>{
		console.log(`originalFillColor: ${originalFillColor}`);
		return value > 60000 ? '#FF0000' : originalFillColor;
	},
	getIsFilled: (datasetLabel, label, value, datum, originalIsFilled)=>{
		console.log(`originalIsFilled: ${originalIsFilled}`);
		return value > 60000 ? true : originalIsFilled;
	}
};

export const lineData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				32100,
				23500,
				53100,
				42300,
				12300
			]
		},
		{
			label: "Dataset 2",
			data: [
				34200,
				53200,
				42300,
				21400,
				0
			]
		},
		{
			label: "Dataset 3 long name",
			data: [
				41200,
				23400,
				34210,
				1400,
				42100
			]
		},
		{
			label: "Dataset 4 long name",
			data: [
				22000,
				1200,
				9000,
				24000,
				3000
			]
		},
		{
			label: "Dataset 5 long name",
			data: [
				2412,
				30000,
				10000,
				5000,
				31000
			]
		},
		{
			label: "Dataset 6 long name",
			data: [
				0,
				20000,
				40000,
				60000,
				80000
			]
		}
	]
};

export const lineOptions = {
	title: "Line (discrete)",
	axes: {
		bottom: {
			title: "2018 Annual Sales Figures",
			scaleType: "labels",
			secondary: true
		},
		left: {
			primary: true
		}
	}
};


// Step
export const stepOptions = Tools.merge({}, lineOptions, {
	title: "Step (discrete)",
	curve: "curveStepAfter"
});

export const stepData = lineData;

export const stepTimeSeriesOptions = Tools.merge({}, lineTimeSeriesOptions, {
	title: "Step (time series)",
	curve: "curveStepAfter"
});

export const stepTimeSeriesData = lineTimeSeriesData;

// Scatter
export const scatterData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				32100,
				23500,
				53100,
				42300,
				12300
			]
		},
		{
			label: "Dataset 2",
			data: [
				34200,
				53200,
				42300,
				21400,
				0
			]
		},
		{
			label: "Dataset 3 long name",
			data: [
				41200,
				23400,
				34210,
				1400,
				42100
			]
		},
		{
			label: "Dataset 4 long name",
			data: [
				22000,
				1200,
				9000,
				24000,
				3000
			]
		},
		{
			label: "Dataset 5 long name",
			data: [
				2412,
				30000,
				10000,
				5000,
				31000
			]
		},
		{
			label: "Dataset 6 long name",
			data: [
				0,
				20000,
				40000,
				60000,
				80000
			]
		}
	]
};

export const scatterOptions = {
	title: "Scatter (discrete)",
	axes: {
		bottom: {
			title: "2018 Annual Sales Figures",
			scaleType: "labels",
			secondary: true
		},
		left: {
			primary: true
		}
	}
};

export const scatterTimeSeriesData = lineTimeSeriesData;

export const scatterTimeSeriesOptions = {
	title: "Scatter (time series)",
	axes: {
		bottom: {
			title: "2019 Annual Sales Figures",
			scaleType: "time",
			secondary: true
		},
		left: {
			primary: true
		}
	}
};
