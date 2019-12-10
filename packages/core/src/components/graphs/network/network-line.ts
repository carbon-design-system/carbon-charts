import settings from "carbon-components/src/globals/js/settings";
import { buildPathString } from "./utils";
import classnames from "classnames";

const { prefix } = settings;

const NetworkLine = ({
	svg,
	data,
	accessor,
	selector,
	nodeHeight,
	nodeWidth
}) => {
	const { dash } = data;
	const lines = svg.selectAll(selector)
		.data(data, accessor)
		.enter()
		.append("path")
		.attr("class", (d) => classnames(`${prefix}--network-link__line`, {
			[`${prefix}--network-link__line--${d.kind}`]: d.kind
		}))
		.style("stroke-dasharray", d => (d.dash))
		.classed("line", true)
		.attr("d", d => buildPathString(d.source, d.target, nodeHeight, nodeWidth));
	return lines;
};

export default NetworkLine;
