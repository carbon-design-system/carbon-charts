import { storiesOf, moduleMetadata } from "@storybook/angular";
import { CardModule } from "./card.module";
import { ScreenModule } from "@carbon/icons-angular";
import { DialogModule } from "carbon-components-angular";

const getTemplate = demo => `
	<div class="container theme--white" style="max-width: 400px; margin: 2rem">
		${demo}
	</div>
`;

storiesOf("Experimental|Card", module)
.addDecorator(
	moduleMetadata({
		imports: [CardModule, ScreenModule, DialogModule]
	})
)
.add("Default", () => ({
	template: getTemplate(`<ibm-graph-card [title]="title" [description]="description"></ibm-graph-card>`),
	props: {
		title: "Title",
		description: "Description"
	},
}))
.add("Stacked", () => ({
	template: getTemplate(`<ibm-graph-card [title]="title" [description]="description" [stacked]="stacked"></ibm-graph-card>`),
	props: {
		title: "Title",
		description: "Description",
		stacked: true
	},
}))
.add("With icon", () => ({
	template: getTemplate(`
	<ibm-graph-card [title]="title" [description]="description" [renderIcon]="iconTemplate"></ibm-graph-card>
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
	template: getTemplate(`<ibm-graph-card [title]="title" [description]="description" [label]="label"></ibm-graph-card>`),
	props: {
		title: "Title",
		description: "Description",
		label: "Label"
	},
}))
.add("With action", () => ({
	template: getTemplate(`
		<ibm-graph-card [title]="title" [description]="description" [label]="label" [renderAction]="actionTemplate"></ibm-graph-card>
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
