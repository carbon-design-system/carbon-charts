import { NeutrinoSeedPage } from "./app.po";

describe("neutrino-seed App", () => {
	let page: NeutrinoSeedPage;

	beforeEach(() => {
		page = new NeutrinoSeedPage();
	});

	it("should display message saying app works", () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual("app works!");
	});
});
