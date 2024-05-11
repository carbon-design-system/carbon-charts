import { Component, ViewChild, AfterViewInit, Type } from '@angular/core'
import { CommonModule } from '@angular/common'
import 'zone.js'
import * as ChartComponents from '../lib/charts' // Make sure the import path is correct
import { DynamicHostDirective } from './dynamic-host.directive'
import type { BaseChartComponent } from '../lib/charts'
import charts from '@carbon/charts-docs' // Ensure the path and exports are correct

type ChartComponentTypes = {
	[key: string]: Type<BaseChartComponent>
}

@Component({
	standalone: true,
	selector: 'ibm-test',
	template: `
		<h1>Carbon Charts Angular</h1>
		<h2>Component Test Harness</h2>

		<div *ngFor="let chart of charts">
			<h3>{{ chart.types.title }}</h3>
			<div *ngFor="let example of chart.examples">
				<ng-template dynamicHost></ng-template>
			</div>
		</div>
	`,
	styles: ['@carbon/charts/styles.css'],
	imports: [CommonModule]
})
export class TestComponent implements AfterViewInit {
	@ViewChild(DynamicHostDirective, { static: true }) dynamicHost!: DynamicHostDirective
	charts = charts

	constructor() {}

	ngAfterViewInit(): void {
		this.loadComponents()
	}

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
}
