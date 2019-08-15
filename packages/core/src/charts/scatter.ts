// Internal Imports
import { Chart } from "../chart";
import * as Configuration from "../configuration";
import {
	ChartConfig,
	ScatterChartOptions,
	ChartType,
	LayoutDirection,
	LayoutGrowth,
	ModelStateKeys,
	AxisPositions
} from "../interfaces/index";
import { Tools } from "../tools";

// Components
import {
	FourAxes,
	Grid,
	LayoutComponent,
	Legend,
	Line,
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

		const graphFrame = {
			id: "graph-frame",
			components: [
				new FourAxes({
					axes: {
						[AxisPositions.LEFT]: false,
						[AxisPositions.BOTTOM]: false,
						[AxisPositions.RIGHT]: true,
						[AxisPositions.TOP]: true
					}
				}),
				new Grid(),
				new Scatter(),
				new Line(),
			],
			growth: {
				x: LayoutGrowth.STRETCH,
				y: LayoutGrowth.FIXED
			}
		};

		const graphAxisFrame = {
			id: "graph-axis-frame",
			components: [
				new LayoutComponent(
					[
						graphFrame
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
		};

		const axisFrameComponent = {
			id: "axis-frame",
			components: [
				new LayoutComponent(
					[
						graphAxisFrame
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
		};

		const fullFrameComponent = {
			id: "full-frame",
			components: [
				new LayoutComponent(
					[
						axisFrameComponent,
						legendComponent
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

		// return [
		// 	new Overlay(),
		// 	new Tooltip(),
		// 	new LayoutComponent(
		// 		[
		// 			{
		// 				id: "title",
		// 				components: [
		// 					new Title()
		// 				],
		// 				growth: {
		// 					x: LayoutGrowth.PREFERRED,
		// 					y: LayoutGrowth.FIXED
		// 				}
		// 			},
		// 			{
		// 				id: "full-frame",
		// 				components: [
		// 					new LayoutComponent(
		// 						[
		// 							{
		// 								id: "full-frame-2",
		// 								components: [
		// 									new LayoutComponent(
		// 										[
		// 											{
		// 												id: "topAxis",
		// 												components: [
		// 													new Axis({
		// 														axisType: AxisPositions.TOP
		// 													})
		// 												],
		// 												growth: {
		// 													x: LayoutGrowth.PREFERRED,
		// 													y: LayoutGrowth.FIXED
		// 												}
		// 											},
		// 											{
		// 												id: "chartFrame-tbAxis",
		// 												components: [
		// 													new LayoutComponent(
		// 														[
		// 															{
		// 																id: "leftAxis",
		// 																components: [
		// 																	new Axis({
		// 																		axisType: AxisPositions.LEFT
		// 																	})
		// 																],
		// 																growth: {
		// 																	x: LayoutGrowth.PREFERRED,
		// 																	y: LayoutGrowth.FIXED
		// 																}
		// 															},
		// 															{
		// 																id: "chartFrame",
		// 																components: [
		// 																	new Grid(),
		// 																	new Scatter()
		// 																],
		// 																growth: {
		// 																	x: LayoutGrowth.STRETCH,
		// 																	y: LayoutGrowth.FIXED
		// 																}
		// 															},
		// 															{
		// 																id: "rightAxis",
		// 																components: [
		// 																	new Axis({
		// 																		axisType: AxisPositions.RIGHT
		// 																	})
		// 																],
		// 																growth: {
		// 																	x: LayoutGrowth.PREFERRED,
		// 																	y: LayoutGrowth.FIXED
		// 																}
		// 															},
		// 														],
		// 														{
		// 															direction: LayoutDirection.ROW
		// 														}
		// 													)
		// 												],
		// 												growth: {
		// 													x: LayoutGrowth.STRETCH,
		// 													y: LayoutGrowth.FIXED
		// 												}
		// 											},
		// 											{
		// 												id: "bottomAxis",
		// 												components: [
		// 													new Axis({
		// 														axisType: AxisPositions.BOTTOM
		// 													})
		// 												],
		// 												growth: {
		// 													x: LayoutGrowth.PREFERRED,
		// 													y: LayoutGrowth.FIXED
		// 												},
		// 												// syncWith: "chart-frame"
		// 											},
		// 										],
		// 										{
		// 											direction: LayoutDirection.COLUMN
		// 										}
		// 									)
		// 								],
		// 								growth: {
		// 									x: LayoutGrowth.STRETCH,
		// 									y: LayoutGrowth.FIXED
		// 								}
		// 							},
		// 							{
		// 								id: "legend",
		// 								components: [
		// 									new Legend()
		// 								],
		// 								growth: {
		// 									x: LayoutGrowth.PREFERRED,
		// 									y: LayoutGrowth.FIXED
		// 								}
		// 							},
		// 							// {
		// 							// 	components: new Bar(),
		// 							// 	growth: {
		// 							// 		x: LayoutGrowth.STRETCH,
		// 							// 		y: LayoutGrowth.FIXED
		// 							// 	}
		// 							// }
		// 						],
		// 						{
		// 							direction: LayoutDirection.ROW
		// 						}
		// 					)
		// 				],
		// 				growth: {
		// 					x: LayoutGrowth.STRETCH,
		// 					y: LayoutGrowth.FIXED
		// 				}
		// 			}
		// 		],
		// 		{
		// 			direction: LayoutDirection.COLUMN
		// 		}
		// 	)
		// ]

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
