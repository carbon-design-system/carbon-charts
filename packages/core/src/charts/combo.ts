// Internal Imports
import { AxisChart } from "../axis-chart";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	ComboChartOptions
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
	TooltipBar,
	Scatter,
	Ruler,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	TooltipScatter
} from "../components/index";

const graphComponentsMap = {
	"line": [Ruler, Line, Scatter],
	"simple-bar": [SimpleBar, ZeroLine],
	"grouped-bar": [GroupedBar, ZeroLine],
	"stacked-bar": [StackedBar]
};

const graphTooltipsMap = {
	"line": TooltipScatter,
	"simple-bar": TooltipBar,
	"grouped-bar": TooltipBar,
	"stacked-bar": TooltipBar
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

		// If the stacked-bar chart is included, stack its data groups
		if (graphs.includes("stacked-bar")) {
			this.model.setStackedGroups(chartTypes["stacked-bar"]);
		}

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getGraphComponents(graph: string) {
		const { chartTypes } = this.model.getOptions();
		return graphComponentsMap[graph].map(Component => new Component(this.model, this.services, {groups: chartTypes[graph]}));
	}

	getGraphsComponents() {
		const { chartTypes } = this.model.getOptions();
		const graphsComponents = Object.keys(chartTypes).map(graph => this.getGraphComponents(graph));
		return Tools.removeArrayDuplicates(Tools.flatten(graphsComponents));
	}

	getGraphsTooltips() {
		const { chartTypes } = this.model.getOptions();
		const graphsTooltips = Object.keys(chartTypes).map(graph => new graphTooltipsMap[graph](this.model, this.services));
		return Tools.removeArrayDuplicates(graphsTooltips);
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			...this.getGraphsComponents()
		];

		const components: any[] = this.getAxisChartComponents(graphFrameComponents);
		components.push(...this.getGraphsTooltips());

		return components;
	}
}
