import React, { useState, useEffect } from 'react';
import ELK from 'elkjs/lib/elk.bundled';
import { path as d3Path } from 'd3-path';
import Circle from '../../circle/circle';
import Edge from '../../edge/edge';
import { TeeMarker, CircleMarker } from '../../marker/marker';
import { User16 } from '@carbon/icons-react';

const Link = ({ link }) => {
	const sections = link.sections[0];
	const path = d3Path();

	path.moveTo(sections.startPoint.x, sections.startPoint.y);

	if (sections.bendPoints) {
		sections.bendPoints.forEach((b) => {
			path.lineTo(b.x, b.y);
		});
	}

	path.lineTo(sections.endPoint.x, sections.endPoint.y);

	return <Edge path={path.toString()} markerStart="circle" markerEnd="tee" variant="dash-sm" />;
};

const Node = ({ x, y, height, width }) => {
	return (
		<foreignObject
			transform={`translate(${x},${y})`}
			height={height}
			width={width}
			style={{ overflow: 'visible' }}>
			<div style={{ height, width }}>
				<Circle renderIcon={<User16 />} size={"100%"} />
			</div>
		</foreignObject>
	);
};

const Elk = ({ nodes, links, layout }) => {
	const elk = new ELK();

	const [positions, setPositions] = useState(null);

	const graph = {
		id: 'root',
		layoutOptions: {
			'elk.algorithm': layout,
			'elk.padding': '[left=50, top=50, right=50, bottom=50]',
			separateConnectedComponents: false,
			'spacing.nodeNode': 100,
			'spacing.nodeNodeBetweenLayers': 100,
		},
		children: nodes,
		edges: links,
	};

	useEffect(() => {
		elk.layout(graph)
			.then((g) => setPositions(g))
			.catch(console.error);
	}, []);

	if (!positions) return null;

	const buildNodes = () => {
		const { children } = positions;

		return children.map((node, i) => {
			return <Node key={`node_${i}`} x={node.x} y={node.y} height={node.height} width={node.width} />;
		});
	};

	const buildLinks = () => {
		const { edges } = positions;

		return edges.map((edge, i) => {
			return <Link key={`link_${i}`} link={edge} />;
		});
	};

	const nodeElements = buildNodes();
	const linkElements = buildLinks();

	return (
		<div
			className={`force`}
			style={{
				position: `relative`,
				height: 1000,
				width: 1000,
				margin: 32,
			}}>
			<svg style={{ height: '100%', width: '100%' }}>
				<defs>
					<TeeMarker id="tee" />
					<CircleMarker id="circle" position="start" />
				</defs>
				{linkElements}
				{nodeElements}
			</svg>
		</div>
	);
};

export default Elk;
