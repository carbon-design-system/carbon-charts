import {
	ArrowRightMarker,
	CardNode,
	CardNodeColumn,
	CardNodeSubtitle,
	CardNodeTitle,
	Edge,
	ShapeNode
} from '@carbon/charts-react'
import { User, Wikis } from '@carbon/icons-react'
import DesktopOnlyMessage from './DesktopOnlyMessage'

const nodeHeight = 64
const nodeWidth = 200
const shapeNodeSize = 64

export default function SimpleStatic() {
	return (
		<div className="demo-desktop-only">
			<DesktopOnlyMessage />

			<svg height="124" width="600" style={{ marginTop: '1em' }}>
				<defs>
					<ArrowRightMarker id={'marker'} />
				</defs>

				<Edge
					source={{ x: 0, y: 48 }}
					target={{ x: 396, y: 48 }}
					markerEnd={'marker'}
					variant={'dash-sm'}
				/>

				<foreignObject
					style={{ overflow: 'visible' }}
					transform={`translate(0, 16)`}
					height={nodeHeight}
					width={nodeWidth}>
					<CardNode onClick={() => console.log('CardNode was clicked')}>
						<CardNodeColumn>
							<User size={20} />
						</CardNodeColumn>
						<CardNodeColumn>
							<CardNodeTitle>Title</CardNodeTitle>
							<CardNodeSubtitle>Description</CardNodeSubtitle>
						</CardNodeColumn>
					</CardNode>
				</foreignObject>

				<foreignObject
					style={{ overflow: 'visible' }}
					transform={`translate(400, 16)`}
					height={nodeHeight}
					width={nodeWidth}>
					<ShapeNode
						title={'Title'}
						size={shapeNodeSize}
						onClick={() => console.log('ShapeNode was clicked')}
						renderIcon={<Wikis size={20} fill={'black'} />}
					/>
				</foreignObject>
			</svg>
		</div>
	)
}
