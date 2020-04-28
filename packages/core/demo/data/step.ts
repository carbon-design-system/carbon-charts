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

// step - no data
export const stepNoData = [];
export const stepNoDataOptions = Tools.merge({}, lineTimeSeriesOptions, {
	title: "Step (no data)",
	curve: "curveStepAfter"
});

// step - loading data
export const stepLoadingData = [];
export const stepLoadingDataOptions = Tools.merge({}, lineTimeSeriesOptions, {
	title: "Step (loading data)",
	curve: "curveStepAfter",
	data: {
		loading: true
	}
});
