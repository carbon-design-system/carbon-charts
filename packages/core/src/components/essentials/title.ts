// Internal Imports
import { Component } from "../component";
import { DOMUtils } from "../../services";

export class Title extends Component {
	type = "title";

	render() {
		const svg = this.getContainerSVG();

		const text = DOMUtils.appendOrSelect(svg, "text.title");
		text.attr("x", 0)
			.attr("y", 20)
			.text(this.model.getOptions().title);

		// TODO - Replace with layout component margins
		DOMUtils.appendOrSelect(svg, "rect.spacer")
			.attr("x", 0)
			.attr("y", 20)
			.attr("width", 20)
			.attr("height", 20)
			.attr("fill", "none");
	}
}
