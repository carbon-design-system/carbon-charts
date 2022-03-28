function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
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
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
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
  Object.defineProperty(subClass, "prototype", {
    writable: false
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

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import warning from 'warning';
import settings from '../../globals/js/settings';
import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import initComponentByLauncher from '../../globals/js/mixins/init-component-by-launcher';
import eventedShowHideState from '../../globals/js/mixins/evented-show-hide-state';
import handles from '../../globals/js/mixins/handles';
import eventMatches from '../../globals/js/misc/event-matches';
import on from '../../globals/js/misc/on';

var Modal = /*#__PURE__*/function (_mixin) {
  _inherits(Modal, _mixin);

  var _super = _createSuper(Modal);
  /**
   * Modal dialog.
   * @extends CreateComponent
   * @extends InitComponentByLauncher
   * @extends EventedShowHideState
   * @extends Handles
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {object} [options] The component options.
   * @param {string} [options.classVisible] The CSS class for the visible state.
   * @param {string} [options.classBody] The CSS class for `<body>` with open modal.
   * @param {string} [options.eventBeforeShown]
   *   The name of the custom event fired before this modal is shown.
   *   Cancellation of this event stops showing the modal.
   * @param {string} [options.eventAfterShown]
   *   The name of the custom event telling that modal is sure shown
   *   without being canceled by the event handler named by `eventBeforeShown` option (`modal-beingshown`).
   * @param {string} [options.eventBeforeHidden]
   *   The name of the custom event fired before this modal is hidden.
   *   Cancellation of this event stops hiding the modal.
   * @param {string} [options.eventAfterHidden]
   *   The name of the custom event telling that modal is sure hidden
   *   without being canceled by the event handler named by `eventBeforeHidden` option (`modal-beinghidden`).
   */


  /**
   * Modal dialog.
   * @extends CreateComponent
   * @extends InitComponentByLauncher
   * @extends EventedShowHideState
   * @extends Handles
   * @param {HTMLElement} element The element working as a modal dialog.
   * @param {object} [options] The component options.
   * @param {string} [options.classVisible] The CSS class for the visible state.
   * @param {string} [options.classBody] The CSS class for `<body>` with open modal.
   * @param {string} [options.eventBeforeShown]
   *   The name of the custom event fired before this modal is shown.
   *   Cancellation of this event stops showing the modal.
   * @param {string} [options.eventAfterShown]
   *   The name of the custom event telling that modal is sure shown
   *   without being canceled by the event handler named by `eventBeforeShown` option (`modal-beingshown`).
   * @param {string} [options.eventBeforeHidden]
   *   The name of the custom event fired before this modal is hidden.
   *   Cancellation of this event stops hiding the modal.
   * @param {string} [options.eventAfterHidden]
   *   The name of the custom event telling that modal is sure hidden
   *   without being canceled by the event handler named by `eventBeforeHidden` option (`modal-beinghidden`).
   */
  function Modal(element, options) {
    var _this;

    _classCallCheck(this, Modal);

    _this = _super.call(this, element, options);
    _this._handleFocusinListener = void 0;
    _this._handleKeydownListener = void 0;

    _this._handleFocusin = function (evt) {
      var focusWrapNode = _this.element.querySelector(_this.options.selectorModalContainer) || _this.element;

      if (_this.element.classList.contains(_this.options.classVisible) && !focusWrapNode.contains(evt.target) && _this.options.selectorsFloatingMenus.every(function (selector) {
        return !eventMatches(evt, selector);
      })) {
        _this.element.querySelector(settings.selectorTabbable).focus();
      }
    };

    _this._hookCloseActions();

    return _this;
  }
  /**
   * The handle for `focusin` event listener.
   * Used for "focus-wrap" feature.
   * @type {Handle}
   * @private
   */


  /**
   * The handle for `focusin` event listener.
   * Used for "focus-wrap" feature.
   * @type {Handle}
   * @private
   */
  _createClass(Modal, [{
    key: "createdByLauncher",
    value:
    /**
     * A method that runs when `.init()` is called from `initComponentByLauncher`.
     * @param {Event} evt The event fired on the launcher button.
     */
    function createdByLauncher(evt) {
      this.show(evt);
    }
    /**
     * Determines whether or not to emit events and callback function when `.changeState()` is called from `eventedState`.
     * @param {string} state The new state.
     * @returns {boolean} `true` if the given `state` is different from current state.
     */

  }, {
    key: "shouldStateBeChanged",
    value: function shouldStateBeChanged(state) {
      if (state === 'shown') {
        return !this.element.classList.contains(this.options.classVisible);
      }

      return this.element.classList.contains(this.options.classVisible);
    }
    /**
     * Changes the shown/hidden state.
     * @private
     * @param {string} state The new state.
     * @param {object} detail The detail data to be included in the event that will be fired.
     * @param {Function} callback Callback called when change in state completes.
     */

  }, {
    key: "_changeState",
    value: function _changeState(state, detail, callback) {
      var _this2 = this;

      var handleTransitionEnd;

      var transitionEnd = function transitionEnd() {
        if (handleTransitionEnd) {
          handleTransitionEnd = _this2.unmanage(handleTransitionEnd).release();
        }

        if (state === 'shown' && _this2.element.offsetWidth > 0 && _this2.element.offsetHeight > 0) {
          _this2.previouslyFocusedNode = _this2.element.ownerDocument.activeElement;

          var focusableItem = _this2.element.querySelector(_this2.options.selectorPrimaryFocus) || _this2.element.querySelector(settings.selectorTabbable);

          focusableItem.focus();

          if (process.env.NODE_ENV !== "production") {
            process.env.NODE_ENV !== "production" ? warning(focusableItem, "Modals need to contain a focusable element by either using " + "`".concat(_this2.options.selectorPrimaryFocus, "` or settings.selectorTabbable.")) : void 0;
          }
        }

        callback();
      };

      if (this._handleFocusinListener) {
        this._handleFocusinListener = this.unmanage(this._handleFocusinListener).release();
      }

      if (state === 'shown') {
        var hasFocusin = ('onfocusin' in this.element.ownerDocument.defaultView);
        var focusinEventName = hasFocusin ? 'focusin' : 'focus';
        this._handleFocusinListener = this.manage(on(this.element.ownerDocument, focusinEventName, this._handleFocusin, !hasFocusin));
      }

      if (state === 'hidden') {
        this.element.classList.toggle(this.options.classVisible, false);
        this.element.ownerDocument.body.classList.toggle(this.options.classBody, false);

        if (this.options.selectorFocusOnClose || this.previouslyFocusedNode) {
          (this.element.ownerDocument.querySelector(this.options.selectorFocusOnClose) || this.previouslyFocusedNode).focus();
        }
      } else if (state === 'shown') {
        this.element.classList.toggle(this.options.classVisible, true);
        this.element.ownerDocument.body.classList.toggle(this.options.classBody, true);
      }

      handleTransitionEnd = this.manage(on(this.element, 'transitionend', transitionEnd));
    }
  }, {
    key: "_hookCloseActions",
    value: function _hookCloseActions() {
      var _this3 = this;

      this.manage(on(this.element, 'click', function (evt) {
        var closeButton = eventMatches(evt, _this3.options.selectorModalClose);

        if (closeButton) {
          evt.delegateTarget = closeButton; // eslint-disable-line no-param-reassign
        }

        if (closeButton || evt.target === _this3.element) {
          _this3.hide(evt);
        }
      }));

      if (this._handleKeydownListener) {
        this._handleKeydownListener = this.unmanage(this._handleKeydownListener).release();
      }

      this._handleKeydownListener = this.manage(on(this.element.ownerDocument.body, 'keydown', function (evt) {
        // Avoid running `evt.stopPropagation()` only when modal is shown
        if (evt.which === 27 && _this3.shouldStateBeChanged('hidden')) {
          evt.stopPropagation();

          _this3.hide(evt);
        }
      }));
    }
    /**
     * Handles `focusin` (or `focus` depending on browser support of `focusin`) event to do wrap-focus behavior.
     * @param {Event} evt The event.
     * @private
     */

  }], [{
    key: "options",
    get:
    /**
     * The component options.
     * If `options` is specified in the constructor, {@linkcode Modal.create .create()}, or {@linkcode Modal.init .init()},
     * properties in this object are overridden for the instance being create and how {@linkcode Modal.init .init()} works.
     * @member Modal.options
     * @type {object}
     * @property {string} selectorInit The CSS class to find modal dialogs.
     * @property {string} [selectorModalClose] The selector to find elements that close the modal.
     * @property {string} [selectorPrimaryFocus] The CSS selector to determine the element to put focus when modal gets open.
     * @property {string} [selectorFocusOnClose] The CSS selector to determine the element to put focus when modal closes.
     *   If undefined, focus returns to the previously focused element prior to the modal opening.
     * @property {string} [selectorModalContainer] The CSS selector for the content container of the modal for focus wrap feature.
     * @property {string} attribInitTarget The attribute name in the launcher buttons to find target modal dialogs.
     * @property {string[]} [selectorsFloatingMenu]
     *   The CSS selectors of floating menus.
     *   Used for detecting if focus-wrap behavior should be disabled temporarily.
     * @property {string} [classVisible] The CSS class for the visible state.
     * @property {string} [classBody] The CSS class for `<body>` with open modal.
     * @property {string} [classNoScroll] The CSS class for hiding scroll bar in body element while modal is shown.
     * @property {string} [eventBeforeShown]
     *   The name of the custom event fired before this modal is shown.
     *   Cancellation of this event stops showing the modal.
     * @property {string} [eventAfterShown]
     *   The name of the custom event telling that modal is sure shown
     *   without being canceled by the event handler named by `eventBeforeShown` option (`modal-beingshown`).
     * @property {string} [eventBeforeHidden]
     *   The name of the custom event fired before this modal is hidden.
     *   Cancellation of this event stops hiding the modal.
     * @property {string} [eventAfterHidden]
     *   The name of the custom event telling that modal is sure hidden
     *   without being canceled by the event handler named by `eventBeforeHidden` option (`modal-beinghidden`).
     */
    function get() {
      var prefix = settings.prefix;
      return {
        selectorInit: '[data-modal]',
        selectorModalClose: '[data-modal-close]',
        selectorPrimaryFocus: '[data-modal-primary-focus]',
        selectorsFloatingMenus: [".".concat(prefix, "--overflow-menu-options"), ".".concat(prefix, "--tooltip"), '.flatpickr-calendar'],
        selectorModalContainer: ".".concat(prefix, "--modal-container"),
        classVisible: 'is-visible',
        classBody: "".concat(prefix, "--body--with-modal-open"),
        attribInitTarget: 'data-modal-target',
        initEventNames: ['click'],
        eventBeforeShown: 'modal-beingshown',
        eventAfterShown: 'modal-shown',
        eventBeforeHidden: 'modal-beinghidden',
        eventAfterHidden: 'modal-hidden'
      };
    }
  }]);

  Modal.components = new WeakMap();
  return Modal;
}(mixin(createComponent, initComponentByLauncher, eventedShowHideState, handles));

export default Modal;