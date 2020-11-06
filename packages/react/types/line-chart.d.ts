/// <reference types="react" />

import { LineChart as LC } from "@carbon/charts";
import { ChartData, LineChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type LineChartData = TabularData | ChartData | Promise<ChartData>;

export default class LineChart extends BaseChart<
  LineChartOptions,
  LC,
  LineChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
