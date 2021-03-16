export const circlePackTwoLevelData = [
	{
		name: 'A',
		children: [
			{ name: 'A', value: 800 },
			{ name: 'B', value: 200 },
			{ name: 'C', value: 100 },
			{ name: 'D', value: 900 },
		],
	},
	{
		name: 'B',
		children: [
			{ name: 'AB', value: 2800 },
			{ name: 'BC', value: 10000 },
			{ name: 'CD', value: 500 },
			{ name: 'DE', value: 500 },
			{ name: 'EF', value: 200 },
		],
	},
	{
		name: 'C',
		children: [
			{ name: 'AA', value: 500 },
			{ name: 'BB', value: 100 },
			{ name: 'CC', value: 500 },
			{ name: 'DD', value: 500 },
			{ name: 'EE', value: 400 },
			{ name: 'FF', value: 600 },
			{ name: 'GG', value: 200 },
			{ name: 'HH', value: 800 },
			{ name: 'II', value: 900 },
			{ name: 'JJ', value: 100 },
			{ name: 'KK', value: 900 },
		],
	},
	{
		name: 'D',
		children: [
			{ name: 'KH', value: 2000 },
			{ name: 'LL', value: 400 },
			{ name: 'MM', value: 500 },
			{ name: 'NN', value: 100 },
			{ name: 'OO', value: 1000 },
			{ name: 'PP', value: 800 },
			{ name: 'QQ', value: 700 },
			{ name: 'RR', value: 200 },
			{ name: 'ST', value: 300 },
		],
	},
];

export const circlePackTwoLevelOptions = {
	title: 'Two Levels Hierarchy',
	canvasZoom: {
		enabled: true,
	},
};

export const circlePackSingleOptions = {
	title: 'One Level Hierachy',
	canvasZoom: {
		enabled: true,
	},
};

export const circlePackSingleLevelData = [
	{
		name: 'A',
		value: 300,
	},
	{
		name: 'B',
		value: 600,
	},
	{
		name: 'C',
		value: 50,
	},
	{
		name: 'D',
		value: 80,
	},
	{
		name: 'E',
		value: 80,
	},
];

export const circlePackThreeLevelOptions = {
	title: 'Three Levels Hierarchy',
	canvasZoom: {
		enabled: true,
	},
};

export const circlePackThreeLevelData = [
	{
		name: 'A',
		children: [
			{
				name: 'A',
				children: [
					{ name: 'yellow', value: 50 },
					{ name: 'green', value: 100 },
				],
			},
			{ name: 'B', value: 200 },
			{ name: 'C', value: 100 },
			{ name: 'D', value: 900 },
		],
	},
	{
		name: 'B',
		children: [
			{ name: 'AB', value: 2800 },
			{ name: 'BC', value: 10000 },
			{ name: 'CD', value: 500 },
		],
	},
	{
		name: 'C',
		children: [
			{ name: 'AA', value: 500 },
			{ name: 'BB', value: 100 },
			{ name: 'GG', value: 200 },
			{ name: 'HH', value: 800 },
			{ name: 'II', value: 900 },
			{ name: 'JJ', value: 100 },
			{ name: 'KK', value: 900 },
		],
	},
	{
		name: 'D',
		children: [
			{ name: 'KH', value: 2000 },
			{ name: 'LL', value: 400 },
			{ name: 'MM', value: 500 },
			{ name: 'ST', value: 300 },
		],
	},
];

export const circlePackThreeLevelNoZoomOptions = {
	title: 'Three Levels Hierarchy (No Zoom)',
	circlePack: {
		hierarchyLevel: 3,
	},
	canvasZoom: {
		enabled: false,
	},
};
