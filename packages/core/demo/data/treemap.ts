export const treemapData = [
	{
		name: "Oceania",
		children: [
			{ name: "A", value: 800, showLabel: false },
			{ name: "B", value: 200, showLabel: false },
			{ name: "C", value: 100, showLabel: false },
			{ name: "D", value: 900, showLabel: false }
		]
	},
	{
		name: "Europe",
		children: [
			{ name: "France", value: 2800 },
			{ name: "Germany", value: 10000 },
			{ name: "Sweden", value: 500, showLabel: false },
			{ name: "England", value: 500, showLabel: false },
			{ name: "Italy", value: 200, showLabel: false }
		]
	},
	{
		name: "America",
		children: [
			{ name: "U.S.", value: 3500 },
			{ name: "Brazil", value: 3000 },
			{ name: "Mexico", value: 2000 },
			{ name: "AA", value: 500, showLabel: false },
			{ name: "BB", value: 100, showLabel: false },
			{ name: "CC", value: 500, showLabel: false },
			{ name: "DD", value: 500, showLabel: false },
			{ name: "EE", value: 400, showLabel: false },
			{ name: "FF", value: 600, showLabel: false },
			{ name: "GG", value: 200, showLabel: false },
			{ name: "HH", value: 800, showLabel: false },
			{ name: "II", value: 900, showLabel: false },
			{ name: "JJ", value: 100, showLabel: false },
			{ name: "KK", value: 900, showLabel: false }
		]
	},
	{
		name: "Middle east",
		children: [
			{ name: "Iran", value: 2000 },
			{ name: "LL", value: 400, showLabel: false },
			{ name: "MM", value: 500, showLabel: false },
			{ name: "NN", value: 100, showLabel: false },
			{ name: "OO", value: 1000, showLabel: false },
			{ name: "PP", value: 800, showLabel: false },
			{ name: "QQ", value: 700, showLabel: false },
			{ name: "RR", value: 200, showLabel: false },
			{ name: "ST", value: 300, showLabel: false }
		]
	},
	{
		name: "Africa",
		children: [
			{ name: "Nigeria", value: 2300 },
			{ name: "TT", value: 2000, showLabel: false },
			{ name: "UU", value: 500, showLabel: false },
			{ name: "VV", value: 1200, showLabel: false },
			{ name: "WW", value: 2000, showLabel: false },
			{ name: "XX", value: 800, showLabel: false },
			{ name: "YY", value: 2000, showLabel: false },
			{ name: "ZZ", value: 500, showLabel: false },
			{ name: "ABC", value: 1200, showLabel: false },
			{ name: "CBA", value: 1500, showLabel: false }
		]
	},
	{
		name: "Asia",
		children: [
			{
				name: "China",
				value: 17500
			},
			{
				name: "India",
				value: 17500
			},
			{
				name: "Indonesia",
				value: 7500
			},
			{
				name: "Mianmar",
				value: 7500
			}
		]
	}
];

export const treemapOptions = {
	title: "Treemap"
	// legend: {
	// 	clickable: false
	// }
};
