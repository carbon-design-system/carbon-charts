import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import settings from 'carbon-components/src/globals/js/settings';

// @ts-ignore
import classnames from 'classnames';

const { prefix } = settings;

const ShapeNode = ({
	as = 'div',
	href = null,
	onClick = null,
	onMouseEnter = null,
	onMouseOver = null,
	onMouseOut = null,
	onMouseLeave = null,
	onMouseMove = null,
	position = 'fixed',
	bodyPosition = 'absolute',
	renderIcon,
	size = 48,
	stacked,
	shape = 'circle',
	subtitle,
	title,
}: any) => {
	const namespace = `${prefix}--cc--shape-node`;

	let Component = 'div';

	if (href) {
		Component = 'a';
	} else if (onClick) {
		Component = 'button';
	}

	const circleClasses = classnames(namespace, {
		[`${namespace}--stacked`]: stacked,
		[`${namespace}--${shape}`]: shape,
		[`${namespace}--${Component}`]: Component,
	});

	const titleElement = title ? (
		<div className={`${namespace}__title`}>{title}</div>
	) : null;
	const subtitleElement = subtitle ? (
		<div className={`${namespace}__subtitle`}>{subtitle}</div>
	) : null;

	return (
		// @ts-ignore
		<Component
			className={circleClasses}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
			style={{ height: size, width: size, position }}
			tabIndex={0}>
			<div className={`${namespace}__icon`}>{renderIcon}</div>
			<div
				className={`${namespace}__body`}
				style={{ position: bodyPosition }}>
				{titleElement}
				{subtitleElement}
			</div>
		</Component>
	);
};

ShapeNode.propTypes = {
	/** Provide a custom element to be rendered instead of the default */
	as: PropTypes.oneOf(['div', 'a', 'button']),

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
	 * Function to render your own icon in the underlying button
	 */
	renderIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),

	/**
	 * Specify the height and width of the shape
	 * Can be defined using any CSS length unit (px, %, rem)
	 */
	size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	/**
	 * Specify whether the node displays a stacked effect
	 */
	stacked: PropTypes.bool,

	/**
	 * Specify the shape of the node
	 */
	shape: PropTypes.oneOf(['circle', 'square', 'rounded-square']),

	/**
	 * Specify the node's subtitle
	 */
	subtitle: PropTypes.string,

	/**
	 * Specify the node's title
	 */
	title: PropTypes.string,
};

export default ShapeNode;
