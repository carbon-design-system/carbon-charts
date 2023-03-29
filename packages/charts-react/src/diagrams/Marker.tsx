import React from 'react'
import classnames from 'classnames'
import { carbonPrefix } from './utils'
import { Component as CarbonComponent } from '@carbon/charts'

type MarkerProps = {
	id?: string
	d?: string
	color?: string
	position?: 'start' | 'end'
	orient?: string | number
	height?: string | number
	width?: string | number
}

const Marker: React.FC<MarkerProps & React.SVGProps<SVGGElement>> = ({
	color,
	d,
	id,
	orient = 'auto',
	height,
	width,
	position = 'end',
	...rest
}: any) => {
	const namespace = `${carbonPrefix}--cc--marker`
	const classes = classnames(namespace, {
		[rest.className]: rest.className
	})

	const xPos = position === 'end' ? width / 2 + 0.5 : 0.5
	const yPos = height / 2

	return (
		<marker
			className={classes}
			markerHeight={height}
			markerWidth={width}
			orient={orient}
			id={id}
			refX={rest.refX || xPos}
			refY={rest.refY || yPos}
			markerUnits="userSpaceOnUse" {...rest}>
			<path d={d} style={{ fill: color }} />
		</marker>
	)
}

const ArrowLeftMarker = ({ ...rest }) => <Marker {...CarbonComponent.arrowLeft} {...rest} />
const ArrowRightMarker = ({ ...rest }) => <Marker {...CarbonComponent.arrowRight} {...rest} />
const CircleMarker = ({ ...rest }) => <Marker {...CarbonComponent.circle} {...rest} />
const DiamondMarker = ({ ...rest }) => <Marker {...CarbonComponent.diamond} {...rest} />
const SquareMarker = ({ ...rest }) => <Marker {...CarbonComponent.square} {...rest} />
const TeeMarker = ({ ...rest }) => <Marker {...CarbonComponent.tee} {...rest} />

export {
	Marker,
	ArrowLeftMarker,
	ArrowRightMarker,
	CircleMarker,
	DiamondMarker,
	SquareMarker,
	TeeMarker
}
