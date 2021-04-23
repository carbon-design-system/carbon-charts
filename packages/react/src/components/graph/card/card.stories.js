import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from './card';
import './_card.scss';

const stories = storiesOf('Card', module);

stories.addDecorator((story) => <div className="container theme--white">{story()}</div>);

stories.add('Default', () => (
	<Card title={'Title'} description={'Description'} />
));
