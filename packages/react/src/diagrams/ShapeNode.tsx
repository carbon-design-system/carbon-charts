import React from 'react'
import classnames from 'classnames'
import { carbonPrefix } from './utils'

type CssPosition = 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky'

type ShapeNodeProps = {
	shape?: 'circle' | 'square' | 'rounded-square'
	tag?: 'div' | 'button' | 'a'
	title?: string
	subtitle?: string
	description?: string
	renderIcon: React.ReactNode
	href?: string
	size?: string | number
	position?: CssPosition
	bodyPosition?: CssPosition
	stacked?: boolean
}

const ShapeNode: React.FC<
	ShapeNodeProps & React.HTMLAttributes<HTMLAnchorElement | HTMLDivElement | HTMLButtonElement>
> = ({
	shape = 'circle',
	tag = 'div',
	title = 'Title',
	subtitle,
	description,
	renderIcon,
	href,
	size = 48,
	stacked,
	position = 'fixed',
	bodyPosition = 'absolute',
	...rest
}) => {
	const Component = href ? 'a' : rest.onClick ? 'button' : tag

	const namespace = `${carbonPrefix}--cc--shape-node`
	const circleClasses = classnames(namespace, {
		[`${namespace}--stacked`]: stacked,
		[`${namespace}--${shape}`]: shape,
		[`${namespace}--${tag}`]: tag,
		[rest.className as string]: rest.className
	})

	const titleElement = title ? <div className={`${namespace}__title`}>{title}</div> : null
	const subtitleElement = subtitle ? (
		<div className={`${namespace}__subtitle`}>{subtitle}</div>
	) : null
	const descriptionElement = description ? (
		<div className={`${namespace}__description`}>{description}</div>
	) : null

	return (
		<Component
			className={circleClasses}
			style={{ height: size, width: size, position }}
			tabIndex={0}
			{...rest}>
			<div className={`${namespace}__icon`}>{renderIcon}</div>
			<div className={`${namespace}__body`} style={{ position: bodyPosition }}>
				{titleElement}
				{subtitleElement}
				{descriptionElement}
			</div>
		</Component>
	)
}

export default ShapeNode
