import {
	InlineNotification,
	StructuredListWrapper,
	StructuredListHead,
	StructuredListRow,
	StructuredListCell,
	StructuredListBody,
	Tag
} from '@carbon/react'
import {
	CardNode,
	CardNodeColumn,
	CardNodeTitle,
	CardNodeSubtitle,
	CardNodeLabel,
	ArrowLeftMarker,
	ArrowRightMarker,
	CircleMarker,
	DiamondMarker,
	Edge,
	SquareMarker,
	TeeMarker,
	ShapeNode
} from '@carbon/charts-react'
import { User } from '@carbon/icons-react'
import PageHeader from '../components/PageHeader'
import styled from 'styled-components'

import '@carbon/charts-react/styles.css'

const ExampleDiv = styled.div`
	margin-top: 0.25rem;
	width: 500px;
`

const StyledIframe = styled.iframe`
	width: 100%;
	height: 47rem;
	margin-top: 1em;
	border: 0;
	border-radius: 0.25rem;
`

export default function Diagram() {
	return (
		<>
			<PageHeader title="Network Diagrams" />
			<p>
				Carbon Charts Diagrams for <Tag type="blue">React</Tag> and{' '}
				<Tag type="magenta">Angular</Tag> includes components that enable you to create diagrams
				using the Carbon Design System styling.
			</p>
			<InlineNotification
				title="Note"
				kind="info-square"
				subtitle="Network Diagrams are ONLY available for Angular and React."
			/>
			<p>These include:</p>
			<StructuredListWrapper>
				<StructuredListHead>
					<StructuredListRow head>
						<StructuredListCell head>Component</StructuredListCell>
						<StructuredListCell head>Details</StructuredListCell>
					</StructuredListRow>
				</StructuredListHead>
				<StructuredListBody>
					<StructuredListRow>
						<StructuredListCell noWrap>
							<Tag type="blue">CardNode</Tag> <Tag type="magenta">ibm-diagram-card-node</Tag>
						</StructuredListCell>
						<StructuredListCell>
							A rectangular container that typically contains an icon, title and subtitle.
							Properties: tag ('div' | 'a' | 'button'), href (only for tag = 'a'), stacked, color
							and position. This example uses CardNode and its child components: CardNodeColumn,
							CardNodeTitle, CardNodeSubtitle and CardNodeLabel.
							<ExampleDiv>
								<CardNode onClick={() => console.log('CardNode was clicked')}>
									<CardNodeColumn>
										<User size={20} />
									</CardNodeColumn>
									<CardNodeColumn>
										<CardNodeTitle>Title</CardNodeTitle>
										<CardNodeSubtitle>Description</CardNodeSubtitle>
										<CardNodeLabel>Label</CardNodeLabel>
									</CardNodeColumn>
								</CardNode>
							</ExampleDiv>
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>
							<Tag type="blue">CardNodeColumn</Tag>{' '}
							<Tag type="magenta">ibm-diagram-card-node-column</Tag>
						</StructuredListCell>
						<StructuredListCell>
							Used to divide a CardNode typically to place an icon on the left and title and
							subtitle on the right. Rendered as a DIV. Properties: farsideColumn.
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>
							<Tag type="blue">CardNodeTitle</Tag>{' '}
							<Tag type="magenta">ibm-diagram-card-node-title</Tag>
						</StructuredListCell>
						<StructuredListCell>
							DIV containing the title for a CardNode typically displayed in the right
							CardNodeColumn typically displayed with a font-weight of 700.
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>
							<Tag type="blue">CardNodeSubtitle</Tag>{' '}
							<Tag type="magenta">ibm-diagram-card-node-subtitle</Tag>
						</StructuredListCell>
						<StructuredListCell>
							DIV containing the subtitle for a CardNode typically displayed in the right
							CardNodeColumn below the CardNodeTitle.
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>
							<Tag type="blue">CardNodeLabel</Tag>{' '}
							<Tag type="magenta">ibm-diagram-card-node-label</Tag>
						</StructuredListCell>
						<StructuredListCell>
							LABEL tag optionally used within a CardNode that is typically positioned below the
							CardNodeTitle and CardNodeSubtitle using a muted color.
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>
							<Tag type="blue">Marker</Tag> <Tag type="magenta">ibm-graph-marker</Tag>
						</StructuredListCell>
						<StructuredListCell>
							Shape to attach to the start and/or end of an Edge. Renders as an SVG marker tag.
							Properties: id, d (SVG path data), color, position ('start' | 'end'), orient, height,
							width, refX, refY. See{' '}
							<a
								href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/marker"
								target="_blank">
								MDN documentation
							</a>{' '}
							for more details about the properties. Examples of Markers used with variants of the
							Edge component:
							<ExampleDiv>
								<svg height={30} width={200}>
									<defs>
										<ArrowLeftMarker id="marker" height={8} width={7.5} />
									</defs>

									<Edge
										source={{ x: 10, y: 15 }}
										target={{ x: 190, y: 15 }}
										markerStart={'marker'}
										variant={'dash-sm'}
									/>
								</svg>
								<br />

								<svg height={30} width={200}>
									<defs>
										<ArrowRightMarker id="marker" height={8} width={7.5} />
									</defs>

									<Edge
										source={{ x: 10, y: 15 }}
										target={{ x: 190, y: 15 }}
										markerEnd={'marker'}
										variant={'dash-md'}
									/>
								</svg>
								<br />

								<svg height={30} width={200}>
									<defs>
										<CircleMarker id="marker" height={10} width={10} />
									</defs>

									<Edge
										source={{ x: 10, y: 15 }}
										target={{ x: 190, y: 15 }}
										markerStart={'marker'}
										variant={'dash-lg'}
									/>
								</svg>
								<br />

								<svg height={30} width={200}>
									<defs>
										<DiamondMarker id="marker" height={10} width={10} />
									</defs>

									<Edge
										source={{ x: 10, y: 15 }}
										target={{ x: 190, y: 15 }}
										markerStart={'marker'}
										variant={'dash-xl'}
									/>
								</svg>
								<br />

								<svg height={30} width={200}>
									<defs>
										<SquareMarker id="marker" height={10} width={10} color={'green'} />
									</defs>

									<Edge
										source={{ x: 10, y: 15 }}
										target={{ x: 190, y: 15 }}
										markerStart={'marker'}
										variant={'double'}
										color={'green'}
									/>
								</svg>
								<br />

								<svg height={30} width={200}>
									<defs>
										<TeeMarker id="marker" height={10} width={1} color={'blue'} />
									</defs>

									<Edge
										source={{ x: 10, y: 15 }}
										target={{ x: 190, y: 15 }}
										markerStart={'marker'}
										color={'blue'}
									/>
								</svg>
								<br />

								<svg height={30} width={200}>
									<defs>
										<TeeMarker id="marker" color={'#FB4B53'} height={10} width={1} />
									</defs>

									<Edge
										source={{ x: 10, y: 15 }}
										target={{ x: 190, y: 15 }}
										markerStart={'marker'}
										color={'#FB4B53'}
										variant={'tunnel'}
									/>
								</svg>
							</ExampleDiv>
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>
							<Tag type="blue">Edge</Tag> <Tag type="magenta">ibm-graph-edge</Tag>
						</StructuredListCell>
						<StructuredListCell>
							An SVG group (g) element representing a connecting line typically between CardNodes.
							Properties: color, markerStart (name of marker style), markerEnd, source
							(Coordinates), target (Coordinates), path (SVG path) and variant ( 'dash-sm' |
							'dash-md' | 'dash-lg' | 'dash-xl' | 'double' | 'tunnel'). Manipulation of the path
							property enables elbows and bezier curves.
							<br />
							<svg height="260" width="800">
								<g transform="translate(16,16)">
									<Edge path={'M0,0L200,0L200,200L400,200'} />
								</g>
							</svg>
							<br />
							<svg height="260" width="800">
								<g transform="translate(16,16)">
									<Edge path={'M0,0C150,280,150,30,400,200'} />
								</g>
							</svg>
						</StructuredListCell>
					</StructuredListRow>
					<StructuredListRow>
						<StructuredListCell noWrap>
							<Tag type="blue">ShapeNode</Tag> <Tag type="magenta">ibm-diagram-shape-node</Tag>
						</StructuredListCell>
						<StructuredListCell>
							A shape such as a circle, square or rounded square rendered as a DIV, A or BUTTON
							typically containing an icon. Properties: tag ('a', 'button', 'div'), title, shape
							('circle', 'square', 'rounded-square'), renderIcon, description, size, stacked,
							position ('fixed'), bodyPosition ('absolute'). Examples:
							<br />
							<ShapeNode title={'Title'} renderIcon={<User />} position={'relative'} />
							<br />
							<br />
							<ShapeNode
								title={'Title'}
								renderIcon={<User />}
								position={'relative'}
								shape="rounded-square"
							/>
							<br />
							<br />
							<ShapeNode
								title={'Title'}
								renderIcon={<User />}
								position={'relative'}
								shape="square"
							/>
						</StructuredListCell>
					</StructuredListRow>
				</StructuredListBody>
			</StructuredListWrapper>
			<h3>Putting it all together</h3>
			<div style={{ marginBottom: '60px' }}>
				Open demo in{' '}
				<a
					href="https://codesandbox.io/p/sandbox/carbon-charts-react-elkjs-diagram-b9xyp"
					target="_blank"
					rel="noopener noreferrer">
					CodeSandbox
				</a>
			</div>
		</>
	)
}
