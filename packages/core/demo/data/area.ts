export const areaTimeSeriesData = [
    { group: "Dataset 1", date: new Date(2019, 0, 1), value: 0 },
    { group: "Dataset 1", date: new Date(2019, 0, 6), value: 57312 },
    { group: "Dataset 1", date: new Date(2019, 0, 8), value: 21432 },
    { group: "Dataset 1", date: new Date(2019, 0, 15), value: 70323 },
    { group: "Dataset 1", date: new Date(2019, 0, 19), value: 21300 },
    { group: "Dataset 2", date: new Date(2019, 0, 1), value: 50000 },
    { group: "Dataset 2", date: new Date(2019, 0, 5), value: 15000 },
    { group: "Dataset 2", date: new Date(2019, 0, 8), value: 20000 },
    { group: "Dataset 2", date: new Date(2019, 0, 13), value: 39213 },
    { group: "Dataset 2", date: new Date(2019, 0, 19), value: 61213 },
    { group: "Dataset 3", date: new Date(2019, 0, 2), value: 10 },
    { group: "Dataset 3", date: new Date(2019, 0, 6), value: 37312 },
    { group: "Dataset 3", date: new Date(2019, 0, 8), value: 51432 },
    { group: "Dataset 3", date: new Date(2019, 0, 13), value: 40323 },
    { group: "Dataset 3", date: new Date(2019, 0, 19), value: 31300 }
];

export const areaTimeSeriesOptions = {
	title: "Area (time series)",
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

export const areaTimeSeriesCurvedData = [
    { group: "Dataset 1", date: new Date(2019, 0, 1), value: 0 },
    { group: "Dataset 1", date: new Date(2019, 0, 6), value: -37312 },
    { group: "Dataset 1", date: new Date(2019, 0, 8), value: -22392 },
    { group: "Dataset 1", date: new Date(2019, 0, 15), value: -52576 },
    { group: "Dataset 1", date: new Date(2019, 0, 19), value: 20135 },
    { group: "Dataset 2", date: new Date(2019, 0, 1), value: 47263 },
    { group: "Dataset 2", date: new Date(2019, 0, 5), value: 14178 },
    { group: "Dataset 2", date: new Date(2019, 0, 8), value: 23094 },
    { group: "Dataset 2", date: new Date(2019, 0, 13), value: 45281 },
    { group: "Dataset 2", date: new Date(2019, 0, 19), value: -63954 }
];

export const areaTimeSeriesCurvedOptions = {
	title: "Area (time series - natural curve)",
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
