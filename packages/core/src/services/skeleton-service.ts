// Internal Imports
import * as Configuration from "../configuration";
import { Service } from "./service";
import { AxisPositions, CartesianOrientations, ScaleTypes, AxesOptions } from "../interfaces";
import { Tools } from "../tools";

// D3 Imports
import {
	scaleBand,
	scaleLinear,
	scaleTime,
	scaleLog
} from "d3-scale";
import { extent, sum } from "d3-array";
import { map, values } from "d3-collection";

export class SkeletonService extends Service {
	render() {
		console.log("this.model:", this.model);
	}
}
