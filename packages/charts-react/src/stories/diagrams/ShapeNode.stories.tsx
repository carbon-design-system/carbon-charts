import { storiesOf } from '@storybook/react'
import { User } from '@carbon/icons-react'
import ShapeNode from './ShapeNode'

const stories = storiesOf('Diagrams/Nodes/Shape', module)
stories.addDecorator((story) => <div className="container theme--white">{story()}</div>)

stories.add('Default', () => <ShapeNode title={'Title'} renderIcon={<User />} />, {
	controls: {
		hideNoControlsWarning: true
	}
})

stories.add('Square', () => <ShapeNode title={'Title'} renderIcon={<User />} shape="square" />, {
	controls: {
		hideNoControlsWarning: true
	}
})

stories.add(
	'Rounded square',
	() => <ShapeNode title={'Title'} renderIcon={<User />} shape="rounded-square" />,
	{
		controls: {
			hideNoControlsWarning: true
		}
	}
)

stories.add(
	'As button',
	() => <ShapeNode title={'Title'} onClick={() => {}} renderIcon={<User />} />,
	{
		controls: {
			hideNoControlsWarning: true
		}
	}
)

stories.add('As link', () => <ShapeNode title={'Title'} href="#" renderIcon={<User />} />)

stories.add(
	'Inherited dimensions',
	() => (
		<div style={{ height: 64, width: 64, position: 'relative' }}>
			<ShapeNode title={'Title'} renderIcon={<User />} size={'100%'} position="static" />
		</div>
	),
	{
		controls: {
			hideNoControlsWarning: true
		}
	}
)
