import React from 'react';
import settings from 'carbon-components/src/globals/js/settings';
import classnames from 'classnames';

const { prefix } = settings;
const namespace = `${prefix}--cc--card`;

const Card = ({ as = "div", children, color, href = null, onClick = null, stacked }) => {
	let Component = 'div';

	if (as !== 'div') {
		Component = as;
	} else if (href) {
		Component = 'a';
	} else if (onClick) {
		Component = 'button';
	}

	const cardClasses = classnames(namespace, {
		[`${namespace}--stacked`]: stacked,
		[`${namespace}--${Component}`]: Component,
	});

	return (
		<Component className={cardClasses} tabIndex={0} onClick={() => onClick()} style={{ borderColor: color }} >
			{children}
		</Component>
	);
};

const CardColumn = ({children, farsideColumn}) => <div className={`${namespace}__column ${farsideColumn && `${namespace}__column--farside` }`}>{children}</div>;
const CardTitle = ({children}) => <h2 className={`${namespace}__title`}>{children}</h2>;
const CardDescription = ({children}) => <p className={`${namespace}__description`}>{children}</p>;
const CardLabel = ({children}) => <label className={`${namespace}__label`}>{children}</label>;

export {
	Card as default,
	CardColumn,
	CardTitle,
	CardDescription,
	CardLabel
}
