import React from "react";
import { LineChart as LC } from "@carbon/charts";
import {
  ChartData,
  LineChartOptions,
} from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

type LineChartData =
  | TabularData
  | ChartData
  | Promise<ChartData>;

export default class LineChart extends BaseChart<
  LineChartOptions,
  LC,
  LineChartData
> {
  chartRef?: HTMLDivElement;

  componentDidMount() {
    this.chart = new LC(this.chartRef!, {
      data: this.props.data as any,
      options: this.props.options!,
    });
  }

  render() {
    return (
      <div
        ref={(chartRef) => (this.chartRef = chartRef!)}
        className="chart-holder"
      ></div>
    );
  }
}
