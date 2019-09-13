// Internal Imports
import { AxisChart } from "../axis-chart";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	ScatterChartOptions,
	ChartType,
	AxisPositions
} from "../interfaces/index";
import { Tools } from "../tools";

// Components
import {
	Grid,
	Line,
	Scatter,
	TwoDimensionalAxes,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent
} from "../components/index";


// TODO
// - Support nested layout components
// - What if there is no "growth" object?
export class ScatterChart extends AxisChart {
	options: ScatterChartOptions = Tools.merge({}, Configuration.options.SCATTER);

	constructor(holder: Element, configs: ChartConfig<ScatterChartOptions>) {
		super(holder, configs);

		this.options.type = ChartType.SCATTER;
	}

	getComponents() {
		const graphFrameComponents = [
			new TwoDimensionalAxes(),
			new Grid(),
			new Line(),
			new Scatter({
				filled: true
			})
		];

		return this.getAxisChartComponents(graphFrameComponents);
	}
}
