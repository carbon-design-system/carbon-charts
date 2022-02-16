import { Ruler } from './ruler';

export class StackedRuler extends Ruler {
	formatTooltipData(tooltipData) {
		return tooltipData.reverse();
	}
}
