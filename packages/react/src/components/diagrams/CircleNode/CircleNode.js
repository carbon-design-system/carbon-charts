import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import classnames from 'classnames';

const { prefix } = settings;

export default ({ as = "div", description, href = null, onClick = null, renderIcon,  size = 48, stacked, title }) => {
	const namespace = `${prefix}--cc--circle-node`;

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
		[`${namespace}--${Component}`]: Component,
	});

	const titleElement = title ? (
		<div className={`${namespace}__title`}>{title}</div>
	) : null;
	const descriptionElement = description ? (
		<div className={`${namespace}__description`}>{description}</div>
	) : null;

	return (
		<Component className={circleClasses} style={{ height: size, width: size }} tabIndex={0} onClick={onClick}>
			<div className={`${namespace}__icon`}>{renderIcon}</div>
			<div className={`${namespace}__body`}>
				{titleElement}
				{descriptionElement}
			</div>
		</Component>
	);
};
