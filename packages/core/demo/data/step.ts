import {
	lineData,
	lineOptions,
	lineTimeSeriesData,
	lineTimeSeriesOptions,
} from './line';

export const stepOptions = Object.assign({}, lineOptions, {
	title: 'Step (discrete)',
	curve: 'curveStepAfter',
});

export const stepData = lineData;

export const stepTimeSeriesOptions = Object.assign({}, lineTimeSeriesOptions, {
	title: 'Step (time series)',
	curve: 'curveStepAfter',
});

export const stepTimeSeriesData = lineTimeSeriesData;

// step - empty state
export const stepEmptyStateData = [];
export const stepEmptyStateOptions = Object.assign({}, lineTimeSeriesOptions, {
	title: 'Step (empty state)',
	curve: 'curveStepAfter',
});

// step - skeleton
export const stepSkeletonData = [];
export const stepSkeletonOptions = Object.assign({}, lineTimeSeriesOptions, {
	title: 'Step (skeleton)',
	curve: 'curveStepAfter',
	data: {
		loading: true,
	},
});
