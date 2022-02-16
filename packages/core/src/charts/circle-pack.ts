// Internal Imports
import { Chart } from '../chart';
import { CirclePackChartModel } from '../model/circle-pack';
import { ChartConfig, CirclePackChartOptions } from '../interfaces/index';
import * as Configuration from '../configuration';
import { Tools } from '../tools';

// Components
import {
	CirclePack,
	// the imports below are needed because of typescript bug (error TS4029)
	Legend,
	LayoutComponent,
	Skeleton,
} from '../components/index';

export class CirclePackChart extends Chart {
	model = new CirclePackChartModel(this.services);

	constructor(
		holder: Element,
		chartConfigs: ChartConfig<CirclePackChartOptions>
	) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.circlePackChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new CirclePack(this.model, this.services),
		];

		// get the base chart components and export with tooltip
		const components: any[] = this.getChartComponents(graphFrameComponents);
		return components;
	}
}
