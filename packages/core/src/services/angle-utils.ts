export interface Point {
	x: number;
	y: number;
}

export type Angle = number;

interface LabelAlignment {
	textAnchor: "start" | "middle" | "end"; // *___   __*__   ___*
	dominantBaseline: "baseline" | "middle" | "hanging"; // __*   --*--   --.
}

export function radialLabelPlacement(angleRadians: Angle): LabelAlignment {
	const angle = mod(radToDeg(angleRadians), 360);

	if (isInRange(angle, [0, 10]) || isInRange(angle, [350, 0])) {
		return { textAnchor: "start", dominantBaseline: "middle" };
	} else if (isInRange(angle, [10, 80])) {
		return { textAnchor: "start", dominantBaseline: "hanging" };
	} else if (isInRange(angle, [80, 100])) {
		return { textAnchor: "middle", dominantBaseline: "hanging" };
	} else if (isInRange(angle, [100, 170])) {
		return { textAnchor: "end", dominantBaseline: "hanging" };
	} else if (isInRange(angle, [170, 190])) {
		return { textAnchor: "end", dominantBaseline: "middle" };
	} else if (isInRange(angle, [190, 260])) {
		return { textAnchor: "end", dominantBaseline: "baseline" };
	} else if (isInRange(angle, [260, 280])) {
		return { textAnchor: "middle", dominantBaseline: "baseline" };
	} else { // 280 - 350
		return { textAnchor: "start", dominantBaseline: "baseline" };
	}
}

function mod(n: number, m: number) {
	return ((n % m) + m) % m;
}

function isInRange(x: number, [min, max]: [number, number]) {
	return x >= min && x <= max;
}

export function radToDeg(rad: Angle): Angle {
	return rad * (180 / Math.PI);
}

export function degToRad(deg: Angle): Angle {
	return deg * (Math.PI / 180);
}

export function polarToCartesianCoords(a: Angle, r: number, t: Point = { x: 0, y: 0 }): Point {
	const x = r * Math.cos(a) + t.x;
	const y = r * Math.sin(a) + t.y;
	return { x, y };
}

// Return the distance between a point (described with polar coordinates)
// on a circumference and the vertical diameter.
// If the point is on the left if the diameter, its distance is positive,
// if it is on the right of the diameter, its distance is negative.
export function distanceBetweenPointOnCircAndVerticalDiameter(a: Angle, r: number) {
	return r * Math.sin(a - Math.PI / 2);
}
