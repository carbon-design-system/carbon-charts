import React from 'react';
import { storiesOf } from '@storybook/react';
import Circle from './circle';
import './_circle.scss';

import { User16 } from '@carbon/icons-react';

const stories = storiesOf('Circle', module);
stories.addDecorator((story) => (
	<div className="container theme--white">{story()}</div>
));

stories.add('Default', () => (
	<div style={{ height: 48, width: 48 }}>
		<Circle title={'Title'} renderIcon={<User16 />} />
	</div>
));
