import { storiesOf, moduleMetadata } from '@storybook/angular';
import { ShapeNodeModule } from '../../src/diagrams/shape-node/shape-node.module';
import { CardNodeModule } from '../../src/diagrams/card-node/card-node.module';
import { EdgeModule } from '../../src/diagrams/edge/edge.module';
import { MarkerModule } from '../../src/diagrams/marker/marker.module';

import { UserModule, WikisModule } from '@carbon/icons-angular';
import { buildElbowPathString } from '@carbon/charts/components/diagrams/buildPaths';

const nodeHeight = 64;
const nodeWidth = 200;
const circleSize = 64;

const stories = storiesOf('Diagrams/', module);
stories.addDecorator(
	moduleMetadata({
		imports: [
			ShapeNodeModule,
			CardNodeModule,
			EdgeModule,
			MarkerModule,
			UserModule,
			WikisModule,
		],
	})
);

const getTemplate = (demo) => `
	<div class="container theme--white">
		${demo}
	</div>
`;

stories.add('Start here', () => ({
	template: getTemplate(`
		<div>
			<h1>Diagrams</h1>

			<p style='max-width: 600px; font-size: 1rem; font-weight: 400; line-height: 1.5; letter-spacing: 0'>
				Angular components for building diagram experiences, using the Carbon Design System.
			</p>

			<p style='max-width: 600px; font-size: 1rem; font-weight: 400; line-height: 1.5; letter-spacing: 0'>
			<b>Note that Carbon Charts does not provide layouts for diagrams.
			You can utilize these components alongside graphing libraries,
			or by composing your own layouts (see section 3).</b>
			</p>

			<h2 style='padding-top: 2rem'>Examples</h2>

			<h3 style='padding-top: 1rem'>1. Simple static layout</h3>

			<p style='max-width: 600px; font-size: 1rem; font-weight: 400; line-height: 1.5; letter-spacing: 0'>
			A simple composed diagram, using statically defined x and y
			coordinates.
			<a href="https://github.com/carbon-design-system/carbon-charts/tree/master/packages/angular/stories/diagrams/0_diagram.stories.ts">
				View source
			</a>
			</p>

			${SimpleStatic}

			<h3 style='padding-top: 1rem'>2. Programmatic static layout</h3>

			<p style='max-width: 600px; font-size: 1rem; font-weight: 400; line-height: 1.5; letter-spacing: 0'>
				A composed diagram, rendered using arrays of statically defined
				x and y coordinates.
				<a href="https://github.com/carbon-design-system/carbon-charts/tree/master/packages/angular/stories/diagrams/0_diagram.stories.ts">
					View source
				</a>
			</p>

			${ProgrammaticStatic}

			<h3 style='padding-top: 1rem'>3. Layouts using external dependencies</h3>

			<p>Here's an example using <b>elkjs</b> in <b><u>react</u></b></p>

			<iframe
				src="https://codesandbox.io/embed/carbon-charts-react-elkjs-diagram-b9xyp?fontsize=14&hidenavigation=1&theme=dark&view=preview"
				style="width: 100%; height: 500px; border: 0; border-radius: 4px; overflow: hidden;"
				title="carbon-charts-react-elkjs-diagram"
				allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
				sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>
		</div>
	`),
	props: {
		source: { x: 0, y: 48 },
		target: { x: 396, y: 48 },
		markerEnd: 'marker',
		nodeHeight,
		nodeWidth,
		circleSize,
		nodeData,
		edgeMapped,
	},
}));

const SimpleStatic = `
	<div class="demo-desktop-only">
		<div class="cp-message">This is a desktop-only example</div>

		<svg height="124" width="600" xmlns:xhtml="http://www.w3.org/1999/xhtml">
			<svg:defs>
				<svg:marker ibm-graph-marker-arrow-right [id]="markerEnd"></svg:marker>
			</svg:defs>

			<svg:g ibm-graph-edge [source]="source" [target]="target" variant="dash-sm" [markerEnd]="markerEnd" ></svg:g>

			<svg:foreignObject style="overflow: visible" [attr.height]="nodeHeight" [attr.width]="nodeWidth" [attr.transform]="'translate(0, 16)'">
				<xhtml:div>
					<ibm-diagram-card-node as="button">
						<ibm-diagram-card-node-column>
							<svg ibmIconUser size="20"></svg>
						</ibm-diagram-card-node-column>
						<ibm-diagram-card-node-column>
							<ibm-diagram-card-node-title>
								Title
							</ibm-diagram-card-node-title>
							<ibm-diagram-card-node-subtitle>
								Description
							</ibm-diagram-card-node-subtitle>
						</ibm-diagram-card-node-column>
					</ibm-diagram-card-node>
				</xhtml:div>
			</svg:foreignObject>

			<svg:foreignObject style="overflow: visible" [attr.height]="nodeHeight" [attr.width]="nodeWidth" [attr.transform]="'translate(400, 16)'">
				<xhtml:div>
					<ibm-diagram-shape-node as="button" title="Title" [size]="circleSize" [renderIcon]="wikiTemplate"></ibm-diagram-shape-node>
				</xhtml:div>
			</svg:foreignObject>
		</svg>

		<ng-template #wikiTemplate>
			<svg ibmIconWikis size="20"></svg>
		</ng-template>
	</div>
`;

const nodeData = [
	{ id: 'a', x: 0, y: 16, icon: 'user', nodeWidth, nodeHeight },
	{ id: 'b', x: 250, y: 16, icon: 'wiki', nodeWidth, nodeHeight },
	{
		id: 'c',
		x: 600,
		y: 200,
		icon: 'user',
		circle: true,
		nodeWidth: circleSize,
		nodeHeight: circleSize,
	},
	{ id: 'd', x: 0, y: 150, icon: 'wiki', nodeWidth, nodeHeight },
];

const edgeData = [
	{ source: 'a', target: 'b', variant: 'dash-md' },
	{
		source: 'c',
		target: 'b',
		path: (source, target) => buildElbowPathString(source, target),
	},
	{
		source: 'd',
		target: 'c',
		path: (source, target) => buildElbowPathString(source, target),
		variant: 'tunnel',
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

const ProgrammaticStatic = `
	<div class="demo-desktop-only">
		<div class="cp-message">This is a desktop-only example</div>

		<svg height="320" width="800" xmlns:xhtml="http://www.w3.org/1999/xhtml">
			<svg:g ibm-graph-edge *ngFor="let edge of edgeMapped" [source]="edge.source" [target]="edge.target" [path]="edge.path && edge.path(edge.source, edge.target)" [variant]="edge.variant"></svg:g>
			<svg:foreignObject *ngFor="let node of nodeData" style="overflow: visible" [attr.height]="node.nodeHeight" [attr.width]="node.nodeWidth" attr.transform="translate({{node.x}},{{node.y}})">
				<xhtml:div *ngIf="node.circle">
					<ibm-diagram-shape-node as="button" [title]="'Title'" [subtitle]="'Description'" [size]="circleSize" [renderIcon]="(node.icon === 'user') ? userTemplate : wikiTemplate"></ibm-diagram-shape-node>
				</xhtml:div>
				<xhtml:div *ngIf="!node.circle">
					<ibm-diagram-card-node as="button">
						<ibm-diagram-card-node-column>
							<svg ibmIconUser size="20"></svg>
						</ibm-diagram-card-node-column>
						<ibm-diagram-card-node-column>
							<ibm-diagram-card-node-title>
								Title
							</ibm-diagram-card-node-title>
							<ibm-diagram-card-node-subtitle>
								Description
							</ibm-diagram-card-node-subtitle>
						</ibm-diagram-card-node-column>
					</ibm-diagram-card-node>
				</xhtml:div>
			</svg:foreignObject>
		</svg>

		<ng-template #userTemplate>
			<svg ibmIconUser size="20"></svg>
		</ng-template>

		<ng-template #wikiTemplate>
			<svg ibmIconWikis size="20"></svg>
		</ng-template>
	</div>
`;
