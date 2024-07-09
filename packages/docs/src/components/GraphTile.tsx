import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Props {
	title: string
	route: string
	svg: string
}

const GraphTileContainer = styled.div`
	margin-right: 1px;
	margin-bottom: 1px;
`

const GraphTileLink = styled(Link)`
	display: block;
	text-decoration: none;
`

const GraphTileContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`

const GraphTileTitle = styled.span`
	font-size: 0.75rem;
	color: black;
`

const GraphTileSvg = styled.img`
	height: 15rem;
	width: 15rem;
`

const GraphTile: React.FC<Props> = ({ title, route, svg }) => {
	return (
		<GraphTileContainer>
			<GraphTileLink to={route} className="cds--tile cds--tile--clickable">
				<GraphTileContent>
					<GraphTileTitle>{title}</GraphTileTitle>
					<GraphTileSvg src={`/images/${svg}.svg`} />
				</GraphTileContent>
			</GraphTileLink>
		</GraphTileContainer>
	)
}

export default GraphTile
