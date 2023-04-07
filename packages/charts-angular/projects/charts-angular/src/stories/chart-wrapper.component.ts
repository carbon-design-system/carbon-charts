import { Component, Injector, OnInit, Input, ViewContainerRef } from '@angular/core'
import type { ChartTabularData, BaseChartOptions } from '@carbon/charts'

@Component({
  selector: 'chart-wrapper',
  templateUrl: './chart-wrapper.component.html'
})
export class ChartWrapper implements OnInit {
  @Input() demoChart!: any
  @Input() chartType: string = ''
  @Input() data!: ChartTabularData
  @Input() options!: BaseChartOptions
  // @Input() codeSandbox!: string

  constructor(private viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    console.log(this.demoChart)
  }

  get injector() {
    const injector = this.viewContainerRef.injector;
    return Injector.create({
      providers: [
        { provide: 'data', useValue: this.data },
        { provide: 'options', useValue: this.options }
      ],
      parent: injector
    })
  }

  async openCloudSandbox() {
		console.log('Click')
		try {
			const response = await fetch('https://codesandbox.io/api/v1/sandboxes', {
				method: 'POST',
				// body: JSON.stringify(this.codeSandbox),
				headers: { 'Content-Type': 'application/json' }
			})
	
			if (!response.ok) {
				throw new Error('Network response from CodeSandbox was not ok')
			}
			const { data } = await response.json()
			const sandboxUrl = `https://codesandbox.io/p/sandbox/${data.sandbox_id}`
			window.open(sandboxUrl, '_blank')
		} catch (error) {
			console.error('There was a problem opening the Cloud Sandbox:', error)
			throw error
		}
	}
}