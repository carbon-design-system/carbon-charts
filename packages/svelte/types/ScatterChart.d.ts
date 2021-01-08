/// <reference types="svelte" />
import { SvelteComponentTyped } from "svelte";
import { ScatterChart as SC } from "@carbon/charts";
import type {
  ScatterChartOptions,
  ChartTabularData,
} from "@carbon/charts/interfaces";

export interface ScatterChartProps
  extends svelte.JSX.HTMLAttributes<HTMLElementTagNameMap["div"]> {
  /**
   * Obtain a reference to the instantiated chart
   * @default null
   */
  chart?: null | SC;

  /**
   * Set the chart data using the tabular data format
   * @default []
   */
  data?: ChartTabularData;

  /**
   * Set the chart options
   * @default {}
   */
  options?: ScatterChartOptions;

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

export default class ScatterChart extends SvelteComponentTyped<
  ScatterChartProps,
  {
    load: CustomEvent<SC>;
    update: CustomEvent<{
      data: ChartTabularData;
      options: ScatterChartOptions;
    }>;
    destroy: CustomEvent<any>;
  },
  {}
> {}
