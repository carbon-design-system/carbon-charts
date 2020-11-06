/// <reference types="react" />

import { BubbleChart as BC } from "@carbon/charts";
import { ChartData, BubbleChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

declare type BubbleChartData = TabularData | ChartData | Promise<ChartData>;

export default class BubbleChart extends BaseChart<
  BubbleChartOptions,
  BC,
  BubbleChartData
> {
  chartRef?: HTMLDivElement;
  componentDidMount(): void;
  render(): JSX.Element;
}
