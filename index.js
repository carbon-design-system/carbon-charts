(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Charts"] = factory();
	else
		root["Charts"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonpCharts"] = window["webpackJsonpCharts"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./demo/index.ts","vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/demo-data/bar.ts":
/*!*******************************!*\
  !*** ./demo/demo-data/bar.ts ***!
  \*******************************/
/*! exports provided: groupedBarData, groupedBarOptions, simpleBarData, simpleBarOptions, stackedBarData, stackedBarOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupedBarData", function() { return groupedBarData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupedBarOptions", function() { return groupedBarOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simpleBarData", function() { return simpleBarData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simpleBarOptions", function() { return simpleBarOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stackedBarData", function() { return stackedBarData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stackedBarOptions", function() { return stackedBarOptions; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./demo/demo-data/colors.ts");

var groupedBarData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
            data: [
                65000,
                -29123,
                -35213,
                51213,
                16932
            ]
        },
        {
            label: "Dataset 2",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
            data: [
                32432,
                -21312,
                -56456,
                -21312,
                34234
            ]
        },
        {
            label: "Dataset 3",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
            data: [
                -12312,
                23232,
                34232,
                -12312,
                -34234
            ]
        },
        {
            label: "Dataset 4",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][3]],
            data: [
                -32423,
                21313,
                64353,
                24134,
                32423
            ]
        }
    ]
};
var groupedBarOptions = {
    scales: {
        x: {
            title: "2018 Annual Sales Figures",
        },
        y: {
            formatter: function (axisValue) { return axisValue / 1000 + "k"; },
            yMaxAdjuster: function (yMaxValue) { return yMaxValue * 1.1; },
        },
        y2: {
            ticks: {
                max: 1,
                min: 0
            },
            formatter: function (axisValue) { return axisValue * 100 + "%"; }
        }
    },
    legendClickable: true,
    containerResizable: true
};
// Simple bar
var simpleBarData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            backgroundColors: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"],
            data: [
                65000,
                29123,
                35213,
                51213,
                16932
            ]
        }
    ]
};
var simpleBarOptions = {
    accessibility: false,
    scales: {
        x: {
            title: "2018 Annual Sales Figures",
        },
        y: {
            formatter: function (axisValue) { return axisValue / 1000 + "k"; },
            yMaxAdjuster: function (yMaxValue) { return yMaxValue * 1.1; },
            stacked: false
        }
    },
    legendClickable: true,
    containerResizable: true
};
// Stacked bar
var stackedBarData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
            data: [
                65000,
                29123,
                35213,
                51213,
                16932
            ]
        },
        {
            label: "Dataset 2",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
            data: [
                32432,
                21312,
                56456,
                21312,
                34234
            ]
        },
        {
            label: "Dataset 3",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
            data: [
                12312,
                23232,
                34232,
                12312,
                34234
            ]
        },
        {
            label: "Dataset 4",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][3]],
            data: [
                32423,
                21313,
                64353,
                24134,
                32423
            ]
        }
    ]
};
var stackedBarOptions = {
    accessibility: false,
    scales: {
        x: {
            title: "2018 Annual Sales Figures",
        },
        y: {
            formatter: function (axisValue) { return axisValue / 1000 + "k"; },
            yMaxAdjuster: function (yMaxValue) { return yMaxValue * 1.1; },
            stacked: true
        }
    },
    legendClickable: true,
    containerResizable: true
};


/***/ }),

/***/ "./demo/demo-data/colors.ts":
/*!**********************************!*\
  !*** ./demo/demo-data/colors.ts ***!
  \**********************************/
/*! exports provided: colors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return colors; });
var colors = [
    "#00a68f",
    "#3b1a40",
    "#473793",
    "#3c6df0",
    "#56D2BB"
    // 12 items needed
];


/***/ }),

/***/ "./demo/demo-data/combo.ts":
/*!*********************************!*\
  !*** ./demo/demo-data/combo.ts ***!
  \*********************************/
/*! exports provided: comboData, comboOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comboData", function() { return comboData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comboOptions", function() { return comboOptions; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./demo/demo-data/colors.ts");

var comboData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
            data: [
                65000,
                -29123,
                -35213,
                51213,
                16932
            ],
            chartType: "BarChart"
        },
        {
            label: "Dataset 2",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
            data: [
                -12312,
                23232,
                34232,
                -12312,
                -34234
            ],
            chartType: "BarChart"
        },
        {
            label: "Dataset 3",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][3]],
            data: [
                -32423,
                21313,
                64353,
                24134,
                32423
            ],
            chartType: "BarChart"
        },
        {
            label: "Dataset 4",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
            data: [
                32432,
                11312,
                3234,
                43534,
                34234
            ],
            chartType: "LineChart"
        }
    ]
};
var comboOptions = {
    scales: {
        x: {
            title: "2018 Annual Sales Figures",
        },
        y: {
            formatter: function (axisValue) { return axisValue / 1000 + "k"; },
            yMaxAdjuster: function (yMaxValue) { return yMaxValue * 1.1; },
        },
        y2: {
            ticks: {
                max: 70,
                min: -60
            }
        }
    },
    legendClickable: true,
    containerResizable: true
};


/***/ }),

/***/ "./demo/demo-data/index.ts":
/*!*********************************!*\
  !*** ./demo/demo-data/index.ts ***!
  \*********************************/
/*! exports provided: colors, groupedBarData, groupedBarOptions, simpleBarData, simpleBarOptions, stackedBarData, stackedBarOptions, pieOptions, donutOptions, pieData, curvedLineData, curvedLineOptions, lineData, lineOptions, comboData, comboOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./demo/demo-data/colors.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "colors", function() { return _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]; });

/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bar */ "./demo/demo-data/bar.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "groupedBarData", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["groupedBarData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "groupedBarOptions", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["groupedBarOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "simpleBarData", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["simpleBarData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "simpleBarOptions", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["simpleBarOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackedBarData", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["stackedBarData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackedBarOptions", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["stackedBarOptions"]; });

/* harmony import */ var _pie_donut__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pie-donut */ "./demo/demo-data/pie-donut.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pieOptions", function() { return _pie_donut__WEBPACK_IMPORTED_MODULE_2__["pieOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "donutOptions", function() { return _pie_donut__WEBPACK_IMPORTED_MODULE_2__["donutOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pieData", function() { return _pie_donut__WEBPACK_IMPORTED_MODULE_2__["pieData"]; });

/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./line */ "./demo/demo-data/line.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curvedLineData", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["curvedLineData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "curvedLineOptions", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["curvedLineOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lineData", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["lineData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lineOptions", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["lineOptions"]; });

/* harmony import */ var _combo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./combo */ "./demo/demo-data/combo.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "comboData", function() { return _combo__WEBPACK_IMPORTED_MODULE_4__["comboData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "comboOptions", function() { return _combo__WEBPACK_IMPORTED_MODULE_4__["comboOptions"]; });








/***/ }),

/***/ "./demo/demo-data/line.ts":
/*!********************************!*\
  !*** ./demo/demo-data/line.ts ***!
  \********************************/
/*! exports provided: curvedLineData, curvedLineOptions, lineData, lineOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curvedLineData", function() { return curvedLineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curvedLineOptions", function() { return curvedLineOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineData", function() { return lineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineOptions", function() { return lineOptions; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./demo/demo-data/colors.ts");

var curvedLineData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
            data: [
                65000,
                79000,
                49213,
                51213,
                16932
            ]
        },
        {
            label: "Dataset 2",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
            data: [
                80000,
                21312,
                56456,
                21312,
                0
            ]
        },
        {
            label: "Dataset 3",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
            data: [
                12312,
                34232,
                39232,
                12312,
                34234
            ]
        }
    ]
};
var curvedLineOptions = {
    accessibility: false,
    scales: {
        x: {
            title: "2018 Annual Sales Figures",
        },
        y: {
            yMaxAdjuster: function (yMax) { return yMax * 1.2; },
            yMinAdjuster: function (yMin) { return yMin * 1.2; },
            formatter: function (axisValue) { return axisValue / 1000 + "k"; }
        },
        y2: {
            ticks: {
                max: 1,
                min: 0
            }
        }
    },
    curve: "curveNatural",
    legendClickable: true,
    containerResizable: true
};
var lineData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
            data: [
                2000,
                4200,
                7000,
                4000,
                19000
            ]
        },
        {
            label: "Dataset 2",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
            data: [
                0,
                10000,
                20000,
                30000,
                40000
            ]
        },
        {
            label: "Dataset 3",
            backgroundColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
            data: [
                0,
                20000,
                40000,
                60000,
                80000
            ]
        }
    ]
};
var lineOptions = {
    accessibility: false,
    scales: {
        x: {
            title: "2018 Annual Sales Figures",
        },
        y: {
            yMaxAdjuster: function (yMax) { return yMax * 1.2; },
            yMinAdjuster: function (yMin) { return yMin * 1.2; },
            formatter: function (axisValue) { return axisValue / 1000 + "k"; },
            thresholds: [
                {
                    range: [-20000, 30000],
                    theme: "success"
                },
                {
                    range: [30000, 40000],
                    theme: "danger"
                },
                {
                    range: [40000, 70000],
                    theme: "warning"
                }
            ]
        }
    },
    legendClickable: true,
    containerResizable: true
};


/***/ }),

/***/ "./demo/demo-data/pie-donut.ts":
/*!*************************************!*\
  !*** ./demo/demo-data/pie-donut.ts ***!
  \*************************************/
/*! exports provided: pieOptions, donutOptions, pieData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pieOptions", function() { return pieOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "donutOptions", function() { return donutOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pieData", function() { return pieData; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./demo/demo-data/colors.ts");

var pieOptions = {
    accessibility: false,
    legendClickable: true,
    containerResizable: true,
    colors: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"]
};
var donutOptions = {
    accessibility: false,
    legendClickable: true,
    containerResizable: true,
    colors: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"],
    centerLabel: "Products"
};
var pieData = {
    labels: ["2V2N-9KYPM version 1", "L22I-P66EP-L22I-P66EP-L22I-P66EP", "JQAI-2M4L1", "J9DZ-F37AP",
        "YEL48-Q6XK-YEL48", "P66EP-L22I-L22I", "Q6XK-YEL48", "XKB5-L6EP", "YEL48-Q6XK", "L22I-P66EP-L22I"],
    datasets: [
        {
            label: "Dataset 1",
            backgroundColors: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"],
            data: [70000, 40000, 90000, 50000, 60000, 45000, 90000, 70000, 80000, 120000]
        }
    ]
};


/***/ }),

/***/ "./demo/index.scss":
/*!*************************!*\
  !*** ./demo/index.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./demo/index.ts":
/*!***********************!*\
  !*** ./demo/index.ts ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/index */ "./src/index.ts");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.scss */ "./demo/index.scss");
/* harmony import */ var _index_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_scss__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _demo_data_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo-data/index */ "./demo/demo-data/index.ts");

// Styles


var chartTypes = [
    {
        id: "grouped-bar",
        name: "Grouped Bar",
        options: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["groupedBarOptions"],
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["groupedBarData"]
    },
    {
        id: "simple-bar",
        name: "Bar",
        options: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["simpleBarOptions"],
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["simpleBarData"]
    },
    {
        id: "combo",
        name: "Combo",
        options: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["comboOptions"],
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["comboData"]
    },
    {
        id: "stacked-bar",
        name: "Bar",
        options: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["stackedBarOptions"],
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["stackedBarData"]
    },
    {
        id: "simple-bar-accessible",
        name: "Accessible Bar",
        options: Object.assign({}, _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["simpleBarOptions"], { accessibility: true }),
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["simpleBarData"]
    },
    {
        id: "stacked-bar-accessible",
        name: "Bar",
        options: Object.assign({}, _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["stackedBarOptions"], { accessibility: true }),
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["stackedBarData"]
    },
    {
        id: "curved-line",
        name: "Curved Line",
        options: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["curvedLineOptions"],
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["curvedLineData"]
    },
    {
        id: "line",
        name: "Line",
        options: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["lineOptions"],
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["lineData"]
    },
    {
        id: "line-step",
        name: "Step",
        options: Object.assign({}, _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["lineOptions"], { curve: "curveStepAfter" }),
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["lineData"]
    },
    {
        id: "pie",
        name: "pie",
        options: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["pieOptions"],
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["pieData"]
    },
    {
        id: "donut",
        name: "donut",
        options: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["donutOptions"],
        data: _demo_data_index__WEBPACK_IMPORTED_MODULE_2__["pieData"]
    }
];
var classyCharts = {};
// TODO - removeADataset shouldn't be used if chart legend is label based
var changeDemoData = function (chartType, oldData, delay) {
    var classyChartObject = classyCharts[chartType];
    var newData;
    var removeADataset = Math.random() > 0.5;
    // Function to be used to randomize a value
    var randomizeValue = function (currentVal) {
        var firstTry = Math.max(0.5 * currentVal, currentVal * Math.random() * (Math.random() * 5));
        var result = currentVal > 0 ? Math.min(2 * currentVal, firstTry) : Math.max(2 * currentVal, firstTry);
        if (Math.random() > 0.5
            || chartType.indexOf("stacked") !== -1
            || chartType.indexOf("pie") !== -1
            || chartType.indexOf("donut") !== -1) {
            return Math.floor(result);
        }
        else {
            return Math.floor(result) * -1;
        }
    };
    switch (chartType) {
        case "donut":
        case "pie":
            // Randomize old data values
            newData = Object.assign({}, oldData);
            newData.datasets = oldData.datasets.map(function (dataset) {
                var datasetNewData = dataset.data.map(function (dataPoint) { return randomizeValue(dataPoint); });
                var newDataset = Object.assign({}, dataset, { data: datasetNewData });
                return newDataset;
            });
            break;
        default:
        case "grouped-bar":
        case "simple-bar":
        case "simple-bar-accessible":
        case "stacked-bar":
        case "stacked-bar-accessible":
            newData = Object.assign({}, oldData);
            newData.datasets = oldData.datasets.map(function (dataset) {
                var datasetNewData = dataset.data.map(function (dataPoint) { return randomizeValue(dataPoint); });
                var newDataset = Object.assign({}, dataset, { data: datasetNewData });
                return newDataset;
            });
            if (removeADataset && chartType !== "combo") {
                var randomIndex = Math.floor(Math.random() * (newData.datasets.length - 1));
                newData.datasets.splice(randomIndex, randomIndex);
            }
            break;
    }
    // Handle setting the new data
    if (delay) {
        var dataPromise = new Promise(function (resolve, reject) {
            setTimeout(function () {
                resolve(newData);
            }, delay || 0);
        });
        classyChartObject.setData(dataPromise);
    }
    else {
        classyChartObject.setData(newData);
    }
};
var setDemoActionsEventListener = function (chartType, oldData) {
    var changeDataButton = document.getElementById("change-data-" + chartType);
    if (changeDataButton) {
        changeDataButton.onclick = function (e) {
            e.preventDefault();
            changeDemoData(chartType, oldData);
        };
        var actionsElement = document.getElementById("actions-" + chartType);
        if (actionsElement) {
            var changeDataPromiseButtons = Array.prototype.slice.call(actionsElement.querySelectorAll(".change-data-promise"));
            changeDataPromiseButtons.forEach(function (element) {
                element = element;
                element.onclick = function (e) {
                    e.preventDefault();
                    changeDemoData(chartType, oldData, parseInt(element.getAttribute("data-promise-delay"), 10));
                };
            });
        }
    }
};
chartTypes.forEach(function (type) {
    var classyContainer = document.getElementById("classy-" + type.id + "-chart-holder");
    if (classyContainer) {
        switch (type.id) {
            default:
            case "simple-bar":
            case "grouped-bar":
            case "stacked-bar":
            case "stacked-bar-accessible":
                classyCharts[type.id] = new _src_index__WEBPACK_IMPORTED_MODULE_0__["BarChart"](classyContainer, {
                    data: type.data,
                    options: Object.assign({}, type.options, { type: type.id }),
                });
                var chartObject = classyCharts[type.id];
                chartObject.events.addEventListener("bar-onClick", function (e) {
                    console.log("Bar chart - Bar clicked", e.detail);
                });
                chartObject.events.addEventListener("load", function (e) {
                    console.log("Bar Chart - LOADED");
                }, false);
                chartObject.events.addEventListener("update", function (e) {
                    console.log("Bar Chart - UPDATED");
                }, false);
                chartObject.events.addEventListener("data-change", function (e) {
                    console.log("Bar Chart - DATACHANGE");
                }, false);
                chartObject.events.addEventListener("data-load", function (e) {
                    console.log("Bar Chart - DATALOAD");
                }, false);
                chartObject.events.addEventListener("resize", function (e) {
                    console.log("Bar Chart - RESIZE");
                }, false);
                setDemoActionsEventListener(type.id, type.data);
                break;
            case "combo":
                classyCharts[type.id] = new _src_index__WEBPACK_IMPORTED_MODULE_0__["ComboChart"](classyContainer, {
                    data: type.data,
                    options: Object.assign({}, type.options, { type: type.id }),
                });
                setDemoActionsEventListener(type.id, type.data);
                break;
            case "curved-line":
            case "line":
            case "line-step":
                classyCharts[type.id] = new _src_index__WEBPACK_IMPORTED_MODULE_0__["LineChart"](classyContainer, {
                    data: type.data,
                    options: Object.assign({}, type.options, { type: type.id }),
                });
                setDemoActionsEventListener(type.id, type.data);
                break;
            case "pie":
                classyCharts[type.id] = new _src_index__WEBPACK_IMPORTED_MODULE_0__["PieChart"](classyContainer, {
                    data: new Promise(function (resolve, reject) {
                        setTimeout(function () {
                            resolve(type.data);
                        }, 0);
                    }),
                    options: Object.assign({}, type.options, { type: type.id })
                });
                var pieChartObject = classyCharts[type.id];
                pieChartObject.events.addEventListener("pie-slice-onClick", function (e) {
                    console.log("Pie chart - Slice clicked", e.detail);
                });
                setDemoActionsEventListener(type.id, type.data);
                break;
            case "donut":
                classyCharts[type.id] = new _src_index__WEBPACK_IMPORTED_MODULE_0__["DonutChart"](classyContainer, {
                    data: type.data,
                    options: Object.assign({}, type.options, { type: type.id })
                });
                setDemoActionsEventListener(type.id, type.data);
                break;
        }
    }
});


/***/ }),

/***/ "./src/assets/patterns/index.ts":
/*!**************************************!*\
  !*** ./src/assets/patterns/index.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var PATTERN_1 = __webpack_require__(/*! ./pattern-1.svg */ "./src/assets/patterns/pattern-1.svg");
var PATTERN_2 = __webpack_require__(/*! ./pattern-2.svg */ "./src/assets/patterns/pattern-2.svg");
var PATTERN_3 = __webpack_require__(/*! ./pattern-3.svg */ "./src/assets/patterns/pattern-3.svg");
var PATTERN_4 = __webpack_require__(/*! ./pattern-4.svg */ "./src/assets/patterns/pattern-4.svg");
var PATTERN_5 = __webpack_require__(/*! ./pattern-5.svg */ "./src/assets/patterns/pattern-5.svg");
var PATTERN_6 = __webpack_require__(/*! ./pattern-6.svg */ "./src/assets/patterns/pattern-6.svg");
var PATTERN_7 = __webpack_require__(/*! ./pattern-7.svg */ "./src/assets/patterns/pattern-7.svg");
var PATTERN_8 = __webpack_require__(/*! ./pattern-8.svg */ "./src/assets/patterns/pattern-8.svg");
var PATTERN_9 = __webpack_require__(/*! ./pattern-9.svg */ "./src/assets/patterns/pattern-9.svg");
var PATTERN_10 = __webpack_require__(/*! ./pattern-10.svg */ "./src/assets/patterns/pattern-10.svg");
var PATTERN_11 = __webpack_require__(/*! ./pattern-11.svg */ "./src/assets/patterns/pattern-11.svg");
/* harmony default export */ __webpack_exports__["default"] = ([
    PATTERN_1,
    PATTERN_2,
    // PATTERN_3,
    PATTERN_4,
    PATTERN_5,
    // PATTERN_6,
    PATTERN_7,
    PATTERN_8,
    // PATTERN_9,
    PATTERN_10,
    PATTERN_11
]);


/***/ }),

/***/ "./src/assets/patterns/pattern-1.svg":
/*!*******************************************!*\
  !*** ./src/assets/patterns/pattern-1.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:#231F20;}\r\n\t.st2{fill:url(#lines_-_right_to_left);}\r\n</style>\r\n<pattern  width=\"50\" height=\"50\" patternUnits=\"userSpaceOnUse\" id=\"lines_-_right_to_left\" viewBox=\"97.78 -148.535 50 50\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_16_\">\r\n\t\t<polygon id=\"XMLID_26_\" class=\"st0\" points=\"97.78,-148.535 147.78,-148.535 147.78,-98.535 97.78,-98.535 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_25_\" class=\"st1\" points=\"110.606,0 100,-10.607 214.117,-124.724 224.723,-114.117 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_24_\" class=\"st1\" points=\"60.606,0 50,-10.607 164.117,-124.724 174.723,-114.117 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_23_\" class=\"st1\" points=\"10.606,0 0,-10.607 114.117,-124.724 124.723,-114.117 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_22_\" class=\"st1\" points=\"110.606,-50 100,-60.607 214.117,-174.724 224.723,-164.117 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_21_\" class=\"st1\" points=\"60.606,-50 50,-60.607 164.117,-174.724 174.723,-164.117 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_20_\" class=\"st1\" points=\"10.606,-50 0,-60.607 114.117,-174.724 124.723,-164.117 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_19_\" class=\"st1\" points=\"110.606,-100 100,-110.607 214.117,-224.724 224.723,-214.117 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_18_\" class=\"st1\" points=\"60.606,-100 50,-110.607 164.117,-224.724 174.723,-214.117 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_17_\" class=\"st1\" points=\"10.606,-100 0,-110.607 114.117,-224.724 124.723,-214.117 \t\t\"/>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st2\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/assets/patterns/pattern-10.svg":
/*!********************************************!*\
  !*** ./src/assets/patterns/pattern-10.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:#231F20;}\r\n\t.st2{fill:url(#square_pattern);}\r\n</style>\r\n<pattern  width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\" id=\"square_pattern\" viewBox=\"15 -115 100 100\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_18_\">\r\n\t\t<polygon id=\"XMLID_52_\" class=\"st0\" points=\"15,-115 115,-115 115,-15 15,-15 \t\t\"/>\r\n\t\t<path id=\"XMLID_49_\" class=\"st1\" d=\"M120-45v10h-10v-10H120 M130-55h-30v30h30V-55L130-55z\"/>\r\n\t\t<path id=\"XMLID_46_\" class=\"st1\" d=\"M70-20v10H60v-10H70 M80-30H50V0h30V-30L80-30z\"/>\r\n\t\t<path id=\"XMLID_34_\" class=\"st1\" d=\"M20-45v10H10v-10H20 M30-55H0v30h30V-55L30-55z\"/>\r\n\t\t<path id=\"XMLID_31_\" class=\"st1\" d=\"M120-95v10h-10v-10H120 M130-105h-30v30h30V-105L130-105z\"/>\r\n\t\t<path id=\"XMLID_28_\" class=\"st1\" d=\"M70-70v10H60v-10H70 M80-80H50v30h30V-80L80-80z\"/>\r\n\t\t<path id=\"XMLID_25_\" class=\"st1\" d=\"M20-95v10H10v-10H20 M30-105H0v30h30V-105L30-105z\"/>\r\n\t\t<path id=\"XMLID_19_\" class=\"st1\" d=\"M70-120v10H60v-10H70 M80-130H50v30h30V-130L80-130z\"/>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st2\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/assets/patterns/pattern-11.svg":
/*!********************************************!*\
  !*** ./src/assets/patterns/pattern-11.svg ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:#231F20;}\r\n\t.st2{fill:url(#tight_diamond);}\r\n</style>\r\n<pattern  width=\"70\" height=\"45\" patternUnits=\"userSpaceOnUse\" id=\"tight_diamond\" viewBox=\"21.213 -66.213 70 45\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_9_\">\r\n\t\t<polygon id=\"XMLID_16_\" class=\"st0\" points=\"21.213,-66.213 91.213,-66.213 91.213,-21.213 21.213,-21.213 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_15_\" class=\"st1\" points=\"91.213,0 70,-21.213 91.213,-42.427 112.427,-21.213 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_14_\" class=\"st1\" points=\"21.213,0 0,-21.213 21.213,-42.427 42.427,-21.213 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_13_\" class=\"st1\" points=\"91.213,-45 70,-66.213 91.213,-87.427 112.427,-66.213 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_12_\" class=\"st1\" points=\"56.213,-22.5 35,-43.713 56.213,-64.927 77.427,-43.713 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_11_\" class=\"st1\" points=\"21.213,-45 0,-66.213 21.213,-87.427 42.427,-66.213 \t\t\"/>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st2\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/assets/patterns/pattern-2.svg":
/*!*******************************************!*\
  !*** ./src/assets/patterns/pattern-2.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:#2d74da;}\r\n\t.st2{fill:url(#Circle_pattern);}\r\n</style>\r\n<pattern  width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\" id=\"Circle_pattern\" viewBox=\"15 -115 100 100\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_11_\">\r\n\t\t<polygon id=\"XMLID_39_\" class=\"st0\" points=\"15,-115 115,-115 115,-15 15,-15 \t\t\"/>\r\n\t\t<path id=\"XMLID_34_\" class=\"st1\" d=\"M130-40c0,8.284-6.716,15-15,15s-15-6.716-15-15s6.716-15,15-15S130-48.284,130-40z\"/>\r\n\t\t<path id=\"XMLID_33_\" class=\"st1\" d=\"M80-15c0,8.284-6.716,15-15,15S50-6.716,50-15s6.716-15,15-15S80-23.284,80-15z\"/>\r\n\t\t<path id=\"XMLID_32_\" class=\"st1\" d=\"M30-40c0,8.284-6.716,15-15,15S0-31.716,0-40s6.716-15,15-15S30-48.284,30-40z\"/>\r\n\t\t<path id=\"XMLID_24_\" class=\"st1\" d=\"M130-90c0,8.284-6.716,15-15,15s-15-6.716-15-15s6.716-15,15-15S130-98.284,130-90z\"/>\r\n\t\t<path id=\"XMLID_22_\" class=\"st1\" d=\"M80-65c0,8.284-6.716,15-15,15s-15-6.716-15-15s6.716-15,15-15S80-73.284,80-65z\"/>\r\n\t\t<path id=\"XMLID_18_\" class=\"st1\" d=\"M30-90c0,8.284-6.716,15-15,15S0-81.716,0-90s6.716-15,15-15S30-98.284,30-90z\"/>\r\n\t\t<path id=\"XMLID_17_\" class=\"st1\" d=\"M80-115c0,8.284-6.716,15-15,15s-15-6.716-15-15s6.716-15,15-15S80-123.284,80-115z\"/>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st2\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/assets/patterns/pattern-3.svg":
/*!*******************************************!*\
  !*** ./src/assets/patterns/pattern-3.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:#231F20;}\r\n\t.st2{fill:url(#Square_diamond);}\r\n</style>\r\n<pattern  width=\"40\" height=\"40\" patternUnits=\"userSpaceOnUse\" id=\"Square_diamond\" viewBox=\"0 -40 40 40\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_10_\">\r\n\t\t<polygon id=\"XMLID_14_\" class=\"st0\" points=\"0,-40 40,-40 40,0 0,0 \t\t\"/>\r\n\t\t<path id=\"XMLID_11_\" class=\"st1\" d=\"M5-35v30h30v-30H5z M20-9.393L9.393-20L20-30.607L30.607-20L20-9.393z\"/>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st2\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/assets/patterns/pattern-4.svg":
/*!*******************************************!*\
  !*** ./src/assets/patterns/pattern-4.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:#231F20;}\r\n\t.st2{fill:url(#Triangle);}\r\n</style>\r\n<pattern  width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\" id=\"Triangle\" viewBox=\"15 -112.99 100 100\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_10_\">\r\n\t\t<polygon id=\"XMLID_23_\" class=\"st0\" points=\"15,-112.99 115,-112.99 115,-12.99 15,-12.99 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_21_\" class=\"st1\" points=\"100,-25 115,-50.981 130,-25 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_20_\" class=\"st1\" points=\"50,0 65,-25.981 80,0 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_19_\" class=\"st1\" points=\"0,-25 15,-50.981 30,-25 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_15_\" class=\"st1\" points=\"100,-75 115,-100.981 130,-75 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_14_\" class=\"st1\" points=\"50,-50 65,-75.981 80,-50 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_13_\" class=\"st1\" points=\"0,-75 15,-100.981 30,-75 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_12_\" class=\"st1\" points=\"50,-100 65,-125.981 80,-100 \t\t\"/>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st2\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/assets/patterns/pattern-5.svg":
/*!*******************************************!*\
  !*** ./src/assets/patterns/pattern-5.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:url(#diamond);}\r\n</style>\r\n<pattern  width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\" id=\"diamond\" viewBox=\"21.213 -121.213 100 100\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_15_\">\r\n\t\t<polygon id=\"XMLID_52_\" class=\"st0\" points=\"21.213,-121.213 121.213,-121.213 121.213,-21.213 21.213,-21.213 \t\t\"/>\r\n\t\t<path id=\"XMLID_49_\" d=\"M96.213-28.284l7.071,7.071l-7.071,7.071l-7.071-7.071L96.213-28.284 M96.213-42.427L75-21.213L96.213,0\r\n\t\t\tl21.213-21.213L96.213-42.427L96.213-42.427z\"/>\r\n\t\t<path id=\"XMLID_40_\" d=\"M46.213-28.284l7.071,7.071l-7.071,7.071l-7.071-7.071L46.213-28.284 M46.213-42.427L25-21.213L46.213,0\r\n\t\t\tl21.213-21.213L46.213-42.427L46.213-42.427z\"/>\r\n\t\t<path id=\"XMLID_37_\" d=\"M121.213-78.284l7.071,7.071l-7.071,7.071l-7.071-7.071L121.213-78.284 M121.213-92.427L100-71.213\r\n\t\t\tL121.213-50l21.213-21.213L121.213-92.427L121.213-92.427z\"/>\r\n\t\t<path id=\"XMLID_28_\" d=\"M71.213-78.284l7.071,7.071l-7.071,7.071l-7.071-7.071L71.213-78.284 M71.213-92.427L50-71.213L71.213-50\r\n\t\t\tl21.213-21.213L71.213-92.427L71.213-92.427z\"/>\r\n\t\t<path id=\"XMLID_25_\" d=\"M21.213-78.284l7.071,7.071l-7.071,7.071l-7.071-7.071L21.213-78.284 M21.213-92.427L0-71.213L21.213-50\r\n\t\t\tl21.213-21.213L21.213-92.427L21.213-92.427z\"/>\r\n\t\t<path id=\"XMLID_22_\" d=\"M96.213-128.284l7.071,7.071l-7.071,7.071l-7.071-7.071L96.213-128.284 M96.213-142.427L75-121.213\r\n\t\t\tL96.213-100l21.213-21.213L96.213-142.427L96.213-142.427z\"/>\r\n\t\t<path id=\"XMLID_16_\" d=\"M46.213-128.284l7.071,7.071l-7.071,7.071l-7.071-7.071L46.213-128.284 M46.213-142.427L25-121.213\r\n\t\t\tL46.213-100l21.213-21.213L46.213-142.427L46.213-142.427z\"/>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st1\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/assets/patterns/pattern-6.svg":
/*!*******************************************!*\
  !*** ./src/assets/patterns/pattern-6.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:#231F20;}\r\n\t.st2{fill:url(#half_circle);}\r\n</style>\r\n<pattern  width=\"60\" height=\"70\" patternUnits=\"userSpaceOnUse\" id=\"half_circle\" viewBox=\"15 -77.5 60 70\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_8_\">\r\n\t\t<polygon id=\"XMLID_22_\" class=\"st0\" points=\"15,-77.5 75,-77.5 75,-7.5 15,-7.5 \t\t\"/>\r\n\t\t<path id=\"XMLID_20_\" class=\"st1\" d=\"M75-15c0,8.284-6.716,15-15,15S45-6.716,45-15H75z\"/>\r\n\t\t<path id=\"XMLID_19_\" class=\"st1\" d=\"M45-15c0,8.284-6.716,15-15,15S15-6.716,15-15H45z\"/>\r\n\t\t<path id=\"XMLID_16_\" class=\"st1\" d=\"M90-50c0,8.284-6.716,15-15,15s-15-6.716-15-15H90z\"/>\r\n\t\t<path id=\"XMLID_15_\" class=\"st1\" d=\"M60-50c0,8.284-6.716,15-15,15s-15-6.716-15-15H60z\"/>\r\n\t\t<path id=\"XMLID_12_\" class=\"st1\" d=\"M30-50c0,8.284-6.716,15-15,15S0-41.716,0-50H30z\"/>\r\n\t\t<path id=\"XMLID_11_\" class=\"st1\" d=\"M75-85c0,8.284-6.716,15-15,15s-15-6.716-15-15H75z\"/>\r\n\t\t<path id=\"XMLID_10_\" class=\"st1\" d=\"M45-85c0,8.284-6.716,15-15,15s-15-6.716-15-15H45z\"/>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st2\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/assets/patterns/pattern-7.svg":
/*!*******************************************!*\
  !*** ./src/assets/patterns/pattern-7.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:#231F20;}\r\n\t.st2{fill:url(#lines_-_left_to_right);}\r\n</style>\r\n<pattern  width=\"50\" height=\"50\" patternUnits=\"userSpaceOnUse\" id=\"lines_-_left_to_right\" viewBox=\"101.277 -147.008 50 50\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_8_\">\r\n\t\t<polygon id=\"XMLID_32_\" class=\"st0\" points=\"101.277,-147.008 151.277,-147.008 151.277,-97.008 101.277,-97.008 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_31_\" class=\"st1\" points=\"264.058,0 150,-114.058 160.606,-124.665 274.665,-10.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_30_\" class=\"st1\" points=\"214.058,0 100,-114.058 110.606,-124.665 224.665,-10.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_29_\" class=\"st1\" points=\"164.058,0 50,-114.058 60.606,-124.665 174.665,-10.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_28_\" class=\"st1\" points=\"114.058,0 0,-114.058 10.606,-124.665 124.665,-10.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_27_\" class=\"st1\" points=\"264.058,-50 150,-164.058 160.606,-174.665 274.665,-60.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_26_\" class=\"st1\" points=\"214.058,-50 100,-164.058 110.606,-174.665 224.665,-60.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_25_\" class=\"st1\" points=\"164.058,-50 50,-164.058 60.606,-174.665 174.665,-60.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_24_\" class=\"st1\" points=\"114.058,-50 0,-164.058 10.606,-174.665 124.665,-60.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_23_\" class=\"st1\" points=\"264.058,-100 150,-214.058 160.606,-224.665 274.665,-110.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_22_\" class=\"st1\" points=\"214.058,-100 100,-214.058 110.606,-224.665 224.665,-110.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_16_\" class=\"st1\" points=\"164.058,-100 50,-214.058 60.606,-224.665 174.665,-110.607 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_15_\" class=\"st1\" points=\"114.058,-100 0,-214.058 10.606,-224.665 124.665,-110.607 \t\t\"/>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st2\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/assets/patterns/pattern-8.svg":
/*!*******************************************!*\
  !*** ./src/assets/patterns/pattern-8.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:#231F20;}\r\n\t.st2{fill:url(#hex_pattern);}\r\n</style>\r\n<pattern  width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\" id=\"hex_pattern\" viewBox=\"20 -117.32 100 100\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_10_\">\r\n\t\t<polygon id=\"XMLID_23_\" class=\"st0\" points=\"20,-117.32 120,-117.32 120,-17.32 20,-17.32 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_21_\" class=\"st1\" points=\"110,-25 100,-42.32 110,-59.641 130,-59.641 140,-42.32 130,-25 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_20_\" class=\"st1\" points=\"60,0 50,-17.32 60,-34.641 80,-34.641 90,-17.32 80,0 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_19_\" class=\"st1\" points=\"10,-25 0,-42.32 10,-59.641 30,-59.641 40,-42.32 30,-25 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_15_\" class=\"st1\" points=\"110,-75 100,-92.32 110,-109.641 130,-109.641 140,-92.32 130,-75 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_14_\" class=\"st1\" points=\"60,-50 50,-67.32 60,-84.641 80,-84.641 90,-67.32 80,-50 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_13_\" class=\"st1\" points=\"10,-75 0,-92.32 10,-109.641 30,-109.641 40,-92.32 30,-75 \t\t\"/>\r\n\t\t<polygon id=\"XMLID_12_\" class=\"st1\" points=\"60,-100 50,-117.32 60,-134.641 80,-134.641 90,-117.32 80,-100 \t\t\"/>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st2\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/assets/patterns/pattern-9.svg":
/*!*******************************************!*\
  !*** ./src/assets/patterns/pattern-9.svg ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->\r\n<svg version=\"1.1\" id=\"Layer_1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x=\"0px\" y=\"0px\"\r\n\t viewBox=\"0 0 100 100\" style=\"enable-background:new 0 0 100 100;\" xml:space=\"preserve\">\r\n<style type=\"text/css\">\r\n\t.st0{fill:none;}\r\n\t.st1{fill:#231F20;}\r\n\t.st2{fill:url(#arrow_pattern);}\r\n</style>\r\n<pattern  width=\"52\" height=\"50\" patternUnits=\"userSpaceOnUse\" id=\"arrow_pattern\" viewBox=\"0 -68.556 52 50\" style=\"overflow:visible;\">\r\n\t<g id=\"XMLID_10_\">\r\n\t\t<polygon id=\"XMLID_62_\" class=\"st0\" points=\"0,-68.556 52,-68.556 52,-18.556 0,-18.556 \t\t\"/>\r\n\t\t<g id=\"XMLID_44_\">\r\n\t\t\t<polygon id=\"XMLID_61_\" class=\"st1\" points=\"23.5,-5.899 23.485,0 2.272,-21.213 2.287,-27.112 \t\t\t\"/>\r\n\t\t\t<polygon id=\"XMLID_45_\" class=\"st1\" points=\"28.5,-5.899 28.515,0 49.728,-21.213 49.713,-27.112 \t\t\t\"/>\r\n\t\t</g>\r\n\t\t<g id=\"XMLID_41_\">\r\n\t\t\t<polygon id=\"XMLID_43_\" class=\"st1\" points=\"23.5,-15.899 23.485,-10 2.272,-31.213 2.287,-37.112 \t\t\t\"/>\r\n\t\t\t<polygon id=\"XMLID_42_\" class=\"st1\" points=\"28.5,-15.899 28.515,-10 49.728,-31.213 49.713,-37.112 \t\t\t\"/>\r\n\t\t</g>\r\n\t\t<g id=\"XMLID_31_\">\r\n\t\t\t<polygon id=\"XMLID_37_\" class=\"st1\" points=\"23.5,-25.899 23.485,-20 2.272,-41.213 2.287,-47.112 \t\t\t\"/>\r\n\t\t\t<polygon id=\"XMLID_32_\" class=\"st1\" points=\"28.5,-25.899 28.515,-20 49.728,-41.213 49.713,-47.112 \t\t\t\"/>\r\n\t\t</g>\r\n\t\t<g id=\"XMLID_25_\">\r\n\t\t\t<polygon id=\"XMLID_27_\" class=\"st1\" points=\"23.5,-35.899 23.485,-30 2.272,-51.213 2.287,-57.112 \t\t\t\"/>\r\n\t\t\t<polygon id=\"XMLID_26_\" class=\"st1\" points=\"28.5,-35.899 28.515,-30 49.728,-51.213 49.713,-57.112 \t\t\t\"/>\r\n\t\t</g>\r\n\t\t<g id=\"XMLID_17_\">\r\n\t\t\t<polygon id=\"XMLID_24_\" class=\"st1\" points=\"23.5,-45.899 23.485,-40 2.272,-61.213 2.287,-67.112 \t\t\t\"/>\r\n\t\t\t<polygon id=\"XMLID_18_\" class=\"st1\" points=\"28.5,-45.899 28.515,-40 49.728,-61.213 49.713,-67.112 \t\t\t\"/>\r\n\t\t</g>\r\n\t\t<g id=\"XMLID_14_\">\r\n\t\t\t<polygon id=\"XMLID_16_\" class=\"st1\" points=\"23.5,-55.899 23.485,-50 2.272,-71.213 2.287,-77.112 \t\t\t\"/>\r\n\t\t\t<polygon id=\"XMLID_15_\" class=\"st1\" points=\"28.5,-55.899 28.515,-50 49.728,-71.213 49.713,-77.112 \t\t\t\"/>\r\n\t\t</g>\r\n\t\t<g id=\"XMLID_11_\">\r\n\t\t\t<polygon id=\"XMLID_13_\" class=\"st1\" points=\"23.5,-65.899 23.485,-60 2.272,-81.213 2.287,-87.112 \t\t\t\"/>\r\n\t\t\t<polygon id=\"XMLID_12_\" class=\"st1\" points=\"28.5,-65.899 28.515,-60 49.728,-81.213 49.713,-87.112 \t\t\t\"/>\r\n\t\t</g>\r\n\t</g>\r\n</pattern>\r\n<rect id=\"XMLID_1_\" class=\"st2\" width=\"100\" height=\"100\"/>\r\n</svg>\r\n"

/***/ }),

/***/ "./src/bar-chart.ts":
/*!**************************!*\
  !*** ./src/bar-chart.ts ***!
  \**************************/
/*! exports provided: BarChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarChart", function() { return BarChart; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/index.js");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-scale */ "../../node_modules/d3-scale/index.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-array */ "../../node_modules/d3-array/index.js");
/* harmony import */ var _base_axis_chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base-axis-chart */ "./src/base-axis-chart.ts");
/* harmony import */ var _stacked_bar_chart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stacked-bar-chart */ "./src/stacked-bar-chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// D3 Imports






var getYMin = function (configs) {
    var datasets = configs.data.datasets;
    var scales = configs.options.scales;
    var yMin;
    if (datasets.length === 1) {
        yMin = Object(d3_array__WEBPACK_IMPORTED_MODULE_2__["min"])(datasets[0].data);
    }
    else {
        yMin = Object(d3_array__WEBPACK_IMPORTED_MODULE_2__["min"])(datasets, function (d) { return (Object(d3_array__WEBPACK_IMPORTED_MODULE_2__["min"])(d.data)); });
    }
    if (scales.y.yMinAdjuster) {
        yMin = scales.y.yMinAdjuster(yMin);
    }
    return yMin;
};
var BarChart = /** @class */ (function (_super) {
    __extends(BarChart, _super);
    function BarChart(holder, configs) {
        var _this = this;
        // If this is a stacked bar chart, change the object prototype
        if (configs.options.scales.y.stacked) {
            if (getYMin(configs) >= 0) {
                return new _stacked_bar_chart__WEBPACK_IMPORTED_MODULE_4__["StackedBarChart"](holder, configs);
            }
            else {
                console.error("Negative values are not supported in StackedBarChart, using GroupedBarChart instead to render!");
            }
        }
        _this = _super.call(this, holder, configs) || this;
        // To be used for combo chart instances of a bar chart
        var axis = configs.options.axis;
        if (axis) {
            var margins = _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].margin.bar;
            var chartSize = _this.getChartSize();
            var width = chartSize.width - margins.left - margins.right;
            _this.x1 = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleBand"])().rangeRound([0, width]).padding(_configuration__WEBPACK_IMPORTED_MODULE_5__["bars"].spacing.bars);
            _this.x1.domain(configs.data.datasets.map(function (dataset) { return dataset.label; })).rangeRound([0, _this.x.bandwidth()]);
        }
        _this.options.type = "bar";
        return _this;
    }
    BarChart.prototype.setXScale = function (xScale) {
        var margins = _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].margin.bar;
        var chartSize = this.getChartSize();
        var width = chartSize.width - margins.left - margins.right;
        if (xScale) {
            this.x = xScale;
        }
        else {
            this.x = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleBand"])().rangeRound([0, width]).padding(_configuration__WEBPACK_IMPORTED_MODULE_5__["bars"].spacing.datasets);
            this.x.domain(this.displayData.labels);
        }
        this.x1 = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleBand"])().rangeRound([0, width]).padding(_configuration__WEBPACK_IMPORTED_MODULE_5__["bars"].spacing.bars);
        this.x1.domain(this.displayData.datasets.map(function (dataset) { return dataset.label; })).rangeRound([0, this.x.bandwidth()]);
    };
    BarChart.prototype.draw = function () {
        var _this = this;
        this.innerWrap.style("width", "100%")
            .style("height", "100%");
        var margins = _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].margin.bar;
        var chartSize = this.getChartSize();
        var width = chartSize.width - margins.left - margins.right;
        var height = chartSize.height - this.getBBox(".x.axis").height;
        var gBars = this.innerWrap
            .attr("transform", "translate(" + margins.left + ", " + margins.top + ")")
            .append("g")
            .classed("bars", true)
            .attr("width", width);
        gBars.selectAll("g")
            .data(this.displayData.labels)
            .enter()
            .append("g")
            .attr("transform", function (d) { return "translate(" + _this.x(d) + ", 0)"; })
            .selectAll("rect.bar")
            .data(function (d, index) { return _this.addLabelsToDataPoints(d, index); })
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("x", function (d) { return _this.x1(d.datasetLabel); })
            .attr("y", function (d) { return _this.y(Math.max(0, d.value)); })
            .attr("width", this.x1.bandwidth())
            .attr("height", function (d) { return Math.abs(_this.y(d.value) - _this.y(0)); })
            .attr("fill", function (d) { return _this.getFillScale()[d.datasetLabel](d.label); })
            .attr("stroke", function (d) { return _this.options.accessibility ? _this.colorScale[d.datasetLabel](d.label) : null; })
            .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_5__["bars"].default.strokeWidth)
            .attr("stroke-opacity", function (d) { return _this.options.accessibility ? 1 : 0; });
        // Hide the overlay
        this.updateOverlay().hide();
        // Dispatch the load event
        this.dispatchEvent("load");
    };
    BarChart.prototype.interpolateValues = function (newData) {
        var _this = this;
        var margins = _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].margin.bar;
        var chartSize = this.getChartSize();
        var width = chartSize.width - margins.left - margins.right;
        var height = chartSize.height - this.getBBox(".x.axis").height;
        // Apply new data to the bars
        var g = this.innerWrap.select("g.bars")
            .attr("width", width)
            .selectAll("g")
            .data(this.displayData.labels);
        var rect = g.selectAll("rect.bar")
            .data(function (d, index) { return _this.addLabelsToDataPoints(d, index); });
        this.updateElements(true, rect, g);
        // Add bar groups that need to be added now
        var addedBars = g.enter()
            .append("g")
            .classed("bars", true)
            .attr("transform", function (d) { return "translate(" + _this.x(d) + ", 0)"; });
        // Add bars that need to be added now
        g.selectAll("rect.bar")
            .data(function (d, index) { return _this.addLabelsToDataPoints(d, index); })
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return _this.x1(d.datasetLabel); })
            .attr("y", function (d) { return _this.y(Math.max(0, d.value)); })
            .attr("width", this.x1.bandwidth())
            .attr("height", function (d) { return Math.abs(_this.y(d.value) - _this.y(0)); })
            .attr("opacity", 0)
            .transition(this.getFillTransition())
            .attr("fill", function (d) { return _this.getFillScale()[d.datasetLabel](d.label); })
            .attr("opacity", 1)
            .attr("stroke", function (d) { return _this.colorScale[d.datasetLabel](d.label); })
            .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_5__["bars"].default.strokeWidth);
        addedBars.selectAll("rect.bar")
            .data(function (d, index) { return _this.addLabelsToDataPoints(d, index); })
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", function (d) { return _this.x1(d.datasetLabel); })
            .attr("y", function (d) { return _this.y(Math.max(0, d.value)); })
            .attr("width", this.x1.bandwidth())
            .attr("height", function (d) { return Math.abs(_this.y(d.value) - _this.y(0)); })
            .attr("opacity", 0)
            .transition(this.getFillTransition())
            .attr("fill", function (d) { return _this.getFillScale()[d.datasetLabel](d.label); })
            .attr("opacity", 1)
            .attr("stroke", function (d) { return _this.colorScale[d.datasetLabel](d.label); })
            .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_5__["bars"].default.strokeWidth);
        // Remove bar groups are no longer needed
        g.exit()
            .transition(this.getDefaultTransition())
            .style("opacity", 0)
            .remove();
        // Remove bars that are no longer needed
        rect.exit()
            .transition(this.getDefaultTransition())
            .style("opacity", 0)
            .remove();
        // Add slice hover actions, and clear any slice borders present
        this.addDataPointEventListener();
        // Hide the overlay
        this.updateOverlay().hide();
        // Dispatch the update event
        this.dispatchEvent("update");
    };
    BarChart.prototype.updateElements = function (animate, rect, g) {
        var _this = this;
        var scales = this.options.scales;
        var chartSize = this.getChartSize();
        var height = chartSize.height - this.getBBox(".x.axis").height;
        if (!rect) {
            rect = this.innerWrap.selectAll("rect.bar");
        }
        if (g) {
            g.transition(animate ? this.getDefaultTransition() : this.getInstantTransition())
                .attr("transform", function (d) { return "translate(" + _this.x(d) + ", 0)"; });
        }
        // Update existing bars
        rect
            .transition(animate ? this.getFillTransition() : this.getInstantTransition())
            .attr("x", function (d) { return _this.x1(d.datasetLabel); })
            .attr("y", function (d) { return _this.y(Math.max(0, d.value)); })
            .attr("width", this.x1.bandwidth())
            .attr("height", function (d) { return Math.abs(_this.y(d.value) - _this.y(0)); })
            .attr("fill", function (d) { return _this.getFillScale()[d.datasetLabel](d.label); })
            .attr("stroke", function (d) { return _this.options.accessibility ? _this.colorScale[d.datasetLabel](d.label) : null; });
    };
    BarChart.prototype.resizeChart = function () {
        var actualChartSize = this.getChartSize(this.container);
        var dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);
        // Resize the SVG
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder).select("svg")
            .attr("width", dimensionToUseForScale + "px")
            .attr("height", dimensionToUseForScale + "px");
        this.updateXandYGrid(true);
        // Scale out the domains
        this.setXScale();
        this.setYScale();
        // Set the x & y axis as well as their labels
        this.setXAxis(true);
        this.setYAxis(true);
        // Apply new data to the bars
        var g = this.innerWrap.selectAll("g.bars g");
        this.updateElements(false, null, g);
        _super.prototype.resizeChart.call(this);
    };
    return BarChart;
}(_base_axis_chart__WEBPACK_IMPORTED_MODULE_3__["BaseAxisChart"]));



/***/ }),

/***/ "./src/base-axis-chart.ts":
/*!********************************!*\
  !*** ./src/base-axis-chart.ts ***!
  \********************************/
/*! exports provided: BaseAxisChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseAxisChart", function() { return BaseAxisChart; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/index.js");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-scale */ "../../node_modules/d3-scale/index.js");
/* harmony import */ var d3_axis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-axis */ "../../node_modules/d3-axis/index.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-array */ "../../node_modules/d3-array/index.js");
/* harmony import */ var _base_chart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base-chart */ "./src/base-chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tools */ "./src/tools.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// D3 Imports







var BaseAxisChart = /** @class */ (function (_super) {
    __extends(BaseAxisChart, _super);
    function BaseAxisChart(holder, configs) {
        var _this = _super.call(this, holder, configs) || this;
        var axis = configs.options.axis;
        if (axis) {
            _this.x = axis.x;
            _this.y = axis.y;
            _this.y2 = axis.y2;
        }
        return _this;
    }
    BaseAxisChart.prototype.setSVG = function () {
        _super.prototype.setSVG.call(this);
        this.container.classed("chart-axis", true);
        this.innerWrap.append("g")
            .attr("class", "x grid");
        this.innerWrap.append("g")
            .attr("class", "y grid");
        return this.svg;
    };
    BaseAxisChart.prototype.initialDraw = function (data) {
        if (data) {
            this.displayData = data;
        }
        // If an axis exists
        var xAxisRef = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder).select(".axis.x");
        if (!xAxisRef.node()) {
            this.setSVG();
            // Scale out the domains
            // Set the x & y axis as well as their labels
            this.setXScale();
            this.setXAxis();
            this.setYScale();
            this.setYAxis();
            // Draw the x & y grid
            this.drawXGrid();
            this.drawYGrid();
            this.addOrUpdateLegend();
        }
        else {
            var holderRef = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder);
            this.innerWrap = holderRef.select("g.inner-wrap");
            this.svg = holderRef.select("svg.chart-svg");
        }
        this.draw();
        this.addDataPointEventListener();
    };
    BaseAxisChart.prototype.update = function () {
        this.displayData = this.updateDisplayData();
        this.updateXandYGrid();
        this.setXScale();
        this.setXAxis();
        this.setYScale();
        this.setYAxis();
        this.interpolateValues(this.displayData);
    };
    BaseAxisChart.prototype.updateDisplayData = function () {
        var oldData = _tools__WEBPACK_IMPORTED_MODULE_6__["Tools"].clone(this.data);
        var activeLegendItems = this.getActiveLegendItems();
        // Get new data by filtering the data based off of the legend
        var newDisplayData = Object.assign({}, oldData);
        if (this.getLegendType() === _configuration__WEBPACK_IMPORTED_MODULE_5__["legend"].basedOn.SERIES) {
            newDisplayData.datasets = oldData.datasets.filter(function (dataset) {
                // If this datapoint is active on the legend
                var activeSeriesItemIndex = activeLegendItems.indexOf(dataset.label);
                return activeSeriesItemIndex !== -1;
            });
        }
        else {
            var dataIndeciesToRemove_1 = [];
            newDisplayData.labels = oldData.labels.filter(function (label, index) {
                // If this datapoint is active on the legend
                var activeSeriesItemIndex = activeLegendItems.indexOf(label);
                if (activeSeriesItemIndex === -1) {
                    dataIndeciesToRemove_1.push(index);
                }
                return activeSeriesItemIndex !== -1;
            });
            if (dataIndeciesToRemove_1.length > 0) {
                newDisplayData.datasets = oldData.datasets.map(function (dataset) {
                    dataset.data = dataset.data.filter(function (dataPoint, i) {
                        return dataIndeciesToRemove_1.indexOf(i) === -1;
                    });
                    return dataset;
                });
            }
        }
        return newDisplayData;
    };
    BaseAxisChart.prototype.addLabelsToDataPoints = function (d, index) {
        var datasets = this.displayData.datasets;
        return datasets.map(function (dataset) { return ({
            label: d,
            datasetLabel: dataset.label,
            value: dataset.data[index]
        }); });
    };
    BaseAxisChart.prototype.draw = function () {
        console.warn("You should implement your own `draw()` function.");
    };
    BaseAxisChart.prototype.interpolateValues = function (newData) {
        console.warn("You should implement your own `interpolateValues()` function.");
    };
    /**************************************
     *  Computations/Calculations         *
     *************************************/
    // TODO - Refactor
    BaseAxisChart.prototype.getChartSize = function (container) {
        if (container === void 0) { container = this.container; }
        var ratio, marginForLegendTop;
        if (container.node().clientWidth > _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].widthBreak) {
            ratio = _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].magicRatio;
            marginForLegendTop = 0;
        }
        else {
            marginForLegendTop = _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].marginForLegendTop;
            ratio = 1;
        }
        // Store computed actual size, to be considered for change if chart does not support axis
        var marginsToExclude = _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].margin.left + _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].margin.right;
        var computedChartSize = {
            height: container.node().clientHeight - marginForLegendTop,
            width: (container.node().clientWidth - marginsToExclude) * ratio
        };
        return computedChartSize;
    };
    BaseAxisChart.prototype.resizeChart = function () {
        // Reposition the legend
        this.positionLegend();
        if (this.innerWrap.select(".axis-label.x").nodes().length > 0 && this.options.scales.x.title) {
            this.repositionXAxisTitle();
        }
        this.dispatchEvent("resize");
    };
    /**************************************
     *  Axis & Grids                      *
     *************************************/
    BaseAxisChart.prototype.setXScale = function (xScale) {
        if (xScale) {
            this.x = xScale;
        }
        else {
            var margins = _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].margin.bar;
            var scales = this.options.scales;
            var chartSize = this.getChartSize();
            var width = chartSize.width - margins.left - margins.right;
            this.x = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleBand"])().rangeRound([0, width]).padding(_configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].x.padding);
            this.x.domain(this.displayData.labels);
        }
    };
    BaseAxisChart.prototype.setXAxis = function (noAnimation) {
        var _this = this;
        var margins = _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].margin.bar;
        var chartSize = this.getChartSize();
        var height = chartSize.height - margins.top - margins.bottom;
        var t = noAnimation ? this.getInstantTransition() : this.getDefaultTransition();
        var xAxis = Object(d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisBottom"])(this.x)
            .tickSize(0)
            .tickSizeOuter(0);
        var xAxisRef = this.svg.select("g.x.axis");
        // If the <g class="x axis"> exists in the chart SVG, just update it
        if (xAxisRef.nodes().length > 0) {
            xAxisRef = this.svg.select("g.x.axis")
                .transition(t)
                .attr("transform", "translate(0, " + height + ")")
                .call(xAxis);
        }
        else {
            xAxisRef = this.innerWrap.append("g")
                .attr("class", "x axis");
            xAxisRef.call(xAxis);
        }
        // Update the position of the pieces of text inside x-axis
        xAxisRef.selectAll("g.tick text")
            .attr("y", _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].magicY1)
            .attr("x", _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].magicX1)
            .attr("dy", ".35em")
            .attr("transform", "rotate(" + _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].xAxisAngle + ")")
            .style("text-anchor", "end")
            .call(function (text) { return _this.wrapTick(text); });
        // get the tickHeight after the ticks have been wrapped
        var tickHeight = this.getLargestTickHeight(xAxisRef.selectAll(".tick")) + _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].tick.heightAddition;
        // Add x-axis title
        if (this.innerWrap.select(".axis-label.x").nodes().length === 0 && this.options.scales.x.title) {
            xAxisRef.append("text")
                .attr("class", "x axis-label")
                .attr("text-anchor", "middle")
                .attr("transform", "translate(" + xAxisRef.node().getBBox().width / 2 + ", " + tickHeight + ")")
                .text(this.options.scales.x.title);
        }
        // get the yHeight after the height of the axis has settled
        var yHeight = this.getChartSize().height - this.svg.select(".x.axis").node().getBBox().height;
        xAxisRef.attr("transform", "translate(0, " + yHeight + ")");
    };
    BaseAxisChart.prototype.repositionXAxisTitle = function () {
        var xAxisRef = this.svg.select("g.x.axis");
        var tickHeight = this.getLargestTickHeight(xAxisRef.selectAll(".tick")) + _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].tick.heightAddition;
        var xAxisTitleRef = this.svg.select("g.x.axis text.x.axis-label");
        xAxisTitleRef.attr("class", "x axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "translate(" + xAxisRef.node().getBBox().width / 2 + ", " + tickHeight + ")")
            .text(this.options.scales.x.title);
    };
    BaseAxisChart.prototype.getYMax = function () {
        var datasets = this.displayData.datasets;
        var scales = this.options.scales;
        var yMax;
        if (datasets.length === 1) {
            yMax = Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])(datasets[0].data);
        }
        else {
            yMax = Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])(datasets, function (d) { return (Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["max"])(d.data)); });
        }
        if (scales.y.yMaxAdjuster) {
            yMax = scales.y.yMaxAdjuster(yMax);
        }
        return yMax;
    };
    BaseAxisChart.prototype.getYMin = function () {
        var datasets = this.displayData.datasets;
        var scales = this.options.scales;
        var yMin;
        if (datasets.length === 1) {
            yMin = Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["min"])(datasets[0].data);
        }
        else {
            yMin = Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["min"])(datasets, function (d) { return (Object(d3_array__WEBPACK_IMPORTED_MODULE_3__["min"])(d.data)); });
        }
        if (scales.y.yMinAdjuster) {
            yMin = scales.y.yMinAdjuster(yMin);
        }
        return yMin;
    };
    BaseAxisChart.prototype.setYScale = function (yScale) {
        var chartSize = this.getChartSize();
        var height = chartSize.height - this.innerWrap.select(".x.axis").node().getBBox().height;
        var scales = this.options.scales;
        var yMin = this.getYMin();
        var yMax = this.getYMax();
        if (yScale) {
            this.y = yScale;
        }
        else {
            this.y = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"])().range([height, 0]);
            this.y.domain([Math.min(yMin, 0), yMax]);
        }
        if (scales.y2 && scales.y2.ticks.max) {
            this.y2 = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleLinear"])().rangeRound([height, 0]);
            this.y2.domain([scales.y2.ticks.min, scales.y2.ticks.max]);
        }
    };
    BaseAxisChart.prototype.setYAxis = function (noAnimation) {
        var chartSize = this.getChartSize();
        var scales = this.options.scales;
        var t = noAnimation ? this.getInstantTransition() : this.getDefaultTransition();
        var yAxis = Object(d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisLeft"])(this.y)
            .ticks(scales.y.numberOfTicks || _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].y.numberOfTicks)
            .tickSize(0)
            .tickFormat(scales.y.formatter);
        var yAxisRef = this.svg.select("g.y.axis");
        var horizontalLine = this.svg.select("line.domain");
        this.svg.select("g.x.axis path.domain")
            .remove();
        // If the <g class="y axis"> exists in the chart SVG, just update it
        if (yAxisRef.nodes().length > 0) {
            yAxisRef.transition(t)
                .call(yAxis);
            horizontalLine.transition(t)
                .attr("y1", this.y(0))
                .attr("y2", this.y(0))
                .attr("x1", 0)
                .attr("x2", chartSize.width);
        }
        else {
            yAxisRef = this.innerWrap.append("g")
                .attr("class", "y axis yAxes");
            yAxisRef.call(yAxis);
            yAxisRef.append("line")
                .classed("domain", true)
                .attr("y1", this.y(0))
                .attr("y2", this.y(0))
                .attr("x1", 0)
                .attr("x2", chartSize.width)
                .attr("stroke", _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].domain.color)
                .attr("fill", _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].domain.color)
                .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].domain.strokeWidth);
        }
        _tools__WEBPACK_IMPORTED_MODULE_6__["Tools"].moveToFront(horizontalLine);
        if (scales.y2 && scales.y2.ticks.max) {
            var secondaryYAxis = Object(d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisRight"])(this.y2)
                .ticks(scales.y2.numberOfTicks || _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].y2.numberOfTicks)
                .tickSize(0)
                .tickFormat(scales.y2.formatter);
            var secondaryYAxisRef = this.svg.select("g.y2.axis");
            // If the <g class="y axis"> exists in the chart SVG, just update it
            if (secondaryYAxisRef.nodes().length > 0) {
                secondaryYAxisRef.transition(t)
                    .attr("transform", "translate(" + this.getChartSize().width + ", 0)")
                    .call(secondaryYAxis);
            }
            else {
                this.innerWrap.append("g")
                    .attr("class", "y2 axis yAxes")
                    .attr("transform", "translate(" + this.getChartSize().width + ", 0)")
                    .call(secondaryYAxis);
            }
        }
    };
    BaseAxisChart.prototype.drawXGrid = function () {
        var yHeight = this.getChartSize().height - this.getBBox(".x.axis").height;
        var xGrid = Object(d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisBottom"])(this.x)
            .tickSizeInner(-yHeight)
            .tickSizeOuter(0);
        var g = this.innerWrap.select(".x.grid")
            .attr("transform", "translate(0, " + yHeight + ")")
            .call(xGrid);
        this.cleanGrid(g);
    };
    BaseAxisChart.prototype.drawYGrid = function () {
        var scales = this.options.scales;
        var thresholds = this.options.scales.y.thresholds;
        var yHeight = this.getChartSize().height - this.getBBox(".x.axis").height;
        var yGrid = Object(d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisLeft"])(this.y)
            .tickSizeInner(-this.getChartSize().width)
            .tickSizeOuter(0);
        yGrid.ticks(scales.y.numberOfTicks || _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].y.numberOfTicks);
        var g = this.innerWrap.select(".y.grid")
            .attr("transform", "translate(0, 0)")
            .call(yGrid);
        this.cleanGrid(g);
        if (thresholds && thresholds.length > 0) {
            this.addOrUpdateThresholds(g, false);
        }
    };
    BaseAxisChart.prototype.addOrUpdateThresholds = function (yGrid, animate) {
        var _this = this;
        var t = animate === false ? this.getInstantTransition() : this.getDefaultTransition();
        var width = this.getChartSize().width;
        var thresholds = this.options.scales.y.thresholds;
        // Check if the thresholds container <g> exists
        var thresholdContainerExists = this.innerWrap.select("g.thresholds").nodes().length > 0;
        var thresholdRects = thresholdContainerExists
            ? this.innerWrap.selectAll("g.thresholds rect")
            : this.innerWrap.append("g").classed("thresholds", true).selectAll("rect").data(thresholds);
        var calculateYPosition = function (d) {
            return Math.max(0, _this.y(d.range[1]));
        };
        var calculateHeight = function (d) {
            var height = Math.abs(_this.y(d.range[1]) - _this.y(d.range[0]));
            var yMax = _this.y(_this.y.domain()[0]);
            // If the threshold is getting cropped because it is extending beyond
            // the top of the chart, update its height to reflect the crop
            if (_this.y(d.range[1]) < 0) {
                return Math.max(0, height + _this.y(d.range[1]));
            }
            else if (_this.y(d.range[1]) + height > yMax) {
                // If the threshold is getting cropped because it is extending beyond
                // the bottom of the chart, update its height to reflect the crop
                return Math.max(0, yMax - calculateYPosition(d));
            }
            return Math.max(0, height);
        };
        var calculateOpacity = function (d) {
            var height = Math.abs(_this.y(d.range[1]) - _this.y(d.range[0]));
            // If the threshold is to be shown anywhere
            // outside of the top edge of the chart, hide it
            if (_this.y(d.range[1]) + height <= 0) {
                return 0;
            }
            return 1;
        };
        // Applies to thresholds being added
        thresholdRects.enter()
            .append("rect")
            .classed("bar", true)
            .attr("x", 0)
            .attr("y", function (d) { return calculateYPosition(d); })
            .attr("width", width)
            .attr("height", function (d) { return calculateHeight(d); })
            .attr("fill", function (d) { return _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].y.thresholds.colors[d.theme]; })
            .attr("opacity", 0)
            .transition(t)
            .attr("opacity", function (d) { return calculateOpacity(d); });
        // Update thresholds
        thresholdRects
            .transition(t)
            .attr("x", 0)
            .attr("y", function (d) { return calculateYPosition(d); })
            .attr("width", width)
            .attr("height", function (d) { return calculateHeight(d); })
            .attr("opacity", function (d) { return calculateOpacity(d); })
            .attr("fill", function (d) { return _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].y.thresholds.colors[d.theme]; });
        // Applies to thresholds getting removed
        thresholdRects.exit()
            .transition(t)
            .style("opacity", 0)
            .remove();
    };
    BaseAxisChart.prototype.updateXandYGrid = function (noAnimation) {
        var _this = this;
        var thresholds = this.options.scales.y.thresholds;
        // setTimeout is needed here, to take into account the new position of bars
        // Right after transitions are initiated for the
        setTimeout(function () {
            var t = noAnimation ? _this.getInstantTransition() : _this.getDefaultTransition();
            // Update X Grid
            var chartSize = _this.getChartSize();
            var yHeight = chartSize.height - _this.getBBox(".x.axis").height;
            var xGrid = Object(d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisBottom"])(_this.x)
                .tickSizeInner(-yHeight)
                .tickSizeOuter(0);
            var g_xGrid = _this.innerWrap.select(".x.grid")
                .transition(t)
                .attr("transform", "translate(0, " + yHeight + ")")
                .call(xGrid);
            _this.cleanGrid(g_xGrid);
            // Update Y Grid
            var yGrid = Object(d3_axis__WEBPACK_IMPORTED_MODULE_2__["axisLeft"])(_this.y)
                .tickSizeInner(-chartSize.width)
                .tickSizeOuter(0)
                .tickFormat("");
            var g_yGrid = _this.innerWrap.select(".y.grid")
                .transition(t)
                .attr("transform", "translate(0, 0)")
                .call(yGrid);
            g_yGrid.transition(t);
            _this.cleanGrid(g_yGrid);
            if (thresholds && thresholds.length > 0) {
                _this.addOrUpdateThresholds(g_yGrid, !noAnimation);
            }
        }, 0);
    };
    BaseAxisChart.prototype.cleanGrid = function (g) {
        g.selectAll("line")
            .attr("stroke", _configuration__WEBPACK_IMPORTED_MODULE_5__["grid"].strokeColor);
        g.selectAll("text").style("display", "none").remove();
        g.select(".domain").style("stroke", "none");
    };
    // TODO - Refactor
    BaseAxisChart.prototype.wrapTick = function (ticks) {
        var self = this;
        var letNum = _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].tick.maxLetNum;
        ticks.each(function (t) {
            if (t && t.length > letNum / 2) {
                var tick = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this);
                var y = tick.attr("y");
                tick.text("");
                var tspan1 = tick.append("tspan")
                    .attr("x", 0).attr("y", y).attr("dx", _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].dx).attr("dy", "-" + _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].tick.dy);
                var tspan2 = tick.append("tspan")
                    .attr("x", 0).attr("y", y).attr("dx", _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].dx).attr("dy", _configuration__WEBPACK_IMPORTED_MODULE_5__["scales"].tick.dy);
                if (t.length < letNum - 3) {
                    tspan1.text(t.substring(0, t.length / 2));
                    tspan2.text(t.substring(t.length / 2 + 1, t.length));
                }
                else {
                    tspan1.text(t.substring(0, letNum / 2));
                    tspan2.text(t.substring(letNum / 2, letNum - 3) + "...");
                    tick.on("click", function (dd) {
                        self.showLabelTooltip(dd, true);
                    });
                }
            }
        });
    };
    // TODO - Refactor
    BaseAxisChart.prototype.getLargestTickHeight = function (ticks) {
        var largestHeight = 0;
        ticks.each(function () {
            var tickLength = 0;
            try {
                tickLength = this.getBBox().height;
            }
            catch (e) {
                console.log(e);
            }
            if (tickLength > largestHeight) {
                largestHeight = tickLength;
            }
        });
        return largestHeight;
    };
    /**************************************
     *  Events & User interactions        *
     *************************************/
    BaseAxisChart.prototype.addDataPointEventListener = function () {
        var self = this;
        var accessibility = this.options.accessibility;
        this.svg.selectAll("rect")
            .on("click", function (d) {
            self.dispatchEvent("bar-onClick", d);
        })
            .on("mouseover", function (d) {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_5__["bars"].mouseover.strokeWidth)
                .attr("stroke", self.colorScale[d.datasetLabel](d.label))
                .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_5__["bars"].mouseover.strokeOpacity);
            self.showTooltip(d, this);
            self.reduceOpacity(this);
        })
            .on("mousemove", function (d) {
            var tooltipRef = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(self.holder).select("div.chart-tooltip");
            var relativeMousePosition = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(self.holder);
            tooltipRef.style("left", relativeMousePosition[0] + _configuration__WEBPACK_IMPORTED_MODULE_5__["tooltip"].magicLeft2 + "px")
                .style("top", relativeMousePosition[1] + "px");
        })
            .on("mouseout", function (d) {
            var _a = _configuration__WEBPACK_IMPORTED_MODULE_5__["bars"].mouseout, strokeWidth = _a.strokeWidth, strokeWidthAccessible = _a.strokeWidthAccessible;
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .attr("stroke-width", accessibility ? strokeWidthAccessible : strokeWidth)
                .attr("stroke", accessibility ? self.colorScale[d.datasetLabel](d.label) : "none")
                .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_5__["bars"].mouseout.strokeOpacity);
            self.hideTooltip();
        });
        this.svg.selectAll("circle.dot")
            .on("mouseover", function (d) {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .attr("stroke", self.colorScale[d.datasetLabel](d.label))
                .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_5__["lines"].points.mouseover.strokeOpacity);
            self.showTooltip(d, this);
            self.reduceOpacity(this);
        })
            .on("mouseout", function (d) {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .attr("stroke", self.colorScale[d.datasetLabel](d.label))
                .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_5__["lines"].points.mouseout.strokeOpacity);
            self.hideTooltip();
        });
    };
    return BaseAxisChart;
}(_base_chart__WEBPACK_IMPORTED_MODULE_4__["BaseChart"]));



/***/ }),

/***/ "./src/base-chart.ts":
/*!***************************!*\
  !*** ./src/base-chart.ts ***!
  \***************************/
/*! exports provided: BaseChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseChart", function() { return BaseChart; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/index.js");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-scale */ "../../node_modules/d3-scale/index.js");
/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-transition */ "../../node_modules/d3-transition/index.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tools */ "./src/tools.ts");
/* harmony import */ var _services_patterns__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/patterns */ "./src/services/patterns.ts");
// D3 Imports






var BaseChart = /** @class */ (function () {
    function BaseChart(holder, configs) {
        this.id = "";
        this.chartContainerID = "";
        this.options = Object.assign({}, _configuration__WEBPACK_IMPORTED_MODULE_3__["options"].BASE);
        // Fill scales & fill related objects
        this.patternScale = {};
        this.colorScale = {};
        this.eventHandlers = {
            tooltips: null
        };
        this.id = "chart-" + BaseChart.chartCount++;
        holder.style.position = "relative";
        this.holder = holder;
        var _a = this.setChartIDContainer(), chartId = _a.chartId, container = _a.container;
        this.container = container;
        this.chartContainerID = chartId;
        if (configs.options) {
            this.options = Object.assign({}, this.options, configs.options);
            if (this.options.containerResizable) {
                this.resizeWhenContainerChange();
            }
        }
        this.events = document.createDocumentFragment();
        if (configs.data) {
            this.setData(configs.data);
        }
    }
    BaseChart.prototype.dispatchEvent = function (eventType, eventDetail) {
        var newEvent;
        if (eventDetail) {
            newEvent = new CustomEvent(eventType, {
                detail: eventDetail
            });
        }
        else {
            newEvent = document.createEvent("Event");
            newEvent.initEvent(eventType, false, true);
        }
        this.events.dispatchEvent(newEvent);
    };
    BaseChart.prototype.setData = function (data) {
        var _this = this;
        var initialDraw = !this.innerWrap;
        var newDataIsAPromise = Promise.resolve(data) === data;
        // Dispatch the update event
        this.dispatchEvent("data-change");
        if (initialDraw || newDataIsAPromise) {
            this.updateOverlay().show();
        }
        // Hide current showing tooltip
        if (!initialDraw) {
            this.hideTooltip();
        }
        Promise.resolve(data).then(function (value) {
            // Dispatch the update event
            _this.dispatchEvent("data-load");
            // Process data
            // this.data = this.dataProcessor(Tools.clone(value));
            _this.data = _tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].clone(value);
            _this.displayData = _this.dataProcessor(_tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].clone(value));
            var keys = _this.getKeysFromData();
            // Grab the old legend items, the keys from the current data
            // Compare the two, if there are any differences (additions/removals)
            // Completely remove the legend and render again
            var oldLegendItems = _this.getActiveLegendItems();
            var keysArray = Object.keys(keys);
            var _a = _tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].arrayDifferences(oldLegendItems, keysArray), removedItems = _a.missing, newItems = _a.added;
            // Update keys for legend use the latest data keys
            _this.options.keys = keys;
            // Set the color scale based on the keys present in the data
            _this.setColorScale();
            // Add patterns to page, set pattern scales
            if (_this.options.accessibility) {
                _this.setPatterns();
            }
            // Perform the draw or update chart
            if (initialDraw) {
                _this.initialDraw();
            }
            else {
                if (removedItems.length > 0 || newItems.length > 0) {
                    _this.addOrUpdateLegend();
                }
                _this.update();
            }
        });
    };
    BaseChart.prototype.getKeysFromData = function () {
        var _this = this;
        var datasets = this.displayData.datasets;
        var keys = {};
        if (this.getLegendType() === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].basedOn.LABELS) {
            // Build out the keys array of objects to represent the legend items
            this.displayData.labels.forEach(function (label) {
                keys[label] = _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE;
            });
        }
        else {
            this.displayData.datasets.forEach(function (dataset) {
                keys[dataset.label] = _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE;
            });
        }
        // Apply disabled legend items from previous data
        // That also are applicable to the new data
        var disabledLegendItems = this.getDisabledLegendItems();
        Object.keys(keys).forEach(function (key) {
            if (disabledLegendItems.indexOf(key) !== -1) {
                keys[key] = _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.DISABLED;
            }
        });
        if (!this.fixedDataLabels) {
            this.fixedDataLabels = this.displayData.labels;
        }
        else {
            this.displayData.labels.forEach(function (element) {
                if (_this.fixedDataLabels.indexOf(element) === -1) {
                    _this.fixedDataLabels.push(element);
                }
            });
        }
        return keys;
    };
    BaseChart.prototype.getLegendType = function () {
        var datasets = this.displayData.datasets;
        // TODO - Support the labels based legend for line chart
        if (datasets.length === 1 && datasets[0].backgroundColors.length > 1) {
            return _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].basedOn.LABELS;
        }
        else {
            return _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].basedOn.SERIES;
        }
    };
    BaseChart.prototype.setPatterns = function () {
        var _this = this;
        // Accessibility & patterns
        this.patternsService = new _services_patterns__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.patternsService.addPatternSVGs(this.displayData, this.colorScale, this.chartContainerID, this.getLegendType());
        var patternURLs = this.patternsService.getFillValues();
        Object.keys(patternURLs).forEach(function (datasetLabel) {
            _this.patternScale[datasetLabel] = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleOrdinal"])()
                .range(patternURLs[datasetLabel])
                .domain(_this.getLegendItemKeys());
        });
    };
    BaseChart.prototype.setColorScale = function () {
        var _this = this;
        this.displayData.datasets.forEach(function (dataset) {
            _this.colorScale[dataset.label] = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleOrdinal"])().range(dataset.backgroundColors).domain(_this.fixedDataLabels);
        });
    };
    // TODO - Refactor
    BaseChart.prototype.getChartSize = function (container) {
        if (container === void 0) { container = this.container; }
        var noAxis = this.options.type === "pie" || this.options.type === "donut";
        var ratio, marginForLegendTop;
        if (container.node().clientWidth > _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].widthBreak) {
            ratio = _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].magicRatio;
            marginForLegendTop = 0;
        }
        else {
            marginForLegendTop = _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].marginForLegendTop;
            ratio = 1;
        }
        // Store computed actual size, to be considered for change if chart does not support axis
        var marginsToExclude = noAxis ? 0 : (_configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].margin.left + _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].margin.right);
        var computedChartSize = {
            height: container.node().clientHeight - marginForLegendTop,
            width: (container.node().clientWidth - marginsToExclude) * ratio
        };
        // If chart is of type pie or donut, width and height should equal to the min of the width and height computed
        if (noAxis) {
            var maxSizePossible = Math.min(computedChartSize.height, computedChartSize.width);
            maxSizePossible = Math.max(maxSizePossible, _configuration__WEBPACK_IMPORTED_MODULE_3__["pie"].minWidth);
            return {
                height: maxSizePossible,
                width: maxSizePossible
            };
        }
        return computedChartSize;
    };
    /*
     * removes the chart and any tooltips
     */
    BaseChart.prototype.removeChart = function () {
        this.holder.remove();
    };
    BaseChart.prototype.setSVG = function () {
        var chartSize = this.getChartSize();
        this.svg = this.container.append("svg")
            .classed("chart-svg " + this.options.type, true);
        this.innerWrap = this.svg.append("g")
            .classed("inner-wrap", true);
        return this.svg;
    };
    BaseChart.prototype.updateSVG = function () {
        var chartSize = this.getChartSize();
        this.svg.select(".x.axis")
            .attr("transform", "translate(0, " + chartSize.height + ")");
        var grid = this.svg.select(".grid")
            .attr("clip-path", "url(" + window.location.origin + window.location.pathname + "#clip)");
        grid.select(".x.grid")
            .attr("transform", "translate(0, " + chartSize.width + ")");
        grid.select(".y.grid")
            .attr("transform", "translate(0, 0)");
    };
    // Default fallback when no data processing is needed
    BaseChart.prototype.dataProcessor = function (data) {
        return data;
    };
    /*
     * called when the chart needs to be drawn initially
     */
    BaseChart.prototype.initialDraw = function () {
        console.warn("You should implement your own `initialDraw()` function.");
    };
    BaseChart.prototype.updateChart = function () {
        console.warn("You should implement your own `updateChart()` function.");
    };
    BaseChart.prototype.resizeChart = function () {
        console.warn("You should implement your own `resizeChart()` function.");
    };
    BaseChart.prototype.update = function (value) {
        console.warn("You should implement your own `update()` function.");
    };
    BaseChart.prototype.resizeWhenContainerChange = function () {
        var _this = this;
        var containerWidth = this.holder.clientWidth;
        var containerHeight = this.holder.clientHeight;
        var frame = function () {
            if (Math.abs(containerWidth - _this.holder.clientWidth) > 1
                || Math.abs(containerHeight - _this.holder.clientHeight) > 1) {
                containerWidth = _this.holder.clientWidth;
                containerHeight = _this.holder.clientHeight;
                Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selectAll"])(".legend-tooltip").style("display", "none");
                _this.hideTooltip();
                _this.resizeChart();
            }
            requestAnimationFrame(frame);
        };
        requestAnimationFrame(frame);
    };
    BaseChart.prototype.setClickableLegend = function () {
        var self = this;
        var c = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder);
        if (this.getActiveLegendItems().length === 1) {
            c.selectAll(".legend-btn.active").classed("not-allowed", true);
        }
        // Add hover effect for legend item circles
        self.addLegendCircleHoverEffect();
        c.selectAll(".legend-btn").each(function () {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this).classed("clickable", true);
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this).on("click", function () {
                c.selectAll(".chart-tooltip").remove();
                c.selectAll(".label-tooltip").remove();
                // Only apply legend filters if there are more than 1 active legend items
                var activeLegendItems = self.getActiveLegendItems();
                var legendButton = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this);
                var enabling = !legendButton.classed("active");
                // If there are more than 1 active legend items & one is getting toggled on
                if (activeLegendItems.length > 1 || enabling) {
                    self.updateLegend(this);
                    self.applyLegendFilter(legendButton.select("text").text());
                }
                // If there are 2 active legend items & one is getting toggled off
                if (activeLegendItems.length === 2 && !enabling) {
                    c.selectAll(".legend-btn.active").classed("not-allowed", true);
                }
                if (activeLegendItems.length === 1 && enabling) {
                    c.selectAll(".legend-btn.not-allowed").classed("not-allowed", false);
                }
            });
        });
    };
    BaseChart.prototype.setChartIDContainer = function () {
        var parent = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder);
        var chartId, container;
        if (parent.select(".chart-wrapper").nodes().length > 0) {
            container = parent.select(".chart-wrapper");
            chartId = container.attr("chart-id");
            container.selectAll(".chart-svg").remove();
        }
        else {
            chartId = this.id;
            container = parent.append("div");
            container.attr("chart-id", chartId)
                .classed("chart-wrapper", true);
            if (container.select(".legend-wrapper").nodes().length === 0) {
                var legendWrapper = container.append("div")
                    .attr("class", "legend-wrapper")
                    .attr("role", "region")
                    .attr("aria-label", "Chart " + chartId + " Legend");
                legendWrapper.append("ul")
                    .attr("class", "legend");
            }
        }
        return { chartId: chartId, container: container };
    };
    BaseChart.prototype.resetOpacity = function () {
        var svg = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selectAll"])("svg.chart-svg");
        svg.selectAll("path").attr("fill-opacity", _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].resetOpacity.opacity);
        svg.selectAll("circle")
            .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].resetOpacity.opacity)
            .attr("fill", _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].resetOpacity.circle.fill);
        svg.selectAll("rect")
            .attr("fill-opacity", _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].resetOpacity.opacity)
            .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].resetOpacity.opacity);
    };
    BaseChart.prototype.reduceOpacity = function (exception) {
        // this.svg.selectAll("rect, path").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);
        // this.svg.selectAll("rect, path").attr("stroke-opacity", Configuration.charts.reduceOpacity.opacity);
        var _this = this;
        var exceptedElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(exception);
        var exceptedElementData = exceptedElement.datum();
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(exception).attr("fill-opacity", false);
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(exception).attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].reduceOpacity.opacity);
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(exception).attr("fill", function (d) { return _this.getFillScale()[d.datasetLabel](exceptedElementData.label); });
    };
    // ================================================================================
    // Legend
    // ================================================================================
    BaseChart.prototype.getLegendItems = function () {
        var legendItems = {};
        if (this.options.keys) {
            legendItems = this.options.keys;
        }
        return legendItems;
    };
    BaseChart.prototype.getLegendItemArray = function () {
        var legendItems = this.getLegendItems();
        var legendItemKeys = Object.keys(legendItems);
        return legendItemKeys.map(function (key) { return ({
            key: key,
            value: legendItems[key]
        }); });
    };
    BaseChart.prototype.getLegendItemKeys = function () {
        return Object.keys(this.getLegendItems());
    };
    BaseChart.prototype.getDisabledLegendItems = function () {
        var legendItems = this.getLegendItems();
        var legendItemKeys = Object.keys(legendItems);
        return legendItemKeys.filter(function (itemKey) { return legendItems[itemKey] === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.DISABLED; });
    };
    BaseChart.prototype.getActiveLegendItems = function () {
        var legendItems = this.getLegendItems();
        var legendItemKeys = Object.keys(legendItems);
        return legendItemKeys.filter(function (itemKey) { return legendItems[itemKey] === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE; });
    };
    BaseChart.prototype.updateLegend = function (legend) {
        var thisLegend = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(legend);
        var circle = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(legend).select(".legend-circle");
        thisLegend.classed("active", !thisLegend.classed("active"));
        if (thisLegend.classed("active")) {
            circle.style("background-color", circle.style("border-color"))
                .style("border-color", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].active.borderColor)
                .style("border-style", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].active.borderStyle)
                .style("border-width", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].active.borderWidth);
        }
        else {
            circle.style("border-color", circle.style("background-color"))
                .style("background-color", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].inactive.backgroundColor)
                .style("border-style", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].inactive.borderStyle)
                .style("border-width", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].inactive.borderWidth);
        }
    };
    BaseChart.prototype.addLegend = function () {
        var _this = this;
        if (this.container.select(".legend-tooltip").nodes().length > 0) {
            return;
        }
        var legendItemsArray = this.getLegendItemArray();
        var legendItems = this.container.select(".legend")
            .attr("font-size", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].fontSize)
            .selectAll("li.legend-btn")
            .data(legendItemsArray, function (d) { return d.key; });
        legendItems.exit()
            .remove();
        var legendEnter = legendItems.enter()
            .append("li")
            .attr("class", "legend-btn active");
        legendEnter.append("div")
            .attr("class", "legend-circle");
        legendEnter.append("text");
        legendEnter.selectAll("text")
            .merge(legendItems.selectAll("text"))
            .text(function (d) { return d.key; });
        legendEnter.select("div")
            .merge(legendItems.selectAll("div"))
            .style("background-color", function (d, i) {
            if (_this.getLegendType() === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].basedOn.LABELS && d.value === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE) {
                return _this.colorScale[_this.displayData.datasets[0].label](d.key);
            }
            else if (d.value === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE) {
                return _this.colorScale[d.key]();
            }
            return "white";
        });
    };
    BaseChart.prototype.positionLegend = function () {
        if (this.container.select(".legend-tooltip").nodes().length > 0
            && this.container.select(".legend-tooltip").node().style.display === "block") {
            return;
        }
        this.container.selectAll(".legend-btn").style("display", "inline-block");
        var svgWidth = this.container.select("g.inner-wrap").node().getBBox().width;
        if (this.isLegendOnRight()) {
            this.container.selectAll(".expand-btn").remove();
            this.container.select(".legend-wrapper").style("height", 0);
            var containerWidth = this.container.node().clientWidth;
            var legendWidth = containerWidth - svgWidth;
            this.container.select(".legend").classed("right-legend", true)
                .style("width", legendWidth + "px");
        }
        else {
            this.container.select(".legend-wrapper").style("height", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].wrapperHeight);
        }
        if (this.hasLegendExpandBtn()) {
            this.container.select(".legend").classed("right-legend", false)
                .style("width", null);
            var btns = this.container.selectAll(".legend-btn").nodes();
            var btnsWidth_1 = 0;
            btns.forEach(function (btn) {
                if ((btnsWidth_1 + btn.clientWidth + _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].widthTolerance) > svgWidth) {
                    Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(btn).style("display", "none");
                }
                else {
                    btnsWidth_1 += btn.clientWidth;
                }
            });
            if (this.container.select(".expand-btn").nodes().length === 0) {
                this.addTooltipOpenButtonToLegend();
            }
        }
    };
    BaseChart.prototype.addOrUpdateLegend = function () {
        this.addLegend();
        if (this.options.legendClickable) {
            this.setClickableLegend();
        }
        this.positionLegend();
    };
    BaseChart.prototype.addLegendCircleHoverEffect = function () {
        this.container.selectAll("li.legend-btn")
            .on("mouseover", function () {
            var circleRef = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this).select("div.legend-circle");
            var color = circleRef.node().style.backgroundColor.substring(4, circleRef.node().style.backgroundColor.length - 1);
            circleRef.style("box-shadow", "0 0 0 " + _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].hoverShadowSize + " rgba(" + color + ", " + _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].hoverShadowTransparency + ")");
        })
            .on("mouseout", function () {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this).select("div.legend-circle").style("box-shadow", "none");
        });
    };
    BaseChart.prototype.hasLegendExpandBtn = function () {
        return (this.container.node().clientWidth < _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].widthBreak ||
            this.container.node().clientHeight < this.container.select("ul.legend").node().clientHeight);
    };
    BaseChart.prototype.isLegendOnRight = function () {
        return (this.container.node().clientWidth > _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].widthBreak &&
            this.container.node().clientHeight > this.container.select("ul.legend").node().clientHeight);
    };
    /**
     *
     * When a legend item is clicked, apply/remove the appropriate filter
     * @param {string} changedLabel The label of the legend element the user clicked on
     * @memberof PieChart
     */
    BaseChart.prototype.applyLegendFilter = function (changedLabel) {
        var _a = _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status, ACTIVE = _a.ACTIVE, DISABLED = _a.DISABLED;
        var oldStatus = this.options.keys[changedLabel];
        this.options.keys[changedLabel] = (oldStatus === ACTIVE ? DISABLED : ACTIVE);
        this.update();
    };
    BaseChart.prototype.setClickableLegendInTooltip = function () {
        var self = this;
        var c = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.container);
        var tooltip = c.select(".legend-tooltip-content");
        tooltip.selectAll(".legend-btn").each(function () {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this).on("click", function () {
                self.updateLegend(this);
                // TODO - setClickableLegendInTooltip()
            });
        });
    };
    // ================================================================================
    // Tooltips
    // ================================================================================
    BaseChart.prototype.addTooltipOpenButtonToLegend = function () {
        var self = this;
        var thisLegend = this.container.select(".legend");
        thisLegend.append("div")
            .attr("class", "expand-btn")
            .style("cursor", "pointer")
            .on("click", function () {
            self.openLegendTooltip(this);
        });
    };
    // TODO - Refactor
    BaseChart.prototype.openLegendTooltip = function (target) {
        var _this = this;
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selectAll"])(".legend-tooltip").remove();
        var mouseXPoint = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.container.node())[0];
        var windowXPoint = d3_selection__WEBPACK_IMPORTED_MODULE_0__["event"].x;
        var tooltip;
        if (this.container.select(".legend-tooltip").nodes().length > 0) {
            tooltip = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selectAll"])(".legend-tooltip").style("display", "block");
            tooltip.select("arrow").remove();
        }
        else {
            tooltip = this.container.append("div")
                .attr("class", "tooltip chart-tooltip legend-tooltip")
                .style("display", "block")
                .style("top", (Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.container.node())[1] - _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].margin.top) + "px");
            tooltip.append("p").text("Legend")
                .attr("class", "legend-tooltip-header");
            tooltip.append("ul")
                .attr("class", "legend-tooltip-content")
                .attr("font-size", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].fontSize);
            _tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].addCloseBtn(tooltip, "md", "white")
                .on("click", function () {
                Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selectAll"])(".legend-tooltip").style("display", "none");
            });
            var activeLegendItems_1 = this.getActiveLegendItems();
            var legendContent = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(".legend-tooltip-content")
                .attr("font-size", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].fontSize)
                .selectAll("div")
                .data(this.getLegendItemArray(), function (d) { return d.key; })
                .enter()
                .append("li")
                .classed("legend-btn", true)
                .classed("clickable", this.options.legendClickable)
                .classed("active", function (d) { return d.value === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE; })
                .classed("not-allowed", function (d) { return activeLegendItems_1.length === 1 && d.value === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE; })
                .on("click", function (clickedItem, e) {
                if (!_this.options.legendClickable) {
                    return;
                }
                var legendButton = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(d3_selection__WEBPACK_IMPORTED_MODULE_0__["event"].currentTarget);
                var enabling = !legendButton.classed("active");
                if (activeLegendItems_1.length > 1 || enabling) {
                    _this.updateLegend(d3_selection__WEBPACK_IMPORTED_MODULE_0__["event"].currentTarget);
                    _this.applyLegendFilter(clickedItem.key);
                    _this.container.selectAll("ul.legend li.legend-btn")
                        .data(_this.getLegendItemArray(), function (d) { return d.key; })
                        .classed("active", function (d) { return d.value === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE; })
                        .select("div.legend-circle")
                        .style("background-color", function (d, i) {
                        if (_this.getLegendType() === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].basedOn.LABELS && d.value === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE) {
                            return _this.colorScale[_this.displayData.datasets[0].label](d.key);
                        }
                        else if (d.value === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE) {
                            return _this.colorScale[d.key]();
                        }
                        return "white";
                    })
                        .style("border-color", function (d) {
                        if (_this.getLegendType() === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].basedOn.LABELS) {
                            return _this.colorScale[_this.displayData.datasets[0].label](d.key);
                        }
                        else {
                            return _this.colorScale[d.key]();
                        }
                    })
                        .style("border-style", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].inactive.borderStyle)
                        .style("border-width", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].inactive.borderWidth);
                }
                // If there are 2 active legend items & one is getting toggled off
                if (activeLegendItems_1.length === 2 && !enabling) {
                    _this.container.selectAll(".legend-btn.active").classed("not-allowed", true);
                }
                if (activeLegendItems_1.length === 1 && enabling) {
                    _this.container.selectAll(".legend-btn.not-allowed").classed("not-allowed", false);
                }
            });
            legendContent.append("div")
                .attr("class", "legend-circle")
                .style("background-color", function (d, i) {
                if (_this.getLegendType() === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].basedOn.LABELS && d.value === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE) {
                    return _this.colorScale[_this.displayData.datasets[0].label](d.key);
                }
                else if (d.value === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].items.status.ACTIVE) {
                    return _this.colorScale[d.key]();
                }
                return "white";
            })
                .style("border-color", function (d) {
                if (_this.getLegendType() === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].basedOn.LABELS) {
                    return _this.colorScale[_this.displayData.datasets[0].label](d.key);
                }
                else {
                    return _this.colorScale[d.key]();
                }
            })
                .style("border-style", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].inactive.borderStyle)
                .style("border-width", _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].inactive.borderWidth);
            legendContent.append("text")
                .text(function (d) { return d.key; });
        }
        // Position the tooltip
        tooltip.classed("arrow-right", true);
        tooltip.append("div").attr("class", "arrow");
        tooltip.style("left", mouseXPoint - _configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].width - _configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].arrowWidth + "px");
        if (this.options.legendClickable) {
            this.addLegendCircleHoverEffect();
        }
    };
    BaseChart.prototype.showLabelTooltip = function (d, leftSide) {
        var _this = this;
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selectAll"])(".label-tooltip").remove();
        var mouseXPoint = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.holder)[0] + _configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].arrowWidth;
        var tooltip = this.container.append("div")
            .attr("class", "tooltip label-tooltip")
            .style("top", Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.holder)[1] - _configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].magicTop1 + "px");
        _tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].addCloseBtn(tooltip, "xs")
            .on("click", function () {
            _this.resetOpacity();
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selectAll"])(".tooltip").remove();
        });
        tooltip.append("p").text(d);
        if (leftSide) {
            tooltip.classed("arrow-left", true)
                .style("left", mouseXPoint + "px")
                .append("div").attr("class", "arrow");
        }
        else {
            tooltip.classed("arrow-right", true);
            var xPoint = mouseXPoint - tooltip.node().clientWidth - _configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].magicXPoint2;
            tooltip.style("left", xPoint + "px")
                .append("div").attr("class", "arrow");
        }
    };
    BaseChart.prototype.hideTooltip = function () {
        this.resetOpacity();
        var tooltipRef = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder).select("div.chart-tooltip");
        tooltipRef.style("opacity", 1)
            .transition()
            .duration(_configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].fadeOut.duration)
            .style("opacity", 0)
            .remove();
        this.removeTooltipEventListeners();
    };
    BaseChart.prototype.addTooltipEventListeners = function (tooltip) {
        var _this = this;
        this.eventHandlers.tooltips = function (evt) {
            var targetTagName = evt.target["tagName"];
            var targetsToBeSkipped = ["rect", "circle", "path"];
            // If keyboard event
            if (evt["key"]) {
                if (evt["key"] === "Escape" || evt["key"] === "Esc") {
                    _this.hideTooltip();
                }
            }
            else if (targetsToBeSkipped.indexOf(targetTagName) === -1) {
                // If mouse event
                _this.hideTooltip();
            }
        };
        // Apply the event listeners to close the tooltip
        // setTimeout is there to avoid catching the click event that opened the tooltip
        setTimeout(function () {
            // When ESC is pressed
            window.addEventListener("keydown", _this.eventHandlers.tooltips);
            // TODO - Don't bind on window
            // If clicked outside
            _this.holder.addEventListener("click", _this.eventHandlers.tooltips);
            // Stop clicking inside tooltip from bubbling up to window
            tooltip.on("click", function () {
                d3_selection__WEBPACK_IMPORTED_MODULE_0__["event"].stopPropagation();
            });
        }, 0);
    };
    BaseChart.prototype.removeTooltipEventListeners = function () {
        // TODO - Don't bind on window
        // Remove eventlistener to close tooltip when ESC is pressed
        window.removeEventListener("keydown", this.eventHandlers.tooltips);
        // Remove eventlistener to close tooltip when clicked outside
        this.holder.removeEventListener("click", this.eventHandlers.tooltips);
    };
    BaseChart.prototype.showTooltip = function (d, clickedElement) {
        // Rest opacity of all elements in the chart
        this.resetOpacity();
        // Remove existing tooltips on the page
        // TODO - Update class to not conflict with other elements on page
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selectAll"])(".chart-tooltip").remove();
        // Draw tooltip
        var tooltip = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder).append("div")
            .attr("class", "tooltip chart-tooltip")
            .style("top", Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.holder)[1] - _configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].magicTop2 + "px");
        var tooltipHTML = "";
        var formattedValue = this.options.tooltip.formatter ? this.options.tooltip.formatter(d.value) : d.value.toLocaleString("en");
        if (this.getLegendType() === _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].basedOn.LABELS) {
            tooltipHTML += "\n\t\t\t\t<b>" + d.label + ":</b> " + formattedValue + "<br/>\n\t\t\t";
        }
        else {
            tooltipHTML += "\n\t\t\t\t<b>" + d.datasetLabel + ":</b> " + formattedValue + "<br/>\n\t\t\t";
        }
        tooltip.append("div").attr("class", "text-box").html(tooltipHTML);
        // Draw tooltip arrow in the right direction
        if (Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.holder)[0] + tooltip.node().clientWidth > this.holder.clientWidth) {
            tooltip.style("left", Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.holder)[0] - tooltip.node().clientWidth - _configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].magicLeft1 + "px");
        }
        else {
            tooltip.style("left", Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.holder)[0] + _configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].magicLeft2 + "px");
        }
        tooltip.style("opacity", 0)
            .transition()
            .duration(_configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].fadeIn.duration)
            .style("opacity", 1);
        this.addTooltipEventListeners(tooltip);
    };
    BaseChart.prototype.getFillScale = function () {
        return this.options.accessibility ? this.patternScale : this.colorScale;
    };
    BaseChart.prototype.getDefaultTransition = function () {
        if (this.options.animations === false) {
            return this.getInstantTransition();
        }
        return Object(d3_transition__WEBPACK_IMPORTED_MODULE_2__["transition"])().duration(_configuration__WEBPACK_IMPORTED_MODULE_3__["transitions"].default.duration);
    };
    BaseChart.prototype.getInstantTransition = function () {
        return Object(d3_transition__WEBPACK_IMPORTED_MODULE_2__["transition"])().duration(0);
    };
    // Used to determine whether to use a transition for updating fill attributes in charting elements
    // Will disable the transition if in accessibility mode
    BaseChart.prototype.getFillTransition = function (animate) {
        if (this.options.animations === false) {
            return this.getInstantTransition();
        }
        return Object(d3_transition__WEBPACK_IMPORTED_MODULE_2__["transition"])().duration(animate === false ? 0 : _configuration__WEBPACK_IMPORTED_MODULE_3__["transitions"].default.duration);
    };
    // ================================================================================
    // Loading overlay
    // ================================================================================
    BaseChart.prototype.updateOverlay = function () {
        var _this = this;
        var overlayElement = this.holder.querySelector("div.chart-overlay");
        return {
            show: function () {
                // If overlay element has already been added to the chart container
                // Just show it
                if (overlayElement) {
                    overlayElement.style.display = "block";
                }
                else {
                    var loadingOverlay = document.createElement("div");
                    loadingOverlay.classList.add("chart-overlay");
                    loadingOverlay.innerHTML = _this.options.loadingOverlay.innerHTML;
                    _this.holder.appendChild(loadingOverlay);
                }
            },
            hide: function () {
                overlayElement.style.display = "none";
            }
        };
    };
    BaseChart.prototype.getBBox = function (selector) {
        return this.innerWrap.select(selector).node().getBBox();
    };
    BaseChart.chartCount = 1;
    return BaseChart;
}());



/***/ }),

/***/ "./src/combo-chart.ts":
/*!****************************!*\
  !*** ./src/combo-chart.ts ***!
  \****************************/
/*! exports provided: ComboChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComboChart", function() { return ComboChart; });
/* harmony import */ var _base_axis_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-axis-chart */ "./src/base-axis-chart.ts");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


// TODO - Support adding/removing charts when updating data
var ComboChart = /** @class */ (function (_super) {
    __extends(ComboChart, _super);
    function ComboChart(holder, configs) {
        var _this = _super.call(this, holder, configs) || this;
        // Includes all the sub-charts
        _this.charts = [];
        _this.options.type = "combo";
        return _this;
    }
    // Extract data related to the specific sub-chart
    ComboChart.prototype.extractDataForChart = function (chartType) {
        return Object.assign({}, this.displayData, {
            datasets: this.displayData.datasets.filter(function (_dataset) { return _dataset.chartType === chartType; })
        });
    };
    ComboChart.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.charts && this.charts.length > 0) {
            this.updateChildrenScales();
            this.setChildrenData();
        }
    };
    // This only needs to be performed in the sub-chart instances
    ComboChart.prototype.interpolateValues = function (newData) {
        return;
    };
    // This only needs to be performed in the sub-chart instances
    ComboChart.prototype.addDataPointEventListener = function () {
        return;
    };
    ComboChart.prototype.draw = function () {
        var _this = this;
        // If charts have been initialized
        if (this.charts.length) {
            return;
        }
        this.displayData.datasets.forEach(function (dataset) {
            // If the chart type is valid
            if (_index__WEBPACK_IMPORTED_MODULE_1__[dataset.chartType]) {
                // If the chart for this dataset has not already been created
                if (_this.charts.findIndex(function (chart) { return chart.type === dataset.chartType; }) === -1) {
                    if (_index__WEBPACK_IMPORTED_MODULE_1__[dataset.chartType].prototype instanceof _base_axis_chart__WEBPACK_IMPORTED_MODULE_0__["BaseAxisChart"]) {
                        var chartConfigs = {
                            data: _this.extractDataForChart(dataset.chartType),
                            options: Object.assign({}, _this.options, {
                                axis: {
                                    x: _this.x,
                                    y: _this.y,
                                    y2: _this.y2
                                }
                            })
                        };
                        var chart = new _index__WEBPACK_IMPORTED_MODULE_1__[dataset.chartType](_this.holder, chartConfigs);
                        // Override sub-chart update function
                        chart.update = function () {
                            this.displayData = this.updateDisplayData();
                            this.interpolateValues(this.displayData);
                        };
                        // Add chart to the array of sub-charts
                        _this.charts.push({
                            type: dataset.chartType,
                            instance: chart
                        });
                    }
                    else {
                        console.error("Chart type " + dataset.chartType + " not supported in Combo - your chart should extend BaseAxisChart");
                    }
                }
            }
            else {
                console.error("Invalid chart type: \"" + dataset.chartType + "\"");
            }
        });
    };
    // Pass down the x & y scales to the sub-charts
    ComboChart.prototype.updateChildrenScales = function () {
        var _this = this;
        this.charts.forEach(function (chart) {
            chart.instance.setXScale(_this.x);
            chart.instance.setYScale(_this.y);
        });
    };
    // Extract data related to each sub-chart and set them
    ComboChart.prototype.setChildrenData = function () {
        var _this = this;
        this.charts.forEach(function (chart) {
            var chartData = _this.extractDataForChart(chart.type);
            chart.instance.setData(chartData);
            console.log("SET " + chart.type + " data to", chartData);
        });
    };
    return ComboChart;
}(_base_axis_chart__WEBPACK_IMPORTED_MODULE_0__["BaseAxisChart"]));



/***/ }),

/***/ "./src/configuration.ts":
/*!******************************!*\
  !*** ./src/configuration.ts ***!
  \******************************/
/*! exports provided: options, charts, scales, grid, bars, lines, pie, donut, legend, tooltip, transitions, selectors */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "charts", function() { return charts; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scales", function() { return scales; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grid", function() { return grid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bars", function() { return bars; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lines", function() { return lines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pie", function() { return pie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "donut", function() { return donut; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "legend", function() { return legend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tooltip", function() { return tooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transitions", function() { return transitions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectors", function() { return selectors; });
var baseOptions = {
    legendClickable: true,
    containerResizable: true,
    type: "basic",
    colors: [
        "#00a68f",
        "#3b1a40",
        "#473793",
        "#3c6df0",
        "#56D2BB"
    ],
    tooltip: {
        formatter: null
    },
    loadingOverlay: {
        innerHTML: "\n\t\t<div class=\"loading-overlay-content\">\n\t\t  <div data-loading class=\"bx--loading bx--loading--small\">\n\t\t\t<svg class=\"bx--loading__svg\" viewBox=\"-75 -75 150 150\">\n\t\t\t\t<title>Loading</title>\n\t\t\t\t<circle cx=\"0\" cy=\"0\" r=\"37.5\" />\n\t\t\t</svg>\n\t\t  </div>\n\n\t\t  <p>Loading</p>\n\t\t</div>\n\t\t"
    }
};
var axisOptions = Object.assign({}, baseOptions, {
    series: [],
    scales: {
        x: {
            domain: null,
            ticks: 5
        },
        y: {
            domain: null,
            ticks: 5
        },
        ySecondary: {
            domain: null,
            ticks: 10
        }
    }
});
var options = {
    BASE: baseOptions,
    AXIS: axisOptions
};
var charts = {
    margin: {
        top: 20,
        bottom: 60,
        left: 60,
        right: 20,
        bar: {
            top: 0,
            right: -40,
            bottom: 50,
            left: 40
        },
        line: {
            top: 0,
            right: -40,
            bottom: 50,
            left: 40
        }
    },
    resetOpacity: {
        opacity: 1,
        circle: {
            fill: "white"
        },
        outline: "grey"
    },
    reduceOpacity: {
        opacity: 0.25,
        outline: "grey"
    },
    pointCircles: {
        radius: 4
    },
    patternFills: {
        width: 20,
        height: 20
    },
    widthBreak: 600,
    marginForLegendTop: 40,
    magicRatio: 0.7,
    magicMoreForY2Axis: 70
};
var scales = {
    maxWidthOfAxisLabel: 175,
    maxNumOfAxisLabelLetters: 60,
    yAxisAngle: -90,
    xAxisAngle: -45,
    domain: {
        color: "#959595",
        strokeWidth: 2
    },
    dx: "-1em",
    label: {
        dy: "1em"
    },
    tick: {
        dy: "0.5em",
        widthAdditionY: 25,
        widthAdditionY2: 15,
        heightAddition: 16,
        maxLetNum: 28
    },
    magicDy1: "0.71em",
    magicY1: 9,
    magicX1: -4,
    y: {
        numberOfTicks: 5,
        thresholds: {
            colors: {
                "danger": "rgba(255, 39, 41, 0.1)",
                "success": "rgba(0, 212, 117, 0.1)",
                "warning": "rgba(255, 214, 0, 0.1)"
            }
        }
    },
    x: {
        numberOfTicks: 5,
        padding: 0.2
    },
    y2: {
        numberOfTicks: 5
    }
};
var grid = {
    strokeColor: "#ECEEEF"
};
var bars = {
    mouseover: {
        strokeWidth: 4,
        strokeOpacity: 0.5
    },
    mouseout: {
        strokeWidth: 0,
        strokeWidthAccessible: 2,
        strokeOpacity: 1
    },
    default: {
        strokeWidth: 2
    },
    spacing: {
        bars: 0.2,
        datasets: 0.25
    }
};
var lines = {
    points: {
        strokeWidth: 4,
        mouseover: {
            strokeWidth: 4,
            strokeOpacity: 0.5
        },
        mouseout: {
            strokeWidth: 0,
            strokeWidthAccessible: 2,
            strokeOpacity: 1
        }
    }
};
var pie = {
    minWidth: 100,
    maxWidth: 516.6,
    mouseover: {
        strokeWidth: 6,
        strokeOpacity: 0.5
    },
    mouseout: {
        strokeWidth: 0,
        strokeOpacity: 1
    },
    sliceLimit: 6,
    label: {
        dy: ".32em",
        margin: 15,
        other: "Other"
    },
    default: {
        strokeWidth: 2
    }
};
var donut = {
    centerText: {
        title: {
            y: 22
        },
        breakpoint: 175,
        magicScaleRatio: 2.5,
        numberFontSize: 24,
        titleFontSize: 15
    }
};
var legend = {
    countBreak: 4,
    fontSize: 12,
    wrapperHeight: "40px",
    widthTolerance: 15,
    hoverShadowSize: "3px",
    hoverShadowTransparency: 0.2,
    margin: {
        top: 19
    },
    active: {
        borderColor: false,
        borderStyle: false,
        borderWidth: false
    },
    inactive: {
        backgroundColor: "white",
        borderStyle: "solid",
        borderWidth: "2px"
    },
    items: {
        status: {
            ACTIVE: 1,
            DISABLED: 0
        },
    },
    basedOn: {
        SERIES: "series",
        LABELS: "labels"
    }
};
var tooltip = {
    width: 200,
    arrowWidth: 10,
    magicXPoint2: 20,
    magicTop1: 21,
    magicTop2: 22,
    magicLeft1: 11,
    magicLeft2: 12,
    fadeIn: {
        duration: 250
    },
    fadeOut: {
        duration: 250
    }
};
var transitions = {
    default: {
        duration: 750
    }
};
var selectors = {
    OUTERSVG: "svg.chart-svg",
    INNERWRAP: "g.inner-wrap",
    CHARTWRAPPER: "div.chart-wrapper",
    TOOLTIP: "div.chart-tooltip",
    LEGEND_BTN: "li.legend-btn",
    pie: {
        SLICE: "path"
    }
};


/***/ }),

/***/ "./src/donut-chart.ts":
/*!****************************!*\
  !*** ./src/donut-chart.ts ***!
  \****************************/
/*! exports provided: DonutCenter, DonutChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DonutCenter", function() { return DonutCenter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DonutChart", function() { return DonutChart; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ "../../node_modules/d3-interpolate/index.js");
/* harmony import */ var _pie_chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pie-chart */ "./src/pie-chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// D3 Imports




var DonutCenter = /** @class */ (function () {
    function DonutCenter(configs) {
        if (configs) {
            this.configs = configs;
            // Keep track of changes to the configs above
            this.oldConfigs = Object.assign({}, configs);
        }
        else {
            console.error("Configuration object is missing for DonutCenter");
        }
    }
    DonutCenter.prototype.draw = function (innerWrap) {
        // Add the number shown in the center of the donut
        innerWrap.append("text")
            .attr("class", "donut-figure")
            .attr("text-anchor", "middle")
            .text(this.configs.number.toLocaleString());
        // Add the label below the number in the center of the donut
        innerWrap.append("text")
            .attr("class", "donut-title")
            .attr("text-anchor", "middle")
            .attr("y", _configuration__WEBPACK_IMPORTED_MODULE_3__["donut"].centerText.title.y)
            .text(this.configs.label);
        this.donutSVG = innerWrap;
    };
    DonutCenter.prototype.update = function () {
        var possiblyNewConfigs = this.configs;
        // If the configs are different from the previous update() call
        if (this.oldConfigs !== possiblyNewConfigs) {
            var newNumber_1 = this.configs.number;
            // Update center number
            this.donutSVG.select("text.donut-figure")
                .transition()
                .duration(_configuration__WEBPACK_IMPORTED_MODULE_3__["transitions"].default.duration)
                .tween("text", function () {
                return donutCenterNumberTween(Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this), newNumber_1);
            });
            // Update center label
            this.donutSVG.select("text.donut-title")
                .text(this.configs.label);
            // Set the latest configs in record to keep track of future config updates
            this.oldConfigs = Object.assign({}, this.configs);
        }
    };
    DonutCenter.prototype.resize = function (svgElement, actualChartSize) {
        var dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);
        var pieConfigs = _configuration__WEBPACK_IMPORTED_MODULE_3__["pie"];
        var scaleRatio = dimensionToUseForScale / pieConfigs.maxWidth;
        // If the dimensions of the chart are smaller than a certain number (e.g. 175x175)
        // Resize the center text sizes
        if (dimensionToUseForScale < _configuration__WEBPACK_IMPORTED_MODULE_3__["donut"].centerText.breakpoint) {
            svgElement.select("text.donut-figure")
                .style("font-size", _configuration__WEBPACK_IMPORTED_MODULE_3__["donut"].centerText.numberFontSize * scaleRatio * _configuration__WEBPACK_IMPORTED_MODULE_3__["donut"].centerText.magicScaleRatio + "px");
            svgElement.select("text.donut-title")
                .style("font-size", _configuration__WEBPACK_IMPORTED_MODULE_3__["donut"].centerText.titleFontSize * scaleRatio * _configuration__WEBPACK_IMPORTED_MODULE_3__["donut"].centerText.magicScaleRatio + "px")
                .attr("y", _configuration__WEBPACK_IMPORTED_MODULE_3__["donut"].centerText.title.y * scaleRatio * _configuration__WEBPACK_IMPORTED_MODULE_3__["donut"].centerText.magicScaleRatio);
        }
    };
    return DonutCenter;
}());

var DonutChart = /** @class */ (function (_super) {
    __extends(DonutChart, _super);
    function DonutChart(holder, configs) {
        var _this = _super.call(this, holder, configs, "donut") || this;
        // Check if the DonutCenter object is provided
        if (configs.options.centerLabel) {
            _this.center = new DonutCenter({
                label: configs.options.centerLabel
            });
        }
        return _this;
    }
    DonutChart.prototype.draw = function () {
        _super.prototype.draw.call(this);
        // Draw the center text
        if (this.center && this.center.configs) {
            var sumOfDatapoints = this.displayData.datasets[0].data.reduce(function (accum, currVal) { return accum + currVal.value; }, 0);
            this.center.configs.number = sumOfDatapoints;
            this.center.draw(this.innerWrap);
        }
    };
    DonutChart.prototype.resizeChart = function () {
        if (this.innerWrap) {
            // Inherit resizing logic from PieChart
            _super.prototype.resizeChart.call(this);
            if (this.center) {
                // Trigger resize on DonutCenter as well
                this.center.resize(this.innerWrap, this.getChartSize(this.container));
            }
        }
    };
    DonutChart.prototype.update = function () {
        _super.prototype.update.call(this);
        if (this.center) {
            var sumOfDatapoints = this.displayData.datasets[0].data.reduce(function (accum, currVal) { return accum + currVal.value; }, 0);
            this.center.configs.number = sumOfDatapoints;
            this.center.update();
        }
    };
    return DonutChart;
}(_pie_chart__WEBPACK_IMPORTED_MODULE_2__["PieChart"]));

function donutCenterNumberTween(d3Ref, newNumber) {
    // Remove commas from the current value string, and convert to an int
    var currentValue = parseInt(d3Ref.text().replace(/[, ]+/g, ""), 10);
    var i = Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_1__["interpolateNumber"])(currentValue, newNumber);
    var formatInterpolatedValue = function (number) { return Math.floor(number).toLocaleString(); };
    return function (t) {
        d3Ref.text(formatInterpolatedValue(i(t)));
    };
}


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: defaultColors, BaseChart, BaseAxisChart, PieChart, DonutChart, DonutCenter, BarChart, LineChart, ComboChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultColors", function() { return defaultColors; });
/* harmony import */ var _base_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-chart */ "./src/base-chart.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseChart", function() { return _base_chart__WEBPACK_IMPORTED_MODULE_0__["BaseChart"]; });

/* harmony import */ var _base_axis_chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-axis-chart */ "./src/base-axis-chart.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseAxisChart", function() { return _base_axis_chart__WEBPACK_IMPORTED_MODULE_1__["BaseAxisChart"]; });

/* harmony import */ var _pie_chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pie-chart */ "./src/pie-chart.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PieChart", function() { return _pie_chart__WEBPACK_IMPORTED_MODULE_2__["PieChart"]; });

/* harmony import */ var _donut_chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./donut-chart */ "./src/donut-chart.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DonutChart", function() { return _donut_chart__WEBPACK_IMPORTED_MODULE_3__["DonutChart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DonutCenter", function() { return _donut_chart__WEBPACK_IMPORTED_MODULE_3__["DonutCenter"]; });

/* harmony import */ var _bar_chart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./bar-chart */ "./src/bar-chart.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BarChart", function() { return _bar_chart__WEBPACK_IMPORTED_MODULE_4__["BarChart"]; });

/* harmony import */ var _line_chart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./line-chart */ "./src/line-chart.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LineChart", function() { return _line_chart__WEBPACK_IMPORTED_MODULE_5__["LineChart"]; });

/* harmony import */ var _combo_chart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./combo-chart */ "./src/combo-chart.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ComboChart", function() { return _combo_chart__WEBPACK_IMPORTED_MODULE_6__["ComboChart"]; });

/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_8__);
__webpack_require__(/*! ./polyfills */ "./src/polyfills.ts");








var defaultColors = _configuration__WEBPACK_IMPORTED_MODULE_7__["options"].BASE.colors;




/***/ }),

/***/ "./src/line-chart.ts":
/*!***************************!*\
  !*** ./src/line-chart.ts ***!
  \***************************/
/*! exports provided: LineChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChart", function() { return LineChart; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/index.js");
/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-shape */ "../../node_modules/d3-shape/index.js");
/* harmony import */ var _base_axis_chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./base-axis-chart */ "./src/base-axis-chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony import */ var _services_curves__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/curves */ "./src/services/curves.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// D3 Imports





var LineChart = /** @class */ (function (_super) {
    __extends(LineChart, _super);
    function LineChart(holder, configs) {
        var _this = _super.call(this, holder, configs) || this;
        _this.options.type = "line";
        return _this;
    }
    LineChart.prototype.getLegendType = function () {
        return _configuration__WEBPACK_IMPORTED_MODULE_3__["legend"].basedOn.SERIES;
    };
    LineChart.prototype.addLabelsToDataPoints = function (d, index) {
        var labels = this.displayData.labels;
        return d.data.map(function (datum, i) { return ({
            label: labels[i],
            datasetLabel: d.label,
            value: datum
        }); });
    };
    LineChart.prototype.draw = function () {
        var _this = this;
        this.innerWrap.style("width", "100%")
            .style("height", "100%");
        var margins = _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].margin.line;
        var scales = this.options.scales;
        var chartSize = this.getChartSize();
        var width = chartSize.width - margins.left - margins.right;
        var height = chartSize.height - this.getBBox(".x.axis").height;
        this.innerWrap.style("width", "100%")
            .style("height", "100%");
        this.innerWrap.attr("transform", "translate(" + margins.left + ", " + margins.top + ")");
        // D3 line generator function
        this.lineGenerator = Object(d3_shape__WEBPACK_IMPORTED_MODULE_1__["line"])()
            .x(function (d, i) { return _this.x(_this.displayData.labels[i]) + margins.left; })
            .y(function (d) { return _this.y(d); })
            .curve(Object(_services_curves__WEBPACK_IMPORTED_MODULE_4__["getD3Curve"])(this.options.curve) || Object(_services_curves__WEBPACK_IMPORTED_MODULE_4__["getD3Curve"])("curveLinear"));
        var gLines = this.innerWrap.selectAll("g.lines")
            .data(this.displayData.datasets)
            .enter()
            .append("g")
            .classed("lines", true);
        gLines.append("path")
            .attr("stroke", function (d) { return _this.colorScale[d.label](); })
            .datum(function (d) { return d.data; })
            .attr("class", "line")
            .attr("d", this.lineGenerator);
        gLines.selectAll("circle.dot")
            .data(function (d, i) { return _this.addLabelsToDataPoints(d, i); })
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", function (d) { return _this.x(d.label) + margins.left; })
            .attr("cy", function (d) { return _this.y(d.value); })
            .attr("r", _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].pointCircles.radius)
            .attr("stroke", function (d) { return _this.colorScale[d.datasetLabel](d.label); });
        // Hide the overlay
        this.updateOverlay().hide();
        // Dispatch the load event
        this.dispatchEvent("load");
    };
    LineChart.prototype.interpolateValues = function (newData) {
        var _this = this;
        var margins = _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].margin.line;
        var chartSize = this.getChartSize();
        var width = chartSize.width - margins.left - margins.right;
        var height = chartSize.height - this.getBBox(".x.axis").height;
        // Apply new data to the lines
        var gLines = this.innerWrap.selectAll("g.lines")
            .data(newData.datasets);
        this.updateElements(true, gLines);
        // Add lines that need to be added now
        var addedLineGroups = gLines.enter()
            .append("g")
            .classed("lines", true);
        addedLineGroups.append("path")
            .attr("stroke", function (d) { return _this.colorScale[d.label](); })
            .datum(function (d) { return d.data; })
            .style("opacity", 0)
            .transition(this.getDefaultTransition())
            .style("opacity", 1)
            .attr("class", "line")
            .attr("d", this.lineGenerator);
        // Add line circles
        addedLineGroups.selectAll("circle.dot")
            .data(function (d, i) { return _this.addLabelsToDataPoints(d, i); })
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", function (d, i) { return _this.x(d.label) + margins.left; })
            .attr("cy", function (d) { return _this.y(d.value); })
            .attr("r", 4)
            .style("opacity", 0)
            .transition(this.getDefaultTransition())
            .style("opacity", 1)
            .attr("stroke", function (d) { return _this.colorScale[d.datasetLabel](d.label); });
        // Remove lines that are no longer needed
        gLines.exit()
            .transition(this.getDefaultTransition())
            .style("opacity", 0)
            .remove();
        // Add slice hover actions, and clear any slice borders present
        this.addDataPointEventListener();
        // Hide the overlay
        this.updateOverlay().hide();
        // Dispatch the update event
        this.dispatchEvent("update");
    };
    LineChart.prototype.updateElements = function (animate, gLines) {
        var _this = this;
        var scales = this.options.scales;
        var chartSize = this.getChartSize();
        var height = chartSize.height - this.getBBox(".x.axis").height;
        if (!gLines) {
            gLines = this.innerWrap.selectAll("g.lines");
        }
        var transitionToUse = animate ? this.getFillTransition() : this.getInstantTransition();
        var self = this;
        gLines.selectAll("path.line")
            .datum(function (d) {
            var parentDatum = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.parentNode).datum();
            return parentDatum.data;
        })
            .transition(transitionToUse)
            .attr("stroke", function (d) {
            var parentDatum = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.parentNode).datum();
            return self.colorScale[parentDatum.label]();
        })
            .attr("class", "line")
            .attr("d", this.lineGenerator);
        var margins = _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].margin.line;
        gLines.selectAll("circle.dot")
            .data(function (d, i) {
            var parentDatum = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this).datum();
            return self.addLabelsToDataPoints(parentDatum, i);
        })
            .transition(transitionToUse)
            .attr("cx", function (d) { return _this.x(d.label) + margins.left; })
            .attr("cy", function (d) { return _this.y(d.value); })
            .attr("r", _configuration__WEBPACK_IMPORTED_MODULE_3__["lines"].points.strokeWidth)
            .attr("stroke", function (d) { return _this.colorScale[d.datasetLabel](d.label); });
    };
    LineChart.prototype.resizeChart = function () {
        var chartSize = this.getChartSize(this.container);
        var dimensionToUseForScale = Math.min(chartSize.width, chartSize.height);
        // Resize the SVG
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder).select("svg")
            .attr("width", dimensionToUseForScale + "px")
            .attr("height", dimensionToUseForScale + "px");
        this.updateXandYGrid(true);
        // Scale out the domains
        this.setXScale();
        this.setYScale();
        // Set the x & y axis as well as their labels
        this.setXAxis(true);
        this.setYAxis(true);
        this.updateElements(false, null);
        _super.prototype.resizeChart.call(this);
    };
    LineChart.prototype.addDataPointEventListener = function () {
        var self = this;
        var accessibility = this.options.accessibility;
        this.svg.selectAll("circle.dot")
            .on("click", function (d) {
            self.dispatchEvent("line-onClick", d);
        })
            .on("mouseover", function (d) {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_3__["lines"].points.mouseover.strokeWidth)
                .attr("stroke", self.colorScale[d.datasetLabel](d.label))
                .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_3__["lines"].points.mouseover.strokeOpacity);
            self.showTooltip(d, this);
            self.reduceOpacity(this);
        })
            .on("mousemove", function (d) {
            var tooltipRef = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(self.holder).select("div.chart-tooltip");
            var relativeMousePosition = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(self.holder);
            tooltipRef.style("left", relativeMousePosition[0] + _configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].magicLeft2 + "px")
                .style("top", relativeMousePosition[1] + "px");
        })
            .on("mouseout", function (d) {
            var _a = _configuration__WEBPACK_IMPORTED_MODULE_3__["lines"].points.mouseout, strokeWidth = _a.strokeWidth, strokeWidthAccessible = _a.strokeWidthAccessible;
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .attr("stroke-width", accessibility ? strokeWidthAccessible : strokeWidth)
                .attr("stroke", self.colorScale[d.datasetLabel](d.label))
                .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_3__["lines"].points.mouseout.strokeOpacity);
            self.hideTooltip();
        });
    };
    return LineChart;
}(_base_axis_chart__WEBPACK_IMPORTED_MODULE_2__["BaseAxisChart"]));



/***/ }),

/***/ "./src/pie-chart.ts":
/*!**************************!*\
  !*** ./src/pie-chart.ts ***!
  \**************************/
/*! exports provided: PieChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieChart", function() { return PieChart; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/index.js");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-scale */ "../../node_modules/d3-scale/index.js");
/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-shape */ "../../node_modules/d3-shape/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-interpolate */ "../../node_modules/d3-interpolate/index.js");
/* harmony import */ var _base_chart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base-chart */ "./src/base-chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tools */ "./src/tools.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// D3 Imports







var PieChart = /** @class */ (function (_super) {
    __extends(PieChart, _super);
    function PieChart(holder, configs, type) {
        if (type === void 0) { type = "pie"; }
        var _this = _super.call(this, holder, configs) || this;
        _this.options.type = type;
        // Assign colors to each slice using their label
        _this.colorScale = Object(d3_scale__WEBPACK_IMPORTED_MODULE_1__["scaleOrdinal"])(_this.options.colors);
        return _this;
    }
    // Sort data by value (descending)
    // Cap number of slices at a specific number, and group the remaining items into the label "Other"
    PieChart.prototype.dataProcessor = function (dataObject) {
        // TODO - Support multiple datasets
        // Check for duplicate keys in the data
        var duplicates = _tools__WEBPACK_IMPORTED_MODULE_6__["Tools"].getDuplicateValues(dataObject.labels);
        if (duplicates.length > 0) {
            console.error(_tools__WEBPACK_IMPORTED_MODULE_6__["Tools"].capitalizeFirstLetter(this.options.type) + " Chart - You have duplicate keys", duplicates);
        }
        // TODO - Support multiple datasets
        // let sortedData = data.datasets[0];
        var dataList = dataObject.datasets[0].data.map(function (datum, i) { return ({
            label: dataObject.labels[i],
            value: datum,
        }); });
        // Sort data by value
        var sortedData = dataList.sort(function (a, b) { return b.value - a.value; });
        // Keep a certain number of slices, and add an "Other" slice for the rest
        var stopAt = _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].sliceLimit;
        var rest = sortedData.slice(stopAt);
        var restAccumulatedValue = rest.reduce(function (accum, item) { return accum + item.value; }, 0);
        var otherLabelIndex = sortedData.findIndex(function (dataPoint) { return dataPoint.label === "Other"; });
        if (otherLabelIndex !== -1) {
            sortedData.push(sortedData.splice(otherLabelIndex, 1)[0]);
        }
        else if (rest.length > 0) {
            sortedData = sortedData.slice(0, stopAt)
                .concat([{
                    label: _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].label.other,
                    value: restAccumulatedValue,
                    items: rest
                }]);
        }
        // Sort labels based on the order made above
        dataObject.labels = sortedData.map(function (datum, i) { return datum.label; });
        dataObject.datasets[0].data = sortedData;
        return dataObject;
    };
    // If there isn't a chart already drawn in the container
    // This function is called and will do that
    PieChart.prototype.initialDraw = function () {
        this.setSVG();
        // Add legend
        this.addOrUpdateLegend();
        // Draw slices & labels
        this.draw();
        // Add event listeners to slices
        this.addDataPointEventListener();
    };
    PieChart.prototype.draw = function () {
        var _this = this;
        var dataList = this.displayData.datasets[0].data;
        var chartSize = this.getChartSize(this.container);
        var diameter = Math.min(chartSize.width, chartSize.height);
        var radius = diameter / 2;
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder).select("svg")
            .attr("width", diameter + "px")
            .attr("height", diameter + "px");
        this.innerWrap
            .style("transform", "translate(" + radius + "px," + radius + "px)")
            .attr("width", diameter + "px")
            .attr("height", diameter + "px")
            .attr("preserveAspectRatio", "xMinYMin");
        // Compute the correct inner & outer radius
        var pieConfigs = _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"];
        var marginedRadius = radius - (pieConfigs.label.margin * (chartSize.width / pieConfigs.maxWidth));
        this.arc = Object(d3_shape__WEBPACK_IMPORTED_MODULE_2__["arc"])()
            .innerRadius(this.options.type === "donut" ? (marginedRadius * (2 / 3)) : 0)
            .outerRadius(marginedRadius);
        this.pie = Object(d3_shape__WEBPACK_IMPORTED_MODULE_2__["pie"])()
            .value(function (d) { return d.value; })
            .sort(null);
        // Draw the slices
        this.path = this.innerWrap.selectAll("path")
            .data(this.pie(dataList))
            .enter()
            .append("path")
            .attr("d", this.arc)
            .attr("fill", function (d) { return _this.getFillScale()[_this.displayData.datasets[0].label](d.data.label); }) // Support multiple datasets
            .attr("stroke", function (d) { return _this.colorScale[_this.displayData.datasets[0].label](d.data.label); })
            .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].default.strokeWidth)
            .attr("stroke-opacity", function (d) { return _this.options.accessibility ? 1 : 0; })
            .each(function (d) { this._current = d; });
        // Draw the slice labels
        this.innerWrap
            .selectAll("text.chart-label")
            .data(this.pie(dataList), function (d) { return d.data.label; })
            .enter()
            .append("text")
            .classed("chart-label", true)
            .attr("dy", _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].label.dy)
            .style("text-anchor", this.deriveTextAnchor)
            .attr("transform", function (d) { return _this.deriveTransformString(d, radius); })
            .text(function (d) { return _tools__WEBPACK_IMPORTED_MODULE_6__["Tools"].convertValueToPercentage(d.data.value, dataList); });
        // Hide overlay
        this.updateOverlay().hide();
    };
    // Interpolated transitions for older data points to reflect the new data changes
    PieChart.prototype.interpolateValues = function (newData) {
        var _this = this;
        var dataList = newData.datasets[0].data;
        // Apply the new data to the slices, and interpolate them
        var self = this;
        var path = this.innerWrap.selectAll("path").data(this.pie(dataList));
        // Update slices
        path
            .transition()
            .duration(0)
            .attr("stroke", function (d) { return _this.colorScale[_this.displayData.datasets[0].label](d.data.label); })
            .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].default.strokeWidth)
            .attr("stroke-opacity", function (d) { return _this.options.accessibility ? 1 : 0; })
            .transition()
            .duration(_configuration__WEBPACK_IMPORTED_MODULE_5__["transitions"].default.duration)
            .attr("fill", function (d) { return _this.getFillScale()[_this.displayData.datasets[0].label](d.data.label); })
            .attrTween("d", function (a) {
            return arcTween.bind(this)(a, self.arc);
        });
        path.enter()
            .append("path")
            .attr("d", this.arc)
            .transition()
            .duration(0)
            .style("opacity", 0)
            .attr("stroke", function (d) { return _this.colorScale[_this.displayData.datasets[0].label](d.data.label); })
            .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].default.strokeWidth)
            .attr("stroke-opacity", function (d) { return _this.options.accessibility ? 1 : 0; })
            .transition()
            .duration(_configuration__WEBPACK_IMPORTED_MODULE_5__["transitions"].default.duration)
            .attr("fill", function (d) { return _this.getFillScale()[_this.displayData.datasets[0].label](d.data.label); })
            .style("opacity", 1)
            .attrTween("d", function (a) {
            return arcTween.bind(this)(a, self.arc);
        });
        path
            .exit()
            .attr("d", this.arc)
            .transition()
            .duration(_configuration__WEBPACK_IMPORTED_MODULE_5__["transitions"].default.duration)
            .style("opacity", 0)
            .remove();
        // Fade out all text labels
        this.innerWrap.selectAll("text.chart-label")
            .transition()
            .duration(_configuration__WEBPACK_IMPORTED_MODULE_5__["transitions"].default.duration / 2)
            .style("opacity", 0)
            .on("end", function (d) {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .transition()
                .duration(_configuration__WEBPACK_IMPORTED_MODULE_5__["transitions"].default.duration / 2)
                .style("opacity", 1);
        });
        // Move text labels to their new location, and fade them in again
        var radius = this.computeRadius();
        setTimeout(function () {
            var text = _this.innerWrap.selectAll("text.chart-label")
                .data(_this.pie(dataList), function (d) { return d.label; });
            text
                .enter()
                .append("text")
                .classed("chart-label", true)
                .attr("dy", _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].label.dy)
                .style("text-anchor", _this.deriveTextAnchor)
                .attr("transform", function (d) { return _this.deriveTransformString(d, radius); })
                .text(function (d) { return _tools__WEBPACK_IMPORTED_MODULE_6__["Tools"].convertValueToPercentage(d.data.value, dataList); })
                .style("opacity", 0)
                .transition()
                .duration(_configuration__WEBPACK_IMPORTED_MODULE_5__["transitions"].default.duration / 2)
                .style("opacity", 1);
            text
                .attr("dy", _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].label.dy)
                .style("text-anchor", _this.deriveTextAnchor)
                .attr("transform", function (d) { return _this.deriveTransformString(d, radius); })
                .text(function (d) { return _tools__WEBPACK_IMPORTED_MODULE_6__["Tools"].convertValueToPercentage(d.data.value, dataList); })
                .transition()
                .duration(_configuration__WEBPACK_IMPORTED_MODULE_5__["transitions"].default.duration / 2)
                .style("opacity", 1);
            text
                .exit()
                .remove();
        }, _configuration__WEBPACK_IMPORTED_MODULE_5__["transitions"].default.duration / 2);
        // Add slice hover actions, and clear any slice borders present
        this.addDataPointEventListener();
        this.reduceOpacity();
        // Hide the overlay
        this.updateOverlay().hide();
    };
    // TODO - Possible inherits from base-chart
    PieChart.prototype.reduceOpacity = function (exception) {
        var _this = this;
        if (exception) {
            // this.innerWrap.selectAll("path").attr("fill-opacity", Configuration.charts.reduceOpacity.opacity);
            // Fade everything out except for this element
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(exception).attr("fill-opacity", false);
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(exception).attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_5__["charts"].reduceOpacity.opacity);
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(exception).attr("fill", function (d) { return _this.getFillScale()[_this.displayData.datasets[0].label](d.data.label); });
        }
    };
    // TODO - Should inherit most logic from base-chart
    PieChart.prototype.showTooltip = function (d) {
        this.resetOpacity();
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["selectAll"])(".tooltip").remove();
        var tooltip = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder).append("div")
            .attr("class", "tooltip chart-tooltip")
            .style("top", Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.holder)[1] - _configuration__WEBPACK_IMPORTED_MODULE_5__["tooltip"].magicTop2 + "px");
        var dVal = d.value.toLocaleString();
        var tooltipHTML = "\n\t\t\t<p class='bignum'>" + dVal + "</p>\n\t\t\t<p>" + d.data.label + "</p>\n\t\t";
        tooltip.append("div").attr("class", "text-box").html(tooltipHTML);
        if (Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.holder)[0] + tooltip.node().clientWidth > this.holder.clientWidth) {
            tooltip.style("left", Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.holder)[0] - tooltip.node().clientWidth - _configuration__WEBPACK_IMPORTED_MODULE_5__["tooltip"].magicLeft1 + "px");
        }
        else {
            tooltip.style("left", Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(this.holder)[0] + _configuration__WEBPACK_IMPORTED_MODULE_5__["tooltip"].magicLeft2 + "px");
        }
        tooltip.style("opacity", 0)
            .transition()
            .duration(_configuration__WEBPACK_IMPORTED_MODULE_5__["tooltip"].fadeIn.duration)
            .style("opacity", 1);
        this.addTooltipEventListeners(tooltip);
    };
    // TODO - Refactor
    PieChart.prototype.addDataPointEventListener = function () {
        var self = this;
        var accessibility = this.options.accessibility;
        this.innerWrap.selectAll("path")
            .on("click", function (d) {
            self.dispatchEvent("pie-slice-onClick", d);
        })
            .on("mouseover", function (d) {
            var sliceElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this);
            _tools__WEBPACK_IMPORTED_MODULE_6__["Tools"].moveToFront(sliceElement);
            sliceElement
                .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].mouseover.strokeWidth)
                .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].mouseover.strokeOpacity)
                .attr("stroke", self.colorScale[self.displayData.datasets[0].label](d.data.label));
            self.showTooltip(d);
            self.reduceOpacity(this);
        })
            .on("mousemove", function (d) {
            var tooltipRef = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(self.holder).select("div.chart-tooltip");
            var relativeMousePosition = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(self.holder);
            tooltipRef.style("left", relativeMousePosition[0] + _configuration__WEBPACK_IMPORTED_MODULE_5__["tooltip"].magicLeft2 + "px")
                .style("top", relativeMousePosition[1] + "px");
        })
            .on("mouseout", function (d) {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .attr("stroke-width", accessibility ? _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].default.strokeWidth : _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].mouseout.strokeWidth)
                .attr("stroke", accessibility ? self.colorScale[self.displayData.datasets[0].label](d.data.label) : "none")
                .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"].mouseout.strokeOpacity);
            self.hideTooltip();
        });
    };
    PieChart.prototype.update = function (newData) {
        var oldData = _tools__WEBPACK_IMPORTED_MODULE_6__["Tools"].clone(this.displayData);
        var activeLegendItems = this.getActiveLegendItems();
        var newDisplayData = Object.assign({}, oldData);
        newDisplayData.datasets[0].data = oldData.datasets[0].data.filter(function (dataPoint) { return activeLegendItems.indexOf(dataPoint.label) !== -1; });
        newDisplayData.labels = newDisplayData.datasets[0].data.map(function (datum) { return datum.label; });
        this.interpolateValues(newDisplayData);
    };
    PieChart.prototype.addLegend = function () {
        var _this = this;
        if (this.container.select(".legend-tooltip").nodes().length > 0) {
            return;
        }
        this.container.select(".legend")
            .selectAll("*").remove();
        var legendItems = this.getLegendItems();
        var legend = this.container.select(".legend")
            .attr("font-size", _configuration__WEBPACK_IMPORTED_MODULE_5__["legend"].fontSize)
            .selectAll("div")
            .data(Object.keys(legendItems))
            .enter().append("li")
            .attr("class", "legend-btn active");
        legend.append("div")
            .attr("class", "legend-circle")
            .style("background-color", function (d, i) {
            if (legendItems[d] === _configuration__WEBPACK_IMPORTED_MODULE_5__["legend"].items.status.ACTIVE) {
                return _this.colorScale(d);
            }
            return "white";
        })
            .style("border", function (d, i) {
            if (legendItems[d] === _configuration__WEBPACK_IMPORTED_MODULE_5__["legend"].items.status.ACTIVE) {
                return "none";
            }
            return "2px solid " + _this.colorScale(d);
        });
        legend.append("text")
            .text(function (d) { return d; });
    };
    PieChart.prototype.resizeChart = function () {
        var _this = this;
        var pieConfigs = _configuration__WEBPACK_IMPORTED_MODULE_5__["pie"];
        var chartSize = this.getChartSize(this.container);
        var dimensionToUseForScale = Math.min(chartSize.width, chartSize.height);
        var scaleRatio = dimensionToUseForScale / pieConfigs.maxWidth;
        var radius = dimensionToUseForScale / 2;
        // Resize the SVG
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder).select("svg")
            .attr("width", dimensionToUseForScale + "px")
            .attr("height", dimensionToUseForScale + "px");
        this.innerWrap
            .style("transform", "translate(" + radius + "px," + radius + "px)");
        // Resize the arc
        var marginedRadius = radius - (pieConfigs.label.margin * scaleRatio);
        this.arc = Object(d3_shape__WEBPACK_IMPORTED_MODULE_2__["arc"])()
            .innerRadius(this.options.type === "donut" ? (marginedRadius * (2 / 3)) : 0)
            .outerRadius(marginedRadius);
        this.innerWrap.selectAll("path")
            .attr("d", this.arc);
        this.innerWrap
            .selectAll("text.chart-label")
            .attr("transform", function (d) { return _this.deriveTransformString(d, radius); });
        // Reposition the legend
        this.positionLegend();
    };
    // Helper functions
    PieChart.prototype.computeRadius = function () {
        var chartSize = this.getChartSize(this.container);
        var radius = Math.min(chartSize.width, chartSize.height) / 2;
        return radius;
    };
    /**
     * Return the css transform string to be used for the slice
     *
     * @private
     * @param {any} d - d3 data item for slice
     * @param {any} radius - computed radius of the chart
     * @returns final transform string to be applied to the <text> element
     * @memberof PieChart
     */
    PieChart.prototype.deriveTransformString = function (d, radius) {
        var theta = d.endAngle - d.startAngle;
        var xPosition = radius * Math.sin((theta / 2) + d.startAngle);
        var yPosition = -1 * radius * Math.cos((theta / 2) + d.startAngle);
        return "translate(" + xPosition + ", " + yPosition + ")";
    };
    /**
     * Decide what text-anchor value the slice label item would need based on the quadrant it's in
     *
     * @private
     * @param {any} d - d3 data item for slice
     * @returns computed decision on what the text-anchor string should be
     * @memberof PieChart
     */
    PieChart.prototype.deriveTextAnchor = function (d) {
        var QUADRANT = Math.PI / 4;
        var rads = (d.endAngle - d.startAngle) / 2 + d.startAngle;
        if (rads >= QUADRANT && rads <= 3 * QUADRANT) {
            return "start";
        }
        else if ((rads > 7 * QUADRANT && rads < QUADRANT) || (rads > 3 * QUADRANT && rads < 5 * QUADRANT)) {
            return "middle";
        }
        else if (rads >= 5 * QUADRANT && rads <= 7 * QUADRANT) {
            return "end";
        }
        else {
            return "middle";
        }
    };
    return PieChart;
}(_base_chart__WEBPACK_IMPORTED_MODULE_4__["BaseChart"]));

// d3 Tween functions
function arcTween(a, arcFunc) {
    var _this = this;
    var i = Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_3__["interpolate"])(this._current, a);
    return function (t) {
        _this._current = i(t);
        return arcFunc(_this._current);
    };
}


/***/ }),

/***/ "./src/polyfills.ts":
/*!**************************!*\
  !*** ./src/polyfills.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {(function () {
    if (typeof window["CustomEvent"] === "function")
        return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent("CustomEvent");
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    ;
    CustomEvent.prototype = window["Event"].prototype;
    window["CustomEvent"] = CustomEvent;
})();
// Avoid multiple instances of babel-polyfill
function idempotentBabelPolyfill() {
    if (!global["_babelPolyfill"] && (typeof window === "undefined" || !window["_babelPolyfill"])) {
        return __webpack_require__(/*! babel-polyfill */ "../../node_modules/babel-polyfill/lib/index.js");
    }
    return null;
}
;
idempotentBabelPolyfill();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/global.js */ "../../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/services/curves.ts":
/*!********************************!*\
  !*** ./src/services/curves.ts ***!
  \********************************/
/*! exports provided: getD3Curve */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getD3Curve", function() { return getD3Curve; });
/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-shape */ "../../node_modules/d3-shape/index.js");

var curveTypes = {
    "curveLinear": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveLinear"],
    "curveLinearClosed": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveLinearClosed"],
    "curveBasis": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveBasis"],
    "curveBasisClosed": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveBasisClosed"],
    "curveBasisOpen": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveBasisOpen"],
    "curveBundle": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveBundle"],
    "curveCardinal": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCardinal"],
    "curveCardinalClosed": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCardinalClosed"],
    "curveCardinalOpen": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCardinalOpen"],
    "curveCatmullRom": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCatmullRom"],
    "curveCatmullRomClosed": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCatmullRomClosed"],
    "curveCatmullRomOpen": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCatmullRomOpen"],
    "curveMonotoneX": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveMonotoneX"],
    "curveMonotoneY": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveMonotoneY"],
    "curveNatural": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveNatural"],
    "curveStep": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveStep"],
    "curveStepAfter": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveStepAfter"],
    "curveStepBefore": d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveStepBefore"]
};
var getD3Curve = function (curveName) {
    if (curveTypes[curveName]) {
        return curveTypes[curveName];
    }
    return null;
};


/***/ }),

/***/ "./src/services/patterns.ts":
/*!**********************************!*\
  !*** ./src/services/patterns.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/index.js");
/* harmony import */ var _assets_patterns_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../assets/patterns/index */ "./src/assets/patterns/index.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../configuration */ "./src/configuration.ts");
// D3 Imports



var selectors = {
    PATTERNS_CONTAINER: "carbon-charts-patterns"
};
// Helper functions
var trimSVG = function (htmlString) {
    // Remove the CSS style block
    var htmlBeforeStyleBlock = htmlString.substring(0, htmlString.indexOf("<style type=\"text/css\">"));
    var htmlAfterStyleBlock = htmlString.substring(htmlString.indexOf("</style>") + "</style>".length);
    htmlString = htmlBeforeStyleBlock + htmlAfterStyleBlock;
    // Remove Adobe comments
    htmlString = htmlString.replace(/<!--[\s\S]*?-->/g, "");
    return htmlString;
};
var PatternsService = /** @class */ (function () {
    function PatternsService() {
        this.patternAccum = 0;
        this.idAccum = 0;
        this.patternURLs = {};
        this.setDiv();
    }
    /**
     * Sets the container div for pattern SVGs in DOM
     *
     * @memberof PatternsService
     */
    PatternsService.prototype.setDiv = function () {
        this.container = document.getElementById(selectors.PATTERNS_CONTAINER);
        if (!this.container) {
            var div = document.createElement("div");
            div.id = selectors.PATTERNS_CONTAINER;
            this.container = document.body.appendChild(div);
        }
    };
    /**
     * Adds all the pattern SVGs to the container div, applying a unique ID to each one
     *
     * @memberof PatternsService
     */
    PatternsService.prototype.addPatternSVGs = function (d, colorScale, chartContainerID, legendType) {
        var _this = this;
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.container)
            .style("display", "table")
            .style("max-height", 0);
        d.datasets.forEach(function (dataset) {
            var datasetPattern;
            dataset.data.forEach(function (dataPoint, i) {
                var index = i + 1;
                var id = ++_this.idAccum;
                if (!datasetPattern || legendType === _configuration__WEBPACK_IMPORTED_MODULE_2__["legend"].basedOn.LABELS) {
                    datasetPattern = _assets_patterns_index__WEBPACK_IMPORTED_MODULE_1__["default"][_this.patternAccum++];
                }
                // Create SVG container div
                var svgContainer = document.createElement("div");
                svgContainer.id = "carbon-" + chartContainerID + "-pattern-container-" + id;
                svgContainer.innerHTML = trimSVG(datasetPattern);
                // Apply id to the svg element
                var mountedSVG = svgContainer.querySelector("svg");
                mountedSVG.id = "carbon-" + chartContainerID + "-pattern-" + id + "-svg";
                // Apply id to the pattern element
                var patternElement = mountedSVG.querySelector("pattern");
                patternElement.id = "carbon-" + chartContainerID + "-pattern-" + id;
                // Remove all IDs to avoid duplicate IDs (accessibility violation)
                mountedSVG.querySelector("g").removeAttribute("id");
                // Apply fills to everything
                var allElementsInsideSVG = Array.prototype.slice.call(mountedSVG.querySelectorAll("pattern g *"));
                allElementsInsideSVG.forEach(function (element, elementIndex) {
                    if (elementIndex > 0) {
                        element.style.fill = colorScale[dataset.label](d.labels[i]);
                        element.style.stroke = colorScale[dataset.label](d.labels[i]);
                    }
                    else {
                        element.style.fill = "transparent";
                    }
                    // Remove ID to avoid duplicate IDs (accessibility violation)
                    element.removeAttribute("id");
                    element.removeAttribute("class");
                });
                var allRectsInsideSVG = Array.prototype.slice.call(mountedSVG.querySelectorAll("rect"));
                allRectsInsideSVG.forEach(function (rectElement) {
                    // Remove all IDs to avoid duplicate IDs (accessibility violation)
                    rectElement.removeAttribute("id");
                });
                // Update pattern widths & heights
                patternElement.setAttribute("width", "" + _configuration__WEBPACK_IMPORTED_MODULE_2__["charts"].patternFills.width);
                patternElement.setAttribute("height", "" + _configuration__WEBPACK_IMPORTED_MODULE_2__["charts"].patternFills.height);
                _this.container.appendChild(svgContainer);
                // Add pattern to the list of patterns
                var patternURL = "url(#carbon-" + chartContainerID + "-pattern-" + id + ")";
                if (_this.patternURLs[dataset.label]) {
                    _this.patternURLs[dataset.label].push(patternURL);
                }
                else {
                    _this.patternURLs[dataset.label] = [patternURL];
                }
            });
        });
    };
    PatternsService.prototype.getFillValues = function () {
        return this.patternURLs;
    };
    return PatternsService;
}());
/* harmony default export */ __webpack_exports__["default"] = (PatternsService);


/***/ }),

/***/ "./src/stacked-bar-chart.ts":
/*!**********************************!*\
  !*** ./src/stacked-bar-chart.ts ***!
  \**********************************/
/*! exports provided: StackedBarChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackedBarChart", function() { return StackedBarChart; });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/index.js");
/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-shape */ "../../node_modules/d3-shape/index.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-array */ "../../node_modules/d3-array/index.js");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony import */ var _base_axis_chart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./base-axis-chart */ "./src/base-axis-chart.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// D3 Imports





// Add datasetLabel to each piece of data
// To be used to get the fill color
var addLabelsAndValueToData = function (d) {
    Object.keys(d).map(function (key) {
        if (typeof d[key] === "object") {
            d[key]["datasetLabel"] = d.key;
            d[key]["label"] = d[key].data["label"];
            d[key]["value"] = d[key].data[d.key];
        }
    });
    return d;
};
// TODO - Cleanup & add some comments
var StackedBarChart = /** @class */ (function (_super) {
    __extends(StackedBarChart, _super);
    function StackedBarChart(holder, configs) {
        var _this = _super.call(this, holder, configs) || this;
        _this.options.type = "bar";
        return _this;
    }
    StackedBarChart.prototype.getYMax = function () {
        var _a = this.displayData, datasets = _a.datasets, labels = _a.labels;
        var scales = this.options.scales;
        var yMax;
        if (datasets.length === 1) {
            yMax = Object(d3_array__WEBPACK_IMPORTED_MODULE_2__["max"])(datasets[0].data);
        }
        else {
            yMax = Object(d3_array__WEBPACK_IMPORTED_MODULE_2__["max"])(labels.map(function (label, i) {
                var correspondingValues = datasets.map(function (dataset) { return dataset.data[i]; });
                var totalValue = correspondingValues.reduce(function (a, b) { return a + b; }, 0);
                return totalValue;
            }));
        }
        if (scales.y.yMaxAdjuster) {
            yMax = scales.y.yMaxAdjuster(yMax);
        }
        return yMax;
    };
    StackedBarChart.prototype.getStackData = function () {
        var _this = this;
        // Create the stack datalist
        var stackDataArray = this.displayData.labels.map(function (label, i) {
            var correspondingData = {};
            _this.displayData.datasets.forEach(function (dataset) {
                correspondingData[dataset.label] = dataset.data[i];
            });
            correspondingData["label"] = label;
            return correspondingData;
        });
        return stackDataArray;
    };
    StackedBarChart.prototype.draw = function () {
        var _this = this;
        this.innerWrap.style("width", "100%")
            .style("height", "100%");
        var margins = _configuration__WEBPACK_IMPORTED_MODULE_3__["charts"].margin.bar;
        this.innerWrap
            .attr("transform", "translate(" + margins.left + ", " + margins.top + ")");
        var stackDataArray = this.getStackData();
        var stackKeys = this.displayData.datasets.map(function (dataset) { return dataset.label; });
        this.innerWrap.append("g")
            .classed("bars-wrapper", true)
            .selectAll("g")
            .data(Object(d3_shape__WEBPACK_IMPORTED_MODULE_1__["stack"])().keys(stackKeys)(stackDataArray))
            .enter()
            .append("g")
            .classed("bars", true)
            .selectAll("rect")
            .data(function (d) { return addLabelsAndValueToData(d); })
            .enter()
            .append("rect")
            .classed("bar", true)
            .attr("x", function (d) { return _this.x(d.data.label); })
            .attr("y", function (d) { return _this.y(d[1]); })
            .attr("height", function (d) { return _this.y(d[0]) - _this.y(d[1]); })
            .attr("width", function (d) { return _this.x.bandwidth(); })
            .attr("fill", function (d) { return _this.getFillScale()[d.datasetLabel](d.data.label); })
            .attr("stroke", function (d) { return _this.options.accessibility ? _this.colorScale[d.datasetLabel](d.data.label) : null; })
            .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_3__["bars"].default.strokeWidth)
            .attr("stroke-opacity", function (d) { return _this.options.accessibility ? 1 : 0; });
        // Hide the overlay
        this.updateOverlay().hide();
        // Dispatch the load event
        this.dispatchEvent("load");
    };
    StackedBarChart.prototype.interpolateValues = function (newData) {
        var _this = this;
        var stackDataArray = this.getStackData();
        var stackKeys = this.displayData.datasets.map(function (dataset) { return dataset.label; });
        var g = this.innerWrap.selectAll("g.bars-wrapper")
            .selectAll("g")
            .data(Object(d3_shape__WEBPACK_IMPORTED_MODULE_1__["stack"])().keys(stackKeys)(stackDataArray));
        var rect = g.selectAll("rect.bar")
            .data(function (d) { return addLabelsAndValueToData(d); });
        this.updateElements(true, g.selectAll("rect.bar"), g);
        var addRect = function (selection) {
            selection.enter()
                .append("rect")
                .classed("bar", true)
                .attr("x", function (d) { return _this.x(d.data.label); })
                .attr("y", function (d) { return _this.y(d[1]); })
                .attr("height", function (d) { return _this.y(d[0]) - _this.y(d[1]); })
                .attr("width", function (d) { return _this.x.bandwidth(); })
                .attr("fill", function (d) { return _this.getFillScale()[d.datasetLabel](d.data.label); })
                .attr("opacity", 0)
                .transition(_this.getFillTransition())
                .attr("opacity", 1)
                .attr("stroke", function (d) { return _this.options.accessibility ? _this.colorScale[d.datasetLabel](d.data.label) : null; })
                .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_3__["bars"].default.strokeWidth)
                .attr("stroke-opacity", function (d) { return _this.options.accessibility ? 1 : 0; });
        };
        var rectsToAdd = g.enter()
            .append("g")
            .classed("bars", true)
            .selectAll("rect")
            .data(function (d) { return addLabelsAndValueToData(d); });
        addRect(rectsToAdd);
        addRect(rect);
        g.exit()
            .transition(this.getDefaultTransition())
            .style("opacity", 0)
            .remove();
        rect.exit()
            .transition(this.getDefaultTransition())
            .style("opacity", 0)
            .remove();
        // Add slice hover actions, and clear any slice borders present
        this.addDataPointEventListener();
        // Hide the overlay
        this.updateOverlay().hide();
        // Dispatch the update event
        this.dispatchEvent("update");
    };
    StackedBarChart.prototype.resizeChart = function () {
        var actualChartSize = this.getChartSize(this.container);
        var dimensionToUseForScale = Math.min(actualChartSize.width, actualChartSize.height);
        // Resize the SVG
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this.holder).select("svg")
            .attr("width", dimensionToUseForScale + "px")
            .attr("height", dimensionToUseForScale + "px");
        this.updateXandYGrid(true);
        // Scale out the domains
        this.setXScale();
        this.setYScale();
        // Set the x & y axis as well as their labels
        this.setXAxis(true);
        this.setYAxis(true);
        // Apply new data to the bars
        var g = this.innerWrap.selectAll("g.bars g");
        this.updateElements(false, null, g);
        _super.prototype.resizeChart.call(this);
    };
    StackedBarChart.prototype.updateElements = function (animate, rect, g) {
        var _this = this;
        if (!rect) {
            rect = this.innerWrap.selectAll("rect.bar");
        }
        // Update existing bars
        rect
            .transition(animate ? this.getFillTransition() : this.getInstantTransition())
            .attr("x", function (d) { return _this.x(d.data.label); })
            .attr("y", function (d) { return _this.y(d[1]); })
            .attr("height", function (d) { return _this.y(d[0]) - _this.y(d[1]); })
            .attr("width", function (d) { return _this.x.bandwidth(); })
            .attr("fill", function (d) { return _this.getFillScale()[d.datasetLabel](d.data.label); })
            .attr("stroke", function (d) { return _this.options.accessibility ? _this.colorScale[d.datasetLabel](d.data.label) : null; })
            .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_3__["bars"].default.strokeWidth)
            .attr("stroke-opacity", function (d) { return _this.options.accessibility ? 1 : 0; });
    };
    StackedBarChart.prototype.addDataPointEventListener = function () {
        var self = this;
        var accessibility = this.options.accessibility;
        this.svg.selectAll("rect")
            .on("click", function (d) {
            self.dispatchEvent("bar-onClick", d);
        })
            .on("mouseover", function (d) {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .attr("stroke-width", _configuration__WEBPACK_IMPORTED_MODULE_3__["bars"].mouseover.strokeWidth)
                .attr("stroke", self.colorScale[d.datasetLabel](d.label))
                .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_3__["bars"].mouseover.strokeOpacity);
            self.showTooltip(d, this);
            self.reduceOpacity(this);
        })
            .on("mousemove", function (d) {
            var tooltipRef = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(self.holder).select("div.chart-tooltip");
            var relativeMousePosition = Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["mouse"])(self.holder);
            tooltipRef.style("left", relativeMousePosition[0] + _configuration__WEBPACK_IMPORTED_MODULE_3__["tooltip"].magicLeft2 + "px")
                .style("top", relativeMousePosition[1] + "px");
        })
            .on("mouseout", function (d) {
            var _a = _configuration__WEBPACK_IMPORTED_MODULE_3__["bars"].mouseout, strokeWidth = _a.strokeWidth, strokeWidthAccessible = _a.strokeWidthAccessible;
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_0__["select"])(this)
                .attr("stroke-width", accessibility ? strokeWidthAccessible : strokeWidth)
                .attr("stroke", accessibility ? self.colorScale[d.datasetLabel](d.label) : "none")
                .attr("stroke-opacity", _configuration__WEBPACK_IMPORTED_MODULE_3__["bars"].mouseout.strokeOpacity);
            self.hideTooltip();
        });
    };
    return StackedBarChart;
}(_base_axis_chart__WEBPACK_IMPORTED_MODULE_4__["BaseAxisChart"]));



/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/tools.ts":
/*!**********************!*\
  !*** ./src/tools.ts ***!
  \**********************/
/*! exports provided: Tools */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tools", function() { return Tools; });
// Functions
var Tools;
(function (Tools) {
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                func.apply(context, args);
            }
        };
    }
    Tools.debounce = debounce;
    function addCloseBtn(tooltip, size, color) {
        var closeBtn = tooltip.append("button");
        var classNames = "close--" + size;
        classNames = color ? " close--" + color : classNames;
        var iconHolder = document.createElement("span");
        iconHolder.innerHTML = "Close";
        closeBtn.attr("class", classNames)
            .attr("type", "button")
            .attr("aria-label", "Close");
        closeBtn.node()
            .appendChild(iconHolder);
        // TODO - Finish
        // console.log(iconHolder);
        return closeBtn;
    }
    Tools.addCloseBtn = addCloseBtn;
    function clone(obj) {
        return JSON.parse(JSON.stringify(obj));
    }
    Tools.clone = clone;
    /**************************************
     *  DOM-related operations            *
     *************************************/
    /**
     * Get width & height of an element
     *
     * @export
     * @param {any} el element to get dimensions from
     * @returns an object containing the width and height of el
     */
    function getDimensions(el) {
        return {
            width: parseFloat(el.style.width.replace("px", "") || el.offsetWidth),
            height: parseFloat(el.style.height.replace("px", "") || el.offsetHeight)
        };
    }
    Tools.getDimensions = getDimensions;
    /**************************************
     *  Formatting & calculations         *
     *************************************/
    /**
     * Gets x and y coordinates from a HTML transform attribute
     *
     * @export
     * @param {any} string the transform attribute string ie. transform(x,y)
     * @returns Returns an object with x and y offsets of the transform
     */
    function getTranformOffsets(string) {
        var regExp = /\(([^)]+)\)/;
        var match = regExp.exec(string)[1];
        var xyString = match.split(",");
        return {
            x: parseFloat(xyString[0]),
            y: parseFloat(xyString[1])
        };
    }
    Tools.getTranformOffsets = getTranformOffsets;
    /**
     * Capitalizes first letter of a string
     *
     * @export
     * @param {any} string the string whose first letter you'd like to capitalize
     * @returns The input string with its first letter capitalized
     */
    function capitalizeFirstLetter(string) {
        return string[0].toUpperCase() + string.slice(1);
    }
    Tools.capitalizeFirstLetter = capitalizeFirstLetter;
    /**
     * Get the percentage of a datapoint compared to the entire data-set
     *
     * @export
     * @param {any} item
     * @param {any} fullData
     * @returns The percentage in the form of a string "87%"
     */
    function convertValueToPercentage(item, fullData) {
        return Math.floor(item / fullData.reduce(function (accum, val) { return accum + val.value; }, 0) * 100) + "%";
    }
    Tools.convertValueToPercentage = convertValueToPercentage;
    /**************************************
     *  Object/array related checks       *
     *************************************/
    /**
     * Get the difference between two arrays' items
     *
     * @export
     * @param {any[]} oldArray
     * @param {any[]} newArray
     * @returns The items missing in newArray from oldArray, and items added to newArray compared to oldArray
     */
    function arrayDifferences(oldArray, newArray) {
        var difference = {
            missing: [],
            added: []
        };
        oldArray.forEach(function (element) {
            if (newArray.indexOf(element) === -1) {
                difference.missing.push(element);
            }
        });
        newArray.forEach(function (element) {
            if (oldArray.indexOf(element) === -1) {
                difference.added.push(element);
            }
        });
        return difference;
    }
    Tools.arrayDifferences = arrayDifferences;
    /**
     * Lists out the duplicated keys in an array of data
     *
     * @export
     * @param {*} data - array of data
     * @returns A list of the duplicated keys in data
     */
    function getDuplicateValues(arr) {
        var values = [];
        var duplicateValues = [];
        arr.forEach(function (value) {
            if (values.indexOf(value) !== -1 && duplicateValues.indexOf(value) === -1) {
                duplicateValues.push(value);
            }
            values.push(value);
        });
        return duplicateValues;
    }
    Tools.getDuplicateValues = getDuplicateValues;
    function removeArrayDuplicates(arr) {
        // Casting to any because of the lack of typescript types
        // Set removes duplicates automatically
        var result = new Set(arr);
        // Spread operator appends all elements from result into []
        return result.slice();
    }
    Tools.removeArrayDuplicates = removeArrayDuplicates;
    // ================================================================================
    // D3 Extensions
    // ================================================================================
    /**
     * In D3, moves an element to the front of the canvas
     *
     * @export
     * @param {any} element
     * @returns The function to be used by D3 to push element to the top of the canvas
     */
    function moveToFront(element) {
        return element.each(function () {
            this.parentNode.appendChild(this);
        });
    }
    Tools.moveToFront = moveToFront;
    // ================================================================================
    // Style Helpers
    /**
     * Retrieves the element transform matrix string, and returns the translateX string
     *
     * @export
     * @param {HTMLElement} element
     * @returns The translateX value for element
     */
    function getXTransformsValue(element) {
        var transformMatrixArray = window.getComputedStyle(element).getPropertyValue("transform").split(",");
        return transformMatrixArray[4];
    }
    Tools.getXTransformsValue = getXTransformsValue;
})(Tools || (Tools = {}));


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map