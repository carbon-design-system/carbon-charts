import { afterEach, beforeEach, expect, describe, it } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'
import { select } from 'd3'
import { prefix } from '@/tests'
import { ScatterChart } from '@/charts'
import { options as optionsConfigs } from '@/configuration'
import { TestEnvironment } from '@/tests/test-environment'
import { Events } from '@/interfaces/enums'

global.ResizeObserver = ResizeObserver
let chart: ScatterChart
let testEnvironment: TestEnvironment

describe('legend component', () => {
	beforeEach(function () {
		testEnvironment = new TestEnvironment()
		testEnvironment.render()
		chart = testEnvironment.getChartReference()
	})

	describe('content', () => {
		it('should have same amount of datasets', async function (done: () => void) {
			const data = testEnvironment.chartData
			const uniqueDatagroups = data
				.map((d: any) => d.group)
				.filter(function (value, index, self) {
					return self.indexOf(value) === index
				})

			const numberOfDatagroups = uniqueDatagroups.length

			const chartEventsService = chart.services.events

			const renderCb = () => {
				// Remove render event listener
				chartEventsService.removeEventListener(Events.Chart.RENDER_FINISHED, renderCb)

				const numberOfLegendItems = select(
					`g.${prefix}--${optionsConfigs.chart.style?.prefix}--legend`
				)
					.selectAll('g.legend-item')
					.size()
				expect(numberOfLegendItems).toEqual(numberOfDatagroups)

				done()
			}

			// Add event listener for when chart render is finished
			chartEventsService.addEventListener(Events.Chart.RENDER_FINISHED, renderCb)
		})
	})

	afterEach(function () {
		testEnvironment.destroy()
	})
})
