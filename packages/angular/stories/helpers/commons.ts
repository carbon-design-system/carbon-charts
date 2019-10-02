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
	"#8a3ffc",
	"#1191e6",
	"#006161",
	"#a11950",
	"#fb4b53",
	"#570408",
	"#198038",
	"#003d73",
	"#ee538b",
	"#b28600",
	"#009c98",
	"#002b50",
	"#8a3800",
	"#a66efa"
];
