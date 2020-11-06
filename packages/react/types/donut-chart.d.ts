/// <reference types="react" />

import { DonutChart as DC } from "@carbon/charts";
import { ChartData, DonutChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type DonutChartData = TabularData | ChartData | Promise<ChartData>;

export default class DonutChart extends BaseChart<
  DonutChartOptions,
  DC,
  DonutChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
