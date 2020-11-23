import React from "react";
import { Chart as ChartType } from "@carbon/charts/chart";
import { BaseChartOptions, ChartConfig } from "@carbon/charts/interfaces";

export type TabularData = Record<string, any>[];

export interface BaseChartData extends Pick<ChartConfig<BaseChartOptions>, "data"> {}

type Props<Options, Data> = { options?: Options; data?: Data } | ChartConfig<Options>;

export default class BaseChart<
  Options = BaseChartOptions,
  Chart = ChartType,
  Data = BaseChartData,
> extends React.Component<Props<Options, Data>> {
  data: Data | {};
  options: Options | {};
  props!: Props<Options, Data>;
  chart!: Chart;

  constructor(props: Props<Options, Data>) {
    super(props);

    const { options, data } = props;

    if (!options) {
      console.error("Missing options!");
    }

    if (!data) {
      console.error("Missing data!");
    }

    this.data = props.data || {};
    this.options = props.options || {};

    Object.assign(this, this.chart);
  }

  shouldComponentUpdate(nextProps: Props<Options, Data>) {
    return (
      this.props.data !== nextProps.data ||
      this.props.options !== nextProps.options
    );
  }

  componentDidUpdate() {
    // @ts-ignore
    this.chart.model.setData(this.props.data);
    // @ts-ignore
    this.chart.model.setOptions(this.props.options);
  }
}
