import { storiesOf, moduleMetadata } from "@storybook/angular";
import { CardModule } from "./card.module";
import { ScreenModule } from "@carbon/icons-angular";

const getTemplate = demo => `
	<div class="container theme--white">
		${demo}
	</div>
`;

storiesOf("Experimental|Card", module)
.addDecorator(
	moduleMetadata({
		imports: [CardModule, ScreenModule]
	})
)
.add("Default", () => ({
	template: getTemplate(`<ibm-graph-card [title]="title" [description]="description"></ibm-graph-card>`),
	props: {
		title: "Title",
		description: "Description"
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
}));
