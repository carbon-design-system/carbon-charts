// Internal Imports
import { Component } from "../component";

export class Network extends Component {
	type = "network";

	render(animate: boolean) {
		const svg = this.getContainerSVG();

		const texts = svg.selectAll("text.dataset")
			.data(this.model.getDisplayData().datasets, dataset => dataset.label);

		texts.exit()
			.attr("opacity", 0)
			.remove();

		const enteringTexts = texts.enter()
			.append("text")
			.classed("dataset", true)
			.attr("opacity", 0);

		enteringTexts.merge(texts)
			.text(d => d.label)
			.transition(this.services.transitions.getTransition("network-text-update-enter", animate))
			.attr("y", (d, i) => 16 + i * 20)
			.attr("opacity", 1)
			.style("fill", d => this.model.getFillScale()[d.label]());
	}
}
