// Internal Imports
import * as Configuration from "./configuration";
import { Tools } from "./tools";
import { ChartConfig, BaseChartOptions } from "./interfaces/index";
import { DOMUtils } from "./dom-utils";

export class ChartEssentials {
	holder: Element;
	options: BaseChartOptions = Tools.merge({}, Configuration.options.BASE);
	domUtils: DOMUtils;

	// DOM Event target
	events: any;

	constructor(holder: Element, configs: ChartConfig<BaseChartOptions>) {
		if (configs.options) {
			this.options = Tools.merge({}, this.options, configs.options);
		}

		this.holder = holder;

		// Setup the event fragment on the DOM
		this.events = document.createDocumentFragment();
	}
}
