import { expect, type Page } from '@playwright/test'
import prettier from 'prettier'

export async function checkForDOMChanges(page: Page): Promise<void> {
	await page.setViewportSize({ width: 1440, height: 720 })
	await page.goto('/')
	await page.addStyleTag({
		content: `
			*,
			*:before,
			*:after {
				animation: none !important;
				transition: none !important;
			}
		`
	})
	await page.waitForSelector('.cds--cc--wordcloud') // wait for the last chart on the test harness page to render

	const modifiedContent = await page.evaluate(() => {
		// Remove WordCloud Charts as they are non-deterministic
		const h3Element = Array.from(document.querySelectorAll('h3')).find(
			h3 =>
				h3.textContent === 'WordCloudChart' ||
				h3.textContent === 'CcvWordCloudChart' ||
				h3.textContent === 'ibm-wordcloud-chart'
		)
		if (h3Element) {
			const divToRemove = h3Element.nextElementSibling
			if (divToRemove && divToRemove.tagName.toLowerCase() === 'div') {
				divToRemove.remove()
			}
		}

		// Get the modified HTML content
		let htmlContent = document.documentElement.outerHTML

		// Patterns to match dynamic parts of IDs
		const nondeterministicPatterns = [
			/["#-]chart-clip-id-([a-z0-9]+)["\)]/g,
			/["#_]gradient-id-([a-z0-9]+)[-"&]/g,
			/["#]chart-([a-z0-9]{13})[-"]/g,
			/\slayout-child-([a-z0-9]+)\s/g,
			/["#]zoomBarClip-([a-z0-9]+)[\)"]/g,
			/id="chart-0\.([a-z0-9]+)"/g, // svelte ids for chart holder
			/gradientTransform="translate\(([-\.0-9]+),/g // for skeleton charts, values change unpredictably and cannot be rounded
		]

		// D3 causes many properties to change on a per-browser basis for each run
		const roundPropertiesPatterns = [
			{ regex: /<circle[^>]*r="([0-9]*\.[0-9]{4,})"[^>]*>/g, precision: 10 },
			{ regex: /"height: ([0-9\.]+)px; /g, precision: 100 },
			{ regex: /height="([0-9]{3})">/g, precision: 100 },
			{ regex: /transform="translate\(0, ([0-9]{3})\)"/g, precision: 100 },
			{ regex: /currentColor"\sd="M0.5,([0-9]{3})\./g, precision: 100 }
		]

		const replaceDynamicIds = (str: string): string => {
			nondeterministicPatterns.forEach(pattern => {
				str = str.replace(pattern, (match, p1) => match.replace(p1, 'DYNAMIC'))
			})
			return str
		}

		const roundProperties = (
			str: string,
			patterns: { regex: RegExp; precision: number }[]
		): string => {
			patterns.forEach(({ regex, precision }) => {
				str = str.replace(regex, (match, p1) => {
					const value = parseFloat(p1)
					const roundedValue = Math.round(value / precision) * precision
					return match.replace(p1, roundedValue.toString())
				})
			})
			return str
		}

		htmlContent = replaceDynamicIds(htmlContent)
		htmlContent = roundProperties(htmlContent, roundPropertiesPatterns)

		return htmlContent
	})

	const formattedContent = await prettier.format(modifiedContent, {
		parser: 'html',
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100,
		useTabs: true,
		semi: false,
		arrowParens: 'avoid',
		bracketSameLine: true
	})

	expect(formattedContent).toMatchSnapshot('charts.html')
}
