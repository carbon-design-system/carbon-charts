import React from 'react';
import { storiesOf } from '@storybook/react';

import Edge from '../../dist/diagrams/Edge';
import {
	buildBezierPathString,
	buildElbowPathString,
} from '@carbon/charts/components/diagrams/buildPaths';

const linkSource = { x: 0, y: 0 };
const linkTarget = { x: 400, y: 0 };
const linkTargetCurve = { x: 400, y: 200 };

const stories = storiesOf('Diagrams|Edges', module);
stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('Default', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} />
		</g>
	</svg>
));

stories.add('Color', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} color={'#FB4B53'} />
		</g>
	</svg>
));

stories.add('Dashed', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} variant={'dash-sm'} />
		</g>

		<g transform="translate(16,32)">
			<Edge source={linkSource} target={linkTarget} variant={'dash-md'} />
		</g>

		<g transform="translate(16,48)">
			<Edge source={linkSource} target={linkTarget} variant={'dash-lg'} />
		</g>

		<g transform="translate(16,64)">
			<Edge source={linkSource} target={linkTarget} variant={'dash-xl'} />
		</g>
	</svg>
));

stories.add('Double', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} variant={'double'} />
		</g>
	</svg>
));

stories.add('Tunnel', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} variant={'tunnel'} />
		</g>
	</svg>
));

stories.add('Elbow', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge path={buildElbowPathString(linkSource, linkTargetCurve)} />
		</g>
	</svg>
));

stories.add('Bezier', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge
				path={buildBezierPathString(
					linkSource,
					linkTargetCurve,
					150,
					280,
					150,
					30
				)}
			/>
		</g>
	</svg>
));
