// Internal Imports
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import { ChartConfig, ScatterChartOptions } from '../interfaces/index';
import { Tools } from '../tools';

// Components
import {
	BinnedModal,
	Grid,
	Histogram,
	Ruler,
	TwoDimensionalAxes,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	TooltipHistogram,
} from '../components/index';

export class HistogramChart extends AxisChart {
	constructor(
		holder: Element,
		chartConfigs: ChartConfig<ScatterChartOptions>
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
			new Ruler(this.model, this.services),
			new Histogram(this.model, this.services),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents,
			{
				excludeTooltip: true,
				excludeModal: true
			}
		);
		components.push(new TooltipHistogram(this.model, this.services));
		components.push(new BinnedModal(this.model, this.services));

		return components;
	}
}
