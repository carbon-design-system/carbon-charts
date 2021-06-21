import React from 'react';
import { storiesOf } from '@storybook/react';
import CardNode, {
	CardNodeColumn,
	CardNodeTitle,
	CardNodeSubtitle,
} from './CardNode';
import Edge from './Edge';
import ShapeNode from './ShapeNode';
import { ArrowRightMarker } from './Marker';

import { User20, Wikis20, Debug20 } from '@carbon/icons-react';
import { buildElbowPathString } from '@carbon/charts/components/diagrams/buildPaths';

const nodeHeight = 64;
const nodeWidth = 200;
const ShapeNodeSize = 64;

const stories = storiesOf('Diagrams/', module);
stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('Start here', () => {
	const paragraphStyle = {
		style: {
			maxWidth: 600,
			fontSize: '1rem',
			fontWeight: 400,
			lineHeight: 1.5,
			letterSpacing: 0,
		},
	};

	const h3Style = {
		style: {
			paddingTop: '1rem',
		},
	};

	const h2Style = {
		style: {
			paddingTop: '2rem',
		},
	};

	return (
		<div>
			<h1>Diagrams</h1>

			<p {...paragraphStyle}>
				React components for building diagram experiences, using the
				Carbon Design System.
			</p>

			<p {...paragraphStyle}>
				<b>
					Note that Carbon Charts does not provide layouts for
					diagrams. You can utilize these components alongside
					graphing libraries, or by composing your own layouts.
				</b>
			</p>

			<h2 {...h2Style}>Examples</h2>

			<h3 {...h3Style}>Simple static layout</h3>

			<p {...paragraphStyle}>
				A simple composed diagram, using statically defined x and y
				coordinates.{' '}
				<a href="https://github.com/carbon-design-system/carbon-charts/tree/master/packages/react/src/components/diagrams/0_Diagrams.stories.js">
					View source
				</a>
			</p>

			<SimpleStatic />

			<h3 {...h3Style}>Programmatic static layout</h3>

			<p {...paragraphStyle}>
				A composed diagram, rendered using arrays of statically defined
				x and y coordinates.{' '}
				<a href="https://github.com/carbon-design-system/carbon-charts/tree/master/packages/react/src/components/diagrams/0_Diagrams.stories.js">
					View source
				</a>
			</p>

			<ProgrammaticStatic />

			<h3 {...h3Style}>Layouts using external dependencies</h3>

			<p {...paragraphStyle}>
				Coming soon. Examples of layouts using external dependencies
			</p>
		</div>
	);
});

const DesktopOnlyMessage = () => (
	<div className="cp-message">This is a desktop-only example</div>
);

const SimpleStatic = () => (
	<div className="demo-desktop-only">
		<DesktopOnlyMessage />

		<svg height="124" width="600">
			<defs>
				<ArrowRightMarker id={'marker'} />
			</defs>

			<Edge
				source={{ x: 0, y: 48 }}
				target={{ x: 396, y: 48 }}
				markerEnd={'marker'}
				variant={'dash-sm'}
			/>

			<foreignObject
				style={{ overflow: 'visible' }}
				transform={`translate(${0},${16})`}
				height={nodeHeight}
				width={nodeWidth}>
				<CardNode onClick={() => {}}>
					<CardNodeColumn>
						<User20 />
					</CardNodeColumn>
					<CardNodeColumn>
						<CardNodeTitle>Title</CardNodeTitle>
						<CardNodeSubtitle>Description</CardNodeSubtitle>
					</CardNodeColumn>
				</CardNode>
			</foreignObject>

			<foreignObject
				style={{ overflow: 'visible' }}
				transform={`translate(${400},${16})`}>
				<ShapeNode
					title={'Title'}
					size={ShapeNodeSize}
					onClick={() => {}}
					renderIcon={<Wikis20 />}
				/>
			</foreignObject>
		</svg>
	</div>
);

const ProgrammaticStatic = () => {
	const nodeData = [
		{ id: 'a', x: 0, y: 16, icon: <User20 />, nodeWidth, nodeHeight },
		{ id: 'b', x: 250, y: 16, icon: <Wikis20 />, nodeWidth, nodeHeight },
		{
			id: 'c',
			x: 600,
			y: 200,
			icon: <Debug20 />,
			ShapeNode: true,
			nodeWidth: ShapeNodeSize,
			nodeHeight: ShapeNodeSize,
		},
		{ id: 'd', x: 0, y: 150, icon: <Wikis20 />, nodeWidth, nodeHeight },
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

	const nodes = nodeData.map((node, i) => (
		<foreignObject
			style={{ overflow: 'visible' }}
			key={`node_${i}`}
			transform={`translate(${node.x},${node.y})`}
			height={node.nodeHeight}
			width={node.nodeWidth}>
			{node.ShapeNode ? (
				<ShapeNode
					onClick={() => {}}
					title={'Title'}
					size={ShapeNodeSize}
					description={'Description'}
					renderIcon={node.icon}
				/>
			) : (
				<CardNode onClick={() => {}}>
					<CardNodeColumn>{node.icon}</CardNodeColumn>
					<CardNodeColumn>
						<CardNodeTitle>Title</CardNodeTitle>
						<CardNodeSubtitle>Description</CardNodeSubtitle>
					</CardNodeColumn>
				</CardNode>
			)}
		</foreignObject>
	));
	const edges = edgeMapped.map((edge, i) => (
		<Edge
			key={`link_${i}`}
			source={edge.source}
			target={edge.target}
			path={edge.path && edge.path(edge.source, edge.target)}
			variant={edge.variant}
		/>
	));

	return (
		<div className="demo-desktop-only">
			<DesktopOnlyMessage />

			<svg height="300" width="800">
				{edges}
				{nodes}
			</svg>
		</div>
	);
};
