import { Ruler } from "./ruler";

export class StackedBarRuler extends Ruler {
	formatTooltipData(tooltipData) {
		return tooltipData.reverse();
	}
}
