// Internal Imports
import { Pie } from "./pie";

export class Donut extends Pie {
	type = "donut";

	getInnerRadius() {
		// Compute the outer radius needed
		const radius = this.computeRadius();

		return radius * (3 / 4);
	}
}
