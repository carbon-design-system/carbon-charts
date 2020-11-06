/// <reference types="react" />

import { StackedBarChart as SBC } from "@carbon/charts";
import { ChartData, StackedBarChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type StackedBarChartData = TabularData | ChartData | Promise<ChartData>;

export default class StackedBarChart extends BaseChart<
  StackedBarChartOptions,
  SBC,
  StackedBarChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
