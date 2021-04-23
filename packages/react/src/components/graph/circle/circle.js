import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';

const { prefix } = settings;

export default ({ title, description, renderIcon }) => {
	const namespace = `${prefix}--cc--circle`;

	const titleElement = title ? <div className={`${namespace}__title`}>{title}</div> : null;
	const descriptionElement = description ? <div className={`${namespace}__description`}>{description}</div> : null;

	return (
		<div className={namespace} tabIndex={0}>
			<div className={`${namespace}__icon`}>{renderIcon}</div>
			<div className={`${namespace}__body`}>
				{titleElement}
				{descriptionElement}
			</div>
		</div>
	);
};
