import React from 'react'
import classnames from 'classnames'
import { carbonPrefix } from './utils'

type CardNodeColumnProps = {
	children?: React.ReactNode
	farsideColumn?: boolean
}

const CardNodeColumn: React.FC<CardNodeColumnProps & React.HTMLAttributes<HTMLDivElement>> = ({ children, farsideColumn = false, ...rest }: any) => {
	const namespace = `${carbonPrefix}--cc--card-node`
	const classes = classnames(`${namespace}__column`, {
		[`${namespace}__column--farside`]: farsideColumn,
		[rest.className]: rest.className
	})

	return <div className={classes} {...rest}>{children}</div>
}

export { CardNodeColumn }
