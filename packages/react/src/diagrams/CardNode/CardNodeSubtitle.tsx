import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import settings from 'carbon-components/src/globals/js/settings';

const { prefix } = settings;
const namespace = `${prefix}--cc--card-node`;

const CardNodeSubtitle = ({ children }: any) => (
	<div className={`${namespace}__subtitle`}>{children}</div>
);

export { CardNodeSubtitle };

CardNodeSubtitle.propTypes = {
	/**
	 * Pass in the children that will be rendered within the CardNodeSubtitle
	 */
	children: PropTypes.node,
};
