import { LayoutComponent } from "./layout";
import { Axis } from "./axis";
import { AxisPositions } from "../interfaces/index";
import { ChartComponent } from "./base-component";

export const ChartFrame = (graph?: ChartComponent) => new LayoutComponent(
	[
		new Axis({
			position: AxisPositions.TOP
		}),
		new Axis({
			position: AxisPositions.LEFT
		}),
		new Axis({
			position: AxisPositions.RIGHT
		}),
		new Axis({
			position: AxisPositions.BOTTOM
		}),
		// new graph()
	]
);
