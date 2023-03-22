import PropTypes from 'prop-types'

import classnames from 'classnames'

// Carbon Prefix
import { carbonPrefix } from '../configs'

const namespace = `${carbonPrefix}--cc--card-node`

const CardNodeLabel = ({ children, className }: any) => {
	const classes = classnames(`${namespace}__label`, {
		[className]: className
	})

	return <label className={classes}>{children}</label>
}

export { CardNodeLabel }

CardNodeLabel.propTypes = {
	/**
	 * Pass in the children that will be rendered within the CardNodeLabel
	 */
	children: PropTypes.node,

	/**
	 * Provide an optional class to be applied on the outer element
	 */
	className: PropTypes.string
}
