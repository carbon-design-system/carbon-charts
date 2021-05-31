import { storiesOf, moduleMetadata } from "@storybook/angular";
import { CircleModule } from "./circle/circle.module";
import { CardModule } from "./card/card.module";
import { EdgeModule } from "./edge/edge.module";
import { UserModule, WikisModule, DebugModule } from "@carbon/icons-angular";
import { elbow } from "./edge/buildPath";

const nodeHeight = 64;
const nodeWidth = 200;
const circleSize = 64;

const stories = storiesOf("Experimental|Graph", module);
stories.addDecorator(
	moduleMetadata({
		imports: [CircleModule, CardModule, EdgeModule, UserModule, WikisModule, DebugModule]
	})
);

const getTemplate = demo => `
	<div class="container theme--white">
		${demo}
	</div>
`;

stories.add("Composed", () => ({
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
}));


const nodeData = [
	{ id: "a", x: 0, y: 0, icon: "userTemplate", nodeWidth, nodeHeight },
	{ id: "b", x: 250, y: 0, icon: "wikiTemplate", nodeWidth, nodeHeight },
	{
		id: "c",
		x: 600,
		y: 200,
		icon: "debugTemplate",
		circle: true,
		nodeWidth: circleSize,
		nodeHeight: circleSize,
	},
	{ id: "d", x: 20, y: 280, icon: "wikiTemplate", nodeWidth, nodeHeight },
];

const edgeData = [
	{ source: "a", target: "b", variant: "dash-md" },
	{
		source: "c",
		target: "b",
		path: (source, target) => elbow(source, target),
	},
	{
		source: "d",
		target: "c",
		path: (source, target) => elbow(source, target),
		variant: "tunnel",
	},
];

const edgeMapped = edgeData.map((link) => {
	const sourceNode = nodeData.find((node) => node.id === link.source);
	const targetNode = nodeData.find((node) => node.id === link.target);

	return {
		...link,
		source: {
			x: sourceNode.x + sourceNode.nodeWidth / 2,
			y: sourceNode.y + sourceNode.nodeHeight / 2,
		},
		target: {
			x: targetNode.x + targetNode.nodeWidth / 2,
			y: targetNode.y + targetNode.nodeHeight / 2,
		},
	};
});

stories.add("Programmatic", () => ({
	template: getTemplate(`
		<svg height="1000" width="1000">
			<svg:g ibm-graph-edge *ngFor="let edge of edgeMapped" [source]="edge.source" [target]="edge.target" [path]="edge.path && edge.path(edge.source, edge.target)" [variant]="edge.variant"></svg:g>
			<svg:foreignObject *ngFor="let node of nodeData" style="overflow: visible" [attr.height]="node.nodeHeight" [attr.width]="node.nodeWidth" attr.transform="translate({{node.x}},{{node.y}})">
				<xhtml:div *ngIf="node.circle">
					<ibm-graph-circle [title]="'Title'" [description]="'Description'" [size]="circleSize"></ibm-graph-circle>
				</xhtml:div>
				<xhtml:div *ngIf="!node.circle">
					<ibm-graph-card [title]="'Title'" [description]="'Description'"></ibm-graph-card>
				</xhtml:div>
			</svg:foreignObject>
		</svg>

		<ng-template #userTemplate>
			<svg ibmIconUser size="16"></svg>
		</ng-template>

		<ng-template #wikiTemplate>
			<svg ibmIconWikis size="16"></svg>
		</ng-template>

		<ng-template #debugTemplate>
			<svg ibmIconDebug size="16"></svg>
		</ng-template>
	`),
	props: {
		nodeData,
		edgeMapped,
		circleSize
	},
}))
;
