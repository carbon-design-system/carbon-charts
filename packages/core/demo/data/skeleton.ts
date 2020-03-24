import { Tools } from "@carbon/charts/tools";

// barchart (x: labels, y: lin)
export const barchartLabLinData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [65000, 29123, 35213, 51213, 16932]
		}
	]
};

export const barchartLabLinOptions = {
	title: "Barchart (x: labels, y: lin)",
	axes: {
		left: {
			primary: true
		},
		bottom: {
			scaleType: "labels",
			secondary: true
		}
	}
};

///////////////////////////////////////////////////////

// barchart with fixed domain (x: labels, y: lin)
export const barchartLabLinFixDomData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [65000, 29123, 35213, 51213, 16932]
		}
	]
};

export const barchartLabLinFixDomOptions = {
	title: "Barchart with fixed domain (x: labels, y: lin)",
	axes: {
		left: {
			primary: true,
			domain: [-100000, 100000]
		},
		bottom: {
			scaleType: "labels",
			secondary: true
		}
	}
};

///////////////////////////////////////////////////////

// barchart grouped with 0 (x: labels, y: lin)
export const barchartGroupedWithZeroData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [65000, -29123, -35213, 51213, 16932]
		},
		{
			label: "Dataset 2",
			data: [32432, -21312, -56456, -21312, 34234]
		},
		{
			label: "Dataset 3",
			data: [-12312, 23232, 34232, -12312, -34234]
		},
		{
			label: "Dataset 4",
			data: [-32423, 21313, 64353, 24134, 32423]
		}
	]
};

export const barchartGroupedWithZeroOptions = {
	title: "Barchart grouped with 0 (x: labels, y: lin)",
	axes: {
		left: {
			primary: true,
		},
		bottom: {
			scaleType: "labels",
			secondary: true
		}
	}
};

///////////////////////////////////////////////////////

// stacked bar (x: time, y: lin)
export const stackedBarchartTimeLinData = {
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

export const stackedBarchartTimeLinOptions = {
	title: "Stacked bar (x: time, y: lin)",
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

///////////////////////////////////////////////////////

// barchart horizontal (x: lin, y: time)
export const barchartHorizLinTimeData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [65000, 29123, 35213, 51213, 16932]
		}
	]
};

export const barchartHorizLinTimeOptions = {
	title: "Barchart horizontal (x: lin, y: time)",
	axes: {
		left: {
			primary: true,
			scaleType: "labels"
		},
		bottom: {
			secondary: true
		}
	}
};

///////////////////////////////////////////////////////

// bubbleplot (x: time, y: lin)
export const bubbleTimeLinData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2019, 0, 1), value: 10000, radius: 6 },
				{ date: new Date(2019, 0, 5), value: 45000, radius: 5 },
				{ date: new Date(2019, 0, 8), value: 10000, radius: 8 },
				{ date: new Date(2019, 0, 13), value: 49213, radius: 11 },
				{ date: new Date(2019, 0, 17), value: 51213, radius: 3 }
			]
		},
		{
			label: "Dataset 2",
			data: [
				{ date: new Date(2019, 0, 2), value: 12000, radius: 4 },
				{ date: new Date(2019, 0, 6), value: 57312, radius: 6 },
				{ date: new Date(2019, 0, 8), value: 21432, radius: 8 },
				{ date: new Date(2019, 0, 15), value: 70323, radius: 3 },
				{ date: new Date(2019, 0, 19), value: 21300, radius: 5 }
			]
		},
		{
			label: "Dataset 3",
			data: [
				{ date: new Date(2019, 0, 1), value: 50000, radius: 5 },
				{ date: new Date(2019, 0, 1), value: 15000, radius: 3 },
				{ date: new Date(2019, 0, 2), value: 20000, radius: 8 },
				{ date: new Date(2019, 0, 2), value: 39213, radius: 4 },
				{ date: new Date(2019, 0, 3), value: 61213, radius: 3 },
				{ date: new Date(2019, 0, 3), value: 50000, radius: 5 },
				{ date: new Date(2019, 0, 4), value: 15000, radius: 3 },
				{ date: new Date(2019, 0, 4), value: 20000, radius: 2 },
				{ date: new Date(2019, 0, 5), value: 39213, radius: 4 },
				{ date: new Date(2019, 0, 6), value: 61213, radius: 3 }
			]
		},
		{
			label: "Dataset 4",
			data: [
				{ date: new Date(2019, 0, 2), value: 5000, radius: 2 },
				{ date: new Date(2019, 0, 6), value: 37312, radius: 3 },
				{ date: new Date(2019, 0, 8), value: 51432, radius: 5 },
				{ date: new Date(2019, 0, 15), value: 5000, radius: 7 },
				{ date: new Date(2019, 0, 19), value: 31300, radius: 2 },
				{ date: new Date(2019, 0, 4), value: 34242, radius: 5 },
				{ date: new Date(2019, 0, 5), value: 62324, radius: 12 },
				{ date: new Date(2019, 0, 9), value: 21321, radius: 9 },
				{ date: new Date(2019, 0, 12), value: 13421, radius: 2 },
				{ date: new Date(2019, 0, 14), value: 32523, radius: 15 }
			]
		}
	]
};

export const bubbleTimeLinOptions = {
	title: "Bubbleplot (x: time, y: lin)",
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

///////////////////////////////////////////////////////

// scatter (x: labels, y: lin)
export const scatterLabLinData = {
	labels: ["Qty", "More", "Sold"],
	datasets: [
		{ label: "Dataset 1", data: [30, 20, 55] },
		{ label: "Dataset 2", data: [35, 50, 40] }
	]
};

export const scatterLabLinOptions = {
	title: "Scatter (x: labels, y: lin)",
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

///////////////////////////////////////////////////////

// donutchart
export const donutData = {
	labels: ["2V2N 9KYPM version 1", "L22I P66EP L22I P66EP L22I P66EP", "JQAI 2M4L1", "J9DZ F37AP",
		"YEL48 Q6XK YEL48", "P66EP L22I L22I"],
	datasets: [
		{
			label: "Dataset 1",
			data: [20000, 65000, 75000, 1200, 10000, 25000]
		}
	]
};

export const donutOptions = {
	title: "Donutchart",
	resizable: true,
	donut: {
		center: {
			label: "Browsers"
		}
	}
};

///////////////////////////////////////////////////////

// linechart (x: time, y: lin)
export const lineTimeLinData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [
				{ date: new Date(2019, 0, 1), value: 10000 },
				{ date: new Date(2019, 0, 5), value: 65000 },
				{ date: new Date(2019, 0, 8), value: null },
				{ date: new Date(2019, 0, 13), value: 49213 },
				{ date: new Date(2019, 0, 17), value: 51213 }
			]
		},
		{
			label: "Dataset 2",
			data: [
				{ date: new Date(2019, 0, 2), value: 0 },
				{ date: new Date(2019, 0, 6), value: 57312 },
				{ date: new Date(2019, 0, 8), value: 21432 },
				{ date: new Date(2019, 0, 15), value: 70323 },
				{ date: new Date(2019, 0, 19), value: 21300 }
			]
		},
		{
			label: "Dataset 3",
			data: [
				{ date: new Date(2019, 0, 1), value: 50000 },
				{ date: new Date(2019, 0, 5), value: null },
				{ date: new Date(2019, 0, 8), value: 18000 },
				{ date: new Date(2019, 0, 13), value: 39213 },
				{ date: new Date(2019, 0, 17), value: 61213 }
			]
		},
		{
			label: "Dataset 4",
			data: [
				{ date: new Date(2019, 0, 2), value: 10 },
				{ date: new Date(2019, 0, 6), value: 37312 },
				{ date: new Date(2019, 0, 8), value: 51432 },
				{ date: new Date(2019, 0, 15), value: 25332 },
				{ date: new Date(2019, 0, 19), value: null }
			]
		}
	]
};

export const lineTimeLinOptions = {
	title: "Linechart (x: time, y: lin)",
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

///////////////////////////////////////////////////////

// piechart
export const pieData = {
	labels: ["2V2N 9KYPM version 1", "L22I P66EP L22I P66EP L22I P66EP", "JQAI 2M4L1", "J9DZ F37AP",
		"YEL48 Q6XK YEL48", "P66EP L22I L22I"],
	datasets: [
		{
			label: "Dataset 1",
			data: [20000, 65000, 75000, 1200, 10000, 25000]
		}
	]
};

export const pieOptions = {
	title: "Piechart",
	resizable: true
};

///////////////////////////////////////////////////////

// step (x: labels, y: lin)
export const stepData = {
	labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
	datasets: [
		{
			label: "Dataset 1",
			data: [32100, 23500, 53100, 42300, 12300]
		},
		{
			label: "Dataset 2",
			data: [34200, 53200, 42300, 21400, 0]
		},
		{
			label: "Dataset 3",
			data: [41200, 23400, 34210, 1400, 42100]
		},
		{
			label: "Dataset 4",
			data: [22000, 1200, 9000, 24000, 3000]
		},
		{
			label: "Dataset 5",
			data: [2412, 30000, 10000, 5000, 31000]
		},
		{
			label: "Dataset 6",
			data: [0, 20000, 40000, 60000, 80000]
		}
	]
};

export const stepOptions = {
	title: "Step (x: labels, y: lin)",
	axes: {
		bottom: {
			title: "2018 Annual Sales Figures",
			scaleType: "labels",
			secondary: true
		},
		left: {
			primary: true
		}
	},
	curve: "curveStepAfter"
};

///////////////////////////////////////////////////////



