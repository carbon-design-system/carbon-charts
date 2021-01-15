export const lollipopDiscreteData = [
	{ group: 'Dataset 1', key: 'Qty', value: 34200 },
	{ group: 'Dataset 2', key: 'More', value: 34200 },
	{ group: 'Dataset 3', key: 'Sold', value: 41200 },
	{ group: 'Dataset 4', key: 'Restocking', value: 22000 },
];

export const lollipopDiscreteOptions = {
	title: 'Lollipop (discrete)',
	axes: {
		bottom: {
			title: '2019 Annual Sales Figures',
			scaleType: 'labels',
			mapsTo: 'key',
		},
		left: {
			mapsTo: 'value',
		},
	},
};

export const lollipopDiscretePresentationData = lollipopDiscreteData;

export const lollipopDiscretePresentationOptions = {
	title: 'Lollipop (horizontal) - presentation',
	axes: {
		left: {
			title: '2019 Annual Sales Figures',
			scaleType: 'labels',
			mapsTo: 'key',
		},
		bottom: {
			mapsTo: 'value',
		},
	},
	points: {
		radius: 7,
	},
};
