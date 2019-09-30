// Function to be used to randomize a value
export const randomizeValue = currentVal => {
	const firstTry = Math.max(0.5 * currentVal, currentVal * Math.random() * (Math.random() * 5));
	const result = currentVal > 0 ? Math.min(2 * currentVal, firstTry) : Math.max(2 * currentVal, firstTry);

	return Math.floor(result);
};

export const colors = [
	"#8a3ffc",
	"#20d5d2",
	"#ee538b",
	"#30b0ff",
	"#760a3a",
	"#d0b0ff",
	"#003d73"
];
