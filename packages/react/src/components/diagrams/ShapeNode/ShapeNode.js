import React from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/src/globals/js/settings';
import classnames from 'classnames';

const { prefix } = settings;

const ShapeNode = ({ as = "div", href = null, onClick = null, renderIcon,  size = 48, stacked, shape = "circle", subtitle, title }) => {
	const namespace = `${prefix}--cc--shape-node`;

	let Component = 'div';

	if (as !== 'div') {
		Component = as;
	} else if (href) {
		Component = 'a';
	} else if (onClick) {
		Component = 'button';
	};

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
		<Component className={circleClasses} style={{ height: size, width: size }} tabIndex={0} onClick={onClick}>
			<div className={`${namespace}__icon`}>{renderIcon}</div>
			<div className={`${namespace}__body`}>
				{titleElement}
				{subtitleElement}
			</div>
		</Component>
	);
};

ShapeNode.propTypes = {
	/** Provide a custom element to be rendered instead of the default */
	as: PropTypes.elementType,

	/**
	 * Optionally specify an href for the CardNode to become an `<a>` element
	 */
	href: PropTypes.string,

	/**
	 * Provide an optional function to be called when the CardNode
	 * is clicked, turning the CardNode into a `<button>` element
	 */
	onClick: PropTypes.func,
};

export default ShapeNode;
