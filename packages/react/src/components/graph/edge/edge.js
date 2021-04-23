import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import {straight} from './buildPath';
import classnames from "classnames"

const { prefix } = settings;

export default ({ source, target, variant = null, path = straight(source, target) }) => {
	const namespace = `${prefix}--cc--edge`;

	const pathClasses = classnames(namespace, {
		[`${namespace}--${variant}`]: variant,
	});

	return (
		<path
			d={path}
			strokeWidth={1.5}
			className={pathClasses}
		/>
	);
};
