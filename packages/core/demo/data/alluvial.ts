export const alluvialSimpleData = [
	{ source: 'A', target: 'X', value: 3 },
	{ source: 'A', target: 'Y', value: 5 },
	{ source: 'A', target: 'Z', value: 8 },
	{ source: 'B', target: 'X', value: 6 },
	{ source: 'B', target: 'Y', value: 1 },
	{ source: 'B', target: 'Z', value: 7 },
	{ source: 'C', target: 'X', value: 5 },
	{ source: 'C', target: 'Y', value: 5 },
	{ source: 'C', target: 'Z', value: 1 },
];

export const alluvialSimpleOptions = {
	title: 'Alluvial',
	alluvial: {
		units: 'GB',
		nodes: [
			{ name: 'A', category: 'Start' },
			{ name: 'B', category: 'Start' },
			{ name: 'C', category: 'Start' },
			{ name: 'X', category: 'Finish' },
			{ name: 'Y', category: 'Finish' },
			{ name: 'Z', category: 'Finish' },
		],
	},
};

export const alluvialMultipleCategoryOptions = {
	title: 'Alluvial (multiple categories)',
	alluvial: {
		nodes: [
			{ name: '1st', category: 'Class' },
			{ name: '2nd', category: 'Class' },
			{ name: 'Crew', category: 'Class' },
			{ name: 'Male', category: 'Sex' },
			{ name: 'Female', category: 'Sex' },
			{ name: 'Child', category: 'Age' },
			{ name: 'Adult', category: 'Age' },
			{ name: 'Yes', category: 'Survived' },
			{ name: 'No', category: 'Survived' },
		],
	},
};

export const alluvialMultipleCategoryData = [
	{
		source: '1st',
		target: 'Female',
		value: 25,
	},
	{
		source: '1st',
		target: 'Male',
		value: 35,
	},
	{
		source: '2nd',
		target: 'Female',
		value: 35,
	},
	{
		source: '2nd',
		target: 'Male',
		value: 50,
	},
	{
		source: 'Crew',
		target: 'Male',
		value: 43,
	},
	{
		source: 'Crew',
		target: 'Female',
		value: 18,
	},
	{
		source: 'Male',
		target: 'Child',
		value: 38,
	},
	{
		source: 'Male',
		target: 'Adult',
		value: 90,
	},
	{
		source: 'Female',
		target: 'Adult',
		value: 52,
	},
	{
		source: 'Female',
		target: 'Child',
		value: 26,
	},
	{
		source: 'Child',
		target: 'Yes',
		value: 58,
	},
	{
		source: 'Child',
		target: 'No',
		value: 6,
	},
	{
		source: 'Adult',
		target: 'Yes',
		value: 22,
	},
	{
		source: 'Adult',
		target: 'No',
		value: 120,
	},
];

export const alluvialMonochromeData = alluvialSimpleData;

export const alluvialMonochromeOptions = {
	title: 'Alluvial (monochrome with custom node padding)',
	alluvial: {
		nodes: [
			{ name: 'A', category: 'Start' },
			{ name: 'B', category: 'Start' },
			{ name: 'C', category: 'Start' },
			{ name: 'X', category: 'Finish' },
			{ name: 'Y', category: 'Finish' },
			{ name: 'Z', category: 'Finish' },
		],
		monochrome: true,
		nodePadding: 33,
	},
};
