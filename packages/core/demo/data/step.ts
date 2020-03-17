import { Tools } from "@carbon/charts/tools";

import {
	lineData,
	lineOptions,
	lineTimeSeriesData,
	lineTimeSeriesOptions
} from "./line";

export const stepOptions = Tools.merge({}, lineOptions, {
	title: "Step (discrete)",
	curve: "curveStepAfter"
});

export const stepData = lineData;

export const stepTimeSeriesOptions = Tools.merge({}, lineTimeSeriesOptions, {
	title: "Step (time series)",
	curve: "curveStepAfter"
});

export const stepTimeSeriesData = lineTimeSeriesData;
