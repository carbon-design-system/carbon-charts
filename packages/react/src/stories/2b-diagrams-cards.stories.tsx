import { storiesOf } from '@storybook/react'
import { User, ChevronDown } from '@carbon/icons-react'
import { CardNode, CardNodeColumn, CardNodeSubtitle, CardNodeLabel, CardNodeTitle } from '../'

const noControls = {
	backgrounds: {
		default: 'white',
		values: [
			{ name: 'white', value: '#fff' }
		]
	},
	controls: {
		hideNoControlsWarning: true
	}
}

storiesOf('Diagrams/Cards', module)

	.addDecorator((story) => (
		<div className="container " style={{ maxWidth: 400 }}>
			{story()}
		</div>
	))

	.add(
		'Default',
		() => (
			<CardNode>
				<CardNodeColumn>
					<CardNodeTitle>Title</CardNodeTitle>
					<CardNodeSubtitle>Description</CardNodeSubtitle>
				</CardNodeColumn>
			</CardNode>
		),
		noControls
	)

	.add(
		'Stacked',
		() => (
			<CardNode stacked>
				<CardNodeColumn>
					<CardNodeTitle>Title</CardNodeTitle>
					<CardNodeSubtitle>Description</CardNodeSubtitle>
				</CardNodeColumn>
			</CardNode>
		),
		noControls
	)

	.add(
		'Color',
		() => (
			<CardNode color={'#8a3ffc'}>
				<CardNodeColumn>
					<CardNodeTitle>Title</CardNodeTitle>
					<CardNodeSubtitle>Description</CardNodeSubtitle>
				</CardNodeColumn>
			</CardNode>
		),
		noControls
	)

	.add(
		'With icon',
		() => (
			<CardNode>
				<CardNodeColumn>
					<User size={20} />
				</CardNodeColumn>
				<CardNodeColumn>
					<CardNodeTitle>Title</CardNodeTitle>
					<CardNodeSubtitle>Description</CardNodeSubtitle>
				</CardNodeColumn>
			</CardNode>
		),
		noControls
	)

	.add(
		'As button',
		() => (
			<CardNode onClick={() => console.log('Clicked CardNode')}>
				<CardNodeColumn>
					<User size={20} />
				</CardNodeColumn>
				<CardNodeColumn>
					<CardNodeTitle>Title</CardNodeTitle>
					<CardNodeSubtitle>Description</CardNodeSubtitle>
				</CardNodeColumn>
			</CardNode>
		),
		noControls
	)

	.add(
		'As link',
		() => (
			<CardNode href="#">
				<CardNodeColumn>
					<User size={20} />
				</CardNodeColumn>
				<CardNodeColumn>
					<CardNodeTitle>Title</CardNodeTitle>
					<CardNodeSubtitle>Description</CardNodeSubtitle>
				</CardNodeColumn>
			</CardNode>
		),
		noControls
	)

	.add(
		'With label',
		() => (
			<CardNode>
				<CardNodeColumn>
					<CardNodeTitle>Title</CardNodeTitle>
					<CardNodeSubtitle>Description</CardNodeSubtitle>
					<CardNodeLabel>Label</CardNodeLabel>
				</CardNodeColumn>
			</CardNode>
		),
		noControls
	)

	.add(
		'With third column',
		() => (
			<CardNode>
				<CardNodeColumn>
					<User size={20} />
				</CardNodeColumn>
				<CardNodeColumn>
					<CardNodeTitle>Title</CardNodeTitle>
					<CardNodeSubtitle>Description</CardNodeSubtitle>
				</CardNodeColumn>
				<CardNodeColumn farsideColumn>
					<ChevronDown size={20} />
				</CardNodeColumn>
			</CardNode>
		),
		noControls
	)
