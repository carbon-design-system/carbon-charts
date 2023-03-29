import React from 'react'
import classnames from 'classnames'
import { carbonPrefix } from './utils'

type CardNodeLabelProps = {
	children?: React.ReactNode
}

const CardNodeLabel: React.FC<CardNodeLabelProps & React.HTMLAttributes<HTMLLabelElement>> = ({ children, ...rest }: any) => {
	const namespace = `${carbonPrefix}--cc--card-node`
	const classes = classnames(`${namespace}__label`, {
		[rest.className]: rest.className
	})

	return <label className={classes} {...rest}>{children}</label>
}

export { CardNodeLabel }
