// Internal Imports
import { Service } from "../service";
import { ModelStateKeys, ChartTheme } from "../../interfaces";

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
		const holderElement = this.model.get(ModelStateKeys.HOLDER) as HTMLElement;
		const theme = Tools.getProperty(this.model.getOptions(), "theme") ?
			Tools.getProperty(this.model.getOptions(), "theme") : ChartTheme.WHITE;

		select(holderElement).classed(`carbon--theme--${theme}`, true);
	}
}
