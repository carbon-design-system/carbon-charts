// Internal Imports
import * as Configuration from "../configuration";

import { ChartComponent } from "./base-component";

export class Title extends ChartComponent {
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
