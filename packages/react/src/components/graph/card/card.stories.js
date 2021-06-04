import React from 'react';
import { storiesOf } from '@storybook/react';
import Card, { CardColumn, CardDescription, CardLabel, CardTitle } from './card';
import { User16, ChevronDown16 } from '@carbon/icons-react';

const stories = storiesOf('Experimental|Card', module);
stories.addDecorator((story) => (
	<div className="container theme--white" style={{ margin: "2rem", maxWidth: 400 }}>{story()}</div>
));

stories.add('Default', () => (
	<Card>
		<CardColumn>
			<CardTitle>Title</CardTitle>
			<CardDescription>Description</CardDescription>
		</CardColumn>
	</Card>
));

stories.add('Stacked', () => (
	<Card stacked>
		<CardColumn>
			<CardTitle>Title</CardTitle>
			<CardDescription>Description</CardDescription>
		</CardColumn>
	</Card>
));

stories.add('Color', () => (
	<Card color={'#8a3ffc'} >
		<CardColumn>
			<CardTitle>Title</CardTitle>
			<CardDescription>Description</CardDescription>
		</CardColumn>
	</Card>
));

stories.add('With icon', () => (
	<Card>
		<CardColumn>
			<User16 />
		</CardColumn>
		<CardColumn>
			<CardTitle>Title</CardTitle>
			<CardDescription>Description</CardDescription>
		</CardColumn>
	</Card>
));

stories.add('As button', () => (
	<Card onClick={()=> {}}>
		<CardColumn>
			<User16 />
		</CardColumn>
		<CardColumn>
			<CardTitle>Title</CardTitle>
			<CardDescription>Description</CardDescription>
		</CardColumn>
	</Card>
));

stories.add('As link', () => (
	<Card href="#">
		<CardColumn>
			<User16 />
		</CardColumn>
		<CardColumn>
			<CardTitle>Title</CardTitle>
			<CardDescription>Description</CardDescription>
		</CardColumn>
	</Card>
));

stories.add('With label', () => (
	<Card>
		<CardColumn>
			<CardTitle>Title</CardTitle>
			<CardDescription>Description</CardDescription>
			<CardLabel>Label</CardLabel>
		</CardColumn>
	</Card>
));

stories.add('With third column', () => (
	<Card>
		<CardColumn>
			<User16 />
		</CardColumn>
		<CardColumn>
			<CardTitle>Title</CardTitle>
			<CardDescription>Description</CardDescription>
		</CardColumn>
		<CardColumn farsideColumn>
			<ChevronDown16 />
		</CardColumn>
	</Card>
));
