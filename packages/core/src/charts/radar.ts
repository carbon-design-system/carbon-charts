// Internal Imports
import { RadarChartModel } from '../model/radar';
import { Chart } from '../chart';
import * as Configuration from '../configuration';
import { ChartConfig, RadarChartOptions } from '../interfaces/index';
import * as Tools from '../tools';

// Components
import {
	// the imports below are needed because of typescript bug (error TS4029)
	Legend,
	LayoutComponent,
} from '../components/index';
import { Radar } from '../components/graphs/radar';

export class RadarChart extends Chart {
	model = new RadarChartModel(this.services);

	constructor(holder: Element, chartConfigs: ChartConfig<RadarChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.radarChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any[] = [
			new Radar(this.model, this.services),
		];

		// get the base chart components and export with tooltip
		const components: any[] = this.getChartComponents(graphFrameComponents);
		return components;
	}
}
