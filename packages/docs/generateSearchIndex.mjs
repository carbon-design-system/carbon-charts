import fs from 'fs'
import path from 'path'
import { JSDOM } from 'jsdom'

// Define the path to the main.tsx file and the routes directory
const mainFilePath = path.resolve('src/main.tsx')
const routesDirPath = path.resolve('src/routes')

// Read and parse the main.tsx file to extract routes
const mainFileContent = fs.readFileSync(mainFilePath, 'utf-8')
const routePattern = /<Route\s+path="([^"]+)"\s+element={<([A-Za-z]+)\s*\/>}/g

const routes = []
let match
while ((match = routePattern.exec(mainFileContent)) !== null) {
	routes.push({ path: match[1], component: match[2] })
}

// Function to extract titles from examples array
function extractTitlesFromExamples(libFilePath) {
	const titles = []
	if (fs.existsSync(libFilePath)) {
		const libContent = fs.readFileSync(libFilePath, 'utf-8')
		const titlePattern = /title:\s*'([^']+)'/g
		let titleMatch
		while ((titleMatch = titlePattern.exec(libContent)) !== null) {
			titles.push(titleMatch[1])
		}
	}
	return titles
}

// Extract the title and text from each route component
const pages = routes
	.filter(route => route.path !== '/' && route.path !== '*')
	.map(route => {
		const componentFilePath = path.resolve(routesDirPath, `${route.component}.tsx`)
		const componentContent = fs.readFileSync(componentFilePath, 'utf-8')

		// Extract the title
		let titleMatch = componentContent.match(/<PageHeader\s+title="([^"]+)"\s*\/>/)
		let title = titleMatch ? titleMatch[1] : null

		// Handle components using ConfigPage
		if (!title) {
			titleMatch = componentContent.match(/<ConfigPage\s+[^>]*title="([^"]+)"[^>]*>/)
			title = titleMatch ? titleMatch[1] : 'No title found'
		}

		// Extract the text content
		let textContent = ''
		const dom = new JSDOM(componentContent)

		if (titleMatch && titleMatch[0].includes('ConfigPage')) {
			const overviewMatch = componentContent.match(/overview="([^"]+)"/)
			textContent = overviewMatch ? overviewMatch[1] : 'No overview found'
		} else {
			textContent = Array.from(dom.window.document.body.querySelectorAll('p'))
				.map(
					p =>
						p.textContent
							.replace(/[\t\n]/g, ' ')
							.replace(/\{\s*'\s*'\s*\}/g, ' ')
							.replace(/\s+/g, ' ') // Ensure no double spaces
							.replace(/\s\./g, '.') // Remove spaces before periods
							.trim() // Remove any leading/trailing spaces
				)
				.join(' ')
				.trim() // Remove any trailing space after joining
		}

		// Extract titles from '../lib' imports
		let charts = []
		const libImportMatches =
			componentContent.match(/import\s+{[^}]*examples[^}]*}\s+from\s+'..\/lib\/[^']+'/g) || []

		libImportMatches.forEach(importMatch => {
			const libImportPathMatch = importMatch.match(/from\s+'..\/lib\/([^']+)'/)
			if (libImportPathMatch) {
				let libFilePath = path.resolve(routesDirPath, `../lib/${libImportPathMatch[1]}.ts`)
				if (!fs.existsSync(libFilePath)) {
					libFilePath = path.resolve(routesDirPath, `../lib/${libImportPathMatch[1]}/index.ts`)
				}
				const extractedTitles = extractTitlesFromExamples(libFilePath)
				charts = charts.concat(extractedTitles)
			}
		})

		return { path: route.path, title, text: textContent, charts }
	})

// Write the output to a JSON file
const outputFilePath = path.resolve('searchindex.json')
fs.writeFileSync(outputFilePath, JSON.stringify(pages, null, 2))

console.log('JSON file generated successfully:', outputFilePath)
