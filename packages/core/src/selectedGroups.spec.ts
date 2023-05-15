import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import ResizeObserver from 'resize-observer-polyfill'
import { select } from 'd3'
import { TestEnvironment } from './tests'
import settings from 'carbon-components/es/globals/js/settings' // CSS prefixes
import { ScatterChart } from '@/charts/scatter'
import { options } from './configuration'
import { Events } from '@/interfaces/enums'

global.ResizeObserver = ResizeObserver
let chart: ScatterChart
let testEnvironment: TestEnvironment

describe('selectedGroups option', () => {
	beforeEach(function () {
		testEnvironment = new TestEnvironment()
		testEnvironment.render()
		chart = testEnvironment.getChartReference()
	})

	describe('selected legend labels', () => {
		it('should match selected groups provided in options', function (done: () => void) {
			const sampleSelectedGroups = ['Dataset 1', 'Dataset 3']

			const chartEventsService = chart.services.events

			const renderCb = () => {
				// Remove render event listener
				chartEventsService.removeEventListener(Events.Chart.RENDER_FINISHED, renderCb)

				const selectedLegendLabels = select(
					`g.${settings.prefix}--${options.chart.style?.prefix}--legend`
				)
					.selectAll<SVGGElement, unknown>('g.legend-item.active > text')
					.nodes()
					.map((item) => item.innerHTML)

				expect(selectedLegendLabels).toEqual(sampleSelectedGroups)

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
