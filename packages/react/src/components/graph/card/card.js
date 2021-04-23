import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';

const { prefix } = settings;

export default ({ title, description, renderIcon }) => {
	const namespace = `${prefix}--cc--card`;
	const icon = renderIcon ? (
		<div className={`${namespace}__icon`}>{renderIcon}</div>
	) : null;

	return (
		<div className={namespace} tabIndex={0}>
			{icon}
			<div className={`${namespace}__body`}>
				<div className={`${namespace}__title`}>{title}</div>
				<div className={`${namespace}__description`}>{description}</div>
			</div>
		</div>
	);
};
