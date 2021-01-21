// Internal Imports
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import {
	ChartConfig,
	ComboChartOptions,
	ChartTypes,
	Skeletons,
} from '../interfaces/index';
import { Tools } from '../tools';

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
	Skeleton,
} from '../components/index';

const graphComponentsMap = {
	[ChartTypes.LINE]: [Line, Scatter],
	[ChartTypes.SCATTER]: [Scatter],
	[ChartTypes.AREA]: [Area, Line, Scatter],
	[ChartTypes.STACKED_AREA]: [
		StackedArea,
		Line,
		StackedScatter,
		StackedRuler,
	],
	[ChartTypes.SIMPLE_BAR]: [SimpleBar],
	[ChartTypes.GROUPED_BAR]: [GroupedBar, ZeroLine],
	[ChartTypes.STACKED_BAR]: [StackedBar, StackedRuler],
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

		// Warn user if no comboChartTypes defined
		// Use skeleton chart instead
		if (!chartConfigs.options.comboChartTypes) {
			console.error('No comboChartTypes defined for the Combo Chart!');
			// add a default chart to get an empty chart
			chartOptions.comboChartTypes = [
				{ type: ChartTypes.LINE, correspondingDatasets: [] },
			];
		}

		// set the global options
		this.model.setOptions(chartOptions);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getGraphComponents() {
		const { comboChartTypes } = this.model.getOptions();
		let counter = 0;
		const graphComponents = comboChartTypes
			.map((graph) => {
				const type = graph.type;
				let options;

				// initializes the components using input strings with the base configs for each chart
				if (typeof graph.type === 'string') {
					// check if it is in the components map
					// if it isn't then it is not a valid carbon chart to use in combo
					if (!Object.keys(graphComponentsMap).includes(graph.type)) {
						console.error(
							`Invalid chart type "${graph.type}" specified for combo chart. Please refer to the ComboChart tutorial for more guidance.`
						);
						return null;
					}
					let stacked;
					options = Tools.merge(
						{},
						Configuration.options[
							`${Tools.camelCase(graph.type)}Chart`
						],
						this.model.getOptions(),
						graph.options
					);
					// if we are creating a stacked area, the contained Line chart needs to know it is stacked
					if (graph.type === ChartTypes.STACKED_AREA) {
						stacked = true;
					}
					return graphComponentsMap[graph.type].map(
						(Component, i) =>
							new Component(this.model, this.services, {
								groups: graph.correspondingDatasets,
								id: counter++,
								options: options,
								stacked,
							})
					);
				} else {
					// user has imported a type or custom component to instantiate
					options = Tools.merge(
						{},
						this.model.getOptions(),
						graph.options
					);
					return new type(this.model, this.services, {
						groups: graph.correspondingDatasets,
						id: counter++,
						options: options,
					});
				}
			})
			.filter((item) => item !== null);

		return Tools.flatten(graphComponents);
	}

	getComponents() {
		const { comboChartTypes } = this.model.getOptions();
		// don't add the regular ruler if stacked ruler is added
		const stackedRulerEnabled = comboChartTypes.some(
			(chartObject) =>
				chartObject.type === ChartTypes.STACKED_BAR ||
				chartObject.type === ChartTypes.STACKED_AREA
		);

		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new TwoDimensionalAxes(this.model, this.services),
			new Grid(this.model, this.services),
			new Skeleton(this.model, this.services, {
				skeleton: Skeletons.GRID,
			}),
			...(stackedRulerEnabled
				? []
				: [new Ruler(this.model, this.services)]),
			...this.getGraphComponents(),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);

		return components;
	}
}
