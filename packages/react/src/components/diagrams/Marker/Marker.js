import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import { arrowLeft, arrowRight, circle, diamond, square, tee } from "./markerDefinitions";

const { prefix } = settings;

const Marker = ({ d, color, id, orient = "auto", height, width, position = "end", refX, refY }) => {
	const namespace = `${prefix}--cc--marker`;

	const xPos = (position === "end") ? (width / 2) + 0.5 : 0.5;
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
