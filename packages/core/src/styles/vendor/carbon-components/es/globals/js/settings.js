/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Settings.
 * @exports CarbonComponents.settings
 * @type Object
 * @property {boolean} [disableAutoInit]
 *   Disables automatic instantiation of components.
 *   By default (`CarbonComponents.disableAutoInit` is `false`),
 *   carbon-components attempts to instantiate components automatically
 *   by searching for elements with `data-component-name` (e.g. `data-loading`) attribute
 *   or upon DOM events (e.g. clicking) on such elements.
 *   See each components' static `.init()` methods for details.
 * @property {string} [prefix=bx]
 *   Brand prefix. Should be in sync with `$prefix` Sass variable in carbon-components/src/globals/scss/_vars.scss.
 * // @todo given that the default value is so long, is it appropriate to put in the JSDoc?
 * @property {string} [selectorTabbable]
 *   A selector selecting tabbable/focusable nodes.
 *   By default selectorTabbable references links, areas, inputs, buttons, selects, textareas,
 *   iframes, objects, embeds, or elements explicitly using tabindex or contenteditable attributes
 *   as long as the element is not `disabled` or the `tabindex="-1"`.
 * @property {string} [selectorFocusable]
 *   CSS selector that selects major nodes that are click focusable
 *   This property is identical to selectorTabbable with the exception of
 *   the `:not([tabindex='-1'])` pseudo class
 */
var settings = {
  prefix: 'bx',
  selectorTabbable: "\n    a[href], area[href], input:not([disabled]):not([tabindex='-1']),\n    button:not([disabled]):not([tabindex='-1']),select:not([disabled]):not([tabindex='-1']),\n    textarea:not([disabled]):not([tabindex='-1']),\n    iframe, object, embed, *[tabindex]:not([tabindex='-1']), *[contenteditable=true]\n  ",
  selectorFocusable: "\n    a[href], area[href], input:not([disabled]),\n    button:not([disabled]),select:not([disabled]),\n    textarea:not([disabled]),\n    iframe, object, embed, *[tabindex], *[contenteditable=true]\n  "
};
var settings_1 = settings;
export { settings_1 as default };