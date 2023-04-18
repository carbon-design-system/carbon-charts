import { beforeEach, describe, it } from 'vitest'
import { select } from 'd3-selection'
import { ScatterChart } from '../../charts'
import { TestEnvironment } from '../../tests/index'

// import the settings for the css prefixes
import settings from 'carbon-components/es/globals/js/settings'

import { options } from './../../configuration'
import { Events } from './../../interfaces'

let chart: ScatterChart
let testEnvironment: TestEnvironment

describe('title component', () => {
	beforeEach(function () {
		testEnvironment = new TestEnvironment()
		testEnvironment.render()

		chart = testEnvironment.getChartReference()
	})

	describe('content', () => {
		it('should match text provided in options', function (done: () => void) {
			const sampleTitle = 'My chart'
	
			const chartEventsService = chart.services.events
			const renderCb = () => {
				const title = select(`g.${settings.prefix}--${options.chart.style?.prefix}--title`)
	
				// Remove event listener for when chart render is finished
				chartEventsService.removeEventListener(Events.Chart.RENDER_FINISHED, renderCb)
	
				expect(title.select('text').html()).toEqual(sampleTitle)
	
				done()
			}
	
			// Add event listener for when chart render is finished
			chartEventsService.addEventListener(Events.Chart.RENDER_FINISHED, renderCb)
		})
	})
	
})
