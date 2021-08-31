// Internal Imports
import { Chart } from '../chart';
import * as Configuration from '../configuration';
import { ChartConfig, TreeChartOptions } from '../interfaces/index';
import { Tools } from '../tools';

// Components
import {
	Tree,
	// the imports below are needed because of typescript bug (error TS4029)
	Legend,
	LayoutComponent,
	Skeleton,
} from '../components/index';

export class TreeChart extends Chart {
	constructor(holder: Element, chartConfigs: ChartConfig<TreeChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.treeChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any[] = [
			new Tree(this.model, this.services),
		];

		// get the base chart components and export with tooltip
		const components: any[] = this.getChartComponents(
			graphFrameComponents,
			{
				excludeLegend: true,
			}
		);
		return components;
	}
}
