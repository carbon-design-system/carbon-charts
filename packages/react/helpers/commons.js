// Function to be used to randomize a value
export const randomizeValue = currentVal => {
	const firstTry = Math.max(0.5 * currentVal, currentVal * Math.random() * (Math.random() * 5));
	const result = currentVal > 0 ? Math.min(2 * currentVal, firstTry) : Math.max(2 * currentVal, firstTry);

	return Math.floor(result);
};

export const colors = [
	"#00a68f",
	"#3b1a40",
	"#473793",
	"#3c6df0",
	"#56D2BB"
];
