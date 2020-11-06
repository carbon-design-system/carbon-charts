/// <reference types="react" />

import { RadarChart as RC } from "@carbon/charts";
import { ChartData, RadarChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type RadarChartData = TabularData | ChartData | Promise<ChartData>;

export default class RadarChart extends BaseChart<
  RadarChartOptions,
  RC,
  RadarChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
