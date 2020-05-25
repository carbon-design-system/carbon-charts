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
