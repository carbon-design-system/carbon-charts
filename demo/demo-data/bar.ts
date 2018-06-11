import { colors } from "./colors";

const generateRandomRatio = (num) => Math.max(0.2 * num, Math.random() * num);

export const barOptions = {
	xDomain: "Part number",
	yDomain: ["Sold", "More", "Qty"],
	yTicks: 5,
	legendClickable: true,
	containerResizable: true,
	colors
};

export const barData = [];
for (let i = 1; i < 7; i++) {
	barData.push({
		"Part number": `773C-${ i * 2 }-L6EP-L22I-${ i * 8 }-L22I`,
		"Qty": i * generateRandomRatio(30),
		"More": i * generateRandomRatio(40),
		"Sold": i * generateRandomRatio(50)
	});
}
