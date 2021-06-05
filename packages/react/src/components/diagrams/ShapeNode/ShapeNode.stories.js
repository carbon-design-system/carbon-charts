import React from 'react';
import { storiesOf } from '@storybook/react';
import ShapeNode from '.';

import { User16 } from '@carbon/icons-react';

const stories = storiesOf('Diagrams|Nodes/Shape', module);
stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('Default', () => (
	<ShapeNode title={'Title'} renderIcon={<User16 />} />
));

stories.add('Square', () => (
	<ShapeNode title={'Title'} renderIcon={<User16 />} shape="square" />
));

stories.add('Rounded square', () => (
	<ShapeNode title={'Title'} renderIcon={<User16 />} shape="rounded-square" />
));

stories.add('As button', () => (
	<ShapeNode title={'Title'} onClick={() => {}} renderIcon={<User16 />} />
));

stories.add('As link', () => (
	<ShapeNode title={'Title'} href="#" renderIcon={<User16 />} />
));

stories.add('Inherited dimensions', () => (
	<div style={{ height: 64, width: 64 }}>
		<ShapeNode title={'Title'} renderIcon={<User16 />} size={'100%'} />
	</div>
));
