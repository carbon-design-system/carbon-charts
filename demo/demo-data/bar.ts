import { colors } from "./colors";

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
		"Qty": i * (Math.random() * 10),
		"More": i * (Math.random() * 20),
		"Sold": i * (Math.random() * 5)
	});
}
