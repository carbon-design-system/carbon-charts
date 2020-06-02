function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}
/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * @param {Array} a An array.
 * @returns {Array} The flattened version of the given array.
 */


function flatten(a) {
  return a.reduce(function (result, item) {
    if (Array.isArray(item)) {
      result.push.apply(result, _toConsumableArray(flatten(item)));
    } else {
      result.push(item);
    }

    return result;
  }, []);
}
/**
 * An interface for defining mix-in classes. Used with {@link mixin}.
 * @function mixinfn
 * @param {Class} ToMix The class to mix.
 * @returns {Class} The class mixed-in with the given ToMix class.
 */

/**
 * @function mixin
 * @param {...mixinfn} mixinfns The functions generating mix-ins.
 * @returns {Class} The class generated with the given mix-ins.
 */


export default function mixin() {
  for (var _len = arguments.length, mixinfns = new Array(_len), _key = 0; _key < _len; _key++) {
    mixinfns[_key] = arguments[_key];
  }

  return flatten(mixinfns).reduce(function (Class, mixinfn) {
    return mixinfn(Class);
  },
  /*#__PURE__*/
  function () {
    function _class() {
      _classCallCheck(this, _class);
    }

    return _class;
  }());
}