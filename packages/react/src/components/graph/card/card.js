import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import classnames from 'classnames';

const { prefix } = settings;

export default ({ color, description, label, onClick = () => {}, renderAction, renderIcon, stacked, title }) => {
	const namespace = `${prefix}--cc--card`;
	const icon = renderIcon ? (
		<div className={`${namespace}__icon`}>{renderIcon}</div>
	) : null;

	const cardClasses = classnames(namespace, {
		[`${namespace}--stacked`]: stacked,
	});

	const action = renderAction ? <div className={`${namespace}__action`}>{renderAction}</div> : null;
	const labelElement = label ? <div className={`${namespace}__label`}>{label}</div> : null;

	return (
		<div className={cardClasses} tabIndex={0} onClick={() => onClick()} style={{ borderColor: color }} >
			{icon}
			<div className={`${namespace}__body`}>
				<div className={`${namespace}__title`}>{title}</div>
				<div className={`${namespace}__description`}>{description}</div>
				{labelElement}
			</div>
			{action}
		</div>
	);
};
