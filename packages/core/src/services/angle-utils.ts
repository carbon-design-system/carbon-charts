export function radialLabelPlacement(angleRadians: number) {
	const angle = radToDeg(angleRadians) % 360; // rounded angle

	let textAnchor: "start" | "middle" | "end" = "middle"; // *___   __*__   ___*
	let dominantBaseline: "baseline" | "middle" | "hanging" = "middle"; // __*   --*--   --.

	let quadrant = 0;

	if (isInRange(angle, [0, 90])) {
		quadrant = 0;
	} else if (isInRange(angle, [90, 180])) {
		quadrant = 1;
	} else if (isInRange(angle, [180, 270])) {
		quadrant = 2;
	} else if (isInRange(angle, [270, 360])) {
		quadrant = 3;
	}

	if (quadrant === 0) {
		textAnchor = "start";
		dominantBaseline = "baseline";
	} else if (quadrant === 1) {
		textAnchor = "start";
		dominantBaseline = "hanging";
	} else if (quadrant === 2) {
		textAnchor = "end";
		dominantBaseline = "hanging";
	} else if (quadrant === 3) {
		textAnchor = "end";
		dominantBaseline = "baseline";
	}

	let edge = null;

	if (isInRange(angle, [0, 10]) || isInRange(angle, [350, 0])) {
		edge = 0;
	} else if (isInRange(angle, [80, 100])) {
		edge = 1;
	} else if (isInRange(angle, [170, 190])) {
		edge = 2;
	} else if (isInRange(angle, [260, 280])) {
		edge = 3;
	}

	if (edge === 0) {
		textAnchor = "middle";
		dominantBaseline = "baseline";
	} else if (edge === 1) {
		textAnchor = "start";
		dominantBaseline = "middle";
	} else if (edge === 2) {
		textAnchor = "middle";
		dominantBaseline = "hanging";
	} else if (edge === 3) {
		textAnchor = "end";
		dominantBaseline = "middle";
	}

	return { textAnchor, dominantBaseline };
}

function isInRange(x: number, minMax: number[]): boolean {
	return x >= minMax[0] && x <= minMax[1];
}

export function radToDeg(rad: number): number {
	return rad * (180 / Math.PI);
}

export function degToRad(deg: number): number {
	return deg * (Math.PI / 180);
}
