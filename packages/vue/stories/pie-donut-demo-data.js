import { colors } from '../helpers/commons';

// basic donut/pie
export const basicPieData = {
	labels: [
		'2V2N-9KYPM version 1',
		'L22I-P66EP-L22I-P66EP-L22I-P66EP',
		'JQAI-2M4L1',
		'J9DZ-F37AP',
		'YEL48-Q6XK-YEL48',
		'P66EP-L22I-L22I',
		'Q6XK-YEL48',
		'XKB5-L6EP',
		'YEL48-Q6XK',
		'L22I-P66EP-L22I',
	],
	datasets: [
		{
			label: 'Dataset 1',
			backgroundColors: colors,
			data: [
				100000,
				200000,
				600000,
				100000,
				400000,
				450000,
				300000,
				70000,
				20000,
				120000,
			],
		},
	],
};

// basic donut options
export const basicDonutOptions = {
	legendClickable: true,
	containerResizable: true,
	colors,
	center: {
		number: 25423,
		label: 'Browsers',
	},
};

// basic pie options
export const basicPieOptions = {
	accessibility: false,
	legendClickable: true,
	containerResizable: true,
	colors,
};
