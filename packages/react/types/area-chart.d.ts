/// <reference types="react" />

import { AreaChart as AC } from "@carbon/charts";
import { ChartData, AreaChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type AreaChartData = TabularData | ChartData | Promise<ChartData>;

export default class AreaChart extends BaseChart<
  AreaChartOptions,
  AC,
  AreaChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
