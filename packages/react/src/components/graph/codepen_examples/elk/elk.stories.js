import React from 'react';
import { storiesOf } from '@storybook/react';
import Elk from './elk';

const size = 48;

const nodeData = [
  { id: "a", height: size, width: size },
  { id: "b", height: size, width: size },
  { id: "c", height: size, width: size },
  { id: "d", height: size, width: size },
  { id: "e", height: size, width: size },
  { id: "f", height: size, width: size },
  { id: "g", height: size, width: size },
  { id: "h", height: size, width: size },
];

const linkData = [
  { id: "1", source: "a", target: "b" },
  { id: "2", source: "c", target: "b" },
  { id: "3", source: "d", target: "e" },
  { id: "4", source: "d", target: "b" },
  { id: "5", source: "b", target: "f" },
  { id: "6", source: "g", target: "h" },
  { id: "7", source: "h", target: "f" },
];

const stories = storiesOf('Experimental|Elk', module);

stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('Force', () => (
	<Elk nodes={nodeData} links={linkData} layout="force" />
));

stories.add('Layered', () => (
	<Elk nodes={nodeData} links={linkData} layout="layered" />
));


stories.add('Tree', () => (
	<Elk nodes={nodeData} links={linkData} layout="mrtree" />
));

stories.add('Stress', () => (
	<Elk nodes={nodeData} links={linkData} layout="stress" />
));
