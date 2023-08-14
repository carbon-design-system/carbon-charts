import { beforeEach, describe, expect, it } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'
import { prefix } from '@/tests'
import { select } from 'd3'
import { options as optionsConfigs } from '@/configuration'
import { ScatterChart } from '@/charts/scatter'
import { TestEnvironment } from '@/tests/test-environment'
import { Events } from '@/interfaces/enums'

global.ResizeObserver = ResizeObserver
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
				const title = select(`g.${prefix}--${optionsConfigs.chart.style?.prefix}--title`)

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
