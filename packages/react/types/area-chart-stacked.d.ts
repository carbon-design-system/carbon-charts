/// <reference types="react" />

import { StackedAreaChart as SAC } from "@carbon/charts";
import { ChartData, BarChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type StackedAreaChartData =
  | TabularData
  | ChartData
  | Promise<ChartData>;

export default class StackedAreaChart extends BaseChart<
  BarChartOptions,
  SAC,
  StackedAreaChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
