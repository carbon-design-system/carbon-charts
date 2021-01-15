import * as Configuration from '../src/configuration';

const generateThemePickerHTML = (container) => {
	const div = document.createElement('div');
	div.id = 'theme-picker';
	div.innerHTML = `
<fieldset class="bx--fieldset marginTop-30">
	<div class="bx--form-item">
		<div class="bx--radio-button-group ">
			<div class="bx--radio-button-wrapper">
				<input id="radio-button-abfeuherm2f-1" class="bx--radio-button" type="radio" value="white" name="radio-button" tabindex="0">
				<label for="radio-button-abfeuherm2f-1" class="bx--radio-button__label">
				<span class="bx--radio-button__appearance"></span>
				<span class="bx--radio-button__label-text">White</span>
				</label>
			</div>
			<div class="bx--radio-button-wrapper">
				<input id="radio-button-abfeuherm2f-2" class="bx--radio-button" type="radio" value="g10" name="radio-button" tabindex="0">
				<label for="radio-button-abfeuherm2f-2" class="bx--radio-button__label">
				<span class="bx--radio-button__appearance"></span>
				<span class="bx--radio-button__label-text">G10</span>
				</label>
			</div>
			<div class="bx--radio-button-wrapper">
				<input id="radio-button-abfeuherm2f-3" class="bx--radio-button" type="radio" value="g90" name="radio-button" tabindex="0">
				<label for="radio-button-abfeuherm2f-3" class="bx--radio-button__label">
				<span class="bx--radio-button__appearance"></span>
				<span class="bx--radio-button__label-text">G90</span>
				</label>
			</div>
			<div class="bx--radio-button-wrapper">
				<input id="radio-button-abfeuherm2f-4" class="bx--radio-button" type="radio" value="g100" name="radio-button" tabindex="0" checked>
				<label for="radio-button-abfeuherm2f-4" class="bx--radio-button__label">
				<span class="bx--radio-button__appearance"></span>
				<span class="bx--radio-button__label-text">G100</span>
				</label>
			</div>
		</div>
	</div>
</fieldset>`;

	container.querySelector('#charting-controls').appendChild(div);
};

const colorPairingOptions = Configuration.color.pairingOptions;
const generateColorPalettePickerHTML = (container, chart) => {
	const chartOptions = chart.model.getOptions();
	const { numberOfVariants: variants, option } = chartOptions.color.pairing;
	const numberOfVariants =
		variants || chart.model.getAllDataGroupsNames().length;

	let onlyCategoricalPaletteIsApplicable = false;
	if (chart.model.getAllDataGroupsNames().length > 5) {
		onlyCategoricalPaletteIsApplicable = true;
	}

	const selectedColorPalette = `${numberOfVariants}-${option}`;

	const div = document.createElement('div');
	div.id = 'color-palette-picker';
	div.innerHTML = `
<div class="bx--form-item">
	<div
	class="bx--select">
	<label for="select-id" class="bx--label">Color palette</label>
		<div class="bx--select-input__wrapper">
		<select id="color-palette-select" class="bx--select-input">
			<option class="bx--select-option" value="" disabled selected hidden>
			Choose an option
			</option>
			${Object.keys(colorPairingOptions)
				.map((colorGroup) => {
					const optionsCount = colorPairingOptions[colorGroup];
					let optionsHTML = `<optgroup class="bx--select-optgroup" label="${colorGroup} groups">`;

					const numberOfVariants = parseInt(colorGroup);
					if (numberOfVariants !== 14) {
						for (let i = 1; i <= optionsCount; i++) {
							optionsHTML += `
						<option class="bx--select-option" ${
							onlyCategoricalPaletteIsApplicable ? 'disabled' : ''
						} value="${colorGroup}-option-${i}" ${
								selectedColorPalette ===
								`${numberOfVariants}-${i}`
									? 'selected'
									: ''
							}>
							${numberOfVariants}-color groups, option ${i}
						</option>`;
						}
					} else {
						optionsHTML += `<option class="bx--select-option" value="14-color-option-1" ${
							selectedColorPalette === `14-1` ||
							onlyCategoricalPaletteIsApplicable
								? 'selected'
								: ''
						}>
						Categorical palette
					</option>`;
					}

					return optionsHTML;
				})
				.join('')}
		</select>
		<svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path></svg>
		</div>
	</div>
	</div>
</div>`;

	div.querySelector('#color-palette-select').addEventListener(
		'change',
		(e: any) => {
			const { value } = e.target;
			const [numberOfVariants, pairingOption] = value.split(
				'-color-option-'
			);

			chartOptions.color.pairing.numberOfVariants = numberOfVariants;
			chartOptions.color.pairing.option = pairingOption;
			chart.model.setOptions(chartOptions);
		}
	);

	container.querySelector('#charting-controls').appendChild(div);
};

export const addControls = (container, chart) => {
	generateThemePickerHTML(container);
	generateColorPalettePickerHTML(container, chart);

	addRadioButtonEventListeners(container, chart);
};

export const addRadioButtonEventListeners = (container, chart) => {
	// Add event listeners for radio buttons
	const radioButtons = container.querySelectorAll(
		'div#theme-picker input.bx--radio-button'
	);
	radioButtons.forEach((radioButton) => {
		radioButton.addEventListener('click', (e: any) => {
			const theme = e.target.value;
			container.setAttribute('class', `container theme--${theme}`);

			chart.update();
		});
	});
};

/**
 * Generates random data going backwards from now once a minute
 * @param {number} quantity number of data points to create
 * @param {number} min min range of integer value
 * @param {number} max max range of integer value
 * @returns {array} randomly generated array of objects with a date and value field
 */
export const generateRandomData = (quantity, min, max) => {
	const now = Date.now();
	return Array(quantity)
		.fill(0)
		.map((value, index) => {
			return {
				group: 'group',
				value: Math.floor(Math.random() * (max - min + 1) + min),
				date: new Date(now.valueOf() + (index - quantity) * 60000), // go forward a minute for every value
			};
		});
};
/**
 * Adds a generate demo data form to the story
 */
export const generateHighScaleDemoDataForm = () =>
	`<form id="demo-data"><label for="demo-data-name">Records to generate: </label><input type="number" id="demo-data-number" name="number" required
	 size="5" value="100"><input type="submit"></label></form>`;
export const addDemoDataFormListeners = (container, demo, chart) => {
	// Add event listeners for form
	const form = container.querySelector('form#demo-data');
	if (form) {
		form.addEventListener('submit', (e: any) => {
			e.stopPropagation();
			e.preventDefault();
			const recordsToGenerate =
				parseInt(e.currentTarget[0].value) || 2000;
			chart.model.setData(
				generateRandomData(recordsToGenerate, 100, 500)
			);
			chart.update();
		});
	}
};
