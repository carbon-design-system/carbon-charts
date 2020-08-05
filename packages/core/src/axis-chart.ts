import { Chart } from "./chart";
import {
	LayoutDirection,
	LayoutGrowth,
	LegendOrientations,
	LegendPositions,
	ChartConfig,
	AxisChartOptions,
	AxisPositions,
	ScaleTypes
} from "./interfaces";
import {
	ChartBrush,
	ChartClip,
	LayoutComponent,
	Legend,
	Title,
	AxisChartsTooltip,
	Spacer,
	ZoomBar
} from "./components";
import { Tools } from "./tools";

import { CartesianScales, Curves, Zoom } from "./services";

export class AxisChart extends Chart {
	services: any = Object.assign(this.services, {
		cartesianScales: CartesianScales,
		curves: Curves,
		zoom: Zoom
	});

	constructor(holder: Element, chartConfigs: ChartConfig<AxisChartOptions>) {
		super(holder, chartConfigs);
	}

	protected getAxisChartComponents(graphFrameComponents: any[]) {
		const options = this.model.getOptions();
		const isZoomBarEnabled = Tools.getProperty(
			options,
			"zoomBar",
			"top",
			"enabled"
		);

		this.services.cartesianScales.findDomainAndRangeAxes(); // need to do this before getMainXAxisPosition()
		const mainXAxisPosition = this.services.cartesianScales.getMainXAxisPosition();
		const mainXScaleType = Tools.getProperty(
			options,
			"axes",
			mainXAxisPosition,
			"scaleType"
		);
		// @todo - Zoom Bar only supports main axis at BOTTOM axis and time scale for now
		const zoomBarEnabled =
			isZoomBarEnabled &&
			mainXAxisPosition === AxisPositions.BOTTOM &&
			mainXScaleType === ScaleTypes.TIME;

		const titleComponent = {
			id: "title",
			components: [new Title(this.model, this.services)],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		// Add extra legend items
		const extraLabels = [];
		const radiusLabel = Tools.getProperty(
			options,
			"bubble",
			"radiusLabel"
		);
		if (radiusLabel) {
			extraLabels.push({
				type: "radius-label",
				icon: `<svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<title>Artboard</title>
							<g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								<circle id="Oval-Copy-33" stroke="#8C8C8C" cx="7" cy="7" r="6.5"></circle>
								<circle id="Oval-Copy-33" stroke="#8C8C8C" cx="7" cy="10" r="3.5"></circle>
							</g>
						</svg>`,
				text: radiusLabel
			});
		}

		const legendComponent = {
			id: "legend",
			components: [new Legend(this.model, this.services, { extraLabels })],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		if (zoomBarEnabled) {
			graphFrameComponents.push(
				new ChartClip(this.model, this.services),
				new ChartBrush(this.model, this.services)
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
		if (zoomBarEnabled) {
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
