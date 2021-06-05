import { storiesOf, moduleMetadata } from "@storybook/angular";
import { ShapeNodeModule } from "./shape-node.module";
import { ScreenModule } from "@carbon/icons-angular";

const getTemplate = demo => `
	<div class="container theme--white">
		${demo}
	</div>
`;

storiesOf("Diagrams|Nodes/Shape", module)
.addDecorator(
	moduleMetadata({
		imports: [ShapeNodeModule, ScreenModule]
	})
)
.add("Default", () => ({
	template: getTemplate(`
		<div>
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				<svg ibmIconScreen size="16"></svg>
			</ng-template>
		</div>
	`),
	props: {
		title: "Title",
	},
}))
.add("Inherited dimensions", () => ({
	template: getTemplate(`
		<div style="height: 64px; width: 64px">
			<ibm-diagram-shape-node [title]="title" [renderIcon]="iconTemplate" [size]="'100%'"></ibm-diagram-shape-node>
			<ng-template #iconTemplate>
				<svg ibmIconScreen size="16"></svg>
			</ng-template>
		</div>
	`),
	props: {
		title: "Title",
	},
}))
;
