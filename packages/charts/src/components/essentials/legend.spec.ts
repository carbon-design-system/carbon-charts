import { afterEach, beforeEach, describe, it } from 'vitest'
import { select } from 'd3-selection'
import { TestEnvironment } from '../../tests/index'

// import the settings for the css prefixes
import settings from 'carbon-components/es/globals/js/settings'

import { options } from './../../configuration'
import { Events } from './../../interfaces'

describe('legend component', () => {
	beforeEach(function () {
		const testEnvironment = new TestEnvironment()
		testEnvironment.render()

		this.chart = testEnvironment.getChartReference()
		this.testEnvironment = testEnvironment
	})

	describe('content', () => {
		it('should have same amount of datasets', async function () {
			const data = this.testEnvironment.chartData
			const uniqueDatagroups = data
				.map(d => d.group)
				.filter(function (value, index, self) {
					return self.indexOf(value) === index
				})
	
			const numberOfDatagroups = uniqueDatagroups.length
	
			const chartEventsService = this.chart.services.events
	
			const renderPromise = new Promise<void>(resolve => {
				const renderCb = () => {
					// Remove render event listener
					chartEventsService.removeEventListener(Events.Chart.RENDER_FINISHED, renderCb)
					resolve()
				}
				// Add event listener for when chart render is finished
				chartEventsService.addEventListener(Events.Chart.RENDER_FINISHED, renderCb)
			})
	
			// Wait for chart to finish rendering
			await renderPromise
	
			const numberOfLegendItems = select(
				`g.${settings.prefix}--${options.chart.style?.prefix}--legend`
			)
				.selectAll('g.legend-item')
				.size()
			expect(numberOfLegendItems).toEqual(numberOfDatagroups)
		})
	})
	

	afterEach(function () {
		this.testEnvironment.destroy()
	})
})
