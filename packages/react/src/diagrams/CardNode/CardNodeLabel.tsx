import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import settings from 'carbon-components/src/globals/js/settings';

const { prefix } = settings;
const namespace = `${prefix}--cc--card-node`;

const CardNodeLabel = ({ children }: any) => (
	<label className={`${namespace}__label`}>{children}</label>
);

export { CardNodeLabel };

CardNodeLabel.propTypes = {
	/**
	 * Pass in the children that will be rendered within the CardNodeLabel
	 */
	children: PropTypes.node,
};
