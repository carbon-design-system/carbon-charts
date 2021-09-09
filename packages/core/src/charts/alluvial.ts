// Internal Imports
import { Chart } from '../chart';
import * as Configuration from '../configuration';
import { ChartConfig, AlluvialChartOptions } from '../interfaces/index';
import { Tools } from '../tools';

// Components
import {
	Alluvial,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
} from '../components/index';

export class AlluvialChart extends Chart {
	constructor(
		holder: Element,
		chartConfigs: ChartConfig<AlluvialChartOptions>
	) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.alluvialChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any = [
			new Alluvial(this.model, this.services),
		];

		const components: any[] = this.getChartComponents(
			graphFrameComponents,
			{
				excludeLegend: true,
			}
		);
		return components;
	}
}
