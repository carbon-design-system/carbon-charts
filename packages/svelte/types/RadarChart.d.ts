/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { RadarChart as RC } from "@carbon/charts";
import type {
  RadarChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface RadarChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | RC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: RadarChartOptions;

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

export default class RadarChart extends SvelteComponentTyped<
  RadarChartProps,
  {
    load: CustomEvent<RC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: RadarChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
