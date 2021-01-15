import { addZoomBarToOptions } from './zoom-bar';
import * as lineChart from './line';

export const zoomBarHighScaleLineTimeSeriesOptions = addZoomBarToOptions(
	Object.assign({ highScale: true }, lineChart.lineTimeSeriesOptions)
);
zoomBarHighScaleLineTimeSeriesOptions['title'] = 'High scale (zoom bar)';
