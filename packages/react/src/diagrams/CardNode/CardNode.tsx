import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import classnames from 'classnames';

// @ts-ignore
import settings from 'carbon-components/src/globals/js/settings';

const { prefix } = settings;
const namespace = `${prefix}--cc--card-node`;

const CardNode = ({
	as = 'div',
	children,
	color,
	href = null,
	onMouseEnter = null,
	onMouseOver = null,
	onMouseOut = null,
	onMouseLeave = null,
	onMouseMove = null,
	onClick = null,
	position = 'static',
	stacked,
}: any) => {
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
		// @ts-ignore
		<Component
			className={cardClasses}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
			style={{ borderColor: color, position }}
			tabIndex={0}>
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
	 * Provide an optional function to be called for the onMouseEnter event
	 */
	onMouseEnter: PropTypes.func,

	/**
	 * Provide an optional function to be called for the onMouseOver event
	 */
	onMouseOver: PropTypes.func,

	/**
	 * Provide an optional function to be called for the onMouseOut event
	 */
	onMouseOut: PropTypes.func,

	/**
	 * Provide an optional function to be called for the onMouseLeave event
	 */
	onMouseLeave: PropTypes.func,

	/**
	 * Provide an optional function to be called for the onMouseMove event
	 */
	onMouseMove: PropTypes.func,

	/**
	 * Specify whether the node displays a stacked effect
	 */
	stacked: PropTypes.bool,
};
