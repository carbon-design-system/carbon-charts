import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import { arrowLeft, arrowRight, circle, diamond, square, tee } from "./markerDefinitions";

const { prefix } = settings;

const Marker = ({ d, color, id, orient = "auto", height, width, refX, refY }) => {
	const namespace = `${prefix}--cc--marker`;

	return (
		<marker
			className={namespace}
			markerHeight={height}
			markerWidth={width}
			orient={orient}
			id={id}
			refX={refX}
			refY={refY}
			markerUnits="userSpaceOnUse"
		>
			<path d={d} style={{ fill: color }} />
		</marker>
	);
};

const ArrowLeftMarker = ({...rest}) => <Marker {...arrowLeft} {...rest} />;
const ArrowRightMarker = ({...rest}) => <Marker {...arrowRight} {...rest} />;
const CircleMarker = ({...rest}) => <Marker {...circle} {...rest} />;
const DiamondMarker = ({...rest}) => <Marker {...diamond} {...rest} />;
const SquareMarker = ({...rest}) => <Marker {...square} {...rest} />;
const TeeMarker = ({...rest}) => <Marker {...tee} {...rest} />;

export {
	Marker as default,
	ArrowLeftMarker,
	ArrowRightMarker,
	CircleMarker,
	DiamondMarker,
	SquareMarker,
	TeeMarker
};
