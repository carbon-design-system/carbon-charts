import { extent, scaleLinear, scaleQuantize } from 'd3'
import { isEmpty } from 'lodash-es'
import { getProperty } from '@/tools'

/**
 * Custom domain configuration for color scales
 */
export interface ColorDomainOptions {
	min?: number
	max?: number
}

/**
 * Calculate the domain for a color scale from data values
 * @param data - Array of data objects with value property
 * @param customDomain - Optional explicit min/max values to override calculated domain
 * @returns [min, max] domain array
 */
export function getDomain(data: any, customDomain?: ColorDomainOptions) {
	const limits = extent(data, (d: any) => d.value)
	const domain = scaleLinear()
		.domain(limits as [number, number])
		.nice()
		.domain()

	// Ensuring limits start at 0 to make scale look more `nicer`
	if (domain[0] > 0) {
		domain[0] = 0
	} else if (domain[0] === 0 && domain[1] === 0) {
		// Range cannot be between 0 and 0 (itself)
		domain[0] = 0
		domain[1] = 1
	}

	// Ensure the median of the range is 0 if domain extends into both negative & positive
	if (domain[0] < 0 && domain[1] > 0) {
		if (Math.abs(domain[0]) > domain[1]) {
			domain[1] = Math.abs(domain[0])
		} else {
			domain[0] = -domain[1]
		}
	}

	// Apply custom domain overrides if provided
	if (customDomain) {
		if (typeof customDomain.min === 'number') {
			domain[0] = customDomain.min
		}
		if (typeof customDomain.max === 'number') {
			domain[1] = customDomain.max
		}
	}

	return domain
}

export function getColorScale(displayData: any, colorOptions: any, customDomain?: ColorDomainOptions) {
	const customColors = getProperty(colorOptions, 'gradient', 'colors')
	const customColorsEnabled = !isEmpty(customColors)

	let colorPairingOption = getProperty(colorOptions, 'pairing', 'option')

	// If domain consists of negative and positive values, use diverging palettes
	const domain = getDomain(displayData, customDomain)
	const colorScheme = domain[0] < 0 && domain[1] > 0 ? 'diverge' : 'mono'

	// Use default color pairing options if not in defined range
	if (colorPairingOption < 1 && colorPairingOption > 4 && colorScheme === 'mono') {
		colorPairingOption = 1
	} else if (colorPairingOption < 1 && colorPairingOption > 2 && colorScheme === 'diverge') {
		colorPairingOption = 1
	}

	// Uses CSS classes for fill
	const colorPairing = customColorsEnabled ? customColors : []

	if (!customColorsEnabled) {
		// Add class names to list and the amount based on the color scheme
		// Carbon charts has 11 colors for a single monochromatic palette & 17 for a divergent palette
		const colorGroupingLength = colorScheme === 'diverge' ? 17 : 11
		for (let i = 1; i < colorGroupingLength + 1; i++) {
			colorPairing.push(`fill-${colorScheme}-${colorPairingOption}-${i}`)
		}
	}

	// Return generated color scale
	return scaleQuantize()
		.domain(domain as [number, number])
		.range(colorPairing)
}
