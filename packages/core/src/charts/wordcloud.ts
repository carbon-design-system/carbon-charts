// Internal Imports
import { PieChartModel } from '../model/pie';
import { Chart } from '../chart';
import * as Configuration from '../configuration';
import { ChartConfig, WorldCloudChartOptions } from '../interfaces/index';
import { Tools } from '../tools';
import { Skeletons } from '../interfaces/enums';

// Components
import {
	WordCloud,
	// the imports below are needed because of typescript bug (error TS4029)
	Legend,
	LayoutComponent,
	Skeleton,
} from '../components/index';

export class WordCloudChart extends Chart {
	constructor(
		holder: Element,
		chartConfigs: ChartConfig<WorldCloudChartOptions>
	) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.wordCloudChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents: any[] = [
			new WordCloud(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.PIE,
			}),
		];

		// get the base chart components and export with tooltip
		const components: any[] = this.getChartComponents(graphFrameComponents);
		return components;
	}
}
