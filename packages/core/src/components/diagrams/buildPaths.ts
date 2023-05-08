import { path as d3Path } from 'd3-path'
import type { Coordinates } from '../../'
/**
 * Returns a path string for a straight path
 * @param source - The source coordinates
 * @param source.x - The source's x coordinate
 * @param source.y - The source's y coordinate
 * @param target - The target coordinates
 * @param target.x - The target's x coordinate
 * @param target.y - The target's y coordinate
 * @return The path string
 */
const buildStraightPathString = (source: Coordinates, target: Coordinates) => {
	const sx = source.x as number
	const sy = source.y as number
	const tx = target.x as number
	const ty = target.y as number

	const path = d3Path()

	path.moveTo(sx, sy)
	path.lineTo(tx, ty)

	return path.toString()
}

/**
 * Returns a path string for an elbow path with a bend point
 * @param  source - The source coordinates
 * @param  source.x - The source's x coordinate
 * @param  source.y - The source's y coordinate
 * @param  target - The target coordinates
 * @param  target.x - The target's x coordinate
 * @param  target.y - The target's y coordinate
 * @param  percent - Where the bend point should appear between the source and target
 * @return The path string
 */
const buildElbowPathString = (source: Coordinates, target: Coordinates, percent = 0.5) => {
	const sx = source.x
	const sy = source.y
	const tx = target.x
	const ty = target.y

	const path = d3Path()

	path.moveTo(sx, sy)
	path.lineTo(sx + (tx - sx) * percent, sy)
	path.lineTo(sx + (tx - sx) * percent, ty)
	path.lineTo(tx, ty)

	return path.toString()
}

/**
 * Returns a path string for an path with a custom bezier curve
 * @param source - The source coordinates
 * @param source.x - The source's x coordinate
 * @param source.y - The source's y coordinate
 * @param target - The target coordinates
 * @param target.x - The target's x coordinate
 * @param target.y - The target's y coordinate
 * @param cpx1 - X coordinate for the first control point
 * @param cpy1 - Y coordinate for the first control point
 * @param cpx2 - X coordinate for the second control point
 * @param cpy2 - Y coordinate for the second control point
 * @return The path string
 */
const buildBezierPathString = (source: Coordinates, target: Coordinates, cpx1: number, cpy1: number, cpx2: number, cpy2: number) => {
	const sx = source.x
	const sy = source.y
	const tx = target.x
	const ty = target.y

	const path = d3Path()

	path.moveTo(sx, sy)
	path.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, tx, ty)

	return path.toString()
}

export { buildStraightPathString, buildElbowPathString, buildBezierPathString }
