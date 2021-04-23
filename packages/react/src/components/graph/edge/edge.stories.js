import React from 'react';
import { storiesOf } from '@storybook/react';
import Edge from './edge';
import './_edge.scss';

const linkSource = { x: 0, y: 0 };
const linkTarget = { x: 400, y: 0 };


const stories = storiesOf('Edge', module);
stories.addDecorator((story) => <div className="container theme--white">{story()}</div>);

stories.add('Default', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} />
		</g>
	</svg>
));


stories.add('Dashed', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} />
		</g>
	</svg>
));


stories.add('Double', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} />
		</g>
	</svg>
));

stories.add('Tunnel', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} />
		</g>
	</svg>
));

stories.add('Straight', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} />
		</g>
	</svg>
));

stories.add('Elbow', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} />
		</g>
	</svg>
));

stories.add('Rounded elbow', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} />
		</g>
	</svg>
));

stories.add('Bezier', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} />
		</g>
	</svg>
));


stories.add('Fill', () => (
	<svg height="800" width="800">
		<g transform="translate(16,16)">
			<Edge source={linkSource} target={linkTarget} />
		</g>
	</svg>
));
