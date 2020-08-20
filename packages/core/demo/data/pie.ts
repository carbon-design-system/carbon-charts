export const pieData = [
	{ group: "2V2N 9KYPM version 1", value: 20000 },
	{ group: "L22I P66EP L22I P66EP L22I P66EP", value: 65000 },
	{ group: "JQAI 2M4L1", value: 75000 },
	{ group: "J9DZ F37AP", value: 1200 },
	{ group: "YEL48 Q6XK YEL48", value: 10000 },
	{ group: "Misc", value: 25000 }
];

export const pieData2 = [
	{ group: "2V2N 9KYPM version 1", value: 15000 },
	{ group: "L22I P66EP L22I P66EP L22I P66EP", value: 23000 },
	{ group: "JQAI 2M4L1", value: 1200 },
	{ group: "J9DZ F37AP", value: 7500 },
	{ group: "YEL48 Q6XK YEL48", value: 3200 },
	{ group: "Misc", value: 5000 }
];

export const pieOptions = {
	title: "Pie",
	resizable: true
};

export const pieCenteredData = pieData;

export const pieCenteredOptions = {
	title: "Pie (centered)",
	resizable: true,
	legend: {
		alignment: "center"
	},
	pie: {
		alignment: "center"
	}
};

// pie - empty state
export const pieEmptyStateData = [];
export const pieEmptyStateOptions = {
	title: "Pie (empty state)",
	resizable: true
};

// pie - skeleton
export const pieSkeletonData = [];
export const pieSkeletonOptions = {
	title: "Pie (skeleton)",
	resizable: true,
	data: {
		loading: true
	}
};
