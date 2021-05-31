import { storiesOf, moduleMetadata } from "@storybook/angular";
import { CircleModule } from "./circle.module";
import { ScreenModule } from "@carbon/icons-angular";

const getTemplate = demo => `
	<div class="container theme--white">
		${demo}
	</div>
`;

storiesOf("Experimental|Circle", module)
.addDecorator(
	moduleMetadata({
		imports: [CircleModule, ScreenModule]
	})
)
.add("Default", () => ({
	template: getTemplate(`
		<div>
			<ibm-graph-circle [title]="title" [renderIcon]="iconTemplate"></ibm-graph-circle>
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
			<ibm-graph-circle [title]="title" [renderIcon]="iconTemplate" [size]="'100%'"></ibm-graph-circle>
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
