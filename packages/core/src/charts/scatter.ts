// Internal Imports
import { Chart } from "../chart";
import * as Configuration from "../configuration";
import { ChartConfig, ScatterChartOptions, ChartType, LayoutDirection } from "../interfaces/index";
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
			// new Overlay(),
			// new Axis(),
			// new Legend()
			new LayoutComponent(
				[
					{
						component: new Axis(),
						size: 70
					},
					{
						component: new Legend(),
						size: 30
					}
				],
				{
					direction: LayoutDirection.ROW
				}
			)
		];
	}
}

const sampleRealisticData = {
	"children": [
		{
			"name": "boss1",
			"children": [
				{
					"name": "CHART_FRAME",
					"value": 70,
					"children": [
						{
							"name": "AXIS_X2",
							"value": 10,
						},
						{
							"name": "CHART_FRAME_SUB1",
							"value": 80,
							"children": [
								{
									"name": "AXIS_Y",
									"value": 10,
								},
								{
									"name": "AXIS_GRAPH",
									"value": 80,
								},
								{
									"name": "AXIS_Y2",
									"value": 10,
								},
							]
						},
						{
							"name": "AXIS_X",
							"value": 10,
						},
					]
				},
				{
					"name": "LEGEND",
					"value": 30
				}
			]
		}
	],
	"name": "chart"
};
