import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import { straight } from './buildPath';
import classnames from 'classnames';

const { prefix } = settings;

export default ({
	markerEnd,
	markerStart,
	path,
	source,
	color,
	target,
	variant = null,
}) => {
	const namespace = `${prefix}--cc--edge`;

	const pathClasses = classnames(namespace, {
		[`${namespace}--${variant}`]: variant,
	});

	const d = path || straight(source, target);

	return (
		<g className={pathClasses}>
			<path d={d} className={`${namespace}__container`} />
			<path d={d} className={`${namespace}__outer`} />
			<path d={d} className={`${namespace}__inner`} markerEnd={`url(#${markerEnd})`} markerStart={`url(#${markerStart})`} style={{ stroke: color }} />
		</g>
	);
};
