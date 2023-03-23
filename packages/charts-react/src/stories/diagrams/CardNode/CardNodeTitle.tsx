import PropTypes from 'prop-types'

import classnames from 'classnames'

// Carbon Prefix
import { carbonPrefix } from '../configs'

const namespace = `${carbonPrefix}--cc--card-node`

const CardNodeTitle = ({ children, className }: any) => {
	const classes = classnames(`${namespace}__title`, {
		[className]: className
	})

	return <div className={classes}>{children}</div>
}

export { CardNodeTitle }

CardNodeTitle.propTypes = {
	/**
	 * Pass in the children that will be rendered within the CardNodeTitle
	 */
	children: PropTypes.node,

	/**
	 * Provide an optional class to be applied on the outer element
	 */
	className: PropTypes.string
}
