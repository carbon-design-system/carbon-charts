import { storiesOf, moduleMetadata } from "@storybook/angular";
import { CircleModule } from "./circle/circle.module";
import { CardModule } from "./card/card.module";
import { EdgeModule } from "./edge/edge.module";
import { UserModule, WikisModule, DebugModule } from "@carbon/icons-angular";

const nodeHeight = 64;
const nodeWidth = 200;
const circleSize = 64;

const getTemplate = demo => `
	<div class="container theme--white">
		${demo}
	</div>
`;

storiesOf("Experimental|Graph", module)
.addDecorator(
	moduleMetadata({
		imports: [CircleModule, CardModule, EdgeModule, UserModule, WikisModule, DebugModule]
	})
)
.add("Composed", () => ({
	template: getTemplate(`
		<svg height="1000" width="1000">
			<svg:g ibm-graph-edge [source]="source" [target]="target" variant="dash-sm"></svg:g>
			<svg:foreignObject style="overflow: visible" [attr.height]="nodeHeight" [attr.width]="nodeWidth" [attr.transform]="'translate(100, 100)'">
				<xhtml:div>
					<ibm-graph-card [title]="'Title'" [description]="'Description'" [renderIcon]="userTemplate"></ibm-graph-card>
				</xhtml:div>
			</svg:foreignObject>

			<svg:foreignObject style="overflow: visible" [attr.height]="nodeHeight" [attr.width]="nodeWidth" [attr.transform]="'translate(600, 100)'">
				<xhtml:div>
					<ibm-graph-circle [title]="'Title'" [size]="circleSize" [renderIcon]="wikiTemplate"></ibm-graph-circle>
				</xhtml:div>
			</svg:foreignObject>
		</svg>

		<ng-template #userTemplate>
			<svg ibmIconUser size="16"></svg>
		</ng-template>

		<ng-template #wikiTemplate>
			<svg ibmIconWikis size="16"></svg>
		</ng-template>
	`),
	props: {
		source: { x: 200, y: 132 },
		target: { x: 600, y: 132 },
		nodeHeight,
		nodeWidth,
		circleSize
	},
}))
;
