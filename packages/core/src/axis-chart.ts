import { Chart } from "./chart";

import {
	LayoutDirection,
	LayoutGrowth,
	LegendOrientations,
	AxisPositions,
	ScaleTypes
} from "./interfaces/index";
import {
	LayoutComponent,
	Legend,
	Title,
	Tooltip,
	TwoDimensionalAxes
} from "./components/index";
import { Tools } from "./tools";

export class AxisChart extends Chart {
	protected getAxisChartComponents(graphFrameComponents: Array<any>) {
		const titleComponent = {
			id: "title",
			components: [
				new Title()
			],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		const legendComponent = {
			id: "legend",
			components: [
				new Legend()
			],
			growth: {
				x: LayoutGrowth.PREFERRED,
				y: LayoutGrowth.FIXED
			}
		};

		const axisFrameComponent = {
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
		if (legendPosition === "left") {
			fullFrameComponentDirection = LayoutDirection.ROW;

			if (!this.model.getOptions().legend.orientation) {
				this.model.getOptions().legend.orientation = LegendOrientations.VERTICAL;
			}
		} else if (legendPosition === "right") {
			fullFrameComponentDirection = LayoutDirection.ROW_REVERSE;

			if (!this.model.getOptions().legend.orientation) {
				this.model.getOptions().legend.orientation = LegendOrientations.VERTICAL;
			}
		} else if (legendPosition === "bottom") {
			fullFrameComponentDirection = LayoutDirection.COLUMN_REVERSE;
		}

		const fullFrameComponent = {
			id: "full-frame",
			components: [
				new LayoutComponent(
					[
						legendComponent,
						axisFrameComponent
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

		return [
			new Tooltip(),
			new LayoutComponent(
				[
					titleComponent,
					fullFrameComponent
				],
				{
					direction: LayoutDirection.COLUMN
				}
			)
		];
	}
}
