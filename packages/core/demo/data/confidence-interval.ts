export const confidenceIntervalTimeSeriesData = [
	{ group: "Dataset 1", date: new Date(2019, 0, 1), value: 50000, min: 30000, max: 60000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 5), value: 15000, min:5000, max: 30000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 8), value: 20000, min: 10000, max: 35000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 13), value: 39213, min: 10000, max: 45000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 19), value: 61213, min: 50000, max: 70000 }
];

export const confidenceIntervalTimeSeriesOptions = {
	title: "Confidence Interval (time series)",
	legend: {
		enabled: false
	},
	confidence : {
		upperBoundMapsTo: "max",
		lowerBoundMapsTo: "min" 
   	},
	axes: {
		bottom: {
			title: "2019 Annual Sales Figures",
			mapsTo: "date",
			scaleType: "time"
		},
		left: {
			mapsTo: "value",
			title: "Conversion rate",
			scaleType: "linear"
		}
	}
};

export const confidenceIntervalTimeSeriesCurvedData = [
	{ group: "Dataset 1", date: new Date(2019, 0, 1), value: 47263, min: 40000, max:50000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 5), value: 14178, min: 10000, max: 20000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 8), value: 23094, min: 10000, max: 25000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 13), value: 45281, min: 42000, max: 50000 },
	{ group: "Dataset 1", date: new Date(2019, 0, 19), value: -63954, min: -70000, max: -10000 }
];

export const confidenceIntervalTimeSeriesCurvedOptions = {
	title: "Confidence Interval (time series - natural curve)",
	legend: {
		enabled: false
	},
	confidence : {
		upperBoundMapsTo: "max",
		lowerBoundMapsTo: "min" 
   	},
	axes: {
		bottom: {
			title: "2019 Annual Sales Figures",
			mapsTo: "date",
			scaleType: "time"
		},
		left: {
			mapsTo: "value",
			scaleType: "linear"
		}
	},
	curve: "curveNatural"
};
