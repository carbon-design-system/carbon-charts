import React from 'react'
import classnames from 'classnames'
import { Component as CarbonComponent } from '@carbon/charts'
import { carbonPrefix } from './utils'

type Coordinates = {
	x: number
	y: number
}
type EdgeProps = {
	color?: string
	markerStart?: string
	markerEnd?: string
	source?: Coordinates
	target?: Coordinates
	path?: string
	variant?: 'dash-sm' | 'dash-md' | 'dash-lg' | 'dash-xl' | 'double' | 'tunnel'
}

const Edge: React.FC<EdgeProps & React.SVGProps<SVGGElement>> = ({
	color,
	markerEnd,
	markerStart,
	path,
	source,
	target,
	variant = null,
	...rest
}: any) => {
	const namespace = `${carbonPrefix}--cc--edge`
	const pathClasses = classnames(namespace, {
		[`${namespace}--${variant}`]: variant,
		[rest.className]: rest.className
	})

	const d = path || CarbonComponent.buildStraightPathString(source, target)

	return (
		<g className={pathClasses} {...rest}>
			<path d={d} className={`${namespace}__container`} />
			<path d={d} className={`${namespace}__outer`} />
			<path
				d={d}
				className={`${namespace}__inner`}
				markerEnd={`url(#${markerEnd})`}
				markerStart={`url(#${markerStart})`}
				style={{ stroke: color }}
			/>
		</g>
	)
}

export default Edge
