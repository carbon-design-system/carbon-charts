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

const curveTypes = {
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

export const getD3Curve = (curveName = "curveLinear", curveOptions = {}) => {
	if (curveTypes[curveName]) {
		let curve = curveTypes[curveName];
		Object.keys(curveOptions).forEach(optionName => {
			if (curve[optionName]) {
				curve = curve[optionName](curveOptions[optionName]);
			}
		});
		return curve;
	}
	return null;
};
