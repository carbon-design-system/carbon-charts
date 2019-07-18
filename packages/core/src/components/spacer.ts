// Internal Imports
import * as Configuration from "../configuration";

import { ChartComponent } from "./base-component";

export class Spacer extends ChartComponent {
	type = "spacer";

	_renderCallback: Function;

	setRenderCallback(cb: Function) {
		this._renderCallback = cb;
	}

	render() {
		const svg = this._parent;
		svg.append("text")
			.attr("x", 0)
			.attr("y", 20)
			.attr("font-size", 20)
			.text("Bar Chart");
	}
}
