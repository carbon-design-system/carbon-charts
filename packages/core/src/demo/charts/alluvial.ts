import { Alignments } from '@/interfaces'

export const alluvialSimpleData = [
	{
		source: 'About Modal',
		target: 'Data and AI, AI Apps',
		value: 5
	},
	{
		source: 'About Modal',
		target: 'Data and AI, Info Architecture',
		value: 4
	},
	{
		source: 'About Modal',
		target: 'Public Cloud',
		value: 3
	},
	{
		source: 'About Modal',
		target: 'Security',
		value: 4
	},
	{
		source: 'About Modal',
		target: 'Automation',
		value: 8
	},
	{
		source: 'Cards',
		target: 'Data and AI, AI Apps',
		value: 6
	},
	{
		source: 'Cards',
		target: 'Data and AI, Info Architecture',
		value: 15
	},
	{
		source: 'Cards',
		target: 'Public Cloud',
		value: 2
	},
	{
		source: 'Cards',
		target: 'Security',
		value: 10
	},
	{
		source: 'Cards',
		target: 'Automation',
		value: 13
	},
	{
		source: 'Create Flow',
		target: 'Data and AI, AI Apps',
		value: 2
	},
	{
		source: 'Create Flow',
		target: 'Data and AI, Info Architecture',
		value: 15
	},
	{
		source: 'Create Flow',
		target: 'Public Cloud',
		value: 1
	},
	{
		source: 'Create Flow',
		target: 'Security',
		value: 6
	},
	{
		source: 'Create Flow',
		target: 'Automation',
		value: 15
	},
	{
		source: 'Notifications',
		target: 'Data and AI, Info Architecture',
		value: 14
	},
	{
		source: 'Notifications',
		target: 'Public Cloud',
		value: 3
	},
	{
		source: 'Notifications',
		target: 'Security',
		value: 3
	},
	{
		source: 'Page Header',
		target: 'Data and AI, AI Apps',
		value: 4
	},
	{
		source: 'Page Header',
		target: 'Data and AI, Info Architecture',
		value: 8
	},
	{
		source: 'Page Header',
		target: 'Automation',
		value: 13
	}
]

export const alluvialSimpleOptions = {
	title: 'Alluvial',
	alluvial: {
		nodes: [
			{
				name: 'About Modal',
				category: 'Pattern'
			},
			{
				name: 'Cards',
				category: 'Pattern'
			},
			{
				name: 'Create Flow',
				category: 'Pattern'
			},
			{
				name: 'Page Header',
				category: 'Pattern'
			},
			{
				name: 'Notifications',
				category: 'Pattern'
			},
			{
				name: 'Data and AI, AI Apps',
				category: 'Group'
			},
			{
				name: 'Data and AI, Info Architecture',
				category: 'Group'
			},
			{
				name: 'Public Cloud',
				category: 'Group'
			},
			{
				name: 'Security',
				category: 'Group'
			},
			{
				name: 'Automation',
				category: 'Group'
			}
		]
	},
	height: '600px'
}

export const alluvialSimpleCustomColorOptions = {
	...alluvialSimpleOptions,
	title: 'Custom colors (alluvial)',
	color: {
		scale: {
			A: '#d12771',
			B: '#08bdba',
			C: '#6fdc8c'
		}
	}
}

export const alluvialGradientData = alluvialSimpleData

export const alluvialSimpleGradientOptions = {
	...alluvialSimpleOptions,
	title: 'Alluvial (gradient)',
	color: {
		scale: {
			Cards: '#da1e28',
			'About Modal': '#b28600',
			'Create Flow': '#198038',
			'Page Header': '#ee538b',
			Notifications: '#08bdba',
			'Data and AI, AI Apps': '#1192e8',
			'Data and AI, Info Architecture': '#a56eff',
			Security: '#009d9a',
			Automation: '#fa4d56',
			'Public Cloud': '#198038'
		},
		gradient: {
			enabled: true
		}
	}
}

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
			{ name: 'No', category: 'Survived' }
		]
	}
}

export const alluvialMultipleCategoryData = [
	{
		source: '1st',
		target: 'Female',
		value: 25
	},
	{
		source: '1st',
		target: 'Male',
		value: 35
	},
	{
		source: '2nd',
		target: 'Female',
		value: 35
	},
	{
		source: '2nd',
		target: 'Male',
		value: 50
	},
	{
		source: 'Crew',
		target: 'Male',
		value: 43
	},
	{
		source: 'Crew',
		target: 'Female',
		value: 18
	},
	{
		source: 'Male',
		target: 'Child',
		value: 38
	},
	{
		source: 'Male',
		target: 'Adult',
		value: 90
	},
	{
		source: 'Female',
		target: 'Adult',
		value: 52
	},
	{
		source: 'Female',
		target: 'Child',
		value: 26
	},
	{
		source: 'Child',
		target: 'Yes',
		value: 58
	},
	{
		source: 'Child',
		target: 'No',
		value: 6
	},
	{
		source: 'Adult',
		target: 'Yes',
		value: 22
	},
	{
		source: 'Adult',
		target: 'No',
		value: 120
	}
]

export const alluvialNodeAlignmentData = [
	{ source: 'A', target: 'X', value: 3 },
	{ source: 'A', target: 'Y', value: 7 },
	{ source: 'B', target: 'X', value: 8 },
	{ source: 'B', target: 'Y', value: 3 },
	{ source: 'C', target: 'X', value: 5 },
	{ source: 'Y', target: 'Z', value: 13 }
]

export const alluvialNodeAlignmentOptions = {
	title: 'Alluvial node alignment',
	alluvial: {
		nodes: [
			{ name: 'A', category: 'Start' },
			{ name: 'B', category: 'Start' },
			{ name: 'C', category: 'Start' },
			{ name: 'X', category: 'Middle' },
			{ name: 'Y', category: 'Middle' },
			{ name: 'Z', category: 'Finish' }
		],
		nodeAlignment: Alignments.LEFT
	}
}

export const alluvialMonochromeData = [
	{ source: 'A', target: 'X', value: 3 },
	{ source: 'A', target: 'Y', value: 5 },
	{ source: 'A', target: 'Z', value: 8 },
	{ source: 'B', target: 'X', value: 6 },
	{ source: 'B', target: 'Y', value: 1 },
	{ source: 'B', target: 'Z', value: 7 },
	{ source: 'C', target: 'X', value: 5 },
	{ source: 'C', target: 'Y', value: 5 },
	{ source: 'C', target: 'Z', value: 1 }
]

export const alluvialMonochromeOptions = {
	title: 'Alluvial (monochrome with custom node padding)',
	alluvial: {
		nodes: [
			{ name: 'A', category: 'Start' },
			{ name: 'B', category: 'Start' },
			{ name: 'C', category: 'Start' },
			{ name: 'X', category: 'Finish' },
			{ name: 'Y', category: 'Finish' },
			{ name: 'Z', category: 'Finish' }
		],
		monochrome: true,
		nodePadding: 33
	}
}
