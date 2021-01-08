/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { MeterChart as MC } from "@carbon/charts";
import type {
  MeterChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface MeterChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | MC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: MeterChartOptions;

  /**
   * Specify the id for the chart holder element
   * @default "chart-" + Math.random().toString(36)
   */
  id?: string;

  /**
   * Obtain a reference to the chart holder element
   * @default null
   */
  ref?: null | HTMLDivElement;
}

export default class MeterChart extends SvelteComponentTyped<
  MeterChartProps,
  {
    load: CustomEvent<MC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: MeterChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
