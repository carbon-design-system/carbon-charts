/// <reference types="react" />

import { MeterChart as MC } from "@carbon/charts";
import { ChartData, MeterChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type MeterChartData = TabularData | ChartData | Promise<ChartData>;

export default class MeterChart extends BaseChart<
  MeterChartOptions,
  MC,
  MeterChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
