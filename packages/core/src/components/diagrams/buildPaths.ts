import { path as d3Path } from 'd3-path';

/**
 * Returns a path string for a straight path
 * @param  {Object} source - The source coordinates
 * @param  {Number} source.x - The source's x coordinate
 * @param  {Number} source.y - The source's y coordinate
 * @param  {Object} target - The target coordinates
 * @param  {Number} target.x - The target's x coordinate
 * @param  {Number} target.y - The target's y coordinate
 * @return {String} The path string
 */
const buildStraightPathString = (source, target) => {
	const sx = source.x;
	const sy = source.y;
	const tx = target.x;
	const ty = target.y;

	const path = d3Path();

	path.moveTo(sx, sy);
	path.lineTo(tx, ty);

	return path.toString();
};

/**
 * Returns a path string for an elbow path with a bend point
 * @param  {Object} source - The source coordinates
 * @param  {Number} source.x - The source's x coordinate
 * @param  {Number} source.y - The source's y coordinate
 * @param  {Object} target - The target coordinates
 * @param  {Number} target.x - The target's x coordinate
 * @param  {Number} target.y - The target's y coordinate
 * @param  {Number} percent - Where the bend point should appear between the source and target
 * @return {String} The path string
 */
const buildElbowPathString = (source, target, percent = 0.5) => {
	const sx = source.x;
	const sy = source.y;
	const tx = target.x;
	const ty = target.y;

	const path = d3Path();

	path.moveTo(sx, sy);
	path.lineTo(sx + (tx - sx) * percent, sy);
	path.lineTo(sx + (tx - sx) * percent, ty);
	path.lineTo(tx, ty);

	return path.toString();
};

/**
 * Returns a path string for an path with a custom bezier curve
 * @param  {Object} source - The source coordinates
 * @param  {Number} source.x - The source's x coordinate
 * @param  {Number} source.y - The source's y coordinate
 * @param  {Object} target - The target coordinates
 * @param  {Number} target.x - The target's x coordinate
 * @param  {Number} target.y - The target's y coordinate
 * @param  {Number} cpx1 - X coordinate for the first control point
 * @param  {Number} cpy1 - Y coordinate for the first control point
 * @param  {Number} cpx2 - X coordinate for the second control point
 * @param  {Number} cpy1 - Y coordinate for the second control point
 * @return {String} The path string
 */
const buildBezierPathString = (source, target, cpx1, cpy1, cpx2, cpy2) => {
	const sx = source.x;
	const sy = source.y;
	const tx = target.x;
	const ty = target.y;

	const path = d3Path();

	path.moveTo(sx, sy);
	path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, tx, ty);

	return path.toString();
};

export { buildStraightPathString, buildElbowPathString, buildBezierPathString };
