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
	}
}
