const generateThemePickerHTML = (container: HTMLDivElement) => {
	const div = document.createElement('div')
	div.id = 'theme-picker'
	div.innerHTML = `
		<fieldset class="cds--fieldset marginTop-45">
			<legend class="cds--label">Active theme</legend>

			<div class="cds--form-item">
				<div class="cds--radio-button-group">
					<div class="cds--radio-button-wrapper">
						<input id="theme__white" class="cds--radio-button" type="radio" value="white" name="radio-button" tabindex="0">
						<label for="theme__white" class="cds--radio-button__label">
							<span class="cds--radio-button__appearance"></span>
							<span class="cds--radio-button__label-text">White</span>
						</label>
					</div>

					<div class="cds--radio-button-wrapper">
						<input id="theme__g10" class="cds--radio-button" type="radio" value="g10" name="radio-button" tabindex="0">
						<label for="theme__g10" class="cds--radio-button__label">
							<span class="cds--radio-button__appearance"></span>
							<span class="cds--radio-button__label-text">G10</span>
						</label>
					</div>

					<div class="cds--radio-button-wrapper">
						<input id="theme__g90" class="cds--radio-button" type="radio" value="g90" name="radio-button" tabindex="0">
						<label for="theme__g90" class="cds--radio-button__label">
							<span class="cds--radio-button__appearance"></span>
							<span class="cds--radio-button__label-text">G90</span>
						</label>
					</div>

					<div class="cds--radio-button-wrapper">
						<input id="theme__g100" class="cds--radio-button" type="radio" value="g100" name="radio-button" tabindex="0">
						<label for="theme__g100" class="cds--radio-button__label">
							<span class="cds--radio-button__appearance"></span>
							<span class="cds--radio-button__label-text">G100</span>
						</label>
					</div>
				</div>
			</div>
		</fieldset>`

	const currentTheme = document.documentElement.getAttribute('data-carbon-theme')
	if (currentTheme) {
		div.querySelector(`input#theme__${currentTheme}`)?.setAttribute('checked', 'true')
	} else {
		div.querySelector(`input#theme__white`)?.setAttribute('checked', 'true')
	}

	container.querySelector('#charting-controls')?.appendChild(div)
}

const generateColorPalettePickerHTML = (
	container: HTMLDivElement,
	chart: any,
	configs = { colorPairingOptions: null }
) => {
	const { colorPairingOptions } = configs

	const chartOptions = chart.model.getOptions()
	const { numberOfVariants: variants, option } = chartOptions.color.pairing

	const numberOfChartDataGroups = chart.model.getAllDataGroupsNames().length
	const numberOfVariants = variants || numberOfChartDataGroups

	let onlyCategoricalPaletteIsApplicable = false
	if (numberOfChartDataGroups > 5) {
		onlyCategoricalPaletteIsApplicable = true
	}

	const selectedColorPalette = `${numberOfVariants}-${option}`

	const div = document.createElement('div')
	div.id = 'color-palette-picker'
	div.innerHTML = `
		<div class="cds--form-item">
			<div class="cds--select">
				<label for="color-palette-select" class="cds--label">Active color palette</label>
				<div class="cds--select-input__wrapper">
					<select id="color-palette-select" class="cds--select-input">
						<option class="cds--select-option" value="" disabled selected hidden>
						Choose an option
						</option>
					${
						colorPairingOptions
							? Object.keys(colorPairingOptions)
									.map((colorGroup) => {
										const optionsCount: number = colorPairingOptions
											? colorPairingOptions[colorGroup]
											: 0
										let optionsHTML = `<optgroup class="cds--select-optgroup" label="${colorGroup} groups">`

										const numberOfVariants = parseInt(colorGroup)

										if (numberOfVariants !== 14) {
											for (let i = 1; i <= optionsCount; i++) {
												optionsHTML += `
								<option class="cds--select-option" ${
									onlyCategoricalPaletteIsApplicable || numberOfVariants < numberOfChartDataGroups
										? 'disabled'
										: ''
								} value="${colorGroup}-option-${i}" ${
													selectedColorPalette === `${numberOfVariants}-${i}` ? 'selected' : ''
												}>
									${numberOfVariants}-color groups, option ${i}
								</option>`
											}
										} else {
											optionsHTML += `<option class="cds--select-option" value="14-color-option-1" ${
												selectedColorPalette === `14-1` || onlyCategoricalPaletteIsApplicable
													? 'selected'
													: ''
											}>
								Categorical palette
							</option>`
										}

										return optionsHTML
									})
									.join('')
							: ''
					}
						</select>
						<svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="cds--select__arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path></svg>
					</div>
				</div>
			</div>
		</div>`

	div?.querySelector('#color-palette-select')?.addEventListener('change', (e: any) => {
		const { value } = e.target
		const [numberOfVariants, pairingOption] = value.split('-color-option-')

		chartOptions.color.pairing.numberOfVariants = numberOfVariants
		chartOptions.color.pairing.option = pairingOption
		chart.model.setOptions(chartOptions)
	})

	container?.querySelector('#charting-controls')?.appendChild(div)
}

export const addControls = (
	container: HTMLDivElement,
	demoGroup: any,
	chart: any,
	configs: { colorPairingOptions: any } = { colorPairingOptions: null }
) => {
	generateThemePickerHTML(container)

	if (demoGroup?.configs?.excludeColorPaletteControl !== true) {
		generateColorPalettePickerHTML(container, chart, configs)
	}

	addRadioButtonEventListeners(container, chart)
}

export const addRadioButtonEventListeners = (
	container: HTMLDivElement,
	chart: any
) => {
	// Add event listeners for radio buttons
	const radioButtons = container.querySelectorAll('div#theme-picker input.cds--radio-button')

	const currentTheme = document.documentElement.getAttribute('data-carbon-theme')
	if (currentTheme) {
		chart.services.domUtils.getHolder().setAttribute('data-carbon-theme', currentTheme)
	}

	radioButtons.forEach((radioButton) => {
		radioButton.addEventListener('click', (e: any) => {
			const theme = e.target.value

			document.documentElement.setAttribute('data-carbon-theme', theme)
			// Set selected theme to options
			chart.model.setOptions({ ...chart.model.getOptions(), theme })
		})
	})
}

export const addOtherVersions = (
	container: HTMLElement,
	demoGroup: any,
	demo: any,
	configs = { currentVersion: 'vanilla' }
) => {
	const { currentVersion } = configs

	const demoGroupClassification = (demoGroup.type || '').replace('-chart', '')

	const div = document.createElement('div')
	div.setAttribute('class', 'cds--row resource-card-group')

	let htmlContent = ''
	const otherVersions = [
		...(currentVersion !== 'vanilla'
			? [
					{
						name: 'Vanilla JavaScript',
						link: `https://carbon-design-system.github.io/carbon-charts/?path=/story/${demoGroupClassification}-charts-${demo.id}`
					}
				]
			: []),
		...(currentVersion !== 'react'
			? [
					{
						name: 'React',
						link: `https://carbon-design-system.github.io/carbon-charts/react/?path=/story/${demoGroupClassification}-charts-${demo.id}`
					}
				]
			: []),
		...(currentVersion !== 'angular'
			? [
					{
						name: 'Angular',
						link: `https://carbon-design-system.github.io/carbon-charts/angular/?path=/story/${demoGroupClassification}-charts-${demo.id}`
					}
				]
			: []),
		...(currentVersion !== 'vue'
			? [
					{
						name: 'Vue',
						link: `https://carbon-design-system.github.io/carbon-charts/vue/?path=/story/${demoGroupClassification}-charts-${demo.id}`
					}
				]
			: []),
		...(currentVersion !== 'svelte'
			? [
					{
						name: 'Svelte',
						link: `https://carbon-design-system.github.io/carbon-charts/svelte/?path=/story/${demoGroupClassification}-charts-${demo.id}`
					}
				]
			: [])
	]

	otherVersions.forEach((otherVersion) => {
		htmlContent += `<div class="cds--no-gutter-sm cds--col-md-6 cds--col-lg-6">
		<div class="cds--resource-card">
		  <div class="cds--aspect-ratio cds--aspect-ratio--2x1">
			<div class="cds--aspect-ratio--object">
			  <a href="${otherVersion.link}" class="cds--tile cds--tile--clickable">
				<h5 class="cds--resource-card__subtitle">${otherVersion.name}</h5>
				<div class="cds--resource-card__icon--img"></div>
				<div class="cds--resource-card__icon--action">
				  <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-label="Open resource" width="20" height="20" viewBox="0 0 32 32" role="img">
					<path d="M26,28H6a2.0027,2.0027,0,0,1-2-2V6A2.0027,2.0027,0,0,1,6,4H16V6H6V26H26V16h2V26A2.0027,2.0027,0,0,1,26,28Z"></path>
					<path d="M20 2L20 4 26.586 4 18 12.586 19.414 14 28 5.414 28 12 30 12 30 2 20 2z"></path>
				  </svg>
				</div>
			  </a>
			</div>
		  </div>
		</div>
	  </div>`
	})

	div.innerHTML = htmlContent
	container?.querySelector('#other-versions')?.appendChild(div)
}

/**
 * Generates random data going backwards from now once a minute
 * @param {number} quantity number of data points to create
 * @param {number} min min range of integer value
 * @param {number} max max range of integer value
 * @returns {array} randomly generated array of objects with a date and value field
 */
export const generateRandomData = (quantity: number, min: number, max: number) => {
	const now = Date.now()
	return Array(quantity)
		.fill(0)
		.map((value: number, index: number) => {
			return {
				group: 'group',
				value: Math.floor(Math.random() * (max - min + 1) + min),
				date: new Date(now.valueOf() + (index - quantity) * 60000) // go forward a minute for every value
			}
		})
}
/**
 * Adds a generate demo data form to the story
 */
export const generateHighScaleDemoDataForm = () =>
	`<form id="demo-data">
		<label for="demo-data-name">Records to generate: </label>
		<input type="number" id="demo-data-number" name="number" required size="5" value="100">
		<input type="submit">
	</form>`

export const addDemoDataFormListeners = (container: HTMLElement, demo: any, chart: any) => {
	// Add event listeners for form
	const form = container.querySelector('form#demo-data')
	if (form) {
		form.addEventListener('submit', (e: any) => {
			e.stopPropagation()
			e.preventDefault()
			const recordsToGenerate = parseInt(e.currentTarget[0].value) || 2000
			chart.model.setData(generateRandomData(recordsToGenerate, 100, 500))
			chart.update()
		})
	}
}
