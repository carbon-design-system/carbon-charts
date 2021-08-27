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
	title: 'Simple Alluvial',
	units: 'GB',
	nodes: [
		{ name: 'A', category: 'Start' },
		{ name: 'B', category: 'Start' },
		{ name: 'C', category: 'Start' },
		{ name: 'X', category: 'Finish' },
		{ name: 'Y', category: 'Finish' },
		{ name: 'Z', category: 'Finish' },
	],
};
