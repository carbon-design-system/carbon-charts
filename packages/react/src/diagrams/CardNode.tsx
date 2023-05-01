import React from 'react'
import classnames from 'classnames'
import { carbonPrefix } from './utils'

type CssPosition = 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky'

type CardNodeProps = {
	tag?: 'div' | 'a' | 'button'
	href?: string
	stacked?: boolean
	color?: string
	position?: CssPosition
	children?: React.ReactNode
}

const CardNode: React.FC<
	CardNodeProps & React.HTMLAttributes<HTMLAnchorElement | HTMLDivElement | HTMLButtonElement>
> = ({ tag = 'div', children, color, href, position = 'static', stacked, ...rest }: any) => {
	const Component = href ? 'a' : rest.onClick ? 'button' : tag

	const namespace = `${carbonPrefix}--cc--card-node`
	const cardClasses = classnames(namespace, {
		[`${namespace}--stacked`]: stacked,
		[`${namespace}--${Component}`]: Component,
		[rest.className]: rest.className
	})

	return (
		<Component
			className={cardClasses}
			style={{ borderColor: color, position }}
			tabIndex={0}
			{...rest}>
			{children}
		</Component>
	)
}

export { CardNode }
