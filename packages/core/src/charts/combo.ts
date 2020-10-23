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
import { ChartModel } from "../model";

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
	StackedBarRuler,
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
	[ComboChartTypes.SIMPLE_BAR]: [SimpleBar, ZeroLine],
	[ComboChartTypes.GROUPED_BAR]: [GroupedBar, ZeroLine],
	[ComboChartTypes.STACKED_BAR]: [StackedBar, StackedBarRuler]
};

export class ComboChart extends AxisChart {
	model = new ChartModel(this.services);

	constructor(holder: Element, chartConfigs: ChartConfig<ComboChartOptions>) {
		super(holder, chartConfigs);

		// Warn user if no chartTypes defined
		if (!chartConfigs.options.chartTypes) {
			console.warn("No chartTypes defined for the Combo Chart!");
		}

		// Merge the default options for this chart
		// With the user provided options
		const chartOptions = Tools.mergeDefaultChartOptions(
			Configuration.options.comboChart,
			chartConfigs.options
		);

		// Merge multiple graphs default options
		const { chartTypes } = chartOptions;
		const graphs = Object.keys(chartTypes);
		const graphsDefaultOptions = graphs.reduce((options, g) => Tools.merge(options, Configuration.options[`${Tools.camelCase(g)}Chart`]), {});

		// Merge default, user provided and graphs default options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				graphsDefaultOptions,
				chartOptions
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getGraphComponents() {
		const { chartTypes } = this.model.getOptions();
		const graphComponents = Object.keys(chartTypes).map(graph => {
			return graphComponentsMap[graph].map(Component => new Component(this.model, this.services, {groups: this.getGroupsByChartType(graph)}));
		});
		return Tools.removeArrayDuplicates(Tools.flatten(graphComponents));
	}

	// returns the groups that the chart type should add into the configs
	getGroupsByChartType(chart) {
		const { chartTypes } = this.model.getOptions();
		let groups = chartTypes[chart];
		if (chart === ComboChartTypes.LINE && chartTypes[ComboChartTypes.AREA]) {
			// groups that use area chart need to also use line
			groups = groups.concat(chartTypes[ComboChartTypes.AREA]);
		} else if (chart === ComboChartTypes.SCATTER) {
			// groups that use area or line chart, need to use scatter
			if (chartTypes[ComboChartTypes.AREA]) {
				groups = groups.concat(chartTypes[ComboChartTypes.AREA]);
			}
			if (chartTypes[ComboChartTypes.LINE]) {
				groups = groups.concat(chartTypes[ComboChartTypes.LINE]);
			}
		}
		return groups;
	}

	getComponents() {
		const { chartTypes } = this.model.getOptions();
		// don't add the regular ruler if stacked ruler is added
		const stackedRulerEnabled = Object.keys(chartTypes).includes(ComboChartTypes.STACKED_BAR);

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
