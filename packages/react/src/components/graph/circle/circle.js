import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';

const { prefix } = settings;

export default ({ description, onClick = () => {}, renderIcon,  size = 48, title }) => {
	const namespace = `${prefix}--cc--circle`;

	const titleElement = title ? (
		<div className={`${namespace}__title`}>{title}</div>
	) : null;
	const descriptionElement = description ? (
		<div className={`${namespace}__description`}>{description}</div>
	) : null;

	return (
		<div className={namespace} style={{ height: size, width: size }} tabIndex={0} onClick={onClick}>
			<div className={`${namespace}__icon`}>{renderIcon}</div>
			<div className={`${namespace}__body`}>
				{titleElement}
				{descriptionElement}
			</div>
		</div>
	);
};
