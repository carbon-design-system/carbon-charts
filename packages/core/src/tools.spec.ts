import { Tools } from "./tools";

describe("Tools.getProperty", () => {
	it("works with a simple nested object containing a number > 0", () => {
		const obj = { a: { b: { c: 5 } } };

		expect(Tools.getProperty(obj, "a", "b", "c")).toEqual(5);
	});

	it("works with a simple nested object containing a 0", () => {
		const obj = { a: { b: { c: 0 } } };

		expect(Tools.getProperty(obj, "a", "b", "c")).toEqual(0);
	});

	it("works with a simple nested object containing `false`", () => {
		const obj = { a: { b: { c: false } } };

		expect(Tools.getProperty(obj, "a", "b", "c")).toEqual(false);
	});

	it("works with a simple nested object containing `true`", () => {
		const obj = { a: { b: { c: true } } };

		expect(Tools.getProperty(obj, "a", "b", "c")).toEqual(true);
	});

	it("works with a simple nested object containing a string", () => {
		const obj = { a: { b: { c: "qwerty" } } };

		expect(Tools.getProperty(obj, "a", "b", "c")).toEqual("qwerty");
	});

	it("works with a simple nested object containing an empty string", () => {
		const obj = { a: { b: { c: "" } } };

		expect(Tools.getProperty(obj, "a", "b", "c")).toEqual("");
	});
});
