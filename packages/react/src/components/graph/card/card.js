import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import classnames from 'classnames';

const { prefix } = settings;

export default ({ description, onClick, renderIcon, stacked, title }) => {
	const namespace = `${prefix}--cc--card`;
	const icon = renderIcon ? (
		<div className={`${namespace}__icon`}>{renderIcon}</div>
	) : null;

	const cardClasses = classnames(namespace, {
		[`${namespace}--stacked`]: stacked,
	});

	return (
		<div className={cardClasses} tabIndex={0} onClick={() => onClick()}>
			{icon}
			<div className={`${namespace}__body`}>
				<div className={`${namespace}__title`}>{title}</div>
				<div className={`${namespace}__description`}>{description}</div>
			</div>
		</div>
	);
};
