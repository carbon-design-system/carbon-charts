'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var colors = require('@carbon/colors');
var themes = require('@carbon/themes');
var layout = require('@carbon/layout');
var motion = require('@carbon/motion');
var type = require('@carbon/type');

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
