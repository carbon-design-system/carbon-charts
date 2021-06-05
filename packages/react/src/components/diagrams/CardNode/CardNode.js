import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import settings from 'carbon-components/src/globals/js/settings';
const { prefix } = settings;
const namespace = `${prefix}--cc--card-node`;

const CardNode = ({ as = "div", children, color, href = null, onClick = null, stacked }) => {
	let Component = 'div';

	if (as !== 'div') {
		Component = as;
	} else if (href) {
		Component = 'a';
	} else if (onClick) {
		Component = 'button';
	}

	const cardClasses = classnames(namespace, {
		[`${namespace}--stacked`]: stacked,
		[`${namespace}--${Component}`]: Component,
	});

	return (
		<Component className={cardClasses} tabIndex={0} onClick={onClick} style={{ borderColor: color }} >
			{children}
		</Component>
	);
};

export default CardNode;

CardNode.propTypes = {
	/** Provide a custom element to be rendered instead of the default */
	as: PropTypes.elementType,

	/**
	 * Pass in the children that will be rendered within the CardNode
	 */
	children: PropTypes.node,

	/**
	* Specify the node's border color
	*/
	color: PropTypes.string,

	/**
	 * Optionally specify an href for the CardNode to become an `<a>` element
	 */
	href: PropTypes.string,

	/**
	 * Provide an optional function to be called when the CardNode
	 * is clicked, turning the CardNode into a `<button>` element
	 */
	onClick: PropTypes.func,

	/**
	* Specify whether the node displays a stacked effect
	*/
	stacked: PropTypes.bool
};
