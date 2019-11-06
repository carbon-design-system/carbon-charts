import { Chart } from "./chart";
import {
	LayoutDirection,
	LayoutGrowth,
	LegendOrientations,
	LegendPositions,
	ChartConfig,
	AxisChartOptions
} from "./interfaces/index";
import {
	LayoutComponent,
	Legend,
	Title,
	Tooltip,
	TooltipBar
} from "./components/index";
import { Tools } from "./tools";

import { Axes, Curves } from "./services/index";

export class AxisChart extends Chart {
	services: any = Object.assign(this.services, {
		axes: Axes,
		curves: Curves
	});

	constructor(holder: Element, chartConfigs: ChartConfig<AxisChartOptions>) {
		super(holder, chartConfigs);
	}

	protected getAxisChartComponents(graphFrameComponents: any[]) {
		const titleComponent = {
			id: "title",
			components: [
				new Title(this.model, this.services)
			],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		const legendComponent = {
			id: "legend",
			components: [
				new Legend(this.model, this.services)
			],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		const graphFrameComponent = {
			id: "graph-frame",
			components: graphFrameComponents,
			growth: {
				x: LayoutGrowth.STRETCH,
				y: LayoutGrowth.FIXED
			}
		};

		// Decide the position of the legend in reference to the chart
		let fullFrameComponentDirection = LayoutDirection.COLUMN;
		const legendPosition = Tools.getProperty(this.model.getOptions(), "legend", "position");
		if (legendPosition === LegendPositions.LEFT) {
			fullFrameComponentDirection = LayoutDirection.ROW;

			if (!this.model.getOptions().legend.orientation) {
				this.model.getOptions().legend.orientation = LegendOrientations.VERTICAL;
			}
		} else if (legendPosition === LegendPositions.RIGHT) {
			fullFrameComponentDirection = LayoutDirection.ROW_REVERSE;

			if (!this.model.getOptions().legend.orientation) {
				this.model.getOptions().legend.orientation = LegendOrientations.VERTICAL;
			}
		} else if (legendPosition === LegendPositions.BOTTOM) {
			fullFrameComponentDirection = LayoutDirection.COLUMN_REVERSE;
		}

		const fullFrameComponent = {
			id: "full-frame",
			components: [
				new LayoutComponent(
					this.model,
					this.services,
					[
						...((this.model.getOptions().legend.visible !== false) ? [ legendComponent ] : [ ]),
						graphFrameComponent
					],
					{
						direction: fullFrameComponentDirection
					}
				)
			],
			growth: {
				x: LayoutGrowth.STRETCH,
				y: LayoutGrowth.FIXED
			}
		};

		// Add chart title if it exists
		const topLevelLayoutComponents = [];
		if (this.model.getOptions().title) {
			topLevelLayoutComponents.push(titleComponent);
		}
		topLevelLayoutComponents.push(fullFrameComponent);

		return [
			new LayoutComponent(
				this.model,
				this.services,
				topLevelLayoutComponents,
				{
					direction: LayoutDirection.COLUMN
				}
			)
		];
	}
}
