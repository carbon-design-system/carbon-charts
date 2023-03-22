import { storiesOf, moduleMetadata } from '@storybook/angular'
import { CardNodeModule } from './card-node/card-node.module'
import { ScreenModule, ChevronDownModule } from '@carbon/icons-angular'

const getTemplate = (content: string) => `
	<div class="container theme--white" style="max-width: 400px;">
		${content}
	</div>
`

storiesOf('Diagrams/Nodes/Card', module)
	.addDecorator(
		moduleMetadata({
			imports: [CardNodeModule, ScreenModule, ChevronDownModule]
		})
	)
	.add('Default', () => ({
		template: getTemplate(`
		<ibm-diagram-card-node>
			<ibm-diagram-card-node-column>
				<ibm-diagram-card-node-title>
					{{ title }}
				</ibm-diagram-card-node-title>
				<ibm-diagram-card-node-subtitle>
					{{ description }}
				</ibm-diagram-card-node-subtitle>
			</ibm-diagram-card-node-column>
		</ibm-diagram-card-node>
	`),
		props: {
			title: 'Title',
			description: 'Description'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Stacked', () => ({
		template: getTemplate(`
		<ibm-diagram-card-node [stacked]="stacked">
			<ibm-diagram-card-node-column>
				<ibm-diagram-card-node-title>
					{{ title }}
				</ibm-diagram-card-node-title>
				<ibm-diagram-card-node-subtitle>
					{{ description }}
				</ibm-diagram-card-node-subtitle>
			</ibm-diagram-card-node-column>
		</ibm-diagram-card-node>
	`),
		props: {
			title: 'Title',
			description: 'Description',
			stacked: true
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('Color', () => ({
		template: getTemplate(`
	<ibm-diagram-card-node [color]="color">
		<ibm-diagram-card-node-column>
			<ibm-diagram-card-node-title>
				{{ title }}
			</ibm-diagram-card-node-title>
			<ibm-diagram-card-node-subtitle>
				{{ description }}
			</ibm-diagram-card-node-subtitle>
		</ibm-diagram-card-node-column>
	</ibm-diagram-card-node>
	`),
		props: {
			title: 'Title',
			description: 'Description',
			color: '#8a3ffc'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('With icon', () => ({
		template: getTemplate(`
	<ibm-diagram-card-node [color]="color">
		<ibm-diagram-card-node-column>
			<svg ibmIconScreen size="16"></svg>
		</ibm-diagram-card-node-column>
		<ibm-diagram-card-node-column>
			<ibm-diagram-card-node-title>
				{{ title }}
			</ibm-diagram-card-node-title>
			<ibm-diagram-card-node-subtitle>
				{{ description }}
			</ibm-diagram-card-node-subtitle>
		</ibm-diagram-card-node-column>
	</ibm-diagram-card-node>
	`),
		props: {
			title: 'Title',
			description: 'Description'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('As button', () => ({
		template: getTemplate(`
	<ibm-diagram-card-node [as]="component">
		<ibm-diagram-card-node-column>
			<ibm-diagram-card-node-title>
				{{ title }}
			</ibm-diagram-card-node-title>
			<ibm-diagram-card-node-subtitle>
				{{ description }}
			</ibm-diagram-card-node-subtitle>
		</ibm-diagram-card-node-column>
	</ibm-diagram-card-node>
	`),
		props: {
			title: 'Title',
			description: 'Description',
			component: 'button'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('As link', () => ({
		template: getTemplate(`
	<ibm-diagram-card-node [href]="href">
		<ibm-diagram-card-node-column>
			<ibm-diagram-card-node-title>
				{{ title }}
			</ibm-diagram-card-node-title>
			<ibm-diagram-card-node-subtitle>
				{{ description }}
			</ibm-diagram-card-node-subtitle>
		</ibm-diagram-card-node-column>
	</ibm-diagram-card-node>
	`),
		props: {
			title: 'Title',
			description: 'Description',
			href: '#'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('With label', () => ({
		template: getTemplate(`
	<ibm-diagram-card-node [color]="color">
		<ibm-diagram-card-node-column>
			<svg ibmIconScreen size="16"></svg>
		</ibm-diagram-card-node-column>
		<ibm-diagram-card-node-column>
			<ibm-diagram-card-node-title>
				{{ title }}
			</ibm-diagram-card-node-title>
			<ibm-diagram-card-node-subtitle>
				{{ description }}
			</ibm-diagram-card-node-subtitle>
			<ibm-diagram-card-node-label>
				{{ label }}
			</ibm-diagram-card-node-label>
		</ibm-diagram-card-node-column>
	</ibm-diagram-card-node>
	`),
		props: {
			title: 'Title',
			description: 'Description',
			label: 'Label'
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
	.add('With action', () => ({
		template: getTemplate(`
	<ibm-diagram-card-node [color]="color">
		<ibm-diagram-card-node-column>
			<svg ibmIconScreen size="16"></svg>
		</ibm-diagram-card-node-column>
		<ibm-diagram-card-node-column>
			<ibm-diagram-card-node-title>
				{{ title }}
			</ibm-diagram-card-node-title>
			<ibm-diagram-card-node-subtitle>
				{{ description }}
			</ibm-diagram-card-node-subtitle>
		</ibm-diagram-card-node-column>
		<ibm-diagram-card-node-column [farsideColumn]="farsideColumn">
			<svg ibmIconChevronDown size="16"></svg>
		</ibm-diagram-card-node-column>
	</ibm-diagram-card-node>
	`),
		props: {
			title: 'Title',
			description: 'Description',
			farsideColumn: true
		}
	}),
	{
		controls: {
			hideNoControlsWarning: true
		}
	})
