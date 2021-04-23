import { path as d3Path } from 'd3-path';

const straight = (source, target) => {
	let sx = source.x;
	let sy = source.y;
	let tx = target.x;
	let ty = target.y;

	const path = d3Path();

	path.moveTo(sx, sy);
	path.lineTo(tx, ty);

	return path.toString();
};

const elbow = (source, target, percent = 0.5) => {
	let sx = source.x;
	let sy = source.y;
	let tx = target.x;
	let ty = target.y;

	const path = d3Path();

    path.moveTo(sx, sy);
    path.lineTo(sx + (tx - sx) * percent, sy);
    path.lineTo(sx + (tx - sx) * percent, ty);
    path.lineTo(tx, ty);

	return path.toString();
};

const bezier = (source, target, cpx1, cpy1, cpx2, cpy2) => {
	let sx = source.x;
	let sy = source.y;
	let tx = target.x;
	let ty = target.y;

	const path = d3Path();

	path.moveTo(sx, sy);
	path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, tx, ty);

	return path.toString();
};

export { straight, elbow, bezier };
