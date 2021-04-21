import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from "../card/card";
import Edge from "../edge/edge";

const nodeHeight = 64;
const nodeWidth = 200;

const nodeData = [
	{ id: "a", x: 0, y: 0 },
	{ id: "b", x: 350, y: 0 },
	{ id: "c", x: 350, y: 300, kind: "warning" },
	{ id: "d", x: 700, y: 300, kind: "error" },
];

const edgeData = [
	{ source: "a", target: "b" },
	{ source: "c", target: "b", kind: "warning", dash: "8 4" },
	{ source: "d", target: "c", kind: "error" }
];

const edgeMapped = edgeData.map(link => {
	const sourceNode = nodeData.find(node => node.id === link.source);
	const targetNode = nodeData.find(node => node.id === link.target);

	return {
		...link,
		source: {
			x: sourceNode.x + (nodeWidth / 2),
			y: sourceNode.y + (nodeHeight / 2)
		},
		target: {
			x: targetNode.x + (nodeWidth / 2),
			y: targetNode.y + (nodeHeight / 2)
		}
	}
});

storiesOf('Graph', module).add('Default', () => {
	const nodes = nodeData.map((node, i) => <foreignObject style={{ overflow: "visible" }} key={`node_${i}`} transform={`translate(${node.x},${node.y})`} height={nodeHeight} width={nodeWidth}><Card title={'Title'} description={'Description'} /></foreignObject> );
	const edges = edgeMapped.map((edge, i) => <Edge key={`link_${i}`} source={edge.source} target={edge.target} /> );

	return (
		<svg height="1000" width="1000">
			{edges}
			{nodes}
		</svg>
	)
});
