import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import buildPathString from './buildPath';

const { prefix } = settings;

export default ({ source, target }) => {
	const namespace = `${prefix}--cc--edge`;
	const pathString = buildPathString(source, target);

	return (
	<path
		d={pathString}
		strokeWidth={1}
		className={namespace}
		strokeDasharray={0}
	/>
	);
};
