// Function to be used to randomize a value
export const randomizeValue = (currentVal, negativeValueAllowed?) => {
	const firstTry = Math.max(0.5 * currentVal, currentVal * Math.random() * (Math.random() * 5));
	const result = currentVal > 0 ? Math.min(2 * currentVal, firstTry) : Math.max(2 * currentVal, firstTry);

	if (Math.random() > 0.5 || negativeValueAllowed === false) {
		return Math.floor(result);
	} else {
		return Math.floor(result) * -1;
	}
};

export const colors = [
	"#00a68f",
	"#3b1a40",
	"#473793",
	"#3c6df0",
	"#56D2BB"
	// 12 items needed
];
