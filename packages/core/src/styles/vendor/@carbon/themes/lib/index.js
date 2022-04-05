'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var colors$1 = require('@carbon/colors');
var Color = require('color');
var type = require('@carbon/type');
var layout = require('@carbon/layout');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Color__default = /*#__PURE__*/_interopDefaultLegacy(Color);

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

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
  var original = Color__default["default"](token).hsl().object();
  return Color__default["default"](_objectSpread2(_objectSpread2({}, original), {}, {
    l: original.l += shift
  })).round().hex().toLowerCase();
}
/**
 * Adjust a given token's alpha by a specified amount
 * Example: token = rgba(10, 10, 10, 1.0);
 * adjustAlpha(token, 0.3) === rgba(10, 10, 10, 0.3);
 * @param {string} token
 * @param {float} alpha
 * @returns {string}
 */

function adjustAlpha(token, alpha) {
  return Color__default["default"](token).rgb().alpha(alpha).string();
}

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

var background$7 = colors$1.white;
var backgroundInverse$7 = colors$1.gray80;
var backgroundBrand$7 = colors$1.blue60;
var backgroundActive$7 = adjustAlpha(colors$1.gray50, 0.5);
var backgroundHover$7 = adjustAlpha(colors$1.gray50, 0.12);
var backgroundInverseHover$7 = colors$1.gray80Hover;
var backgroundSelected$7 = adjustAlpha(colors$1.gray50, 0.2);
var backgroundSelectedHover$7 = adjustAlpha(colors$1.gray50, 0.32); // Layer
// layer-01

var layer01$3 = colors$1.gray10;
var layerActive01$3 = colors$1.gray30;
var layerHover01$3 = colors$1.gray10Hover;
var layerSelected01$3 = colors$1.gray20;
var layerSelectedHover01$3 = colors$1.gray20Hover; // layer-02

var layer02$3 = colors$1.white;
var layerActive02$3 = colors$1.gray30;
var layerHover02$3 = colors$1.whiteHover;
var layerSelected02$3 = colors$1.gray20;
var layerSelectedHover02$3 = colors$1.gray20Hover; // layer-03

var layer03$3 = colors$1.gray10;
var layerActive03$3 = colors$1.gray30;
var layerHover03$3 = colors$1.gray10Hover;
var layerSelected03$3 = colors$1.gray20;
var layerSelectedHover03$3 = colors$1.gray20Hover; // layer

var layerSelectedInverse$7 = colors$1.gray100;
var layerSelectedDisabled$7 = colors$1.gray50; // layer-accent-01

var layerAccent01$3 = colors$1.gray20;
var layerAccentActive01$3 = colors$1.gray40;
var layerAccentHover01$3 = colors$1.gray20Hover; // layer-accent-02

var layerAccent02$3 = colors$1.gray20;
var layerAccentActive02$3 = colors$1.gray40;
var layerAccentHover02$3 = colors$1.gray20Hover; // layer-accent-03

var layerAccent03$3 = colors$1.gray20;
var layerAccentActive03$3 = colors$1.gray40;
var layerAccentHover03$3 = colors$1.gray20Hover; // Field
// field-01

var field01$7 = colors$1.gray10;
var fieldHover01$3 = colors$1.gray10Hover; // field-02

var field02$7 = colors$1.white;
var fieldHover02$3 = colors$1.whiteHover; // field-03

var field03$3 = colors$1.gray10;
var fieldHover03$3 = colors$1.gray10Hover; // Border
// border-subtle-00

var borderSubtle00$3 = colors$1.gray20; // border-subtle-01

var borderSubtle01$3 = colors$1.gray20;
var borderSubtleSelected01$3 = colors$1.gray30; // border-subtle-02

var borderSubtle02$3 = colors$1.gray20;
var borderSubtleSelected02$3 = colors$1.gray30; // border-subtle-03

var borderSubtle03$3 = colors$1.gray20;
var borderSubtleSelected03$3 = colors$1.gray30; // border-strong

var borderStrong01$3 = colors$1.gray50;
var borderStrong02$3 = colors$1.gray50;
var borderStrong03$3 = colors$1.gray50; // border-inverse

var borderInverse$7 = colors$1.gray100; // border-interactive

var borderInteractive$7 = colors$1.blue60; // border

var borderDisabled$7 = colors$1.gray30; // Text

var textPrimary$7 = colors$1.gray100;
var textSecondary$7 = colors$1.gray70;
var textPlaceholder$7 = adjustAlpha(textPrimary$7, 0.4);
var textHelper$7 = colors$1.gray60;
var textError$7 = colors$1.red60;
var textInverse$7 = colors$1.white;
var textOnColor$7 = colors$1.white;
var textOnColorDisabled$7 = colors$1.gray50;
var textDisabled$7 = adjustAlpha(textPrimary$7, 0.25); // Link

var linkPrimary$7 = colors$1.blue60;
var linkPrimaryHover$7 = colors$1.blue70;
var linkSecondary$7 = colors$1.blue70;
var linkInverse$7 = colors$1.blue40;
var linkVisited$7 = colors$1.purple60;
var linkInverseActive$3 = colors$1.gray10;
var linkInverseHover$3 = colors$1.blue30; // Icon

var iconPrimary$7 = colors$1.gray100;
var iconSecondary$7 = colors$1.gray70;
var iconInverse$7 = colors$1.white;
var iconOnColor$7 = colors$1.white;
var iconOnColorDisabled$7 = colors$1.gray50;
var iconDisabled$7 = adjustAlpha(iconPrimary$7, 0.25); // Support

var supportError$7 = colors$1.red60;
var supportSuccess$7 = colors$1.green50;
var supportWarning$7 = colors$1.yellow30;
var supportInfo$7 = colors$1.blue70;
var supportErrorInverse$7 = colors$1.red50;
var supportSuccessInverse$7 = colors$1.green40;
var supportWarningInverse$7 = colors$1.yellow30;
var supportInfoInverse$7 = colors$1.blue50;
var supportCautionMinor$3 = colors$1.yellow30;
var supportCautionMajor$3 = colors$1.orange40;
var supportCautionUndefined$3 = colors$1.purple60; // Focus

var focus$7 = colors$1.blue60;
var focusInset$7 = colors$1.white;
var focusInverse$7 = colors$1.white; // Skeleton

var skeletonBackground$7 = colors$1.whiteHover;
var skeletonElement$7 = colors$1.gray30; // Misc

var interactive$7 = colors$1.blue60;
var highlight$7 = colors$1.blue20;
var overlay$7 = 'rgba(22, 22, 22, 0.5)';
var toggleOff$7 = colors$1.gray50;
var shadow$7 = 'rgba(0, 0, 0, 0.3)'; // Type

var white$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  background: background$7,
  backgroundInverse: backgroundInverse$7,
  backgroundBrand: backgroundBrand$7,
  backgroundActive: backgroundActive$7,
  backgroundHover: backgroundHover$7,
  backgroundInverseHover: backgroundInverseHover$7,
  backgroundSelected: backgroundSelected$7,
  backgroundSelectedHover: backgroundSelectedHover$7,
  layer01: layer01$3,
  layerActive01: layerActive01$3,
  layerHover01: layerHover01$3,
  layerSelected01: layerSelected01$3,
  layerSelectedHover01: layerSelectedHover01$3,
  layer02: layer02$3,
  layerActive02: layerActive02$3,
  layerHover02: layerHover02$3,
  layerSelected02: layerSelected02$3,
  layerSelectedHover02: layerSelectedHover02$3,
  layer03: layer03$3,
  layerActive03: layerActive03$3,
  layerHover03: layerHover03$3,
  layerSelected03: layerSelected03$3,
  layerSelectedHover03: layerSelectedHover03$3,
  layerSelectedInverse: layerSelectedInverse$7,
  layerSelectedDisabled: layerSelectedDisabled$7,
  layerAccent01: layerAccent01$3,
  layerAccentActive01: layerAccentActive01$3,
  layerAccentHover01: layerAccentHover01$3,
  layerAccent02: layerAccent02$3,
  layerAccentActive02: layerAccentActive02$3,
  layerAccentHover02: layerAccentHover02$3,
  layerAccent03: layerAccent03$3,
  layerAccentActive03: layerAccentActive03$3,
  layerAccentHover03: layerAccentHover03$3,
  field01: field01$7,
  fieldHover01: fieldHover01$3,
  field02: field02$7,
  fieldHover02: fieldHover02$3,
  field03: field03$3,
  fieldHover03: fieldHover03$3,
  borderSubtle00: borderSubtle00$3,
  borderSubtle01: borderSubtle01$3,
  borderSubtleSelected01: borderSubtleSelected01$3,
  borderSubtle02: borderSubtle02$3,
  borderSubtleSelected02: borderSubtleSelected02$3,
  borderSubtle03: borderSubtle03$3,
  borderSubtleSelected03: borderSubtleSelected03$3,
  borderStrong01: borderStrong01$3,
  borderStrong02: borderStrong02$3,
  borderStrong03: borderStrong03$3,
  borderInverse: borderInverse$7,
  borderInteractive: borderInteractive$7,
  borderDisabled: borderDisabled$7,
  textPrimary: textPrimary$7,
  textSecondary: textSecondary$7,
  textPlaceholder: textPlaceholder$7,
  textHelper: textHelper$7,
  textError: textError$7,
  textInverse: textInverse$7,
  textOnColor: textOnColor$7,
  textOnColorDisabled: textOnColorDisabled$7,
  textDisabled: textDisabled$7,
  linkPrimary: linkPrimary$7,
  linkPrimaryHover: linkPrimaryHover$7,
  linkSecondary: linkSecondary$7,
  linkInverse: linkInverse$7,
  linkVisited: linkVisited$7,
  linkInverseActive: linkInverseActive$3,
  linkInverseHover: linkInverseHover$3,
  iconPrimary: iconPrimary$7,
  iconSecondary: iconSecondary$7,
  iconInverse: iconInverse$7,
  iconOnColor: iconOnColor$7,
  iconOnColorDisabled: iconOnColorDisabled$7,
  iconDisabled: iconDisabled$7,
  supportError: supportError$7,
  supportSuccess: supportSuccess$7,
  supportWarning: supportWarning$7,
  supportInfo: supportInfo$7,
  supportErrorInverse: supportErrorInverse$7,
  supportSuccessInverse: supportSuccessInverse$7,
  supportWarningInverse: supportWarningInverse$7,
  supportInfoInverse: supportInfoInverse$7,
  supportCautionMinor: supportCautionMinor$3,
  supportCautionMajor: supportCautionMajor$3,
  supportCautionUndefined: supportCautionUndefined$3,
  focus: focus$7,
  focusInset: focusInset$7,
  focusInverse: focusInverse$7,
  skeletonBackground: skeletonBackground$7,
  skeletonElement: skeletonElement$7,
  interactive: interactive$7,
  highlight: highlight$7,
  overlay: overlay$7,
  toggleOff: toggleOff$7,
  shadow: shadow$7,
  caption01: type.caption01,
  caption02: type.caption02,
  label01: type.label01,
  label02: type.label02,
  helperText01: type.helperText01,
  helperText02: type.helperText02,
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
  spacing13: layout.spacing13,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  sizeXSmall: layout.sizeXSmall,
  sizeSmall: layout.sizeSmall,
  sizeMedium: layout.sizeMedium,
  sizeLarge: layout.sizeLarge,
  sizeXLarge: layout.sizeXLarge,
  size2XLarge: layout.size2XLarge,
  iconSize01: layout.iconSize01,
  iconSize02: layout.iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

var background$6 = colors$1.gray10;
var backgroundInverse$6 = colors$1.gray80;
var backgroundBrand$6 = colors$1.blue60;
var backgroundActive$6 = adjustAlpha(colors$1.gray50, 0.5);
var backgroundHover$6 = adjustAlpha(colors$1.gray50, 0.12);
var backgroundInverseHover$6 = colors$1.gray80Hover;
var backgroundSelected$6 = adjustAlpha(colors$1.gray50, 0.2);
var backgroundSelectedHover$6 = adjustAlpha(colors$1.gray50, 0.32); // Layer
// layer-01

var layer01$2 = colors$1.white;
var layerActive01$2 = colors$1.gray30;
var layerHover01$2 = colors$1.whiteHover;
var layerSelected01$2 = colors$1.gray20;
var layerSelectedHover01$2 = colors$1.gray20Hover; // layer-02

var layer02$2 = colors$1.gray10;
var layerActive02$2 = colors$1.gray30;
var layerHover02$2 = colors$1.gray10Hover;
var layerSelected02$2 = colors$1.gray20;
var layerSelectedHover02$2 = colors$1.gray20Hover; // layer-03

var layer03$2 = colors$1.white;
var layerActive03$2 = colors$1.gray30;
var layerHover03$2 = colors$1.whiteHover;
var layerSelected03$2 = colors$1.gray20;
var layerSelectedHover03$2 = colors$1.gray20Hover; // layer

var layerSelectedInverse$6 = colors$1.gray100;
var layerSelectedDisabled$6 = colors$1.gray50; // layer-accent-01

var layerAccent01$2 = colors$1.gray20;
var layerAccentActive01$2 = colors$1.gray40;
var layerAccentHover01$2 = colors$1.gray20Hover; // layer-accent-02

var layerAccent02$2 = colors$1.gray20;
var layerAccentActive02$2 = colors$1.gray40;
var layerAccentHover02$2 = colors$1.gray20Hover; // layer-accent-03

var layerAccent03$2 = colors$1.gray20;
var layerAccentActive03$2 = colors$1.gray40;
var layerAccentHover03$2 = colors$1.gray20Hover; // Field
// field-01

var field01$6 = colors$1.white;
var fieldHover01$2 = colors$1.whiteHover; // field-02

var field02$6 = colors$1.gray10;
var fieldHover02$2 = colors$1.gray10Hover; // field-03

var field03$2 = colors$1.white;
var fieldHover03$2 = colors$1.whiteHover; // Border
// border-subtle-00

var borderSubtle00$2 = colors$1.gray20; // border-subtle-01

var borderSubtle01$2 = colors$1.gray20;
var borderSubtleSelected01$2 = colors$1.gray30; // border-subtle-02

var borderSubtle02$2 = colors$1.gray20;
var borderSubtleSelected02$2 = colors$1.gray30; // border-subtle-03

var borderSubtle03$2 = colors$1.gray20;
var borderSubtleSelected03$2 = colors$1.gray30; // border-strong

var borderStrong01$2 = colors$1.gray50;
var borderStrong02$2 = colors$1.gray50;
var borderStrong03$2 = colors$1.gray50; // border-inverse

var borderInverse$6 = colors$1.gray100; // border-interactive

var borderInteractive$6 = colors$1.blue60; // border

var borderDisabled$6 = colors$1.gray30; // Text

var textPrimary$6 = colors$1.gray100;
var textSecondary$6 = colors$1.gray70;
var textPlaceholder$6 = adjustAlpha(textPrimary$6, 0.4);
var textHelper$6 = colors$1.gray60;
var textError$6 = colors$1.red60;
var textInverse$6 = colors$1.white;
var textOnColor$6 = colors$1.white;
var textOnColorDisabled$6 = colors$1.gray50;
var textDisabled$6 = adjustAlpha(textPrimary$6, 0.25); // Link

var linkPrimary$6 = colors$1.blue60;
var linkPrimaryHover$6 = colors$1.blue70;
var linkSecondary$6 = colors$1.blue70;
var linkInverse$6 = colors$1.blue40;
var linkVisited$6 = colors$1.purple60;
var linkInverseActive$2 = colors$1.gray10;
var linkInverseHover$2 = colors$1.blue30; // Icon

var iconPrimary$6 = colors$1.gray100;
var iconSecondary$6 = colors$1.gray70;
var iconInverse$6 = colors$1.white;
var iconOnColor$6 = colors$1.white;
var iconOnColorDisabled$6 = colors$1.gray50;
var iconDisabled$6 = adjustAlpha(iconPrimary$6, 0.25); // Support

var supportError$6 = colors$1.red60;
var supportSuccess$6 = colors$1.green50;
var supportWarning$6 = colors$1.yellow30;
var supportInfo$6 = colors$1.blue70;
var supportErrorInverse$6 = colors$1.red50;
var supportSuccessInverse$6 = colors$1.green40;
var supportWarningInverse$6 = colors$1.yellow30;
var supportInfoInverse$6 = colors$1.blue50;
var supportCautionMinor$2 = colors$1.yellow30;
var supportCautionMajor$2 = colors$1.orange40;
var supportCautionUndefined$2 = colors$1.purple60; // Focus

var focus$6 = colors$1.blue60;
var focusInset$6 = colors$1.white;
var focusInverse$6 = colors$1.white; // Skeleton

var skeletonBackground$6 = colors$1.gray10Hover;
var skeletonElement$6 = colors$1.gray30; // Misc

var interactive$6 = colors$1.blue60;
var highlight$6 = colors$1.blue20;
var overlay$6 = 'rgba(22, 22, 22, 0.5)';
var toggleOff$6 = colors$1.gray50;
var shadow$6 = 'rgba(0, 0, 0, 0.3)';

var g10$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  background: background$6,
  backgroundInverse: backgroundInverse$6,
  backgroundBrand: backgroundBrand$6,
  backgroundActive: backgroundActive$6,
  backgroundHover: backgroundHover$6,
  backgroundInverseHover: backgroundInverseHover$6,
  backgroundSelected: backgroundSelected$6,
  backgroundSelectedHover: backgroundSelectedHover$6,
  layer01: layer01$2,
  layerActive01: layerActive01$2,
  layerHover01: layerHover01$2,
  layerSelected01: layerSelected01$2,
  layerSelectedHover01: layerSelectedHover01$2,
  layer02: layer02$2,
  layerActive02: layerActive02$2,
  layerHover02: layerHover02$2,
  layerSelected02: layerSelected02$2,
  layerSelectedHover02: layerSelectedHover02$2,
  layer03: layer03$2,
  layerActive03: layerActive03$2,
  layerHover03: layerHover03$2,
  layerSelected03: layerSelected03$2,
  layerSelectedHover03: layerSelectedHover03$2,
  layerSelectedInverse: layerSelectedInverse$6,
  layerSelectedDisabled: layerSelectedDisabled$6,
  layerAccent01: layerAccent01$2,
  layerAccentActive01: layerAccentActive01$2,
  layerAccentHover01: layerAccentHover01$2,
  layerAccent02: layerAccent02$2,
  layerAccentActive02: layerAccentActive02$2,
  layerAccentHover02: layerAccentHover02$2,
  layerAccent03: layerAccent03$2,
  layerAccentActive03: layerAccentActive03$2,
  layerAccentHover03: layerAccentHover03$2,
  field01: field01$6,
  fieldHover01: fieldHover01$2,
  field02: field02$6,
  fieldHover02: fieldHover02$2,
  field03: field03$2,
  fieldHover03: fieldHover03$2,
  borderSubtle00: borderSubtle00$2,
  borderSubtle01: borderSubtle01$2,
  borderSubtleSelected01: borderSubtleSelected01$2,
  borderSubtle02: borderSubtle02$2,
  borderSubtleSelected02: borderSubtleSelected02$2,
  borderSubtle03: borderSubtle03$2,
  borderSubtleSelected03: borderSubtleSelected03$2,
  borderStrong01: borderStrong01$2,
  borderStrong02: borderStrong02$2,
  borderStrong03: borderStrong03$2,
  borderInverse: borderInverse$6,
  borderInteractive: borderInteractive$6,
  borderDisabled: borderDisabled$6,
  textPrimary: textPrimary$6,
  textSecondary: textSecondary$6,
  textPlaceholder: textPlaceholder$6,
  textHelper: textHelper$6,
  textError: textError$6,
  textInverse: textInverse$6,
  textOnColor: textOnColor$6,
  textOnColorDisabled: textOnColorDisabled$6,
  textDisabled: textDisabled$6,
  linkPrimary: linkPrimary$6,
  linkPrimaryHover: linkPrimaryHover$6,
  linkSecondary: linkSecondary$6,
  linkInverse: linkInverse$6,
  linkVisited: linkVisited$6,
  linkInverseActive: linkInverseActive$2,
  linkInverseHover: linkInverseHover$2,
  iconPrimary: iconPrimary$6,
  iconSecondary: iconSecondary$6,
  iconInverse: iconInverse$6,
  iconOnColor: iconOnColor$6,
  iconOnColorDisabled: iconOnColorDisabled$6,
  iconDisabled: iconDisabled$6,
  supportError: supportError$6,
  supportSuccess: supportSuccess$6,
  supportWarning: supportWarning$6,
  supportInfo: supportInfo$6,
  supportErrorInverse: supportErrorInverse$6,
  supportSuccessInverse: supportSuccessInverse$6,
  supportWarningInverse: supportWarningInverse$6,
  supportInfoInverse: supportInfoInverse$6,
  supportCautionMinor: supportCautionMinor$2,
  supportCautionMajor: supportCautionMajor$2,
  supportCautionUndefined: supportCautionUndefined$2,
  focus: focus$6,
  focusInset: focusInset$6,
  focusInverse: focusInverse$6,
  skeletonBackground: skeletonBackground$6,
  skeletonElement: skeletonElement$6,
  interactive: interactive$6,
  highlight: highlight$6,
  overlay: overlay$6,
  toggleOff: toggleOff$6,
  shadow: shadow$6,
  caption01: type.caption01,
  caption02: type.caption02,
  label01: type.label01,
  label02: type.label02,
  helperText01: type.helperText01,
  helperText02: type.helperText02,
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
  spacing13: layout.spacing13,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  sizeXSmall: layout.sizeXSmall,
  sizeSmall: layout.sizeSmall,
  sizeMedium: layout.sizeMedium,
  sizeLarge: layout.sizeLarge,
  sizeXLarge: layout.sizeXLarge,
  size2XLarge: layout.size2XLarge,
  iconSize01: layout.iconSize01,
  iconSize02: layout.iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

var background$5 = colors$1.gray90;
var backgroundInverse$5 = colors$1.gray10;
var backgroundBrand$5 = colors$1.blue60;
var backgroundActive$5 = adjustAlpha(colors$1.gray50, 0.4);
var backgroundHover$5 = adjustAlpha(colors$1.gray50, 0.16);
var backgroundInverseHover$5 = colors$1.gray10Hover;
var backgroundSelected$5 = adjustAlpha(colors$1.gray50, 0.24);
var backgroundSelectedHover$5 = adjustAlpha(colors$1.gray50, 0.32); // Layer
// layer-01

var layer01$1 = colors$1.gray80;
var layerActive01$1 = colors$1.gray60;
var layerHover01$1 = colors$1.gray80Hover;
var layerSelected01$1 = colors$1.gray70;
var layerSelectedHover01$1 = colors$1.gray70Hover; // layer-02

var layer02$1 = colors$1.gray70;
var layerActive02$1 = colors$1.gray50;
var layerHover02$1 = colors$1.gray70Hover;
var layerSelected02$1 = colors$1.gray60;
var layerSelectedHover02$1 = colors$1.gray60Hover; // layer-03

var layer03$1 = colors$1.gray60;
var layerActive03$1 = colors$1.gray80;
var layerHover03$1 = colors$1.gray60Hover;
var layerSelected03$1 = colors$1.gray70;
var layerSelectedHover03$1 = colors$1.gray70Hover; // layer

var layerSelectedInverse$5 = colors$1.gray10;
var layerSelectedDisabled$5 = colors$1.gray40; // layer-accent-01

var layerAccent01$1 = colors$1.gray70;
var layerAccentActive01$1 = colors$1.gray50;
var layerAccentHover01$1 = colors$1.gray70Hover; // layer-accent-02

var layerAccent02$1 = colors$1.gray60;
var layerAccentActive02$1 = colors$1.gray80;
var layerAccentHover02$1 = colors$1.gray60Hover; // layer-accent-03

var layerAccent03$1 = colors$1.gray50;
var layerAccentActive03$1 = colors$1.gray70;
var layerAccentHover03$1 = colors$1.gray50Hover; // Field
// field-01

var field01$5 = colors$1.gray80;
var fieldHover01$1 = colors$1.gray80Hover; // field-02

var field02$5 = colors$1.gray70;
var fieldHover02$1 = colors$1.gray70Hover; // field-03

var field03$1 = colors$1.gray60;
var fieldHover03$1 = colors$1.gray60Hover; // Border
// border-subtle-00

var borderSubtle00$1 = colors$1.gray70; // border-subtle-01

var borderSubtle01$1 = colors$1.gray70;
var borderSubtleSelected01$1 = colors$1.gray60; // border-subtle-02

var borderSubtle02$1 = colors$1.gray60;
var borderSubtleSelected02$1 = colors$1.gray50; // border-subtle-03

var borderSubtle03$1 = colors$1.gray50;
var borderSubtleSelected03$1 = colors$1.gray40; // border-strong

var borderStrong01$1 = colors$1.gray50;
var borderStrong02$1 = colors$1.gray40;
var borderStrong03$1 = colors$1.gray30; // border-inverse

var borderInverse$5 = colors$1.gray10; // border-interactive

var borderInteractive$5 = colors$1.blue50; // border

var borderDisabled$5 = adjustAlpha(colors$1.gray50, 0.5); // Text

var textPrimary$5 = colors$1.gray10;
var textSecondary$5 = colors$1.gray30;
var textPlaceholder$5 = adjustAlpha(textPrimary$5, 0.4);
var textHelper$5 = colors$1.gray30;
var textError$5 = colors$1.red30;
var textInverse$5 = colors$1.gray100;
var textOnColor$5 = colors$1.white;
var textOnColorDisabled$5 = adjustAlpha(textOnColor$5, 0.25);
var textDisabled$5 = adjustAlpha(textPrimary$5, 0.25); // Link

var linkPrimary$5 = colors$1.blue40;
var linkPrimaryHover$5 = colors$1.blue30;
var linkSecondary$5 = colors$1.blue30;
var linkInverse$5 = colors$1.blue60;
var linkVisited$5 = colors$1.purple40;
var linkInverseActive$1 = colors$1.gray100;
var linkInverseHover$1 = colors$1.blue70; // Icon

var iconPrimary$5 = colors$1.gray10;
var iconSecondary$5 = colors$1.gray30;
var iconInverse$5 = colors$1.gray100;
var iconOnColor$5 = colors$1.white;
var iconOnColorDisabled$5 = adjustAlpha(iconOnColor$5, 0.25);
var iconDisabled$5 = adjustAlpha(iconPrimary$5, 0.25); // Support

var supportError$5 = colors$1.red40;
var supportSuccess$5 = colors$1.green40;
var supportWarning$5 = colors$1.yellow30;
var supportInfo$5 = colors$1.blue50;
var supportErrorInverse$5 = colors$1.red60;
var supportSuccessInverse$5 = colors$1.green50;
var supportWarningInverse$5 = colors$1.yellow30;
var supportInfoInverse$5 = colors$1.blue70;
var supportCautionMinor$1 = colors$1.yellow30;
var supportCautionMajor$1 = colors$1.orange40;
var supportCautionUndefined$1 = colors$1.purple50; // Focus

var focus$5 = colors$1.white;
var focusInset$5 = colors$1.gray100;
var focusInverse$5 = colors$1.blue60; // Skeleton

var skeletonBackground$5 = colors$1.gray90Hover;
var skeletonElement$5 = colors$1.gray70; // Misc

var interactive$5 = colors$1.blue50;
var highlight$5 = colors$1.blue70;
var overlay$5 = colors$1.rgba(colors$1.black, 0.65);
var toggleOff$5 = colors$1.gray50;
var shadow$5 = colors$1.rgba(colors$1.black, 0.8);

var g90$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  background: background$5,
  backgroundInverse: backgroundInverse$5,
  backgroundBrand: backgroundBrand$5,
  backgroundActive: backgroundActive$5,
  backgroundHover: backgroundHover$5,
  backgroundInverseHover: backgroundInverseHover$5,
  backgroundSelected: backgroundSelected$5,
  backgroundSelectedHover: backgroundSelectedHover$5,
  layer01: layer01$1,
  layerActive01: layerActive01$1,
  layerHover01: layerHover01$1,
  layerSelected01: layerSelected01$1,
  layerSelectedHover01: layerSelectedHover01$1,
  layer02: layer02$1,
  layerActive02: layerActive02$1,
  layerHover02: layerHover02$1,
  layerSelected02: layerSelected02$1,
  layerSelectedHover02: layerSelectedHover02$1,
  layer03: layer03$1,
  layerActive03: layerActive03$1,
  layerHover03: layerHover03$1,
  layerSelected03: layerSelected03$1,
  layerSelectedHover03: layerSelectedHover03$1,
  layerSelectedInverse: layerSelectedInverse$5,
  layerSelectedDisabled: layerSelectedDisabled$5,
  layerAccent01: layerAccent01$1,
  layerAccentActive01: layerAccentActive01$1,
  layerAccentHover01: layerAccentHover01$1,
  layerAccent02: layerAccent02$1,
  layerAccentActive02: layerAccentActive02$1,
  layerAccentHover02: layerAccentHover02$1,
  layerAccent03: layerAccent03$1,
  layerAccentActive03: layerAccentActive03$1,
  layerAccentHover03: layerAccentHover03$1,
  field01: field01$5,
  fieldHover01: fieldHover01$1,
  field02: field02$5,
  fieldHover02: fieldHover02$1,
  field03: field03$1,
  fieldHover03: fieldHover03$1,
  borderSubtle00: borderSubtle00$1,
  borderSubtle01: borderSubtle01$1,
  borderSubtleSelected01: borderSubtleSelected01$1,
  borderSubtle02: borderSubtle02$1,
  borderSubtleSelected02: borderSubtleSelected02$1,
  borderSubtle03: borderSubtle03$1,
  borderSubtleSelected03: borderSubtleSelected03$1,
  borderStrong01: borderStrong01$1,
  borderStrong02: borderStrong02$1,
  borderStrong03: borderStrong03$1,
  borderInverse: borderInverse$5,
  borderInteractive: borderInteractive$5,
  borderDisabled: borderDisabled$5,
  textPrimary: textPrimary$5,
  textSecondary: textSecondary$5,
  textPlaceholder: textPlaceholder$5,
  textHelper: textHelper$5,
  textError: textError$5,
  textInverse: textInverse$5,
  textOnColor: textOnColor$5,
  textOnColorDisabled: textOnColorDisabled$5,
  textDisabled: textDisabled$5,
  linkPrimary: linkPrimary$5,
  linkPrimaryHover: linkPrimaryHover$5,
  linkSecondary: linkSecondary$5,
  linkInverse: linkInverse$5,
  linkVisited: linkVisited$5,
  linkInverseActive: linkInverseActive$1,
  linkInverseHover: linkInverseHover$1,
  iconPrimary: iconPrimary$5,
  iconSecondary: iconSecondary$5,
  iconInverse: iconInverse$5,
  iconOnColor: iconOnColor$5,
  iconOnColorDisabled: iconOnColorDisabled$5,
  iconDisabled: iconDisabled$5,
  supportError: supportError$5,
  supportSuccess: supportSuccess$5,
  supportWarning: supportWarning$5,
  supportInfo: supportInfo$5,
  supportErrorInverse: supportErrorInverse$5,
  supportSuccessInverse: supportSuccessInverse$5,
  supportWarningInverse: supportWarningInverse$5,
  supportInfoInverse: supportInfoInverse$5,
  supportCautionMinor: supportCautionMinor$1,
  supportCautionMajor: supportCautionMajor$1,
  supportCautionUndefined: supportCautionUndefined$1,
  focus: focus$5,
  focusInset: focusInset$5,
  focusInverse: focusInverse$5,
  skeletonBackground: skeletonBackground$5,
  skeletonElement: skeletonElement$5,
  interactive: interactive$5,
  highlight: highlight$5,
  overlay: overlay$5,
  toggleOff: toggleOff$5,
  shadow: shadow$5,
  caption01: type.caption01,
  caption02: type.caption02,
  label01: type.label01,
  label02: type.label02,
  helperText01: type.helperText01,
  helperText02: type.helperText02,
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
  spacing13: layout.spacing13,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  sizeXSmall: layout.sizeXSmall,
  sizeSmall: layout.sizeSmall,
  sizeMedium: layout.sizeMedium,
  sizeLarge: layout.sizeLarge,
  sizeXLarge: layout.sizeXLarge,
  size2XLarge: layout.size2XLarge,
  iconSize01: layout.iconSize01,
  iconSize02: layout.iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

var background$4 = colors$1.gray100;
var backgroundInverse$4 = colors$1.gray10;
var backgroundBrand$4 = colors$1.blue60;
var backgroundActive$4 = adjustAlpha(colors$1.gray50, 0.4);
var backgroundHover$4 = adjustAlpha(colors$1.gray50, 0.16);
var backgroundInverseHover$4 = colors$1.gray10Hover;
var backgroundSelected$4 = adjustAlpha(colors$1.gray50, 0.24);
var backgroundSelectedHover$4 = adjustAlpha(colors$1.gray50, 0.32); // Layer
// layer-01

var layer01 = colors$1.gray90;
var layerActive01 = colors$1.gray70;
var layerHover01 = colors$1.gray90Hover;
var layerSelected01 = colors$1.gray80;
var layerSelectedHover01 = colors$1.gray80Hover; // layer-02

var layer02 = colors$1.gray80;
var layerActive02 = colors$1.gray60;
var layerHover02 = colors$1.gray80Hover;
var layerSelected02 = colors$1.gray70;
var layerSelectedHover02 = colors$1.gray70Hover; // layer-03

var layer03 = colors$1.gray70;
var layerActive03 = colors$1.gray50;
var layerHover03 = colors$1.gray70Hover;
var layerSelected03 = colors$1.gray60;
var layerSelectedHover03 = colors$1.gray60Hover; // layer

var layerSelectedInverse$4 = colors$1.gray10;
var layerSelectedDisabled$4 = colors$1.gray40; // layer-accent-01

var layerAccent01 = colors$1.gray80;
var layerAccentActive01 = colors$1.gray60;
var layerAccentHover01 = colors$1.gray80Hover; // layer-accent-02

var layerAccent02 = colors$1.gray70;
var layerAccentActive02 = colors$1.gray50;
var layerAccentHover02 = colors$1.gray70Hover; // layer-accent-03

var layerAccent03 = colors$1.gray60;
var layerAccentActive03 = colors$1.gray80;
var layerAccentHover03 = colors$1.gray60Hover; // Field
// field-01

var field01$4 = colors$1.gray90;
var fieldHover01 = colors$1.gray90Hover; // field-02

var field02$4 = colors$1.gray80;
var fieldHover02 = colors$1.gray80Hover; // field-03

var field03 = colors$1.gray70;
var fieldHover03 = colors$1.gray70Hover; // Border
// border-subtle-00

var borderSubtle00 = colors$1.gray80; // border-subtle-01

var borderSubtle01 = colors$1.gray80;
var borderSubtleSelected01 = colors$1.gray70; // border-subtle-02

var borderSubtle02 = colors$1.gray70;
var borderSubtleSelected02 = colors$1.gray60; // border-subtle-03

var borderSubtle03 = colors$1.gray60;
var borderSubtleSelected03 = colors$1.gray50; // border-strong

var borderStrong01 = colors$1.gray60;
var borderStrong02 = colors$1.gray50;
var borderStrong03 = colors$1.gray40; // border-inverse

var borderInverse$4 = colors$1.gray10; // border-interactive

var borderInteractive$4 = colors$1.blue50; // border

var borderDisabled$4 = adjustAlpha(colors$1.gray50, 0.5); // Text

var textPrimary$4 = colors$1.gray10;
var textSecondary$4 = colors$1.gray30;
var textPlaceholder$4 = adjustAlpha(textPrimary$4, 0.4);
var textHelper$4 = colors$1.gray40;
var textError$4 = colors$1.red40;
var textInverse$4 = colors$1.gray100;
var textOnColor$4 = colors$1.white;
var textOnColorDisabled$4 = adjustAlpha(textOnColor$4, 0.25);
var textDisabled$4 = adjustAlpha(textPrimary$4, 0.25); // Link

var linkPrimary$4 = colors$1.blue40;
var linkPrimaryHover$4 = colors$1.blue30;
var linkSecondary$4 = colors$1.blue30;
var linkInverse$4 = colors$1.blue60;
var linkVisited$4 = colors$1.purple40;
var linkInverseActive = colors$1.gray100;
var linkInverseHover = colors$1.blue70; // Icon

var iconPrimary$4 = colors$1.gray10;
var iconSecondary$4 = colors$1.gray30;
var iconInverse$4 = colors$1.gray100;
var iconOnColor$4 = colors$1.white;
var iconOnColorDisabled$4 = adjustAlpha(iconOnColor$4, 0.25);
var iconDisabled$4 = adjustAlpha(iconPrimary$4, 0.25); // Support

var supportError$4 = colors$1.red50;
var supportSuccess$4 = colors$1.green40;
var supportWarning$4 = colors$1.yellow30;
var supportInfo$4 = colors$1.blue50;
var supportErrorInverse$4 = colors$1.red60;
var supportSuccessInverse$4 = colors$1.green50;
var supportWarningInverse$4 = colors$1.yellow30;
var supportInfoInverse$4 = colors$1.blue70;
var supportCautionMinor = colors$1.yellow30;
var supportCautionMajor = colors$1.orange40;
var supportCautionUndefined = colors$1.purple50; // Focus

var focus$4 = colors$1.white;
var focusInset$4 = colors$1.gray100;
var focusInverse$4 = colors$1.blue60; // Skeleton

var skeletonBackground$4 = adjustLightness(background$4, 7);
var skeletonElement$4 = colors$1.gray80; // Misc

var interactive$4 = colors$1.blue50;
var highlight$4 = colors$1.blue80;
var overlay$4 = colors$1.rgba(colors$1.black, 0.65);
var toggleOff$4 = colors$1.gray60;
var shadow$4 = colors$1.rgba(colors$1.black, 0.8);

var g100$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  background: background$4,
  backgroundInverse: backgroundInverse$4,
  backgroundBrand: backgroundBrand$4,
  backgroundActive: backgroundActive$4,
  backgroundHover: backgroundHover$4,
  backgroundInverseHover: backgroundInverseHover$4,
  backgroundSelected: backgroundSelected$4,
  backgroundSelectedHover: backgroundSelectedHover$4,
  layer01: layer01,
  layerActive01: layerActive01,
  layerHover01: layerHover01,
  layerSelected01: layerSelected01,
  layerSelectedHover01: layerSelectedHover01,
  layer02: layer02,
  layerActive02: layerActive02,
  layerHover02: layerHover02,
  layerSelected02: layerSelected02,
  layerSelectedHover02: layerSelectedHover02,
  layer03: layer03,
  layerActive03: layerActive03,
  layerHover03: layerHover03,
  layerSelected03: layerSelected03,
  layerSelectedHover03: layerSelectedHover03,
  layerSelectedInverse: layerSelectedInverse$4,
  layerSelectedDisabled: layerSelectedDisabled$4,
  layerAccent01: layerAccent01,
  layerAccentActive01: layerAccentActive01,
  layerAccentHover01: layerAccentHover01,
  layerAccent02: layerAccent02,
  layerAccentActive02: layerAccentActive02,
  layerAccentHover02: layerAccentHover02,
  layerAccent03: layerAccent03,
  layerAccentActive03: layerAccentActive03,
  layerAccentHover03: layerAccentHover03,
  field01: field01$4,
  fieldHover01: fieldHover01,
  field02: field02$4,
  fieldHover02: fieldHover02,
  field03: field03,
  fieldHover03: fieldHover03,
  borderSubtle00: borderSubtle00,
  borderSubtle01: borderSubtle01,
  borderSubtleSelected01: borderSubtleSelected01,
  borderSubtle02: borderSubtle02,
  borderSubtleSelected02: borderSubtleSelected02,
  borderSubtle03: borderSubtle03,
  borderSubtleSelected03: borderSubtleSelected03,
  borderStrong01: borderStrong01,
  borderStrong02: borderStrong02,
  borderStrong03: borderStrong03,
  borderInverse: borderInverse$4,
  borderInteractive: borderInteractive$4,
  borderDisabled: borderDisabled$4,
  textPrimary: textPrimary$4,
  textSecondary: textSecondary$4,
  textPlaceholder: textPlaceholder$4,
  textHelper: textHelper$4,
  textError: textError$4,
  textInverse: textInverse$4,
  textOnColor: textOnColor$4,
  textOnColorDisabled: textOnColorDisabled$4,
  textDisabled: textDisabled$4,
  linkPrimary: linkPrimary$4,
  linkPrimaryHover: linkPrimaryHover$4,
  linkSecondary: linkSecondary$4,
  linkInverse: linkInverse$4,
  linkVisited: linkVisited$4,
  linkInverseActive: linkInverseActive,
  linkInverseHover: linkInverseHover,
  iconPrimary: iconPrimary$4,
  iconSecondary: iconSecondary$4,
  iconInverse: iconInverse$4,
  iconOnColor: iconOnColor$4,
  iconOnColorDisabled: iconOnColorDisabled$4,
  iconDisabled: iconDisabled$4,
  supportError: supportError$4,
  supportSuccess: supportSuccess$4,
  supportWarning: supportWarning$4,
  supportInfo: supportInfo$4,
  supportErrorInverse: supportErrorInverse$4,
  supportSuccessInverse: supportSuccessInverse$4,
  supportWarningInverse: supportWarningInverse$4,
  supportInfoInverse: supportInfoInverse$4,
  supportCautionMinor: supportCautionMinor,
  supportCautionMajor: supportCautionMajor,
  supportCautionUndefined: supportCautionUndefined,
  focus: focus$4,
  focusInset: focusInset$4,
  focusInverse: focusInverse$4,
  skeletonBackground: skeletonBackground$4,
  skeletonElement: skeletonElement$4,
  interactive: interactive$4,
  highlight: highlight$4,
  overlay: overlay$4,
  toggleOff: toggleOff$4,
  shadow: shadow$4,
  caption01: type.caption01,
  caption02: type.caption02,
  label01: type.label01,
  label02: type.label02,
  helperText01: type.helperText01,
  helperText02: type.helperText02,
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
  spacing13: layout.spacing13,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  sizeXSmall: layout.sizeXSmall,
  sizeSmall: layout.sizeSmall,
  sizeMedium: layout.sizeMedium,
  sizeLarge: layout.sizeLarge,
  sizeXLarge: layout.sizeXLarge,
  size2XLarge: layout.size2XLarge,
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
var interactive02$3 = colors$1.gray80;
var interactive03$3 = colors$1.blue60;
var interactive04$3 = colors$1.blue60;
var uiBackground$3 = colors$1.white;
var ui01$3 = colors$1.gray10;
var ui02$3 = colors$1.white;
var ui03$3 = colors$1.gray20;
var ui04$3 = colors$1.gray50;
var ui05$3 = colors$1.gray100;
var text01$3 = colors$1.gray100;
var text02$3 = colors$1.gray70;
var text03$3 = colors$1.gray40;
var text04$3 = colors$1.white;
var text05$3 = colors$1.gray60;
var textError$3 = colors$1.red60;
var icon01$3 = colors$1.gray100;
var icon02$3 = colors$1.gray70;
var icon03$3 = colors$1.white;
var link01$3 = colors$1.blue60;
var link02$3 = colors$1.blue70;
var inverseLink$3 = colors$1.blue40;
var field01$3 = colors$1.gray10;
var field02$3 = colors$1.white;
var inverse01$3 = colors$1.white;
var inverse02$3 = colors$1.gray80;
var support01$3 = colors$1.red60;
var support02$3 = colors$1.green60;
var support03$3 = colors$1.yellow30;
var support04$3 = colors$1.blue70;
var inverseSupport01$3 = colors$1.red50;
var inverseSupport02$3 = colors$1.green40;
var inverseSupport03$3 = colors$1.yellow30;
var inverseSupport04$3 = colors$1.blue50;
var overlay01$3 = colors$1.rgba(colors$1.gray100, 0.5);
var danger01$3 = colors$1.red60;
var danger02$3 = colors$1.red60; // Interaction states

var focus$3 = colors$1.blue60;
var inverseFocusUi$3 = colors$1.white;
var hoverPrimary$3 = '#0353e9';
var activePrimary$3 = colors$1.blue80;
var hoverPrimaryText$3 = colors$1.blue70;
var hoverSecondary$3 = '#4c4c4c';
var activeSecondary$3 = colors$1.gray60;
var hoverTertiary$3 = '#0353e9';
var activeTertiary$3 = colors$1.blue80;
var hoverUI$3 = '#e5e5e5';
var hoverLightUI$3 = '#e5e5e5';
var activeUI$3 = colors$1.gray30;
var activeLightUI$3 = colors$1.gray30;
var selectedUI$3 = colors$1.gray20;
var selectedLightUI$3 = colors$1.gray20;
var inverseHoverUI$3 = '#4c4c4c';
var hoverSelectedUI$3 = '#cacaca';
var hoverDanger$3 = adjustLightness(danger01$3, -8);
var activeDanger$3 = colors$1.red80;
var hoverRow$3 = '#e5e5e5';
var visitedLink$3 = colors$1.purple60;
var disabled01$3 = colors$1.gray10;
var disabled02$3 = colors$1.gray30;
var disabled03$3 = colors$1.gray50;
var highlight$3 = colors$1.blue20;
var decorative01$3 = colors$1.gray20;
var buttonSeparator$3 = '#e0e0e0';
var skeleton01$3 = '#e5e5e5';
var skeleton02$3 = colors$1.gray30; // New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens

var background$3 = uiBackground$3;
var layer$3 = ui01$3;
var layerAccent$3 = ui03$3;
var layerAccentActive$3 = colors$1.gray40;
var layerAccentHover$3 = adjustLightness(layerAccent$3, -6);
var field$3 = field01$3;
var backgroundInverse$3 = inverse02$3;
var backgroundBrand$3 = interactive01$3;
var interactive$3 = interactive04$3;
var borderSubtle$3 = ui03$3;
var borderStrong$3 = ui04$3;
var borderInverse$3 = ui05$3;
var borderInteractive$3 = interactive04$3;
var textPrimary$3 = text01$3;
var textSecondary$3 = text02$3;
var textPlaceholder$3 = text03$3;
var textHelper$3 = text05$3;
var textOnColor$3 = text04$3;
var textInverse$3 = inverse01$3;
var linkPrimary$3 = link01$3;
var linkSecondary$3 = link02$3;
var linkVisited$3 = visitedLink$3;
var linkInverse$3 = inverseLink$3;
var iconPrimary$3 = icon01$3;
var iconSecondary$3 = icon02$3;
var iconOnColor$3 = icon03$3;
var iconInverse$3 = inverse01$3;
var supportError$3 = support01$3;
var supportSuccess$3 = support02$3;
var supportWarning$3 = support03$3;
var supportInfo$3 = support04$3;
var supportErrorInverse$3 = inverseSupport01$3;
var supportSuccessInverse$3 = inverseSupport02$3;
var supportWarningInverse$3 = inverseSupport03$3;
var supportInfoInverse$3 = inverseSupport04$3;
var overlay$3 = overlay01$3;
var toggleOff$3 = ui04$3;
var shadow$3 = colors$1.rgba(colors$1.black, 0.3);
var buttonPrimary$3 = interactive01$3;
var buttonSecondary$3 = interactive02$3;
var buttonTertiary$3 = interactive03$3;
var buttonDangerPrimary$3 = danger01$3;
var buttonDangerSecondary$3 = danger02$3;
var backgroundActive$3 = activeUI$3;
var layerActive$3 = activeUI$3;
var buttonDangerActive$3 = activeDanger$3;
var buttonPrimaryActive$3 = activePrimary$3;
var buttonSecondaryActive$3 = activeSecondary$3;
var buttonTertiaryActive$3 = activeTertiary$3;
var focusInset$3 = inverse01$3;
var focusInverse$3 = inverseFocusUi$3;
var backgroundHover$3 = hoverUI$3;
var layerHover$3 = hoverUI$3;
var fieldHover$3 = hoverUI$3;
var backgroundInverseHover$3 = inverseHoverUI$3;
var linkPrimaryHover$3 = hoverPrimaryText$3;
var buttonDangerHover$3 = hoverDanger$3;
var buttonPrimaryHover$3 = hoverPrimary$3;
var buttonSecondaryHover$3 = hoverSecondary$3;
var buttonTertiaryHover$3 = hoverTertiary$3;
var backgroundSelected$3 = selectedUI$3;
var backgroundSelectedHover$3 = hoverSelectedUI$3;
var layerSelected$3 = selectedUI$3;
var layerSelectedHover$3 = hoverSelectedUI$3;
var layerSelectedInverse$3 = ui05$3;
var borderSubtleSelected$3 = activeUI$3;
var borderDisabled$3 = disabled01$3;
var textDisabled$3 = disabled02$3;
var buttonDisabled$3 = disabled02$3;
var iconDisabled$3 = disabled02$3;
var textOnColorDisabled$3 = disabled03$3;
var iconOnColorDisabled$3 = disabled03$3;
var layerSelectedDisabled$3 = disabled03$3;
var skeletonBackground$3 = skeleton01$3;
var skeletonElement$3 = skeleton02$3; // Type

var brand01$3 = interactive01$3;
var brand02$3 = interactive02$3;
var brand03$3 = interactive03$3;
var active01$3 = activeUI$3;
var hoverField$3 = hoverUI$3;
var danger$3 = danger01$3;

var white = /*#__PURE__*/Object.freeze({
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
  background: background$3,
  layer: layer$3,
  layerAccent: layerAccent$3,
  layerAccentActive: layerAccentActive$3,
  layerAccentHover: layerAccentHover$3,
  field: field$3,
  backgroundInverse: backgroundInverse$3,
  backgroundBrand: backgroundBrand$3,
  interactive: interactive$3,
  borderSubtle: borderSubtle$3,
  borderStrong: borderStrong$3,
  borderInverse: borderInverse$3,
  borderInteractive: borderInteractive$3,
  textPrimary: textPrimary$3,
  textSecondary: textSecondary$3,
  textPlaceholder: textPlaceholder$3,
  textHelper: textHelper$3,
  textOnColor: textOnColor$3,
  textInverse: textInverse$3,
  linkPrimary: linkPrimary$3,
  linkSecondary: linkSecondary$3,
  linkVisited: linkVisited$3,
  linkInverse: linkInverse$3,
  iconPrimary: iconPrimary$3,
  iconSecondary: iconSecondary$3,
  iconOnColor: iconOnColor$3,
  iconInverse: iconInverse$3,
  supportError: supportError$3,
  supportSuccess: supportSuccess$3,
  supportWarning: supportWarning$3,
  supportInfo: supportInfo$3,
  supportErrorInverse: supportErrorInverse$3,
  supportSuccessInverse: supportSuccessInverse$3,
  supportWarningInverse: supportWarningInverse$3,
  supportInfoInverse: supportInfoInverse$3,
  overlay: overlay$3,
  toggleOff: toggleOff$3,
  shadow: shadow$3,
  buttonPrimary: buttonPrimary$3,
  buttonSecondary: buttonSecondary$3,
  buttonTertiary: buttonTertiary$3,
  buttonDangerPrimary: buttonDangerPrimary$3,
  buttonDangerSecondary: buttonDangerSecondary$3,
  backgroundActive: backgroundActive$3,
  layerActive: layerActive$3,
  buttonDangerActive: buttonDangerActive$3,
  buttonPrimaryActive: buttonPrimaryActive$3,
  buttonSecondaryActive: buttonSecondaryActive$3,
  buttonTertiaryActive: buttonTertiaryActive$3,
  focusInset: focusInset$3,
  focusInverse: focusInverse$3,
  backgroundHover: backgroundHover$3,
  layerHover: layerHover$3,
  fieldHover: fieldHover$3,
  backgroundInverseHover: backgroundInverseHover$3,
  linkPrimaryHover: linkPrimaryHover$3,
  buttonDangerHover: buttonDangerHover$3,
  buttonPrimaryHover: buttonPrimaryHover$3,
  buttonSecondaryHover: buttonSecondaryHover$3,
  buttonTertiaryHover: buttonTertiaryHover$3,
  backgroundSelected: backgroundSelected$3,
  backgroundSelectedHover: backgroundSelectedHover$3,
  layerSelected: layerSelected$3,
  layerSelectedHover: layerSelectedHover$3,
  layerSelectedInverse: layerSelectedInverse$3,
  borderSubtleSelected: borderSubtleSelected$3,
  borderDisabled: borderDisabled$3,
  textDisabled: textDisabled$3,
  buttonDisabled: buttonDisabled$3,
  iconDisabled: iconDisabled$3,
  textOnColorDisabled: textOnColorDisabled$3,
  iconOnColorDisabled: iconOnColorDisabled$3,
  layerSelectedDisabled: layerSelectedDisabled$3,
  skeletonBackground: skeletonBackground$3,
  skeletonElement: skeletonElement$3,
  brand01: brand01$3,
  brand02: brand02$3,
  brand03: brand03$3,
  active01: active01$3,
  hoverField: hoverField$3,
  danger: danger$3,
  caption01: type.caption01,
  caption02: type.caption02,
  label01: type.label01,
  label02: type.label02,
  helperText01: type.helperText01,
  helperText02: type.helperText02,
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
  legal01: type.legal01,
  legal02: type.legal02,
  bodyCompact01: type.bodyCompact01,
  bodyCompact02: type.bodyCompact02,
  body01: type.body01,
  body02: type.body02,
  headingCompact01: type.headingCompact01,
  headingCompact02: type.headingCompact02,
  heading03: type.heading03,
  heading04: type.heading04,
  heading05: type.heading05,
  heading06: type.heading06,
  heading07: type.heading07,
  fluidHeading03: type.fluidHeading03,
  fluidHeading04: type.fluidHeading04,
  fluidHeading05: type.fluidHeading05,
  fluidHeading06: type.fluidHeading06,
  fluidParagraph01: type.fluidParagraph01,
  fluidQuotation01: type.fluidQuotation01,
  fluidQuotation02: type.fluidQuotation02,
  fluidDisplay01: type.fluidDisplay01,
  fluidDisplay02: type.fluidDisplay02,
  fluidDisplay03: type.fluidDisplay03,
  fluidDisplay04: type.fluidDisplay04,
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
  spacing13: layout.spacing13,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  sizeXSmall: layout.sizeXSmall,
  sizeSmall: layout.sizeSmall,
  sizeMedium: layout.sizeMedium,
  sizeLarge: layout.sizeLarge,
  sizeXLarge: layout.sizeXLarge,
  size2XLarge: layout.size2XLarge,
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
var interactive02$2 = colors$1.gray80;
var interactive03$2 = colors$1.blue60;
var interactive04$2 = colors$1.blue60;
var uiBackground$2 = colors$1.gray10;
var ui01$2 = colors$1.white;
var ui02$2 = colors$1.gray10;
var ui03$2 = colors$1.gray20;
var ui04$2 = colors$1.gray50;
var ui05$2 = colors$1.gray100;
var text01$2 = colors$1.gray100;
var text02$2 = colors$1.gray70;
var text03$2 = colors$1.gray40;
var text04$2 = colors$1.white;
var text05$2 = colors$1.gray60;
var textError$2 = colors$1.red60;
var icon01$2 = colors$1.gray100;
var icon02$2 = colors$1.gray70;
var icon03$2 = colors$1.white;
var link01$2 = colors$1.blue60;
var link02$2 = colors$1.blue70;
var inverseLink$2 = colors$1.blue40;
var field01$2 = colors$1.white;
var field02$2 = colors$1.gray10;
var inverse01$2 = colors$1.white;
var inverse02$2 = colors$1.gray80;
var support01$2 = colors$1.red60;
var support02$2 = colors$1.green60;
var support03$2 = colors$1.yellow30;
var support04$2 = colors$1.blue70;
var inverseSupport01$2 = colors$1.red50;
var inverseSupport02$2 = colors$1.green40;
var inverseSupport03$2 = colors$1.yellow30;
var inverseSupport04$2 = colors$1.blue50;
var overlay01$2 = colors$1.rgba(colors$1.gray100, 0.5);
var danger01$2 = colors$1.red60;
var danger02$2 = colors$1.red60; // Interaction states

var focus$2 = colors$1.blue60;
var inverseFocusUi$2 = colors$1.white;
var hoverPrimary$2 = '#0353e9';
var activePrimary$2 = colors$1.blue80;
var hoverPrimaryText$2 = colors$1.blue70;
var hoverSecondary$2 = '#4c4c4c';
var activeSecondary$2 = colors$1.gray60;
var hoverTertiary$2 = '#0353e9';
var activeTertiary$2 = colors$1.blue80;
var hoverUI$2 = '#e5e5e5';
var hoverLightUI$2 = '#e5e5e5';
var activeUI$2 = colors$1.gray30;
var activeLightUI$2 = colors$1.gray30;
var selectedUI$2 = colors$1.gray20;
var selectedLightUI$2 = colors$1.gray20;
var inverseHoverUI$2 = '#4c4c4c';
var hoverSelectedUI$2 = '#cacaca';
var hoverDanger$2 = adjustLightness(danger01$2, -8);
var activeDanger$2 = colors$1.red80;
var hoverRow$2 = '#e5e5e5';
var visitedLink$2 = colors$1.purple60;
var disabled01$2 = colors$1.white;
var disabled02$2 = colors$1.gray30;
var disabled03$2 = colors$1.gray50;
var highlight$2 = colors$1.blue20;
var decorative01$2 = colors$1.gray20;
var buttonSeparator$2 = '#e0e0e0';
var skeleton01$2 = '#e5e5e5';
var skeleton02$2 = colors$1.gray30; // New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens

var background$2 = uiBackground$2;
var layer$2 = ui01$2;
var layerAccent$2 = ui03$2;
var layerAccentActive$2 = colors$1.gray40;
var layerAccentHover$2 = adjustLightness(layerAccent$2, -6);
var field$2 = field01$2;
var backgroundInverse$2 = inverse02$2;
var backgroundBrand$2 = interactive01$2;
var interactive$2 = interactive04$2;
var borderSubtle$2 = ui03$2;
var borderStrong$2 = ui04$2;
var borderInverse$2 = ui05$2;
var borderInteractive$2 = interactive04$2;
var textPrimary$2 = text01$2;
var textSecondary$2 = text02$2;
var textPlaceholder$2 = text03$2;
var textHelper$2 = text05$2;
var textOnColor$2 = text04$2;
var textInverse$2 = inverse01$2;
var linkPrimary$2 = link01$2;
var linkSecondary$2 = link02$2;
var linkVisited$2 = visitedLink$2;
var linkInverse$2 = inverseLink$2;
var iconPrimary$2 = icon01$2;
var iconSecondary$2 = icon02$2;
var iconOnColor$2 = icon03$2;
var iconInverse$2 = inverse01$2;
var supportError$2 = support01$2;
var supportSuccess$2 = support02$2;
var supportWarning$2 = support03$2;
var supportInfo$2 = support04$2;
var supportErrorInverse$2 = inverseSupport01$2;
var supportSuccessInverse$2 = inverseSupport02$2;
var supportWarningInverse$2 = inverseSupport03$2;
var supportInfoInverse$2 = inverseSupport04$2;
var overlay$2 = overlay01$2;
var toggleOff$2 = ui04$2;
var shadow$2 = colors$1.rgba(colors$1.black, 0.3);
var buttonPrimary$2 = interactive01$2;
var buttonSecondary$2 = interactive02$2;
var buttonTertiary$2 = interactive03$2;
var buttonDangerPrimary$2 = danger01$2;
var buttonDangerSecondary$2 = danger02$2;
var backgroundActive$2 = activeUI$2;
var layerActive$2 = activeUI$2;
var buttonDangerActive$2 = activeDanger$2;
var buttonPrimaryActive$2 = activePrimary$2;
var buttonSecondaryActive$2 = activeSecondary$2;
var buttonTertiaryActive$2 = activeTertiary$2;
var focusInset$2 = inverse01$2;
var focusInverse$2 = inverseFocusUi$2;
var backgroundHover$2 = hoverUI$2;
var layerHover$2 = hoverUI$2;
var fieldHover$2 = hoverUI$2;
var backgroundInverseHover$2 = inverseHoverUI$2;
var linkPrimaryHover$2 = hoverPrimaryText$2;
var buttonDangerHover$2 = hoverDanger$2;
var buttonPrimaryHover$2 = hoverPrimary$2;
var buttonSecondaryHover$2 = hoverSecondary$2;
var buttonTertiaryHover$2 = hoverTertiary$2;
var backgroundSelected$2 = selectedUI$2;
var backgroundSelectedHover$2 = hoverSelectedUI$2;
var layerSelected$2 = selectedUI$2;
var layerSelectedHover$2 = hoverSelectedUI$2;
var layerSelectedInverse$2 = ui05$2;
var borderSubtleSelected$2 = activeUI$2;
var borderDisabled$2 = disabled01$2;
var textDisabled$2 = disabled02$2;
var buttonDisabled$2 = disabled02$2;
var iconDisabled$2 = disabled02$2;
var textOnColorDisabled$2 = disabled03$2;
var iconOnColorDisabled$2 = disabled03$2;
var layerSelectedDisabled$2 = disabled03$2;
var skeletonBackground$2 = skeleton01$2;
var skeletonElement$2 = skeleton02$2;

var brand01$2 = interactive01$2;
var brand02$2 = interactive02$2;
var brand03$2 = interactive03$2;
var active01$2 = activeUI$2;
var hoverField$2 = hoverUI$2;
var danger$2 = danger01$2;

var g10 = /*#__PURE__*/Object.freeze({
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
  background: background$2,
  layer: layer$2,
  layerAccent: layerAccent$2,
  layerAccentActive: layerAccentActive$2,
  layerAccentHover: layerAccentHover$2,
  field: field$2,
  backgroundInverse: backgroundInverse$2,
  backgroundBrand: backgroundBrand$2,
  interactive: interactive$2,
  borderSubtle: borderSubtle$2,
  borderStrong: borderStrong$2,
  borderInverse: borderInverse$2,
  borderInteractive: borderInteractive$2,
  textPrimary: textPrimary$2,
  textSecondary: textSecondary$2,
  textPlaceholder: textPlaceholder$2,
  textHelper: textHelper$2,
  textOnColor: textOnColor$2,
  textInverse: textInverse$2,
  linkPrimary: linkPrimary$2,
  linkSecondary: linkSecondary$2,
  linkVisited: linkVisited$2,
  linkInverse: linkInverse$2,
  iconPrimary: iconPrimary$2,
  iconSecondary: iconSecondary$2,
  iconOnColor: iconOnColor$2,
  iconInverse: iconInverse$2,
  supportError: supportError$2,
  supportSuccess: supportSuccess$2,
  supportWarning: supportWarning$2,
  supportInfo: supportInfo$2,
  supportErrorInverse: supportErrorInverse$2,
  supportSuccessInverse: supportSuccessInverse$2,
  supportWarningInverse: supportWarningInverse$2,
  supportInfoInverse: supportInfoInverse$2,
  overlay: overlay$2,
  toggleOff: toggleOff$2,
  shadow: shadow$2,
  buttonPrimary: buttonPrimary$2,
  buttonSecondary: buttonSecondary$2,
  buttonTertiary: buttonTertiary$2,
  buttonDangerPrimary: buttonDangerPrimary$2,
  buttonDangerSecondary: buttonDangerSecondary$2,
  backgroundActive: backgroundActive$2,
  layerActive: layerActive$2,
  buttonDangerActive: buttonDangerActive$2,
  buttonPrimaryActive: buttonPrimaryActive$2,
  buttonSecondaryActive: buttonSecondaryActive$2,
  buttonTertiaryActive: buttonTertiaryActive$2,
  focusInset: focusInset$2,
  focusInverse: focusInverse$2,
  backgroundHover: backgroundHover$2,
  layerHover: layerHover$2,
  fieldHover: fieldHover$2,
  backgroundInverseHover: backgroundInverseHover$2,
  linkPrimaryHover: linkPrimaryHover$2,
  buttonDangerHover: buttonDangerHover$2,
  buttonPrimaryHover: buttonPrimaryHover$2,
  buttonSecondaryHover: buttonSecondaryHover$2,
  buttonTertiaryHover: buttonTertiaryHover$2,
  backgroundSelected: backgroundSelected$2,
  backgroundSelectedHover: backgroundSelectedHover$2,
  layerSelected: layerSelected$2,
  layerSelectedHover: layerSelectedHover$2,
  layerSelectedInverse: layerSelectedInverse$2,
  borderSubtleSelected: borderSubtleSelected$2,
  borderDisabled: borderDisabled$2,
  textDisabled: textDisabled$2,
  buttonDisabled: buttonDisabled$2,
  iconDisabled: iconDisabled$2,
  textOnColorDisabled: textOnColorDisabled$2,
  iconOnColorDisabled: iconOnColorDisabled$2,
  layerSelectedDisabled: layerSelectedDisabled$2,
  skeletonBackground: skeletonBackground$2,
  skeletonElement: skeletonElement$2,
  brand01: brand01$2,
  brand02: brand02$2,
  brand03: brand03$2,
  active01: active01$2,
  hoverField: hoverField$2,
  danger: danger$2,
  caption01: type.caption01,
  caption02: type.caption02,
  label01: type.label01,
  label02: type.label02,
  helperText01: type.helperText01,
  helperText02: type.helperText02,
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
  legal01: type.legal01,
  legal02: type.legal02,
  bodyCompact01: type.bodyCompact01,
  bodyCompact02: type.bodyCompact02,
  body01: type.body01,
  body02: type.body02,
  headingCompact01: type.headingCompact01,
  headingCompact02: type.headingCompact02,
  heading03: type.heading03,
  heading04: type.heading04,
  heading05: type.heading05,
  heading06: type.heading06,
  heading07: type.heading07,
  fluidHeading03: type.fluidHeading03,
  fluidHeading04: type.fluidHeading04,
  fluidHeading05: type.fluidHeading05,
  fluidHeading06: type.fluidHeading06,
  fluidParagraph01: type.fluidParagraph01,
  fluidQuotation01: type.fluidQuotation01,
  fluidQuotation02: type.fluidQuotation02,
  fluidDisplay01: type.fluidDisplay01,
  fluidDisplay02: type.fluidDisplay02,
  fluidDisplay03: type.fluidDisplay03,
  fluidDisplay04: type.fluidDisplay04,
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
  spacing13: layout.spacing13,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  sizeXSmall: layout.sizeXSmall,
  sizeSmall: layout.sizeSmall,
  sizeMedium: layout.sizeMedium,
  sizeLarge: layout.sizeLarge,
  sizeXLarge: layout.sizeXLarge,
  size2XLarge: layout.size2XLarge,
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
var interactive02$1 = colors$1.gray60;
var interactive03$1 = colors$1.white;
var interactive04$1 = colors$1.blue50;
var uiBackground$1 = colors$1.gray90;
var ui01$1 = colors$1.gray80;
var ui02$1 = colors$1.gray70;
var ui03$1 = colors$1.gray70;
var ui04$1 = colors$1.gray50;
var ui05$1 = colors$1.gray10;
var text01$1 = colors$1.gray10;
var text02$1 = colors$1.gray30;
var text03$1 = colors$1.gray60;
var text04$1 = colors$1.white;
var text05$1 = colors$1.gray50;
var textError$1 = colors$1.red30;
var icon01$1 = colors$1.gray10;
var icon02$1 = colors$1.gray30;
var icon03$1 = colors$1.white;
var link01$1 = colors$1.blue40;
var link02$1 = colors$1.blue30;
var inverseLink$1 = colors$1.blue60;
var field01$1 = colors$1.gray80;
var field02$1 = colors$1.gray70;
var inverse01$1 = colors$1.gray100;
var inverse02$1 = colors$1.gray10;
var support01$1 = colors$1.red40;
var support02$1 = colors$1.green40;
var support03$1 = colors$1.yellow30;
var support04$1 = colors$1.blue50;
var inverseSupport01$1 = colors$1.red60;
var inverseSupport02$1 = colors$1.green50;
var inverseSupport03$1 = colors$1.yellow30;
var inverseSupport04$1 = colors$1.blue60;
var overlay01$1 = colors$1.rgba(colors$1.black, 0.65);
var danger01$1 = colors$1.red60;
var danger02$1 = colors$1.red40; // Interaction states

var focus$1 = colors$1.white;
var inverseFocusUi$1 = colors$1.blue60;
var hoverPrimary$1 = '#0353e9';
var activePrimary$1 = colors$1.blue80;
var hoverPrimaryText$1 = colors$1.blue30;
var hoverSecondary$1 = '#606060';
var activeSecondary$1 = colors$1.gray80;
var hoverTertiary$1 = colors$1.gray10;
var activeTertiary$1 = colors$1.gray30;
var hoverUI$1 = '#4c4c4c';
var hoverLightUI$1 = '#656565';
var activeUI$1 = colors$1.gray60;
var activeLightUI$1 = colors$1.gray50;
var selectedUI$1 = colors$1.gray70;
var selectedLightUI$1 = colors$1.gray60;
var inverseHoverUI$1 = '#e5e5e5';
var hoverSelectedUI$1 = '#656565';
var hoverDanger$1 = adjustLightness(danger01$1, -8);
var activeDanger$1 = colors$1.red80;
var hoverRow$1 = '#4c4c4c';
var visitedLink$1 = colors$1.purple40;
var disabled01$1 = colors$1.gray80;
var disabled02$1 = colors$1.gray60;
var disabled03$1 = colors$1.gray40;
var highlight$1 = colors$1.blue70;
var decorative01$1 = colors$1.gray60;
var buttonSeparator$1 = '#161616';
var skeleton01$1 = '#353535';
var skeleton02$1 = colors$1.gray70; // New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens

var background$1 = uiBackground$1;
var layer$1 = ui01$1;
var layerAccent$1 = ui03$1;
var layerAccentActive$1 = colors$1.gray50;
var layerAccentHover$1 = adjustLightness(layerAccent$1, +7);
var field$1 = field01$1;
var backgroundInverse$1 = inverse02$1;
var backgroundBrand$1 = interactive01$1;
var interactive$1 = interactive04$1;
var borderSubtle$1 = ui03$1;
var borderStrong$1 = ui04$1;
var borderInverse$1 = ui05$1;
var borderInteractive$1 = interactive04$1;
var textPrimary$1 = text01$1;
var textSecondary$1 = text02$1;
var textPlaceholder$1 = text03$1;
var textHelper$1 = text05$1;
var textOnColor$1 = text04$1;
var textInverse$1 = inverse01$1;
var linkPrimary$1 = link01$1;
var linkSecondary$1 = link02$1;
var linkVisited$1 = visitedLink$1;
var linkInverse$1 = inverseLink$1;
var iconPrimary$1 = icon01$1;
var iconSecondary$1 = icon02$1;
var iconOnColor$1 = icon03$1;
var iconInverse$1 = inverse01$1;
var supportError$1 = support01$1;
var supportSuccess$1 = support02$1;
var supportWarning$1 = support03$1;
var supportInfo$1 = support04$1;
var supportErrorInverse$1 = inverseSupport01$1;
var supportSuccessInverse$1 = inverseSupport02$1;
var supportWarningInverse$1 = inverseSupport03$1;
var supportInfoInverse$1 = inverseSupport04$1;
var overlay$1 = overlay01$1;
var toggleOff$1 = ui04$1;
var shadow$1 = colors$1.rgba(colors$1.black, 0.8);
var buttonPrimary$1 = interactive01$1;
var buttonSecondary$1 = interactive02$1;
var buttonTertiary$1 = interactive03$1;
var buttonDangerPrimary$1 = danger01$1;
var buttonDangerSecondary$1 = danger02$1;
var backgroundActive$1 = activeUI$1;
var layerActive$1 = activeUI$1;
var buttonDangerActive$1 = activeDanger$1;
var buttonPrimaryActive$1 = activePrimary$1;
var buttonSecondaryActive$1 = activeSecondary$1;
var buttonTertiaryActive$1 = activeTertiary$1;
var focusInset$1 = inverse01$1;
var focusInverse$1 = inverseFocusUi$1;
var backgroundHover$1 = hoverUI$1;
var layerHover$1 = hoverUI$1;
var fieldHover$1 = hoverUI$1;
var backgroundInverseHover$1 = inverseHoverUI$1;
var linkPrimaryHover$1 = hoverPrimaryText$1;
var buttonDangerHover$1 = hoverDanger$1;
var buttonPrimaryHover$1 = hoverPrimary$1;
var buttonSecondaryHover$1 = hoverSecondary$1;
var buttonTertiaryHover$1 = hoverTertiary$1;
var backgroundSelected$1 = selectedUI$1;
var backgroundSelectedHover$1 = hoverSelectedUI$1;
var layerSelected$1 = selectedUI$1;
var layerSelectedHover$1 = hoverSelectedUI$1;
var layerSelectedInverse$1 = ui05$1;
var borderSubtleSelected$1 = activeUI$1;
var borderDisabled$1 = disabled01$1;
var textDisabled$1 = disabled02$1;
var buttonDisabled$1 = disabled02$1;
var iconDisabled$1 = disabled02$1;
var textOnColorDisabled$1 = disabled03$1;
var iconOnColorDisabled$1 = disabled03$1;
var layerSelectedDisabled$1 = disabled03$1;
var skeletonBackground$1 = skeleton01$1;
var skeletonElement$1 = skeleton02$1;

var brand01$1 = interactive01$1;
var brand02$1 = interactive02$1;
var brand03$1 = interactive03$1;
var active01$1 = activeUI$1;
var hoverField$1 = hoverUI$1;
var danger$1 = danger01$1;

var g90 = /*#__PURE__*/Object.freeze({
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
  background: background$1,
  layer: layer$1,
  layerAccent: layerAccent$1,
  layerAccentActive: layerAccentActive$1,
  layerAccentHover: layerAccentHover$1,
  field: field$1,
  backgroundInverse: backgroundInverse$1,
  backgroundBrand: backgroundBrand$1,
  interactive: interactive$1,
  borderSubtle: borderSubtle$1,
  borderStrong: borderStrong$1,
  borderInverse: borderInverse$1,
  borderInteractive: borderInteractive$1,
  textPrimary: textPrimary$1,
  textSecondary: textSecondary$1,
  textPlaceholder: textPlaceholder$1,
  textHelper: textHelper$1,
  textOnColor: textOnColor$1,
  textInverse: textInverse$1,
  linkPrimary: linkPrimary$1,
  linkSecondary: linkSecondary$1,
  linkVisited: linkVisited$1,
  linkInverse: linkInverse$1,
  iconPrimary: iconPrimary$1,
  iconSecondary: iconSecondary$1,
  iconOnColor: iconOnColor$1,
  iconInverse: iconInverse$1,
  supportError: supportError$1,
  supportSuccess: supportSuccess$1,
  supportWarning: supportWarning$1,
  supportInfo: supportInfo$1,
  supportErrorInverse: supportErrorInverse$1,
  supportSuccessInverse: supportSuccessInverse$1,
  supportWarningInverse: supportWarningInverse$1,
  supportInfoInverse: supportInfoInverse$1,
  overlay: overlay$1,
  toggleOff: toggleOff$1,
  shadow: shadow$1,
  buttonPrimary: buttonPrimary$1,
  buttonSecondary: buttonSecondary$1,
  buttonTertiary: buttonTertiary$1,
  buttonDangerPrimary: buttonDangerPrimary$1,
  buttonDangerSecondary: buttonDangerSecondary$1,
  backgroundActive: backgroundActive$1,
  layerActive: layerActive$1,
  buttonDangerActive: buttonDangerActive$1,
  buttonPrimaryActive: buttonPrimaryActive$1,
  buttonSecondaryActive: buttonSecondaryActive$1,
  buttonTertiaryActive: buttonTertiaryActive$1,
  focusInset: focusInset$1,
  focusInverse: focusInverse$1,
  backgroundHover: backgroundHover$1,
  layerHover: layerHover$1,
  fieldHover: fieldHover$1,
  backgroundInverseHover: backgroundInverseHover$1,
  linkPrimaryHover: linkPrimaryHover$1,
  buttonDangerHover: buttonDangerHover$1,
  buttonPrimaryHover: buttonPrimaryHover$1,
  buttonSecondaryHover: buttonSecondaryHover$1,
  buttonTertiaryHover: buttonTertiaryHover$1,
  backgroundSelected: backgroundSelected$1,
  backgroundSelectedHover: backgroundSelectedHover$1,
  layerSelected: layerSelected$1,
  layerSelectedHover: layerSelectedHover$1,
  layerSelectedInverse: layerSelectedInverse$1,
  borderSubtleSelected: borderSubtleSelected$1,
  borderDisabled: borderDisabled$1,
  textDisabled: textDisabled$1,
  buttonDisabled: buttonDisabled$1,
  iconDisabled: iconDisabled$1,
  textOnColorDisabled: textOnColorDisabled$1,
  iconOnColorDisabled: iconOnColorDisabled$1,
  layerSelectedDisabled: layerSelectedDisabled$1,
  skeletonBackground: skeletonBackground$1,
  skeletonElement: skeletonElement$1,
  brand01: brand01$1,
  brand02: brand02$1,
  brand03: brand03$1,
  active01: active01$1,
  hoverField: hoverField$1,
  danger: danger$1,
  caption01: type.caption01,
  caption02: type.caption02,
  label01: type.label01,
  label02: type.label02,
  helperText01: type.helperText01,
  helperText02: type.helperText02,
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
  legal01: type.legal01,
  legal02: type.legal02,
  bodyCompact01: type.bodyCompact01,
  bodyCompact02: type.bodyCompact02,
  body01: type.body01,
  body02: type.body02,
  headingCompact01: type.headingCompact01,
  headingCompact02: type.headingCompact02,
  heading03: type.heading03,
  heading04: type.heading04,
  heading05: type.heading05,
  heading06: type.heading06,
  heading07: type.heading07,
  fluidHeading03: type.fluidHeading03,
  fluidHeading04: type.fluidHeading04,
  fluidHeading05: type.fluidHeading05,
  fluidHeading06: type.fluidHeading06,
  fluidParagraph01: type.fluidParagraph01,
  fluidQuotation01: type.fluidQuotation01,
  fluidQuotation02: type.fluidQuotation02,
  fluidDisplay01: type.fluidDisplay01,
  fluidDisplay02: type.fluidDisplay02,
  fluidDisplay03: type.fluidDisplay03,
  fluidDisplay04: type.fluidDisplay04,
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
  spacing13: layout.spacing13,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  sizeXSmall: layout.sizeXSmall,
  sizeSmall: layout.sizeSmall,
  sizeMedium: layout.sizeMedium,
  sizeLarge: layout.sizeLarge,
  sizeXLarge: layout.sizeXLarge,
  size2XLarge: layout.size2XLarge,
  iconSize01: layout.iconSize01,
  iconSize02: layout.iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01 = colors$1.blue60;
var interactive02 = colors$1.gray60;
var interactive03 = colors$1.white;
var interactive04 = colors$1.blue50;
var uiBackground = colors$1.gray100;
var ui01 = colors$1.gray90;
var ui02 = colors$1.gray80;
var ui03 = colors$1.gray80;
var ui04 = colors$1.gray60;
var ui05 = colors$1.gray10;
var text01 = colors$1.gray10;
var text02 = colors$1.gray30;
var text03 = colors$1.gray60;
var text04 = colors$1.white;
var text05 = colors$1.gray50;
var textError = colors$1.red40;
var icon01 = colors$1.gray10;
var icon02 = colors$1.gray30;
var icon03 = colors$1.white;
var link01 = colors$1.blue40;
var link02 = colors$1.blue30;
var inverseLink = colors$1.blue60;
var field01 = colors$1.gray90;
var field02 = colors$1.gray80;
var inverse01 = colors$1.gray100;
var inverse02 = colors$1.gray10;
var support01 = colors$1.red50;
var support02 = colors$1.green40;
var support03 = colors$1.yellow30;
var support04 = colors$1.blue50;
var inverseSupport01 = colors$1.red60;
var inverseSupport02 = colors$1.green50;
var inverseSupport03 = colors$1.yellow30;
var inverseSupport04 = colors$1.blue60;
var overlay01 = colors$1.rgba(colors$1.black, 0.65);
var danger01 = colors$1.red60;
var danger02 = colors$1.red50; // Interaction states

var focus = colors$1.white;
var inverseFocusUi = colors$1.blue60;
var hoverPrimary = '#0353e9';
var activePrimary = colors$1.blue80;
var hoverPrimaryText = colors$1.blue30;
var hoverSecondary = '#606060';
var activeSecondary = colors$1.gray80;
var hoverTertiary = colors$1.gray10;
var activeTertiary = colors$1.gray30;
var hoverUI = '#353535';
var hoverLightUI = '#4c4c4c';
var activeUI = colors$1.gray70;
var activeLightUI = colors$1.gray60;
var selectedUI = colors$1.gray80;
var selectedLightUI = colors$1.gray70;
var inverseHoverUI = '#e5e5e5';
var hoverSelectedUI = '#4c4c4c';
var hoverDanger = adjustLightness(danger01, -8);
var activeDanger = colors$1.red80;
var hoverRow = '#353535';
var visitedLink = colors$1.purple40;
var disabled01 = colors$1.gray90;
var disabled02 = colors$1.gray70;
var disabled03 = colors$1.gray50;
var highlight = colors$1.blue80;
var decorative01 = colors$1.gray70;
var buttonSeparator = '#161616';
var skeleton01 = '#353535';
var skeleton02 = colors$1.gray70; // New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens

var background = uiBackground;
var layer = ui01;
var layerAccent = ui03;
var layerAccentActive = colors$1.gray60;
var layerAccentHover = adjustLightness(layerAccent, +6);
var field = field01;
var backgroundInverse = inverse02;
var backgroundBrand = interactive01;
var interactive = interactive04;
var borderSubtle = ui03;
var borderStrong = ui04;
var borderInverse = ui05;
var borderInteractive = interactive04;
var textPrimary = text01;
var textSecondary = text02;
var textPlaceholder = text03;
var textHelper = text05;
var textOnColor = text04;
var textInverse = inverse01;
var linkPrimary = link01;
var linkSecondary = link02;
var linkVisited = visitedLink;
var linkInverse = inverseLink;
var iconPrimary = icon01;
var iconSecondary = icon02;
var iconOnColor = icon03;
var iconInverse = inverse01;
var supportError = support01;
var supportSuccess = support02;
var supportWarning = support03;
var supportInfo = support04;
var supportErrorInverse = inverseSupport01;
var supportSuccessInverse = inverseSupport02;
var supportWarningInverse = inverseSupport03;
var supportInfoInverse = inverseSupport04;
var overlay = overlay01;
var toggleOff = ui04;
var shadow = colors$1.rgba(colors$1.black, 0.8);
var buttonPrimary = interactive01;
var buttonSecondary = interactive02;
var buttonTertiary = interactive03;
var buttonDangerPrimary = danger01;
var buttonDangerSecondary = danger02;
var backgroundActive = activeUI;
var layerActive = activeUI;
var buttonDangerActive = activeDanger;
var buttonPrimaryActive = activePrimary;
var buttonSecondaryActive = activeSecondary;
var buttonTertiaryActive = activeTertiary;
var focusInset = inverse01;
var focusInverse = inverseFocusUi;
var backgroundHover = hoverUI;
var layerHover = hoverUI;
var fieldHover = hoverUI;
var backgroundInverseHover = inverseHoverUI;
var linkPrimaryHover = hoverPrimaryText;
var buttonDangerHover = hoverDanger;
var buttonPrimaryHover = hoverPrimary;
var buttonSecondaryHover = hoverSecondary;
var buttonTertiaryHover = hoverTertiary;
var backgroundSelected = selectedUI;
var backgroundSelectedHover = hoverSelectedUI;
var layerSelected = selectedUI;
var layerSelectedHover = hoverSelectedUI;
var layerSelectedInverse = ui05;
var borderSubtleSelected = activeUI;
var borderDisabled = disabled01;
var textDisabled = disabled02;
var buttonDisabled = disabled02;
var iconDisabled = disabled02;
var textOnColorDisabled = disabled03;
var iconOnColorDisabled = disabled03;
var layerSelectedDisabled = disabled03;
var skeletonBackground = skeleton01;
var skeletonElement = skeleton02;

var brand01 = interactive01;
var brand02 = interactive02;
var brand03 = interactive03;
var active01 = activeUI;
var hoverField = hoverUI;
var danger = danger01;

var g100 = /*#__PURE__*/Object.freeze({
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
  background: background,
  layer: layer,
  layerAccent: layerAccent,
  layerAccentActive: layerAccentActive,
  layerAccentHover: layerAccentHover,
  field: field,
  backgroundInverse: backgroundInverse,
  backgroundBrand: backgroundBrand,
  interactive: interactive,
  borderSubtle: borderSubtle,
  borderStrong: borderStrong,
  borderInverse: borderInverse,
  borderInteractive: borderInteractive,
  textPrimary: textPrimary,
  textSecondary: textSecondary,
  textPlaceholder: textPlaceholder,
  textHelper: textHelper,
  textOnColor: textOnColor,
  textInverse: textInverse,
  linkPrimary: linkPrimary,
  linkSecondary: linkSecondary,
  linkVisited: linkVisited,
  linkInverse: linkInverse,
  iconPrimary: iconPrimary,
  iconSecondary: iconSecondary,
  iconOnColor: iconOnColor,
  iconInverse: iconInverse,
  supportError: supportError,
  supportSuccess: supportSuccess,
  supportWarning: supportWarning,
  supportInfo: supportInfo,
  supportErrorInverse: supportErrorInverse,
  supportSuccessInverse: supportSuccessInverse,
  supportWarningInverse: supportWarningInverse,
  supportInfoInverse: supportInfoInverse,
  overlay: overlay,
  toggleOff: toggleOff,
  shadow: shadow,
  buttonPrimary: buttonPrimary,
  buttonSecondary: buttonSecondary,
  buttonTertiary: buttonTertiary,
  buttonDangerPrimary: buttonDangerPrimary,
  buttonDangerSecondary: buttonDangerSecondary,
  backgroundActive: backgroundActive,
  layerActive: layerActive,
  buttonDangerActive: buttonDangerActive,
  buttonPrimaryActive: buttonPrimaryActive,
  buttonSecondaryActive: buttonSecondaryActive,
  buttonTertiaryActive: buttonTertiaryActive,
  focusInset: focusInset,
  focusInverse: focusInverse,
  backgroundHover: backgroundHover,
  layerHover: layerHover,
  fieldHover: fieldHover,
  backgroundInverseHover: backgroundInverseHover,
  linkPrimaryHover: linkPrimaryHover,
  buttonDangerHover: buttonDangerHover,
  buttonPrimaryHover: buttonPrimaryHover,
  buttonSecondaryHover: buttonSecondaryHover,
  buttonTertiaryHover: buttonTertiaryHover,
  backgroundSelected: backgroundSelected,
  backgroundSelectedHover: backgroundSelectedHover,
  layerSelected: layerSelected,
  layerSelectedHover: layerSelectedHover,
  layerSelectedInverse: layerSelectedInverse,
  borderSubtleSelected: borderSubtleSelected,
  borderDisabled: borderDisabled,
  textDisabled: textDisabled,
  buttonDisabled: buttonDisabled,
  iconDisabled: iconDisabled,
  textOnColorDisabled: textOnColorDisabled,
  iconOnColorDisabled: iconOnColorDisabled,
  layerSelectedDisabled: layerSelectedDisabled,
  skeletonBackground: skeletonBackground,
  skeletonElement: skeletonElement,
  brand01: brand01,
  brand02: brand02,
  brand03: brand03,
  active01: active01,
  hoverField: hoverField,
  danger: danger,
  caption01: type.caption01,
  caption02: type.caption02,
  label01: type.label01,
  label02: type.label02,
  helperText01: type.helperText01,
  helperText02: type.helperText02,
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
  legal01: type.legal01,
  legal02: type.legal02,
  bodyCompact01: type.bodyCompact01,
  bodyCompact02: type.bodyCompact02,
  body01: type.body01,
  body02: type.body02,
  headingCompact01: type.headingCompact01,
  headingCompact02: type.headingCompact02,
  heading03: type.heading03,
  heading04: type.heading04,
  heading05: type.heading05,
  heading06: type.heading06,
  heading07: type.heading07,
  fluidHeading03: type.fluidHeading03,
  fluidHeading04: type.fluidHeading04,
  fluidHeading05: type.fluidHeading05,
  fluidHeading06: type.fluidHeading06,
  fluidParagraph01: type.fluidParagraph01,
  fluidQuotation01: type.fluidQuotation01,
  fluidQuotation02: type.fluidQuotation02,
  fluidDisplay01: type.fluidDisplay01,
  fluidDisplay02: type.fluidDisplay02,
  fluidDisplay03: type.fluidDisplay03,
  fluidDisplay04: type.fluidDisplay04,
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
  spacing13: layout.spacing13,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  sizeXSmall: layout.sizeXSmall,
  sizeSmall: layout.sizeSmall,
  sizeMedium: layout.sizeMedium,
  sizeLarge: layout.sizeLarge,
  sizeXLarge: layout.sizeXLarge,
  size2XLarge: layout.size2XLarge,
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
'focus', 'inverseFocusUi', 'hoverPrimary', 'activePrimary', 'hoverPrimaryText', 'hoverSecondary', 'activeSecondary', 'hoverTertiary', 'activeTertiary', 'hoverUI', 'hoverLightUI', 'hoverSelectedUI', 'activeUI', 'activeLightUI', 'selectedUI', 'selectedLightUI', 'inverseHoverUI', 'hoverDanger', 'activeDanger', 'hoverRow', 'visitedLink', 'disabled01', 'disabled02', 'disabled03', 'highlight', 'decorative01', 'buttonSeparator', 'skeleton01', 'skeleton02', // New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens
'background', 'layer', 'layerAccent', 'layerAccentHover', 'layerAccentActive', 'field', 'backgroundInverse', 'backgroundBrand', 'interactive', 'borderSubtle', 'borderStrong', 'borderInverse', 'borderInteractive', 'textPrimary', 'textSecondary', 'textPlaceholder', 'textHelper', 'textOnColor', 'textInverse', 'linkPrimary', 'linkSecondary', 'linkVisited', 'linkInverse', 'iconPrimary', 'iconSecondary', 'iconOnColor', 'iconInverse', 'supportError', 'supportSuccess', 'supportWarning', 'supportInfo', 'supportErrorInverse', 'supportSuccessInverse', 'supportWarningInverse', 'supportInfoInverse', 'overlay', 'toggleOff', 'shadow', 'buttonPrimary', 'buttonSecondary', 'buttonTertiary', 'buttonDangerPrimary', 'buttonDangerSecondary', 'backgroundActive', 'layerActive', 'buttonDangerActive', 'buttonPrimaryActive', 'buttonSecondaryActive', 'buttonTertiaryActive', 'focusInset', 'focusInverse', 'backgroundHover', 'layerHover', 'fieldHover', 'backgroundInverseHover', 'linkPrimaryHover', 'buttonDangerHover', 'buttonPrimaryHover', 'buttonSecondaryHover', 'buttonTertiaryHover', 'backgroundSelected', 'backgroundSelectedHover', 'layerSelected', 'layerSelectedHover', 'layerSelectedInverse', 'borderSubtleSelected', 'borderDisabled', 'textDisabled', 'buttonDisabled', 'iconDisabled', 'textOnColorDisabled', 'iconOnColorDisabled', 'layerSelectedDisabled', 'skeletonBackground', 'skeletonElement', // Deprecated
'brand01', 'brand02', 'brand03', 'active01', 'hoverField', 'danger'];
var tokens = {
  colors: colors,
  type: type.unstable_tokens,
  layout: layout.unstable_tokens
};

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var themes$1 = {
  white: white,
  g10: g10,
  g90: g90,
  g100: g100
};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  white: white,
  g10: g10,
  g90: g90,
  g100: g100,
  themes: themes$1,
  tokens: tokens,
  caption01: type.caption01,
  caption02: type.caption02,
  label01: type.label01,
  label02: type.label02,
  helperText01: type.helperText01,
  helperText02: type.helperText02,
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
  legal01: type.legal01,
  legal02: type.legal02,
  bodyCompact01: type.bodyCompact01,
  bodyCompact02: type.bodyCompact02,
  body01: type.body01,
  body02: type.body02,
  headingCompact01: type.headingCompact01,
  headingCompact02: type.headingCompact02,
  heading03: type.heading03,
  heading04: type.heading04,
  heading05: type.heading05,
  heading06: type.heading06,
  heading07: type.heading07,
  fluidHeading03: type.fluidHeading03,
  fluidHeading04: type.fluidHeading04,
  fluidHeading05: type.fluidHeading05,
  fluidHeading06: type.fluidHeading06,
  fluidParagraph01: type.fluidParagraph01,
  fluidQuotation01: type.fluidQuotation01,
  fluidQuotation02: type.fluidQuotation02,
  fluidDisplay01: type.fluidDisplay01,
  fluidDisplay02: type.fluidDisplay02,
  fluidDisplay03: type.fluidDisplay03,
  fluidDisplay04: type.fluidDisplay04,
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
  spacing13: layout.spacing13,
  fluidSpacing01: layout.fluidSpacing01,
  fluidSpacing02: layout.fluidSpacing02,
  fluidSpacing03: layout.fluidSpacing03,
  fluidSpacing04: layout.fluidSpacing04,
  container01: layout.container01,
  container02: layout.container02,
  container03: layout.container03,
  container04: layout.container04,
  container05: layout.container05,
  sizeXSmall: layout.sizeXSmall,
  sizeSmall: layout.sizeSmall,
  sizeMedium: layout.sizeMedium,
  sizeLarge: layout.sizeLarge,
  sizeXLarge: layout.sizeXLarge,
  size2XLarge: layout.size2XLarge,
  iconSize01: layout.iconSize01,
  iconSize02: layout.iconSize02,
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
  background: background$3,
  layer: layer$3,
  layerAccent: layerAccent$3,
  layerAccentActive: layerAccentActive$3,
  layerAccentHover: layerAccentHover$3,
  field: field$3,
  backgroundInverse: backgroundInverse$3,
  backgroundBrand: backgroundBrand$3,
  interactive: interactive$3,
  borderSubtle: borderSubtle$3,
  borderStrong: borderStrong$3,
  borderInverse: borderInverse$3,
  borderInteractive: borderInteractive$3,
  textPrimary: textPrimary$3,
  textSecondary: textSecondary$3,
  textPlaceholder: textPlaceholder$3,
  textHelper: textHelper$3,
  textOnColor: textOnColor$3,
  textInverse: textInverse$3,
  linkPrimary: linkPrimary$3,
  linkSecondary: linkSecondary$3,
  linkVisited: linkVisited$3,
  linkInverse: linkInverse$3,
  iconPrimary: iconPrimary$3,
  iconSecondary: iconSecondary$3,
  iconOnColor: iconOnColor$3,
  iconInverse: iconInverse$3,
  supportError: supportError$3,
  supportSuccess: supportSuccess$3,
  supportWarning: supportWarning$3,
  supportInfo: supportInfo$3,
  supportErrorInverse: supportErrorInverse$3,
  supportSuccessInverse: supportSuccessInverse$3,
  supportWarningInverse: supportWarningInverse$3,
  supportInfoInverse: supportInfoInverse$3,
  overlay: overlay$3,
  toggleOff: toggleOff$3,
  shadow: shadow$3,
  buttonPrimary: buttonPrimary$3,
  buttonSecondary: buttonSecondary$3,
  buttonTertiary: buttonTertiary$3,
  buttonDangerPrimary: buttonDangerPrimary$3,
  buttonDangerSecondary: buttonDangerSecondary$3,
  backgroundActive: backgroundActive$3,
  layerActive: layerActive$3,
  buttonDangerActive: buttonDangerActive$3,
  buttonPrimaryActive: buttonPrimaryActive$3,
  buttonSecondaryActive: buttonSecondaryActive$3,
  buttonTertiaryActive: buttonTertiaryActive$3,
  focusInset: focusInset$3,
  focusInverse: focusInverse$3,
  backgroundHover: backgroundHover$3,
  layerHover: layerHover$3,
  fieldHover: fieldHover$3,
  backgroundInverseHover: backgroundInverseHover$3,
  linkPrimaryHover: linkPrimaryHover$3,
  buttonDangerHover: buttonDangerHover$3,
  buttonPrimaryHover: buttonPrimaryHover$3,
  buttonSecondaryHover: buttonSecondaryHover$3,
  buttonTertiaryHover: buttonTertiaryHover$3,
  backgroundSelected: backgroundSelected$3,
  backgroundSelectedHover: backgroundSelectedHover$3,
  layerSelected: layerSelected$3,
  layerSelectedHover: layerSelectedHover$3,
  layerSelectedInverse: layerSelectedInverse$3,
  borderSubtleSelected: borderSubtleSelected$3,
  borderDisabled: borderDisabled$3,
  textDisabled: textDisabled$3,
  buttonDisabled: buttonDisabled$3,
  iconDisabled: iconDisabled$3,
  textOnColorDisabled: textOnColorDisabled$3,
  iconOnColorDisabled: iconOnColorDisabled$3,
  layerSelectedDisabled: layerSelectedDisabled$3,
  skeletonBackground: skeletonBackground$3,
  skeletonElement: skeletonElement$3,
  brand01: brand01$3,
  brand02: brand02$3,
  brand03: brand03$3,
  active01: active01$3,
  hoverField: hoverField$3,
  danger: danger$3
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var themes = {
  white: white$1,
  g10: g10$1,
  g90: g90$1,
  g100: g100$1
};

Object.defineProperty(exports, 'bodyLong01', {
  enumerable: true,
  get: function () { return type.bodyLong01; }
});
Object.defineProperty(exports, 'bodyLong02', {
  enumerable: true,
  get: function () { return type.bodyLong02; }
});
Object.defineProperty(exports, 'bodyShort01', {
  enumerable: true,
  get: function () { return type.bodyShort01; }
});
Object.defineProperty(exports, 'bodyShort02', {
  enumerable: true,
  get: function () { return type.bodyShort02; }
});
Object.defineProperty(exports, 'caption01', {
  enumerable: true,
  get: function () { return type.caption01; }
});
Object.defineProperty(exports, 'caption02', {
  enumerable: true,
  get: function () { return type.caption02; }
});
Object.defineProperty(exports, 'code01', {
  enumerable: true,
  get: function () { return type.code01; }
});
Object.defineProperty(exports, 'code02', {
  enumerable: true,
  get: function () { return type.code02; }
});
Object.defineProperty(exports, 'display01', {
  enumerable: true,
  get: function () { return type.display01; }
});
Object.defineProperty(exports, 'display02', {
  enumerable: true,
  get: function () { return type.display02; }
});
Object.defineProperty(exports, 'display03', {
  enumerable: true,
  get: function () { return type.display03; }
});
Object.defineProperty(exports, 'display04', {
  enumerable: true,
  get: function () { return type.display04; }
});
Object.defineProperty(exports, 'expressiveHeading01', {
  enumerable: true,
  get: function () { return type.expressiveHeading01; }
});
Object.defineProperty(exports, 'expressiveHeading02', {
  enumerable: true,
  get: function () { return type.expressiveHeading02; }
});
Object.defineProperty(exports, 'expressiveHeading03', {
  enumerable: true,
  get: function () { return type.expressiveHeading03; }
});
Object.defineProperty(exports, 'expressiveHeading04', {
  enumerable: true,
  get: function () { return type.expressiveHeading04; }
});
Object.defineProperty(exports, 'expressiveHeading05', {
  enumerable: true,
  get: function () { return type.expressiveHeading05; }
});
Object.defineProperty(exports, 'expressiveHeading06', {
  enumerable: true,
  get: function () { return type.expressiveHeading06; }
});
Object.defineProperty(exports, 'expressiveParagraph01', {
  enumerable: true,
  get: function () { return type.expressiveParagraph01; }
});
Object.defineProperty(exports, 'heading01', {
  enumerable: true,
  get: function () { return type.heading01; }
});
Object.defineProperty(exports, 'heading02', {
  enumerable: true,
  get: function () { return type.heading02; }
});
Object.defineProperty(exports, 'helperText01', {
  enumerable: true,
  get: function () { return type.helperText01; }
});
Object.defineProperty(exports, 'helperText02', {
  enumerable: true,
  get: function () { return type.helperText02; }
});
Object.defineProperty(exports, 'label01', {
  enumerable: true,
  get: function () { return type.label01; }
});
Object.defineProperty(exports, 'label02', {
  enumerable: true,
  get: function () { return type.label02; }
});
Object.defineProperty(exports, 'productiveHeading01', {
  enumerable: true,
  get: function () { return type.productiveHeading01; }
});
Object.defineProperty(exports, 'productiveHeading02', {
  enumerable: true,
  get: function () { return type.productiveHeading02; }
});
Object.defineProperty(exports, 'productiveHeading03', {
  enumerable: true,
  get: function () { return type.productiveHeading03; }
});
Object.defineProperty(exports, 'productiveHeading04', {
  enumerable: true,
  get: function () { return type.productiveHeading04; }
});
Object.defineProperty(exports, 'productiveHeading05', {
  enumerable: true,
  get: function () { return type.productiveHeading05; }
});
Object.defineProperty(exports, 'productiveHeading06', {
  enumerable: true,
  get: function () { return type.productiveHeading06; }
});
Object.defineProperty(exports, 'productiveHeading07', {
  enumerable: true,
  get: function () { return type.productiveHeading07; }
});
Object.defineProperty(exports, 'quotation01', {
  enumerable: true,
  get: function () { return type.quotation01; }
});
Object.defineProperty(exports, 'quotation02', {
  enumerable: true,
  get: function () { return type.quotation02; }
});
Object.defineProperty(exports, 'container01', {
  enumerable: true,
  get: function () { return layout.container01; }
});
Object.defineProperty(exports, 'container02', {
  enumerable: true,
  get: function () { return layout.container02; }
});
Object.defineProperty(exports, 'container03', {
  enumerable: true,
  get: function () { return layout.container03; }
});
Object.defineProperty(exports, 'container04', {
  enumerable: true,
  get: function () { return layout.container04; }
});
Object.defineProperty(exports, 'container05', {
  enumerable: true,
  get: function () { return layout.container05; }
});
Object.defineProperty(exports, 'fluidSpacing01', {
  enumerable: true,
  get: function () { return layout.fluidSpacing01; }
});
Object.defineProperty(exports, 'fluidSpacing02', {
  enumerable: true,
  get: function () { return layout.fluidSpacing02; }
});
Object.defineProperty(exports, 'fluidSpacing03', {
  enumerable: true,
  get: function () { return layout.fluidSpacing03; }
});
Object.defineProperty(exports, 'fluidSpacing04', {
  enumerable: true,
  get: function () { return layout.fluidSpacing04; }
});
Object.defineProperty(exports, 'iconSize01', {
  enumerable: true,
  get: function () { return layout.iconSize01; }
});
Object.defineProperty(exports, 'iconSize02', {
  enumerable: true,
  get: function () { return layout.iconSize02; }
});
Object.defineProperty(exports, 'size2XLarge', {
  enumerable: true,
  get: function () { return layout.size2XLarge; }
});
Object.defineProperty(exports, 'sizeLarge', {
  enumerable: true,
  get: function () { return layout.sizeLarge; }
});
Object.defineProperty(exports, 'sizeMedium', {
  enumerable: true,
  get: function () { return layout.sizeMedium; }
});
Object.defineProperty(exports, 'sizeSmall', {
  enumerable: true,
  get: function () { return layout.sizeSmall; }
});
Object.defineProperty(exports, 'sizeXLarge', {
  enumerable: true,
  get: function () { return layout.sizeXLarge; }
});
Object.defineProperty(exports, 'sizeXSmall', {
  enumerable: true,
  get: function () { return layout.sizeXSmall; }
});
Object.defineProperty(exports, 'spacing01', {
  enumerable: true,
  get: function () { return layout.spacing01; }
});
Object.defineProperty(exports, 'spacing02', {
  enumerable: true,
  get: function () { return layout.spacing02; }
});
Object.defineProperty(exports, 'spacing03', {
  enumerable: true,
  get: function () { return layout.spacing03; }
});
Object.defineProperty(exports, 'spacing04', {
  enumerable: true,
  get: function () { return layout.spacing04; }
});
Object.defineProperty(exports, 'spacing05', {
  enumerable: true,
  get: function () { return layout.spacing05; }
});
Object.defineProperty(exports, 'spacing06', {
  enumerable: true,
  get: function () { return layout.spacing06; }
});
Object.defineProperty(exports, 'spacing07', {
  enumerable: true,
  get: function () { return layout.spacing07; }
});
Object.defineProperty(exports, 'spacing08', {
  enumerable: true,
  get: function () { return layout.spacing08; }
});
Object.defineProperty(exports, 'spacing09', {
  enumerable: true,
  get: function () { return layout.spacing09; }
});
Object.defineProperty(exports, 'spacing10', {
  enumerable: true,
  get: function () { return layout.spacing10; }
});
Object.defineProperty(exports, 'spacing11', {
  enumerable: true,
  get: function () { return layout.spacing11; }
});
Object.defineProperty(exports, 'spacing12', {
  enumerable: true,
  get: function () { return layout.spacing12; }
});
Object.defineProperty(exports, 'spacing13', {
  enumerable: true,
  get: function () { return layout.spacing13; }
});
exports.background = background$7;
exports.backgroundActive = backgroundActive$7;
exports.backgroundBrand = backgroundBrand$7;
exports.backgroundHover = backgroundHover$7;
exports.backgroundInverse = backgroundInverse$7;
exports.backgroundInverseHover = backgroundInverseHover$7;
exports.backgroundSelected = backgroundSelected$7;
exports.backgroundSelectedHover = backgroundSelectedHover$7;
exports.borderDisabled = borderDisabled$7;
exports.borderInteractive = borderInteractive$7;
exports.borderInverse = borderInverse$7;
exports.borderStrong01 = borderStrong01$3;
exports.borderStrong02 = borderStrong02$3;
exports.borderStrong03 = borderStrong03$3;
exports.borderSubtle00 = borderSubtle00$3;
exports.borderSubtle01 = borderSubtle01$3;
exports.borderSubtle02 = borderSubtle02$3;
exports.borderSubtle03 = borderSubtle03$3;
exports.borderSubtleSelected01 = borderSubtleSelected01$3;
exports.borderSubtleSelected02 = borderSubtleSelected02$3;
exports.borderSubtleSelected03 = borderSubtleSelected03$3;
exports.field01 = field01$7;
exports.field02 = field02$7;
exports.field03 = field03$3;
exports.fieldHover01 = fieldHover01$3;
exports.fieldHover02 = fieldHover02$3;
exports.fieldHover03 = fieldHover03$3;
exports.focus = focus$7;
exports.focusInset = focusInset$7;
exports.focusInverse = focusInverse$7;
exports.g10 = g10$1;
exports.g100 = g100$1;
exports.g90 = g90$1;
exports.highlight = highlight$7;
exports.iconDisabled = iconDisabled$7;
exports.iconInverse = iconInverse$7;
exports.iconOnColor = iconOnColor$7;
exports.iconOnColorDisabled = iconOnColorDisabled$7;
exports.iconPrimary = iconPrimary$7;
exports.iconSecondary = iconSecondary$7;
exports.interactive = interactive$7;
exports.layer01 = layer01$3;
exports.layer02 = layer02$3;
exports.layer03 = layer03$3;
exports.layerAccent01 = layerAccent01$3;
exports.layerAccent02 = layerAccent02$3;
exports.layerAccent03 = layerAccent03$3;
exports.layerAccentActive01 = layerAccentActive01$3;
exports.layerAccentActive02 = layerAccentActive02$3;
exports.layerAccentActive03 = layerAccentActive03$3;
exports.layerAccentHover01 = layerAccentHover01$3;
exports.layerAccentHover02 = layerAccentHover02$3;
exports.layerAccentHover03 = layerAccentHover03$3;
exports.layerActive01 = layerActive01$3;
exports.layerActive02 = layerActive02$3;
exports.layerActive03 = layerActive03$3;
exports.layerHover01 = layerHover01$3;
exports.layerHover02 = layerHover02$3;
exports.layerHover03 = layerHover03$3;
exports.layerSelected01 = layerSelected01$3;
exports.layerSelected02 = layerSelected02$3;
exports.layerSelected03 = layerSelected03$3;
exports.layerSelectedDisabled = layerSelectedDisabled$7;
exports.layerSelectedHover01 = layerSelectedHover01$3;
exports.layerSelectedHover02 = layerSelectedHover02$3;
exports.layerSelectedHover03 = layerSelectedHover03$3;
exports.layerSelectedInverse = layerSelectedInverse$7;
exports.linkInverse = linkInverse$7;
exports.linkInverseActive = linkInverseActive$3;
exports.linkInverseHover = linkInverseHover$3;
exports.linkPrimary = linkPrimary$7;
exports.linkPrimaryHover = linkPrimaryHover$7;
exports.linkSecondary = linkSecondary$7;
exports.linkVisited = linkVisited$7;
exports.overlay = overlay$7;
exports.shadow = shadow$7;
exports.skeletonBackground = skeletonBackground$7;
exports.skeletonElement = skeletonElement$7;
exports.supportCautionMajor = supportCautionMajor$3;
exports.supportCautionMinor = supportCautionMinor$3;
exports.supportCautionUndefined = supportCautionUndefined$3;
exports.supportError = supportError$7;
exports.supportErrorInverse = supportErrorInverse$7;
exports.supportInfo = supportInfo$7;
exports.supportInfoInverse = supportInfoInverse$7;
exports.supportSuccess = supportSuccess$7;
exports.supportSuccessInverse = supportSuccessInverse$7;
exports.supportWarning = supportWarning$7;
exports.supportWarningInverse = supportWarningInverse$7;
exports.textDisabled = textDisabled$7;
exports.textError = textError$7;
exports.textHelper = textHelper$7;
exports.textInverse = textInverse$7;
exports.textOnColor = textOnColor$7;
exports.textOnColorDisabled = textOnColorDisabled$7;
exports.textPlaceholder = textPlaceholder$7;
exports.textPrimary = textPrimary$7;
exports.textSecondary = textSecondary$7;
exports.themes = themes;
exports.toggleOff = toggleOff$7;
exports.v10 = index;
exports.white = white$1;
