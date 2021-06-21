import React from 'react';
import { storiesOf } from '@storybook/react';

import { User20 } from '@carbon/icons-react';

import ShapeNode from '../../dist/diagrams/ShapeNode';

const stories = storiesOf('Diagrams|Nodes/Shape', module);
stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('Default', () => (
	<ShapeNode title={'Title'} renderIcon={<User20 />} />
));

stories.add('Square', () => (
	<ShapeNode title={'Title'} renderIcon={<User20 />} shape="square" />
));

stories.add('Rounded square', () => (
	<ShapeNode title={'Title'} renderIcon={<User20 />} shape="rounded-square" />
));

stories.add('As button', () => (
	<ShapeNode title={'Title'} onClick={() => {}} renderIcon={<User20 />} />
));

stories.add('As link', () => (
	<ShapeNode title={'Title'} href="#" renderIcon={<User20 />} />
));

stories.add('Inherited dimensions', () => (
	<div style={{ height: 64, width: 64 }}>
		<ShapeNode title={'Title'} renderIcon={<User20 />} size={'100%'} />
	</div>
));
