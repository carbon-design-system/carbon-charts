import { Chart } from "./chart";
import {
	LayoutDirection,
	LayoutGrowth,
	LegendOrientations,
	LegendPositions,
	ChartConfig,
	AxisChartOptions
} from "./interfaces";
import {
	Brush,
	LayoutComponent,
	Legend,
	Title,
	AxisChartsTooltip,
	Spacer,
	ZoomBar
} from "./components";
import { Tools } from "./tools";

import { CartesianScales, Curves } from "./services";

export class AxisChart extends Chart {
	services: any = Object.assign(this.services, {
		cartesianScales: CartesianScales,
		curves: Curves
	});

	constructor(holder: Element, chartConfigs: ChartConfig<AxisChartOptions>) {
		super(holder, chartConfigs);
	}

	protected getAxisChartComponents(graphFrameComponents: any[]) {
		const titleComponent = {
			id: "title",
			components: [new Title(this.model, this.services)],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		const legendComponent = {
			id: "legend",
			components: [new Legend(this.model, this.services)],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		if (
			this.model.getOptions().zoomBar &&
			this.model.getOptions().zoomBar.enabled
		) {
			graphFrameComponents.splice(
				1,
				0,
				new Brush(this.model, this.services)
			);
		}
		const graphFrameComponent = {
			id: "graph-frame",
			components: graphFrameComponents,
			growth: {
				x: LayoutGrowth.STRETCH,
				y: LayoutGrowth.FIXED
			}
		};

		// if the chart is loading but has data, don't enable legend until loading is false
		const isDataLoading = Tools.getProperty(
			this.model.getOptions(),
			"data",
			"loading"
		);
		const isLegendEnabled =
			this.model.getOptions().legend.enabled !== false && !isDataLoading;

		// Decide the position of the legend in reference to the chart
		let fullFrameComponentDirection = LayoutDirection.COLUMN;
		if (isLegendEnabled) {
			const legendPosition = Tools.getProperty(
				this.model.getOptions(),
				"legend",
				"position"
			);
			if (legendPosition === LegendPositions.LEFT) {
				fullFrameComponentDirection = LayoutDirection.ROW;

				if (!this.model.getOptions().legend.orientation) {
					this.model.getOptions().legend.orientation =
						LegendOrientations.VERTICAL;
				}
			} else if (legendPosition === LegendPositions.RIGHT) {
				fullFrameComponentDirection = LayoutDirection.ROW_REVERSE;

				if (!this.model.getOptions().legend.orientation) {
					this.model.getOptions().legend.orientation =
						LegendOrientations.VERTICAL;
				}
			} else if (legendPosition === LegendPositions.BOTTOM) {
				fullFrameComponentDirection = LayoutDirection.COLUMN_REVERSE;
			}
		}

		const legendSpacerComponent = {
			id: "spacer",
			components: [new Spacer(this.model, this.services)],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		const fullFrameComponent = {
			id: "full-frame",
			components: [
				new LayoutComponent(
					this.model,
					this.services,
					[
						...(isLegendEnabled ? [legendComponent] : []),
						...(isLegendEnabled ? [legendSpacerComponent] : []),
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

		const zoomBarComponent = {
			id: "zoom-bar",
			components: [new ZoomBar(this.model, this.services)],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		// Add chart title if it exists
		const topLevelLayoutComponents = [];
		if (this.model.getOptions().title) {
			topLevelLayoutComponents.push(titleComponent);

			const titleSpacerComponent = {
				id: "spacer",
				components: [new Spacer(this.model, this.services)],
				growth: {
					x: LayoutGrowth.PREFERRED,
					y: LayoutGrowth.FIXED
				}
			};

			topLevelLayoutComponents.push(titleSpacerComponent);
		}
		if (this.model.getOptions().zoomBar.enabled === true) {
			topLevelLayoutComponents.push(zoomBarComponent);
		}
		topLevelLayoutComponents.push(fullFrameComponent);

		return [
			new AxisChartsTooltip(this.model, this.services),
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
