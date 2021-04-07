'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Color = require('color');
var colors$1 = require('@carbon/colors');
var type = require('@carbon/type');
var layout = require('@carbon/layout');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Color__default = /*#__PURE__*/_interopDefaultLegacy(Color);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Adjust a given token's lightness by a specified percentage
 * Example: token = hsl(10, 10, 10);
 * adjustLightness(token, 5) === hsl(10, 10, 15);
 * adjustLightness(token, -5) === hsl(10, 10, 5);
 * @param {string} token
 * @param {integer} shift The number of percentage points (positive or negative) by which to shift the lightness of a token.
 * @returns {string}
 */

function adjustLightness(token, shift) {
  var original = Color__default['default'](token).hsl().object();
  return Color__default['default'](_objectSpread2(_objectSpread2({}, original), {}, {
    l: original.l += shift
  })).round().hex().toLowerCase();
}

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01 = colors$1.blue60;
var interactive02 = colors$1.gray80;
var interactive03 = colors$1.blue60;
var interactive04 = colors$1.blue60;
var uiBackground = colors$1.white;
var ui01 = colors$1.gray10;
var ui02 = colors$1.white;
var ui03 = colors$1.gray20;
var ui04 = colors$1.gray50;
var ui05 = colors$1.gray100;
var text01 = colors$1.gray100;
var text02 = colors$1.gray70;
var text03 = colors$1.gray40;
var text04 = colors$1.white;
var text05 = colors$1.gray60;
var textError = colors$1.red60;
var icon01 = colors$1.gray100;
var icon02 = colors$1.gray70;
var icon03 = colors$1.white;
var link01 = colors$1.blue60;
var link02 = colors$1.blue70;
var inverseLink = colors$1.blue40;
var field01 = colors$1.gray10;
var field02 = colors$1.white;
var inverse01 = colors$1.white;
var inverse02 = colors$1.gray80;
var support01 = colors$1.red60;
var support02 = colors$1.green50;
var support03 = colors$1.yellow;
var support04 = colors$1.blue70;
var inverseSupport01 = colors$1.red50;
var inverseSupport02 = colors$1.green40;
var inverseSupport03 = colors$1.yellow;
var inverseSupport04 = colors$1.blue50;
var overlay01 = colors$1.rgba(colors$1.gray100, 0.5);
var danger01 = colors$1.red60;
var danger02 = colors$1.red60; // Interaction states

var focus = colors$1.blue60;
var inverseFocusUi = colors$1.white;
var hoverPrimary = '#0353e9';
var activePrimary = colors$1.blue80;
var hoverPrimaryText = colors$1.blue70;
var hoverSecondary = '#4c4c4c';
var activeSecondary = colors$1.gray60;
var hoverTertiary = '#0353e9';
var activeTertiary = colors$1.blue80;
var hoverUI = '#e5e5e5';
var hoverLightUI = '#e5e5e5';
var activeUI = colors$1.gray30;
var activeLightUI = colors$1.gray30;
var selectedUI = colors$1.gray20;
var selectedLightUI = colors$1.gray20;
var inverseHoverUI = '#4c4c4c';
var hoverSelectedUI = '#cacaca';
var hoverDanger = adjustLightness(danger01, -8);
var activeDanger = colors$1.red80;
var hoverRow = '#e5e5e5';
var visitedLink = colors$1.purple60;
var disabled01 = colors$1.gray10;
var disabled02 = colors$1.gray30;
var disabled03 = colors$1.gray50;
var highlight = colors$1.blue20;
var decorative01 = colors$1.gray20;
var buttonSeparator = '#e0e0e0';
var skeleton01 = '#e5e5e5';
var skeleton02 = colors$1.gray30; // Type

var brand01 = interactive01;
var brand02 = interactive02;
var brand03 = interactive03;
var active01 = activeUI;
var hoverField = hoverUI;
var danger = danger01;

var white = /*#__PURE__*/Object.freeze({
  __proto__: null,
  interactive01: interactive01,
  interactive02: interactive02,
  interactive03: interactive03,
  interactive04: interactive04,
  uiBackground: uiBackground,
  ui01: ui01,
  ui02: ui02,
  ui03: ui03,
  ui04: ui04,
  ui05: ui05,
  text01: text01,
  text02: text02,
  text03: text03,
  text04: text04,
  text05: text05,
  textError: textError,
  icon01: icon01,
  icon02: icon02,
  icon03: icon03,
  link01: link01,
  link02: link02,
  inverseLink: inverseLink,
  field01: field01,
  field02: field02,
  inverse01: inverse01,
  inverse02: inverse02,
  support01: support01,
  support02: support02,
  support03: support03,
  support04: support04,
  inverseSupport01: inverseSupport01,
  inverseSupport02: inverseSupport02,
  inverseSupport03: inverseSupport03,
  inverseSupport04: inverseSupport04,
  overlay01: overlay01,
  danger01: danger01,
  danger02: danger02,
  focus: focus,
  inverseFocusUi: inverseFocusUi,
  hoverPrimary: hoverPrimary,
  activePrimary: activePrimary,
  hoverPrimaryText: hoverPrimaryText,
  hoverSecondary: hoverSecondary,
  activeSecondary: activeSecondary,
  hoverTertiary: hoverTertiary,
  activeTertiary: activeTertiary,
  hoverUI: hoverUI,
  hoverLightUI: hoverLightUI,
  activeUI: activeUI,
  activeLightUI: activeLightUI,
  selectedUI: selectedUI,
  selectedLightUI: selectedLightUI,
  inverseHoverUI: inverseHoverUI,
  hoverSelectedUI: hoverSelectedUI,
  hoverDanger: hoverDanger,
  activeDanger: activeDanger,
  hoverRow: hoverRow,
  visitedLink: visitedLink,
  disabled01: disabled01,
  disabled02: disabled02,
  disabled03: disabled03,
  highlight: highlight,
  decorative01: decorative01,
  buttonSeparator: buttonSeparator,
  skeleton01: skeleton01,
  skeleton02: skeleton02,
  brand01: brand01,
  brand02: brand02,
  brand03: brand03,
  active01: active01,
  hoverField: hoverField,
  danger: danger,
  caption01: type.caption01,
  label01: type.label01,
  helperText01: type.helperText01,
  bodyShort01: type.bodyShort01,
  bodyLong01: type.bodyLong01,
  bodyShort02: type.bodyShort02,
  bodyLong02: type.bodyLong02,
  code01: type.code01,
  code02: type.code02,
  heading01: type.heading01,
  productiveHeading01: type.productiveHeading01,
  heading02: type.heading02,
  productiveHeading02: type.productiveHeading02,
  productiveHeading03: type.productiveHeading03,
  productiveHeading04: type.productiveHeading04,
  productiveHeading05: type.productiveHeading05,
  productiveHeading06: type.productiveHeading06,
  productiveHeading07: type.productiveHeading07,
  expressiveHeading01: type.expressiveHeading01,
  expressiveHeading02: type.expressiveHeading02,
  expressiveHeading03: type.expressiveHeading03,
  expressiveHeading04: type.expressiveHeading04,
  expressiveHeading05: type.expressiveHeading05,
  expressiveHeading06: type.expressiveHeading06,
  expressiveParagraph01: type.expressiveParagraph01,
  quotation01: type.quotation01,
  quotation02: type.quotation02,
  display01: type.display01,
  display02: type.display02,
  display03: type.display03,
  display04: type.display04,
  spacing01: layout.spacing01,
  spacing02: layout.spacing02,
  spacing03: layout.spacing03,
  spacing04: layout.spacing04,
  spacing05: layout.spacing05,
  spacing06: layout.spacing06,
  spacing07: layout.spacing07,
  spacing08: layout.spacing08,
  spacing09: layout.spacing09,
  spacing10: layout.spacing10,
  spacing11: layout.spacing11,
  spacing12: layout.spacing12,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  layout01: layout.layout01,
  layout02: layout.layout02,
  layout03: layout.layout03,
  layout04: layout.layout04,
  layout05: layout.layout05,
  layout06: layout.layout06,
  layout07: layout.layout07,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  iconSize01: layout.iconSize01,
  iconSize02: layout.iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01$1 = colors$1.blue60;
var interactive02$1 = colors$1.gray80;
var interactive03$1 = colors$1.blue60;
var interactive04$1 = colors$1.blue60;
var uiBackground$1 = colors$1.gray10;
var ui01$1 = colors$1.white;
var ui02$1 = colors$1.gray10;
var ui03$1 = colors$1.gray20;
var ui04$1 = colors$1.gray50;
var ui05$1 = colors$1.gray100;
var text01$1 = colors$1.gray100;
var text02$1 = colors$1.gray70;
var text03$1 = colors$1.gray40;
var text04$1 = colors$1.white;
var text05$1 = colors$1.gray60;
var textError$1 = colors$1.red60;
var icon01$1 = colors$1.gray100;
var icon02$1 = colors$1.gray70;
var icon03$1 = colors$1.white;
var link01$1 = colors$1.blue60;
var link02$1 = colors$1.blue70;
var inverseLink$1 = colors$1.blue40;
var field01$1 = colors$1.white;
var field02$1 = colors$1.gray10;
var inverse01$1 = colors$1.white;
var inverse02$1 = colors$1.gray80;
var support01$1 = colors$1.red60;
var support02$1 = colors$1.green50;
var support03$1 = colors$1.yellow;
var support04$1 = colors$1.blue70;
var inverseSupport01$1 = colors$1.red50;
var inverseSupport02$1 = colors$1.green40;
var inverseSupport03$1 = colors$1.yellow;
var inverseSupport04$1 = colors$1.blue50;
var overlay01$1 = colors$1.rgba(colors$1.gray100, 0.5);
var danger01$1 = colors$1.red60;
var danger02$1 = colors$1.red60; // Interaction states

var focus$1 = colors$1.blue60;
var inverseFocusUi$1 = colors$1.white;
var hoverPrimary$1 = '#0353e9';
var activePrimary$1 = colors$1.blue80;
var hoverPrimaryText$1 = colors$1.blue70;
var hoverSecondary$1 = '#4c4c4c';
var activeSecondary$1 = colors$1.gray60;
var hoverTertiary$1 = '#0353e9';
var activeTertiary$1 = colors$1.blue80;
var hoverUI$1 = '#e5e5e5';
var hoverLightUI$1 = '#e5e5e5';
var activeUI$1 = colors$1.gray30;
var activeLightUI$1 = colors$1.gray30;
var selectedUI$1 = colors$1.gray20;
var selectedLightUI$1 = colors$1.gray20;
var inverseHoverUI$1 = '#4c4c4c';
var hoverSelectedUI$1 = '#cacaca';
var hoverDanger$1 = adjustLightness(danger01$1, -8);
var activeDanger$1 = colors$1.red80;
var hoverRow$1 = '#e5e5e5';
var visitedLink$1 = colors$1.purple60;
var disabled01$1 = colors$1.white;
var disabled02$1 = colors$1.gray30;
var disabled03$1 = colors$1.gray50;
var highlight$1 = colors$1.blue10;
var decorative01$1 = colors$1.gray20;
var buttonSeparator$1 = '#e0e0e0';
var skeleton01$1 = '#e5e5e5';
var skeleton02$1 = colors$1.gray30;

var brand01$1 = interactive01$1;
var brand02$1 = interactive02$1;
var brand03$1 = interactive03$1;
var active01$1 = activeUI$1;
var hoverField$1 = hoverUI$1;
var danger$1 = danger01$1;

var g10 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  interactive01: interactive01$1,
  interactive02: interactive02$1,
  interactive03: interactive03$1,
  interactive04: interactive04$1,
  uiBackground: uiBackground$1,
  ui01: ui01$1,
  ui02: ui02$1,
  ui03: ui03$1,
  ui04: ui04$1,
  ui05: ui05$1,
  text01: text01$1,
  text02: text02$1,
  text03: text03$1,
  text04: text04$1,
  text05: text05$1,
  textError: textError$1,
  icon01: icon01$1,
  icon02: icon02$1,
  icon03: icon03$1,
  link01: link01$1,
  link02: link02$1,
  inverseLink: inverseLink$1,
  field01: field01$1,
  field02: field02$1,
  inverse01: inverse01$1,
  inverse02: inverse02$1,
  support01: support01$1,
  support02: support02$1,
  support03: support03$1,
  support04: support04$1,
  inverseSupport01: inverseSupport01$1,
  inverseSupport02: inverseSupport02$1,
  inverseSupport03: inverseSupport03$1,
  inverseSupport04: inverseSupport04$1,
  overlay01: overlay01$1,
  danger01: danger01$1,
  danger02: danger02$1,
  focus: focus$1,
  inverseFocusUi: inverseFocusUi$1,
  hoverPrimary: hoverPrimary$1,
  activePrimary: activePrimary$1,
  hoverPrimaryText: hoverPrimaryText$1,
  hoverSecondary: hoverSecondary$1,
  activeSecondary: activeSecondary$1,
  hoverTertiary: hoverTertiary$1,
  activeTertiary: activeTertiary$1,
  hoverUI: hoverUI$1,
  hoverLightUI: hoverLightUI$1,
  activeUI: activeUI$1,
  activeLightUI: activeLightUI$1,
  selectedUI: selectedUI$1,
  selectedLightUI: selectedLightUI$1,
  inverseHoverUI: inverseHoverUI$1,
  hoverSelectedUI: hoverSelectedUI$1,
  hoverDanger: hoverDanger$1,
  activeDanger: activeDanger$1,
  hoverRow: hoverRow$1,
  visitedLink: visitedLink$1,
  disabled01: disabled01$1,
  disabled02: disabled02$1,
  disabled03: disabled03$1,
  highlight: highlight$1,
  decorative01: decorative01$1,
  buttonSeparator: buttonSeparator$1,
  skeleton01: skeleton01$1,
  skeleton02: skeleton02$1,
  brand01: brand01$1,
  brand02: brand02$1,
  brand03: brand03$1,
  active01: active01$1,
  hoverField: hoverField$1,
  danger: danger$1,
  caption01: type.caption01,
  label01: type.label01,
  helperText01: type.helperText01,
  bodyShort01: type.bodyShort01,
  bodyLong01: type.bodyLong01,
  bodyShort02: type.bodyShort02,
  bodyLong02: type.bodyLong02,
  code01: type.code01,
  code02: type.code02,
  heading01: type.heading01,
  productiveHeading01: type.productiveHeading01,
  heading02: type.heading02,
  productiveHeading02: type.productiveHeading02,
  productiveHeading03: type.productiveHeading03,
  productiveHeading04: type.productiveHeading04,
  productiveHeading05: type.productiveHeading05,
  productiveHeading06: type.productiveHeading06,
  productiveHeading07: type.productiveHeading07,
  expressiveHeading01: type.expressiveHeading01,
  expressiveHeading02: type.expressiveHeading02,
  expressiveHeading03: type.expressiveHeading03,
  expressiveHeading04: type.expressiveHeading04,
  expressiveHeading05: type.expressiveHeading05,
  expressiveHeading06: type.expressiveHeading06,
  expressiveParagraph01: type.expressiveParagraph01,
  quotation01: type.quotation01,
  quotation02: type.quotation02,
  display01: type.display01,
  display02: type.display02,
  display03: type.display03,
  display04: type.display04,
  spacing01: layout.spacing01,
  spacing02: layout.spacing02,
  spacing03: layout.spacing03,
  spacing04: layout.spacing04,
  spacing05: layout.spacing05,
  spacing06: layout.spacing06,
  spacing07: layout.spacing07,
  spacing08: layout.spacing08,
  spacing09: layout.spacing09,
  spacing10: layout.spacing10,
  spacing11: layout.spacing11,
  spacing12: layout.spacing12,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  layout01: layout.layout01,
  layout02: layout.layout02,
  layout03: layout.layout03,
  layout04: layout.layout04,
  layout05: layout.layout05,
  layout06: layout.layout06,
  layout07: layout.layout07,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  iconSize01: layout.iconSize01,
  iconSize02: layout.iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01$2 = colors$1.blue60;
var interactive02$2 = colors$1.gray60;
var interactive03$2 = colors$1.white;
var interactive04$2 = colors$1.blue50;
var uiBackground$2 = colors$1.gray100;
var ui01$2 = colors$1.gray90;
var ui02$2 = colors$1.gray80;
var ui03$2 = colors$1.gray80;
var ui04$2 = colors$1.gray60;
var ui05$2 = colors$1.gray10;
var text01$2 = colors$1.gray10;
var text02$2 = colors$1.gray30;
var text03$2 = colors$1.gray60;
var text04$2 = colors$1.white;
var text05$2 = colors$1.gray50;
var textError$2 = colors$1.red40;
var icon01$2 = colors$1.gray10;
var icon02$2 = colors$1.gray30;
var icon03$2 = colors$1.white;
var link01$2 = colors$1.blue40;
var link02$2 = colors$1.blue30;
var inverseLink$2 = colors$1.blue60;
var field01$2 = colors$1.gray90;
var field02$2 = colors$1.gray80;
var inverse01$2 = colors$1.gray100;
var inverse02$2 = colors$1.gray10;
var support01$2 = colors$1.red50;
var support02$2 = colors$1.green40;
var support03$2 = colors$1.yellow;
var support04$2 = colors$1.blue50;
var inverseSupport01$2 = colors$1.red60;
var inverseSupport02$2 = colors$1.green50;
var inverseSupport03$2 = colors$1.yellow;
var inverseSupport04$2 = colors$1.blue60;
var overlay01$2 = colors$1.rgba(colors$1.gray100, 0.7);
var danger01$2 = colors$1.red60;
var danger02$2 = colors$1.red50; // Interaction states

var focus$2 = colors$1.white;
var inverseFocusUi$2 = colors$1.blue60;
var hoverPrimary$2 = '#0353e9';
var activePrimary$2 = colors$1.blue80;
var hoverPrimaryText$2 = colors$1.blue30;
var hoverSecondary$2 = '#606060';
var activeSecondary$2 = colors$1.gray80;
var hoverTertiary$2 = colors$1.gray10;
var activeTertiary$2 = colors$1.gray30;
var hoverUI$2 = '#353535';
var hoverLightUI$2 = '#4c4c4c';
var activeUI$2 = colors$1.gray70;
var activeLightUI$2 = colors$1.gray60;
var selectedUI$2 = colors$1.gray80;
var selectedLightUI$2 = colors$1.gray70;
var inverseHoverUI$2 = '#e5e5e5';
var hoverSelectedUI$2 = '#4c4c4c';
var hoverDanger$2 = adjustLightness(danger01$2, -8);
var activeDanger$2 = colors$1.red80;
var hoverRow$2 = '#353535';
var visitedLink$2 = colors$1.purple40;
var disabled01$2 = colors$1.gray90;
var disabled02$2 = colors$1.gray70;
var disabled03$2 = colors$1.gray50;
var highlight$2 = colors$1.blue80;
var decorative01$2 = colors$1.gray70;
var buttonSeparator$2 = '#161616';
var skeleton01$2 = '#353535';
var skeleton02$2 = colors$1.gray70;

var brand01$2 = interactive01$2;
var brand02$2 = interactive02$2;
var brand03$2 = interactive03$2;
var active01$2 = activeUI$2;
var hoverField$2 = hoverUI$2;
var danger$2 = danger01$2;

var g100 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  interactive01: interactive01$2,
  interactive02: interactive02$2,
  interactive03: interactive03$2,
  interactive04: interactive04$2,
  uiBackground: uiBackground$2,
  ui01: ui01$2,
  ui02: ui02$2,
  ui03: ui03$2,
  ui04: ui04$2,
  ui05: ui05$2,
  text01: text01$2,
  text02: text02$2,
  text03: text03$2,
  text04: text04$2,
  text05: text05$2,
  textError: textError$2,
  icon01: icon01$2,
  icon02: icon02$2,
  icon03: icon03$2,
  link01: link01$2,
  link02: link02$2,
  inverseLink: inverseLink$2,
  field01: field01$2,
  field02: field02$2,
  inverse01: inverse01$2,
  inverse02: inverse02$2,
  support01: support01$2,
  support02: support02$2,
  support03: support03$2,
  support04: support04$2,
  inverseSupport01: inverseSupport01$2,
  inverseSupport02: inverseSupport02$2,
  inverseSupport03: inverseSupport03$2,
  inverseSupport04: inverseSupport04$2,
  overlay01: overlay01$2,
  danger01: danger01$2,
  danger02: danger02$2,
  focus: focus$2,
  inverseFocusUi: inverseFocusUi$2,
  hoverPrimary: hoverPrimary$2,
  activePrimary: activePrimary$2,
  hoverPrimaryText: hoverPrimaryText$2,
  hoverSecondary: hoverSecondary$2,
  activeSecondary: activeSecondary$2,
  hoverTertiary: hoverTertiary$2,
  activeTertiary: activeTertiary$2,
  hoverUI: hoverUI$2,
  hoverLightUI: hoverLightUI$2,
  activeUI: activeUI$2,
  activeLightUI: activeLightUI$2,
  selectedUI: selectedUI$2,
  selectedLightUI: selectedLightUI$2,
  inverseHoverUI: inverseHoverUI$2,
  hoverSelectedUI: hoverSelectedUI$2,
  hoverDanger: hoverDanger$2,
  activeDanger: activeDanger$2,
  hoverRow: hoverRow$2,
  visitedLink: visitedLink$2,
  disabled01: disabled01$2,
  disabled02: disabled02$2,
  disabled03: disabled03$2,
  highlight: highlight$2,
  decorative01: decorative01$2,
  buttonSeparator: buttonSeparator$2,
  skeleton01: skeleton01$2,
  skeleton02: skeleton02$2,
  brand01: brand01$2,
  brand02: brand02$2,
  brand03: brand03$2,
  active01: active01$2,
  hoverField: hoverField$2,
  danger: danger$2,
  caption01: type.caption01,
  label01: type.label01,
  helperText01: type.helperText01,
  bodyShort01: type.bodyShort01,
  bodyLong01: type.bodyLong01,
  bodyShort02: type.bodyShort02,
  bodyLong02: type.bodyLong02,
  code01: type.code01,
  code02: type.code02,
  heading01: type.heading01,
  productiveHeading01: type.productiveHeading01,
  heading02: type.heading02,
  productiveHeading02: type.productiveHeading02,
  productiveHeading03: type.productiveHeading03,
  productiveHeading04: type.productiveHeading04,
  productiveHeading05: type.productiveHeading05,
  productiveHeading06: type.productiveHeading06,
  productiveHeading07: type.productiveHeading07,
  expressiveHeading01: type.expressiveHeading01,
  expressiveHeading02: type.expressiveHeading02,
  expressiveHeading03: type.expressiveHeading03,
  expressiveHeading04: type.expressiveHeading04,
  expressiveHeading05: type.expressiveHeading05,
  expressiveHeading06: type.expressiveHeading06,
  expressiveParagraph01: type.expressiveParagraph01,
  quotation01: type.quotation01,
  quotation02: type.quotation02,
  display01: type.display01,
  display02: type.display02,
  display03: type.display03,
  display04: type.display04,
  spacing01: layout.spacing01,
  spacing02: layout.spacing02,
  spacing03: layout.spacing03,
  spacing04: layout.spacing04,
  spacing05: layout.spacing05,
  spacing06: layout.spacing06,
  spacing07: layout.spacing07,
  spacing08: layout.spacing08,
  spacing09: layout.spacing09,
  spacing10: layout.spacing10,
  spacing11: layout.spacing11,
  spacing12: layout.spacing12,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  layout01: layout.layout01,
  layout02: layout.layout02,
  layout03: layout.layout03,
  layout04: layout.layout04,
  layout05: layout.layout05,
  layout06: layout.layout06,
  layout07: layout.layout07,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  iconSize01: layout.iconSize01,
  iconSize02: layout.iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01$3 = colors$1.blue60;
var interactive02$3 = colors$1.gray60;
var interactive03$3 = colors$1.white;
var interactive04$3 = colors$1.blue50;
var uiBackground$3 = colors$1.gray90;
var ui01$3 = colors$1.gray80;
var ui02$3 = colors$1.gray70;
var ui03$3 = colors$1.gray70;
var ui04$3 = colors$1.gray50;
var ui05$3 = colors$1.gray10;
var text01$3 = colors$1.gray10;
var text02$3 = colors$1.gray30;
var text03$3 = colors$1.gray60;
var text04$3 = colors$1.white;
var text05$3 = colors$1.gray50;
var textError$3 = colors$1.red30;
var icon01$3 = colors$1.gray10;
var icon02$3 = colors$1.gray30;
var icon03$3 = colors$1.white;
var link01$3 = colors$1.blue40;
var link02$3 = colors$1.blue30;
var inverseLink$3 = colors$1.blue60;
var field01$3 = colors$1.gray80;
var field02$3 = colors$1.gray70;
var inverse01$3 = colors$1.gray100;
var inverse02$3 = colors$1.gray10;
var support01$3 = colors$1.red40;
var support02$3 = colors$1.green40;
var support03$3 = colors$1.yellow;
var support04$3 = colors$1.blue50;
var inverseSupport01$3 = colors$1.red60;
var inverseSupport02$3 = colors$1.green50;
var inverseSupport03$3 = colors$1.yellow;
var inverseSupport04$3 = colors$1.blue60;
var overlay01$3 = colors$1.rgba(colors$1.gray100, 0.7);
var danger01$3 = colors$1.red60;
var danger02$3 = colors$1.red40; // Interaction states

var focus$3 = colors$1.white;
var inverseFocusUi$3 = colors$1.blue60;
var hoverPrimary$3 = '#0353e9';
var activePrimary$3 = colors$1.blue80;
var hoverPrimaryText$3 = colors$1.blue30;
var hoverSecondary$3 = '#606060';
var activeSecondary$3 = colors$1.gray80;
var hoverTertiary$3 = colors$1.gray10;
var activeTertiary$3 = colors$1.gray30;
var hoverUI$3 = '#4c4c4c';
var hoverLightUI$3 = '#656565';
var activeUI$3 = colors$1.gray60;
var activeLightUI$3 = colors$1.gray50;
var selectedUI$3 = colors$1.gray70;
var selectedLightUI$3 = colors$1.gray60;
var inverseHoverUI$3 = '#e5e5e5';
var hoverSelectedUI$3 = '#656565';
var hoverDanger$3 = adjustLightness(danger01$3, -8);
var activeDanger$3 = colors$1.red80;
var hoverRow$3 = '#4c4c4c';
var visitedLink$3 = colors$1.purple40;
var disabled01$3 = colors$1.gray80;
var disabled02$3 = colors$1.gray60;
var disabled03$3 = colors$1.gray40;
var highlight$3 = colors$1.blue70;
var decorative01$3 = colors$1.gray60;
var buttonSeparator$3 = '#161616';
var skeleton01$3 = '#353535';
var skeleton02$3 = colors$1.gray70;

var brand01$3 = interactive01$3;
var brand02$3 = interactive02$3;
var brand03$3 = interactive03$3;
var active01$3 = activeUI$3;
var hoverField$3 = hoverUI$3;
var danger$3 = danger01$3;

var g90 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  interactive01: interactive01$3,
  interactive02: interactive02$3,
  interactive03: interactive03$3,
  interactive04: interactive04$3,
  uiBackground: uiBackground$3,
  ui01: ui01$3,
  ui02: ui02$3,
  ui03: ui03$3,
  ui04: ui04$3,
  ui05: ui05$3,
  text01: text01$3,
  text02: text02$3,
  text03: text03$3,
  text04: text04$3,
  text05: text05$3,
  textError: textError$3,
  icon01: icon01$3,
  icon02: icon02$3,
  icon03: icon03$3,
  link01: link01$3,
  link02: link02$3,
  inverseLink: inverseLink$3,
  field01: field01$3,
  field02: field02$3,
  inverse01: inverse01$3,
  inverse02: inverse02$3,
  support01: support01$3,
  support02: support02$3,
  support03: support03$3,
  support04: support04$3,
  inverseSupport01: inverseSupport01$3,
  inverseSupport02: inverseSupport02$3,
  inverseSupport03: inverseSupport03$3,
  inverseSupport04: inverseSupport04$3,
  overlay01: overlay01$3,
  danger01: danger01$3,
  danger02: danger02$3,
  focus: focus$3,
  inverseFocusUi: inverseFocusUi$3,
  hoverPrimary: hoverPrimary$3,
  activePrimary: activePrimary$3,
  hoverPrimaryText: hoverPrimaryText$3,
  hoverSecondary: hoverSecondary$3,
  activeSecondary: activeSecondary$3,
  hoverTertiary: hoverTertiary$3,
  activeTertiary: activeTertiary$3,
  hoverUI: hoverUI$3,
  hoverLightUI: hoverLightUI$3,
  activeUI: activeUI$3,
  activeLightUI: activeLightUI$3,
  selectedUI: selectedUI$3,
  selectedLightUI: selectedLightUI$3,
  inverseHoverUI: inverseHoverUI$3,
  hoverSelectedUI: hoverSelectedUI$3,
  hoverDanger: hoverDanger$3,
  activeDanger: activeDanger$3,
  hoverRow: hoverRow$3,
  visitedLink: visitedLink$3,
  disabled01: disabled01$3,
  disabled02: disabled02$3,
  disabled03: disabled03$3,
  highlight: highlight$3,
  decorative01: decorative01$3,
  buttonSeparator: buttonSeparator$3,
  skeleton01: skeleton01$3,
  skeleton02: skeleton02$3,
  brand01: brand01$3,
  brand02: brand02$3,
  brand03: brand03$3,
  active01: active01$3,
  hoverField: hoverField$3,
  danger: danger$3,
  caption01: type.caption01,
  label01: type.label01,
  helperText01: type.helperText01,
  bodyShort01: type.bodyShort01,
  bodyLong01: type.bodyLong01,
  bodyShort02: type.bodyShort02,
  bodyLong02: type.bodyLong02,
  code01: type.code01,
  code02: type.code02,
  heading01: type.heading01,
  productiveHeading01: type.productiveHeading01,
  heading02: type.heading02,
  productiveHeading02: type.productiveHeading02,
  productiveHeading03: type.productiveHeading03,
  productiveHeading04: type.productiveHeading04,
  productiveHeading05: type.productiveHeading05,
  productiveHeading06: type.productiveHeading06,
  productiveHeading07: type.productiveHeading07,
  expressiveHeading01: type.expressiveHeading01,
  expressiveHeading02: type.expressiveHeading02,
  expressiveHeading03: type.expressiveHeading03,
  expressiveHeading04: type.expressiveHeading04,
  expressiveHeading05: type.expressiveHeading05,
  expressiveHeading06: type.expressiveHeading06,
  expressiveParagraph01: type.expressiveParagraph01,
  quotation01: type.quotation01,
  quotation02: type.quotation02,
  display01: type.display01,
  display02: type.display02,
  display03: type.display03,
  display04: type.display04,
  spacing01: layout.spacing01,
  spacing02: layout.spacing02,
  spacing03: layout.spacing03,
  spacing04: layout.spacing04,
  spacing05: layout.spacing05,
  spacing06: layout.spacing06,
  spacing07: layout.spacing07,
  spacing08: layout.spacing08,
  spacing09: layout.spacing09,
  spacing10: layout.spacing10,
  spacing11: layout.spacing11,
  spacing12: layout.spacing12,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  layout01: layout.layout01,
  layout02: layout.layout02,
  layout03: layout.layout03,
  layout04: layout.layout04,
  layout05: layout.layout05,
  layout06: layout.layout06,
  layout07: layout.layout07,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  iconSize01: layout.iconSize01,
  iconSize02: layout.iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01$4 = '#3d70b2';
var interactive02$4 = '#4d5358';
var interactive03$4 = '#3d70b2';
var interactive04$4 = '#3d70b2';
var uiBackground$4 = '#f4f7fb';
var ui01$4 = colors$1.white;
var ui02$4 = '#f4f7fb';
var ui03$4 = '#dfe3e6';
var ui04$4 = '#8897a2';
var ui05$4 = '#5a6872';
var text01$4 = '#152935';
var text02$4 = '#5a6872';
var text03$4 = '#cdd1d4';
var text04$4 = colors$1.white;
var text05$4 = '#5a6872';
var textError$4 = '#e0182d';
var icon01$4 = '#3d70b2';
var icon02$4 = '#5a6872';
var icon03$4 = colors$1.white;
var link01$4 = '#3d70b2';
var link02$4 = '#3d70b2';
var inverseLink$4 = '#5596e6';
var field01$4 = colors$1.white;
var field02$4 = '#f4f7fb';
var inverse01$4 = colors$1.white;
var inverse02$4 = '#272d33';
var support01$4 = '#e0182d';
var support02$4 = '#5aa700';
var support03$4 = '#efc100';
var support04$4 = '#5aaafa';
var inverseSupport01$4 = '#ff5050';
var inverseSupport02$4 = '#8cd211';
var inverseSupport03$4 = '#FDD600';
var inverseSupport04$4 = '#5aaafa';
var overlay01$4 = 'rgba(223, 227, 230, 0.5)';
var danger01$4 = colors$1.red60;
var danger02$4 = colors$1.red60; // Interaction states

var focus$4 = '#3d70b2';
var inverseFocusUi$4 = '#3d70b2';
var hoverPrimary$4 = '#30588c';
var activePrimary$4 = '#30588c';
var hoverPrimaryText$4 = '#294c86';
var hoverSecondary$4 = '#4d5b65';
var activeSecondary$4 = '#414f59';
var hoverTertiary$4 = '#5a6872';
var activeTertiary$4 = '#414f59';
var hoverUI$4 = '#EEF4FC';
var hoverLightUI$4 = '#EEF4FC';
var activeUI$4 = '#DFEAFA';
var activeLightUI$4 = '#DFEAFA';
var selectedUI$4 = '#EEF4FC';
var selectedLightUI$4 = '#EEF4FC';
var inverseHoverUI$4 = '#4c4c4c';
var hoverSelectedUI$4 = '#DFEAFA';
var hoverDanger$4 = '#c70014';
var activeDanger$4 = '#AD1625';
var hoverRow$4 = '#eef4fc';
var visitedLink$4 = '#294c86';
var disabled01$4 = '#fafbfd';
var disabled02$4 = '#dfe3e6';
var disabled03$4 = '#cdd1d4';
var highlight$4 = '#f4f7fb';
var decorative01$4 = '#EEF4FC';
var buttonSeparator$4 = '#e0e0e0';
var skeleton01$4 = 'rgba(61, 112, 178, .1)';
var skeleton02$4 = 'rgba(61, 112, 178, .1)';

var brand01$4 = interactive01$4;
var brand02$4 = interactive02$4;
var brand03$4 = interactive03$4;
var active01$4 = activeUI$4;
var hoverField$4 = hoverUI$4;
var danger$4 = danger01$4;

var v9 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  interactive01: interactive01$4,
  interactive02: interactive02$4,
  interactive03: interactive03$4,
  interactive04: interactive04$4,
  uiBackground: uiBackground$4,
  ui01: ui01$4,
  ui02: ui02$4,
  ui03: ui03$4,
  ui04: ui04$4,
  ui05: ui05$4,
  text01: text01$4,
  text02: text02$4,
  text03: text03$4,
  text04: text04$4,
  text05: text05$4,
  textError: textError$4,
  icon01: icon01$4,
  icon02: icon02$4,
  icon03: icon03$4,
  link01: link01$4,
  link02: link02$4,
  inverseLink: inverseLink$4,
  field01: field01$4,
  field02: field02$4,
  inverse01: inverse01$4,
  inverse02: inverse02$4,
  support01: support01$4,
  support02: support02$4,
  support03: support03$4,
  support04: support04$4,
  inverseSupport01: inverseSupport01$4,
  inverseSupport02: inverseSupport02$4,
  inverseSupport03: inverseSupport03$4,
  inverseSupport04: inverseSupport04$4,
  overlay01: overlay01$4,
  danger01: danger01$4,
  danger02: danger02$4,
  focus: focus$4,
  inverseFocusUi: inverseFocusUi$4,
  hoverPrimary: hoverPrimary$4,
  activePrimary: activePrimary$4,
  hoverPrimaryText: hoverPrimaryText$4,
  hoverSecondary: hoverSecondary$4,
  activeSecondary: activeSecondary$4,
  hoverTertiary: hoverTertiary$4,
  activeTertiary: activeTertiary$4,
  hoverUI: hoverUI$4,
  hoverLightUI: hoverLightUI$4,
  activeUI: activeUI$4,
  activeLightUI: activeLightUI$4,
  selectedUI: selectedUI$4,
  selectedLightUI: selectedLightUI$4,
  inverseHoverUI: inverseHoverUI$4,
  hoverSelectedUI: hoverSelectedUI$4,
  hoverDanger: hoverDanger$4,
  activeDanger: activeDanger$4,
  hoverRow: hoverRow$4,
  visitedLink: visitedLink$4,
  disabled01: disabled01$4,
  disabled02: disabled02$4,
  disabled03: disabled03$4,
  highlight: highlight$4,
  decorative01: decorative01$4,
  buttonSeparator: buttonSeparator$4,
  skeleton01: skeleton01$4,
  skeleton02: skeleton02$4,
  brand01: brand01$4,
  brand02: brand02$4,
  brand03: brand03$4,
  active01: active01$4,
  hoverField: hoverField$4,
  danger: danger$4,
  caption01: type.caption01,
  label01: type.label01,
  helperText01: type.helperText01,
  bodyShort01: type.bodyShort01,
  bodyLong01: type.bodyLong01,
  bodyShort02: type.bodyShort02,
  bodyLong02: type.bodyLong02,
  code01: type.code01,
  code02: type.code02,
  heading01: type.heading01,
  productiveHeading01: type.productiveHeading01,
  heading02: type.heading02,
  productiveHeading02: type.productiveHeading02,
  productiveHeading03: type.productiveHeading03,
  productiveHeading04: type.productiveHeading04,
  productiveHeading05: type.productiveHeading05,
  productiveHeading06: type.productiveHeading06,
  productiveHeading07: type.productiveHeading07,
  expressiveHeading01: type.expressiveHeading01,
  expressiveHeading02: type.expressiveHeading02,
  expressiveHeading03: type.expressiveHeading03,
  expressiveHeading04: type.expressiveHeading04,
  expressiveHeading05: type.expressiveHeading05,
  expressiveHeading06: type.expressiveHeading06,
  expressiveParagraph01: type.expressiveParagraph01,
  quotation01: type.quotation01,
  quotation02: type.quotation02,
  display01: type.display01,
  display02: type.display02,
  display03: type.display03,
  display04: type.display04,
  spacing01: layout.spacing01,
  spacing02: layout.spacing02,
  spacing03: layout.spacing03,
  spacing04: layout.spacing04,
  spacing05: layout.spacing05,
  spacing06: layout.spacing06,
  spacing07: layout.spacing07,
  spacing08: layout.spacing08,
  spacing09: layout.spacing09,
  spacing10: layout.spacing10,
  spacing11: layout.spacing11,
  spacing12: layout.spacing12,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  layout01: layout.layout01,
  layout02: layout.layout02,
  layout03: layout.layout03,
  layout04: layout.layout04,
  layout05: layout.layout05,
  layout06: layout.layout06,
  layout07: layout.layout07,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  iconSize01: layout.iconSize01,
  iconSize02: layout.iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// exported as in JavaScript

var colors = [// Core
'interactive01', 'interactive02', 'interactive03', 'interactive04', 'uiBackground', 'ui01', 'ui02', 'ui03', 'ui04', 'ui05', 'text01', 'text02', 'text03', 'text04', 'text05', 'textError', 'icon01', 'icon02', 'icon03', 'link01', 'link02', 'inverseLink', 'field01', 'field02', 'inverse01', 'inverse02', 'support01', 'support02', 'support03', 'support04', 'inverseSupport01', 'inverseSupport02', 'inverseSupport03', 'inverseSupport04', 'overlay01', 'danger01', 'danger02', // Interactive states
'focus', 'inverseFocusUi', 'hoverPrimary', 'activePrimary', 'hoverPrimaryText', 'hoverSecondary', 'activeSecondary', 'hoverTertiary', 'activeTertiary', 'hoverUI', 'hoverLightUI', 'hoverSelectedUI', 'activeUI', 'activeLightUI', 'selectedUI', 'selectedLightUI', 'inverseHoverUI', 'hoverDanger', 'activeDanger', 'hoverRow', 'visitedLink', 'disabled01', 'disabled02', 'disabled03', 'highlight', 'decorative01', 'buttonSeparator', 'skeleton01', 'skeleton02', // Deprecated
'brand01', 'brand02', 'brand03', 'active01', 'hoverField', 'danger'];
var numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
/**
 * Format a given token into the format expected in CSS/SCSS-based projects.
 * @param {string} token
 * @returns {string}
 */

function formatTokenName(token) {
  var string = '';

  for (var i = 0; i < token.length; i++) {
    // If we run into a number, we hit the scale step at the end of a token name
    // and can safely truncate the rest of the token
    if (numbers.indexOf(token[i]) !== -1) {
      string += '-' + token.slice(i);
      break;
    } // When encountering an uppercase name, we will want to start adding `-`
    // between words


    if (token[i] === token[i].toUpperCase()) {
      // Check backwards to see if previous letter was also capitalized, if so
      // we are in a special case like UI where each piece should be connected
      if (token[i - 1] && token[i - 1] === token[i - 1].toUpperCase()) {
        string += token[i].toLowerCase();
        continue;
      } // Otherwise, just concatenate this new part on to the existing string


      string += '-' + token[i].toLowerCase();
      continue;
    } // By default, we add the current character to the output string


    string += token[i];
  }

  return string;
}
var tokens = {
  colors: colors,
  type: type.unstable_tokens,
  layout: layout.unstable_tokens
};
var unstable__meta = {
  colors: [{
    type: 'core',
    tokens: ['uiBackground', 'interactive01', 'interactive02', 'interactive03', 'interactive04', 'brand01', 'brand02', 'brand03', 'danger', 'danger01', 'danger02', 'ui01', 'ui02', 'ui03', 'ui04', 'ui05', 'text01', 'text02', 'text03', 'text04', 'text05', 'textError', 'link01', 'link02', 'icon01', 'icon02', 'icon03', 'field01', 'field02', 'inverse01', 'inverse02', 'inverseLink', 'support01', 'support02', 'support03', 'support04', 'inverseSupport01', 'inverseSupport02', 'inverseSupport03', 'inverseSupport04', 'overlay01']
  }, {
    type: 'interactive',
    tokens: ['focus', 'inverseFocusUi', 'hoverPrimary', 'hoverPrimaryText', 'hoverSecondary', 'hoverTertiary', 'hoverUI', 'hoverLightUI', 'hoverSelectedUI', 'hoverDanger', 'hoverRow', 'activePrimary', 'activeSecondary', 'activeTertiary', 'activeUI', 'activeLightUI', 'activeDanger', 'selectedUI', 'selectedLightUI', 'highlight', 'skeleton01', 'skeleton02', 'visitedLink', 'disabled01', 'disabled02', 'disabled03', 'inverseHoverUI', 'active01', 'hoverField', 'decorative01', 'buttonSeparator']
  }],
  deprecated: ['brand01', 'brand02', 'brand03', 'active01', 'danger']
};

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var themes = {
  white: white,
  g10: g10,
  g90: g90,
  g100: g100,
  v9: v9
};

Object.defineProperty(exports, 'bodyLong01', {
  enumerable: true,
  get: function () {
    return type.bodyLong01;
  }
});
Object.defineProperty(exports, 'bodyLong02', {
  enumerable: true,
  get: function () {
    return type.bodyLong02;
  }
});
Object.defineProperty(exports, 'bodyShort01', {
  enumerable: true,
  get: function () {
    return type.bodyShort01;
  }
});
Object.defineProperty(exports, 'bodyShort02', {
  enumerable: true,
  get: function () {
    return type.bodyShort02;
  }
});
Object.defineProperty(exports, 'caption01', {
  enumerable: true,
  get: function () {
    return type.caption01;
  }
});
Object.defineProperty(exports, 'code01', {
  enumerable: true,
  get: function () {
    return type.code01;
  }
});
Object.defineProperty(exports, 'code02', {
  enumerable: true,
  get: function () {
    return type.code02;
  }
});
Object.defineProperty(exports, 'display01', {
  enumerable: true,
  get: function () {
    return type.display01;
  }
});
Object.defineProperty(exports, 'display02', {
  enumerable: true,
  get: function () {
    return type.display02;
  }
});
Object.defineProperty(exports, 'display03', {
  enumerable: true,
  get: function () {
    return type.display03;
  }
});
Object.defineProperty(exports, 'display04', {
  enumerable: true,
  get: function () {
    return type.display04;
  }
});
Object.defineProperty(exports, 'expressiveHeading01', {
  enumerable: true,
  get: function () {
    return type.expressiveHeading01;
  }
});
Object.defineProperty(exports, 'expressiveHeading02', {
  enumerable: true,
  get: function () {
    return type.expressiveHeading02;
  }
});
Object.defineProperty(exports, 'expressiveHeading03', {
  enumerable: true,
  get: function () {
    return type.expressiveHeading03;
  }
});
Object.defineProperty(exports, 'expressiveHeading04', {
  enumerable: true,
  get: function () {
    return type.expressiveHeading04;
  }
});
Object.defineProperty(exports, 'expressiveHeading05', {
  enumerable: true,
  get: function () {
    return type.expressiveHeading05;
  }
});
Object.defineProperty(exports, 'expressiveHeading06', {
  enumerable: true,
  get: function () {
    return type.expressiveHeading06;
  }
});
Object.defineProperty(exports, 'expressiveParagraph01', {
  enumerable: true,
  get: function () {
    return type.expressiveParagraph01;
  }
});
Object.defineProperty(exports, 'heading01', {
  enumerable: true,
  get: function () {
    return type.heading01;
  }
});
Object.defineProperty(exports, 'heading02', {
  enumerable: true,
  get: function () {
    return type.heading02;
  }
});
Object.defineProperty(exports, 'helperText01', {
  enumerable: true,
  get: function () {
    return type.helperText01;
  }
});
Object.defineProperty(exports, 'label01', {
  enumerable: true,
  get: function () {
    return type.label01;
  }
});
Object.defineProperty(exports, 'productiveHeading01', {
  enumerable: true,
  get: function () {
    return type.productiveHeading01;
  }
});
Object.defineProperty(exports, 'productiveHeading02', {
  enumerable: true,
  get: function () {
    return type.productiveHeading02;
  }
});
Object.defineProperty(exports, 'productiveHeading03', {
  enumerable: true,
  get: function () {
    return type.productiveHeading03;
  }
});
Object.defineProperty(exports, 'productiveHeading04', {
  enumerable: true,
  get: function () {
    return type.productiveHeading04;
  }
});
Object.defineProperty(exports, 'productiveHeading05', {
  enumerable: true,
  get: function () {
    return type.productiveHeading05;
  }
});
Object.defineProperty(exports, 'productiveHeading06', {
  enumerable: true,
  get: function () {
    return type.productiveHeading06;
  }
});
Object.defineProperty(exports, 'productiveHeading07', {
  enumerable: true,
  get: function () {
    return type.productiveHeading07;
  }
});
Object.defineProperty(exports, 'quotation01', {
  enumerable: true,
  get: function () {
    return type.quotation01;
  }
});
Object.defineProperty(exports, 'quotation02', {
  enumerable: true,
  get: function () {
    return type.quotation02;
  }
});
Object.defineProperty(exports, 'container01', {
  enumerable: true,
  get: function () {
    return layout.container01;
  }
});
Object.defineProperty(exports, 'container02', {
  enumerable: true,
  get: function () {
    return layout.container02;
  }
});
Object.defineProperty(exports, 'container03', {
  enumerable: true,
  get: function () {
    return layout.container03;
  }
});
Object.defineProperty(exports, 'container04', {
  enumerable: true,
  get: function () {
    return layout.container04;
  }
});
Object.defineProperty(exports, 'container05', {
  enumerable: true,
  get: function () {
    return layout.container05;
  }
});
Object.defineProperty(exports, 'fluidSpacing01', {
  enumerable: true,
  get: function () {
    return layout.fluidSpacing01;
  }
});
Object.defineProperty(exports, 'fluidSpacing02', {
  enumerable: true,
  get: function () {
    return layout.fluidSpacing02;
  }
});
Object.defineProperty(exports, 'fluidSpacing03', {
  enumerable: true,
  get: function () {
    return layout.fluidSpacing03;
  }
});
Object.defineProperty(exports, 'fluidSpacing04', {
  enumerable: true,
  get: function () {
    return layout.fluidSpacing04;
  }
});
Object.defineProperty(exports, 'iconSize01', {
  enumerable: true,
  get: function () {
    return layout.iconSize01;
  }
});
Object.defineProperty(exports, 'iconSize02', {
  enumerable: true,
  get: function () {
    return layout.iconSize02;
  }
});
Object.defineProperty(exports, 'layout01', {
  enumerable: true,
  get: function () {
    return layout.layout01;
  }
});
Object.defineProperty(exports, 'layout02', {
  enumerable: true,
  get: function () {
    return layout.layout02;
  }
});
Object.defineProperty(exports, 'layout03', {
  enumerable: true,
  get: function () {
    return layout.layout03;
  }
});
Object.defineProperty(exports, 'layout04', {
  enumerable: true,
  get: function () {
    return layout.layout04;
  }
});
Object.defineProperty(exports, 'layout05', {
  enumerable: true,
  get: function () {
    return layout.layout05;
  }
});
Object.defineProperty(exports, 'layout06', {
  enumerable: true,
  get: function () {
    return layout.layout06;
  }
});
Object.defineProperty(exports, 'layout07', {
  enumerable: true,
  get: function () {
    return layout.layout07;
  }
});
Object.defineProperty(exports, 'spacing01', {
  enumerable: true,
  get: function () {
    return layout.spacing01;
  }
});
Object.defineProperty(exports, 'spacing02', {
  enumerable: true,
  get: function () {
    return layout.spacing02;
  }
});
Object.defineProperty(exports, 'spacing03', {
  enumerable: true,
  get: function () {
    return layout.spacing03;
  }
});
Object.defineProperty(exports, 'spacing04', {
  enumerable: true,
  get: function () {
    return layout.spacing04;
  }
});
Object.defineProperty(exports, 'spacing05', {
  enumerable: true,
  get: function () {
    return layout.spacing05;
  }
});
Object.defineProperty(exports, 'spacing06', {
  enumerable: true,
  get: function () {
    return layout.spacing06;
  }
});
Object.defineProperty(exports, 'spacing07', {
  enumerable: true,
  get: function () {
    return layout.spacing07;
  }
});
Object.defineProperty(exports, 'spacing08', {
  enumerable: true,
  get: function () {
    return layout.spacing08;
  }
});
Object.defineProperty(exports, 'spacing09', {
  enumerable: true,
  get: function () {
    return layout.spacing09;
  }
});
Object.defineProperty(exports, 'spacing10', {
  enumerable: true,
  get: function () {
    return layout.spacing10;
  }
});
Object.defineProperty(exports, 'spacing11', {
  enumerable: true,
  get: function () {
    return layout.spacing11;
  }
});
Object.defineProperty(exports, 'spacing12', {
  enumerable: true,
  get: function () {
    return layout.spacing12;
  }
});
exports.active01 = active01;
exports.activeDanger = activeDanger;
exports.activeLightUI = activeLightUI;
exports.activePrimary = activePrimary;
exports.activeSecondary = activeSecondary;
exports.activeTertiary = activeTertiary;
exports.activeUI = activeUI;
exports.brand01 = brand01;
exports.brand02 = brand02;
exports.brand03 = brand03;
exports.buttonSeparator = buttonSeparator;
exports.danger = danger;
exports.danger01 = danger01;
exports.danger02 = danger02;
exports.decorative01 = decorative01;
exports.disabled01 = disabled01;
exports.disabled02 = disabled02;
exports.disabled03 = disabled03;
exports.field01 = field01;
exports.field02 = field02;
exports.focus = focus;
exports.formatTokenName = formatTokenName;
exports.g10 = g10;
exports.g100 = g100;
exports.g90 = g90;
exports.highlight = highlight;
exports.hoverDanger = hoverDanger;
exports.hoverField = hoverField;
exports.hoverLightUI = hoverLightUI;
exports.hoverPrimary = hoverPrimary;
exports.hoverPrimaryText = hoverPrimaryText;
exports.hoverRow = hoverRow;
exports.hoverSecondary = hoverSecondary;
exports.hoverSelectedUI = hoverSelectedUI;
exports.hoverTertiary = hoverTertiary;
exports.hoverUI = hoverUI;
exports.icon01 = icon01;
exports.icon02 = icon02;
exports.icon03 = icon03;
exports.interactive01 = interactive01;
exports.interactive02 = interactive02;
exports.interactive03 = interactive03;
exports.interactive04 = interactive04;
exports.inverse01 = inverse01;
exports.inverse02 = inverse02;
exports.inverseFocusUi = inverseFocusUi;
exports.inverseHoverUI = inverseHoverUI;
exports.inverseLink = inverseLink;
exports.inverseSupport01 = inverseSupport01;
exports.inverseSupport02 = inverseSupport02;
exports.inverseSupport03 = inverseSupport03;
exports.inverseSupport04 = inverseSupport04;
exports.link01 = link01;
exports.link02 = link02;
exports.overlay01 = overlay01;
exports.selectedLightUI = selectedLightUI;
exports.selectedUI = selectedUI;
exports.skeleton01 = skeleton01;
exports.skeleton02 = skeleton02;
exports.support01 = support01;
exports.support02 = support02;
exports.support03 = support03;
exports.support04 = support04;
exports.text01 = text01;
exports.text02 = text02;
exports.text03 = text03;
exports.text04 = text04;
exports.text05 = text05;
exports.textError = textError;
exports.themes = themes;
exports.tokens = tokens;
exports.ui01 = ui01;
exports.ui02 = ui02;
exports.ui03 = ui03;
exports.ui04 = ui04;
exports.ui05 = ui05;
exports.uiBackground = uiBackground;
exports.unstable__meta = unstable__meta;
exports.v9 = v9;
exports.visitedLink = visitedLink;
exports.white = white;
