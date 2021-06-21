import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import settings from 'carbon-components/src/globals/js/settings';

const { prefix } = settings;
const namespace = `${prefix}--cc--card-node`;

const CardNodeColumn = ({ children, farsideColumn }: any) => (
	<div
		className={`${namespace}__column ${
			farsideColumn && `${namespace}__column--farside`
		}`}>
		{children}
	</div>
);

export { CardNodeColumn };

CardNodeColumn.propTypes = {
	/**
	 * Pass in the children that will be rendered within the CardNodeColumn
	 */
	children: PropTypes.node,

	/**
	 * Specify whether this is the last column
	 */
	farsideColumn: PropTypes.bool,
};
