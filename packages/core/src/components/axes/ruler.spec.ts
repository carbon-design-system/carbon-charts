import { select } from 'd3'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { Ruler } from './ruler'
import { CartesianOrientations, Events } from '@/interfaces/enums'
import type { ChartModel } from '@/model/model'
import type { Services } from '@/interfaces/services'

const sampleData = [
	{ group: 'A', date: 10, value: 1 },
	{ group: 'B', date: 10, value: 2 },
	{ group: 'A', date: 20, value: 3 },
	{ group: 'B', date: 20, value: 4 }
]

describe('ruler', () => {
	let svg: SVGSVGElement
	let frame: FrameRequestCallback
	let dispatchEvent: ReturnType<typeof vi.fn>
	let getDomainValue: ReturnType<typeof vi.fn>
	let ruler: Ruler
	let data: typeof sampleData
	let orientation: CartesianOrientations

	beforeEach(() => {
		data = sampleData
		orientation = CartesianOrientations.VERTICAL
		svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
		document.body.appendChild(svg)
		dispatchEvent = vi.fn()
		getDomainValue = vi.fn(d => d.date)
		vi.stubGlobal(
			'requestAnimationFrame',
			vi.fn(callback => {
				frame = callback
				return 1
			})
		)
		vi.stubGlobal('cancelAnimationFrame', vi.fn())

		ruler = new Ruler(
			{
				getOptions: () => ({ ruler: { enabled: true }, style: { prefix: 'cc' } }),
				getDisplayData: () => data
			} as unknown as ChartModel,
			{
				domUtils: { getMainContainer: () => svg },
				cartesianScales: {
					getOrientation: () => orientation,
					getRangeScale: () => ({ range: () => [100, 0] }),
					getDomainValue,
					getRangeIdentifier: () => 'value'
				},
				events: { dispatchEvent }
			} as unknown as Services
		)
		ruler.render()

		select(svg)
			.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('role', 'graphics-symbol')
	})

	afterEach(() => {
		vi.unstubAllGlobals()
		document.body.replaceChildren()
	})

	function move(x: number) {
		ruler.backdrop.node().dispatchEvent(new MouseEvent('mousemove', { clientX: x }))
	}

	it('draws the latest point once per animation frame and reuses its indexes', () => {
		move(10)
		move(20)

		expect(requestAnimationFrame).toHaveBeenCalledOnce()
		expect(dispatchEvent).not.toHaveBeenCalled()
		frame(0)

		expect(dispatchEvent).toHaveBeenLastCalledWith(
			Events.Tooltip.SHOW,
			expect.objectContaining({ data: data.slice(2), mousePosition: [20, 0] })
		)
		expect(svg.querySelector('line.ruler-line').getAttribute('x1')).toBe('20')
		expect(getDomainValue).toHaveBeenCalledTimes(8)

		move(21)
		frame(16)
		expect(dispatchEvent).toHaveBeenLastCalledWith(Events.Tooltip.MOVE, {
			mousePosition: [21, 0]
		})
		expect(getDomainValue).toHaveBeenCalledTimes(8)

		move(10)
		frame(32)
		expect(dispatchEvent).toHaveBeenLastCalledWith(
			Events.Tooltip.SHOW,
			expect.objectContaining({ data: data.slice(0, 2) })
		)
		expect(dispatchEvent).not.toHaveBeenCalledWith(Events.Tooltip.HIDE)
		expect(getDomainValue).toHaveBeenCalledTimes(8)

		move(50)
		frame(48)
		move(60)
		frame(64)
		expect(
			dispatchEvent.mock.calls.filter(([event]) => event === Events.Tooltip.HIDE)
		).toHaveLength(1)

		ruler.render()
		move(20)
		frame(80)
		expect(getDomainValue).toHaveBeenCalledTimes(16)
	})

	it('cancels pending work and clears only the active symbols on exit', () => {
		move(10)
		frame(0)
		move(20)
		ruler.backdrop.node().dispatchEvent(new MouseEvent('mouseout'))

		expect(cancelAnimationFrame).toHaveBeenCalledWith(1)
		expect(dispatchEvent).toHaveBeenLastCalledWith(Events.Tooltip.HIDE)
		expect(svg.querySelector('g.ruler').getAttribute('opacity')).toBe('0')
	})

	it('uses the range coordinate on horizontal charts', () => {
		orientation = CartesianOrientations.HORIZONTAL
		ruler.showRuler(new CustomEvent('mousemove'), [50, 20])

		expect(svg.querySelector('line.ruler-line').getAttribute('y1')).toBe('20')
	})

	it('indexes a 1,000-reading, 9-series chart only once', () => {
		data = Array.from({ length: 1000 }, (_value, date) =>
			Array.from({ length: 9 }, (_level, level) => ({
				group: `L${level + 1}`,
				date,
				value: date
			}))
		).flat()
		select(svg).selectAll('[role=graphics-symbol]').remove()
		select(svg)
			.selectAll('circle')
			.data(data)
			.enter()
			.append('circle')
			.attr('role', 'graphics-symbol')

		for (let date = 0; date < 1000; date++) {
			move(date)
			frame(date)
		}

		expect(getDomainValue).toHaveBeenCalledTimes(18_000)
		expect(dispatchEvent).not.toHaveBeenCalledWith(Events.Tooltip.HIDE)
	})
})
