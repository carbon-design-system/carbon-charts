import { getComponentContainer, TestEnvironment } from "../../tests/index";

import { Title } from "../index";

describe("title component", () => {
	beforeEach(function() {
		const testEnvironment = new TestEnvironment();
		testEnvironment.render();

		this._chart = testEnvironment.getChartReference();
		this._testEnvironment = testEnvironment;
	});

	describe("content", () => {
		it("should match text provided in options", function() {
			const sampleTitle = "My chart";

			const newOptions = Object.assign(
				this._chart.model.getOptions(),
				{ title: sampleTitle }
			);
			this._chart.model.setOptions(newOptions);

			const title = getComponentContainer(Title);
			expect(title.querySelector("text").innerHTML).toEqual(sampleTitle);
		});
	});

	afterEach(function() {
		this._testEnvironment.destroy();
	});
});
