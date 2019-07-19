// Internal Imports
import { Chart } from "../chart";
import * as Configuration from "../configuration";
import { ChartConfig, ScatterChartOptions, ChartType, LayoutDirection, LayoutGrowth, AxisPositions } from "../interfaces/index";
import { Tools } from "../tools";
import { Axis, Bar, Legend, Overlay, Title } from "../components/index";
import { LayoutComponent } from "../components/index";

export class ScatterChart extends Chart {
	options: ScatterChartOptions = Tools.merge({}, Configuration.options.SCATTER);

	constructor(holder: Element, configs: ChartConfig<ScatterChartOptions>) {
		super(holder, configs);

		this.options.type = ChartType.SCATTER;
	}

	getComponents() {
		return [
			new Overlay(),
			new LayoutComponent(
				[
					{
						component: new Title(),
						growth: {
							x: LayoutGrowth.PREFERRED,
							y: LayoutGrowth.FIXED
						}
					},
					{
						component: new LayoutComponent(
							[
								{
									component: new LayoutComponent(
										[
											{
												component: new Axis({
													axisType: AxisPositions.TOP
												}),
												growth: {
													x: LayoutGrowth.PREFERRED,
													y: LayoutGrowth.FIXED
												}
											},
											{
												component: new LayoutComponent(
													[
														{
															component: new Axis({
																axisType: AxisPositions.LEFT
															}),
															growth: {
																x: LayoutGrowth.PREFERRED,
																y: LayoutGrowth.FIXED
															}
														},
														{
															component: new Bar(),
															growth: {
																x: LayoutGrowth.STRETCH,
																y: LayoutGrowth.FIXED
															}
														},
														{
															component: new Axis({
																axisType: AxisPositions.RIGHT
															}),
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
												component: new Axis({
													axisType: AxisPositions.BOTTOM
												}),
												growth: {
													x: LayoutGrowth.PREFERRED,
													y: LayoutGrowth.FIXED
												},
												// syncWith: "chart-frame"
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
								// {
								// 	component: new Bar(),
								// 	growth: {
								// 		x: LayoutGrowth.STRETCH,
								// 		y: LayoutGrowth.FIXED
								// 	}
								// }
							],
							{
								direction: LayoutDirection.ROW
							}
						),
						growth: {
							x: LayoutGrowth.STRETCH,
							y: LayoutGrowth.FIXED
						}
					}
				],
				{
					direction: LayoutDirection.COLUMN
				}
			)
		]

		// return [
		// 	new LayoutComponent(
		// 		[
		// 			{
		// 				component: new Bar(),
		// 				growth: {
		// 					x: LayoutGrowth.STRETCH,
		// 					y: LayoutGrowth.FIXED
		// 				}
		// 			},
		// 			{
		// 				component: new Legend(),
		// 				growth: {
		// 					x: LayoutGrowth.PREFERRED,
		// 					y: LayoutGrowth.FIXED
		// 				}
		// 			}
		// 		],
		// 		{
		// 			direction: LayoutDirection.ROW
		// 		}
		// 	)
		// ]

		// return [
		// 	new Overlay(),
		// 	new LayoutComponent(
		// 		[
		// 			{
		// 				component: new Legend(),
		// 				growth: {
		// 					x: LayoutGrowth.STRETCH,
		//  					y: LayoutGrowth.FIXED
		// 				}
		// 			},
		// 			{
		// 				component: new Legend,
		// 				growth: {
		// 					x: LayoutGrowth.PREFERRED,
		//  					y: LayoutGrowth.FIXED
		// 				}
		// 			}
		// 		],
		// 		{
		// 			direction: LayoutDirection.ROW
		// 		}
		// 	)
		// ]
	}
}
