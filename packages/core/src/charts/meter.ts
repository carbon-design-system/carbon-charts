// Internal Imports
import { ChartModel } from "../model";
import { Chart } from "../chart";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	MeterChartOptions,
	LayoutGrowth
} from "../interfaces/index";
import { Tools } from "../tools";
import { Meter } from "./../components/graphs/meter";

// Components
import {
	Pie,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	TitleMeter
} from "../components/index";

export class MeterChart extends Chart {
	model = new ChartModel(this.services);

	// TODO - Optimize the use of "extending"
	constructor(holder: Element, chartConfigs: ChartConfig<MeterChartOptions>, extending = false) {
		super(holder, chartConfigs);

		// TODO - Optimize the use of "extending"
		if (extending) {
			return;
		}

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			// chartConfigs.options
			Tools.merge(
				Tools.clone(Configuration.options.meterChart),
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new Meter(this.model, this.services)
		];

		// Meter has an extended title (to render percentages and status)
		const titleComponent = {
			id: "title",
			components: [
				new TitleMeter(this.model, this.services)
			],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		// meter has a custom title component and does not need a legend
		const customElements = [titleComponent];

		// get the base chart components and export with tooltip
		const components: any[] = this.getChartComponents(graphFrameComponents, customElements);
		// components.push(new Tooltip(this.model, this.services));
		return components;
	}
}
