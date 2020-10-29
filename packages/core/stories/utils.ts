export const generateThemePickerHTML = () => `
<div id="theme-picker">
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
	</fieldset>
</div>`;

export const generateColorPalettePickerHTML = () => `
<div id="theme-picker">
	<div class="bx--form-item">
		<div
		class="bx--select">
		<label for="select-id" class="bx--label">Color palette</label>
			<div class="bx--select-input__wrapper" >
			<select id="select-id" class="bx--select-input">
				<option class="bx--select-option" value=""  disabled selected hidden>
				Choose an option
				</option>
				<optgroup class="bx--select-optgroup" label="1-Color groups">
				<option class="bx--select-option" value="option1" >
					Option 1
				</option>
				<option class="bx--select-option" value="option2" >
					Option 2
				</option>
				<option class="bx--select-option" value="option2" >
					Option 3
				</option>
				<option class="bx--select-option" value="option2" >
					Option 4
				</option>
				</optgroup>
				<optgroup class="bx--select-optgroup" label="2-Color groups">
				<option class="bx--select-option" value="option1" >
					Option 1
				</option>
				<option class="bx--select-option" value="option2" >
					Option 2
				</option>
				</optgroup>
				<optgroup class="bx--select-optgroup" label="3-Color groups">
				<option class="bx--select-option" value="option1" >
					Option 1
				</option>
				<option class="bx--select-option" value="option2" >
					Option 2
				</option>
				</optgroup>
				<optgroup class="bx--select-optgroup" label="4-Color groups">
				<option class="bx--select-option" value="option1" >
					Option 1
				</option>
				<option class="bx--select-option" value="option2" >
					Option 2
				</option>
				</optgroup>
				<optgroup class="bx--select-optgroup" label="5-Color groups">
				<option class="bx--select-option" value="option1" >
					Option 1
				</option>
				<option class="bx--select-option" value="option2" >
					Option 2
				</option>
				</optgroup>
				<optgroup class="bx--select-optgroup" label="14-Color groups">
					<option class="bx--select-option" value="option1" >
						Categorical palette
					</option>
				</optgroup>
			</select>
			<svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--select__arrow" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 11L3 6 3.7 5.3 8 9.6 12.3 5.3 13 6z"></path></svg>
			</div>
		</div>
		</div>
	</div>
</div>`;

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
