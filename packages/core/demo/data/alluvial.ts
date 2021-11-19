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

export const alluvialSimpleCustomColorOptions = {
	...alluvialSimpleOptions,
	title: 'Custom colors (alluvial)',
	color: {
		scale: {
			A: '#d12771',
			B: '#08bdba',
			C: '#6fdc8c',
		},
	},
};

export const alluvialGradientData = [
	{
		source: 'About Modal',
		target: 'Data & AI, AI Apps',
		value: 5,
	},
	{
		source: 'About Modal',
		target: 'Data & AI, Info Architecture',
		value: 4,
	},
	{
		source: 'About Modal',
		target: 'Public Cloud',
		value: 0,
	},
	{
		source: 'About Modal',
		target: 'Security',
		value: 4,
	},
	{
		source: 'About Modal',
		target: 'Automation',
		value: 8,
	},
	{
		source: 'Cards',
		target: 'Data & AI, AI Apps',
		value: 6,
	},
	{
		source: 'Cards',
		target: 'Data & AI, Info Architecture',
		value: 15,
	},
	{
		source: 'Cards',
		target: 'Public Cloud',
		value: 1,
	},
	{
		source: 'Cards',
		target: 'Security',
		value: 10,
	},
	{
		source: 'Cards',
		target: 'Automation',
		value: 17,
	},
	{
		source: 'Create Flow',
		target: 'Data & AI, AI Apps',
		value: 2,
	},
	{
		source: 'Create Flow',
		target: 'Data & AI, Info Architecture',
		value: 15,
	},
	{
		source: 'Create Flow',
		target: 'Public Cloud',
		value: 1,
	},
	{
		source: 'Create Flow',
		target: 'Security',
		value: 6,
	},
	{
		source: 'Create Flow',
		target: 'Automation',
		value: 27,
	},
	{
		source: 'Notifications',
		target: 'Data & AI, AI Apps',
		value: 1,
	},
	{
		source: 'Notifications',
		target: 'Data & AI, Info Architecture',
		value: 14,
	},
	{
		source: 'Notifications',
		target: 'Public Cloud',
		value: 0,
	},
	{
		source: 'Notifications',
		target: 'Security',
		value: 3,
	},
	{
		source: 'Notifications',
		target: 'Automation',
		value: 6,
	},
	{
		source: 'Page Header',
		target: 'Data & AI, AI Apps',
		value: 4,
	},
	{
		source: 'Page Header',
		target: 'Data & AI, Info Architecture',
		value: 15,
	},
	{
		source: 'Page Header',
		target: 'Public Cloud',
		value: 1,
	},
	{
		source: 'Page Header',
		target: 'Security',
		value: 11,
	},
	{
		source: 'Page Header',
		target: 'Automation',
		value: 25,
	},
	{
		source: 'Side Panels',
		target: 'Data & AI, AI Apps',
		value: 3,
	},
	{
		source: 'Side Panels',
		target: 'Data & AI, Info Architecture',
		value: 16,
	},
	{
		source: 'Side Panels',
		target: 'Public Cloud',
		value: 1,
	},
	{
		source: 'Side Panels',
		target: 'Security',
		value: 10,
	},
	{
		source: 'Side Panels',
		target: 'Automation',
		value: 22,
	},
	{
		source: 'Status Icons',
		target: 'Data & AI, AI Apps',
		value: 5,
	},
	{
		source: 'Status Icons',
		target: 'Data & AI, Info Architecture',
		value: 16,
	},
	{
		source: 'Status Icons',
		target: 'Public Cloud',
		value: 1,
	},
	{
		source: 'Status Icons',
		target: 'Security',
		value: 11,
	},
	{
		source: 'Status Icons',
		target: 'Automation',
		value: 25,
	},
	{
		source: 'Remove',
		target: 'Data & AI, AI Apps',
		value: 7,
	},
	{
		source: 'Remove',
		target: 'Data & AI, Info Architecture',
		value: 17,
	},
	{
		source: 'Remove',
		target: 'Public Cloud',
		value: 1,
	},
	{
		source: 'Remove',
		target: 'Security',
		value: 10,
	},
	{
		source: 'Remove',
		target: 'Automation',
		value: 28,
	},
	{
		source: 'User Profile Images',
		target: 'Data & AI, AI Apps',
		value: 4,
	},
	{
		source: 'User Profile Images',
		target: 'Data & AI, Info Architecture',
		value: 8,
	},
	{
		source: 'User Profile Images',
		target: 'Public Cloud',
		value: 1,
	},
	{
		source: 'User Profile Images',
		target: 'Security',
		value: 4,
	},
	{
		source: 'User Profile Images',
		target: 'Automation',
		value: 8,
	},
	{
		source: 'HTTP Errors',
		target: 'Data & AI, AI Apps',
		value: 8,
	},
	{
		source: 'HTTP Errors',
		target: 'Data & AI, Info Architecture',
		value: 12,
	},
	{
		source: 'HTTP Errors',
		target: 'Public Cloud',
		value: 1,
	},
	{
		source: 'HTTP Errors',
		target: 'Security',
		value: 11,
	},
	{
		source: 'HTTP Errors',
		target: 'Automation',
		value: 22,
	},
	{
		source: 'Empty State',
		target: 'Data & AI, AI Apps',
		value: 11,
	},
	{
		source: 'Empty State',
		target: 'Data & AI, Info Architecture',
		value: 18,
	},
	{
		source: 'Empty State',
		target: 'Public Cloud',
		value: 1,
	},
	{
		source: 'Empty State',
		target: 'Security',
		value: 11,
	},
	{
		source: 'Empty State',
		target: 'Automation',
		value: 20,
	},
];

export const alluvialSimpleGradientOptions = {
	title: 'Alluvial (gradient)',
	alluvial: {
		nodes: [
			{
				name: 'About Modal',
				category: 'Pattern',
			},
			{
				name: 'Cards',
				category: 'Pattern',
			},
			{
				name: 'Create Flow',
				category: 'Pattern',
			},
			{
				name: 'Empty State',
				category: 'Pattern',
			},
			{
				name: 'Page Header',
				category: 'Pattern',
			},
			{
				name: 'HTTP Errors',
				category: 'Pattern',
			},
			{
				name: 'User Profile Images',
				category: 'Pattern',
			},
			{
				name: 'Remove',
				category: 'Pattern',
			},
			{
				name: 'Status Icons',
				category: 'Pattern',
			},
			{
				name: 'Side Panels',
				category: 'Pattern',
			},
			{
				name: 'Notifications',
				category: 'Pattern',
			},
			{
				name: 'Data & AI, AI Apps',
				category: 'Group',
			},
			{
				name: 'Data & AI, Info Architecture',
				category: 'Group',
			},
			{
				name: 'Public Cloud',
				category: 'Group',
			},
			{
				name: 'Security',
				category: 'Group',
			},
			{
				name: 'Automation',
				category: 'Group',
			},
		],
	},
	color: {
		scale: {
			'Empty State': '#001d6c',
			Cards: '#da1e28',
			'About Modal': '#b28600',
			'Create Flow': '#198038',
			'HTTP Errors': '#6929c4',
			'Page Header': '#ee538b',
			'User Profile Images': '#33b1ff',
			Remove: '#f1f1f1',
			'Status Icons': '#e0e0e0',
			Notifications: '#08bdba',
			'Side Panels': '#570408',
			'Data &amp; AI, AI Apps': '#1192e8',
			'Data &amp; AI, Info Architecture': '#a56eff',
			Security: '#009d9a',
			Automation: '#fa4d56',
			'Public Cloud': '#198038',
		},
		gradient: {
			enabled: true,
		},
	},
	height: '600px',
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
