// Internal Imports
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import { ChartConfig, AreaChartOptions, Skeletons } from '../interfaces/index';
import { Tools } from '../tools';

// Components
import {
	Grid,
	Area,
	Line,
	Ruler,
	Scatter,
	TwoDimensionalAxes,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	Skeleton,
} from '../components/index';

export class AreaChart extends AxisChart {
	constructor(holder: Element, chartConfigs: ChartConfig<AreaChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Tools.clone(Configuration.options.areaChart),
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
			new Ruler(this.model, this.services),
			new Line(this.model, this.services),
			new Area(this.model, this.services),
			new Scatter(this.model, this.services, {
				fadeInOnChartHolderMouseover: true,
				handleThresholds: true,
			}),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID,
			}),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);
		return components;
	}
}
