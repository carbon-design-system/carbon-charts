const NetworkLines = ({
	svg,
	data,
	accessor,
	selector,
	strokeColor
}) => {
	const lines = svg.selectAll(selector)
		.data(data, accessor)
		.enter()
		.append("line")
		.classed("line", true)
		.attr("x1", d => d.source.x)
		.attr("y1", d => d.source.y)
		.attr("x2", d => d.target.x)
		.attr("y2", d => d.target.y)
		.attr("stroke", strokeColor);
	return lines;
};

export default NetworkLines;
