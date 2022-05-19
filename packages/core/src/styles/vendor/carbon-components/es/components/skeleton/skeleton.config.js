/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
'use strict';

var _require = require('../../globals/js/settings'),
    prefix = _require.prefix;

var tabItems = [{}, {}, {
  selected: true
}];
module.exports = {
  context: {
    prefix: prefix
  },
  variants: [{
    name: 'default',
    label: 'Skeleton',
    context: {
      breadCrumbItems: new Array(3),
      progressIndicatorSteps: new Array(4),
      tabItems: tabItems
    }
  }]
};