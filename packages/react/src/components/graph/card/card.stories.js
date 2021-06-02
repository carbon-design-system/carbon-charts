import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from './card';
import { OverflowMenu, OverflowMenuItem } from 'carbon-components-react';

import { User16 } from '@carbon/icons-react';

const stories = storiesOf('Experimental|Card', module);
stories.addDecorator((story) => (
	<div className="container theme--white" style={{ margin: "2rem", maxWidth: 400 }}>{story()}</div>
));

stories.add('Default', () => (
	<Card title={'Title'} description={'Description'} />
));

stories.add('Stacked', () => (
	<Card title={'Title'} description={'Description'} stacked />
));

stories.add('Color', () => (
	<Card color={'#8a3ffc'} title={'Title'} description={'Description'} renderIcon={<User16 />} />
));

stories.add('With icon', () => (
	<Card title={'Title'} description={'Description'} renderIcon={<User16 />} />
));

stories.add('With label', () => (
	<Card title={'Title'} description={'Description'} label={'Label'} />
));

stories.add('With action', () => (
	<Card title={'Title'} description={'Description'} label={'Label'} renderAction={
	<OverflowMenu>
		<OverflowMenuItem itemText="Stop app" />
		<OverflowMenuItem itemText="Restart app" />
		<OverflowMenuItem itemText="Rename app" />
		<OverflowMenuItem itemText="Edit routes and access" requireTitle />
		<OverflowMenuItem hasDivider isDelete itemText="Delete app" />
	</OverflowMenu>
	} />
));
