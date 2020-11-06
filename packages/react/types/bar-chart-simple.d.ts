/// <reference types="react" />

import { SimpleBarChart as SBC } from "@carbon/charts";
import { ChartData, BarChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type SimpleBarChartData = TabularData | ChartData | Promise<ChartData>;

export default class SimpleBarChart extends BaseChart<
  BarChartOptions,
  SBC,
  SimpleBarChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
