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
			.attr("class", ({kind}) => classnames(`${prefix}--network-card`, {
				[`${prefix}--network-card--${kind}`]: kind
			}))
			.attr("transform", ({x, y}) => `translate(${x},${y})`);

	const cardBackground = cardGroup
			.append("rect")
			.attr("height", height)
			.attr("width", width)
			.attr("focusable", true)
			.attr("tabindex", 0)
			.attr("class", `${prefix}--network-card__background`)
			.on("click", ({onClick}) => onClick && onClick());

	const textGroup = cardGroup
			.append("g")
			.attr("class", `${prefix}--network-card__content`);

	const heading = textGroup
			.append("text")
			.attr("class", `${prefix}--network-card__heading`)
			.text("Heading");

	const subHeading = textGroup
			.append("text")
			.attr("class", `${prefix}--network-card__subheading`)
			.text("Subheading");

	const cardStroke = cardGroup
			.append("rect")
			.attr("height", height)
			.attr("width", 4)
			.attr("class", `${prefix}--network-card__stroke`);

	const cardIcon = cardGroup
			.append("g")
			.attr("class", `${prefix}--network-card__icon-path`)
			.html(({icon}) => icon && getIconString(icon));

	return cardGroup;
};

export default NetworkCard;
