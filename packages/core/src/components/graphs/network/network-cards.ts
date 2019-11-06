import { getIconString } from "./utils";

const NetworkCards = ({
	svg,
	selector,
	data,
	accessor,
	height,
	width,
	fill,
	strokeColor
}) => {
	const cards = svg.selectAll(selector)
			.data(data, accessor);

	const cardGroup = cards
			.enter()
			.append("g")
			.attr("transform", d => `translate(${d.x},${d.y})`);

	const cardBackground = cardGroup
			.append("rect")
			.attr("height", height)
			.attr("width", width)
			.attr("focusable", true)
			.attr("fill", fill)
			.attr("tabindex", 0)
			.attr("stroke-width", "1px")
			.attr("stroke", strokeColor);

	const cardText = cardGroup
			.append("text");

	const cardIcon = cardGroup
			.append("g")
			.html(d => d.icon && getIconString(d.icon));

	return cardGroup;
};

export default NetworkCards;
