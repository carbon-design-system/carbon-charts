import { Component, Type } from '@angular/core'
import { NgComponentOutlet } from '@angular/common'

import chartsDoc from '../../../../docs/src/charts'   // ← your JSON/TS examples

/* ------------------------------------------------------------------
	 1️⃣  Pull every export from the barrel.  Anything that has Ivy’s
			 static ɵcmp metadata is an Angular component, so we keep it.
------------------------------------------------------------------- */
import * as ChartBarrel from '../../../src/lib/charts'

type ChartCmp = Type<unknown>

const CHART_COMPONENTS: ChartCmp[] = []
const CLASS_MAP: Record<string, ChartCmp> = {}

for (const [exportName, value] of Object.entries(ChartBarrel)) {
	if ((value as any)?.ɵcmp) {            // true for every @Component class
		CHART_COMPONENTS.push(value as ChartCmp)
		CLASS_MAP[exportName] = value as ChartCmp   // e.g. 'SimpleBarChartComponent'
	}
}

/* ------------------------------------------------------------------
	 2️⃣  Stand-alone root component
------------------------------------------------------------------- */
@Component({
	selector: 'app-root',
	standalone: true,
	//  Angular must “know” any component you will create dynamically,
	//  so we spread the full list into `imports`.
	imports: [NgComponentOutlet, ...CHART_COMPONENTS],
	styleUrls: ['./app.component.scss'],
	templateUrl: './app.component.html'
})
export class AppComponent {
	/* Augment each docs entry with the real component class */
	charts = chartsDoc.map(c => ({
		...c,
		component: CLASS_MAP[c.types.angular]   // className → class object
	}));
}