import settings from "carbon-components/src/globals/js/settings";

const { prefix } = settings;

const NetworkLine = ({
	svg,
	data,
	accessor,
	selector
}) => {
	const lines = svg.selectAll(selector)
		.data(data, accessor)
		.enter()
		.append("line")
		.attr("class", `${prefix}--graph-link__line`)
		.classed("line", true)
		.attr("x1", d => d.source.x)
		.attr("y1", d => d.source.y)
		.attr("x2", d => d.target.x)
		.attr("y2", d => d.target.y);
	return lines;
};

export default NetworkLine;
