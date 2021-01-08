/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { GaugeChart as GC } from "@carbon/charts";
import type {
  GaugeChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface GaugeChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | GC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: GaugeChartOptions;

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

export default class GaugeChart extends SvelteComponentTyped<
  GaugeChartProps,
  {
    load: CustomEvent<GC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: GaugeChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
