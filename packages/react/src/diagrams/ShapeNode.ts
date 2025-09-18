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
	className?: string
}

const ShapeNode: React.FC<
	ShapeNodeProps & React.HTMLAttributes<HTMLAnchorElement | HTMLDivElement | HTMLButtonElement>
> = ({
	shape = 'circle',
	tag = 'div',
	title = 'Title',
	className,
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
		[`${namespace}--${Component}`]: Component,
		[className as string]: className
	})

	const titleElement = title
		? React.createElement('div', { className: `${namespace}__title` }, title)
		: null
	const subtitleElement = subtitle
		? React.createElement('div', { className: `${namespace}__subtitle` }, subtitle)
		: null
	const descriptionElement = description
		? React.createElement('div', { className: `${namespace}__description` }, description)
		: null

	return React.createElement(
		Component,
		{
			className: circleClasses,
			style: { height: size, width: size, position },
			tabIndex: 0,
			...rest
		},
		React.createElement('div', { className: `${namespace}__icon` }, renderIcon),
		React.createElement(
			'div',
			{ className: `${namespace}__body`, style: { position: bodyPosition } },
			titleElement,
			subtitleElement,
			descriptionElement
		)
	)
}

export default ShapeNode
