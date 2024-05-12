import { AfterViewInit, Component, Type, ViewChild } from '@angular/core'
import * as ChartComponents from '../../../src/lib/charts'
import { DynamicHostDirective } from './dynamic-host.directive'
import type { BaseChartComponent } from '../../../src/lib/charts'
import charts from '@carbon/charts-docs'

type ChartComponentTypes = {
	[key: string]: Type<BaseChartComponent>
}

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
	@ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective
	charts = charts

  constructor() {}

  private loadComponents(): void {
		const chartComponents = ChartComponents as unknown as ChartComponentTypes // Ensure type safety

		for (const chart of charts) {
			for (const example of chart.examples) {
				const viewContainerRef = this.dynamicHost.viewContainerRef
				const componentType = chartComponents[chart.types.angular]
				const componentRef = viewContainerRef.createComponent(componentType)
				componentRef.instance.data = example.data
				componentRef.instance.options = example.options
			}
		}
	}

  ngAfterViewInit(): void {
		this.loadComponents()
	}
}
