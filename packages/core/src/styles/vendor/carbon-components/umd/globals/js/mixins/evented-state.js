(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.eventedState = mod.exports;
  }
})(this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = _default;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }
  /**
   * Copyright IBM Corp. 2016, 2018
   *
   * This source code is licensed under the Apache-2.0 license found in the
   * LICENSE file in the root directory of this source tree.
   */


  function _default(ToMix) {
    /**
     * Mix-in class to manage events associated with states.
     * @class EventedState
     */
    var EventedState =
    /*#__PURE__*/
    function (_ToMix) {
      _inherits(EventedState, _ToMix);

      function EventedState() {
        _classCallCheck(this, EventedState);

        return _possibleConstructorReturn(this, _getPrototypeOf(EventedState).apply(this, arguments));
      }

      _createClass(EventedState, [{
        key: "_changeState",

        /* eslint-disable jsdoc/check-param-names */

        /**
         * The internal implementation for {@link EventedState#changeState `.changeState()`}, performing actual change in state.
         * @param {string} [state] The new state. Can be an omitted, which means toggling.
         * @param {object} [detail]
         *   The object that should be put to event details that is fired before/after changing state.
         *   Can have a `group` property, which specifies what state to be changed.
         * @param {EventedState~changeStateCallback} callback The callback called once changing state is finished or is canceled.
         * @private
         */
        value: function _changeState() {
          throw new Error('_changeState() should be overriden to perform actual change in state.');
        }
        /**
         * Changes the state of this component.
         * @param {string} [state] The new state. Can be an omitted, which means toggling.
         * @param {object} [detail]
         *   The object that should be put to event details that is fired before/after changing state.
         *   Can have a `group` property, which specifies what state to be changed.
         * @param {EventedState~changeStateCallback} [callback] The callback called once changing state is finished or is canceled.
         */

      }, {
        key: "changeState",
        value: function changeState() {
          var _this = this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var state = typeof args[0] === 'string' ? args.shift() : undefined;
          var detail = Object(args[0]) === args[0] && typeof args[0] !== 'function' ? args.shift() : undefined;
          var callback = typeof args[0] === 'function' ? args.shift() : undefined;

          if (typeof this.shouldStateBeChanged === 'function' && !this.shouldStateBeChanged(state, detail)) {
            if (callback) {
              callback(null, true);
            }

            return;
          }

          var data = {
            group: detail && detail.group,
            state: state
          };
          var eventNameSuffix = [data.group, state].filter(Boolean).join('-').split('-') // Group or state may contain hyphen
          .map(function (item) {
            return item[0].toUpperCase() + item.substr(1);
          }).join('');
          var eventStart = new CustomEvent(this.options["eventBefore".concat(eventNameSuffix)], {
            bubbles: true,
            cancelable: true,
            detail: detail
          });
          var fireOnNode = detail && detail.delegatorNode || this.element;
          var canceled = !fireOnNode.dispatchEvent(eventStart);

          if (canceled) {
            if (callback) {
              var error = new Error("Changing state (".concat(JSON.stringify(data), ") has been canceled."));
              error.canceled = true;
              callback(error);
            }
          } else {
            var changeStateArgs = [state, detail].filter(Boolean);

            this._changeState.apply(this, _toConsumableArray(changeStateArgs).concat([function () {
              fireOnNode.dispatchEvent(new CustomEvent(_this.options["eventAfter".concat(eventNameSuffix)], {
                bubbles: true,
                cancelable: true,
                detail: detail
              }));

              if (callback) {
                callback();
              }
            }]));
          }
        }
        /* eslint-enable jsdoc/check-param-names */

        /**
         * Tests if change in state should happen or not.
         * Classes inheriting {@link EventedState `EventedState`} should override this function.
         * @function EventedState#shouldStateBeChanged
         * @param {string} [state] The new state. Can be an omitted, which means toggling.
         * @param {Object} [detail]
         *   The object that should be put to event details that is fired before/after changing state.
         *   Can have a `group` property, which specifies what state to be changed.
         * @returns {boolean}
         *   `false` if change in state shouldn't happen, e.g. when the given new state is the same as the current one.
         */

      }]);

      return EventedState;
    }(ToMix);
    /**
     * The callback called once changing state is finished or is canceled.
     * @callback EventedState~changeStateCallback
     * @param {Error} error
     *   An error object with `true` in its `canceled` property if changing state is canceled.
     *   Cancellation happens if the handler of a custom event, that is fired before changing state happens,
     *   calls `.preventDefault()` against the event.
     * @param {boolean} keptState
     *   `true` if the call to {@link EventedState#changeState `.changeState()`} didn't cause actual change in state.
     */


    return EventedState;
  }
});