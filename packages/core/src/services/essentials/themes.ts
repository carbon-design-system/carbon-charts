// Internal Imports
import { Service } from "../service";
import { ChartTheme } from "../../interfaces";

import { Tools } from "../../tools";
import { select } from "d3-selection";

export class Themes extends Service {
	init() {
		this.setTheme();
	}

	update() {
		this.setTheme();
	}

	setTheme() {
		const holderElement = this.services.domUtils.getHolder() as HTMLElement;
		const theme = Tools.getProperty(this.model.getOptions(), "theme");

		if (theme !== ChartTheme.DEFAULT) {
			select(holderElement).classed(`carbon--theme--${theme}`, true);
		}
	}
}
