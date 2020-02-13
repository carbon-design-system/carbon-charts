/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import settings from './settings';
import * as defaultComponents from './components';
var components = defaultComponents;
/**
 * The handles for event handlers to lazily instantiate components.
 * @type {Handle[]}
 */

var lazyInitHandles = [];
/**
 * Instantiates components automatically
 * by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
 * or upon DOM events (e.g. clicking) on such elements.
 * See each components' static `.init()` methods for details.
 * @private
 */

var init = function init() {
  var componentClasses = Object.keys(components).map(function (key) {
    return components[key];
  }).filter(function (component) {
    return typeof component.init === 'function';
  });

  if (!settings.disableAutoInit) {
    componentClasses.forEach(function (Clz) {
      var h = Clz.init();

      if (h) {
        lazyInitHandles.push(h);
      }
    });
  }
};
/**
 * Replaces the list of components to initialize.
 * @param {object} componentsToReplaceWith The new list of components.
 */


export var setComponents = function setComponents(componentsToReplaceWith) {
  components = componentsToReplaceWith;
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // DOMContentLoaded has been fired already
  // Let consumer have chance to see if it wants automatic instantiation disabled, and then run automatic instantiation otherwise
  setTimeout(init, 0);
}

export default lazyInitHandles;