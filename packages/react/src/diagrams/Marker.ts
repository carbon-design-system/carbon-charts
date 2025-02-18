import React, { SVGProps } from 'react'
import classnames from 'classnames'
import { carbonPrefix } from './utils'
import { arrowLeft, arrowRight, circle, diamond, square, tee } from '@carbon/charts'

interface MarkerProps extends SVGProps<SVGMarkerElement> {
	id?: string
	d?: string
	color?: string
	position?: 'start' | 'end'
	orient?: string | number
	height?: number
	width?: number
	refX?: number
	refY?: number
}

const Marker: React.FC<MarkerProps> = ({
	color,
	d,
	id,
	orient = 'auto',
	height,
	width,
	position = 'end',
	className,
	refX,
	refY,
	...rest
}) => {
	const namespace = `${carbonPrefix}--cc--marker`
	const classes = classnames(namespace, className)

	const xPos = position === 'end' ? (width || 0) / 2 + 0.5 : 0.5
	const yPos = (height || 0) / 2

	return React.createElement(
		'marker',
		{
			className: classes,
			markerHeight: height,
			markerWidth: width,
			orient: orient,
			id: id,
			refX: refX || xPos,
			refY: refY || yPos,
			markerUnits: 'userSpaceOnUse',
			...rest
		},
		React.createElement('path', { d: d, style: { fill: color } })
	)
}

const ArrowLeftMarker: React.FC<Omit<MarkerProps, 'd'>> = props =>
	React.createElement(Marker, { d: arrowLeft.d, ...props })

const ArrowRightMarker: React.FC<Omit<MarkerProps, 'd'>> = props =>
	React.createElement(Marker, { d: arrowRight.d, ...props })

const CircleMarker: React.FC<Omit<MarkerProps, 'd'>> = props =>
	React.createElement(Marker, { d: circle.d, ...props })

const DiamondMarker: React.FC<Omit<MarkerProps, 'd'>> = props =>
	React.createElement(Marker, { d: diamond.d, ...props })

const SquareMarker: React.FC<Omit<MarkerProps, 'd'>> = props =>
	React.createElement(Marker, { d: square.d, ...props })

const TeeMarker: React.FC<Omit<MarkerProps, 'd'>> = props =>
	React.createElement(Marker, { d: tee.d, ...props })

export {
	Marker,
	ArrowLeftMarker,
	ArrowRightMarker,
	CircleMarker,
	DiamondMarker,
	SquareMarker,
	TeeMarker
}
