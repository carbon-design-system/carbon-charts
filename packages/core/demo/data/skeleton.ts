// pie chart with correct data
export const pieSkeletonCorrectData = {
	labels: ["Company 1", "Company 2", "Company 3", "Company 4"],
	datasets: [
		{
			label: "Dataset 1",
			data: [10, 30, 60, 20]
		}
	]
};

export const pieSkeletonCorrectOptions = {
	title: "Skeleton Pie with correct data",
	resizable: true
};

// pie chart with incorrect data: negative values
export const pieSkeletonNegativeValuesData = {
	labels: ["Company 1", "Company 2", "Company 3", "Company 4"],
	datasets: [
		{
			label: "Dataset 1",
			data: [10, 30, -60, 20]
		}
	]
};

export const pieSkeletonNegativeValuesOptions = {
	title: "Skeleton Pie with negative values",
	resizable: true
};

// pie chart with incorrect data: missing data
export const pieSkeletonMissingDataData = {
	labels: ["Company 1", "Company 2", "Company 3", "Company 4"],
	datasets: [
		{
			label: "Dataset 1",
			data: [10, 30, 60]
		}
	]
};

export const pieSkeletonMissingDataOptions = {
	title: "Skeleton Pie with missing data",
	resizable: true
};

// scatterplot (x: cat, y: cont) with correct data
export const scatterSkeletonData = {
	labels: ["Qty", "More", "Sold"],
	datasets: [
		{ label: "Dataset 1", data: [30, 20, 55] },
		{ label: "Dataset 2", data: [35, 50, 40] }
	]
};

export const scatterSkeletonOptions = {
	title: "Scatter (x: cat, y: cont)",
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

// stacked bar (x: time, y: cont) with correct data
export const stackedBarSkeletonData = {
	labels: ["Qty", "More", "Sold"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2019, 0, 1), value: 10 },
				{ date: new Date(2019, 0, 5), value: 65 },
				{ date: new Date(2019, 0, 8), value: 10 }
			]
		},
		{
			label: "Dataset 2",
			data: [
				{ date: new Date(2019, 0, 3), value: 75 },
				{ date: new Date(2019, 0, 6), value: 57 },
				{ date: new Date(2019, 0, 8), value: 21 }
			]
		},
		{
			label: "Dataset 3",
			data: [
				{ date: new Date(2019, 0, 1), value: 50 },
				{ date: new Date(2019, 0, 5), value: 15 },
				{ date: new Date(2019, 0, 8), value: 20 }
			]
		},
	]
};

export const stackedBarSkeletonOptions = {
	title: "Stacked bar (x: time, y: cont)",
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
