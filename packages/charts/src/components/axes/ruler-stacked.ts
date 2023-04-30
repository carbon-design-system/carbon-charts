import { Ruler } from './ruler'

export class StackedRuler extends Ruler {
	formatTooltipData(tooltipData: any) {
		return tooltipData.reverse()
	}
}
