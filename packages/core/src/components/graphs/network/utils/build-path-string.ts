import { path as d3Path } from "d3-path";

export default (source, target, offsetHeight = 0, offsetWidth = 0) => {
	let sx = source.x;
	let sy = source.y;
	let tx = target.x;
	let ty = target.y;

	sy =  sy + (offsetHeight / 2);
	ty =  ty + (offsetHeight / 2);

	// If it's pointing N
	if (sy > ty) {
		ty = ty + (offsetHeight / 2);
		sy = sy - (offsetHeight / 2);
		sx = sx + (offsetWidth / 2);
		tx = tx + (offsetWidth / 2);
	}

	// If it's pointing S
	if (ty > sy) {
		ty = ty - (offsetHeight / 2);
		sx = sx + (offsetWidth / 2);
		tx = tx + (offsetWidth / 2);
	}

	// If it's pointing E
	if (sx > tx) {
		tx = tx + offsetWidth;
	}

	// If it's pointing W
	if (tx > sx) {
		sx = sx + offsetWidth;
	}

	const path = d3Path();

	path.moveTo(sx, sy);
	path.lineTo(tx, ty);

	return path.toString();
};
