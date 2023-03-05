// Internal Imports
import { HeatmapModel } from '../model/heatmap';
import { AxisChart } from '../axis-chart';
import * as Configuration from '../configuration';
import * as Tools from '../tools';

import {
	HeatmapChartOptions,
	LayoutDirection,
	LayoutGrowth,
	ChartConfig,
	RenderTypes,
	LayoutAlignItems,
} from '../interfaces/index';

import {
	Heatmap,
	TwoDimensionalAxes,
	Modal,
	LayoutComponent,
	ColorScaleLegend,
	Title,
	AxisChartsTooltip,
	Spacer,
	Toolbar,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
} from '../components';

export class HeatmapChart extends AxisChart {
	model = new HeatmapModel(this.services);

	constructor(
		holder: Element,
		chartConfigs: ChartConfig<HeatmapChartOptions>
	) {
		super(holder, chartConfigs);

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(
			Tools.mergeDefaultChartOptions(
				Configuration.options.heatmapChart,
				chartConfigs.options
			)
		);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	// Custom getChartComponents - Implements getChartComponents
	// Removes zoombar support and additional `features` that are not supported in heatmap
	protected getAxisChartComponents(
		graphFrameComponents: any[],
		configs?: any
	) {
		const options = this.model.getOptions();
		const toolbarEnabled = Tools.getProperty(options, 'toolbar', 'enabled');

		this.services.cartesianScales.determineAxisDuality();
		this.services.cartesianScales.findDomainAndRangeAxes(); // need to do this before getMainXAxisPosition()
		this.services.cartesianScales.determineOrientation();

		const titleAvailable = !!this.model.getOptions().title;
		const titleComponent = {
			id: 'title',
			components: [new Title(this.model, this.services)],
			growth: LayoutGrowth.STRETCH,
		};

		const toolbarComponent = {
			id: 'toolbar',
			components: [new Toolbar(this.model, this.services)],
			growth: LayoutGrowth.PREFERRED,
		};

		const headerComponent = {
			id: 'header',
			components: [
				new LayoutComponent(
					this.model,
					this.services,
					[
						// always add title to keep layout correct
						titleComponent,
						...(toolbarEnabled ? [toolbarComponent] : []),
					],
					{
						direction: LayoutDirection.ROW,
						alignItems: LayoutAlignItems.CENTER,
					}
				),
			],
			growth: LayoutGrowth.PREFERRED,
		};

		const legendComponent = {
			id: 'legend',
			components: [new ColorScaleLegend(this.model, this.services)],
			growth: LayoutGrowth.PREFERRED,
			renderType: RenderTypes.SVG,
		};

		const graphFrameComponent = {
			id: 'graph-frame',
			components: graphFrameComponents,
			growth: LayoutGrowth.STRETCH,
			renderType: RenderTypes.SVG,
		};

		const isLegendEnabled =
			Tools.getProperty(configs, 'legend', 'enabled') !== false &&
			this.model.getOptions().legend.enabled !== false;

		// Decide the position of the legend in reference to the chart
		const fullFrameComponentDirection = LayoutDirection.COLUMN_REVERSE;

		const legendSpacerComponent = {
			id: 'spacer',
			components: [new Spacer(this.model, this.services, { size: 15 })],
			growth: LayoutGrowth.PREFERRED,
		};

		const fullFrameComponent = {
			id: 'full-frame',
			components: [
				new LayoutComponent(
					this.model,
					this.services,
					[
						...(isLegendEnabled ? [legendComponent] : []),
						...(isLegendEnabled ? [legendSpacerComponent] : []),
						graphFrameComponent,
					],
					{
						direction: fullFrameComponentDirection,
					}
				),
			],
			growth: LayoutGrowth.STRETCH,
		};

		const topLevelLayoutComponents = [];
		// header component is required for either title or toolbar
		if (titleAvailable || toolbarEnabled) {
			topLevelLayoutComponents.push(headerComponent);

			const titleSpacerComponent = {
				id: 'spacer',
				components: [
					new Spacer(
						this.model,
						this.services,
						toolbarEnabled ? { size: 15 } : undefined
					),
				],
				growth: LayoutGrowth.PREFERRED,
			};

			topLevelLayoutComponents.push(titleSpacerComponent);
		}
		topLevelLayoutComponents.push(fullFrameComponent);

		return [
			new AxisChartsTooltip(this.model, this.services),
			new Modal(this.model, this.services),
			new LayoutComponent(
				this.model,
				this.services,
				topLevelLayoutComponents,
				{
					direction: LayoutDirection.COLUMN,
				}
			),
		];
	}

	getComponents() {
		// Specify what to render inside the graph-frame
		const graphFrameComponents = [
			new TwoDimensionalAxes(this.model, this.services),
			new Heatmap(this.model, this.services),
		];

		const components: any[] = this.getAxisChartComponents(
			graphFrameComponents
		);
		return components;
	}
}
