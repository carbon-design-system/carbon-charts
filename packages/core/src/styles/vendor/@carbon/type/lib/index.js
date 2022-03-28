'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Font family fallbacks for: IBM Plex Mono, IBM Plex Sans, IBM Plex Sans
// Condensed, IBM Plex Sans Hebrew, and IBM Plex Serif
var fontFamilies = {
  mono: "'IBM Plex Mono', 'Menlo', 'DejaVu Sans Mono', 'Bitstream Vera Sans Mono', Courier, monospace",
  sans: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif",
  sansCondensed: "'IBM Plex Sans Condensed', 'Helvetica Neue', Arial, sans-serif",
  sansHebrew: "'IBM Plex Sans Hebrew', 'Helvetica Hebrew', 'Arial Hebrew', sans-serif",
  serif: "'IBM Plex Serif', 'Georgia', Times, serif"
};
function fontFamily(name) {
  if (!fontFamilies[name]) {
    throw new Error("Unable to find font family: `".concat(name, "`. Expected one of: ") + "[".concat(Object.keys(fontFamilies).join(', '), "]"));
  }

  return {
    fontFamily: fontFamilies[name]
  };
}

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fontWeights = {
  light: 300,
  regular: 400,
  semibold: 600
};
function fontWeight(weight) {
  if (!fontWeights[weight]) {
    throw new Error("Unable to find font weight: `".concat(weight, "`. Expected one of: ") + "[".concat(Object.keys(fontWeights).join(', '), "]"));
  }

  return {
    fontWeight: fontWeights[weight]
  };
}

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
function print(block) {
  return Object.keys(block).reduce(function (acc, key, index) {
    // Short-circuit on the foreign key 'breakpoints'. This is used in our
    // tokens for fluid type and should not be printed. In the future, we should
    // tie this to media query outputs.
    if (key === 'breakpoints') {
      return acc;
    }

    var property = "".concat(paramCase(key), ": ").concat(block[key], ";");

    if (index === 0) {
      return property;
    }

    return acc + '\n' + property;
  }, '');
}

function paramCase(string) {
  var result = '';

  for (var i = 0; i < string.length; i++) {
    var character = string[i];

    if (character === character.toUpperCase()) {
      result += '-' + character.toLowerCase();
      continue;
    }

    result += character;
  }

  return result;
}

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Default, Use with em() and rem() functions

var baseFontSize = 16;
/**
 * Convert a given px unit to a rem unit
 * @param {number} px
 * @returns {string}
 */

function rem(px) {
  return "".concat(px / baseFontSize, "rem");
}
/**
 * Convert a given px unit to its string representation
 * @param {number} value - number of pixels
 * @returns {string}
 */


function px(value) {
  return "".concat(value, "px");
} // Breakpoint
// Initial map of our breakpoints and their values


var breakpoints = {
  sm: {
    width: rem(320),
    columns: 4,
    margin: '0'
  },
  md: {
    width: rem(672),
    columns: 8,
    margin: rem(16)
  },
  lg: {
    width: rem(1056),
    columns: 16,
    margin: rem(16)
  },
  xlg: {
    width: rem(1312),
    columns: 16,
    margin: rem(16)
  },
  max: {
    width: rem(1584),
    columns: 16,
    margin: rem(24)
  }
};

function breakpointUp(name) {
  return "@media (min-width: ".concat(breakpoints[name].width, ")");
}

function breakpoint() {
  return breakpointUp.apply(void 0, arguments);
} // Mini-unit

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
var reset = {
  html: {
    fontSize: px(baseFontSize)
  },
  body: {
    fontFamily: fontFamilies.sans,
    fontWeight: fontWeights.regular,
    textRendering: 'optimizeLegibility',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale'
  },
  strong: {
    fontWeight: fontWeights.semibold
  },
  code: {
    fontFamily: fontFamilies.mono
  }
};

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Get the type size for the given step
 * @param {number} step
 * @returns {number}
 */
function getTypeSize(step) {
  if (step <= 1) {
    return 12;
  } // Yn = Yn-1 + {FLOOR[(n - 2) / 4] + 1} * 2


  return getTypeSize(step - 1) + Math.floor((step - 2) / 4 + 1) * 2;
}
/**
 * The default type scale for 23 steps. Inlined as an array here through running
 * the follow step:
 *
 * > Array.from({ length: 23 }, (_, i) => getTypeSize(i + 1))
 */

var scale = [12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92, 102, 112, 122, 132, 144, 156];

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

function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

var caption01$1 = {
  fontSize: rem(scale[0]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.33333,
  letterSpacing: px(0.32)
};
var caption02$1 = {
  fontSize: rem(scale[1]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.28572,
  letterSpacing: px(0.32)
};
var label01$1 = {
  fontSize: rem(scale[0]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.33333,
  letterSpacing: px(0.32)
};
var label02$1 = {
  fontSize: rem(scale[1]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.28572,
  letterSpacing: px(0.16)
};
var helperText01$1 = {
  fontSize: rem(scale[0]),
  lineHeight: 1.33333,
  letterSpacing: px(0.32)
};
var helperText02$1 = {
  fontSize: rem(scale[1]),
  lineHeight: 1.28572,
  letterSpacing: px(0.16)
};
var bodyShort01$1 = {
  fontSize: rem(scale[1]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.28572,
  letterSpacing: px(0.16)
};
var bodyLong01$1 = {
  fontSize: rem(scale[1]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.42857,
  letterSpacing: px(0.16)
};
var bodyShort02$1 = {
  fontSize: rem(scale[2]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.375,
  letterSpacing: 0
};
var bodyLong02$1 = {
  fontSize: rem(scale[2]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.5,
  letterSpacing: 0
};
var code01$1 = {
  fontFamily: fontFamilies.mono,
  fontSize: rem(scale[0]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.33333,
  letterSpacing: px(0.32)
};
var code02$1 = {
  fontFamily: fontFamilies.mono,
  fontSize: rem(scale[1]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.42857,
  letterSpacing: px(0.32)
};
var heading01$1 = {
  fontSize: rem(scale[1]),
  fontWeight: fontWeights.semibold,
  lineHeight: 1.42857,
  letterSpacing: px(0.16)
};
var productiveHeading01$1 = {
  fontSize: rem(scale[1]),
  fontWeight: fontWeights.semibold,
  lineHeight: 1.28572,
  letterSpacing: px(0.16)
};
var heading02$1 = {
  fontSize: rem(scale[2]),
  fontWeight: fontWeights.semibold,
  lineHeight: 1.5,
  letterSpacing: 0
};
var productiveHeading02$1 = {
  fontSize: rem(scale[2]),
  fontWeight: fontWeights.semibold,
  lineHeight: 1.375,
  letterSpacing: 0
};
var productiveHeading03$1 = {
  fontSize: rem(scale[4]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.4,
  letterSpacing: 0
};
var productiveHeading04$1 = {
  fontSize: rem(scale[6]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.28572,
  letterSpacing: 0
};
var productiveHeading05$1 = {
  fontSize: rem(scale[7]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.25,
  letterSpacing: 0
};
var productiveHeading06$1 = {
  fontSize: rem(scale[9]),
  fontWeight: fontWeights.light,
  lineHeight: 1.199,
  letterSpacing: 0
};
var productiveHeading07$1 = {
  fontSize: rem(scale[11]),
  fontWeight: fontWeights.light,
  lineHeight: 1.199,
  letterSpacing: 0
};
var expressiveHeading01$1 = _objectSpread2(_objectSpread2({}, heading01$1), {}, {
  lineHeight: 1.25
});
var expressiveHeading02$1 = _objectSpread2(_objectSpread2({}, heading02$1), {}, {
  lineHeight: 1.5
});
var expressiveHeading03$1 = {
  fontSize: rem(scale[4]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.4,
  letterSpacing: 0,
  breakpoints: {
    xlg: {
      fontSize: rem(scale[4]),
      lineHeight: 1.25
    },
    max: {
      fontSize: rem(scale[5]),
      lineHeight: 1.334
    }
  }
};
var expressiveHeading04$1 = {
  fontSize: rem(scale[6]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.28572,
  letterSpacing: 0,
  breakpoints: {
    xlg: {
      fontSize: rem(scale[6]),
      lineHeight: 1.25
    },
    max: {
      fontSize: rem(scale[7])
    }
  }
};
var expressiveHeading05$1 = {
  fontSize: rem(scale[7]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.25,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: rem(scale[8]),
      fontWeight: fontWeights.light,
      lineHeight: 1.22,
      letterSpacing: 0
    },
    lg: {
      fontSize: rem(scale[9]),
      fontWeight: fontWeights.light,
      lineHeight: 1.19,
      letterSpacing: 0
    },
    xlg: {
      fontSize: rem(scale[10]),
      fontWeight: fontWeights.light,
      lineHeight: 1.17,
      letterSpacing: 0
    },
    max: {
      fontSize: rem(scale[12]),
      fontWeight: fontWeights.light,
      letterSpacing: 0
    }
  }
};
var expressiveHeading06$1 = {
  fontSize: rem(scale[7]),
  fontWeight: fontWeights.semibold,
  lineHeight: 1.25,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: rem(scale[8]),
      fontWeight: fontWeights.semibold,
      lineHeight: 1.22,
      letterSpacing: 0
    },
    lg: {
      fontSize: rem(scale[9]),
      fontWeight: fontWeights.semibold,
      lineHeight: 1.19,
      letterSpacing: 0
    },
    xlg: {
      fontSize: rem(scale[10]),
      fontWeight: fontWeights.semibold,
      lineHeight: 1.17,
      letterSpacing: 0
    },
    max: {
      fontSize: rem(scale[12]),
      fontWeight: fontWeights.semibold,
      letterSpacing: 0
    }
  }
};
var expressiveParagraph01$1 = {
  fontSize: rem(scale[5]),
  fontWeight: fontWeights.light,
  lineHeight: 1.334,
  letterSpacing: 0,
  breakpoints: {
    lg: {
      fontSize: rem(scale[6]),
      lineHeight: 1.28572
    },
    max: {
      fontSize: rem(scale[7]),
      lineHeight: 1.25
    }
  }
};
var quotation01$1 = {
  fontFamily: fontFamilies.serif,
  fontSize: rem(scale[4]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.3,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: rem(scale[4]),
      fontWeight: fontWeights.regular,
      letterSpacing: 0
    },
    lg: {
      fontSize: rem(scale[5]),
      fontWeight: fontWeights.regular,
      lineHeight: 1.334,
      letterSpacing: 0
    },
    xlg: {
      fontSize: rem(scale[6]),
      fontWeight: fontWeights.regular,
      lineHeight: 1.28572,
      letterSpacing: 0
    },
    max: {
      fontSize: rem(scale[7]),
      fontWeight: fontWeights.regular,
      lineHeight: 1.25,
      letterSpacing: 0
    }
  }
};
var quotation02$1 = {
  fontFamily: fontFamilies.serif,
  fontSize: rem(scale[7]),
  fontWeight: fontWeights.light,
  lineHeight: 1.25,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: rem(scale[8]),
      lineHeight: 1.22
    },
    lg: {
      fontSize: rem(scale[9]),
      lineHeight: 1.19
    },
    xlg: {
      fontSize: rem(scale[10]),
      lineHeight: 1.17
    },
    max: {
      fontSize: rem(scale[12])
    }
  }
};
var display01$1 = {
  fontSize: rem(scale[9]),
  fontWeight: fontWeights.light,
  lineHeight: 1.19,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: rem(scale[9])
    },
    lg: {
      fontSize: rem(scale[11])
    },
    xlg: {
      fontSize: rem(scale[12]),
      lineHeight: 1.17
    },
    max: {
      fontSize: rem(scale[14]),
      lineHeight: 1.13
    }
  }
};
var display02$1 = {
  fontSize: rem(scale[9]),
  fontWeight: fontWeights.semibold,
  lineHeight: 1.19,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: rem(scale[9])
    },
    lg: {
      fontSize: rem(scale[11])
    },
    xlg: {
      fontSize: rem(scale[12]),
      lineHeight: 1.16
    },
    max: {
      fontSize: rem(scale[14]),
      lineHeight: 1.13
    }
  }
};
var display03$1 = {
  fontSize: rem(scale[9]),
  fontWeight: fontWeights.light,
  lineHeight: 1.19,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: rem(scale[13]),
      lineHeight: 1.15
    },
    lg: {
      fontSize: rem(scale[16]),
      lineHeight: 1.11,
      letterSpacing: px(-0.64)
    },
    xlg: {
      fontSize: rem(scale[19]),
      lineHeight: 1.07
    },
    max: {
      fontSize: rem(scale[22]),
      lineHeight: 1.05,
      letterSpacing: px(-0.96)
    }
  }
};
var display04$1 = {
  fontSize: rem(scale[9]),
  fontWeight: fontWeights.semibold,
  lineHeight: 1.19,
  letterSpacing: 0,
  breakpoints: {
    md: {
      fontSize: rem(scale[13]),
      lineHeight: 1.15
    },
    lg: {
      fontSize: rem(scale[16]),
      lineHeight: 1.11,
      letterSpacing: px(-0.64)
    },
    xlg: {
      fontSize: rem(scale[19]),
      lineHeight: 1.07,
      letterSpacing: px(-0.64)
    },
    max: {
      fontSize: rem(scale[22]),
      lineHeight: 1.05,
      letterSpacing: px(-0.96)
    }
  }
}; // Type changes - V11
// Small styles
// No changes for code-01, code-02, label-01, label-02

var legal01$1 = {
  fontSize: rem(scale[0]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.33333,
  letterSpacing: px(0.32)
};
var legal02$1 = {
  fontSize: rem(scale[1]),
  fontWeight: fontWeights.regular,
  lineHeight: 1.28572,
  letterSpacing: px(0.16)
}; // Body styles

var bodyCompact01$1 = bodyShort01$1;
var bodyCompact02$1 = bodyShort02$1;
var body01$1 = bodyLong01$1;
var body02$1 = bodyLong02$1; // Fixed heading styles

var headingCompact01$1 = productiveHeading01$1;
var headingCompact02$1 = productiveHeading02$1;
var heading03$1 = productiveHeading03$1;
var heading04$1 = productiveHeading04$1;
var heading05$1 = productiveHeading05$1;
var heading06$1 = productiveHeading06$1;
var heading07$1 = productiveHeading07$1; // Fluid heading styles

var fluidHeading03$1 = expressiveHeading03$1;
var fluidHeading04$1 = expressiveHeading04$1;
var fluidHeading05$1 = expressiveHeading05$1;
var fluidHeading06$1 = expressiveHeading06$1; // Additional fluid styles

var fluidParagraph01$1 = expressiveParagraph01$1;
var fluidQuotation01$1 = quotation01$1;
var fluidQuotation02$1 = quotation02$1;
var fluidDisplay01$1 = display01$1;
var fluidDisplay02$1 = display02$1;
var fluidDisplay03$1 = display03$1;
var fluidDisplay04$1 = display04$1;

var styles = /*#__PURE__*/Object.freeze({
  __proto__: null,
  caption01: caption01$1,
  caption02: caption02$1,
  label01: label01$1,
  label02: label02$1,
  helperText01: helperText01$1,
  helperText02: helperText02$1,
  bodyShort01: bodyShort01$1,
  bodyLong01: bodyLong01$1,
  bodyShort02: bodyShort02$1,
  bodyLong02: bodyLong02$1,
  code01: code01$1,
  code02: code02$1,
  heading01: heading01$1,
  productiveHeading01: productiveHeading01$1,
  heading02: heading02$1,
  productiveHeading02: productiveHeading02$1,
  productiveHeading03: productiveHeading03$1,
  productiveHeading04: productiveHeading04$1,
  productiveHeading05: productiveHeading05$1,
  productiveHeading06: productiveHeading06$1,
  productiveHeading07: productiveHeading07$1,
  expressiveHeading01: expressiveHeading01$1,
  expressiveHeading02: expressiveHeading02$1,
  expressiveHeading03: expressiveHeading03$1,
  expressiveHeading04: expressiveHeading04$1,
  expressiveHeading05: expressiveHeading05$1,
  expressiveHeading06: expressiveHeading06$1,
  expressiveParagraph01: expressiveParagraph01$1,
  quotation01: quotation01$1,
  quotation02: quotation02$1,
  display01: display01$1,
  display02: display02$1,
  display03: display03$1,
  display04: display04$1,
  legal01: legal01$1,
  legal02: legal02$1,
  bodyCompact01: bodyCompact01$1,
  bodyCompact02: bodyCompact02$1,
  body01: body01$1,
  body02: body02$1,
  headingCompact01: headingCompact01$1,
  headingCompact02: headingCompact02$1,
  heading03: heading03$1,
  heading04: heading04$1,
  heading05: heading05$1,
  heading06: heading06$1,
  heading07: heading07$1,
  fluidHeading03: fluidHeading03$1,
  fluidHeading04: fluidHeading04$1,
  fluidHeading05: fluidHeading05$1,
  fluidHeading06: fluidHeading06$1,
  fluidParagraph01: fluidParagraph01$1,
  fluidQuotation01: fluidQuotation01$1,
  fluidQuotation02: fluidQuotation02$1,
  fluidDisplay01: fluidDisplay01$1,
  fluidDisplay02: fluidDisplay02$1,
  fluidDisplay03: fluidDisplay03$1,
  fluidDisplay04: fluidDisplay04$1
});

var _excluded = ["breakpoints"];
var breakpointNames = Object.keys(breakpoints);

function next(name) {
  return breakpointNames[breakpointNames.indexOf(name) + 1];
}

function fluid(selector) {
  var fluidBreakpoints = selector.breakpoints,
      styles = _objectWithoutProperties(selector, _excluded);

  if (_typeof(fluidBreakpoints) !== 'object') {
    return styles;
  }

  var fluidBreakpointNames = Object.keys(fluidBreakpoints);

  if (fluidBreakpointNames.length === 0) {
    return styles;
  }

  styles.fontSize = fluidTypeSize(styles, 'sm', fluidBreakpoints);
  fluidBreakpointNames.forEach(function (name) {
    styles[breakpoint(name)] = _objectSpread2(_objectSpread2({}, fluidBreakpoints[name]), {}, {
      fontSize: fluidTypeSize(styles, name, fluidBreakpoints)
    });
  });
  return styles;
}

function fluidTypeSize(defaultStyles, fluidBreakpointName, fluidBreakpoints) {
  var breakpoint = breakpoints[fluidBreakpointName];
  var fluidBreakpoint = fluidBreakpointName === 'sm' ? defaultStyles : fluidBreakpoints[fluidBreakpointName];
  var maxFontSize = defaultStyles.fontSize;
  var minFontSize = defaultStyles.fontSize;

  if (fluidBreakpoint.fontSize) {
    minFontSize = fluidBreakpoint.fontSize;
  }

  var maxViewportWidth = breakpoint.width;
  var minViewportWidth = breakpoint.width;
  var nextBreakpointAvailable = next(fluidBreakpointName);
  var nextFluidBreakpointName = null;

  while (nextBreakpointAvailable) {
    if (fluidBreakpoints[nextBreakpointAvailable]) {
      nextFluidBreakpointName = nextBreakpointAvailable;
      break;
    }

    nextBreakpointAvailable = next(nextBreakpointAvailable);
  }

  if (nextFluidBreakpointName) {
    var nextFluidBreakpoint = breakpoints[nextFluidBreakpointName];
    maxFontSize = fluidBreakpoints[nextFluidBreakpointName].fontSize;
    maxViewportWidth = nextFluidBreakpoint.width;
    return "calc(".concat(minFontSize, " + ").concat(subtract(maxFontSize, minFontSize), " * ((100vw - ").concat(minViewportWidth, ") / ").concat(subtract(maxViewportWidth, minViewportWidth), "))");
  }

  return minFontSize;
}

function subtract(a, b) {
  return parseFloat(a) - parseFloat(b);
}

/**
 * Copyright IBM Corp. 2018, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Unstable tokens
var caption01 = 'caption01';
var caption02 = 'caption02';
var label01 = 'label01';
var label02 = 'label02';
var helperText01 = 'helperText01';
var helperText02 = 'helperText02';
var bodyShort01 = 'bodyShort01';
var bodyLong01 = 'bodyLong01';
var bodyShort02 = 'bodyShort02';
var bodyLong02 = 'bodyLong02';
var code01 = 'code01';
var code02 = 'code02';
var heading01 = 'heading01';
var productiveHeading01 = 'productiveHeading01';
var heading02 = 'heading02';
var productiveHeading02 = 'productiveHeading02';
var productiveHeading03 = 'productiveHeading03';
var productiveHeading04 = 'productiveHeading04';
var productiveHeading05 = 'productiveHeading05';
var productiveHeading06 = 'productiveHeading06';
var productiveHeading07 = 'productiveHeading07';
var expressiveHeading01 = 'expressiveHeading01';
var expressiveHeading02 = 'expressiveHeading02';
var expressiveHeading03 = 'expressiveHeading03';
var expressiveHeading04 = 'expressiveHeading04';
var expressiveHeading05 = 'expressiveHeading05';
var expressiveHeading06 = 'expressiveHeading06';
var expressiveParagraph01 = 'expressiveParagraph01';
var quotation01 = 'quotation01';
var quotation02 = 'quotation02';
var display01 = 'display01';
var display02 = 'display02';
var display03 = 'display03';
var display04 = 'display04'; // V11 Tokens

var legal01 = 'legal01';
var legal02 = 'legal02';
var bodyCompact01 = 'bodyCompact01';
var bodyCompact02 = 'bodyCompact02';
var body01 = 'body01';
var body02 = 'body02';
var headingCompact01 = 'headingCompact01';
var headingCompact02 = 'headingCompact02';
var heading03 = 'heading03';
var heading04 = 'heading04';
var heading05 = 'heading05';
var heading06 = 'heading06';
var heading07 = 'heading07';
var fluidHeading03 = 'fluidHeading03';
var fluidHeading04 = 'fluidHeading04';
var fluidHeading05 = 'fluidHeading05';
var fluidHeading06 = 'fluidHeading06';
var fluidParagraph01 = 'fluidParagraph01';
var fluidQuotation01 = 'fluidQuotation01';
var fluidQuotation02 = 'fluidQuotation02';
var fluidDisplay01 = 'fluidDisplay01';
var fluidDisplay02 = 'fluidDisplay02';
var fluidDisplay03 = 'fluidDisplay03';
var fluidDisplay04 = 'fluidDisplay04';
var unstable_tokens = [caption01, caption02, label01, label02, helperText01, helperText02, bodyShort01, bodyLong01, bodyShort02, bodyLong02, code01, code02, heading01, productiveHeading01, heading02, productiveHeading02, productiveHeading03, productiveHeading04, productiveHeading05, productiveHeading06, productiveHeading07, expressiveHeading01, expressiveHeading02, expressiveHeading03, expressiveHeading04, expressiveHeading05, expressiveHeading06, expressiveParagraph01, quotation01, quotation02, display01, display02, display03, display04, // V11 Tokens
legal01, legal02, bodyCompact01, bodyCompact02, body01, body02, headingCompact01, headingCompact02, heading03, heading04, heading05, heading06, heading07, fluidHeading03, fluidHeading04, fluidHeading05, fluidHeading06, fluidParagraph01, fluidQuotation01, fluidQuotation02, fluidDisplay01, fluidDisplay02, fluidDisplay03, fluidDisplay04];

exports.body01 = body01$1;
exports.body02 = body02$1;
exports.bodyCompact01 = bodyCompact01$1;
exports.bodyCompact02 = bodyCompact02$1;
exports.bodyLong01 = bodyLong01$1;
exports.bodyLong02 = bodyLong02$1;
exports.bodyShort01 = bodyShort01$1;
exports.bodyShort02 = bodyShort02$1;
exports.caption01 = caption01$1;
exports.caption02 = caption02$1;
exports.code01 = code01$1;
exports.code02 = code02$1;
exports.display01 = display01$1;
exports.display02 = display02$1;
exports.display03 = display03$1;
exports.display04 = display04$1;
exports.expressiveHeading01 = expressiveHeading01$1;
exports.expressiveHeading02 = expressiveHeading02$1;
exports.expressiveHeading03 = expressiveHeading03$1;
exports.expressiveHeading04 = expressiveHeading04$1;
exports.expressiveHeading05 = expressiveHeading05$1;
exports.expressiveHeading06 = expressiveHeading06$1;
exports.expressiveParagraph01 = expressiveParagraph01$1;
exports.fluid = fluid;
exports.fluidDisplay01 = fluidDisplay01$1;
exports.fluidDisplay02 = fluidDisplay02$1;
exports.fluidDisplay03 = fluidDisplay03$1;
exports.fluidDisplay04 = fluidDisplay04$1;
exports.fluidHeading03 = fluidHeading03$1;
exports.fluidHeading04 = fluidHeading04$1;
exports.fluidHeading05 = fluidHeading05$1;
exports.fluidHeading06 = fluidHeading06$1;
exports.fluidParagraph01 = fluidParagraph01$1;
exports.fluidQuotation01 = fluidQuotation01$1;
exports.fluidQuotation02 = fluidQuotation02$1;
exports.fontFamilies = fontFamilies;
exports.fontFamily = fontFamily;
exports.fontWeight = fontWeight;
exports.fontWeights = fontWeights;
exports.getTypeSize = getTypeSize;
exports.heading01 = heading01$1;
exports.heading02 = heading02$1;
exports.heading03 = heading03$1;
exports.heading04 = heading04$1;
exports.heading05 = heading05$1;
exports.heading06 = heading06$1;
exports.heading07 = heading07$1;
exports.headingCompact01 = headingCompact01$1;
exports.headingCompact02 = headingCompact02$1;
exports.helperText01 = helperText01$1;
exports.helperText02 = helperText02$1;
exports.label01 = label01$1;
exports.label02 = label02$1;
exports.legal01 = legal01$1;
exports.legal02 = legal02$1;
exports.print = print;
exports.productiveHeading01 = productiveHeading01$1;
exports.productiveHeading02 = productiveHeading02$1;
exports.productiveHeading03 = productiveHeading03$1;
exports.productiveHeading04 = productiveHeading04$1;
exports.productiveHeading05 = productiveHeading05$1;
exports.productiveHeading06 = productiveHeading06$1;
exports.productiveHeading07 = productiveHeading07$1;
exports.quotation01 = quotation01$1;
exports.quotation02 = quotation02$1;
exports.reset = reset;
exports.scale = scale;
exports.styles = styles;
exports.unstable_tokens = unstable_tokens;
