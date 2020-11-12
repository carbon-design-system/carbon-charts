// Internal Imports
import { AxisChart } from "../axis-chart";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	ComboChartOptions,
	ComboChartTypes,
	Skeletons
} from "../interfaces/index";
import { Tools } from "../tools";

// Components
import {
	Grid,
	GroupedBar,
	SimpleBar,
	StackedBar,
	Line,
	TwoDimensionalAxes,
	ZeroLine,
	Scatter,
	StackedScatter,
	Area,
	StackedArea,
	Ruler,
	StackedRuler,
	// the imports below are needed because of typescript bug (error TS4029)
	Legend,
	LayoutComponent,
	Component,
	Skeleton
} from "../components/index";

const graphComponentsMap = {
	[ComboChartTypes.LINE]: [Line, Scatter],
	[ComboChartTypes.SCATTER]: [Scatter],
	[ComboChartTypes.AREA]: [Area, Line, Scatter],
	[ComboChartTypes.STACKED_AREA]: [StackedArea, Line, StackedScatter],
	[ComboChartTypes.SIMPLE_BAR]: [SimpleBar],
	[ComboChartTypes.GROUPED_BAR]: [GroupedBar, ZeroLine],
	[ComboChartTypes.STACKED_BAR]: [StackedBar, StackedRuler]
};

export class ComboChart extends AxisChart {

	constructor(holder: Element, chartConfigs: ChartConfig<ComboChartOptions>) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		const chartOptions = Tools.mergeDefaultChartOptions(
			Configuration.options.comboChart,
			chartConfigs.options
		);

		// Warn user if no chartTypes defined
		// Use skeleton chart instead
		if (!chartConfigs.options.chartTypes) {
			console.warn("No chartTypes defined for the Combo Chart!");
			// add a default chart to get an empty chart
			chartOptions.chartTypes = [{ type: ComboChartTypes.LINE, datasets: [] }];
		}

		// set the global options
		this.model.setOptions(chartOptions);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getGraphComponents() {
		const { chartTypes } = this.model.getOptions();
		let counter = 0;
		const graphComponents = chartTypes.map(graph => {
			const type = graph.type;
			let options;

			// initializes the components using input strings with the base configs for each chart
			if (typeof graph.type === "string") {
				options = Tools.merge({}, Configuration.options[`${Tools.camelCase(graph.type)}Chart`], graph.options);
				return graphComponentsMap[graph.type].map(Component =>
					new Component(this.model, this.services, { groups: graph.datasets, id: ++counter, options: options }));
			} else {
				// user has imported a type or custom component to instantiate
				options = Tools.merge({}, this.model.getOptions(), graph.options);
				return new type(this.model, this.services, { groups: graph.datasets, id: ++counter, options: options });
			}
		});
		return Tools.flatten(graphComponents);
	}

	getComponents() {
		const { chartTypes } = this.model.getOptions();
		// don't add the regular ruler if stacked ruler is added
		const stackedRulerEnabled = chartTypes.filter(chartObject => {
			return chartObject.type === (ComboChartTypes.STACKED_BAR || ComboChartTypes.STACKED_AREA);
		}).length > 0;

		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID
			}),
			...(stackedRulerEnabled ? [] : [new Ruler(this.model, this.services)]),
			...this.getGraphComponents()
		];

		const components: any[] = this.getAxisChartComponents(graphFrameComponents);

		return components;
	}
}
