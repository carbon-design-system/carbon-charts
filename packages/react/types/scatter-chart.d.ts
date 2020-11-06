/// <reference types="react" />

import { ScatterChart as SC } from "@carbon/charts";
import { ChartData, ScatterChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type ScatterChartData = TabularData | ChartData | Promise<ChartData>;

export default class ScatterChart extends BaseChart<
  ScatterChartOptions,
  SC,
  ScatterChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
