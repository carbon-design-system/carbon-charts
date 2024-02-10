import React from 'react'
import { Link } from 'react-router-dom'
import './GraphTile.scss'

interface Props {
	title: string
	route: string
	svg: string
}

const GraphTile: React.FC<Props> = ({ title, route, svg }) => {
	return (
		<div className="graph-tile">
			<Link to={route} className="cds--tile cds--tile--clickable">
				<div className="graph-tile-content">
					<span className="graph-tile-title">{title}</span>
					<img className="graph-tile-svg" src={`/${svg}.svg`} />
				</div>
			</Link>
		</div>
	)
}

export default GraphTile
