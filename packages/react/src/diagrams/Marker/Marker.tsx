import React from 'react';
import PropTypes from 'prop-types';

// @ts-ignore
import settings from 'carbon-components/src/globals/js/settings';

import {
	arrowLeft,
	arrowRight,
	circle,
	diamond,
	square,
	tee,
} from '@carbon/charts/components/diagrams/markerDefinitions';

const { prefix } = settings;

const Marker = ({
	d,
	color,
	id,
	orient = 'auto',
	height,
	width,
	position = 'end',
	refX,
	refY,
}: any) => {
	const namespace = `${prefix}--cc--marker`;

	const xPos = position === 'end' ? width / 2 + 0.5 : 0.5;
	const yPos = height / 2;

	return (
		<marker
			className={namespace}
			markerHeight={height}
			markerWidth={width}
			orient={orient}
			id={id}
			refX={refX || xPos}
			refY={refY || yPos}
			markerUnits="userSpaceOnUse">
			<path d={d} style={{ fill: color }} />
		</marker>
	);
};

const ArrowLeftMarker = ({ ...rest }) => <Marker {...arrowLeft} {...rest} />;
const ArrowRightMarker = ({ ...rest }) => <Marker {...arrowRight} {...rest} />;
const CircleMarker = ({ ...rest }) => <Marker {...circle} {...rest} />;
const DiamondMarker = ({ ...rest }) => <Marker {...diamond} {...rest} />;
const SquareMarker = ({ ...rest }) => <Marker {...square} {...rest} />;
const TeeMarker = ({ ...rest }) => <Marker {...tee} {...rest} />;

export {
	Marker as default,
	ArrowLeftMarker,
	ArrowRightMarker,
	CircleMarker,
	DiamondMarker,
	SquareMarker,
	TeeMarker,
};

Marker.propTypes = {
	/**
	 * Specify a path string
	 */
	d: PropTypes.string,

	/**
	 * Specify the marker's color
	 */
	color: PropTypes.string,

	/**
	 * Specify an ID for the marker
	 */
	id: PropTypes.string,

	/**
	 * Specify the orient attribute for the marker
	 */
	orient: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	/**
	 * Specify the height attribute for the marker
	 */
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	/**
	 * Specify the width attribute for the marker
	 */
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	/**
	 * Specify whether this marker appears at the start or end of a line
	 */
	position: PropTypes.oneOf(['end', 'start']),

	/**
	 * Specify the refX attribute for the marker
	 */
	refX: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

	/**
	 * Specify the refY attribute for the marker
	 */
	refY: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
