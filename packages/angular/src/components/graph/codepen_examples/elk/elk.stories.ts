import { storiesOf, moduleMetadata } from "@storybook/angular";
import { ElkModule } from "./elk.module";

const getTemplate = demo => `
	<div class="container theme--white" style="max-width: 400px; margin: 2rem">
		${demo}
	</div>
`;

const size = 48;

const nodeData = [
	{ id: "a", height: size, width: size, borderSpacing: "100" },
	{ id: "b", height: size, width: size, borderSpacing: "100" },
	{ id: "c", height: size, width: size, borderSpacing: "100" },
	{ id: "d", height: size, width: size, borderSpacing: "100" },
	{ id: "e", height: size, width: size, borderSpacing: "100" },
	{ id: "f", height: size, width: size, borderSpacing: "100" },
	{ id: "g", height: size, width: size, borderSpacing: "100" },
	{ id: "h", height: size, width: size, borderSpacing: "100" },
];

const linkData = [
	{ id: "1", source: "a", target: "b" },
	{ id: "2", source: "c", target: "b" },
	{ id: "3", source: "d", target: "e" },
	{ id: "4", source: "d", target: "b" },
	{ id: "5", source: "b", target: "f" },
	{ id: "6", source: "g", target: "h" },
	{ id: "7", source: "h", target: "f" },
];

storiesOf("Diagrams|Elk", module)
.addDecorator(
	moduleMetadata({
		imports: [ElkModule]
	})
)
.add("Force", () => ({
	template: getTemplate(`
		<ibm-graph-elk [nodes]="nodeData" [links]="linkData" [layout]="layout"></ibm-graph-elk>`),
	props: {
		nodeData,
		linkData,
		layout: "force"
	},
}))
.add("Layered", () => ({
	template: getTemplate(`
		<ibm-graph-elk [nodes]="nodeData" [links]="linkData" [layout]="layout"></ibm-graph-elk>`),
	props: {
		nodeData,
		linkData,
		layout: "layered"
	},
}))
.add("Tree", () => ({
	template: getTemplate(`
		<ibm-graph-elk [nodes]="nodeData" [links]="linkData" [layout]="layout"></ibm-graph-elk>`),
	props: {
		nodeData,
		linkData,
		layout: "mrtree"
	},
}))
.add("Stress", () => ({
	template: getTemplate(`
		<ibm-graph-elk [nodes]="nodeData" [links]="linkData" [layout]="layout"></ibm-graph-elk>`),
	props: {
		nodeData,
		linkData,
		layout: "stress"
	},
}))
;
