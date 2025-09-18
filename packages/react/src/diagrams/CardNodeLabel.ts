import React from 'react'
import classnames from 'classnames'
import { carbonPrefix } from './utils'

type CardNodeLabelProps = {
	children?: React.ReactNode
}

const CardNodeLabel: React.FC<CardNodeLabelProps & React.HTMLAttributes<HTMLLabelElement>> = ({
	children,
	...rest
}) => {
	const namespace = `${carbonPrefix}--cc--card-node`
	const classes = classnames(`${namespace}__label`, {
		...(rest.className ? { [rest.className]: true } : {})
	})

	return React.createElement('label', { className: classes, ...rest }, children)
}

export { CardNodeLabel }
