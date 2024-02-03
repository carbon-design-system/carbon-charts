import { describe, expect, it } from 'vitest'
import { getProperty, mergeDefaultChartOptions } from './tools'
import { ScaleTypes } from './interfaces/enums'

describe('Tools.getProperty', () => {
	it('works with simple nested object containing a number > 0', () => {
		const obj = { a: { b: { c: 5 } } }

		expect(getProperty(obj, 'a', 'b', 'c')).toEqual(5)
	})

	it('works with simple nested object containing a 0', () => {
		const obj = { a: { b: { c: 0 } } }

		expect(getProperty(obj, 'a', 'b', 'c')).toEqual(0)
	})

	it('works with simple nested object containing `false`', () => {
		const obj = { a: { b: { c: false } } }

		expect(getProperty(obj, 'a', 'b', 'c')).toEqual(false)
	})

	it('works with simple nested object containing `true`', () => {
		const obj = { a: { b: { c: true } } }

		expect(getProperty(obj, 'a', 'b', 'c')).toEqual(true)
	})

	it('works with simple nested object containing a string', () => {
		const obj = { a: { b: { c: 'qwerty' } } }

		expect(getProperty(obj, 'a', 'b', 'c')).toEqual('qwerty')
	})

	it('works with simple nested object containing an empty string', () => {
		const obj = { a: { b: { c: '' } } }

		expect(getProperty(obj, 'a', 'b', 'c')).toEqual('')
	})
})

describe('Tools.mergeDefaultChartOptions', () => {
	it('merges default chart configuration with provided ones with special cases for axes', () => {
		const providedOptions = {
			title: 'Title',
			axes: {
				bottom: {
					title: 'Title'
				},
				left: {
					scaleType: ScaleTypes.TIME
				}
			}
		}

		const defaultOptions = {
			axes: {
				top: {
					includeZero: true
				},
				bottom: {
					includeZero: true
				},
				left: {
					includeZero: true
				},
				right: {
					includeZero: true
				}
			},
			timeScale: {
				addSpaceOnEdges: 1
			}
		}

		const expectedMerge = {
			title: 'Title',
			axes: {
				bottom: {
					includeZero: true,
					title: 'Title',
					mapsTo: 'value'
				},
				left: {
					includeZero: true,
					scaleType: ScaleTypes.TIME,
					mapsTo: 'date'
				}
			},
			timeScale: {
				addSpaceOnEdges: 1
			}
		}

		expect(mergeDefaultChartOptions(defaultOptions, providedOptions)).toEqual(expectedMerge)
	})
})
