import { storiesOf, moduleMetadata } from "@storybook/angular";
import { CircleNodeModule } from "./circle-node/circle-node.module";
import { CardNodeModule } from "./card-node/card-node.module";
import { EdgeModule } from "./edge/edge.module";
import { MarkerModule } from "./marker/marker.module";
import { UserModule, WikisModule } from "@carbon/icons-angular";
import { elbow } from "./edge/buildPath";

const nodeHeight = 64;
const nodeWidth = 200;
const circleSize = 64;

const stories = storiesOf("Diagrams|Graph", module);
stories.addDecorator(
	moduleMetadata({
		imports: [CircleNodeModule, CardNodeModule, EdgeModule, MarkerModule, UserModule, WikisModule]
	})
);

const getTemplate = demo => `
	<div class="container theme--white">
		${demo}
	</div>
`;

stories.add("Composed", () => ({
	template: getTemplate(`
		<svg height="1000" width="1000" xmlns:xhtml="http://www.w3.org/1999/xhtml">
			<svg:defs>
				<svg:marker ibm-graph-marker-arrow-right [id]="markerEnd"></svg:marker>
			</svg:defs>

			<svg:g ibm-graph-edge [source]="source" [target]="target" variant="dash-sm" [markerEnd]="markerEnd" ></svg:g>

			<svg:foreignObject style="overflow: visible" [attr.height]="nodeHeight" [attr.width]="nodeWidth" [attr.transform]="'translate(100, 100)'">
				<xhtml:div>
					<ibm-diagram-card-node [title]="'Title'" [description]="'Description'" [renderIcon]="userTemplate"></ibm-diagram-card-node>
				</xhtml:div>
			</svg:foreignObject>

			<svg:foreignObject style="overflow: visible" [attr.height]="nodeHeight" [attr.width]="nodeWidth" [attr.transform]="'translate(600, 100)'">
				<xhtml:div>
					<ibm-diagram-circle-node [title]="'Title'" [size]="circleSize" [renderIcon]="wikiTemplate"></ibm-diagram-circle-node>
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
		target: { x: 596, y: 132 },
		markerEnd: "marker",
		nodeHeight,
		nodeWidth,
		circleSize
	},
}));


const nodeData = [
	{ id: "a", x: 0, y: 0, icon: "user", nodeWidth, nodeHeight },
	{ id: "b", x: 250, y: 0, icon: "wiki", nodeWidth, nodeHeight },
	{
		id: "c",
		x: 600,
		y: 200,
		icon: "user",
		circle: true,
		nodeWidth: circleSize,
		nodeHeight: circleSize,
	},
	{ id: "d", x: 20, y: 280, icon: "wiki", nodeWidth, nodeHeight },
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
		<svg height="1000" width="1000" xmlns:xhtml="http://www.w3.org/1999/xhtml">
			<svg:g ibm-graph-edge *ngFor="let edge of edgeMapped" [source]="edge.source" [target]="edge.target" [path]="edge.path && edge.path(edge.source, edge.target)" [variant]="edge.variant"></svg:g>
			<svg:foreignObject *ngFor="let node of nodeData" style="overflow: visible" [attr.height]="node.nodeHeight" [attr.width]="node.nodeWidth" attr.transform="translate({{node.x}},{{node.y}})">
				<xhtml:div *ngIf="node.circle">
					<ibm-diagram-circle-node [title]="'Title'" [description]="'Description'" [size]="circleSize" [renderIcon]="(node.icon === 'user') ? userTemplate : wikiTemplate"></ibm-diagram-circle-node>
				</xhtml:div>
				<xhtml:div *ngIf="!node.circle">
					<ibm-diagram-card-node [title]="'Title'" [description]="'Description'" [renderIcon]="(node.icon === 'user') ? userTemplate : wikiTemplate"></ibm-diagram-card-node>
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
		nodeData,
		edgeMapped,
		circleSize
	},
}))
;
