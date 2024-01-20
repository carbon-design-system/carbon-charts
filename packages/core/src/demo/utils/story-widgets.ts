import { DemoGroup } from '@/demo'

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
							<span class="cds--radio-button__label-text">White (white)</span>
						</label>
					</div>

					<div class="cds--radio-button-wrapper">
						<input id="theme__g10" class="cds--radio-button" type="radio" value="g10" name="radio-button" tabindex="0">
						<label for="theme__g10" class="cds--radio-button__label">
							<span class="cds--radio-button__appearance"></span>
							<span class="cds--radio-button__label-text">Light Gray (g10)</span>
						</label>
					</div>

					<div class="cds--radio-button-wrapper">
						<input id="theme__g90" class="cds--radio-button" type="radio" value="g90" name="radio-button" tabindex="0">
						<label for="theme__g90" class="cds--radio-button__label">
							<span class="cds--radio-button__appearance"></span>
							<span class="cds--radio-button__label-text">Medium Gray (g90)</span>
						</label>
					</div>

					<div class="cds--radio-button-wrapper">
						<input id="theme__g100" class="cds--radio-button" type="radio" value="g100" name="radio-button" tabindex="0">
						<label for="theme__g100" class="cds--radio-button__label">
							<span class="cds--radio-button__appearance"></span>
							<span class="cds--radio-button__label-text">Black (g100)</span>
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

const generateProjectionPickerHTML = (container: HTMLDivElement, chart: any) => {
	const projections = [
		'geoEqualEarth',
		'geoAlbers',
		'geoConicEqualArea',
		'geoConicEquidistant',
		'geoEquirectangular',
		'geoMercator',
		'geoNaturalEarth1'
	]

	const chartOptions = chart.model.getOptions()

	const div = document.createElement('div')
	div.id = 'projection-picker'
	div.innerHTML = `
<div class="cds--form-item">
	<div class="cds--select">
		<label for="projection-select" class="cds--label">Projections</label>
		<div class="cds--select-input__wrapper">
			<select id="projection-select" class="cds--select-input">
				<option class="cds--select-option" value="" disabled selected hidden>
					Choose an option
				</option>
				${projections
					.map(projection => {
						return `<option class="cds--select-option" value="${projection}">${projection}</option>`
					})
					.join('')}

			</select>
			<svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="cds--select__arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path></svg>
		</div>
	</div>
</div>`

	div.querySelector('#projection-select').addEventListener('change', (e: any) => {
		const { value } = e.target
		chartOptions.thematic.projection = value
		chart.model.setOptions(chartOptions)
	})

	container.querySelector('#charting-controls').appendChild(div)
}

const generateColorPalettePickerHTML = (
	container: HTMLDivElement,
	chart: any,
	configs: any = { colorPairingOptions: null }
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
									.map(colorGroup => {
										const optionsCount: number = colorPairingOptions
											? colorPairingOptions[colorGroup]
											: 0
										let optionsHTML = `<optgroup class="cds--select-optgroup" label="${colorGroup} groups">`

										const numVariants = parseInt(colorGroup)

										if (numVariants !== 14) {
											for (let i = 1; i <= optionsCount; i++) {
												optionsHTML += `
								<option class="cds--select-option" ${
									onlyCategoricalPaletteIsApplicable || numVariants < numberOfChartDataGroups
										? 'disabled'
										: ''
								} value="${colorGroup}-option-${i}" ${
									selectedColorPalette === `${numVariants}-${i}` ? 'selected' : ''
								}>
									${numVariants}-color groups, option ${i}
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
		const [numVariants, pairingOption] = value.split('-color-option-')

		chartOptions.color.pairing.numberOfVariants = numVariants
		chartOptions.color.pairing.option = pairingOption
		chart.model.setOptions(chartOptions)
	})

	container?.querySelector('#charting-controls')?.appendChild(div)
}

export const addControls = (
	container: HTMLDivElement,
	demoGroup: DemoGroup,
	chart: any,
	configs: { colorPairingOptions: any } = { colorPairingOptions: null }
) => {
	// Clear out controls div
	if (container.querySelector('#charting-controls')) {
		container.querySelector('#charting-controls').innerHTML = ''
	}

	generateThemePickerHTML(container)

	if (demoGroup?.configs?.excludeColorPaletteControl !== true) {
		generateColorPalettePickerHTML(container, chart, configs)
	}

	if (demoGroup?.configs?.includeProjectionControl) {
		generateProjectionPickerHTML(container, chart)
	}

	addRadioButtonEventListeners(container, chart)
}

export const addRadioButtonEventListeners = (container: HTMLDivElement, chart: any) => {
	// Add event listeners for radio buttons
	const radioButtons = container.querySelectorAll('div#theme-picker input.cds--radio-button')

	const currentTheme = document.documentElement.getAttribute('data-carbon-theme') // || 'g100'
	if (currentTheme) {
		chart.services.domUtils.getHolder().setAttribute('data-carbon-theme', currentTheme)
	}

	radioButtons.forEach(radioButton => {
		radioButton.addEventListener('click', (e: any) => {
			const theme = e.target.value

			document.documentElement.setAttribute('data-carbon-theme', theme)
			// Set selected theme to options
			chart.model.setOptions({ ...chart.model.getOptions(), theme })
		})
	})
}

const getLink = (name: string) =>
	`https://charts.carbondesignsystem.com/${name !== 'vanilla' ? `${name}/` : ''}${
		window.parent.location.search
	}`

export const addOtherVersions = (container: HTMLElement, framework: string) => {
	let otherVersions = [
		{
			name: 'Vanilla JavaScript',
			link: getLink('vanilla')
		},
		{
			name: 'Angular',
			link: getLink('angular')
		},
		{
			name: 'React',
			link: getLink('react')
		},
		{
			name: 'Svelte',
			link: getLink('svelte')
		},
		{
			name: 'Vue',
			link: getLink('vue')
		}
	]
	otherVersions = otherVersions.filter(item => item.name !== framework)

	const div = document.createElement('div')
	div.setAttribute('class', 'cds--row resource-card-group')

	let htmlContent = ''

	otherVersions.forEach(otherVersion => {
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
