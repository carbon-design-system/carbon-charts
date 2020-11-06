/// <reference types="react" />

import { GroupedBarChart as GBC } from "@carbon/charts";
import { ChartData, BarChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type GroupedBarChartData = TabularData | ChartData | Promise<ChartData>;

export default class GroupedBarChart extends BaseChart<
  BarChartOptions,
  GBC,
  GroupedBarChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
