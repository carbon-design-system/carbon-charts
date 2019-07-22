// Internal Imports
import { Chart } from "../chart";
import * as Configuration from "../configuration";
import { ChartConfig, ScatterChartOptions, ChartType, LayoutDirection, LayoutGrowth, AxisPositions } from "../interfaces/index";
import { Tools } from "../tools";

// Components
import {
	Axis,
	Grid,
	LayoutComponent,
	Legend,
	Overlay,
	Scatter,
	Title,
	Tooltip
} from "../components/index";


// TODO
// - Support nested layout components
// - What if there is no "growth" object?
export class ScatterChart extends Chart {
	options: ScatterChartOptions = Tools.merge({}, Configuration.options.SCATTER);

	constructor(holder: Element, configs: ChartConfig<ScatterChartOptions>) {
		super(holder, configs);

		this.options.type = ChartType.SCATTER;
	}

	getComponents() {
		return [
			new Overlay(),
			new Tooltip(),
			new LayoutComponent(
				[
					{
						components: [
							new Title()
						],
						growth: {
							x: LayoutGrowth.PREFERRED,
							y: LayoutGrowth.FIXED
						}
					},
					{
						components: [
							new LayoutComponent(
								[
									{
										components: [
											new LayoutComponent(
												[
													{
														components: [
															new Axis({
																axisType: AxisPositions.TOP
															})
														],
														growth: {
															x: LayoutGrowth.PREFERRED,
															y: LayoutGrowth.FIXED
														}
													},
													{
														components: [
															new LayoutComponent(
																[
																	{
																		components: [
																			new Axis({
																				axisType: AxisPositions.LEFT
																			})
																		],
																		growth: {
																			x: LayoutGrowth.PREFERRED,
																			y: LayoutGrowth.FIXED
																		}
																	},
																	{
																		components: [
																			new Grid(),
																			new Scatter()
																		],
																		growth: {
																			x: LayoutGrowth.STRETCH,
																			y: LayoutGrowth.FIXED
																		}
																	},
																	{
																		components: [
																			new Axis({
																				axisType: AxisPositions.RIGHT
																			})
																		],
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
														],
														growth: {
															x: LayoutGrowth.STRETCH,
															y: LayoutGrowth.FIXED
														}
													},
													{
														components: [
															new Axis({
																axisType: AxisPositions.BOTTOM
															})
														],
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
											)
										],
										growth: {
											x: LayoutGrowth.STRETCH,
											y: LayoutGrowth.FIXED
										}
									},
									{
										components: [
											new Legend()
										],
										growth: {
											x: LayoutGrowth.PREFERRED,
											y: LayoutGrowth.FIXED
										}
									},
									// {
									// 	components: new Bar(),
									// 	growth: {
									// 		x: LayoutGrowth.STRETCH,
									// 		y: LayoutGrowth.FIXED
									// 	}
									// }
								],
								{
									direction: LayoutDirection.ROW
								}
							)
						],
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
		// 				components: new Bar(),
		// 				growth: {
		// 					x: LayoutGrowth.STRETCH,
		// 					y: LayoutGrowth.FIXED
		// 				}
		// 			},
		// 			{
		// 				components: new Legend(),
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
		// 				components: new Legend(),
		// 				growth: {
		// 					x: LayoutGrowth.STRETCH,
		//  					y: LayoutGrowth.FIXED
		// 				}
		// 			},
		// 			{
		// 				components: new Legend,
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
