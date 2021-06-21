import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import settings from 'carbon-components/src/globals/js/settings';

const { prefix } = settings;
const namespace = `${prefix}--cc--card-node`;

const CardNodeTitle = ({ children }: any) => (
	<div className={`${namespace}__title`}>{children}</div>
);

export { CardNodeTitle };

CardNodeTitle.propTypes = {
	/**
	 * Pass in the children that will be rendered within the CardNodeTitle
	 */
	children: PropTypes.node,
};
