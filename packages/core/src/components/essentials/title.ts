// Internal Imports
import { Component } from "../component";

export class Title extends Component {
	type = "title";

	render() {
		const svg = this.getContainerSVG();

		const text = this._services.domUtils.appendOrSelect(svg, "text.title");
		text.attr("x", 0)
			.attr("y", 20)
			.style("font-size", "18px")
			.style("font-weight", 700)
			.text(this._model.getOptions().title || "Scatter Chart");

		// TODO - Replace with layout component margins
		this._services.domUtils.appendOrSelect(svg, "rect.spacer")
			.attr("x", 0)
			.attr("y", 20)
			.attr("width", "100%")
			.attr("height", 15)
			.attr("fill", "none");
	}
}
