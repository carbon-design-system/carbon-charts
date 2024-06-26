import { path as d3Path } from 'd3'
import type { Coordinates } from '@/interfaces/layout'

/**
 * Returns a path string for a straight path
 * @param {Coordinates} source - The source coordinates
 * @param {Coordinates} target - The target coordinates
 * @return {string} The path string
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
 * @param {Coordinates} source - The source coordinates
 * @param {Coordinates} target - The target coordinates
 * @param {number} percent - Where the bend point should appear between the source and target
 * @return {string} The path string
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
 * Returns a path string for a path with a custom bezier curve.
 * @param {Coordinates} source - The source coordinates.
 * @param {Coordinates} target - The target coordinates.
 * @param {number} cpx1 - X coordinate for the first control point.
 * @param {number} cpy1 - Y coordinate for the first control point.
 * @param {number} cpx2 - X coordinate for the second control point.
 * @param {number} cpy2 - Y coordinate for the second control point.
 * @returns {string} The path string.
 */
const buildBezierPathString = (
	source: Coordinates,
	target: Coordinates,
	cpx1: number,
	cpy1: number,
	cpx2: number,
	cpy2: number
) => {
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
