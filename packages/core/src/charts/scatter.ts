// Internal Imports
import { AxisChart } from "../axis-chart";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	ScatterChartOptions,
	ChartType,
	AxisPositions,
	BaseChartOptions
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
	constructor(holder: Element, chartConfigs: ChartConfig<ScatterChartOptions>) {
		super(holder, chartConfigs);

		if (chartConfigs.options) {
			this.model.setOptions(
				Tools.merge(Configuration.options.LINE, chartConfigs.options)
			);
		}
	}

	getComponents() {
		const graphFrameComponents = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Line(this.model, this.services),
			new Scatter(this.model, this.services)
		];

		return this.getAxisChartComponents(graphFrameComponents);
	}
}
