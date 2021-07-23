import Color from 'color';
import { blue60, gray80, white as white$1, gray10, gray20, gray50, gray100, gray70, gray40, gray60, red60, blue70, blue40, green60, yellow, red50, green40, blue50, rgba, blue80, gray30, red80, purple60, blue20, gray90, red40, blue30, green50, purple40, red30, yellow30 } from '@carbon/colors';
import { caption01, caption02, label01, label02, helperText01, helperText02, bodyShort01, bodyLong01, bodyShort02, bodyLong02, code01, code02, heading01, productiveHeading01, heading02, productiveHeading02, productiveHeading03, productiveHeading04, productiveHeading05, productiveHeading06, productiveHeading07, expressiveHeading01, expressiveHeading02, expressiveHeading03, expressiveHeading04, expressiveHeading05, expressiveHeading06, expressiveParagraph01, quotation01, quotation02, display01, display02, display03, display04, unstable_tokens } from '@carbon/type';
export { bodyLong01, bodyLong02, bodyShort01, bodyShort02, caption01, caption02, code01, code02, display01, display02, display03, display04, expressiveHeading01, expressiveHeading02, expressiveHeading03, expressiveHeading04, expressiveHeading05, expressiveHeading06, expressiveParagraph01, heading01, heading02, helperText01, helperText02, label01, label02, productiveHeading01, productiveHeading02, productiveHeading03, productiveHeading04, productiveHeading05, productiveHeading06, productiveHeading07, quotation01, quotation02 } from '@carbon/type';
import { spacing01, spacing02, spacing03, spacing04, spacing05, spacing06, spacing07, spacing08, spacing09, spacing10, spacing11, spacing12, spacing13, fluidSpacing01, fluidSpacing02, fluidSpacing03, fluidSpacing04, layout01, layout02, layout03, layout04, layout05, layout06, layout07, container01, container02, container03, container04, container05, sizeXSmall, sizeSmall, sizeMedium, sizeLarge, sizeXLarge, size2XLarge, iconSize01, iconSize02, unstable_tokens as unstable_tokens$1 } from '@carbon/layout';
export { container01, container02, container03, container04, container05, fluidSpacing01, fluidSpacing02, fluidSpacing03, fluidSpacing04, iconSize01, iconSize02, layout01, layout02, layout03, layout04, layout05, layout06, layout07, size2XLarge, sizeLarge, sizeMedium, sizeSmall, sizeXLarge, sizeXSmall, spacing01, spacing02, spacing03, spacing04, spacing05, spacing06, spacing07, spacing08, spacing09, spacing10, spacing11, spacing12, spacing13 } from '@carbon/layout';

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);

    if (enumerableOnly) {
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }

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
  var original = Color(token).hsl().object();
  return Color(_objectSpread2(_objectSpread2({}, original), {}, {
    l: original.l += shift
  })).round().hex().toLowerCase();
}

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01$5 = blue60;
var interactive02$5 = gray80;
var interactive03$5 = blue60;
var interactive04$5 = blue60;
var uiBackground$5 = white$1;
var ui01$5 = gray10;
var ui02$5 = white$1;
var ui03$5 = gray20;
var ui04$5 = gray50;
var ui05$5 = gray100;
var text01$5 = gray100;
var text02$5 = gray70;
var text03$5 = gray40;
var text04$5 = white$1;
var text05$5 = gray60;
var textError$5 = red60;
var icon01$5 = gray100;
var icon02$5 = gray70;
var icon03$5 = white$1;
var link01$5 = blue60;
var link02$5 = blue70;
var inverseLink$5 = blue40;
var field01$5 = gray10;
var field02$5 = white$1;
var inverse01$5 = white$1;
var inverse02$5 = gray80;
var support01$5 = red60;
var support02$5 = green60;
var support03$5 = yellow;
var support04$5 = blue70;
var inverseSupport01$5 = red50;
var inverseSupport02$5 = green40;
var inverseSupport03$5 = yellow;
var inverseSupport04$5 = blue50;
var overlay01$5 = rgba(gray100, 0.5);
var danger01$5 = red60;
var danger02$5 = red60; // Interaction states

var focus$5 = blue60;
var inverseFocusUi$5 = white$1;
var hoverPrimary$5 = '#0353e9';
var activePrimary$5 = blue80;
var hoverPrimaryText$5 = blue70;
var hoverSecondary$5 = '#4c4c4c';
var activeSecondary$5 = gray60;
var hoverTertiary$5 = '#0353e9';
var activeTertiary$5 = blue80;
var hoverUI$5 = '#e5e5e5';
var hoverLightUI$5 = '#e5e5e5';
var activeUI$5 = gray30;
var activeLightUI$5 = gray30;
var selectedUI$5 = gray20;
var selectedLightUI$5 = gray20;
var inverseHoverUI$5 = '#4c4c4c';
var hoverSelectedUI$5 = '#cacaca';
var hoverDanger$5 = adjustLightness(danger01$5, -8);
var activeDanger$5 = red80;
var hoverRow$5 = '#e5e5e5';
var visitedLink$5 = purple60;
var disabled01$5 = gray10;
var disabled02$5 = gray30;
var disabled03$5 = gray50;
var highlight$5 = blue20;
var decorative01$5 = gray20;
var buttonSeparator$5 = '#e0e0e0';
var skeleton01$5 = '#e5e5e5';
var skeleton02$5 = gray30; // New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens

var background$5 = uiBackground$5;
var layer$5 = ui01$5;
var layerAccent$5 = ui03$5;
var layerAccentActive$5 = gray40;
var layerAccentHover$5 = adjustLightness(layerAccent$5, -6);
var field$5 = field01$5;
var backgroundInverse$5 = inverse02$5;
var backgroundBrand$5 = interactive01$5;
var interactive$5 = interactive04$5;
var borderSubtle$5 = ui03$5;
var borderStrong$5 = ui04$5;
var borderInverse$5 = ui05$5;
var borderInteractive$5 = interactive04$5;
var textPrimary$5 = text01$5;
var textSecondary$5 = text02$5;
var textPlaceholder$5 = text03$5;
var textHelper$5 = text05$5;
var textOnColor$5 = text04$5;
var textInverse$5 = inverse01$5;
var linkPrimary$5 = link01$5;
var linkSecondary$5 = link02$5;
var linkVisited$5 = visitedLink$5;
var linkInverse$5 = inverseLink$5;
var iconPrimary$5 = icon01$5;
var iconSecondary$5 = icon02$5;
var iconOnColor$5 = icon03$5;
var iconInverse$5 = inverse01$5;
var supportError$5 = support01$5;
var supportSuccess$5 = support02$5;
var supportWarning$5 = support03$5;
var supportInfo$5 = support04$5;
var supportErrorInverse$5 = inverseSupport01$5;
var supportSuccessInverse$5 = inverseSupport02$5;
var supportWarningInverse$5 = inverseSupport03$5;
var supportInfoInverse$5 = inverseSupport04$5;
var overlay$5 = overlay01$5;
var toggleOff$5 = ui04$5;
var buttonPrimary$5 = interactive01$5;
var buttonSecondary$5 = interactive02$5;
var buttonTertiary$5 = interactive03$5;
var buttonDangerPrimary$5 = danger01$5;
var buttonDangerSecondary$5 = danger02$5;
var backgroundActive$5 = activeUI$5;
var layerActive$5 = activeUI$5;
var buttonDangerActive$5 = activeDanger$5;
var buttonPrimaryActive$5 = activePrimary$5;
var buttonSecondaryActive$5 = activeSecondary$5;
var buttonTertiaryActive$5 = activeTertiary$5;
var focusInset$5 = inverse01$5;
var focusInverse$5 = inverseFocusUi$5;
var backgroundHover$5 = hoverUI$5;
var layerHover$5 = hoverUI$5;
var fieldHover$5 = hoverUI$5;
var backgroundInverseHover$5 = inverseHoverUI$5;
var linkPrimaryHover$5 = hoverPrimaryText$5;
var buttonDangerHover$5 = hoverDanger$5;
var buttonPrimaryHover$5 = hoverPrimary$5;
var buttonSecondaryHover$5 = hoverSecondary$5;
var buttonTertiaryHover$5 = hoverTertiary$5;
var backgroundSelected$5 = selectedUI$5;
var backgroundSelectedHover$5 = hoverSelectedUI$5;
var layerSelected$5 = selectedUI$5;
var layerSelectedHover$5 = hoverSelectedUI$5;
var layerSelectedInverse$5 = ui05$5;
var borderSubtleSelected$5 = activeUI$5;
var layerDisabled$5 = disabled01$5;
var fieldDisabled$5 = disabled01$5;
var borderDisabled$5 = disabled01$5;
var textDisabled$5 = disabled02$5;
var buttonDisabled$5 = disabled02$5;
var iconDisabled$5 = disabled02$5;
var textOnColorDisabled$5 = disabled03$5;
var iconOnColorDisabled$5 = disabled03$5;
var layerSelectedDisabled$5 = disabled03$5;
var skeletonBackground$5 = skeleton01$5;
var skeletonElement$5 = skeleton02$5; // Type

var brand01$5 = interactive01$5;
var brand02$5 = interactive02$5;
var brand03$5 = interactive03$5;
var active01$5 = activeUI$5;
var hoverField$5 = hoverUI$5;
var danger$5 = danger01$5;

var white = /*#__PURE__*/Object.freeze({
  __proto__: null,
  interactive01: interactive01$5,
  interactive02: interactive02$5,
  interactive03: interactive03$5,
  interactive04: interactive04$5,
  uiBackground: uiBackground$5,
  ui01: ui01$5,
  ui02: ui02$5,
  ui03: ui03$5,
  ui04: ui04$5,
  ui05: ui05$5,
  text01: text01$5,
  text02: text02$5,
  text03: text03$5,
  text04: text04$5,
  text05: text05$5,
  textError: textError$5,
  icon01: icon01$5,
  icon02: icon02$5,
  icon03: icon03$5,
  link01: link01$5,
  link02: link02$5,
  inverseLink: inverseLink$5,
  field01: field01$5,
  field02: field02$5,
  inverse01: inverse01$5,
  inverse02: inverse02$5,
  support01: support01$5,
  support02: support02$5,
  support03: support03$5,
  support04: support04$5,
  inverseSupport01: inverseSupport01$5,
  inverseSupport02: inverseSupport02$5,
  inverseSupport03: inverseSupport03$5,
  inverseSupport04: inverseSupport04$5,
  overlay01: overlay01$5,
  danger01: danger01$5,
  danger02: danger02$5,
  focus: focus$5,
  inverseFocusUi: inverseFocusUi$5,
  hoverPrimary: hoverPrimary$5,
  activePrimary: activePrimary$5,
  hoverPrimaryText: hoverPrimaryText$5,
  hoverSecondary: hoverSecondary$5,
  activeSecondary: activeSecondary$5,
  hoverTertiary: hoverTertiary$5,
  activeTertiary: activeTertiary$5,
  hoverUI: hoverUI$5,
  hoverLightUI: hoverLightUI$5,
  activeUI: activeUI$5,
  activeLightUI: activeLightUI$5,
  selectedUI: selectedUI$5,
  selectedLightUI: selectedLightUI$5,
  inverseHoverUI: inverseHoverUI$5,
  hoverSelectedUI: hoverSelectedUI$5,
  hoverDanger: hoverDanger$5,
  activeDanger: activeDanger$5,
  hoverRow: hoverRow$5,
  visitedLink: visitedLink$5,
  disabled01: disabled01$5,
  disabled02: disabled02$5,
  disabled03: disabled03$5,
  highlight: highlight$5,
  decorative01: decorative01$5,
  buttonSeparator: buttonSeparator$5,
  skeleton01: skeleton01$5,
  skeleton02: skeleton02$5,
  background: background$5,
  layer: layer$5,
  layerAccent: layerAccent$5,
  layerAccentActive: layerAccentActive$5,
  layerAccentHover: layerAccentHover$5,
  field: field$5,
  backgroundInverse: backgroundInverse$5,
  backgroundBrand: backgroundBrand$5,
  interactive: interactive$5,
  borderSubtle: borderSubtle$5,
  borderStrong: borderStrong$5,
  borderInverse: borderInverse$5,
  borderInteractive: borderInteractive$5,
  textPrimary: textPrimary$5,
  textSecondary: textSecondary$5,
  textPlaceholder: textPlaceholder$5,
  textHelper: textHelper$5,
  textOnColor: textOnColor$5,
  textInverse: textInverse$5,
  linkPrimary: linkPrimary$5,
  linkSecondary: linkSecondary$5,
  linkVisited: linkVisited$5,
  linkInverse: linkInverse$5,
  iconPrimary: iconPrimary$5,
  iconSecondary: iconSecondary$5,
  iconOnColor: iconOnColor$5,
  iconInverse: iconInverse$5,
  supportError: supportError$5,
  supportSuccess: supportSuccess$5,
  supportWarning: supportWarning$5,
  supportInfo: supportInfo$5,
  supportErrorInverse: supportErrorInverse$5,
  supportSuccessInverse: supportSuccessInverse$5,
  supportWarningInverse: supportWarningInverse$5,
  supportInfoInverse: supportInfoInverse$5,
  overlay: overlay$5,
  toggleOff: toggleOff$5,
  buttonPrimary: buttonPrimary$5,
  buttonSecondary: buttonSecondary$5,
  buttonTertiary: buttonTertiary$5,
  buttonDangerPrimary: buttonDangerPrimary$5,
  buttonDangerSecondary: buttonDangerSecondary$5,
  backgroundActive: backgroundActive$5,
  layerActive: layerActive$5,
  buttonDangerActive: buttonDangerActive$5,
  buttonPrimaryActive: buttonPrimaryActive$5,
  buttonSecondaryActive: buttonSecondaryActive$5,
  buttonTertiaryActive: buttonTertiaryActive$5,
  focusInset: focusInset$5,
  focusInverse: focusInverse$5,
  backgroundHover: backgroundHover$5,
  layerHover: layerHover$5,
  fieldHover: fieldHover$5,
  backgroundInverseHover: backgroundInverseHover$5,
  linkPrimaryHover: linkPrimaryHover$5,
  buttonDangerHover: buttonDangerHover$5,
  buttonPrimaryHover: buttonPrimaryHover$5,
  buttonSecondaryHover: buttonSecondaryHover$5,
  buttonTertiaryHover: buttonTertiaryHover$5,
  backgroundSelected: backgroundSelected$5,
  backgroundSelectedHover: backgroundSelectedHover$5,
  layerSelected: layerSelected$5,
  layerSelectedHover: layerSelectedHover$5,
  layerSelectedInverse: layerSelectedInverse$5,
  borderSubtleSelected: borderSubtleSelected$5,
  layerDisabled: layerDisabled$5,
  fieldDisabled: fieldDisabled$5,
  borderDisabled: borderDisabled$5,
  textDisabled: textDisabled$5,
  buttonDisabled: buttonDisabled$5,
  iconDisabled: iconDisabled$5,
  textOnColorDisabled: textOnColorDisabled$5,
  iconOnColorDisabled: iconOnColorDisabled$5,
  layerSelectedDisabled: layerSelectedDisabled$5,
  skeletonBackground: skeletonBackground$5,
  skeletonElement: skeletonElement$5,
  brand01: brand01$5,
  brand02: brand02$5,
  brand03: brand03$5,
  active01: active01$5,
  hoverField: hoverField$5,
  danger: danger$5,
  caption01: caption01,
  caption02: caption02,
  label01: label01,
  label02: label02,
  helperText01: helperText01,
  helperText02: helperText02,
  bodyShort01: bodyShort01,
  bodyLong01: bodyLong01,
  bodyShort02: bodyShort02,
  bodyLong02: bodyLong02,
  code01: code01,
  code02: code02,
  heading01: heading01,
  productiveHeading01: productiveHeading01,
  heading02: heading02,
  productiveHeading02: productiveHeading02,
  productiveHeading03: productiveHeading03,
  productiveHeading04: productiveHeading04,
  productiveHeading05: productiveHeading05,
  productiveHeading06: productiveHeading06,
  productiveHeading07: productiveHeading07,
  expressiveHeading01: expressiveHeading01,
  expressiveHeading02: expressiveHeading02,
  expressiveHeading03: expressiveHeading03,
  expressiveHeading04: expressiveHeading04,
  expressiveHeading05: expressiveHeading05,
  expressiveHeading06: expressiveHeading06,
  expressiveParagraph01: expressiveParagraph01,
  quotation01: quotation01,
  quotation02: quotation02,
  display01: display01,
  display02: display02,
  display03: display03,
  display04: display04,
  spacing01: spacing01,
  spacing02: spacing02,
  spacing03: spacing03,
  spacing04: spacing04,
  spacing05: spacing05,
  spacing06: spacing06,
  spacing07: spacing07,
  spacing08: spacing08,
  spacing09: spacing09,
  spacing10: spacing10,
  spacing11: spacing11,
  spacing12: spacing12,
  spacing13: spacing13,
  fluidSpacing01: fluidSpacing01,
  fluidSpacing02: fluidSpacing02,
  fluidSpacing03: fluidSpacing03,
  fluidSpacing04: fluidSpacing04,
  layout01: layout01,
  layout02: layout02,
  layout03: layout03,
  layout04: layout04,
  layout05: layout05,
  layout06: layout06,
  layout07: layout07,
  container01: container01,
  container02: container02,
  container03: container03,
  container04: container04,
  container05: container05,
  sizeXSmall: sizeXSmall,
  sizeSmall: sizeSmall,
  sizeMedium: sizeMedium,
  sizeLarge: sizeLarge,
  sizeXLarge: sizeXLarge,
  size2XLarge: size2XLarge,
  iconSize01: iconSize01,
  iconSize02: iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01$4 = blue60;
var interactive02$4 = gray80;
var interactive03$4 = blue60;
var interactive04$4 = blue60;
var uiBackground$4 = gray10;
var ui01$4 = white$1;
var ui02$4 = gray10;
var ui03$4 = gray20;
var ui04$4 = gray50;
var ui05$4 = gray100;
var text01$4 = gray100;
var text02$4 = gray70;
var text03$4 = gray40;
var text04$4 = white$1;
var text05$4 = gray60;
var textError$4 = red60;
var icon01$4 = gray100;
var icon02$4 = gray70;
var icon03$4 = white$1;
var link01$4 = blue60;
var link02$4 = blue70;
var inverseLink$4 = blue40;
var field01$4 = white$1;
var field02$4 = gray10;
var inverse01$4 = white$1;
var inverse02$4 = gray80;
var support01$4 = red60;
var support02$4 = green60;
var support03$4 = yellow;
var support04$4 = blue70;
var inverseSupport01$4 = red50;
var inverseSupport02$4 = green40;
var inverseSupport03$4 = yellow;
var inverseSupport04$4 = blue50;
var overlay01$4 = rgba(gray100, 0.5);
var danger01$4 = red60;
var danger02$4 = red60; // Interaction states

var focus$4 = blue60;
var inverseFocusUi$4 = white$1;
var hoverPrimary$4 = '#0353e9';
var activePrimary$4 = blue80;
var hoverPrimaryText$4 = blue70;
var hoverSecondary$4 = '#4c4c4c';
var activeSecondary$4 = gray60;
var hoverTertiary$4 = '#0353e9';
var activeTertiary$4 = blue80;
var hoverUI$4 = '#e5e5e5';
var hoverLightUI$4 = '#e5e5e5';
var activeUI$4 = gray30;
var activeLightUI$4 = gray30;
var selectedUI$4 = gray20;
var selectedLightUI$4 = gray20;
var inverseHoverUI$4 = '#4c4c4c';
var hoverSelectedUI$4 = '#cacaca';
var hoverDanger$4 = adjustLightness(danger01$4, -8);
var activeDanger$4 = red80;
var hoverRow$4 = '#e5e5e5';
var visitedLink$4 = purple60;
var disabled01$4 = white$1;
var disabled02$4 = gray30;
var disabled03$4 = gray50;
var highlight$4 = blue20;
var decorative01$4 = gray20;
var buttonSeparator$4 = '#e0e0e0';
var skeleton01$4 = '#e5e5e5';
var skeleton02$4 = gray30; // New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens

var background$4 = uiBackground$4;
var layer$4 = ui01$4;
var layerAccent$4 = ui03$4;
var layerAccentActive$4 = gray40;
var layerAccentHover$4 = adjustLightness(layerAccent$4, -6);
var field$4 = field01$4;
var backgroundInverse$4 = inverse02$4;
var backgroundBrand$4 = interactive01$4;
var interactive$4 = interactive04$4;
var borderSubtle$4 = ui03$4;
var borderStrong$4 = ui04$4;
var borderInverse$4 = ui05$4;
var borderInteractive$4 = interactive04$4;
var textPrimary$4 = text01$4;
var textSecondary$4 = text02$4;
var textPlaceholder$4 = text03$4;
var textHelper$4 = text05$4;
var textOnColor$4 = text04$4;
var textInverse$4 = inverse01$4;
var linkPrimary$4 = link01$4;
var linkSecondary$4 = link02$4;
var linkVisited$4 = visitedLink$4;
var linkInverse$4 = inverseLink$4;
var iconPrimary$4 = icon01$4;
var iconSecondary$4 = icon02$4;
var iconOnColor$4 = icon03$4;
var iconInverse$4 = inverse01$4;
var supportError$4 = support01$4;
var supportSuccess$4 = support02$4;
var supportWarning$4 = support03$4;
var supportInfo$4 = support04$4;
var supportErrorInverse$4 = inverseSupport01$4;
var supportSuccessInverse$4 = inverseSupport02$4;
var supportWarningInverse$4 = inverseSupport03$4;
var supportInfoInverse$4 = inverseSupport04$4;
var overlay$4 = overlay01$4;
var toggleOff$4 = ui04$4;
var buttonPrimary$4 = interactive01$4;
var buttonSecondary$4 = interactive02$4;
var buttonTertiary$4 = interactive03$4;
var buttonDangerPrimary$4 = danger01$4;
var buttonDangerSecondary$4 = danger02$4;
var backgroundActive$4 = activeUI$4;
var layerActive$4 = activeUI$4;
var buttonDangerActive$4 = activeDanger$4;
var buttonPrimaryActive$4 = activePrimary$4;
var buttonSecondaryActive$4 = activeSecondary$4;
var buttonTertiaryActive$4 = activeTertiary$4;
var focusInset$4 = inverse01$4;
var focusInverse$4 = inverseFocusUi$4;
var backgroundHover$4 = hoverUI$4;
var layerHover$4 = hoverUI$4;
var fieldHover$4 = hoverUI$4;
var backgroundInverseHover$4 = inverseHoverUI$4;
var linkPrimaryHover$4 = hoverPrimaryText$4;
var buttonDangerHover$4 = hoverDanger$4;
var buttonPrimaryHover$4 = hoverPrimary$4;
var buttonSecondaryHover$4 = hoverSecondary$4;
var buttonTertiaryHover$4 = hoverTertiary$4;
var backgroundSelected$4 = selectedUI$4;
var backgroundSelectedHover$4 = hoverSelectedUI$4;
var layerSelected$4 = selectedUI$4;
var layerSelectedHover$4 = hoverSelectedUI$4;
var layerSelectedInverse$4 = ui05$4;
var borderSubtleSelected$4 = activeUI$4;
var layerDisabled$4 = disabled01$4;
var fieldDisabled$4 = disabled01$4;
var borderDisabled$4 = disabled01$4;
var textDisabled$4 = disabled02$4;
var buttonDisabled$4 = disabled02$4;
var iconDisabled$4 = disabled02$4;
var textOnColorDisabled$4 = disabled03$4;
var iconOnColorDisabled$4 = disabled03$4;
var layerSelectedDisabled$4 = disabled03$4;
var skeletonBackground$4 = skeleton01$4;
var skeletonElement$4 = skeleton02$4;

var brand01$4 = interactive01$4;
var brand02$4 = interactive02$4;
var brand03$4 = interactive03$4;
var active01$4 = activeUI$4;
var hoverField$4 = hoverUI$4;
var danger$4 = danger01$4;

var g10 = /*#__PURE__*/Object.freeze({
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
  background: background$4,
  layer: layer$4,
  layerAccent: layerAccent$4,
  layerAccentActive: layerAccentActive$4,
  layerAccentHover: layerAccentHover$4,
  field: field$4,
  backgroundInverse: backgroundInverse$4,
  backgroundBrand: backgroundBrand$4,
  interactive: interactive$4,
  borderSubtle: borderSubtle$4,
  borderStrong: borderStrong$4,
  borderInverse: borderInverse$4,
  borderInteractive: borderInteractive$4,
  textPrimary: textPrimary$4,
  textSecondary: textSecondary$4,
  textPlaceholder: textPlaceholder$4,
  textHelper: textHelper$4,
  textOnColor: textOnColor$4,
  textInverse: textInverse$4,
  linkPrimary: linkPrimary$4,
  linkSecondary: linkSecondary$4,
  linkVisited: linkVisited$4,
  linkInverse: linkInverse$4,
  iconPrimary: iconPrimary$4,
  iconSecondary: iconSecondary$4,
  iconOnColor: iconOnColor$4,
  iconInverse: iconInverse$4,
  supportError: supportError$4,
  supportSuccess: supportSuccess$4,
  supportWarning: supportWarning$4,
  supportInfo: supportInfo$4,
  supportErrorInverse: supportErrorInverse$4,
  supportSuccessInverse: supportSuccessInverse$4,
  supportWarningInverse: supportWarningInverse$4,
  supportInfoInverse: supportInfoInverse$4,
  overlay: overlay$4,
  toggleOff: toggleOff$4,
  buttonPrimary: buttonPrimary$4,
  buttonSecondary: buttonSecondary$4,
  buttonTertiary: buttonTertiary$4,
  buttonDangerPrimary: buttonDangerPrimary$4,
  buttonDangerSecondary: buttonDangerSecondary$4,
  backgroundActive: backgroundActive$4,
  layerActive: layerActive$4,
  buttonDangerActive: buttonDangerActive$4,
  buttonPrimaryActive: buttonPrimaryActive$4,
  buttonSecondaryActive: buttonSecondaryActive$4,
  buttonTertiaryActive: buttonTertiaryActive$4,
  focusInset: focusInset$4,
  focusInverse: focusInverse$4,
  backgroundHover: backgroundHover$4,
  layerHover: layerHover$4,
  fieldHover: fieldHover$4,
  backgroundInverseHover: backgroundInverseHover$4,
  linkPrimaryHover: linkPrimaryHover$4,
  buttonDangerHover: buttonDangerHover$4,
  buttonPrimaryHover: buttonPrimaryHover$4,
  buttonSecondaryHover: buttonSecondaryHover$4,
  buttonTertiaryHover: buttonTertiaryHover$4,
  backgroundSelected: backgroundSelected$4,
  backgroundSelectedHover: backgroundSelectedHover$4,
  layerSelected: layerSelected$4,
  layerSelectedHover: layerSelectedHover$4,
  layerSelectedInverse: layerSelectedInverse$4,
  borderSubtleSelected: borderSubtleSelected$4,
  layerDisabled: layerDisabled$4,
  fieldDisabled: fieldDisabled$4,
  borderDisabled: borderDisabled$4,
  textDisabled: textDisabled$4,
  buttonDisabled: buttonDisabled$4,
  iconDisabled: iconDisabled$4,
  textOnColorDisabled: textOnColorDisabled$4,
  iconOnColorDisabled: iconOnColorDisabled$4,
  layerSelectedDisabled: layerSelectedDisabled$4,
  skeletonBackground: skeletonBackground$4,
  skeletonElement: skeletonElement$4,
  brand01: brand01$4,
  brand02: brand02$4,
  brand03: brand03$4,
  active01: active01$4,
  hoverField: hoverField$4,
  danger: danger$4,
  caption01: caption01,
  caption02: caption02,
  label01: label01,
  label02: label02,
  helperText01: helperText01,
  helperText02: helperText02,
  bodyShort01: bodyShort01,
  bodyLong01: bodyLong01,
  bodyShort02: bodyShort02,
  bodyLong02: bodyLong02,
  code01: code01,
  code02: code02,
  heading01: heading01,
  productiveHeading01: productiveHeading01,
  heading02: heading02,
  productiveHeading02: productiveHeading02,
  productiveHeading03: productiveHeading03,
  productiveHeading04: productiveHeading04,
  productiveHeading05: productiveHeading05,
  productiveHeading06: productiveHeading06,
  productiveHeading07: productiveHeading07,
  expressiveHeading01: expressiveHeading01,
  expressiveHeading02: expressiveHeading02,
  expressiveHeading03: expressiveHeading03,
  expressiveHeading04: expressiveHeading04,
  expressiveHeading05: expressiveHeading05,
  expressiveHeading06: expressiveHeading06,
  expressiveParagraph01: expressiveParagraph01,
  quotation01: quotation01,
  quotation02: quotation02,
  display01: display01,
  display02: display02,
  display03: display03,
  display04: display04,
  spacing01: spacing01,
  spacing02: spacing02,
  spacing03: spacing03,
  spacing04: spacing04,
  spacing05: spacing05,
  spacing06: spacing06,
  spacing07: spacing07,
  spacing08: spacing08,
  spacing09: spacing09,
  spacing10: spacing10,
  spacing11: spacing11,
  spacing12: spacing12,
  spacing13: spacing13,
  fluidSpacing01: fluidSpacing01,
  fluidSpacing02: fluidSpacing02,
  fluidSpacing03: fluidSpacing03,
  fluidSpacing04: fluidSpacing04,
  layout01: layout01,
  layout02: layout02,
  layout03: layout03,
  layout04: layout04,
  layout05: layout05,
  layout06: layout06,
  layout07: layout07,
  container01: container01,
  container02: container02,
  container03: container03,
  container04: container04,
  container05: container05,
  sizeXSmall: sizeXSmall,
  sizeSmall: sizeSmall,
  sizeMedium: sizeMedium,
  sizeLarge: sizeLarge,
  sizeXLarge: sizeXLarge,
  size2XLarge: size2XLarge,
  iconSize01: iconSize01,
  iconSize02: iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01$3 = blue60;
var interactive02$3 = gray60;
var interactive03$3 = white$1;
var interactive04$3 = blue50;
var uiBackground$3 = gray100;
var ui01$3 = gray90;
var ui02$3 = gray80;
var ui03$3 = gray80;
var ui04$3 = gray60;
var ui05$3 = gray10;
var text01$3 = gray10;
var text02$3 = gray30;
var text03$3 = gray60;
var text04$3 = white$1;
var text05$3 = gray50;
var textError$3 = red40;
var icon01$3 = gray10;
var icon02$3 = gray30;
var icon03$3 = white$1;
var link01$3 = blue40;
var link02$3 = blue30;
var inverseLink$3 = blue60;
var field01$3 = gray90;
var field02$3 = gray80;
var inverse01$3 = gray100;
var inverse02$3 = gray10;
var support01$3 = red50;
var support02$3 = green40;
var support03$3 = yellow;
var support04$3 = blue50;
var inverseSupport01$3 = red60;
var inverseSupport02$3 = green50;
var inverseSupport03$3 = yellow;
var inverseSupport04$3 = blue60;
var overlay01$3 = rgba(gray100, 0.7);
var danger01$3 = red60;
var danger02$3 = red50; // Interaction states

var focus$3 = white$1;
var inverseFocusUi$3 = blue60;
var hoverPrimary$3 = '#0353e9';
var activePrimary$3 = blue80;
var hoverPrimaryText$3 = blue30;
var hoverSecondary$3 = '#606060';
var activeSecondary$3 = gray80;
var hoverTertiary$3 = gray10;
var activeTertiary$3 = gray30;
var hoverUI$3 = '#353535';
var hoverLightUI$3 = '#4c4c4c';
var activeUI$3 = gray70;
var activeLightUI$3 = gray60;
var selectedUI$3 = gray80;
var selectedLightUI$3 = gray70;
var inverseHoverUI$3 = '#e5e5e5';
var hoverSelectedUI$3 = '#4c4c4c';
var hoverDanger$3 = adjustLightness(danger01$3, -8);
var activeDanger$3 = red80;
var hoverRow$3 = '#353535';
var visitedLink$3 = purple40;
var disabled01$3 = gray90;
var disabled02$3 = gray70;
var disabled03$3 = gray50;
var highlight$3 = blue80;
var decorative01$3 = gray70;
var buttonSeparator$3 = '#161616';
var skeleton01$3 = '#353535';
var skeleton02$3 = gray70; // New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens

var background$3 = uiBackground$3;
var layer$3 = ui01$3;
var layerAccent$3 = ui03$3;
var layerAccentActive$3 = gray60;
var layerAccentHover$3 = adjustLightness(layerAccent$3, +6);
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
var layerDisabled$3 = disabled01$3;
var fieldDisabled$3 = disabled01$3;
var borderDisabled$3 = disabled01$3;
var textDisabled$3 = disabled02$3;
var buttonDisabled$3 = disabled02$3;
var iconDisabled$3 = disabled02$3;
var textOnColorDisabled$3 = disabled03$3;
var iconOnColorDisabled$3 = disabled03$3;
var layerSelectedDisabled$3 = disabled03$3;
var skeletonBackground$3 = skeleton01$3;
var skeletonElement$3 = skeleton02$3;

var brand01$3 = interactive01$3;
var brand02$3 = interactive02$3;
var brand03$3 = interactive03$3;
var active01$3 = activeUI$3;
var hoverField$3 = hoverUI$3;
var danger$3 = danger01$3;

var g100 = /*#__PURE__*/Object.freeze({
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
  layerDisabled: layerDisabled$3,
  fieldDisabled: fieldDisabled$3,
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
  caption01: caption01,
  caption02: caption02,
  label01: label01,
  label02: label02,
  helperText01: helperText01,
  helperText02: helperText02,
  bodyShort01: bodyShort01,
  bodyLong01: bodyLong01,
  bodyShort02: bodyShort02,
  bodyLong02: bodyLong02,
  code01: code01,
  code02: code02,
  heading01: heading01,
  productiveHeading01: productiveHeading01,
  heading02: heading02,
  productiveHeading02: productiveHeading02,
  productiveHeading03: productiveHeading03,
  productiveHeading04: productiveHeading04,
  productiveHeading05: productiveHeading05,
  productiveHeading06: productiveHeading06,
  productiveHeading07: productiveHeading07,
  expressiveHeading01: expressiveHeading01,
  expressiveHeading02: expressiveHeading02,
  expressiveHeading03: expressiveHeading03,
  expressiveHeading04: expressiveHeading04,
  expressiveHeading05: expressiveHeading05,
  expressiveHeading06: expressiveHeading06,
  expressiveParagraph01: expressiveParagraph01,
  quotation01: quotation01,
  quotation02: quotation02,
  display01: display01,
  display02: display02,
  display03: display03,
  display04: display04,
  spacing01: spacing01,
  spacing02: spacing02,
  spacing03: spacing03,
  spacing04: spacing04,
  spacing05: spacing05,
  spacing06: spacing06,
  spacing07: spacing07,
  spacing08: spacing08,
  spacing09: spacing09,
  spacing10: spacing10,
  spacing11: spacing11,
  spacing12: spacing12,
  spacing13: spacing13,
  fluidSpacing01: fluidSpacing01,
  fluidSpacing02: fluidSpacing02,
  fluidSpacing03: fluidSpacing03,
  fluidSpacing04: fluidSpacing04,
  layout01: layout01,
  layout02: layout02,
  layout03: layout03,
  layout04: layout04,
  layout05: layout05,
  layout06: layout06,
  layout07: layout07,
  container01: container01,
  container02: container02,
  container03: container03,
  container04: container04,
  container05: container05,
  sizeXSmall: sizeXSmall,
  sizeSmall: sizeSmall,
  sizeMedium: sizeMedium,
  sizeLarge: sizeLarge,
  sizeXLarge: sizeXLarge,
  size2XLarge: size2XLarge,
  iconSize01: iconSize01,
  iconSize02: iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens

var background$2 = gray80;
var layer$2 = gray70;
var layerAccent$2 = gray60;
var layerAccentActive$2 = gray70;
var layerAccentHover$2 = adjustLightness(layerAccent$2, -7);
var field$2 = gray70;
var backgroundInverse$2 = gray10;
var backgroundBrand$2 = blue60;
var interactive$2 = blue40;
var borderSubtle$2 = gray60;
var borderStrong$2 = gray40;
var borderInverse$2 = gray10;
var borderInteractive$2 = blue50;
var textPrimary$2 = gray10;
var textSecondary$2 = gray30;
var textPlaceholder$2 = gray60;
var textHelper$2 = gray40;
var textError$2 = red30;
var textOnColor$2 = white$1;
var textInverse$2 = gray100;
var linkPrimary$2 = blue40;
var linkSecondary$2 = blue30;
var linkVisited$2 = purple40;
var linkInverse$2 = blue60;
var iconPrimary$2 = gray10;
var iconSecondary$2 = gray30;
var iconOnColor$2 = white$1;
var iconInverse$2 = gray100;
var supportError$2 = red40;
var supportSuccess$2 = green40;
var supportWarning$2 = yellow30;
var supportInfo$2 = blue50;
var supportErrorInverse$2 = red60;
var supportSuccessInverse$2 = green50;
var supportWarningInverse$2 = yellow30;
var supportInfoInverse$2 = blue60;
var overlay$2 = rgba(gray100, 0.7);
var toggleOff$2 = gray50;
var buttonPrimary$2 = blue60;
var buttonSecondary$2 = gray60;
var buttonTertiary$2 = white$1;
var buttonDangerPrimary$2 = red60;
var buttonDangerSecondary$2 = red40;
var buttonSeparator$2 = gray100;
var backgroundActive$2 = gray70;
var layerActive$2 = gray60;
var buttonDangerActive$2 = red80;
var buttonPrimaryActive$2 = blue80;
var buttonSecondaryActive$2 = gray70;
var buttonTertiaryActive$2 = gray30;
var focus$2 = white$1;
var focusInset$2 = gray100;
var focusInverse$2 = blue60;
var highlight$2 = blue70;
var backgroundHover$2 = adjustLightness(background$2, +6);
var layerHover$2 = adjustLightness(layer$2, +7);
var fieldHover$2 = adjustLightness(field$2, +7);
var backgroundInverseHover$2 = adjustLightness(backgroundInverse$2, -5);
var linkPrimaryHover$2 = blue30;
var buttonDangerHover$2 = adjustLightness(buttonDangerPrimary$2, -8);
var buttonPrimaryHover$2 = adjustLightness(buttonPrimary$2, -8);
var buttonSecondaryHover$2 = adjustLightness(buttonSecondary$2, -7);
var buttonTertiaryHover$2 = white$1;
var backgroundSelected$2 = gray70;
var backgroundSelectedHover$2 = adjustLightness(backgroundSelected$2, +7);
var layerSelected$2 = gray60;
var layerSelectedHover$2 = adjustLightness(layerSelected$2, -6);
var layerSelectedInverse$2 = gray10;
var borderSubtleSelected$2 = gray50;
var layerDisabled$2 = gray70;
var fieldDisabled$2 = gray70;
var borderDisabled$2 = gray70;
var textDisabled$2 = gray50;
var buttonDisabled$2 = gray50;
var iconDisabled$2 = gray50;
var textOnColorDisabled$2 = gray30;
var iconOnColorDisabled$2 = gray30;
var layerSelectedDisabled$2 = gray30;
var skeletonBackground$2 = adjustLightness(background$2, +6);
var skeletonElement$2 = gray60; //////////////////////////////////////
// Old tokens needed to pass tests  //
//////////////////////////////////////

var interactive01$2 = backgroundBrand$2;
var interactive02$2 = buttonSecondary$2;
var interactive03$2 = buttonTertiary$2;
var interactive04$2 = interactive$2;
var uiBackground$2 = background$2;
var ui01$2 = layer$2;
var ui02$2 = gray70;
var ui03$2 = layerAccent$2;
var ui04$2 = borderStrong$2;
var ui05$2 = borderInverse$2;
var text01$2 = textPrimary$2;
var text02$2 = textSecondary$2;
var text03$2 = textPlaceholder$2;
var text04$2 = textOnColor$2;
var text05$2 = textHelper$2;
var icon01$2 = iconPrimary$2;
var icon02$2 = iconSecondary$2;
var icon03$2 = iconOnColor$2;
var link01$2 = linkPrimary$2;
var link02$2 = linkSecondary$2;
var inverseLink$2 = linkInverse$2;
var field01$2 = field$2;
var field02$2 = gray60;
var inverse01$2 = textInverse$2;
var inverse02$2 = backgroundInverse$2;
var support01$2 = supportError$2;
var support02$2 = supportSuccess$2;
var support03$2 = supportWarning$2;
var support04$2 = supportInfo$2;
var inverseSupport01$2 = supportErrorInverse$2;
var inverseSupport02$2 = supportSuccessInverse$2;
var inverseSupport03$2 = supportWarningInverse$2;
var inverseSupport04$2 = supportInfoInverse$2;
var overlay01$2 = overlay$2;
var danger01$2 = buttonDangerPrimary$2;
var danger02$2 = buttonDangerSecondary$2; // Interaction states

var inverseFocusUi$2 = focusInverse$2;
var hoverPrimary$2 = buttonPrimaryHover$2;
var activePrimary$2 = buttonPrimaryActive$2;
var hoverPrimaryText$2 = linkPrimaryHover$2;
var hoverSecondary$2 = buttonSecondaryHover$2;
var activeSecondary$2 = buttonSecondaryActive$2;
var hoverTertiary$2 = buttonTertiaryHover$2;
var activeTertiary$2 = buttonTertiaryActive$2;
var hoverUI$2 = backgroundHover$2;
var hoverLightUI$2 = '#5E5E5E';
var activeUI$2 = backgroundActive$2;
var activeLightUI$2 = gray50;
var selectedUI$2 = backgroundSelected$2;
var selectedLightUI$2 = gray50;
var inverseHoverUI$2 = backgroundInverseHover$2;
var hoverSelectedUI$2 = layerSelectedHover$2;
var hoverDanger$2 = buttonDangerHover$2;
var activeDanger$2 = buttonDangerActive$2;
var hoverRow$2 = layerHover$2;
var visitedLink$2 = linkVisited$2;
var disabled01$2 = layerDisabled$2;
var disabled02$2 = textDisabled$2;
var disabled03$2 = textOnColorDisabled$2;
var decorative01$2 = gray60;
var skeleton01$2 = skeletonBackground$2;
var skeleton02$2 = skeletonElement$2;

var brand01$2 = interactive01$2;
var brand02$2 = interactive02$2;
var brand03$2 = interactive03$2;
var active01$2 = activeUI$2;
var hoverField$2 = hoverUI$2;
var danger$2 = danger01$2;

var g80 = /*#__PURE__*/Object.freeze({
  __proto__: null,
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
  textError: textError$2,
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
  buttonPrimary: buttonPrimary$2,
  buttonSecondary: buttonSecondary$2,
  buttonTertiary: buttonTertiary$2,
  buttonDangerPrimary: buttonDangerPrimary$2,
  buttonDangerSecondary: buttonDangerSecondary$2,
  buttonSeparator: buttonSeparator$2,
  backgroundActive: backgroundActive$2,
  layerActive: layerActive$2,
  buttonDangerActive: buttonDangerActive$2,
  buttonPrimaryActive: buttonPrimaryActive$2,
  buttonSecondaryActive: buttonSecondaryActive$2,
  buttonTertiaryActive: buttonTertiaryActive$2,
  focus: focus$2,
  focusInset: focusInset$2,
  focusInverse: focusInverse$2,
  highlight: highlight$2,
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
  layerDisabled: layerDisabled$2,
  fieldDisabled: fieldDisabled$2,
  borderDisabled: borderDisabled$2,
  textDisabled: textDisabled$2,
  buttonDisabled: buttonDisabled$2,
  iconDisabled: iconDisabled$2,
  textOnColorDisabled: textOnColorDisabled$2,
  iconOnColorDisabled: iconOnColorDisabled$2,
  layerSelectedDisabled: layerSelectedDisabled$2,
  skeletonBackground: skeletonBackground$2,
  skeletonElement: skeletonElement$2,
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
  decorative01: decorative01$2,
  skeleton01: skeleton01$2,
  skeleton02: skeleton02$2,
  brand01: brand01$2,
  brand02: brand02$2,
  brand03: brand03$2,
  active01: active01$2,
  hoverField: hoverField$2,
  danger: danger$2,
  caption01: caption01,
  caption02: caption02,
  label01: label01,
  label02: label02,
  helperText01: helperText01,
  helperText02: helperText02,
  bodyShort01: bodyShort01,
  bodyLong01: bodyLong01,
  bodyShort02: bodyShort02,
  bodyLong02: bodyLong02,
  code01: code01,
  code02: code02,
  heading01: heading01,
  productiveHeading01: productiveHeading01,
  heading02: heading02,
  productiveHeading02: productiveHeading02,
  productiveHeading03: productiveHeading03,
  productiveHeading04: productiveHeading04,
  productiveHeading05: productiveHeading05,
  productiveHeading06: productiveHeading06,
  productiveHeading07: productiveHeading07,
  expressiveHeading01: expressiveHeading01,
  expressiveHeading02: expressiveHeading02,
  expressiveHeading03: expressiveHeading03,
  expressiveHeading04: expressiveHeading04,
  expressiveHeading05: expressiveHeading05,
  expressiveHeading06: expressiveHeading06,
  expressiveParagraph01: expressiveParagraph01,
  quotation01: quotation01,
  quotation02: quotation02,
  display01: display01,
  display02: display02,
  display03: display03,
  display04: display04,
  spacing01: spacing01,
  spacing02: spacing02,
  spacing03: spacing03,
  spacing04: spacing04,
  spacing05: spacing05,
  spacing06: spacing06,
  spacing07: spacing07,
  spacing08: spacing08,
  spacing09: spacing09,
  spacing10: spacing10,
  spacing11: spacing11,
  spacing12: spacing12,
  spacing13: spacing13,
  fluidSpacing01: fluidSpacing01,
  fluidSpacing02: fluidSpacing02,
  fluidSpacing03: fluidSpacing03,
  fluidSpacing04: fluidSpacing04,
  layout01: layout01,
  layout02: layout02,
  layout03: layout03,
  layout04: layout04,
  layout05: layout05,
  layout06: layout06,
  layout07: layout07,
  container01: container01,
  container02: container02,
  container03: container03,
  container04: container04,
  container05: container05,
  sizeXSmall: sizeXSmall,
  sizeSmall: sizeSmall,
  sizeMedium: sizeMedium,
  sizeLarge: sizeLarge,
  sizeXLarge: sizeXLarge,
  size2XLarge: size2XLarge,
  iconSize01: iconSize01,
  iconSize02: iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01$1 = blue60;
var interactive02$1 = gray60;
var interactive03$1 = white$1;
var interactive04$1 = blue50;
var uiBackground$1 = gray90;
var ui01$1 = gray80;
var ui02$1 = gray70;
var ui03$1 = gray70;
var ui04$1 = gray50;
var ui05$1 = gray10;
var text01$1 = gray10;
var text02$1 = gray30;
var text03$1 = gray60;
var text04$1 = white$1;
var text05$1 = gray50;
var textError$1 = red30;
var icon01$1 = gray10;
var icon02$1 = gray30;
var icon03$1 = white$1;
var link01$1 = blue40;
var link02$1 = blue30;
var inverseLink$1 = blue60;
var field01$1 = gray80;
var field02$1 = gray70;
var inverse01$1 = gray100;
var inverse02$1 = gray10;
var support01$1 = red40;
var support02$1 = green40;
var support03$1 = yellow;
var support04$1 = blue50;
var inverseSupport01$1 = red60;
var inverseSupport02$1 = green50;
var inverseSupport03$1 = yellow;
var inverseSupport04$1 = blue60;
var overlay01$1 = rgba(gray100, 0.7);
var danger01$1 = red60;
var danger02$1 = red40; // Interaction states

var focus$1 = white$1;
var inverseFocusUi$1 = blue60;
var hoverPrimary$1 = '#0353e9';
var activePrimary$1 = blue80;
var hoverPrimaryText$1 = blue30;
var hoverSecondary$1 = '#606060';
var activeSecondary$1 = gray80;
var hoverTertiary$1 = gray10;
var activeTertiary$1 = gray30;
var hoverUI$1 = '#4c4c4c';
var hoverLightUI$1 = '#656565';
var activeUI$1 = gray60;
var activeLightUI$1 = gray50;
var selectedUI$1 = gray70;
var selectedLightUI$1 = gray60;
var inverseHoverUI$1 = '#e5e5e5';
var hoverSelectedUI$1 = '#656565';
var hoverDanger$1 = adjustLightness(danger01$1, -8);
var activeDanger$1 = red80;
var hoverRow$1 = '#4c4c4c';
var visitedLink$1 = purple40;
var disabled01$1 = gray80;
var disabled02$1 = gray60;
var disabled03$1 = gray40;
var highlight$1 = blue70;
var decorative01$1 = gray60;
var buttonSeparator$1 = '#161616';
var skeleton01$1 = '#353535';
var skeleton02$1 = gray70; // New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens

var background$1 = uiBackground$1;
var layer$1 = ui01$1;
var layerAccent$1 = ui03$1;
var layerAccentActive$1 = gray50;
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
var layerDisabled$1 = disabled01$1;
var fieldDisabled$1 = disabled01$1;
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
  layerDisabled: layerDisabled$1,
  fieldDisabled: fieldDisabled$1,
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
  caption01: caption01,
  caption02: caption02,
  label01: label01,
  label02: label02,
  helperText01: helperText01,
  helperText02: helperText02,
  bodyShort01: bodyShort01,
  bodyLong01: bodyLong01,
  bodyShort02: bodyShort02,
  bodyLong02: bodyLong02,
  code01: code01,
  code02: code02,
  heading01: heading01,
  productiveHeading01: productiveHeading01,
  heading02: heading02,
  productiveHeading02: productiveHeading02,
  productiveHeading03: productiveHeading03,
  productiveHeading04: productiveHeading04,
  productiveHeading05: productiveHeading05,
  productiveHeading06: productiveHeading06,
  productiveHeading07: productiveHeading07,
  expressiveHeading01: expressiveHeading01,
  expressiveHeading02: expressiveHeading02,
  expressiveHeading03: expressiveHeading03,
  expressiveHeading04: expressiveHeading04,
  expressiveHeading05: expressiveHeading05,
  expressiveHeading06: expressiveHeading06,
  expressiveParagraph01: expressiveParagraph01,
  quotation01: quotation01,
  quotation02: quotation02,
  display01: display01,
  display02: display02,
  display03: display03,
  display04: display04,
  spacing01: spacing01,
  spacing02: spacing02,
  spacing03: spacing03,
  spacing04: spacing04,
  spacing05: spacing05,
  spacing06: spacing06,
  spacing07: spacing07,
  spacing08: spacing08,
  spacing09: spacing09,
  spacing10: spacing10,
  spacing11: spacing11,
  spacing12: spacing12,
  spacing13: spacing13,
  fluidSpacing01: fluidSpacing01,
  fluidSpacing02: fluidSpacing02,
  fluidSpacing03: fluidSpacing03,
  fluidSpacing04: fluidSpacing04,
  layout01: layout01,
  layout02: layout02,
  layout03: layout03,
  layout04: layout04,
  layout05: layout05,
  layout06: layout06,
  layout07: layout07,
  container01: container01,
  container02: container02,
  container03: container03,
  container04: container04,
  container05: container05,
  sizeXSmall: sizeXSmall,
  sizeSmall: sizeSmall,
  sizeMedium: sizeMedium,
  sizeLarge: sizeLarge,
  sizeXLarge: sizeXLarge,
  size2XLarge: size2XLarge,
  iconSize01: iconSize01,
  iconSize02: iconSize02
});

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var interactive01 = '#3d70b2';
var interactive02 = '#4d5358';
var interactive03 = '#3d70b2';
var interactive04 = '#3d70b2';
var uiBackground = '#f4f7fb';
var ui01 = white$1;
var ui02 = '#f4f7fb';
var ui03 = '#dfe3e6';
var ui04 = '#8897a2';
var ui05 = '#5a6872';
var text01 = '#152935';
var text02 = '#5a6872';
var text03 = '#cdd1d4';
var text04 = white$1;
var text05 = '#5a6872';
var textError = '#e0182d';
var icon01 = '#3d70b2';
var icon02 = '#5a6872';
var icon03 = white$1;
var link01 = '#3d70b2';
var link02 = '#3d70b2';
var inverseLink = '#5596e6';
var field01 = white$1;
var field02 = '#f4f7fb';
var inverse01 = white$1;
var inverse02 = '#272d33';
var support01 = '#e0182d';
var support02 = '#5aa700';
var support03 = '#efc100';
var support04 = '#5aaafa';
var inverseSupport01 = '#ff5050';
var inverseSupport02 = '#8cd211';
var inverseSupport03 = '#FDD600';
var inverseSupport04 = '#5aaafa';
var overlay01 = 'rgba(223, 227, 230, 0.5)';
var danger01 = red60;
var danger02 = red60; // Interaction states

var focus = '#3d70b2';
var inverseFocusUi = '#3d70b2';
var hoverPrimary = '#30588c';
var activePrimary = '#30588c';
var hoverPrimaryText = '#294c86';
var hoverSecondary = '#4d5b65';
var activeSecondary = '#414f59';
var hoverTertiary = '#5a6872';
var activeTertiary = '#414f59';
var hoverUI = '#EEF4FC';
var hoverLightUI = '#EEF4FC';
var activeUI = '#DFEAFA';
var activeLightUI = '#DFEAFA';
var selectedUI = '#EEF4FC';
var selectedLightUI = '#EEF4FC';
var inverseHoverUI = '#4c4c4c';
var hoverSelectedUI = '#DFEAFA';
var hoverDanger = '#c70014';
var activeDanger = '#AD1625';
var hoverRow = '#eef4fc';
var visitedLink = '#294c86';
var disabled01 = '#fafbfd';
var disabled02 = '#dfe3e6';
var disabled03 = '#cdd1d4';
var highlight = '#f4f7fb';
var decorative01 = '#EEF4FC';
var buttonSeparator = '#e0e0e0';
var skeleton01 = 'rgba(61, 112, 178, .1)';
var skeleton02 = 'rgba(61, 112, 178, .1)'; // New color tokens
// TO-DO: remove fallback color when v11 is released and assign carbon colors to new tokens

var background = uiBackground;
var layer = ui01;
var layerAccent = ui03;
var layerAccentActive = gray40;
var layerAccentHover = adjustLightness(layerAccent, -6);
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
var layerDisabled = disabled01;
var fieldDisabled = disabled01;
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

var v9 = /*#__PURE__*/Object.freeze({
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
  layerDisabled: layerDisabled,
  fieldDisabled: fieldDisabled,
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
  caption01: caption01,
  caption02: caption02,
  label01: label01,
  label02: label02,
  helperText01: helperText01,
  helperText02: helperText02,
  bodyShort01: bodyShort01,
  bodyLong01: bodyLong01,
  bodyShort02: bodyShort02,
  bodyLong02: bodyLong02,
  code01: code01,
  code02: code02,
  heading01: heading01,
  productiveHeading01: productiveHeading01,
  heading02: heading02,
  productiveHeading02: productiveHeading02,
  productiveHeading03: productiveHeading03,
  productiveHeading04: productiveHeading04,
  productiveHeading05: productiveHeading05,
  productiveHeading06: productiveHeading06,
  productiveHeading07: productiveHeading07,
  expressiveHeading01: expressiveHeading01,
  expressiveHeading02: expressiveHeading02,
  expressiveHeading03: expressiveHeading03,
  expressiveHeading04: expressiveHeading04,
  expressiveHeading05: expressiveHeading05,
  expressiveHeading06: expressiveHeading06,
  expressiveParagraph01: expressiveParagraph01,
  quotation01: quotation01,
  quotation02: quotation02,
  display01: display01,
  display02: display02,
  display03: display03,
  display04: display04,
  spacing01: spacing01,
  spacing02: spacing02,
  spacing03: spacing03,
  spacing04: spacing04,
  spacing05: spacing05,
  spacing06: spacing06,
  spacing07: spacing07,
  spacing08: spacing08,
  spacing09: spacing09,
  spacing10: spacing10,
  spacing11: spacing11,
  spacing12: spacing12,
  spacing13: spacing13,
  fluidSpacing01: fluidSpacing01,
  fluidSpacing02: fluidSpacing02,
  fluidSpacing03: fluidSpacing03,
  fluidSpacing04: fluidSpacing04,
  layout01: layout01,
  layout02: layout02,
  layout03: layout03,
  layout04: layout04,
  layout05: layout05,
  layout06: layout06,
  layout07: layout07,
  container01: container01,
  container02: container02,
  container03: container03,
  container04: container04,
  container05: container05,
  sizeXSmall: sizeXSmall,
  sizeSmall: sizeSmall,
  sizeMedium: sizeMedium,
  sizeLarge: sizeLarge,
  sizeXLarge: sizeXLarge,
  size2XLarge: size2XLarge,
  iconSize01: iconSize01,
  iconSize02: iconSize02
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
'background', 'layer', 'layerAccent', 'layerAccentHover', 'layerAccentActive', 'field', 'backgroundInverse', 'backgroundBrand', 'interactive', 'borderSubtle', 'borderStrong', 'borderInverse', 'borderInteractive', 'textPrimary', 'textSecondary', 'textPlaceholder', 'textHelper', 'textOnColor', 'textInverse', 'linkPrimary', 'linkSecondary', 'linkVisited', 'linkInverse', 'iconPrimary', 'iconSecondary', 'iconOnColor', 'iconInverse', 'supportError', 'supportSuccess', 'supportWarning', 'supportInfo', 'supportErrorInverse', 'supportSuccessInverse', 'supportWarningInverse', 'supportInfoInverse', 'overlay', 'toggleOff', 'buttonPrimary', 'buttonSecondary', 'buttonTertiary', 'buttonDangerPrimary', 'buttonDangerSecondary', 'backgroundActive', 'layerActive', 'buttonDangerActive', 'buttonPrimaryActive', 'buttonSecondaryActive', 'buttonTertiaryActive', 'focusInset', 'focusInverse', 'backgroundHover', 'layerHover', 'fieldHover', 'backgroundInverseHover', 'linkPrimaryHover', 'buttonDangerHover', 'buttonPrimaryHover', 'buttonSecondaryHover', 'buttonTertiaryHover', 'backgroundSelected', 'backgroundSelectedHover', 'layerSelected', 'layerSelectedHover', 'layerSelectedInverse', 'borderSubtleSelected', 'layerDisabled', 'fieldDisabled', 'borderDisabled', 'textDisabled', 'buttonDisabled', 'iconDisabled', 'textOnColorDisabled', 'iconOnColorDisabled', 'layerSelectedDisabled', 'skeletonBackground', 'skeletonElement', // Deprecated
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
  type: unstable_tokens,
  layout: unstable_tokens$1
};
var unstable__meta = {
  colors: [{
    type: 'core',
    tokens: ['uiBackground', 'interactive01', 'interactive02', 'interactive03', 'interactive04', 'brand01', 'brand02', 'brand03', 'danger', 'danger01', 'danger02', 'ui01', 'ui02', 'ui03', 'ui04', 'ui05', 'text01', 'text02', 'text03', 'text04', 'text05', 'textError', 'link01', 'link02', 'icon01', 'icon02', 'icon03', 'field01', 'field02', 'inverse01', 'inverse02', 'inverseLink', 'support01', 'support02', 'support03', 'support04', 'inverseSupport01', 'inverseSupport02', 'inverseSupport03', 'inverseSupport04', 'overlay01', //new tokens
    'background', 'layer', 'layerAccent', 'layerAccentHover', 'layerAccentActive', 'field', 'backgroundInverse', 'backgroundBrand', 'interactive', 'borderSubtle', 'borderStrong', 'borderInverse', 'borderInteractive', 'textPrimary', 'textSecondary', 'textPlaceholder', 'textHelper', 'textOnColor', 'textInverse', 'linkPrimary', 'linkSecondary', 'linkVisited', 'linkInverse', 'iconPrimary', 'iconSecondary', 'iconOnColor', 'iconInverse', 'supportError', 'supportSuccess', 'supportWarning', 'supportInfo', 'supportErrorInverse', 'supportSuccessInverse', 'supportWarningInverse', 'supportInfoInverse', 'overlay', 'toggleOff', 'buttonPrimary', 'buttonSecondary', 'buttonTertiary', 'buttonDangerPrimary', 'buttonDangerSecondary']
  }, {
    type: 'interactive',
    tokens: ['focus', 'inverseFocusUi', 'hoverPrimary', 'hoverPrimaryText', 'hoverSecondary', 'hoverTertiary', 'hoverUI', 'hoverLightUI', 'hoverSelectedUI', 'hoverDanger', 'hoverRow', 'activePrimary', 'activeSecondary', 'activeTertiary', 'activeUI', 'activeLightUI', 'activeDanger', 'selectedUI', 'selectedLightUI', 'highlight', 'skeleton01', 'skeleton02', 'visitedLink', 'disabled01', 'disabled02', 'disabled03', 'inverseHoverUI', 'active01', 'hoverField', 'decorative01', 'buttonSeparator', // new tokens
    'backgroundActive', 'layerActive', 'buttonDangerActive', 'buttonPrimaryActive', 'buttonSecondaryActive', 'buttonTertiaryActive', 'focusInset', 'focusInverse', 'backgroundHover', 'layerHover', 'fieldHover', 'backgroundInverseHover', 'linkPrimaryHover', 'buttonDangerHover', 'buttonPrimaryHover', 'buttonSecondaryHover', 'buttonTertiaryHover', 'backgroundSelected', 'backgroundSelectedHover', 'layerSelected', 'layerSelectedHover', 'layerSelectedInverse', 'borderSubtleSelected', 'layerDisabled', 'fieldDisabled', 'borderDisabled', 'textDisabled', 'buttonDisabled', 'iconDisabled', 'textOnColorDisabled', 'iconOnColorDisabled', 'layerSelectedDisabled', 'skeletonBackground', 'skeletonElement']
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
  g80: g80,
  g90: g90,
  g100: g100,
  v9: v9
};

export { active01$5 as active01, activeDanger$5 as activeDanger, activeLightUI$5 as activeLightUI, activePrimary$5 as activePrimary, activeSecondary$5 as activeSecondary, activeTertiary$5 as activeTertiary, activeUI$5 as activeUI, background$5 as background, backgroundActive$5 as backgroundActive, backgroundBrand$5 as backgroundBrand, backgroundHover$5 as backgroundHover, backgroundInverse$5 as backgroundInverse, backgroundInverseHover$5 as backgroundInverseHover, backgroundSelected$5 as backgroundSelected, backgroundSelectedHover$5 as backgroundSelectedHover, borderDisabled$5 as borderDisabled, borderInteractive$5 as borderInteractive, borderInverse$5 as borderInverse, borderStrong$5 as borderStrong, borderSubtle$5 as borderSubtle, borderSubtleSelected$5 as borderSubtleSelected, brand01$5 as brand01, brand02$5 as brand02, brand03$5 as brand03, buttonDangerActive$5 as buttonDangerActive, buttonDangerHover$5 as buttonDangerHover, buttonDangerPrimary$5 as buttonDangerPrimary, buttonDangerSecondary$5 as buttonDangerSecondary, buttonDisabled$5 as buttonDisabled, buttonPrimary$5 as buttonPrimary, buttonPrimaryActive$5 as buttonPrimaryActive, buttonPrimaryHover$5 as buttonPrimaryHover, buttonSecondary$5 as buttonSecondary, buttonSecondaryActive$5 as buttonSecondaryActive, buttonSecondaryHover$5 as buttonSecondaryHover, buttonSeparator$5 as buttonSeparator, buttonTertiary$5 as buttonTertiary, buttonTertiaryActive$5 as buttonTertiaryActive, buttonTertiaryHover$5 as buttonTertiaryHover, danger$5 as danger, danger01$5 as danger01, danger02$5 as danger02, decorative01$5 as decorative01, disabled01$5 as disabled01, disabled02$5 as disabled02, disabled03$5 as disabled03, field$5 as field, field01$5 as field01, field02$5 as field02, fieldDisabled$5 as fieldDisabled, fieldHover$5 as fieldHover, focus$5 as focus, focusInset$5 as focusInset, focusInverse$5 as focusInverse, formatTokenName, g10, g100, g80, g90, highlight$5 as highlight, hoverDanger$5 as hoverDanger, hoverField$5 as hoverField, hoverLightUI$5 as hoverLightUI, hoverPrimary$5 as hoverPrimary, hoverPrimaryText$5 as hoverPrimaryText, hoverRow$5 as hoverRow, hoverSecondary$5 as hoverSecondary, hoverSelectedUI$5 as hoverSelectedUI, hoverTertiary$5 as hoverTertiary, hoverUI$5 as hoverUI, icon01$5 as icon01, icon02$5 as icon02, icon03$5 as icon03, iconDisabled$5 as iconDisabled, iconInverse$5 as iconInverse, iconOnColor$5 as iconOnColor, iconOnColorDisabled$5 as iconOnColorDisabled, iconPrimary$5 as iconPrimary, iconSecondary$5 as iconSecondary, interactive$5 as interactive, interactive01$5 as interactive01, interactive02$5 as interactive02, interactive03$5 as interactive03, interactive04$5 as interactive04, inverse01$5 as inverse01, inverse02$5 as inverse02, inverseFocusUi$5 as inverseFocusUi, inverseHoverUI$5 as inverseHoverUI, inverseLink$5 as inverseLink, inverseSupport01$5 as inverseSupport01, inverseSupport02$5 as inverseSupport02, inverseSupport03$5 as inverseSupport03, inverseSupport04$5 as inverseSupport04, layer$5 as layer, layerAccent$5 as layerAccent, layerAccentActive$5 as layerAccentActive, layerAccentHover$5 as layerAccentHover, layerActive$5 as layerActive, layerDisabled$5 as layerDisabled, layerHover$5 as layerHover, layerSelected$5 as layerSelected, layerSelectedDisabled$5 as layerSelectedDisabled, layerSelectedHover$5 as layerSelectedHover, layerSelectedInverse$5 as layerSelectedInverse, link01$5 as link01, link02$5 as link02, linkInverse$5 as linkInverse, linkPrimary$5 as linkPrimary, linkPrimaryHover$5 as linkPrimaryHover, linkSecondary$5 as linkSecondary, linkVisited$5 as linkVisited, overlay$5 as overlay, overlay01$5 as overlay01, selectedLightUI$5 as selectedLightUI, selectedUI$5 as selectedUI, skeleton01$5 as skeleton01, skeleton02$5 as skeleton02, skeletonBackground$5 as skeletonBackground, skeletonElement$5 as skeletonElement, support01$5 as support01, support02$5 as support02, support03$5 as support03, support04$5 as support04, supportError$5 as supportError, supportErrorInverse$5 as supportErrorInverse, supportInfo$5 as supportInfo, supportInfoInverse$5 as supportInfoInverse, supportSuccess$5 as supportSuccess, supportSuccessInverse$5 as supportSuccessInverse, supportWarning$5 as supportWarning, supportWarningInverse$5 as supportWarningInverse, text01$5 as text01, text02$5 as text02, text03$5 as text03, text04$5 as text04, text05$5 as text05, textDisabled$5 as textDisabled, textError$5 as textError, textHelper$5 as textHelper, textInverse$5 as textInverse, textOnColor$5 as textOnColor, textOnColorDisabled$5 as textOnColorDisabled, textPlaceholder$5 as textPlaceholder, textPrimary$5 as textPrimary, textSecondary$5 as textSecondary, themes, toggleOff$5 as toggleOff, tokens, ui01$5 as ui01, ui02$5 as ui02, ui03$5 as ui03, ui04$5 as ui04, ui05$5 as ui05, uiBackground$5 as uiBackground, unstable__meta, v9, visitedLink$5 as visitedLink, white };
