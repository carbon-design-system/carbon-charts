/*
Copyright IBM Corp. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0
*/
import { csvParseRows } from 'd3'
import { describe, expect, it, vi } from 'vitest'
import { ChartModel } from './model'

describe('CSV export', () => {
	it('preserves formatted dates, separators, quotes and line breaks within each cell', () => {
		const downloadCSV = vi.fn()
		const model = new ChartModel({ files: { downloadCSV } })
		const rows = [
			['Date', 'Group', 'Value'],
			['Sep 8, 2025', 'A "quoted" group; O\'Reilly`s', '1,234.5'],
			['first\nsecond', 'first\r\nsecond', '&ndash;']
		]
		vi.spyOn(model, 'getTabularDataArray').mockReturnValue(rows)

		model.exportToCSV()

		const [csv, filename] = downloadCSV.mock.calls[0]
		expect(csvParseRows(csv)).toEqual([rows[0], rows[1], ['first\nsecond', 'first\r\nsecond', '–']])
		expect(filename).toBe('myChart.csv')
	})

	it('keeps formula prefixes neutralized and embedded delimiters inside a single cell', () => {
		const downloadCSV = vi.fn()
		const model = new ChartModel({ files: { downloadCSV } })
		const formulas = ['=1+2', '+1+2', '-1+2', '@SUM(1,2)', '\t=1+2', '\r=1+2']
		const embedded = ['label,=1+2', 'label";=1+2', "label';=1+2"]
		vi.spyOn(model, 'getTabularDataArray').mockReturnValue([formulas, embedded])

		model.exportToCSV()

		expect(csvParseRows(downloadCSV.mock.calls[0][0])).toEqual([
			formulas.map(value => `\u00a0${value.trim()}`),
			embedded
		])
	})
})
