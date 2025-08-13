import { Component, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import chartsDoc from '../../../../docs/src/charts';
import * as ChartBarrel from '../../../src/lib/charts';

/* ---------- helper ---------------------------------------------------- */
/** Returns true when the object is an Angular component (has Ivy metadata). */
function isComponent(v: unknown): v is Type<unknown> & { ɵcmp: unknown } {
  return typeof v === 'function' && !!(v as { ɵcmp?: unknown }).ɵcmp;
}

/* ---------- build maps ------------------------------------------------ */
const CHART_COMPONENTS: Type<unknown>[] = [];
const CLASS_MAP: Record<string, Type<unknown>> = {};

for (const [exportName, value] of Object.entries(ChartBarrel)) {
  if (isComponent(value)) {
    CHART_COMPONENTS.push(value);
    CLASS_MAP[exportName] = value;
  }
}

/* ---------- root component ------------------------------------------- */
@Component({
  selector: 'ibm-app-root',
  standalone: true,
  imports: [NgComponentOutlet, ...CHART_COMPONENTS],
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class App {
  charts = chartsDoc.map(c => ({
    ...c,
    component: CLASS_MAP[c.types.angular[0]],
  }));
}