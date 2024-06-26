export const fetchVersion = async (): Promise<string> => {
	try {
		const response = await fetch(
			'https://raw.githubusercontent.com/carbon-design-system/carbon-charts/master/packages/react/package.json'
		)
		if (!response.ok) throw new Error('Network response was not ok')

		const data = (await response.json()) as { version: string }

		if (typeof data.version !== 'string') {
			throw new Error('Invalid response structure')
		}

		return data.version.replace('^', '') // Clean up version string if necessary
	} catch (error) {
		console.error('Error fetching version:', error)
		return 'Error' // Return a default or error indication as needed
	}
}
