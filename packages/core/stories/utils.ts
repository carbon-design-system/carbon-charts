import * as Configuration from "../src/configuration";

const generateThemePickerHTML = (container) => {
	const div = document.createElement("div");
	div.id = "theme-picker";
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

	container.querySelector("#charting-controls").appendChild(div);
};

const colorPairingOptions = Configuration.color.pairingOptions;
const generateColorPalettePickerHTML = (container, chart) => {
	const chartOptions = chart.model.getOptions();
	const { numberOfVariants: variants, option } = chartOptions.color.pairing;
	const numberOfVariants =
		variants || chart.model.getAllDataGroupsNames().length;

	const selectedColorPalette = `${numberOfVariants}-${option}`;

	const div = document.createElement("div");
	div.id = "color-palette-picker";
	div.innerHTML = `
<div class="bx--form-item">
	<div
	class="bx--select">
	<label for="select-id" class="bx--label">Color palette</label>
		<div class="bx--select-input__wrapper" >
		<select id="color-palette-select" class="bx--select-input">
			<option class="bx--select-option" value=""  disabled selected hidden>
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
						<option class="bx--select-option" value="${colorGroup}-option-${i}" ${
								selectedColorPalette ===
								`${numberOfVariants}-${i}`
									? "selected"
									: ""
							}>
							Option ${i}
						</option>`;
						}
					} else {
						optionsHTML += `<option class="bx--select-option" value="14-color-option-1" ${
							selectedColorPalette === `14-1` ? "selected" : ""
						}>
						Categorical palette
					</option>`;
					}

					return optionsHTML;
				})
				.join("")}
		</select>
		<svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path></svg>
		</div>
	</div>
	</div>
</div>`;

	div.querySelector("#color-palette-select").addEventListener(
		"change",
		(e: any) => {
			const { value } = e.target;
			const [numberOfVariants, pairingOption] = value.split(
				"-color-option-"
			);

			chartOptions.color.pairing.numberOfVariants = numberOfVariants;
			chartOptions.color.pairing.option = pairingOption;
			chart.model.setOptions(chartOptions);
		}
	);

	container.querySelector("#charting-controls").appendChild(div);
};

export const addControls = (container, chart) => {
	generateThemePickerHTML(container);
	generateColorPalettePickerHTML(container, chart);

	addRadioButtonEventListeners(container);
};

export const addRadioButtonEventListeners = (container) => {
	// Add event listeners for radio buttons
	const radioButtons = container.querySelectorAll(
		"div#theme-picker input.bx--radio-button"
	);
	radioButtons.forEach((radioButton) => {
		radioButton.addEventListener("click", (e: any) => {
			const theme = e.target.value;
			container.setAttribute("class", `container theme--${theme}`);
		});
	});
};
