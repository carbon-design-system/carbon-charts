export { colors } from "../../../../../demo/demo-data/colors";

// Function to be used to randomize a value
export const randomizeValue = currentVal => {
	const firstTry = Math.max(0.5 * currentVal, currentVal * Math.random() * (Math.random() * 5));
	const result = Math.min(2 * currentVal, firstTry);

	return Math.floor(result);
};
