// Internal Imports
import { MeterChartModel } from '../model/meter';
import { Chart } from '../chart';
import * as Configuration from '../configuration';
import {
	ChartConfig,
	MeterChartOptions,
	LayoutGrowth,
	LayoutDirection,
	RenderTypes,
} from '../interfaces/index';
import { Tools } from '../tools';
import { Meter } from './../components/graphs/meter';

// Components
import {
	Pie,
	// the imports below are needed because of typescript bug (error TS4029)
	Tooltip,
	Legend,
	LayoutComponent,
	MeterTitle,
	Spacer,
} from '../components/index';

export class MeterChart extends Chart {
	model = new MeterChartModel(this.services);

	constructor(holder: Element, chartConfigs: ChartConfig<MeterChartOptions>) {
		super(holder, chartConfigs);

		// use prop meter options or regular meter options
		let options = chartConfigs.options.meter.proportional
			? Tools.merge(
					Tools.clone(Configuration.options.proportionalMeterChart),
					chartConfigs.options
			  )
			: Tools.merge(
					Tools.clone(Configuration.options.meterChart),
					chartConfigs.options
			  );

		// Merge the default options for this chart
		// With the user provided options
		this.model.setOptions(options);

		// Initialize data, services, components etc.
		this.init(holder, chartConfigs);
	}

	getComponents() {
		// Specify what to render inside the graph only
		const graph = {
			id: 'meter-graph',
			components: [new Meter(this.model, this.services)],
			growth: LayoutGrowth.STRETCH,
			renderType: RenderTypes.SVG,
		};

		// Meter has an unique dataset title within the graph
		const titleComponent = {
			id: 'meter-title',
			components: [new MeterTitle(this.model, this.services)],
			growth: LayoutGrowth.STRETCH,
			renderType: RenderTypes.SVG,
		};

		// create the title spacer
		const titleSpacerComponent = {
			id: 'spacer',
			components: [new Spacer(this.model, this.services, { size: 8 })],
			growth: LayoutGrowth.STRETCH,
		};

		// the graph frame for meter includes the custom title (and spacer)
		const graphFrame = [
			new LayoutComponent(
				this.model,
				this.services,
				[titleComponent, titleSpacerComponent, graph],
				{
					direction: LayoutDirection.COLUMN,
				}
			),
		];

		// add the meter title as a top level component
		const components: any[] = this.getChartComponents(graphFrame, {
			graphFrameRenderType: RenderTypes.HTML,
		});

		return components;
	}
}
