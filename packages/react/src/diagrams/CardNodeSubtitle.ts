import React from 'react'
import classnames from 'classnames'
import { carbonPrefix } from './utils'

type CardNodeSubtitleProps = {
	children?: React.ReactNode
}

const CardNodeSubtitle: React.FC<CardNodeSubtitleProps & React.HTMLAttributes<HTMLDivElement>> = ({
	children,
	...rest
}) => {
	const namespace = `${carbonPrefix}--cc--card-node`
	const classes = classnames(`${namespace}__subtitle`, {
		...(rest.className ? { [rest.className]: true } : {})
	})

	return React.createElement('div', { className: classes, ...rest }, children)
}

export { CardNodeSubtitle }
