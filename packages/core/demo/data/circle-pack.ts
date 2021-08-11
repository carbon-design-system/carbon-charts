export const circlePackTwoLevelData = [
	{
		name: 'North America',
		children: [
			{ name: 'Canada', value: 800 },
			{ name: 'United States', value: 200 },
			{ name: 'Mexico', value: 100 },
		],
	},
	{
		name: 'South America',
		children: [
			{ name: 'Brazil', value: 2800 },
			{ name: 'Argentina', value: 10000 },
			{ name: 'G', value: 500 },
			{ name: 'DE', value: 500 },
			{ name: 'EF', value: 200 },
		],
	},
	{
		name: 'Asia',
		children: [
			{ name: 'China', value: 500 },
			{ name: 'Thailand', value: 100 },
			{ name: 'Cambodia', value: 500 },
			{ name: 'India', value: 500 },
			{ name: 'Vietnam', value: 400 },
			{ name: 'North Korea', value: 600 },
			{ name: 'Japan', value: 200 },
			{ name: 'Indonesia', value: 800 },
		],
	},
	{
		name: 'Europe',
		children: [
			{ name: 'France', value: 2000 },
			{ name: 'Italy', value: 400 },
			{ name: 'Greece', value: 500 },
			{ name: 'Portugal', value: 100 },
			{ name: 'Austria', value: 1000 },
			{ name: 'Ireland', value: 800 },
			{ name: 'Germany', value: 700 },
			{ name: 'Poland', value: 200 },
			{ name: 'Ukraine', value: 300 },
		],
	},
];

export const circlePackTwoLevelOptions = {
	experimental: 'true',
	title: 'Two Levels Hierarchy',
	canvasZoom: {
		enabled: true,
	},
};

export const circlePackTwoLevelCustomColorsOptions = {
	experimental: 'true',
	title: 'Custom colors (circle pack)',
	canvasZoom: {
		enabled: true,
	},
	color: {
		scale: {
			Asia: 'green',
			'South America': 'blue',
			'North America': 'orange',
			Europe: 'red',
		},
	},
};

export const circlePackSingleOptions = {
	experimental: 'true',
	title: 'One Level Hierachy',
	canvasZoom: {
		enabled: true,
	},
};

export const circlePackSingleLevelData = [
	{
		name: 'Transportation',
		value: 300,
	},
	{
		name: 'Healthcare',
		value: 600,
	},
	{
		name: 'Hospitality',
		value: 50,
	},
	{
		name: 'Tourism',
		value: 90,
	},
	{
		name: 'Food',
		value: 280,
	},
];

export const circlePackThreeLevelOptions = {
	experimental: 'true',
	title: 'Three Levels Hierarchy',
	canvasZoom: {
		enabled: true,
	},
};

export const circlePackThreeLevelData = [
	{
		name: 'North America',
		children: [
			{
				name: 'Canada',
				children: [
					{ name: 'Toronto', value: 50 },
					{ name: 'Montreal', value: 100 },
				],
			},
			{
				name: 'United States',
				children: [
					{ name: 'Texas', value: 50 },
					{ name: 'New York', value: 40 },
				],
			},
			{ name: 'Mexico', value: 100 },
		],
	},
	{
		name: 'South America',
		children: [
			{ name: 'Brazil', value: 2800 },
			{ name: 'Argentina', value: 10000 },
			{ name: 'Peru', value: 500 },
		],
	},
	{
		name: 'Africa',
		children: [
			{ name: 'Egypt', value: 50 },
			{ name: 'Morocco', value: 10 },
			{ name: 'Chad', value: 200 },
			{ name: 'Nigeria', value: 80 },
			{ name: 'Libya', value: 90 },
		],
	},
	{
		name: 'Europe',
		children: [
			{ name: 'Portugal', value: 2000 },
			{ name: 'Spain', value: 400 },
			{ name: 'France', value: 500 },
			{ name: 'Italy', value: 300 },
			{ name: 'Poland', value: 100 },
			{ name: 'Ukraine', value: 900 },
		],
	},
];

export const circlePackThreeLevelsMonochromeOptions = {
	experimental: 'true',
	title: 'Three Levels Hierarchy (monchromatic)',
	canvasZoom: {
		enabled: true,
	},
};

export const circlePackThreeLevelsMonochromeData = [
	{
		name: 'Revenue',
		children: [
			{
				name: 'North America',
				children: [
					{
						name: 'Canada',
						children: [
							{ name: 'Toronto', value: 5000 },
							{ name: 'Montreal', value: 1000 },
						],
					},
					{
						name: 'United States',
						children: [
							{ name: 'Texas', value: 500 },
							{ name: 'New York', value: 400 },
						],
					},
					{ name: 'Mexico', value: 100 },
				],
			},
			{
				name: 'South America',
				children: [
					{ name: 'Brazil', value: 280 },
					{ name: 'Argentina', value: 700 },
					{ name: 'Peru', value: 500 },
				],
			},
			{
				name: 'Africa',
				children: [
					{ name: 'Egypt', value: 50 },
					{ name: 'Morocco', value: 10 },
					{ name: 'Chad', value: 200 },
					{ name: 'Nigeria', value: 80 },
					{ name: 'Libya', value: 90 },
				],
			},
			{
				name: 'Europe',
				children: [
					{ name: 'Portugal', value: 2000 },
					{ name: 'Spain', value: 400 },
					{ name: 'France', value: 500 },
					{ name: 'Italy', value: 300 },
					{ name: 'Poland', value: 100 },
					{ name: 'Ukraine', value: 900 },
				],
			},
		],
	},
];

export const circlePackThreeLevelNoZoomOptions = {
	experimental: 'true',
	title: 'Three Levels Hierarchy (No Zoom)',
	circlePack: {
		hierarchyLevel: 3,
	},
	canvasZoom: {
		enabled: false,
	},
};
