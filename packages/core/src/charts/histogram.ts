// Internal Imports
import { ChartModelBinned } from '../model/binned-charts';
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import { ChartConfig, HistogramChartOptions } from '../interfaces/index';
import { Tools } from '../tools';

// Components
import {
	Grid,
	Histogram,
	BinnedRuler,
	TwoDimensionalAxes,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
} from '../components/index';

export class HistogramChart extends AxisChart {
	model = new ChartModelBinned(this.services);

	constructor(
		holder: Element,
		chartConfigs: ChartConfig<HistogramChartOptions>
	) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.histogramChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);

		this.update();
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new BinnedRuler(this.model, this.services),
			new Histogram(this.model, this.services),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);

		return components;
	}
}
