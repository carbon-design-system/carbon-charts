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
				group: "group",
				value: Math.floor(Math.random() * (max - min + 1) + min),
				date: new Date(now.valueOf() + (index - quantity) * 60000) // go forward a minute for every value
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
	const form = container.querySelector("form#demo-data");
	if (form) {
		form.addEventListener("submit", (e: any) => {
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
