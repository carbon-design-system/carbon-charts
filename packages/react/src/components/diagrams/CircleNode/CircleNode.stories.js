import React from 'react';
import { storiesOf } from '@storybook/react';
import CircleNode from '.';

import { User16 } from '@carbon/icons-react';

const stories = storiesOf('Diagrams|Circle', module);
stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('Default', () => (
	<CircleNode title={'Title'} renderIcon={<User16 />} />
));

stories.add('As button', () => (
	<CircleNode title={'Title'} onClick={()=>{}} renderIcon={<User16 />} />
));

stories.add('As link', () => (
	<CircleNode title={'Title'} href="#" renderIcon={<User16 />} />
));

stories.add('Inherited dimensions', () => (
	<div style={{ height: 64, width: 64 }}>
		<CircleNode title={'Title'} renderIcon={<User16 />} size={"100%"} />
	</div>
));
