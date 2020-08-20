export const generateStoryHeader = (chartType, options) => `
<h3>
	<b class="component">Component:</b>
	<span class="bx--tag bx--tag--green component-name">${chartType}</span>
</h3>
<p class="props">
	<span><b>Props: </b><span>data, </span><a href="https://carbon-design-system.github.io/carbon-charts/documentation/modules/_interfaces_charts_.html" target="_blank">options</a></span>
</p>

${
	options
		? `
<div data-notification
  class="bx--inline-notification bx--inline-notification--warning"
  role="alert">
  <div class="bx--inline-notification__details">
    <svg focusable="false" preserveAspectRatio="xMidYMid meet" style="will-change: transform;" xmlns="http://www.w3.org/2000/svg" class="bx--inline-notification__icon" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M10,1c-5,0-9,4-9,9s4,9,9,9s9-4,9-9S15,1,10,1z M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1	s1,0.4,1,1S10.6,16,10,16z"></path><path d="M9.2,5h1.5v7H9.2V5z M10,16c-0.6,0-1-0.4-1-1s0.4-1,1-1s1,0.4,1,1S10.6,16,10,16z" data-icon-path="inner-path" opacity="0"></path></svg>
    <div class="bx--inline-notification__text-wrapper">
      <p class="bx--inline-notification__title">Alpha release</p>
      <p class="bx--inline-notification__subtitle">This is not a stable release of this component, certain pieces might be added or modified in the future. Additionally, the current implementation might have issues that we have not uncovered yet, and will work to resolve through our stable release of the component.</p>
    </div>
  </div>
</div>`
		: ""
}`;

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
