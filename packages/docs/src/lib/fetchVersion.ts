export const fetchVersion = async () => {
	try {
		const response = await fetch(
			'https://raw.githubusercontent.com/carbon-design-system/carbon-charts/master/packages/react/package.json'
		)
		if (!response.ok) throw new Error('Network response was not ok')
		const { version } : { version: string } = await response.json()
		return version.replace('^', '') // Clean up version string if necessary
	} catch (error) {
		console.error('Error fetching version:', error)
		return 'Error' // Return a default or error indication as needed
	}
}

