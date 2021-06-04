import React from 'react';
import { storiesOf } from '@storybook/react';
import CardNode, { CardNodeColumn, CardNodeDescription, CardNodeLabel, CardNodeTitle } from '.';
import { User16, ChevronDown16 } from '@carbon/icons-react';

const stories = storiesOf('Diagrams|CardNode', module);
stories.addDecorator((story) => (
	<div className="container theme--white" style={{ margin: "2rem", maxWidth: 400 }}>{story()}</div>
));

stories.add('Default', () => (
	<CardNode>
		<CardNodeColumn>
			<CardNodeTitle>Title</CardNodeTitle>
			<CardNodeDescription>Description</CardNodeDescription>
		</CardNodeColumn>
	</CardNode>
));

stories.add('Stacked', () => (
	<CardNode stacked>
		<CardNodeColumn>
			<CardNodeTitle>Title</CardNodeTitle>
			<CardNodeDescription>Description</CardNodeDescription>
		</CardNodeColumn>
	</CardNode>
));

stories.add('Color', () => (
	<CardNode color={'#8a3ffc'} >
		<CardNodeColumn>
			<CardNodeTitle>Title</CardNodeTitle>
			<CardNodeDescription>Description</CardNodeDescription>
		</CardNodeColumn>
	</CardNode>
));

stories.add('With icon', () => (
	<CardNode>
		<CardNodeColumn>
			<User16 />
		</CardNodeColumn>
		<CardNodeColumn>
			<CardNodeTitle>Title</CardNodeTitle>
			<CardNodeDescription>Description</CardNodeDescription>
		</CardNodeColumn>
	</CardNode>
));

stories.add('As button', () => (
	<CardNode onClick={()=> {}}>
		<CardNodeColumn>
			<User16 />
		</CardNodeColumn>
		<CardNodeColumn>
			<CardNodeTitle>Title</CardNodeTitle>
			<CardNodeDescription>Description</CardNodeDescription>
		</CardNodeColumn>
	</CardNode>
));

stories.add('As link', () => (
	<CardNode href="#">
		<CardNodeColumn>
			<User16 />
		</CardNodeColumn>
		<CardNodeColumn>
			<CardNodeTitle>Title</CardNodeTitle>
			<CardNodeDescription>Description</CardNodeDescription>
		</CardNodeColumn>
	</CardNode>
));

stories.add('With label', () => (
	<CardNode>
		<CardNodeColumn>
			<CardNodeTitle>Title</CardNodeTitle>
			<CardNodeDescription>Description</CardNodeDescription>
			<CardNodeLabel>Label</CardNodeLabel>
		</CardNodeColumn>
	</CardNode>
));

stories.add('With third column', () => (
	<CardNode>
		<CardNodeColumn>
			<User16 />
		</CardNodeColumn>
		<CardNodeColumn>
			<CardNodeTitle>Title</CardNodeTitle>
			<CardNodeDescription>Description</CardNodeDescription>
		</CardNodeColumn>
		<CardNodeColumn farsideColumn>
			<ChevronDown16 />
		</CardNodeColumn>
	</CardNode>
));
