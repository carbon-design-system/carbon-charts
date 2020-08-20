import { Chart } from "../chart";
import { BaseChartOptions, ChartConfig, Skeletons } from "../interfaces";
import { Tools } from "../tools";
import * as Configuration from "../configuration";
import { Skeleton, LayoutComponent } from "../components";

export class LegendChart extends Chart {
	constructor(holder: Element, chartConfigs: ChartConfig<BaseChartOptions>) {
		super(holder, chartConfigs);

		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.externalLegendOptions,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		const graphFrameComponents = [
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.LEGEND
			})
		];

		const components: LayoutComponent[] = this.getChartComponents(
			graphFrameComponents
		);

		return components;
	}
}
