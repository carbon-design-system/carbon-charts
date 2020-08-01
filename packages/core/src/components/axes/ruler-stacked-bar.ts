import { DOMUtils } from "../../services";
import { Events } from "../../interfaces";

import { Ruler } from "./ruler";

export class StackedBarRuler extends Ruler {
	formatTooltipData(tooltipData) {
		return tooltipData.reverse();
	}

	hideRuler() {
		const svg = this.parent;
		const ruler = DOMUtils.appendOrSelect(svg, "g.ruler");

		this.services.events.dispatchEvent(Events.Tooltip.HIDE);
		ruler.attr("opacity", 0);
	}
}
