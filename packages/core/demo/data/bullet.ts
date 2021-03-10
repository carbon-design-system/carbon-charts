export const basicBulletData = [
	{
		title: 'Item A',
		group: 'D1',
		ranges: [800, 1000, 1400],
		marker: 1275,
		value: 250,
	},
	{
		title: 'Item B',
		group: 'D1',
		ranges: [300, 895, 1600],
		marker: 1455,
		value: 1000,
	},
	{
		title: 'Item C',
		group: 'D3',
		ranges: [350, 500, 1000],
		marker: 1275,
		value: 550,
	},
	{
		title: 'Item D',
		group: 'D2',
		ranges: [750, 1200, null],
		marker: 1725,
		value: 2100,
	},
	{
		title: 'Item E',
		group: 'D3',
		ranges: [350, 650, 980],
		marker: 1575,
		value: 400,
	},
];

export const basicBulletOptions = {
	title: 'Basic bullet',
	axes: {
		bottom: {
			mapsTo: 'value',
		},
		left: {
			scaleType: 'labels',
			mapsTo: 'title',
		},
		right: {
			scaleType: 'labels',
			mapsTo: 'title',
		},
	},
};
