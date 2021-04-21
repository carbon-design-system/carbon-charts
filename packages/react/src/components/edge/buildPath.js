import { path as d3Path } from 'd3-path';

// Todo: Add in elbow, bezier properties

export default (source, target) => {
	let sx = source.x;
	let sy = source.y;
	let tx = target.x;
	let ty = target.y;

	const path = d3Path();

	path.moveTo(sx, sy);
	path.lineTo(tx, ty);

	return path.toString();
  }
