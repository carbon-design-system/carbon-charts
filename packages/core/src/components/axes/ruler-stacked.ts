import { DOMUtils } from '../../services';
import { Events } from '../../interfaces';

import { Ruler } from './ruler';

export class StackedRuler extends Ruler {
	formatTooltipData(tooltipData) {
		return tooltipData.reverse();
	}
}
