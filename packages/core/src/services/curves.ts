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
	curveStepBefore,
	// the imports below are needed because of typescript bug (error TS4029)
	CurveBundleFactory,
	CurveCardinalFactory,
	CurveCatmullRomFactory,
	CurveGenerator
} from "d3-shape";

// this import is needed because of typescript bug (error TS4029)
import { Path } from "d3-path";

// Internal Imports
import { Service } from "./service";

export class Curves extends Service {
	curveTypes = {
		curveLinear,
		curveLinearClosed,
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
		curveMonotoneX,
		curveMonotoneY,
		curveNatural,
		curveStep,
		curveStepAfter,
		curveStepBefore
	};

	getD3Curve() {
		let curveName;
		const curveOptions = this.model.getOptions().curve;

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
