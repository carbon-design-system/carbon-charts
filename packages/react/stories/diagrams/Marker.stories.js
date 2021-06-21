import React from 'react';
import { storiesOf } from '@storybook/react';
import {
	ArrowLeftMarker,
	ArrowRightMarker,
	CircleMarker,
	DiamondMarker,
	SquareMarker,
	TeeMarker,
} from '../../dist/diagrams/Marker';
import Edge from '../../dist/diagrams/Edge';

const linkSource = { x: 20, y: 50 };
const linkTarget = { x: 250, y: 50 };

const stories = storiesOf('Diagrams|Edges/Markers', module);

stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('Arrow left', () => (
	<svg height={400} width={400}>
		<defs>
			<ArrowLeftMarker id="marker" />
		</defs>

		<Edge source={linkSource} target={linkTarget} markerStart={'marker'} />
	</svg>
));

stories.add('Arrow right', () => (
	<svg height={400} width={400}>
		<defs>
			<ArrowRightMarker id="marker" />
		</defs>

		<Edge source={linkSource} target={linkTarget} markerEnd={'marker'} />
	</svg>
));

stories.add('Circle', () => (
	<svg height={400} width={400}>
		<defs>
			<CircleMarker id="marker" />
		</defs>

		<Edge source={linkSource} target={linkTarget} markerStart={'marker'} />
	</svg>
));

stories.add('Diamond', () => (
	<svg height={400} width={400}>
		<defs>
			<DiamondMarker id="marker" />
		</defs>

		<Edge source={linkSource} target={linkTarget} markerStart={'marker'} />
	</svg>
));

stories.add('Square', () => (
	<svg height={400} width={400}>
		<defs>
			<SquareMarker id="marker" />
		</defs>

		<Edge source={linkSource} target={linkTarget} markerStart={'marker'} />
	</svg>
));

stories.add('Tee', () => (
	<svg height={400} width={400}>
		<defs>
			<TeeMarker id="marker" />
		</defs>

		<Edge source={linkSource} target={linkTarget} markerStart={'marker'} />
	</svg>
));

stories.add('Color', () => (
	<svg height={400} width={400}>
		<defs>
			<TeeMarker id="marker" color={'#FB4B53'} />
		</defs>

		<Edge
			source={linkSource}
			target={linkTarget}
			markerStart={'marker'}
			color={'#FB4B53'}
		/>
	</svg>
));
