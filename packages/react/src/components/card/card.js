import React from "react";
import settings from "carbon-components/src/globals/js/settings";

const { prefix } = settings;

export default ({ title, description, icon }) => {
	const namespace = `${prefix}--cc--card`

	return (
		<div className={namespace} tabIndex={0}>
		<div className={`${namespace}__icon`}>{icon}</div>
		<div className={`${namespace}__body`}>
			<div className={`${namespace}__title`}>{title}</div>
			<div className={`${namespace}__description`}>{description}</div>
		</div>
		</div>
	)
};
