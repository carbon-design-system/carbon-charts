import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from './card/card';
import Edge from './edge/edge';
import Circle from './circle/circle';

import { User16, Wikis16, Debug16 } from '@carbon/icons-react';
import { elbow } from './edge/buildPath';

const nodeHeight = 64;
const nodeWidth = 200;
const circleSize = 64;

const stories = storiesOf('Experimental|Graph', module);
stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('Default', () => {
	return (
		<svg height="1000" width="1000">
			<Edge
				source={{ x: 200, y: 132 }}
				target={{ x: 600, y: 132 }}
				variant={'dash-sm'}
			/>

			<foreignObject
				style={{ overflow: 'visible' }}
				transform={`translate(${100},${100})`}
				height={nodeHeight}
				width={nodeWidth}>
				<Card
					title={'Title'}
					description={'Description'}
					renderIcon={<User16 />}
				/>
			</foreignObject>

			<foreignObject
				style={{ overflow: 'visible' }}
				transform={`translate(${600},${100})`}
				height={circleSize}
				width={circleSize}>
				<Circle title={'Title'} renderIcon={<Wikis16 />} />
			</foreignObject>
		</svg>
	);
});

stories.add('Programmatic', () => {
	const nodeData = [
		{ id: 'a', x: 0, y: 0, icon: <User16 />, nodeWidth, nodeHeight },
		{ id: 'b', x: 250, y: 0, icon: <Wikis16 />, nodeWidth, nodeHeight },
		{
			id: 'c',
			x: 600,
			y: 200,
			icon: <Debug16 />,
			circle: true,
			nodeWidth: circleSize,
			nodeHeight: circleSize,
		},
		{ id: 'd', x: 20, y: 280, icon: <Wikis16 />, nodeWidth, nodeHeight },
	];

	const edgeData = [
		{ source: 'a', target: 'b', variant: 'dash-md' },
		{
			source: 'c',
			target: 'b',
			path: (source, target) => elbow(source, target),
		},
		{
			source: 'd',
			target: 'c',
			path: (source, target) => elbow(source, target),
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
			{node.circle ? (
				<Circle
					title={'Title'}
					description={'Description'}
					renderIcon={node.icon}
				/>
			) : (
				<Card
					title={'Title'}
					description={'Description'}
					renderIcon={node.icon}
				/>
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
		<svg height="1000" width="1000">
			{edges}
			{nodes}
		</svg>
	);
});
