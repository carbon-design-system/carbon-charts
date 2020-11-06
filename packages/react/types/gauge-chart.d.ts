/// <reference types="react" />

import { GaugeChart as GC } from "@carbon/charts";
import { ChartData, GaugeChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type GaugeChartData = TabularData | ChartData | Promise<ChartData>;

export default class GaugeChart extends BaseChart<
  GaugeChartOptions,
  GC,
  GaugeChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
