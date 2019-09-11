import { Chart } from "./chart";
import { Component } from "./components/component";

import {
	LayoutDirection,
	LayoutGrowth,
	LegendOrientations,
	AxisPositions
} from "./interfaces/index";
import {
	LayoutComponent,
	Legend,
	Overlay,
	Title,
	Tooltip,
	FourAxes
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
			new Overlay(),
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

	protected get2DAxisComponent() {
		return new FourAxes({
			axes: {
				[AxisPositions.LEFT]: true,
				[AxisPositions.BOTTOM]: true,
				[AxisPositions.RIGHT]: true,
				[AxisPositions.TOP]: true
			}
		});
	}
}
