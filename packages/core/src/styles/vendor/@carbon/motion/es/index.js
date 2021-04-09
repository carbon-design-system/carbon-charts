/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fast01 = '70ms';
var fast02 = '110ms';
var moderate01 = '150ms';
var moderate02 = '240ms';
var slow01 = '400ms';
var slow02 = '700ms';
var unstable_tokens = ['fast01', 'fast02', 'moderate01', 'moderate02', 'slow01', 'slow02'];
var easings = {
  standard: {
    productive: 'cubic-bezier(0.2, 0, 0.38, 0.9)',
    expressive: 'cubic-bezier(0.4, 0.14, 0.3, 1)'
  },
  entrance: {
    productive: 'cubic-bezier(0, 0, 0.38, 0.9)',
    expressive: 'cubic-bezier(0, 0, 0.3, 1)'
  },
  exit: {
    productive: 'cubic-bezier(0.2, 0, 1, 0.9)',
    expressive: 'cubic-bezier(0.4, 0.14, 1, 1)'
  }
};
function motion(name, mode) {
  if (!easings[name]) {
    throw new Error("Unable to find easing `".concat(name, "` in our supported easings. Expected ") + "One of: ".concat(Object.keys(easings).join(', ')));
  }

  var easing = easings[name];

  if (!easing[mode]) {
    throw new Error("Unable to find a mode for the easing `".concat(name, "` called: `").concat(mode, "`"));
  }

  return easing[mode];
}

export { easings, fast01, fast02, moderate01, moderate02, motion, slow01, slow02, unstable_tokens };
