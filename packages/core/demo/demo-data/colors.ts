export const colors = window["isExperimental"] ?
	[
		// purple
		"#38146b", "#4f2196", "#6e32c9", "#8a3ffc", "#a980ff", "#bb8eff", "#d0b0ff",
		// magenta
		"#57002b", "#760a3a", "#a11950", "#d12765", "#ee538b", "#fa75a6", "#ffa0c2",
		// cyan
		"#002b50", "#003d73", "#0058a1", "#0072c3", "#1193e8", "#30b0ff", "#6ccaff",
		// teal
		"#03137", "#004548", "#006161", "#007d79", "#009e9a", "#00bab6", "#20d5d2"
		// sort the colors to keep it interesting
	].sort((a, b) => parseInt(a.replace("#", ""), 8) - parseInt(b.replace("#", ""), 8)) :
	[
		"#00a68f",
		"#3b1a40",
		"#473793",
		"#3c6df0",
		"#56D2BB"
	];
