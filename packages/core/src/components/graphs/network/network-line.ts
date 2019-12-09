import settings from "carbon-components/src/globals/js/settings";
import { buildPathString } from "./utils";

const { prefix } = settings;

const NetworkLine = ({
	svg,
	data,
	accessor,
	selector,
	nodeHeight,
	nodeWidth
}) => {
	const lines = svg.selectAll(selector)
		.data(data, accessor)
		.enter()
		.append("path")
		.attr("class", `${prefix}--graph-link__line`)
		.classed("line", true)
		.attr("d", d => buildPathString(d.source, d.target, nodeHeight, nodeWidth));
	return lines;
};

export default NetworkLine;
