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
	TooltipBar,
	Spacer
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
		const topLevelLayoutComponents = [];
		// the layout component holding the graph and legend
		let fullFrameComponent;

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

		// Check if the legend is enabled for the chart
		if (this.model.getOptions().legend.enabled) {
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

			// create the legend component and spacer
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

			const legendSpacerComponent = {
				id: "spacer",
				components: [
					new Spacer(this.model, this.services)
				],
				growth: {
					x: LayoutGrowth.PREFERRED,
					y: LayoutGrowth.FIXED
				}
			};

			// create the full frame component with the legend
			fullFrameComponent = {
				id: "full-frame",
				components: [
					new LayoutComponent(
						this.model,
						this.services,
						[
							legendComponent,
							legendSpacerComponent,
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
		} else {
			// legend is not enabled, create full frame component with column direction and only graph components
			fullFrameComponent = {
				id: "full-frame",
				components: [
					new LayoutComponent(
						this.model,
						this.services,
						[
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
		}

		// Add chart title if it exists
		if (this.model.getOptions().title) {
			// create the title component
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

			// create the title spacer
			const titleSpacerComponent = {
				id: "spacer",
				components: [
					new Spacer(this.model, this.services)
				],
				growth: {
					x: LayoutGrowth.PREFERRED,
					y: LayoutGrowth.FIXED
				}
			};

			topLevelLayoutComponents.push(titleComponent);
			topLevelLayoutComponents.push(titleSpacerComponent);
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
