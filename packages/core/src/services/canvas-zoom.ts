// Internal Imports
import { Service } from './service';
import { Tools } from '../tools';
import * as Configuration from '../configuration';
// Services
import { DOMUtils, Events, GradientUtils, Transitions } from './index';

export class CanvasZoom extends Service {
	protected model: any;

	//focal object to zoom into, parent is the whole parent chart svg, settings are duration,easing and zoomlevel
	zoomIn(obj, parent, settings?) {
		let x;
		let y;
		var zoomLevel;

		if (obj) {
			x = obj.x;
			y = obj.y;
			zoomLevel = settings.zoomLevel
		}

		const { width, height } = DOMUtils.getSVGElementSize(parent, { useAttr: true });

		const circles = parent.selectAll("circle.node");
		circles.transition()
			.duration(settings.duration)
			.ease(settings.ease)
			.attr('transform', `translate(` + width / 2 + `,` + height / 2 + `)scale(` + zoomLevel + `)translate(` + -x + `,` + -y + `)`);
	}

	zoomOut(obj?) {
		console.log("zooming out");
	}
}
