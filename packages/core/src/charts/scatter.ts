// Internal Imports
import { Chart } from "../chart";
import * as Configuration from "../configuration";
import { ChartConfig, ScatterChartOptions, ChartType, LayoutDirection, LayoutGrowth } from "../interfaces/index";
import { Tools } from "../tools";
import { Axis, Legend, Overlay } from "../components/index";
import { LayoutComponent } from "../components/layout";

export class ScatterChart extends Chart {
	options: ScatterChartOptions = Tools.merge({}, Configuration.options.SCATTER);

	constructor(holder: Element, configs: ChartConfig<ScatterChartOptions>) {
		super(holder, configs);

		this.options.type = ChartType.SCATTER;
	}

	getComponents() {
		return [
			new Overlay(),
			// new Axis(),
			// new Legend(),
			new LayoutComponent(
				[
					{
						component: new LayoutComponent(
							[
								{
									component: new Legend(),
									growth: {
										x: LayoutGrowth.PREFERRED,
										y: LayoutGrowth.FIXED
									}
								},
								{
									component: new LayoutComponent(
										[
											{
												component: new Legend(),
												growth: {
													x: LayoutGrowth.PREFERRED,
													y: LayoutGrowth.FIXED
												}
											},
											{
												component: new Legend(),
												growth: {
													x: LayoutGrowth.STRETCH,
													y: LayoutGrowth.FIXED
												}
											},
											{
												component: new Legend(),
												growth: {
													x: LayoutGrowth.PREFERRED,
													y: LayoutGrowth.FIXED
												}
											},
										],
										{
											direction: LayoutDirection.ROW
										}
									),
									growth: {
										x: LayoutGrowth.STRETCH,
										y: LayoutGrowth.FIXED
									}
								},
								{
									component: new Legend(),
									growth: {
										x: LayoutGrowth.PREFERRED,
										y: LayoutGrowth.FIXED
									}
								},
							],
							{
								direction: LayoutDirection.COLUMN
							}
						),
						growth: {
							x: LayoutGrowth.STRETCH,
							y: LayoutGrowth.FIXED
						}
					},
					{
						component: new Legend(),
						growth: {
							x: LayoutGrowth.PREFERRED,
							y: LayoutGrowth.FIXED
						}
					},
				],
				{
					direction: LayoutDirection.ROW
				}
			)
		]
	}
}
