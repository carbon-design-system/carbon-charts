// D3 Imports
import { select, mouse } from "d3-selection";

import { Chart } from "./chart";
import { Axis } from "./components/Axis";
import * as Configuration from "./configuration";
import { ChartConfig, ScatterChartOptions, ChartType } from "./configuration";
import { Tools } from "./tools";

export class ScatterChart extends Chart {
	options: ScatterChartOptions = Tools.merge({}, Configuration.options.SCATTER);

	constructor(holder: Element, configs: ChartConfig<ScatterChartOptions>) {
		super(holder, configs);

		this.options.type = ChartType.SCATTER;
	}

	getComponents() {
		console.log("get components");

		return [
			new Axis()
		];
	}
}
