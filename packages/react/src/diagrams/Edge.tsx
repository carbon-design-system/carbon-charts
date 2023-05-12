import React from 'react'
import classnames from 'classnames'
import { buildStraightPathString } from '@carbon/charts'
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
	target?: Coordinates // Conflicts with React.SVGProps<SVGGElement> type for target
	path?: string
	variant?: string // 'dash-sm' | 'dash-md' | 'dash-lg' | 'dash-xl' | 'double' | 'tunnel'
}

type EdgeSVGProps = Omit<React.SVGProps<SVGGElement>, 'target'>

const Edge: React.FC<EdgeProps & EdgeSVGProps> = ({
	color,
	markerEnd,
	markerStart,
	path,
	source,
	target,
	variant = null,
	...rest
}) => {
	const namespace = `${carbonPrefix}--cc--edge`
	const pathClasses = classnames(namespace, {
		[`${namespace}--${variant}`]: variant,
		...(rest.className ? { [rest.className]: true } : {})
	})

	let d = path
	if (!d && source && target) {
		d = buildStraightPathString(source, target)
	}

	if (!d) throw Error('Missing parameters for Edge component: path or source and target.')

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
