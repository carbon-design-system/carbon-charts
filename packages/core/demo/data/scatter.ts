import { lineTimeSeriesData } from "./line";

export const scatterLinearData = [
	{ group: "Dataset 1", sales: 10000, profit: 32100 },
	{ group: "Dataset 1", sales: 12000, profit: 23500 },
	{ group: "Dataset 1", sales: 14000, profit: 53100 },
	{ group: "Dataset 1", sales: 15000, profit: 42300 },
	{ group: "Dataset 1", sales: 16000, profit: 12300 },
	{ group: "Dataset 2", sales: 11000, profit: 12400 },
	{ group: "Dataset 2", sales: 13000, profit: 34500 },
	{ group: "Dataset 2", sales: 13500, profit: 23100 },
	{ group: "Dataset 2", sales: 15500, profit: 63200 },
	{ group: "Dataset 2", sales: 15750, profit: 24300 }
];

export const scatterLinearOptions = {
	title: "Scatter (linear)",
	axes: {
		bottom: {
			title: "Sales",
			identifier: "sales"
		},
		left: {
			title: "Profit",
			identifier: "profit"
		}
	}
};

export const scatterData = [
	{ group: "Dataset 1", key: "Qty", value: 32100 },
	{ group: "Dataset 1", key: "More", value: 23500 },
	{ group: "Dataset 1", key: "Sold", value: 53100 },
	{ group: "Dataset 1", key: "Restocking", value: 42300 },
	{ group: "Dataset 1", key: "Misc", value: 12300 },
	{ group: "Dataset 2", key: "Qty", value: 34200 },
	{ group: "Dataset 2", key: "More", value: 53200 },
	{ group: "Dataset 2", key: "Sold", value: 42300 },
	{ group: "Dataset 2", key: "Restocking", value: 21400 },
	{ group: "Dataset 2", key: "Misc", value: 0 },
	{ group: "Dataset 3", key: "Qty", value: 41200 },
	{ group: "Dataset 3", key: "More", value: 18400 },
	{ group: "Dataset 3", key: "Sold", value: 34210 },
	{ group: "Dataset 3", key: "Restocking", value: 1400 },
	{ group: "Dataset 3", key: "Misc", value: 42100 },
	{ group: "Dataset 4", key: "Qty", value: 22000 },
	{ group: "Dataset 4", key: "More", value: 1200 },
	{ group: "Dataset 4", key: "Sold", value: 9000 },
	{ group: "Dataset 4", key: "Restocking", value: 24000 },
	{ group: "Dataset 4", key: "Misc", value: 3000 }
];

export const scatterOptions = {
	title: "Scatter (discrete)",
	axes: {
		bottom: {
			title: "2018 Annual Sales Figures",
			scaleType: "labels",
			identifier: "key"
		},
		left: {
			identifier: "value"
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
			identifier: "date"
		},
		left: {
			identifier: "value"
		}
	}
};
