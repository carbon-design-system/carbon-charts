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


import mixin from '../../globals/js/misc/mixin';
import createComponent from '../../globals/js/mixins/create-component';
import settings from '../../globals/js/settings';
import initComponentBySearch from '../../globals/js/mixins/init-component-by-search';
import handles from '../../globals/js/mixins/handles';
import on from '../../globals/js/misc/on';
import eventMatches from '../../globals/js/misc/event-matches';
var prefix = settings.prefix;

var SideNav =
/*#__PURE__*/
function (_mixin) {
  _inherits(SideNav, _mixin);
  /**
   * The map associating DOM element and copy button UI instance.
   * @member SideNav.components
   * @type {WeakMap}
   */


  function SideNav(element, options) {
    var _this;

    _classCallCheck(this, SideNav);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SideNav).call(this, element, options));

    _this._handleClick = function (evt) {
      var matchesToggle = eventMatches(evt, _this.options.selectorSideNavToggle);
      var matchesNavSubmenu = eventMatches(evt, _this.options.selectorSideNavSubmenu);
      var matchesSideNavLink = eventMatches(evt, _this.options.selectorSideNavLink);

      if (!matchesToggle && !matchesNavSubmenu && !matchesSideNavLink) {
        return;
      }

      if (matchesToggle) {
        _this.changeState(!_this.isNavExpanded() ? _this.constructor.state.EXPANDED : _this.constructor.state.COLLAPSED);

        return;
      }

      if (matchesNavSubmenu) {
        var isSubmenuExpanded = matchesNavSubmenu.getAttribute('aria-expanded') === 'true';
        matchesNavSubmenu.setAttribute('aria-expanded', "".concat(!isSubmenuExpanded));
        return;
      }

      if (matchesSideNavLink) {
        _toConsumableArray(_this.element.querySelectorAll(_this.options.selectorSideNavLinkCurrent)).forEach(function (el) {
          el.classList.remove(_this.options.classSideNavItemActive, _this.options.classSideNavLinkCurrent);
          el.removeAttribute('aria-current');
        });

        matchesSideNavLink.classList.add(_this.options.classSideNavLinkCurrent);
        var closestSideNavItem = matchesSideNavLink.closest(_this.options.selectorSideNavItem);

        if (closestSideNavItem) {
          closestSideNavItem.classList.add(_this.options.classSideNavItemActive);
        }
      }
    };

    _this.manage(on(element, 'click', _this._handleClick));

    return _this;
  }
  /**
   * Enum for toggling side nav visibility
   * @readonly
   * @member SideNav.state
   * @type {Object}
   * @property {string} EXPANDED Opening/visible
   * @property {string} COLLAPSED Closing/hidden
   */


  _createClass(SideNav, [{
    key: "isNavExpanded",

    /**
     * @returns {boolean} `true` if the nav is expanded.
     */
    value: function isNavExpanded() {
      return this.element.classList.contains(this.options.classSideNavExpanded);
    }
    /**
     * Changes the expanded/collapsed state.
     */

  }, {
    key: "changeState",
    value: function changeState(state) {
      this.element.classList.toggle(this.options.classSideNavExpanded, state === this.constructor.state.EXPANDED);
    }
  }]);

  SideNav.components = new WeakMap();
  SideNav.state = {
    EXPANDED: 'expanded',
    COLLAPSED: 'collapsed'
  };
  SideNav.options = {
    selectorInit: '[data-side-nav]',
    selectorSideNavToggle: ".".concat(prefix, "--side-nav__toggle"),
    selectorSideNavSubmenu: ".".concat(prefix, "--side-nav__submenu"),
    selectorSideNavItem: ".".concat(prefix, "--side-nav__item"),
    selectorSideNavLink: ".".concat(prefix, "--side-nav__link"),
    selectorSideNavLinkCurrent: "[aria-current=\"page\"],.".concat(prefix, "--side-nav__link--current,.").concat(prefix, "--side-nav__item--active"),
    classSideNavExpanded: "".concat(prefix, "--side-nav--expanded"),
    classSideNavItemActive: "".concat(prefix, "--side-nav__item--active"),
    classSideNavLinkCurrent: "".concat(prefix, "--side-nav__link--current")
  };
  return SideNav;
}(mixin(createComponent, initComponentBySearch, handles));

export { SideNav as default };