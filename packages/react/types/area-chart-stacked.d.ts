/// <reference types="react" />

import { StackedAreaChart as SAC } from "@carbon/charts";
import { ChartData, StackedAreaChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type StackedAreaChartData =
  | TabularData
  | ChartData
  | Promise<ChartData>;

export default class StackedAreaChart extends BaseChart<
  StackedAreaChartOptions,
  SAC,
  StackedAreaChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
