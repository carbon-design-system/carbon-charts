import {
	curveBasis,
	curveBasisClosed,
	curveBasisOpen,
	curveBundle,
	curveCardinal,
	curveCardinalClosed,
	curveCardinalOpen,
	curveCatmullRom,
	curveCatmullRomClosed,
	curveCatmullRomOpen,
	curveLinear,
	curveLinearClosed,
	curveMonotoneX,
	curveMonotoneY,
	curveNatural,
	curveStep,
	curveStepAfter,
	curveStepBefore
} from "d3-shape";

// Internal Imports
import { Service } from "./service";

export class Curves extends Service {
	curveTypes = {
		"curveLinear": curveLinear,
		"curveLinearClosed": curveLinearClosed,
		"curveBasis": curveBasis,
		"curveBasisClosed": curveBasisClosed,
		"curveBasisOpen": curveBasisOpen,
		"curveBundle": curveBundle,
		"curveCardinal": curveCardinal,
		"curveCardinalClosed": curveCardinalClosed,
		"curveCardinalOpen": curveCardinalOpen,
		"curveCatmullRom": curveCatmullRom,
		"curveCatmullRomClosed": curveCatmullRomClosed,
		"curveCatmullRomOpen": curveCatmullRomOpen,
		"curveMonotoneX": curveMonotoneX,
		"curveMonotoneY": curveMonotoneY,
		"curveNatural": curveNatural,
		"curveStep": curveStep,
		"curveStepAfter": curveStepAfter,
		"curveStepBefore": curveStepBefore
	};

	getD3Curve() {
		let curveName;
		const curveOptions = this._model.getOptions().curve;

		if (curveOptions) {
			if (typeof curveOptions === "string") { // curve: 'string'
				curveName = curveOptions;
			} else { // curve: { name: 'string' }
				curveName = curveOptions.name || "curveLinear";
			}
		} else {
			curveName = "curveLinear";
		}

		if (this.curveTypes[curveName]) {
			let curve = this.curveTypes[curveName];
			if (curveOptions) {
				Object.keys(curveOptions).forEach(optionName => {
					if (curve[optionName]) {
						curve = curve[optionName](curveOptions[optionName]);
					}
				});
			}

			return curve;
		}

		return null;
	}
}