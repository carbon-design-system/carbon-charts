import { getAttributes, toString } from '@carbon/icon-helpers';

export default (icon) => {
	return toString({
		...icon,
		attrs: getAttributes(icon.attrs),
	});
};
