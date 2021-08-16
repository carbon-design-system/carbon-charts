// Internal Imports
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import { ChartConfig, LineChartOptions } from '../interfaces/index';
import { Tools } from '../tools';

// Components
import {
	Grid,
	Candlestick,
	CandlestickRuler,
	TwoDimensionalAxes,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	SkeletonLines,
} from '../components/index';

export class CandlestickChart extends AxisChart {
	constructor(holder: Element, chartConfigs: ChartConfig<LineChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.lineChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any[] = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new CandlestickRuler(this.model, this.services),
			new Candlestick(this.model, this.services),
			new SkeletonLines(this.model, this.services),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents,
			{
				legend: {
					enabled: false,
				},
			}
		);
		return components;
	}
}
