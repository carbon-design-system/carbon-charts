/// <reference types="react" />

import { PieChart as PC } from "@carbon/charts";
import { ChartData, PieChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type PieChartData = TabularData | ChartData | Promise<ChartData>;

export default class PieChart extends BaseChart<
  PieChartOptions,
  PC,
  PieChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
