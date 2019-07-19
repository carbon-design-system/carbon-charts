// Internal Imports
import { Component } from "../component";

export class Title extends Component {
	render() {
		const svg = this._parent;
		svg.append("text")
			.attr("x", 0)
			.attr("y", 20)
			.style("font-size", "18px")
			.style("font-weight", 700)
			.text("Scatter Chart");
	}
}
