export const pieData = [
	{ group: "2V2N 9KYPM version 1", value: 20000 },
	{ group: "L22I P66EP L22I P66EP L22I P66EP", value: 65000 },
	{ group: "JQAI 2M4L1", value: 75000 },
	{ group: "J9DZ F37AP", value: 1200 },
	{ group: "YEL48 Q6XK YEL48", value: 10000 },
	{ group: "Misc", value: 25000 }
];

export const pieOptions = {
	title: "Pie",
	resizable: true
};

// pie - no data
export const pieNoData = [];
export const pieNoDataOptions = {
	title: "Pie (no data)",
	resizable: true
};

// pie - loading data
export const pieLoadingData = [];
export const pieLoadingDataOptions = {
	title: "Pie (loading data)",
	resizable: true,
	data: {
		loading: true
	}
};
