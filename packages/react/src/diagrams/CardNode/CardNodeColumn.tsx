import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import classnames from 'classnames';

// @ts-ignore
import settings from 'carbon-components/src/globals/js/settings';

const { prefix } = settings;
const namespace = `${prefix}--cc--card-node`;

const CardNodeColumn = ({ children, className, farsideColumn }: any) => {
	const classes = classnames(`${namespace}__column`, {
		[`${namespace}__column--farside`]: farsideColumn,
		[className]: className,
	});

	return <div className={classes}>{children}</div>;
};

export { CardNodeColumn };

CardNodeColumn.propTypes = {
	/**
	 * Pass in the children that will be rendered within the CardNodeColumn
	 */
	children: PropTypes.node,

	/**
	 * Provide an optional class to be applied on the outer element
	 */
	className: PropTypes.string,

	/**
	 * Specify whether this is the last column
	 */
	farsideColumn: PropTypes.bool,
};
