import { path as d3Path } from "d3-path";

export default (source, target, offsetHeight = 0, offsetWidth = 0, percent = 0.5) => {
	let sx = source.x;
	let sy = source.y;
	let tx = target.x;
	let ty = target.y;

	sy =  sy + (offsetHeight / 2);
	ty =  ty + (offsetHeight / 2);

	// If it's pointing pure N
	if (sy > ty && tx === sx) {
		ty = ty + (offsetHeight / 2);
		sy = sy - (offsetHeight / 2);
		sx = sx + (offsetWidth / 2);
		tx = tx + (offsetWidth / 2);
	}

	// If it's pointing pure S
	if (ty > sy && tx === sx) {
		ty = ty - (offsetHeight / 2);
		sy = sy + (offsetHeight / 2);
		sx = sx + (offsetWidth / 2);
		tx = tx + (offsetWidth / 2);
	}

	// If it's pointing W
	if (tx > sx) {
		sx = sx + offsetWidth;
	}

	// If it's pointing E
	if (sx > tx) {
		tx = tx + offsetWidth;
	}

	const midPointX = sx + (tx - sx) * percent;
	const midPointY = sy + 4;

	const path = d3Path();
	path.moveTo(sx, sy);

	if (ty !== sy && tx !== sx) {
		path.lineTo(midPointX, sy);
		path.lineTo(midPointX, ty);
	}

	path.lineTo(tx, ty);

	return path.toString();
};
