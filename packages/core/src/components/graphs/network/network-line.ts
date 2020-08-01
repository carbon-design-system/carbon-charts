import settings from "carbon-components/src/globals/js/settings";
import classnames from "classnames";
import { buildPathString } from "./utils";
import { Component } from "../../component";

// Marker icons
import ChevronRight from "@carbon/icons/es/chevron--right/16";
import ChevronLeft from "@carbon/icons/es/chevron--left/16";
import { buildIconString } from "./utils";

const { prefix } = settings;

export class NetworkLine extends Component {
	render() {
		const {
			container,
			selector,
			nodeHeight,
			nodeWidth,
			data
		} = this.configs;

		const buildMarkerDefs = () => data.reduce((unique, link) => {
			const { kind, multiDirectional, directional } = link;

			const markerClasses = classnames(`${prefix}--network-link__marker`, {
				[`${prefix}--network-link__marker--${kind}`]: kind
			});

			if (directional || multiDirectional) {
				const endMarkerID = `arrow${kind ? `-${kind}` : ``}-end`;
				unique[endMarkerID] = { id: endMarkerID, end: true, markerClasses };
			}
			if (multiDirectional) {
				const startMarkerId = `arrow${kind ? `-${kind}` : ``}-start`;
				unique[startMarkerId] = { id: startMarkerId, end: false, markerClasses };
			}

			return unique;
		}, {});

		const markerData = buildMarkerDefs();

		const markers = container.append("svg:defs")
			.selectAll("marker")
			.data(Object.keys(markerData).map(key => markerData[key]))
			.enter()
				.append("svg:marker")
				.attr("id", ({id}) => id)
				.attr("class", ({markerClasses}) => markerClasses)
				.attr("markerHeight", 16)
				.attr("markerWidth", 16)
				.attr("orient", "auto")
				.attr("refX", ({end}) => end ? 10 : 6)
				.attr("refY", 8)
					.html(({end}) => buildIconString(end ? ChevronRight : ChevronLeft));

		const lines = container.selectAll(selector)
			.data(data)
			.enter()
				.append("path")
				.attr("class", ({kind}) => classnames(`${prefix}--network-link__line`, {
					[`${prefix}--network-link__line--${kind}`]: kind
				}))
				.attr("marker-start", ({kind, multiDirectional}) => multiDirectional && `url(#arrow${kind ? `-${kind}` : ``}-start)` )
				.attr("marker-end", ({kind, directional, multiDirectional}) =>
					(directional || multiDirectional) && `url(#arrow${kind ? `-${kind}` : ``}-end)` )
				.attr("d", ({source, target}) => buildPathString(source, target, nodeHeight, nodeWidth))
				.style("stroke-dasharray", ({dash}) => dash);

	}
}
