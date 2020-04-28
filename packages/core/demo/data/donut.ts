import { pieData } from "./pie";

export const donutData = pieData;

export const donutOptions = {
	title: "Donut",
	resizable: true,
	donut: {
		center: {
			label: "Browsers"
		}
	}
};

// donut - no data
export const donutNoData = [];
export const donutNoDataOptions = {
	title: "Donut (no data)",
	resizable: true,
	donut: {
		center: {
			label: "Browsers"
		}
	}
};

// donut - loading data
export const donutLoadingData = [];
export const donutLoadingDataOptions = {
	title: "Donut (loading data)",
	resizable: true,
	donut: {
		center: {
			label: "Browsers"
		}
	},
	data: {
		loading: true
	}
};
