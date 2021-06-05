import { storiesOf, moduleMetadata } from "@storybook/angular";
import { CardNodeModule } from "./card-node.module";
import { ScreenModule } from "@carbon/icons-angular";
import { DialogModule } from "carbon-components-angular";

const getTemplate = demo => `
	<div class="container theme--white" style="max-width: 400px; margin: 2rem">
		${demo}
	</div>
`;

storiesOf("Diagrams|Nodes/Card", module)
.addDecorator(
	moduleMetadata({
		imports: [CardNodeModule, ScreenModule, DialogModule]
	})
)
.add("Default", () => ({
	template: getTemplate(`<ibm-diagram-card-node [title]="title" [subtitle]="description"></ibm-diagram-card-node>`),
	props: {
		title: "Title",
		description: "Description"
	},
}))
.add("Stacked", () => ({
	template: getTemplate(`<ibm-diagram-card-node [title]="title" [subtitle]="description" [stacked]="stacked"></ibm-diagram-card-node>`),
	props: {
		title: "Title",
		description: "Description",
		stacked: true
	},
}))
.add("Color", () => ({
	template: getTemplate(`<ibm-diagram-card-node [title]="title" [subtitle]="description" [color]="color"></ibm-diagram-card-node>`),
	props: {
		title: "Title",
		description: "Description",
		color: "#8a3ffc"
	},
}))
.add("With icon", () => ({
	template: getTemplate(`
	<ibm-diagram-card-node [title]="title" [subtitle]="description" [renderIcon]="iconTemplate"></ibm-diagram-card-node>
	<ng-template #iconTemplate>
		<svg ibmIconScreen size="16"></svg>
	</ng-template>
	`),
	props: {
		title: "Title",
		description: "Description"
	},
}))
.add("With label", () => ({
	template: getTemplate(`<ibm-diagram-card-node [title]="title" [subtitle]="description" [label]="label"></ibm-diagram-card-node>`),
	props: {
		title: "Title",
		description: "Description",
		label: "Label"
	},
}))
.add("With action", () => ({
	template: getTemplate(`
		<ibm-diagram-card-node [title]="title" [subtitle]="description" [label]="label" [renderAction]="actionTemplate"></ibm-diagram-card-node>
		<ng-template #actionTemplate>
			<ibm-overflow-menu>
				<ibm-overflow-menu-option>
					Stop app
				</ibm-overflow-menu-option>
				<ibm-overflow-menu-option>
					Restart app
				</ibm-overflow-menu-option>
				<ibm-overflow-menu-option>
					Rename app
				</ibm-overflow-menu-option>
				<ibm-overflow-menu-option>
					Edit routes and access
				</ibm-overflow-menu-option>
				<ibm-overflow-menu-option type="danger">
					Delete app
				</ibm-overflow-menu-option>
			</ibm-overflow-menu>
		</ng-template>
	`),
	props: {
		title: "Title",
		description: "Description",
		label: "Label"
	},
}))
;
