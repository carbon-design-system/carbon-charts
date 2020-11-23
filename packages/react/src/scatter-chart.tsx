import React from "react";
import { ScatterChart as SC } from "@carbon/charts";
import { ChartData, ScatterChartOptions } from "@carbon/charts/interfaces";
import BaseChart, { TabularData } from "./base-chart";

type ScatterChartData =
  | TabularData
  | ChartData
  | Promise<ChartData>;

export default class ScatterChart extends BaseChart<
ScatterChartOptions,
SC,
ScatterChartData
> {
  chartRef!: HTMLDivElement;

  componentDidMount() {
    this.chart = new SC(this.chartRef, {
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
