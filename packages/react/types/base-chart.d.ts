import React from "react";
import { Chart as C } from "@carbon/charts/chart";
import { BaseChartOptions, ChartConfig } from "@carbon/charts/interfaces";

export declare type TabularData = Record<string, any>[];

export declare type BCData =
  | TabularData
  | Pick<ChartConfig<BaseChartOptions>, "data">;

declare type Props<Options, Data> = {
  options?: Options;
  data?: Data;
};

export default class BaseChart<
  Options = BaseChartOptions,
  Chart = C,
  Data = BCData
> extends React.Component<Props<Options, Data>> {
  data: Data | {};
  options: Options | {};
  props: Props<Options, Data>;
  chart?: Chart;
  constructor(props: Props<Options, Data>);
  shouldComponentUpdate(nextProps: Props<Options, Data>): boolean;
  componentDidUpdate(): void;
}
