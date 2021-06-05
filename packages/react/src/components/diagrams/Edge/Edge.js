import React from 'react';
import PropTypes from 'prop-types';
import settings from 'carbon-components/src/globals/js/settings';
import { straight } from './buildPath';
import classnames from 'classnames';

const { prefix } = settings;

const Edge = ({
	color,
	markerEnd,
	markerStart,
	path,
	source,
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

export default Edge;

Edge.propTypes = {
	/**
	* Specify the edge's color
	*/
	color: PropTypes.string,

	/**
	* Specify an ID for a corresponding end marker
	*/
	markerEnd: PropTypes.string,

	/**
	* Specify an ID for a corresponding start marker
	*/
	markerStart: PropTypes.string,

	/**
	* Specify a path string
	*/
	path: PropTypes.string,

	/**
	* Coordinates for the source element
	*/
	source: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	}),

	/**
	* Coordinates for the target element
	*/
	target: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number
	}),

	/**
	* Specify the variant of the edge
	*/
	variant: PropTypes.oneOf(['dash-sm', 'dash-md', 'dash-lg', 'dash-xl', 'double', 'tunnel']),
};
