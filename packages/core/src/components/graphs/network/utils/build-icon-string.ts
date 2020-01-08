import { getAttributes, toString } from "@carbon/icon-helpers/es/index.js";

export default (icon) => {
	return toString({
		...icon,
		attrs: getAttributes(icon.attrs),
	});
};
