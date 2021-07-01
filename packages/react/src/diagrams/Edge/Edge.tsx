import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import settings from 'carbon-components/src/globals/js/settings';

// @ts-ignore
import classnames from 'classnames';

import { buildStraightPathString } from '@carbon/charts/components/diagrams/buildPaths';

const { prefix } = settings;

const Edge = ({
	color,
	markerEnd,
	markerStart,
	onMouseEnter = null,
	onMouseOver = null,
	onMouseOut = null,
	onMouseLeave = null,
	onMouseMove = null,
	path,
	source,
	target,
	variant = null,
}: any) => {
	const namespace = `${prefix}--cc--edge`;

	const pathClasses = classnames(namespace, {
		[`${namespace}--${variant}`]: variant,
	});

	const d = path || buildStraightPathString(source, target);

	return (
		<g
			className={pathClasses}
			onMouseEnter={onMouseEnter}
			onMouseOver={onMouseOver}
			onMouseOut={onMouseOut}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}>
			<path d={d} className={`${namespace}__container`} />
			<path d={d} className={`${namespace}__outer`} />
			<path
				d={d}
				className={`${namespace}__inner`}
				markerEnd={`url(#${markerEnd})`}
				markerStart={`url(#${markerStart})`}
				style={{ stroke: color }}
			/>
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
	 * Specify a path string
	 */
	path: PropTypes.string,

	/**
	 * Coordinates for the source element
	 */
	source: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
	}),

	/**
	 * Coordinates for the target element
	 */
	target: PropTypes.shape({
		x: PropTypes.number,
		y: PropTypes.number,
	}),

	/**
	 * Specify the variant of the edge
	 */
	variant: PropTypes.oneOf([
		'dash-sm',
		'dash-md',
		'dash-lg',
		'dash-xl',
		'double',
		'tunnel',
	]),
};
