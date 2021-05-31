import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import { straight } from './buildPath';
import classnames from 'classnames';

const { prefix } = settings;

export default ({
	source,
	target,
	variant = null,
	path = straight(source, target),
}) => {
	const namespace = `${prefix}--cc--edge`;

	const pathClasses = classnames(namespace, {
		[`${namespace}--${variant}`]: variant,
	});

	return (
		<g className={pathClasses}>
			<path d={path} className={`${namespace}__container`} />
			<path d={path} className={`${namespace}__outer`} />
			<path d={path} className={`${namespace}__inner`} />
		</g>
	);
};
