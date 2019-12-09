import { getIconString } from "./utils";
import settings from "carbon-components/src/globals/js/settings";
import classnames from "classnames";

const { prefix } = settings;

const NetworkCard = ({
	svg,
	selector,
	data,
	accessor,
	height,
	width,
}) => {
	const cards = svg.selectAll(selector)
			.data(data, accessor);

	const cardGroup = cards
			.enter()
			.append("g")
			.attr("class", (d) => classnames(`${prefix}--graph-card`, {
				[`${prefix}--graph-card--${d.kind}`]: d.kind
			}))
			.attr("transform", d => `translate(${d.x},${d.y})`);

	const cardBackground = cardGroup
			.append("rect")
			.attr("height", height)
			.attr("width", width)
			.attr("focusable", true)
			.attr("tabindex", 0)
			.attr("class", `${prefix}--graph-card__background`)
			.on("click", (d) => d.onClick && d.onClick());

	const textGroup = cardGroup
			.append("g")
			.attr("class", `${prefix}--graph-card__content`);

	const heading = textGroup
			.append("text")
			.attr("class", `${prefix}--graph-card__heading`)
			.text("Heading");

	const subHeading = textGroup
			.append("text")
			.attr("class", `${prefix}--graph-card__subheading`)
			.text("Subheading");

	const cardStroke = cardGroup
			.append("rect")
			.attr("height", height)
			.attr("width", 4)
			.attr("class", `${prefix}--graph-card__stroke`);

	const cardIcon = cardGroup
			.append("g")
			.attr("class", `${prefix}--graph-card__icon-path`)
			.html(d => d.icon && getIconString(d.icon));

	return cardGroup;
};

export default NetworkCard;
