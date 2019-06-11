// D3 Imports
import { Chart } from "./chart";
import * as Configuration from "./configuration";
import { ChartConfig, ScatterChartOptions, ChartType } from "./interfaces/index";
import { Tools } from "./tools";
import { Axis, Legend, Overlay } from "./components/index";

export class ScatterChart extends Chart {
	options: ScatterChartOptions = Tools.merge({}, Configuration.options.SCATTER);

	constructor(holder: Element, configs: ChartConfig<ScatterChartOptions>) {
		super(holder, configs);

		this.options.type = ChartType.SCATTER;
	}

	getComponents() {
		return [
			new Overlay(),
			new Axis(),
			new Legend()
		];
	}
}
