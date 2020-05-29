(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@carbon/colors'), require('@carbon/themes'), require('@carbon/layout'), require('@carbon/motion'), require('@carbon/type')) :
	typeof define === 'function' && define.amd ? define(['exports', '@carbon/colors', '@carbon/themes', '@carbon/layout', '@carbon/motion', '@carbon/type'], factory) :
	(factory((global.CarbonElements = {}),global.CarbonColors,global.CarbonThemes,global.CarbonLayout,global.CarbonMotion,global.CarbonType));
}(this, (function (exports,colors,themes,layout,motion,type) { 'use strict';

	/**
	 * Copyright IBM Corp. 2018, 2018
	 *
	 * This source code is licensed under the Apache-2.0 license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	Object.keys(colors).forEach(function (key) { exports[key] = colors[key]; });
	Object.keys(themes).forEach(function (key) { exports[key] = themes[key]; });
	Object.keys(layout).forEach(function (key) { exports[key] = layout[key]; });
	Object.keys(motion).forEach(function (key) { exports[key] = motion[key]; });
	Object.keys(type).forEach(function (key) { exports[key] = type[key]; });

	Object.defineProperty(exports, '__esModule', { value: true });

})));
