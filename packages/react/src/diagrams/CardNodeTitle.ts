import React from 'react'
import classnames from 'classnames'
import { carbonPrefix } from './utils'

type CardNodeTitleProps = {
	children?: React.ReactNode
}

const CardNodeTitle: React.FC<CardNodeTitleProps & React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	...rest
}) => {
	const namespace = `${carbonPrefix}--cc--card-node`
	const classes = classnames(`${namespace}__title`, {
		...(rest.className ? { [rest.className]: true } : {})
	})

	return React.createElement('div', { className: classes, ...rest }, children)
}

export { CardNodeTitle }
