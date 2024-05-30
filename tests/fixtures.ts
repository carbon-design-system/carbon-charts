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
			/gradientTransform="translate\(([\.0-9]+),/g // skeleton charts
		]

		// Helper function to normalize dynamic parts of IDs
		const normalizeId = (str: string): string => {
			nondeterministicPatterns.forEach(pattern => {
				str = str.replace(pattern, (match, p1) => match.replace(p1, 'VARIABLE'))
			})
			return str
		}

		// Normalize dynamic parts of IDs in the HTML content
		htmlContent = normalizeId(htmlContent)

		return htmlContent
	})

	const formattedContent = await prettier.format(modifiedContent, {
		parser: 'html',
		singleQuote: true,
		trailingComma: 'none',
		printWidth: 100,
		useTabs: true,
		semi: false,
		arrowParens: 'avoid'
	})

	expect(formattedContent).toMatchSnapshot('charts.html')
}
