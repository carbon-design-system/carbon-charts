import { Chart } from "./chart";

import {
	LayoutDirection,
	LayoutGrowth,
	LegendOrientations
} from "./interfaces/index";
import {
	LayoutComponent,
	Legend,
	Title,
	Tooltip
} from "./components/index";
import { Tools } from "./tools";

import { Axes, Curves } from "./services/index";

export class AxisChart extends Chart {
	protected services: any = Object.assign(this.services, {
		axes: Axes,
		curves: Curves
	});

	protected getAxisChartComponents(graphFrameComponents: Array<any>) {
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
					this.model,
					this.services,
					[
						legendComponent,
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

		return [
			new Tooltip(this.model, this.services),
			new LayoutComponent(
				this.model,
				this.services,
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
