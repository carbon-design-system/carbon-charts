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
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
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
/******/
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
/******/ 		"index": 0
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
/******/ 	deferredModules.push(["./demo/index.ts","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/chart-types.ts":
/*!*****************************!*\
  !*** ./demo/chart-types.ts ***!
  \*****************************/
/*! exports provided: chartTypes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chartTypes", function() { return chartTypes; });
var _a = __webpack_require__(/*! ./demo-data/index */ "./demo/demo-data/index.ts"), 
// Bar
groupedBarOptions = _a.groupedBarOptions, groupedBarData = _a.groupedBarData, simpleBarOptions = _a.simpleBarOptions, simpleBarData = _a.simpleBarData, simpleBarTimeSeriesOptions = _a.simpleBarTimeSeriesOptions, simpleBarTimeSeriesData = _a.simpleBarTimeSeriesData, stackedBarData = _a.stackedBarData, stackedBarOptions = _a.stackedBarOptions, stackedBarTimeSeriesOptions = _a.stackedBarTimeSeriesOptions, stackedBarTimeSeriesData = _a.stackedBarTimeSeriesData, 
// Pie & donut
pieOptions = _a.pieOptions, pieData = _a.pieData, donutOptions = _a.donutOptions, donutData = _a.donutData, 
// Line
lineTimeSeriesOptions = _a.lineTimeSeriesOptions, lineTimeSeriesData = _a.lineTimeSeriesData, lineData = _a.lineData, lineOptions = _a.lineOptions, 
// Step
stepOptions = _a.stepOptions, stepData = _a.stepData, stepTimeSeriesOptions = _a.stepTimeSeriesOptions, stepTimeSeriesData = _a.stepTimeSeriesData, 
// Scatter
scatterTimeSeriesOptions = _a.scatterTimeSeriesOptions, scatterTimeSeriesData = _a.scatterTimeSeriesData, scatterOptions = _a.scatterOptions, scatterData = _a.scatterData;
var chartTypes = [
    {
        id: "grouped-bar",
        options: groupedBarOptions,
        data: groupedBarData
    },
    {
        id: "simple-bar",
        options: simpleBarOptions,
        data: simpleBarData
    },
    {
        id: "scatter-time-series",
        options: scatterTimeSeriesOptions,
        data: scatterTimeSeriesData
    },
    {
        id: "scatter",
        options: scatterOptions,
        data: scatterData
    },
    {
        id: "simple-bar-time-series",
        options: simpleBarTimeSeriesOptions,
        data: simpleBarTimeSeriesData
    },
    {
        id: "stacked-bar",
        options: stackedBarOptions,
        data: stackedBarData
    },
    {
        id: "stacked-bar-time-series",
        options: stackedBarTimeSeriesOptions,
        data: stackedBarTimeSeriesData
    },
    {
        id: "pie",
        options: pieOptions,
        data: pieData
    },
    {
        id: "donut",
        options: donutOptions,
        data: donutData
    },
    {
        id: "line-time-series",
        options: lineTimeSeriesOptions,
        data: lineTimeSeriesData
    },
    {
        id: "line",
        options: lineOptions,
        data: lineData
    },
    {
        id: "line-step",
        options: stepOptions,
        data: stepData
    },
    {
        id: "line-step-time-series",
        options: stepTimeSeriesOptions,
        data: stepTimeSeriesData
    }
];


/***/ }),

/***/ "./demo/demo-data/bar.ts":
/*!*******************************!*\
  !*** ./demo/demo-data/bar.ts ***!
  \*******************************/
/*! exports provided: groupedBarData, groupedBarOptions, simpleBarData, simpleBarOptions, simpleBarTimeSeriesData, simpleBarTimeSeriesOptions, stackedBarData, stackedBarOptions, stackedBarTimeSeriesData, stackedBarTimeSeriesOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupedBarData", function() { return groupedBarData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupedBarOptions", function() { return groupedBarOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simpleBarData", function() { return simpleBarData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simpleBarOptions", function() { return simpleBarOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simpleBarTimeSeriesData", function() { return simpleBarTimeSeriesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "simpleBarTimeSeriesOptions", function() { return simpleBarTimeSeriesOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stackedBarData", function() { return stackedBarData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stackedBarOptions", function() { return stackedBarOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stackedBarTimeSeriesData", function() { return stackedBarTimeSeriesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stackedBarTimeSeriesOptions", function() { return stackedBarTimeSeriesOptions; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./demo/demo-data/colors.ts");

// Demo turkish locale for simple bar time-series
var turkishLocale = __webpack_require__(/*! d3-time-format/locale/tr-TR.json */ "../../node_modules/d3-time-format/locale/tr-TR.json");
var groupedBarData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
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
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
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
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
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
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][3]],
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
    title: "Grouped bar (discrete)",
    axes: {
        left: {
            primary: true,
        },
        bottom: {
            scaleType: "labels",
            secondary: true,
        },
        top: {
            scaleType: "labels",
        }
    }
};
// Simple bar
var simpleBarData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            fillColors: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"],
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
    title: "Simple bar (discrete)",
    axes: {
        left: {
            primary: true
        },
        bottom: {
            scaleType: "labels",
            secondary: true,
        }
    }
};
var simpleBarTimeSeriesData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Miscellaneous"],
    datasets: [
        {
            label: "Dataset 1",
            fillColors: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"],
            data: [
                {
                    date: new Date(2019, 0, 1),
                    value: 10000
                },
                {
                    date: new Date(2019, 0, 2),
                    value: 65000
                },
                {
                    date: new Date(2019, 0, 3),
                    value: 10000
                },
                {
                    date: new Date(2019, 0, 6),
                    value: 49213
                },
                {
                    date: new Date(2019, 0, 7),
                    value: 51213
                }
            ]
        }
    ]
};
var simpleBarTimeSeriesOptions = {
    title: "Simple bar (time series - Turkish)",
    axes: {
        left: {
            primary: true
        },
        bottom: {
            scaleType: "time",
            secondary: true
        },
        locale: {
            time: turkishLocale
        }
    }
};
// Stacked bar
var stackedBarData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
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
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
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
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
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
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][3]],
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
    title: "Stacked bar (discrete)",
    axes: {
        left: {
            primary: true,
            stacked: true
        },
        bottom: {
            scaleType: "labels",
            secondary: true,
        }
    }
};
var stackedBarTimeSeriesData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
            data: [
                {
                    date: new Date(2019, 0, 1),
                    value: 10000
                },
                {
                    date: new Date(2019, 0, 5),
                    value: 65000
                },
                {
                    date: new Date(2019, 0, 8),
                    value: 10000
                },
                {
                    date: new Date(2019, 0, 13),
                    value: 49213
                },
                {
                    date: new Date(2019, 0, 17),
                    value: 51213
                }
            ]
        },
        {
            label: "Dataset 2",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
            data: [
                {
                    date: new Date(2019, 0, 3),
                    value: 75000
                },
                {
                    date: new Date(2019, 0, 6),
                    value: 57312
                },
                {
                    date: new Date(2019, 0, 8),
                    value: 21432
                },
                {
                    date: new Date(2019, 0, 15),
                    value: 70323
                },
                {
                    date: new Date(2019, 0, 19),
                    value: 21300
                }
            ]
        },
        {
            label: "Dataset 3",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
            data: [
                {
                    date: new Date(2019, 0, 1),
                    value: 50000
                },
                {
                    date: new Date(2019, 0, 5),
                    value: 15000
                },
                {
                    date: new Date(2019, 0, 8),
                    value: 20000
                },
                {
                    date: new Date(2019, 0, 13),
                    value: 39213
                },
                {
                    date: new Date(2019, 0, 17),
                    value: 61213
                }
            ]
        },
        {
            label: "Dataset 4",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][3]],
            data: [
                {
                    date: new Date(2019, 0, 2),
                    value: 10
                },
                {
                    date: new Date(2019, 0, 6),
                    value: 37312
                },
                {
                    date: new Date(2019, 0, 8),
                    value: 51432
                },
                {
                    date: new Date(2019, 0, 15),
                    value: 40323
                },
                {
                    date: new Date(2019, 0, 19),
                    value: 31300
                }
            ]
        }
    ]
};
var stackedBarTimeSeriesOptions = {
    title: "Stacked bar (time series)",
    axes: {
        left: {
            primary: true,
            stacked: true
        },
        bottom: {
            scaleType: "time",
            secondary: true
        }
    }
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
/* harmony import */ var _src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../src/index */ "./src/index.ts");

var urlParams = new URLSearchParams(window.location.search);
// Grab "theme" param from query string
var themeToUse = _src_index__WEBPACK_IMPORTED_MODULE_0__["colorPalettes"].DEFAULT;
if (urlParams.has("theme") && _src_index__WEBPACK_IMPORTED_MODULE_0__["colorPalettes"][urlParams.get("theme")]) {
    themeToUse = _src_index__WEBPACK_IMPORTED_MODULE_0__["colorPalettes"][urlParams.get("theme")];
}
var colors = themeToUse;


/***/ }),

/***/ "./demo/demo-data/index.ts":
/*!*********************************!*\
  !*** ./demo/demo-data/index.ts ***!
  \*********************************/
/*! exports provided: colors, groupedBarData, groupedBarOptions, simpleBarData, simpleBarOptions, simpleBarTimeSeriesData, simpleBarTimeSeriesOptions, stackedBarData, stackedBarOptions, stackedBarTimeSeriesData, stackedBarTimeSeriesOptions, pieData, pieOptions, donutData, donutOptions, lineTimeSeriesData, lineTimeSeriesOptions, lineData, lineOptions, stepOptions, stepData, stepTimeSeriesOptions, stepTimeSeriesData, scatterData, scatterOptions, scatterTimeSeriesData, scatterTimeSeriesOptions */
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

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "simpleBarTimeSeriesData", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["simpleBarTimeSeriesData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "simpleBarTimeSeriesOptions", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["simpleBarTimeSeriesOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackedBarData", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["stackedBarData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackedBarOptions", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["stackedBarOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackedBarTimeSeriesData", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["stackedBarTimeSeriesData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stackedBarTimeSeriesOptions", function() { return _bar__WEBPACK_IMPORTED_MODULE_1__["stackedBarTimeSeriesOptions"]; });

/* harmony import */ var _pie_donut__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pie-donut */ "./demo/demo-data/pie-donut.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pieData", function() { return _pie_donut__WEBPACK_IMPORTED_MODULE_2__["pieData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "pieOptions", function() { return _pie_donut__WEBPACK_IMPORTED_MODULE_2__["pieOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "donutData", function() { return _pie_donut__WEBPACK_IMPORTED_MODULE_2__["donutData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "donutOptions", function() { return _pie_donut__WEBPACK_IMPORTED_MODULE_2__["donutOptions"]; });

/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./line */ "./demo/demo-data/line.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lineTimeSeriesData", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["lineTimeSeriesData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lineTimeSeriesOptions", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["lineTimeSeriesOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lineData", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["lineData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "lineOptions", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["lineOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stepOptions", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["stepOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stepData", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["stepData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stepTimeSeriesOptions", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["stepTimeSeriesOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "stepTimeSeriesData", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["stepTimeSeriesData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scatterData", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["scatterData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scatterOptions", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["scatterOptions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scatterTimeSeriesData", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["scatterTimeSeriesData"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "scatterTimeSeriesOptions", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["scatterTimeSeriesOptions"]; });







/***/ }),

/***/ "./demo/demo-data/line.ts":
/*!********************************!*\
  !*** ./demo/demo-data/line.ts ***!
  \********************************/
/*! exports provided: lineTimeSeriesData, lineTimeSeriesOptions, lineData, lineOptions, stepOptions, stepData, stepTimeSeriesOptions, stepTimeSeriesData, scatterData, scatterOptions, scatterTimeSeriesData, scatterTimeSeriesOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineTimeSeriesData", function() { return lineTimeSeriesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineTimeSeriesOptions", function() { return lineTimeSeriesOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineData", function() { return lineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lineOptions", function() { return lineOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stepOptions", function() { return stepOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stepData", function() { return stepData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stepTimeSeriesOptions", function() { return stepTimeSeriesOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stepTimeSeriesData", function() { return stepTimeSeriesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scatterData", function() { return scatterData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scatterOptions", function() { return scatterOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scatterTimeSeriesData", function() { return scatterTimeSeriesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scatterTimeSeriesOptions", function() { return scatterTimeSeriesOptions; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./demo/demo-data/colors.ts");
/* harmony import */ var _src_tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/tools */ "./src/tools.ts");


var lineTimeSeriesData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
            data: [
                {
                    date: new Date(2019, 0, 1),
                    value: 10000
                },
                {
                    date: new Date(2019, 0, 5),
                    value: 65000
                },
                {
                    date: new Date(2019, 0, 8),
                    value: 10000
                },
                {
                    date: new Date(2019, 0, 13),
                    value: 49213
                },
                {
                    date: new Date(2019, 0, 17),
                    value: 51213
                }
            ]
        },
        {
            label: "Dataset 2",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
            data: [
                {
                    date: new Date(2019, 0, 2),
                    value: 0
                },
                {
                    date: new Date(2019, 0, 6),
                    value: 57312
                },
                {
                    date: new Date(2019, 0, 8),
                    value: 21432
                },
                {
                    date: new Date(2019, 0, 15),
                    value: 70323
                },
                {
                    date: new Date(2019, 0, 19),
                    value: 21300
                }
            ]
        },
        {
            label: "Dataset 3",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
            data: [
                {
                    date: new Date(2019, 0, 1),
                    value: 50000
                },
                {
                    date: new Date(2019, 0, 5),
                    value: 15000
                },
                {
                    date: new Date(2019, 0, 8),
                    value: 20000
                },
                {
                    date: new Date(2019, 0, 13),
                    value: 39213
                },
                {
                    date: new Date(2019, 0, 17),
                    value: 61213
                }
            ]
        },
        {
            label: "Dataset 4",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][3]],
            data: [
                {
                    date: new Date(2019, 0, 2),
                    value: 10
                },
                {
                    date: new Date(2019, 0, 6),
                    value: 37312
                },
                {
                    date: new Date(2019, 0, 8),
                    value: 51432
                },
                {
                    date: new Date(2019, 0, 15),
                    value: 40323
                },
                {
                    date: new Date(2019, 0, 19),
                    value: 31300
                }
            ]
        }
    ]
};
var lineTimeSeriesOptions = {
    title: "Line (time series)",
    axes: {
        left: {
            secondary: true
        },
        bottom: {
            scaleType: "time",
            primary: true
        }
    },
    curve: "curveMonotoneX"
};
var lineData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
            data: [
                32100,
                23500,
                53100,
                42300,
                12300
            ]
        },
        {
            label: "Dataset 2",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
            data: [
                34200,
                53200,
                42300,
                21400,
                0
            ]
        },
        {
            label: "Dataset 3 long name",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
            data: [
                41200,
                23400,
                34210,
                1400,
                42100
            ]
        },
        {
            label: "Dataset 4 long name",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][3]],
            data: [
                22000,
                1200,
                9000,
                24000,
                3000
            ]
        },
        {
            label: "Dataset 5 long name",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][4]],
            data: [
                2412,
                30000,
                10000,
                5000,
                31000
            ]
        },
        {
            label: "Dataset 6 long name",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][5]],
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
    title: "Line (discrete)",
    axes: {
        bottom: {
            title: "2018 Annual Sales Figures",
            scaleType: "labels",
            secondary: true
        },
        left: {
            primary: true
        }
    }
};
// Step
var stepOptions = _src_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].merge({}, lineOptions, {
    title: "Step (discrete)",
    curve: "curveStepAfter"
});
var stepData = lineData;
var stepTimeSeriesOptions = _src_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].merge({}, lineTimeSeriesOptions, {
    title: "Step (time series)",
    curve: "curveStepAfter"
});
var stepTimeSeriesData = lineTimeSeriesData;
// Scatter
var scatterData = {
    labels: ["Qty", "More", "Sold", "Restocking", "Misc"],
    datasets: [
        {
            label: "Dataset 1",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][0]],
            data: [
                32100,
                23500,
                53100,
                42300,
                12300
            ]
        },
        {
            label: "Dataset 2",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][1]],
            data: [
                34200,
                53200,
                42300,
                21400,
                0
            ]
        },
        {
            label: "Dataset 3 long name",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][2]],
            data: [
                41200,
                23400,
                34210,
                1400,
                42100
            ]
        },
        {
            label: "Dataset 4 long name",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][3]],
            data: [
                22000,
                1200,
                9000,
                24000,
                3000
            ]
        },
        {
            label: "Dataset 5 long name",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][4]],
            data: [
                2412,
                30000,
                10000,
                5000,
                31000
            ]
        },
        {
            label: "Dataset 6 long name",
            fillColors: [_colors__WEBPACK_IMPORTED_MODULE_0__["colors"][5]],
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
var scatterOptions = {
    title: "Scatter (discrete)",
    axes: {
        bottom: {
            title: "2018 Annual Sales Figures",
            scaleType: "labels",
            secondary: true
        },
        left: {
            primary: true
        }
    }
};
var scatterTimeSeriesData = lineTimeSeriesData;
var scatterTimeSeriesOptions = {
    title: "Scatter (time series)",
    axes: {
        bottom: {
            title: "2019 Annual Sales Figures",
            scaleType: "time",
            secondary: true
        },
        left: {
            primary: true
        }
    }
};


/***/ }),

/***/ "./demo/demo-data/pie-donut.ts":
/*!*************************************!*\
  !*** ./demo/demo-data/pie-donut.ts ***!
  \*************************************/
/*! exports provided: pieData, pieOptions, donutData, donutOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pieData", function() { return pieData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pieOptions", function() { return pieOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "donutData", function() { return donutData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "donutOptions", function() { return donutOptions; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./demo/demo-data/colors.ts");

var pieData = {
    labels: ["2V2N 9KYPM version 1", "L22I P66EP L22I P66EP L22I P66EP", "JQAI 2M4L1", "J9DZ F37AP",
        "YEL48 Q6XK YEL48", "P66EP L22I L22I"],
    datasets: [
        {
            label: "Dataset 1",
            fillColors: _colors__WEBPACK_IMPORTED_MODULE_0__["colors"],
            data: [75000, 65000, 10000, 25000, 1200, 20000]
        }
    ]
};
var pieOptions = {
    title: "Pie",
    resizable: true
};
var donutData = pieData;
var donutOptions = {
    title: "Donut",
    resizable: true,
    donut: {
        center: {
            label: "Browsers"
        }
    }
};


/***/ }),

/***/ "./demo/demo-options.ts":
/*!******************************!*\
  !*** ./demo/demo-options.ts ***!
  \******************************/
/*! exports provided: setOrUpdateParam, initializeDemoOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOrUpdateParam", function() { return setOrUpdateParam; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeDemoOptions", function() { return initializeDemoOptions; });
var setOrUpdateParam = function (name, value) {
    var params = new URLSearchParams(location.search);
    // Remove any existing "theme" param
    if (params.has(name)) {
        params.delete(name);
    }
    params.append(name, value);
    location.search = params.toString();
};
// Theme selector
var initializeThemeSelector = function () {
    var dropdownOptions = Array.prototype.slice.call(document.querySelectorAll("div.theme-selector a.bx--dropdown-link"));
    // Set click listeners for the dropdown options
    dropdownOptions.forEach(function (dropdownOption) {
        dropdownOption.addEventListener("click", function (e) {
            e.preventDefault();
            setOrUpdateParam("theme", e.target.parentNode.getAttribute("data-value"));
        });
    });
    // Set state for current theme
    var params = new URLSearchParams(location.search);
    if (params.has("theme")) {
        var themeName_1 = params.get("theme");
        if (themeName_1 !== "DEFAULT") {
            // Add theme CSS bundle
            var linkElement = document.createElement("link");
            linkElement.setAttribute("rel", "stylesheet");
            linkElement.setAttribute("type", "text/css");
            linkElement.setAttribute("href", "styles-" + themeName_1 + ".css");
            document.head.appendChild(linkElement);
            // Add classname to body for demo site theming
            document.body.classList.add("carbon--dark-" + themeName_1);
        }
        // Update selected dropdown item
        var dropdownDefaultOption = document.querySelector("div.theme-selector li.bx--dropdown-text");
        var selectedOption = dropdownOptions.find(function (option) { return option.parentNode.getAttribute("data-value") === themeName_1; });
        dropdownDefaultOption.innerHTML = selectedOption.innerText;
    }
};
var initializeDemoOptions = function () {
    initializeThemeSelector();
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
/* harmony import */ var _demo_options__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./demo-options */ "./demo/demo-options.ts");
/* harmony import */ var _chart_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chart-types */ "./demo/chart-types.ts");
/* harmony import */ var _src_tools__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../src/tools */ "./src/tools.ts");

// Styles

// Functionality for demo options toolbar

// Chart types

// MISC

Object(_demo_options__WEBPACK_IMPORTED_MODULE_2__["initializeDemoOptions"])();
var charts = {};
var changeDemoData = function (chartType, chartObj) {
    var oldData = chartObj.model.getData();
    // Function to be used to randomize a value
    var randomizeValue = function (datum) {
        var currentVal = datum.value !== undefined ? datum.value : datum;
        var firstTry = Math.max(0.85 * currentVal, currentVal * Math.random() * (Math.random() * 5));
        var result = currentVal > 0 ? Math.min(3 * currentVal, firstTry) : Math.max(3 * currentVal, firstTry);
        if (Math.random() > 0.5
            || chartType.indexOf("stacked") !== -1
            || chartType.indexOf("pie") !== -1
            || chartType.indexOf("donut") !== -1) {
            result = Math.floor(result);
        }
        else {
            result = Math.floor(result) * -1;
        }
        if (datum.value !== undefined) {
            datum.value = result;
            if (datum.date) {
                datum.date = new Date(datum.date);
                datum.date.setDate(datum.date.getDate() + 2);
            }
            return datum;
        }
        return result;
    };
    // Function to be used to randomize all datapoints
    var updateChartData = function (currentData) {
        var result = _src_tools__WEBPACK_IMPORTED_MODULE_4__["Tools"].clone(currentData);
        result.datasets = result.datasets.map(function (dataset) {
            dataset.label = "new dataset " + Math.random().toFixed(2);
            var datasetNewData = dataset.data.map(function (dataPoint) {
                return randomizeValue(dataPoint);
            });
            var newDataset = Object.assign({}, dataset, { data: datasetNewData });
            return newDataset;
        });
        return result;
    };
    var chartObject = charts[chartType];
    var newData;
    var removeADataset = Math.random() > 0.5;
    switch (chartType) {
        case "pie":
        case "donut":
            // Randomize old data values
            newData = updateChartData(oldData);
            break;
        default:
            newData = updateChartData(oldData);
            if (removeADataset) {
                var randomIndex = Math.floor(Math.random() * (newData.datasets.length - 1));
                newData.datasets.splice(randomIndex, randomIndex);
            }
            break;
    }
    // Handle setting the new data
    chartObject.model.setData(newData);
};
var setDemoActionsEventListener = function (chartType, chartObj) {
    var changeDataButton = document.getElementById("change-data-" + chartType);
    if (changeDataButton) {
        changeDataButton.onclick = function (e) {
            e.preventDefault();
            changeDemoData(chartType, chartObj);
        };
        var actionsElement = document.getElementById("actions-" + chartType);
        if (actionsElement) {
            var changeDataPromiseButtons = Array.prototype.slice.call(actionsElement.querySelectorAll(".change-data-promise"));
            changeDataPromiseButtons.forEach(function (element) {
                element = element;
                element.onclick = function (e) {
                    e.preventDefault();
                    changeDemoData(chartType, chartObj);
                };
            });
        }
    }
};
var createChartContainer = function (chartType) {
    // Chart holder
    var holder = document.createElement("div");
    holder.className = "demo-chart-holder has-actions";
    holder.id = "classy-" + chartType.id + "-chart-holder";
    document.body.appendChild(holder);
    // Chart demo actions container
    var chartDemoActions = document.createElement("div");
    chartDemoActions.className = "chart-demo-actions";
    chartDemoActions.id = "actions-" + chartType.id;
    chartDemoActions.setAttribute("role", "region");
    chartDemoActions.setAttribute("aria-label", chartType + " chart actions");
    // Add update data button
    var updateDataButton = document.createElement("button");
    updateDataButton.className = "bx--btn bx--btn--primary";
    updateDataButton.id = "change-data-" + chartType.id;
    updateDataButton.innerHTML = "Update data";
    chartDemoActions.appendChild(updateDataButton);
    document.body.appendChild(chartDemoActions);
    return holder;
};
// Initialize all charts
_chart_types__WEBPACK_IMPORTED_MODULE_3__["chartTypes"].forEach(function (type) {
    var holder = createChartContainer(type);
    if (holder) {
        var classToInitialize = void 0;
        switch (type.id) {
            case "simple-bar":
            case "simple-bar-time-series":
                classToInitialize = _src_index__WEBPACK_IMPORTED_MODULE_0__["SimpleBarChart"];
                break;
            case "grouped-bar":
                classToInitialize = _src_index__WEBPACK_IMPORTED_MODULE_0__["GroupedBarChart"];
                break;
            case "stacked-bar":
            case "stacked-bar-time-series":
                classToInitialize = _src_index__WEBPACK_IMPORTED_MODULE_0__["StackedBarChart"];
                break;
            case "scatter":
            case "scatter-time-series":
                classToInitialize = _src_index__WEBPACK_IMPORTED_MODULE_0__["ScatterChart"];
                break;
            case "line":
            case "line-time-series":
            case "line-step":
            case "line-step-time-series":
                classToInitialize = _src_index__WEBPACK_IMPORTED_MODULE_0__["LineChart"];
                break;
            case "pie":
                classToInitialize = _src_index__WEBPACK_IMPORTED_MODULE_0__["PieChart"];
                break;
            case "donut":
                classToInitialize = _src_index__WEBPACK_IMPORTED_MODULE_0__["DonutChart"];
                break;
        }
        // Initialize chart
        charts[type.id] = new classToInitialize(holder, {
            data: type.data,
            options: type.options
        });
        setDemoActionsEventListener(type.id, charts[type.id]);
    }
});


/***/ }),

/***/ "./src/axis-chart.ts":
/*!***************************!*\
  !*** ./src/axis-chart.ts ***!
  \***************************/
/*! exports provided: AxisChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AxisChart", function() { return AxisChart; });
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chart */ "./src/chart.ts");
/* harmony import */ var _interfaces_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interfaces/index */ "./src/interfaces/index.ts");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/index */ "./src/components/index.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools */ "./src/tools.ts");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/index */ "./src/services/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var AxisChart = /** @class */ (function (_super) {
    __extends(AxisChart, _super);
    function AxisChart(holder, chartConfigs) {
        var _this = _super.call(this, holder, chartConfigs) || this;
        _this.services = Object.assign(_this.services, {
            axes: _services_index__WEBPACK_IMPORTED_MODULE_4__["Axes"],
            curves: _services_index__WEBPACK_IMPORTED_MODULE_4__["Curves"]
        });
        return _this;
    }
    AxisChart.prototype.getAxisChartComponents = function (graphFrameComponents) {
        var titleComponent = {
            id: "title",
            components: [
                new _components_index__WEBPACK_IMPORTED_MODULE_2__["Title"](this.model, this.services)
            ],
            growth: {
                x: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].PREFERRED,
                y: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].FIXED
            }
        };
        var legendComponent = {
            id: "legend",
            components: [
                new _components_index__WEBPACK_IMPORTED_MODULE_2__["Legend"](this.model, this.services)
            ],
            growth: {
                x: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].PREFERRED,
                y: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].FIXED
            }
        };
        var graphFrameComponent = {
            id: "graph-frame",
            components: graphFrameComponents,
            growth: {
                x: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].STRETCH,
                y: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].FIXED
            }
        };
        // Decide the position of the legend in reference to the chart
        var fullFrameComponentDirection = _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].COLUMN;
        var legendPosition = _tools__WEBPACK_IMPORTED_MODULE_3__["Tools"].getProperty(this.model.getOptions(), "legend", "position");
        if (legendPosition === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LegendPositions"].LEFT) {
            fullFrameComponentDirection = _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].ROW;
            if (!this.model.getOptions().legend.orientation) {
                this.model.getOptions().legend.orientation = _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LegendOrientations"].VERTICAL;
            }
        }
        else if (legendPosition === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LegendPositions"].RIGHT) {
            fullFrameComponentDirection = _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].ROW_REVERSE;
            if (!this.model.getOptions().legend.orientation) {
                this.model.getOptions().legend.orientation = _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LegendOrientations"].VERTICAL;
            }
        }
        else if (legendPosition === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LegendPositions"].BOTTOM) {
            fullFrameComponentDirection = _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].COLUMN_REVERSE;
        }
        var fullFrameComponent = {
            id: "full-frame",
            components: [
                new _components_index__WEBPACK_IMPORTED_MODULE_2__["LayoutComponent"](this.model, this.services, [
                    legendComponent,
                    graphFrameComponent
                ], {
                    direction: fullFrameComponentDirection
                })
            ],
            growth: {
                x: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].STRETCH,
                y: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].FIXED
            }
        };
        // Add chart title if it exists
        var topLevelLayoutComponents = [];
        if (this.model.getOptions().title) {
            topLevelLayoutComponents.push(titleComponent);
        }
        topLevelLayoutComponents.push(fullFrameComponent);
        return [
            new _components_index__WEBPACK_IMPORTED_MODULE_2__["LayoutComponent"](this.model, this.services, topLevelLayoutComponents, {
                direction: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].COLUMN
            })
        ];
    };
    return AxisChart;
}(_chart__WEBPACK_IMPORTED_MODULE_0__["Chart"]));



/***/ }),

/***/ "./src/chart.ts":
/*!**********************!*\
  !*** ./src/chart.ts ***!
  \**********************/
/*! exports provided: Chart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart", function() { return Chart; });
/* harmony import */ var _interfaces_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./interfaces/index */ "./src/interfaces/index.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.ts");
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components */ "./src/components/index.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tools */ "./src/tools.ts");
/* harmony import */ var _services_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/index */ "./src/services/index.ts");
// Internal Imports

// Misc



// Services

var Chart = /** @class */ (function () {
    function Chart(holder, chartConfigs) {
        this.services = {
            domUtils: _services_index__WEBPACK_IMPORTED_MODULE_4__["DOMUtils"],
            events: _services_index__WEBPACK_IMPORTED_MODULE_4__["Events"],
            transitions: _services_index__WEBPACK_IMPORTED_MODULE_4__["Transitions"],
            themes: _services_index__WEBPACK_IMPORTED_MODULE_4__["Themes"]
        };
        this.model = new _model__WEBPACK_IMPORTED_MODULE_1__["ChartModel"](this.services);
    }
    // Contains the code that uses properties that are overridable by the super-class
    Chart.prototype.init = function (holder, chartConfigs) {
        var _this = this;
        // Store the holder in the model
        this.model.set({ holder: holder }, true);
        // Initialize all services
        Object.keys(this.services).forEach(function (serviceName) {
            var serviceObj = _this.services[serviceName];
            _this.services[serviceName] = new serviceObj(_this.model, _this.services);
        });
        // Call update() when model has been updated
        this.services.events
            .addEventListener("model-update", function () {
            _this.update(true);
        });
        // Set model data & options
        this.model.setData(chartConfigs.data);
        // Set chart resize event listener
        this.services.events
            .addEventListener("chart-resize", function () {
            _this.update(false);
        });
        this.components = this.getComponents();
        this.update();
    };
    Chart.prototype.getComponents = function () {
        console.error("getComponents() method is not implemented");
        return null;
    };
    Chart.prototype.update = function (animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        if (!this.components) {
            return;
        }
        // Render all components
        this.components.forEach(function (component) { return component.render(animate); });
        // Asynchronously dispatch a "render-finished" event
        // This is needed because of d3-transitions
        // Since at the start of the transition
        // Elements do not hold their final size or position
        var pendingTransitions = this.services.transitions.getPendingTransitions();
        var promises = Object.keys(pendingTransitions)
            .map(function (transitionID) {
            var transition = pendingTransitions[transitionID];
            return transition.end()
                .catch(function (e) { return e; }); // Skip rejects since we don't care about those;
        });
        Promise.all(promises)
            .then(function () { return _this.services.events.dispatchEvent("render-finished"); });
    };
    Chart.prototype.destroy = function () {
        // Call the destroy() method on all components
        this.components.forEach(function (component) { return component.destroy(); });
        // Remove the chart holder
        this.services.domUtils.getHolder().remove();
        this.model.set({ destroyed: true }, true);
    };
    Chart.prototype.getChartComponents = function (graphFrameComponents) {
        var titleComponent = {
            id: "title",
            components: [
                new _components__WEBPACK_IMPORTED_MODULE_2__["Title"](this.model, this.services)
            ],
            growth: {
                x: _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutGrowth"].PREFERRED,
                y: _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutGrowth"].FIXED
            }
        };
        var legendComponent = {
            id: "legend",
            components: [
                new _components__WEBPACK_IMPORTED_MODULE_2__["Legend"](this.model, this.services)
            ],
            growth: {
                x: _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutGrowth"].PREFERRED,
                y: _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutGrowth"].FIXED
            }
        };
        var graphFrameComponent = {
            id: "graph-frame",
            components: graphFrameComponents,
            growth: {
                x: _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutGrowth"].STRETCH,
                y: _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutGrowth"].FIXED
            }
        };
        // TODORF - REUSE BETWEEN AXISCHART & CHART
        // Decide the position of the legend in reference to the chart
        var fullFrameComponentDirection = _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutDirection"].COLUMN;
        var legendPosition = _tools__WEBPACK_IMPORTED_MODULE_3__["Tools"].getProperty(this.model.getOptions(), "legend", "position");
        if (legendPosition === "left") {
            fullFrameComponentDirection = _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutDirection"].ROW;
            if (!this.model.getOptions().legend.orientation) {
                this.model.getOptions().legend.orientation = _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LegendOrientations"].VERTICAL;
            }
        }
        else if (legendPosition === "right") {
            fullFrameComponentDirection = _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutDirection"].ROW_REVERSE;
            if (!this.model.getOptions().legend.orientation) {
                this.model.getOptions().legend.orientation = _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LegendOrientations"].VERTICAL;
            }
        }
        else if (legendPosition === "bottom") {
            fullFrameComponentDirection = _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutDirection"].COLUMN_REVERSE;
        }
        var fullFrameComponent = {
            id: "full-frame",
            components: [
                new _components__WEBPACK_IMPORTED_MODULE_2__["LayoutComponent"](this.model, this.services, [
                    legendComponent,
                    graphFrameComponent
                ], {
                    direction: fullFrameComponentDirection
                })
            ],
            growth: {
                x: _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutGrowth"].STRETCH,
                y: _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutGrowth"].FIXED
            }
        };
        // Add chart title if it exists
        var topLevelLayoutComponents = [];
        if (this.model.getOptions().title) {
            topLevelLayoutComponents.push(titleComponent);
        }
        topLevelLayoutComponents.push(fullFrameComponent);
        return [
            new _components__WEBPACK_IMPORTED_MODULE_2__["LayoutComponent"](this.model, this.services, topLevelLayoutComponents, {
                direction: _interfaces_index__WEBPACK_IMPORTED_MODULE_0__["LayoutDirection"].COLUMN
            })
        ];
    };
    return Chart;
}());



/***/ }),

/***/ "./src/charts/bar-grouped.ts":
/*!***********************************!*\
  !*** ./src/charts/bar-grouped.ts ***!
  \***********************************/
/*! exports provided: GroupedBarChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupedBarChart", function() { return GroupedBarChart; });
/* harmony import */ var _axis_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../axis-chart */ "./src/axis-chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools */ "./src/tools.ts");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/index */ "./src/components/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports



// Components

var GroupedBarChart = /** @class */ (function (_super) {
    __extends(GroupedBarChart, _super);
    function GroupedBarChart(holder, chartConfigs) {
        var _this = _super.call(this, holder, chartConfigs) || this;
        // Merge the default options for this chart
        // With the user provided options
        _this.model.setOptions(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].merge(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].clone(_configuration__WEBPACK_IMPORTED_MODULE_1__["options"].groupedBarChart), chartConfigs.options));
        // Initialize data, services, components etc.
        _this.init(holder, chartConfigs);
        return _this;
    }
    GroupedBarChart.prototype.getComponents = function () {
        // Specify what to render inside the graph-frame
        var graphFrameComponents = [
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["TwoDimensionalAxes"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["Grid"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["GroupedBar"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["HorizontalZeroLine"](this.model, this.services)
        ];
        var components = this.getAxisChartComponents(graphFrameComponents);
        components.push(new _components_index__WEBPACK_IMPORTED_MODULE_3__["TooltipBar"](this.model, this.services));
        return components;
    };
    return GroupedBarChart;
}(_axis_chart__WEBPACK_IMPORTED_MODULE_0__["AxisChart"]));



/***/ }),

/***/ "./src/charts/bar-simple.ts":
/*!**********************************!*\
  !*** ./src/charts/bar-simple.ts ***!
  \**********************************/
/*! exports provided: SimpleBarChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleBarChart", function() { return SimpleBarChart; });
/* harmony import */ var _axis_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../axis-chart */ "./src/axis-chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools */ "./src/tools.ts");
/* harmony import */ var _model_simple_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model-simple-bar */ "./src/model-simple-bar.ts");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/index */ "./src/components/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports




// Components

var SimpleBarChart = /** @class */ (function (_super) {
    __extends(SimpleBarChart, _super);
    function SimpleBarChart(holder, chartConfigs) {
        var _this = _super.call(this, holder, chartConfigs) || this;
        _this.model = new _model_simple_bar__WEBPACK_IMPORTED_MODULE_3__["SimpleBarChartModel"](_this.services);
        // Merge the default options for this chart
        // With the user provided options
        _this.model.setOptions(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].merge(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].clone(_configuration__WEBPACK_IMPORTED_MODULE_1__["options"].simpleBarChart), chartConfigs.options));
        // Initialize data, services, components etc.
        _this.init(holder, chartConfigs);
        return _this;
    }
    SimpleBarChart.prototype.getComponents = function () {
        // Specify what to render inside the graph-frame
        var graphFrameComponents = [
            new _components_index__WEBPACK_IMPORTED_MODULE_4__["TwoDimensionalAxes"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_4__["Grid"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_4__["SimpleBar"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_4__["HorizontalZeroLine"](this.model, this.services)
        ];
        var components = this.getAxisChartComponents(graphFrameComponents);
        components.push(new _components_index__WEBPACK_IMPORTED_MODULE_4__["TooltipBar"](this.model, this.services));
        return components;
    };
    return SimpleBarChart;
}(_axis_chart__WEBPACK_IMPORTED_MODULE_0__["AxisChart"]));



/***/ }),

/***/ "./src/charts/bar-stacked.ts":
/*!***********************************!*\
  !*** ./src/charts/bar-stacked.ts ***!
  \***********************************/
/*! exports provided: StackedBarChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackedBarChart", function() { return StackedBarChart; });
/* harmony import */ var _axis_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../axis-chart */ "./src/axis-chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools */ "./src/tools.ts");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/index */ "./src/components/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports



// Components

var StackedBarChart = /** @class */ (function (_super) {
    __extends(StackedBarChart, _super);
    function StackedBarChart(holder, chartConfigs) {
        var _this = _super.call(this, holder, chartConfigs) || this;
        // Merge the default options for this chart
        // With the user provided options
        _this.model.setOptions(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].merge(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].clone(_configuration__WEBPACK_IMPORTED_MODULE_1__["options"].stackedBarChart), chartConfigs.options));
        // Initialize data, services, components etc.
        _this.init(holder, chartConfigs);
        return _this;
    }
    StackedBarChart.prototype.getComponents = function () {
        // Specify what to render inside the graph-frame
        var graphFrameComponents = [
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["TwoDimensionalAxes"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["Grid"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["StackedBar"](this.model, this.services)
        ];
        var components = this.getAxisChartComponents(graphFrameComponents);
        components.push(new _components_index__WEBPACK_IMPORTED_MODULE_3__["TooltipBar"](this.model, this.services));
        return components;
    };
    return StackedBarChart;
}(_axis_chart__WEBPACK_IMPORTED_MODULE_0__["AxisChart"]));



/***/ }),

/***/ "./src/charts/donut.ts":
/*!*****************************!*\
  !*** ./src/charts/donut.ts ***!
  \*****************************/
/*! exports provided: DonutChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DonutChart", function() { return DonutChart; });
/* harmony import */ var _pie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pie */ "./src/charts/pie.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools */ "./src/tools.ts");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/index */ "./src/components/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports



// Components

var DonutChart = /** @class */ (function (_super) {
    __extends(DonutChart, _super);
    function DonutChart(holder, chartConfigs) {
        var _this = _super.call(this, holder, chartConfigs, true) || this;
        // Merge the default options for this chart
        // With the user provided options
        _this.model.setOptions(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].merge(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].clone(_configuration__WEBPACK_IMPORTED_MODULE_1__["options"].donutChart), chartConfigs.options));
        // Initialize data, services, components etc.
        _this.init(holder, chartConfigs);
        return _this;
    }
    DonutChart.prototype.getComponents = function () {
        // Specify what to render inside the graph-frame
        var graphFrameComponents = [
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["Donut"](this.model, this.services)
        ];
        var components = this.getChartComponents(graphFrameComponents);
        components.push(new _components_index__WEBPACK_IMPORTED_MODULE_3__["Tooltip"](this.model, this.services));
        return components;
    };
    return DonutChart;
}(_pie__WEBPACK_IMPORTED_MODULE_0__["PieChart"]));



/***/ }),

/***/ "./src/charts/index.ts":
/*!*****************************!*\
  !*** ./src/charts/index.ts ***!
  \*****************************/
/*! exports provided: SimpleBarChart, GroupedBarChart, StackedBarChart, LineChart, ScatterChart, PieChart, DonutChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bar_simple__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar-simple */ "./src/charts/bar-simple.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleBarChart", function() { return _bar_simple__WEBPACK_IMPORTED_MODULE_0__["SimpleBarChart"]; });

/* harmony import */ var _bar_grouped__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bar-grouped */ "./src/charts/bar-grouped.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupedBarChart", function() { return _bar_grouped__WEBPACK_IMPORTED_MODULE_1__["GroupedBarChart"]; });

/* harmony import */ var _bar_stacked__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bar-stacked */ "./src/charts/bar-stacked.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackedBarChart", function() { return _bar_stacked__WEBPACK_IMPORTED_MODULE_2__["StackedBarChart"]; });

/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./line */ "./src/charts/line.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LineChart", function() { return _line__WEBPACK_IMPORTED_MODULE_3__["LineChart"]; });

/* harmony import */ var _scatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./scatter */ "./src/charts/scatter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScatterChart", function() { return _scatter__WEBPACK_IMPORTED_MODULE_4__["ScatterChart"]; });

/* harmony import */ var _pie__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pie */ "./src/charts/pie.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PieChart", function() { return _pie__WEBPACK_IMPORTED_MODULE_5__["PieChart"]; });

/* harmony import */ var _donut__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./donut */ "./src/charts/donut.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DonutChart", function() { return _donut__WEBPACK_IMPORTED_MODULE_6__["DonutChart"]; });










/***/ }),

/***/ "./src/charts/line.ts":
/*!****************************!*\
  !*** ./src/charts/line.ts ***!
  \****************************/
/*! exports provided: LineChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LineChart", function() { return LineChart; });
/* harmony import */ var _axis_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../axis-chart */ "./src/axis-chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools */ "./src/tools.ts");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/index */ "./src/components/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports



// Components

var LineChart = /** @class */ (function (_super) {
    __extends(LineChart, _super);
    function LineChart(holder, chartConfigs) {
        var _this = _super.call(this, holder, chartConfigs) || this;
        // Merge the default options for this chart
        // With the user provided options
        _this.model.setOptions(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].merge(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].clone(_configuration__WEBPACK_IMPORTED_MODULE_1__["options"].lineChart), chartConfigs.options));
        // Initialize data, services, components etc.
        _this.init(holder, chartConfigs);
        return _this;
    }
    LineChart.prototype.getComponents = function () {
        // Specify what to render inside the graph-frame
        var graphFrameComponents = [
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["TwoDimensionalAxes"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["Grid"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["Line"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["Scatter"](this.model, this.services)
        ];
        var components = this.getAxisChartComponents(graphFrameComponents);
        components.push(new _components_index__WEBPACK_IMPORTED_MODULE_3__["TooltipScatter"](this.model, this.services));
        return components;
    };
    return LineChart;
}(_axis_chart__WEBPACK_IMPORTED_MODULE_0__["AxisChart"]));



/***/ }),

/***/ "./src/charts/pie.ts":
/*!***************************!*\
  !*** ./src/charts/pie.ts ***!
  \***************************/
/*! exports provided: PieChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieChart", function() { return PieChart; });
/* harmony import */ var _model_pie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model-pie */ "./src/model-pie.ts");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chart */ "./src/chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tools */ "./src/tools.ts");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/index */ "./src/components/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports




// Components

var PieChart = /** @class */ (function (_super) {
    __extends(PieChart, _super);
    // TODO - Optimize the use of "extending"
    function PieChart(holder, chartConfigs, extending) {
        if (extending === void 0) { extending = false; }
        var _this = _super.call(this, holder, chartConfigs) || this;
        _this.model = new _model_pie__WEBPACK_IMPORTED_MODULE_0__["PieChartModel"](_this.services);
        // TODO - Optimize the use of "extending"
        if (extending) {
            return _this;
        }
        // Merge the default options for this chart
        // With the user provided options
        _this.model.setOptions(_tools__WEBPACK_IMPORTED_MODULE_3__["Tools"].merge(_tools__WEBPACK_IMPORTED_MODULE_3__["Tools"].clone(_configuration__WEBPACK_IMPORTED_MODULE_2__["options"].pieChart), chartConfigs.options));
        // Initialize data, services, components etc.
        _this.init(holder, chartConfigs);
        return _this;
    }
    PieChart.prototype.getComponents = function () {
        // Specify what to render inside the graph-frame
        var graphFrameComponents = [
            new _components_index__WEBPACK_IMPORTED_MODULE_4__["Pie"](this.model, this.services)
        ];
        // get the base chart components and export with tooltip
        var components = this.getChartComponents(graphFrameComponents);
        components.push(new _components_index__WEBPACK_IMPORTED_MODULE_4__["Tooltip"](this.model, this.services));
        return components;
    };
    return PieChart;
}(_chart__WEBPACK_IMPORTED_MODULE_1__["Chart"]));



/***/ }),

/***/ "./src/charts/scatter.ts":
/*!*******************************!*\
  !*** ./src/charts/scatter.ts ***!
  \*******************************/
/*! exports provided: ScatterChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScatterChart", function() { return ScatterChart; });
/* harmony import */ var _axis_chart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../axis-chart */ "./src/axis-chart.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../tools */ "./src/tools.ts");
/* harmony import */ var _components_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/index */ "./src/components/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports



// Components

var ScatterChart = /** @class */ (function (_super) {
    __extends(ScatterChart, _super);
    function ScatterChart(holder, chartConfigs) {
        var _this = _super.call(this, holder, chartConfigs) || this;
        // Merge the default options for this chart
        // With the user provided options
        _this.model.setOptions(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].merge(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].clone(_configuration__WEBPACK_IMPORTED_MODULE_1__["options"].scatterChart), chartConfigs.options));
        // Initialize data, services, components etc.
        _this.init(holder, chartConfigs);
        return _this;
    }
    ScatterChart.prototype.getComponents = function () {
        // Specify what to render inside the graph-frame
        var graphFrameComponents = [
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["TwoDimensionalAxes"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["Grid"](this.model, this.services),
            new _components_index__WEBPACK_IMPORTED_MODULE_3__["Scatter"](this.model, this.services)
        ];
        var components = this.getAxisChartComponents(graphFrameComponents);
        components.push(new _components_index__WEBPACK_IMPORTED_MODULE_3__["TooltipScatter"](this.model, this.services));
        return components;
    };
    return ScatterChart;
}(_axis_chart__WEBPACK_IMPORTED_MODULE_0__["AxisChart"]));



/***/ }),

/***/ "./src/components/axes/axis.ts":
/*!*************************************!*\
  !*** ./src/components/axes/axis.ts ***!
  \*************************************/
/*! exports provided: Axis */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Axis", function() { return Axis; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../interfaces */ "./src/interfaces/index.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/src/index.js");
/* harmony import */ var d3_axis__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-axis */ "../../node_modules/d3-axis/src/index.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-array */ "../../node_modules/d3-array/src/index.js");
/* harmony import */ var d3_time_format__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! d3-time-format */ "../../node_modules/d3-time-format/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports




// D3 Imports




var Axis = /** @class */ (function (_super) {
    __extends(Axis, _super);
    function Axis(model, services, configs) {
        var _this = _super.call(this, model, services, configs) || this;
        _this.type = "axes";
        if (configs) {
            _this.configs = configs;
        }
        _this.margins = _this.configs.margins;
        return _this;
    }
    Axis.prototype.createOrGetScale = function () {
        var _a;
        var position = this.configs.position;
        var axisOptions = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(this.model.getOptions(), "axes", position);
        this.scaleType = (axisOptions && axisOptions.scaleType) ? axisOptions.scaleType : _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].LINEAR;
        var scaleFunction;
        if (this.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].TIME) {
            scaleFunction = Object(d3_scale__WEBPACK_IMPORTED_MODULE_4__["scaleTime"])();
        }
        else if (this.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].LOG) {
            scaleFunction = Object(d3_scale__WEBPACK_IMPORTED_MODULE_4__["scaleLog"])().base(axisOptions.base || 10);
        }
        else if (this.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].LABELS) {
            scaleFunction = Object(d3_scale__WEBPACK_IMPORTED_MODULE_4__["scaleBand"])();
        }
        else {
            scaleFunction = Object(d3_scale__WEBPACK_IMPORTED_MODULE_4__["scaleLinear"])();
        }
        // If scale doesn't exist in the model, store it
        if (!this.model.get(position)) {
            var modelUpdates = (_a = {},
                _a[position] = this,
                _a);
            if (axisOptions) {
                if (axisOptions.primary === true) {
                    modelUpdates[_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisTypes"].PRIMARY] = this;
                }
                if (axisOptions.secondary === true) {
                    modelUpdates[_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisTypes"].SECONDARY] = this;
                }
            }
            this.model.set(modelUpdates, true);
        }
        this.scale = scaleFunction;
        return scaleFunction;
    };
    Axis.prototype.getScale = function () {
        return !this.scale ? this.createOrGetScale() : this.scale;
    };
    Axis.prototype.getScaleDomain = function () {
        var options = this.model.getOptions();
        var position = this.configs.position;
        var axisOptions = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(options, "axes", position);
        var _a = this.model.getDisplayData(), datasets = _a.datasets, labels = _a.labels;
        // If scale is a LABELS scale, return some labels as the domain
        if (axisOptions && axisOptions.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].LABELS) {
            if (labels) {
                return labels;
            }
            else {
                return this.model.getDisplayData().datasets[0].data.map(function (d, i) { return i + 1; });
            }
        }
        // Get the extent of the domain
        var domain;
        // If the scale is stacked
        if (axisOptions.stacked) {
            domain = Object(d3_array__WEBPACK_IMPORTED_MODULE_6__["extent"])(labels.reduce(function (m, label, i) {
                var correspondingValues = datasets.map(function (dataset) {
                    return !isNaN(dataset.data[i]) ? dataset.data[i] : dataset.data[i].value;
                });
                var totalValue = correspondingValues.reduce(function (a, b) { return a + b; }, 0);
                // Save both the total value and the minimum
                return m.concat(totalValue, Object(d3_array__WEBPACK_IMPORTED_MODULE_6__["min"])(correspondingValues));
            }, [])
                // Currently stack layouts in the library
                // Only support positive values
                .concat(0));
        }
        else {
            // Get all the chart's data values in a flat array
            var allDataValues = datasets.reduce(function (dataValues, dataset) {
                dataset.data.forEach(function (datum) {
                    if (axisOptions.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].TIME) {
                        dataValues = dataValues.concat(datum.date);
                    }
                    else {
                        dataValues = dataValues.concat(isNaN(datum) ? datum.value : datum);
                    }
                });
                return dataValues;
            }, []);
            if (axisOptions.scaleType !== _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].TIME) {
                allDataValues = allDataValues.concat(0);
            }
            domain = Object(d3_array__WEBPACK_IMPORTED_MODULE_6__["extent"])(allDataValues);
        }
        if (axisOptions.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].TIME) {
            if (_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(options, "timeScale", "addSpaceOnEdges")) {
                // TODO - Need to account for non-day incrementals as well
                var startDate = domain[0], endDate = domain[1];
                startDate.setDate(startDate.getDate() - 1);
                endDate.setDate(endDate.getDate() + 1);
            }
            return [
                new Date(domain[0]),
                new Date(domain[1])
            ];
        }
        // TODO - Work with design to improve logic
        domain[1] = domain[1] * 1.1;
        return domain;
    };
    Axis.prototype.render = function (animate) {
        if (animate === void 0) { animate = true; }
        var axisPosition = this.configs.position;
        var options = this.model.getOptions();
        var axisOptions = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(options, "axes", axisPosition);
        var svg = this.getContainerSVG();
        var _a = _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].getSVGElementSize(this.parent, { useAttrs: true }), width = _a.width, height = _a.height;
        var startPosition, endPosition;
        if (axisPosition === _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].BOTTOM || axisPosition === _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].TOP) {
            startPosition = this.configs.axes[_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].LEFT] ? this.margins.left : 0;
            endPosition = this.configs.axes[_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].RIGHT] ? width - this.margins.right : width;
        }
        else {
            startPosition = height - this.margins.bottom;
            endPosition = this.margins.top;
        }
        // Grab the scale off of the model, and initialize if it doesn't exist
        var scale = this.createOrGetScale().domain(this.getScaleDomain());
        if (this.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].LABELS) {
            scale.rangeRound([startPosition, endPosition]);
        }
        else {
            scale.range([startPosition, endPosition]);
        }
        // Identify the corresponding d3 axis function
        var axisFunction;
        switch (axisPosition) {
            case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].LEFT:
                axisFunction = d3_axis__WEBPACK_IMPORTED_MODULE_5__["axisLeft"];
                break;
            case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].BOTTOM:
                axisFunction = d3_axis__WEBPACK_IMPORTED_MODULE_5__["axisBottom"];
                break;
            case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].RIGHT:
                axisFunction = d3_axis__WEBPACK_IMPORTED_MODULE_5__["axisRight"];
                break;
            case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].TOP:
                axisFunction = d3_axis__WEBPACK_IMPORTED_MODULE_5__["axisTop"];
                break;
        }
        // Set the date/time locale
        if (this.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].TIME) {
            var timeLocale = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(options, "locale", "time");
            if (timeLocale) {
                Object(d3_time_format__WEBPACK_IMPORTED_MODULE_7__["timeFormatDefaultLocale"])(timeLocale);
            }
        }
        // Initialize axis object
        var axis = axisFunction(scale)
            .tickSizeOuter(0)
            .tickFormat(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(axisOptions, "ticks", "formatter"));
        if (scale.ticks) {
            var numberOfTicks = 7;
            axis.ticks(numberOfTicks);
            if (this.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].TIME) {
                var tickValues = scale.ticks(numberOfTicks).concat(scale.domain())
                    .map(function (date) { return +date; }).sort();
                tickValues = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].removeArrayDuplicates(tickValues);
                // Remove labels on the edges
                // If there are more than 2 labels to show
                if (_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(options, "timeScale", "addSpaceOnEdges") && tickValues.length > 2) {
                    tickValues.splice(tickValues.length - 1, 1);
                    tickValues.splice(0, 1);
                }
                axis.tickValues(tickValues);
            }
        }
        // Add axis into the parent
        var container = _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].appendOrSelect(svg, "g.axis." + axisPosition);
        var axisRefExists = !container.select("g.ticks").empty();
        var axisRef = _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].appendOrSelect(container, "g.ticks");
        // Position and transition the axis
        switch (axisPosition) {
            case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].LEFT:
                axisRef.attr("transform", "translate(" + this.margins.left + ", 0)");
                break;
            case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].BOTTOM:
                axisRef.attr("transform", "translate(0, " + (height - this.margins.bottom) + ")");
                break;
            case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].RIGHT:
                axisRef.attr("transform", "translate(" + (width - this.margins.right) + ", 0)");
                break;
            case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].TOP:
                axisRef.attr("transform", "translate(0, " + this.margins.top + ")");
                break;
        }
        // Position the axis title
        if (axisOptions.title) {
            var axisTitleRef = _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].appendOrSelect(container, "text.axis-title")
                .text(axisOptions.title);
            switch (axisPosition) {
                case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].LEFT:
                    axisTitleRef.attr("transform", "rotate(-90)")
                        .attr("y", 0)
                        .attr("x", -(scale.range()[0] / 2))
                        .attr("dy", "1em")
                        .style("text-anchor", "middle");
                    break;
                case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].BOTTOM:
                    axisTitleRef.attr("transform", "translate(" + (this.margins.left / 2 + scale.range()[1] / 2) + ", " + height + ")")
                        .style("text-anchor", "middle");
                    break;
                case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].RIGHT:
                    axisTitleRef.attr("transform", "rotate(90)")
                        .attr("y", -width)
                        .attr("x", scale.range()[0] / 2)
                        .attr("dy", "1em")
                        .style("text-anchor", "middle");
                    break;
                case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].TOP:
                    var titleHeight = _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].getSVGElementSize(axisTitleRef, { useBBox: true }).height;
                    axisTitleRef.attr("transform", "translate(" + (this.margins.left / 2 + scale.range()[1] / 2) + ", " + titleHeight / 2 + ")")
                        .style("text-anchor", "middle");
                    break;
            }
        }
        // Apply new axis to the axis element
        if (!animate || !axisRefExists) {
            axisRef = axisRef.call(axis);
        }
        else {
            axisRef = axisRef.transition(this.services.transitions.getTransition("axis-update"))
                .call(axis);
        }
        if (axisPosition === _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].BOTTOM || axisPosition === _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].TOP) {
            if (scale.step) {
                var textNodes = axisRef.selectAll("g.tick text").nodes();
                // If any ticks are any larger than the scale step size
                if (textNodes.some(function (textNode) { return _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].getSVGElementSize(textNode, { useBBox: true }).width >= scale.step(); })) {
                    axisRef.selectAll("g.tick text")
                        .attr("transform", "rotate(45)")
                        .style("text-anchor", axisPosition === _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].TOP ? "end" : "start");
                    return;
                }
            }
            else {
                var estimatedTickSize = width / scale.ticks().length / 2;
                if (estimatedTickSize < 30) {
                    axisRef.selectAll("g.tick text")
                        .attr("transform", "rotate(45)")
                        .style("text-anchor", axisPosition === _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].TOP ? "end" : "start");
                    return;
                }
            }
            axisRef.selectAll("g.tick text")
                .attr("transform", null)
                .style("text-anchor", null);
        }
    };
    Axis.prototype.getValueFromScale = function (datum, index) {
        var value = isNaN(datum) ? datum.value : datum;
        if (this.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].LABELS) {
            var correspondingLabel = this.model.getDisplayData().labels[index];
            return this.scale(correspondingLabel) + this.scale.step() / 2;
        }
        else if (this.scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].TIME) {
            return this.scale(new Date(datum.date || datum.label));
        }
        return this.scale(value);
    };
    Axis.prototype.getAxisRef = function () {
        var axisPosition = this.configs.position;
        return this.getContainerSVG()
            .select("g.axis." + axisPosition + " g.ticks");
    };
    Axis.prototype.getTitleRef = function () {
        var axisPosition = this.configs.position;
        return this.getContainerSVG()
            .select("g.axis." + axisPosition + " text.axis-title");
    };
    return Axis;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/axes/grid.ts":
/*!*************************************!*\
  !*** ./src/components/axes/grid.ts ***!
  \*************************************/
/*! exports provided: Grid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return Grid; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
/* harmony import */ var d3_axis__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-axis */ "../../node_modules/d3-axis/src/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../interfaces */ "./src/interfaces/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports



// D3 Imports



var Grid = /** @class */ (function (_super) {
    __extends(Grid, _super);
    function Grid() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "grid";
        return _this;
    }
    Grid.prototype.render = function () {
        // Draw the backdrop
        this.drawBackdrop();
        _services__WEBPACK_IMPORTED_MODULE_2__["DOMUtils"].appendOrSelect(this.backdrop, "g.x.grid");
        _services__WEBPACK_IMPORTED_MODULE_2__["DOMUtils"].appendOrSelect(this.backdrop, "g.y.grid");
        this.drawXGrid();
        this.drawYGrid();
        if (_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "tooltip", "gridline", "enabled")) {
            this.addGridEventListeners();
        }
    };
    Grid.prototype.drawXGrid = function () {
        var svg = this.parent;
        var height = this.backdrop.attr("height");
        var mainXScale = this.services.axes.getMainXAxis().getScale();
        var xGrid = Object(d3_axis__WEBPACK_IMPORTED_MODULE_3__["axisBottom"])(mainXScale)
            .tickSizeInner(-height)
            .tickSizeOuter(0);
        // Determine number of ticks
        var numberOfTicks = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "grid", "x", "numberOfTicks");
        xGrid.ticks(numberOfTicks);
        var g = svg.select(".x.grid")
            .attr("transform", "translate(" + -this.backdrop.attr("x") + ", " + height + ")")
            .call(xGrid);
        this.cleanGrid(g);
    };
    Grid.prototype.drawYGrid = function () {
        var svg = this.parent;
        var width = this.backdrop.attr("width");
        var mainYScale = this.services.axes.getMainYAxis().getScale();
        var yGrid = Object(d3_axis__WEBPACK_IMPORTED_MODULE_3__["axisLeft"])(mainYScale)
            .tickSizeInner(-width)
            .tickSizeOuter(0);
        // Determine number of ticks
        var numberOfTicks = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "grid", "y", "numberOfTicks");
        yGrid.ticks(numberOfTicks);
        var g = svg.select(".y.grid")
            .attr("transform", "translate(0, " + -this.backdrop.attr("y") + ")")
            .call(yGrid);
        this.cleanGrid(g);
    };
    /**
     * Returns the threshold for the gridline tooltips based on the mouse location.
     * Calculated based on the mouse position between the two closest gridlines or edges of chart.
     */
    Grid.prototype.getGridlineThreshold = function (mousePos) {
        // use the space between axis grid ticks to adjust the threshold for the tooltips
        var svg = this.parent;
        // sort in ascending x translation value order
        var gridlinesX = svg.selectAll(".x.grid .tick").nodes()
            .sort(function (a, b) {
            return Number(_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getTranslationValues(a).tx) - Number(_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getTranslationValues(b).tx);
        });
        // find the 2 gridlines on either side of the mouse
        var floor = -1;
        var ceiling;
        gridlinesX.forEach(function (line, i) {
            if (mousePos[0] >= +_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getTranslationValues(line).tx) {
                floor++;
            }
        });
        ceiling = (floor + 1 < gridlinesX.length) ? floor + 1 : gridlinesX.length;
        // get the 'step' between chart gridlines
        var line1 = gridlinesX[floor];
        var line2 = gridlinesX[ceiling];
        var lineSpacing;
        // if the mouse is on edge of charts (mouseX < first gridline || mouseX > last gridline)
        // we can use the chart edge to determind the threshold for the gridlines
        if (!line1) {
            // we are between the first gridline and the chart edge
            lineSpacing = +_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getTranslationValues(line2).tx;
        }
        else if (!line2) {
            // we need to use the chart right bounds in case there isnt a domain axis
            var gridElement = svg.select("rect.chart-grid-backdrop").node();
            var width = _services__WEBPACK_IMPORTED_MODULE_2__["DOMUtils"].getSVGElementSize(gridElement).width;
            lineSpacing = width - +_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getTranslationValues(line1).tx;
        }
        else {
            // there are two gridlines to use
            lineSpacing = +_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getTranslationValues(line2).tx - +_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getTranslationValues(line1).tx;
        }
        var threshold = this.model.getOptions().tooltip.gridline.threshold;
        // return the threshold
        return lineSpacing * threshold;
    };
    /**
     * Returns the active gridlines based on the gridline threshold and mouse position.
     * @param position mouse positon
     */
    Grid.prototype.getActiveGridline = function (position) {
        var threshold = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions, "tooltip", "gridline", "threshold") ?
            _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions, "tooltip", "gridline", "threshold") : this.getGridlineThreshold(position);
        var svg = this.parent;
        var gridlinesX = svg.selectAll(".x.grid .tick")
            .filter(function () {
            var translations = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getTranslationValues(this);
            // threshold for when to display a gridline tooltip
            var bounds = {
                min: Number(translations.tx) - threshold,
                max: Number(translations.tx) + threshold
            };
            return bounds.min <= position[0] && position[0] <= bounds.max;
        });
        return gridlinesX;
    };
    /**
     * Adds the listener on the X grid to trigger multiple point tooltips along the x axis.
     */
    Grid.prototype.addGridEventListeners = function () {
        var self = this;
        var svg = this.parent;
        var grid = _services__WEBPACK_IMPORTED_MODULE_2__["DOMUtils"].appendOrSelect(svg, "rect.chart-grid-backdrop");
        grid
            .on("mousemove mouseover", function () {
            var chartContainer = self.services.domUtils.getMainSVG();
            var pos = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["mouse"])(chartContainer);
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this);
            // remove the styling on the lines
            var allgridlines = svg.selectAll(".x.grid .tick");
            allgridlines.classed("active", false);
            var activeGridline = self.getActiveGridline(pos);
            if (activeGridline.empty()) {
                self.services.events.dispatchEvent("hide-tooltip", {});
                return;
            }
            // set active class to control dasharray and theme colors
            activeGridline
                .classed("active", true);
            // get the items that should be highlighted
            var highlightItems;
            // use the selected gridline to get the data with associated domain
            activeGridline.each(function (d) {
                highlightItems = self.services.axes.getDataFromDomain(d);
            });
            self.services.events.dispatchEvent("show-tooltip", {
                hoveredElement: hoveredElement,
                multidata: highlightItems,
                type: _interfaces__WEBPACK_IMPORTED_MODULE_5__["TooltipTypes"].GRIDLINE
            });
        })
            .on("mouseout", function () {
            svg.selectAll(".x.grid .tick")
                .classed("active", false);
            self.services.events.dispatchEvent("hide-tooltip", {});
        });
    };
    Grid.prototype.drawBackdrop = function () {
        var svg = this.parent;
        var mainXScale = this.services.axes.getMainXAxis().getScale();
        var mainYScale = this.services.axes.getMainYAxis().getScale();
        var _a = mainXScale.range(), xScaleStart = _a[0], xScaleEnd = _a[1];
        var _b = mainYScale.range(), yScaleEnd = _b[0], yScaleStart = _b[1];
        // Get height from the grid
        this.backdrop = _services__WEBPACK_IMPORTED_MODULE_2__["DOMUtils"].appendOrSelect(svg, "svg.chart-grid-backdrop");
        var backdropRect = _services__WEBPACK_IMPORTED_MODULE_2__["DOMUtils"].appendOrSelect(this.backdrop, "rect.chart-grid-backdrop");
        this.backdrop.merge(backdropRect)
            .attr("x", xScaleStart)
            .attr("y", yScaleStart)
            .attr("width", xScaleEnd - xScaleStart)
            .attr("height", yScaleEnd - yScaleStart)
            .lower();
        backdropRect.attr("width", "100%")
            .attr("height", "100%");
    };
    Grid.prototype.cleanGrid = function (g) {
        var options = this.model.getOptions();
        g.selectAll("line")
            .attr("stroke", options.grid.strokeColor);
        // Remove extra elements
        g.selectAll("text").remove();
        g.select(".domain").remove();
    };
    return Grid;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/axes/horizontal-zero-line.ts":
/*!*****************************************************!*\
  !*** ./src/components/axes/horizontal-zero-line.ts ***!
  \*****************************************************/
/*! exports provided: HorizontalZeroLine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HorizontalZeroLine", function() { return HorizontalZeroLine; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports


var HorizontalZeroLine = /** @class */ (function (_super) {
    __extends(HorizontalZeroLine, _super);
    function HorizontalZeroLine() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "horizontal-zero-line";
        return _this;
    }
    HorizontalZeroLine.prototype.render = function (animate) {
        // Grab container SVG
        var svg = this.getContainerSVG();
        // Get x & y position of the line
        var _a = this.services.axes.getMainXAxis().scale.range(), x1 = _a[0], x2 = _a[1];
        var yPosition = this.services.axes.getYValue(0) + 0.5;
        var horizontalLine = _services__WEBPACK_IMPORTED_MODULE_1__["DOMUtils"].appendOrSelect(svg, "line.domain");
        horizontalLine
            .transition(this.services.transitions.getTransition("horizontal-line-update", animate))
            .attr("y1", yPosition)
            .attr("y2", yPosition)
            .attr("x1", x1)
            .attr("x2", x2);
    };
    return HorizontalZeroLine;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/axes/two-dimensional-axes.ts":
/*!*****************************************************!*\
  !*** ./src/components/axes/two-dimensional-axes.ts ***!
  \*****************************************************/
/*! exports provided: TwoDimensionalAxes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TwoDimensionalAxes", function() { return TwoDimensionalAxes; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../interfaces */ "./src/interfaces/index.ts");
/* harmony import */ var _axis__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./axis */ "./src/components/axes/axis.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports





var TwoDimensionalAxes = /** @class */ (function (_super) {
    __extends(TwoDimensionalAxes, _super);
    function TwoDimensionalAxes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "2D-axes";
        _this.children = {};
        _this.margins = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        return _this;
    }
    TwoDimensionalAxes.prototype.render = function (animate) {
        var _this = this;
        if (animate === void 0) { animate = false; }
        var axes = {};
        var axisPositions = Object.keys(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"]);
        var axesOptions = _tools__WEBPACK_IMPORTED_MODULE_3__["Tools"].getProperty(this.model.getOptions(), "axes");
        if (axesOptions) {
            var primaryAxisOptions_1, secondaryAxisOptions_1;
            axisPositions.forEach(function (axisPosition) {
                var axisOptions = axesOptions[_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"][axisPosition]];
                if (axisOptions) {
                    axes[_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"][axisPosition]] = true;
                    if (axisOptions.primary === true) {
                        primaryAxisOptions_1 = axisOptions;
                    }
                    else if (axisOptions.secondary === true) {
                        secondaryAxisOptions_1 = axisOptions;
                    }
                }
            });
        }
        else {
            this.model.getOptions().axes = {
                left: {
                    primary: true
                },
                bottom: {
                    secondary: true,
                    type: this.model.getDisplayData().labels ? _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].LABELS : undefined
                }
            };
            axes[_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].LEFT] = true;
            axes[_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].BOTTOM] = true;
        }
        this.configs.axes = axes;
        // Check the configs to know which axes need to be rendered
        axisPositions.forEach(function (axisPositionKey) {
            var axisPosition = _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"][axisPositionKey];
            if (_this.configs.axes[axisPosition] && !_this.children[axisPosition]) {
                var axisComponent = new _axis__WEBPACK_IMPORTED_MODULE_2__["Axis"](_this.model, _this.services, {
                    position: axisPosition,
                    axes: _this.configs.axes,
                    margins: _this.margins
                });
                // Set model, services & parent for the new axis component
                axisComponent.setModel(_this.model);
                axisComponent.setServices(_this.services);
                axisComponent.setParent(_this.parent);
                _this.children[axisPosition] = axisComponent;
            }
        });
        Object.keys(this.children).forEach(function (childKey) {
            var child = _this.children[childKey];
            child.render(animate);
        });
        var margins = {};
        Object.keys(this.children).forEach(function (childKey) {
            var child = _this.children[childKey];
            var axisPosition = child.configs.position;
            var _a = _services__WEBPACK_IMPORTED_MODULE_4__["DOMUtils"].getSVGElementSize(child.getAxisRef(), { useBBox: true }), width = _a.width, height = _a.height;
            var offset;
            if (child.getTitleRef().empty()) {
                offset = 0;
            }
            else {
                offset = _services__WEBPACK_IMPORTED_MODULE_4__["DOMUtils"].getSVGElementSize(child.getTitleRef(), { useBBox: true }).height;
            }
            switch (axisPosition) {
                case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].TOP:
                    margins.top = height + offset;
                    break;
                case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].BOTTOM:
                    margins.bottom = height + offset;
                    break;
                case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].LEFT:
                    margins.left = width + offset;
                    break;
                case _interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].RIGHT:
                    margins.right = width + offset;
                    break;
            }
        });
        // If the new margins are different than the existing ones
        var isNotEqual = Object.keys(margins).some(function (marginKey) {
            return _this.margins[marginKey] !== margins[marginKey];
        });
        if (isNotEqual) {
            this.margins = Object.assign(this.margins, margins);
            Object.keys(this.children).forEach(function (childKey) {
                var child = _this.children[childKey];
                child.margins = _this.margins;
            });
            this.render(true);
        }
    };
    return TwoDimensionalAxes;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/component.ts":
/*!*************************************!*\
  !*** ./src/components/component.ts ***!
  \*************************************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component; });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services */ "./src/services/index.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tools */ "./src/tools.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! carbon-components/src/globals/js/settings */ "../../node_modules/carbon-components/src/globals/js/settings.js");
/* harmony import */ var carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3__);


// D3 Imports

// import the settings for the css prefix

var Component = /** @class */ (function () {
    function Component(model, services, configs) {
        this.configs = {};
        this.model = model;
        this.services = services;
        if (configs) {
            this.configs = configs;
        }
        // Set parent element to shell SVG if no parent exists for component
        if (!this.parent) {
            this.setParent(Object(d3_selection__WEBPACK_IMPORTED_MODULE_2__["select"])(this.services.domUtils.getMainSVG()));
        }
    }
    Component.prototype.init = function () {
    };
    Component.prototype.render = function (animate) {
        if (animate === void 0) { animate = true; }
        console.error("render() method is not implemented");
    };
    Component.prototype.destroy = function () {
    };
    // Used to pass down information to the components
    Component.prototype.setModel = function (newObj) {
        this.model = newObj;
    };
    // Used to pass down information to the components
    Component.prototype.setServices = function (newObj) {
        this.services = newObj;
    };
    Component.prototype.setParent = function (parent) {
        var oldParent = this.parent;
        this.parent = parent;
        if (oldParent && oldParent.node() === parent.node()) {
            return;
        }
        if (this.type) {
            var chartprefix = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "style", "prefix");
            this.parent.classed(carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3___default.a.prefix + "--" + chartprefix + "--" + this.type, true);
            if (oldParent) {
                oldParent.classed(carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3___default.a.prefix + "--" + chartprefix + "--" + this.type, false);
            }
        }
    };
    Component.prototype.getParent = function () {
        return this.parent;
    };
    Component.prototype.getContainerSVG = function () {
        if (this.type) {
            var chartprefix = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "style", "prefix");
            return _services__WEBPACK_IMPORTED_MODULE_0__["DOMUtils"].appendOrSelect(this.parent, "g." + carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3___default.a.prefix + "--" + chartprefix + "--" + this.type);
        }
        return this.parent;
    };
    return Component;
}());



/***/ }),

/***/ "./src/components/essentials/legend.ts":
/*!*********************************************!*\
  !*** ./src/components/essentials/legend.ts ***!
  \*********************************************/
/*! exports provided: Legend */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Legend", function() { return Legend; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../interfaces */ "./src/interfaces/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




// D3 Imports

var Legend = /** @class */ (function (_super) {
    __extends(Legend, _super);
    function Legend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "legend";
        return _this;
    }
    Legend.prototype.render = function () {
        var _this = this;
        var svg = this.getContainerSVG();
        var options = this.model.getOptions();
        var legendItems = svg.selectAll("g.legend-item")
            .data(this.getLegendItemArray());
        var addedLegendItems = legendItems.enter()
            .append("g")
            .classed("legend-item", true);
        // Configs
        var checkboxRadius = options.legend.checkbox.radius;
        addedLegendItems.append("rect")
            .classed("checkbox", true)
            .merge(legendItems.select("rect.checkbox"))
            .attr("width", checkboxRadius * 2)
            .attr("height", checkboxRadius * 2)
            .attr("rx", 1)
            .attr("ry", 1)
            .style("fill", function (d) {
            return d.value === options.legend.items.status.ACTIVE ? _this.model.getStrokeColor(d.key) : null;
        }).classed("active", function (d, i) {
            return d.value === options.legend.items.status.ACTIVE;
        });
        addedLegendItems.append("text")
            .merge(legendItems.select("text"))
            .text(function (d) { return d.key; })
            .attr("alignment-baseline", "middle");
        this.breakItemsIntoLines(addedLegendItems);
        // Remove old elements as needed.
        legendItems.exit()
            .on("mouseover", null)
            .on("click", null)
            .on("mouseout", null)
            .remove();
        var legendClickable = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "legend", "clickable");
        svg.classed("clickable", legendClickable);
        if (legendClickable && addedLegendItems.size() > 0) {
            this.addEventListeners();
        }
        var legendPosition = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(options, "legend", "position");
        if (legendPosition === _interfaces__WEBPACK_IMPORTED_MODULE_2__["LegendPositions"].BOTTOM || legendPosition === _interfaces__WEBPACK_IMPORTED_MODULE_2__["LegendPositions"].TOP) {
            // TODO - Replace with layout component margins
            _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].appendOrSelect(svg, "rect.spacer")
                .attr("x", 0)
                .attr("y", 10)
                .attr("width", 20)
                .attr("height", 20)
                .attr("fill", "none");
        }
    };
    Legend.prototype.breakItemsIntoLines = function (addedLegendItems) {
        var self = this;
        var svg = this.getContainerSVG();
        var options = this.model.getOptions();
        // Configs
        var checkboxRadius = options.legend.checkbox.radius;
        var legendItemsHorizontalSpacing = options.legend.items.horizontalSpace;
        var legendItemsVerticalSpacing = options.legend.items.verticalSpace;
        var legendTextYOffset = options.legend.items.textYOffset;
        var spaceNeededForCheckbox = (checkboxRadius * 2) + options.legend.checkbox.spaceAfter;
        // Check if there are disabled legend items
        var DISABLED = options.legend.items.status.DISABLED;
        var dataLabels = this.model.get("dataLabels");
        var hasDeactivatedItems = Object.keys(dataLabels).some(function (label) { return dataLabels[label] === DISABLED; });
        var legendOrientation = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(options, "legend", "orientation");
        // Keep track of line numbers and positions
        var startingPoint = 0;
        var lineNumber = 0;
        var itemIndexInLine = 0;
        var lastYPosition;
        addedLegendItems.merge(svg.selectAll("g.legend-item"))
            .each(function (d, i) {
            var legendItem = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this);
            var previousLegendItem = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(svg.selectAll("g.legend-item").nodes()[i - 1]);
            if (itemIndexInLine === 0 || previousLegendItem.empty() || legendOrientation === _interfaces__WEBPACK_IMPORTED_MODULE_2__["LegendOrientations"].VERTICAL) {
                if (legendOrientation === _interfaces__WEBPACK_IMPORTED_MODULE_2__["LegendOrientations"].VERTICAL) {
                    lineNumber++;
                }
            }
            else {
                var svgDimensions = _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].getSVGElementSize(self.parent, { useAttr: true });
                var legendItemTextDimensions = _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].getSVGElementSize(Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this).select("text"), { useBBox: true });
                var lastLegendItemTextDimensions = _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].getSVGElementSize(previousLegendItem.select("text"), { useBBox: true });
                startingPoint = startingPoint + lastLegendItemTextDimensions.width + spaceNeededForCheckbox + legendItemsHorizontalSpacing;
                if (startingPoint + spaceNeededForCheckbox + legendItemTextDimensions.width > svgDimensions.width) {
                    lineNumber++;
                    startingPoint = 0;
                    itemIndexInLine = 0;
                }
            }
            var legendPosition = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(options, "legend", "position");
            var yOffset = 0;
            if (legendPosition === _interfaces__WEBPACK_IMPORTED_MODULE_2__["LegendPositions"].BOTTOM) {
                yOffset = 20;
            }
            // Position checkbox
            // TODO - Replace with layout component margins
            legendItem.select("rect.checkbox")
                .attr("x", startingPoint)
                .attr("y", yOffset + lineNumber * legendItemsVerticalSpacing);
            // Position text
            // TODO - Replace with layout component margins
            var yPosition = legendTextYOffset + (lineNumber * legendItemsVerticalSpacing);
            legendItem.select("text")
                .attr("x", startingPoint + spaceNeededForCheckbox)
                .attr("y", yOffset + yPosition);
            lastYPosition = yPosition;
            // Render checkbox check icon
            if (hasDeactivatedItems && legendItem.select("g.check").empty()) {
                legendItem.append("g")
                    .classed("check", true)
                    .html("\n\t\t\t\t\t\t\t<svg focusable=\"false\" preserveAspectRatio=\"xMidYMid meet\"\n\t\t\t\t\t\t\t\txmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\"\n\t\t\t\t\t\t\t\tviewBox=\"0 0 32 32\" aria-hidden=\"true\"\n\t\t\t\t\t\t\t\tstyle=\"will-change: transform;\">\n\t\t\t\t\t\t\t\t<path d=\"M13 21.2l-7.1-7.1-1.4 1.4 7.1 7.1L13 24 27.1 9.9l-1.4-1.5z\"></path>\n\t\t\t\t\t\t\t\t<title>Checkmark</title>\n\t\t\t\t\t\t\t</svg>\n\t\t\t\t\t\t");
                legendItem.select("g.check svg")
                    .attr("width", checkboxRadius * 2 - 1)
                    .attr("height", checkboxRadius * 2 - 1)
                    .attr("x", parseFloat(legendItem.select("rect.checkbox").attr("x")) + 0.5)
                    .attr("y", parseFloat(legendItem.select("rect.checkbox").attr("y")) + 0.5);
            }
            else if (!hasDeactivatedItems && !legendItem.select("g.check").empty()) {
                legendItem.select("g.check").remove();
            }
            itemIndexInLine++;
        });
        // TODO - Replace with layout component margins
        _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].appendOrSelect(svg, "rect.spacer")
            .attr("x", 0)
            .attr("y", lastYPosition)
            .attr("width", 16)
            .attr("height", 16)
            .attr("fill", "none");
    };
    Legend.prototype.getLegendItemArray = function () {
        var legendItems = this.model.get("dataLabels");
        var legendItemKeys = Object.keys(legendItems);
        return legendItemKeys.map(function (key) { return ({
            key: key,
            value: legendItems[key]
        }); });
    };
    Legend.prototype.addEventListeners = function () {
        var self = this;
        var svg = this.getContainerSVG();
        var options = this.model.getOptions();
        svg.selectAll("g.legend-item")
            .on("mouseover", function () {
            self.services.events.dispatchEvent("legend-item-onhover", {
                hoveredElement: Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this)
            });
            // Configs
            var checkboxRadius = options.legend.checkbox.radius;
            var hoveredItem = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this);
            hoveredItem.append("rect")
                .classed("hover-stroke", true)
                .attr("x", parseFloat(hoveredItem.select("rect.checkbox").attr("x")) - 2)
                .attr("y", parseFloat(hoveredItem.select("rect.checkbox").attr("y")) - 2)
                .attr("width", checkboxRadius * 2 + 4)
                .attr("height", checkboxRadius * 2 + 4)
                .attr("rx", 3)
                .attr("ry", 3)
                .lower();
        })
            .on("click", function () {
            self.services.events.dispatchEvent("legend-item-onclick", {
                clickedElement: Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this)
            });
            var clickedItem = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this);
            var clickedItemData = clickedItem.datum();
            self.model.toggleDataLabel(clickedItemData.key);
        })
            .on("mouseout", function () {
            var hoveredItem = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this);
            hoveredItem.select("rect.hover-stroke").remove();
            self.services.events.dispatchEvent("legend-item-onmouseout", {
                hoveredElement: hoveredItem
            });
        });
    };
    return Legend;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/essentials/title.ts":
/*!********************************************!*\
  !*** ./src/components/essentials/title.ts ***!
  \********************************************/
/*! exports provided: Title */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return Title; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports


var Title = /** @class */ (function (_super) {
    __extends(Title, _super);
    function Title() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "title";
        return _this;
    }
    Title.prototype.render = function () {
        var svg = this.getContainerSVG();
        var text = _services__WEBPACK_IMPORTED_MODULE_1__["DOMUtils"].appendOrSelect(svg, "text.title");
        text.attr("x", 0)
            .attr("y", 20)
            .text(this.model.getOptions().title);
        // TODO - Replace with layout component margins
        _services__WEBPACK_IMPORTED_MODULE_1__["DOMUtils"].appendOrSelect(svg, "rect.spacer")
            .attr("x", 0)
            .attr("y", 20)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", "none");
    };
    return Title;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/essentials/tooltip-bar.ts":
/*!**************************************************!*\
  !*** ./src/components/essentials/tooltip-bar.ts ***!
  \**************************************************/
/*! exports provided: TooltipBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipBar", function() { return TooltipBar; });
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tooltip */ "./src/components/essentials/tooltip.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
/* harmony import */ var _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../interfaces/enums */ "./src/interfaces/enums.ts");
/* harmony import */ var _carbon_utils_position__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @carbon/utils-position */ "../../node_modules/@carbon/utils-position/index.js");
/* harmony import */ var carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! carbon-components/src/globals/js/settings */ "../../node_modules/carbon-components/src/globals/js/settings.js");
/* harmony import */ var carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




// Carbon position service

// import the settings for the css prefix

// D3 Imports

var TooltipBar = /** @class */ (function (_super) {
    __extends(TooltipBar, _super);
    function TooltipBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TooltipBar.prototype.init = function () {
        var _this = this;
        // Grab the tooltip element
        var holder = Object(d3_selection__WEBPACK_IMPORTED_MODULE_6__["select"])(this.services.domUtils.getHolder());
        var chartprefix = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "style", "prefix");
        this.tooltip = _services__WEBPACK_IMPORTED_MODULE_2__["DOMUtils"].appendOrSelect(holder, "div." + carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_5___default.a.prefix + "--" + chartprefix + "--tooltip");
        // Apply html content to the tooltip
        var tooltipTextContainer = _services__WEBPACK_IMPORTED_MODULE_2__["DOMUtils"].appendOrSelect(this.tooltip, "div.content-box");
        // listen to show-tooltip Custom Events to render the tooltip
        this.services.events.addEventListener("show-tooltip", function (e) {
            // check the type of tooltip and that it is enabled
            if ((e.detail.type === _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__["TooltipTypes"].DATAPOINT && _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(_this.model.getOptions(), "tooltip", "datapoint", "enabled"))
                || (e.detail.type === _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__["TooltipTypes"].GRIDLINE && _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(_this.model.getOptions(), "tooltip", "gridline", "enabled"))) {
                var hoveredElement = e.detail.hoveredElement.node();
                var defaultHTML = void 0;
                if (e.detail.multidata) {
                    // multi tooltip
                    defaultHTML = _this.getMultilineTooltipHTML(e.detail.multidata);
                }
                else {
                    defaultHTML = _this.getTooltipHTML(e.detail.hoveredElement.datum());
                }
                // if there is a provided tooltip HTML function call it and pass the defaultHTML
                if (_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(_this.model.getOptions(), "tooltip", "customHTML")) {
                    tooltipTextContainer.html(_this.model.getOptions().tooltip.customHTML(hoveredElement, defaultHTML));
                }
                else {
                    // default tooltip
                    tooltipTextContainer.html(defaultHTML);
                }
                var position = _this.getTooltipPosition(hoveredElement);
                // Position the tooltip relative to the bars
                _this.positionTooltip(e.detail.multidata ? undefined : position);
                // Fade in
                _this.tooltip.classed("hidden", false);
            }
        });
        // listen to hide-tooltip Custom Events to hide the tooltip
        this.services.events.addEventListener("hide-tooltip", function () {
            _this.tooltip.classed("hidden", true);
        });
    };
    /**
     * Get the position of the tooltip relative to the active hovered bar. Tooltip should appear above
     * positive valued data and below negative value data.
     * @param hoveredElement
     */
    TooltipBar.prototype.getTooltipPosition = function (hoveredElement) {
        var data = Object(d3_selection__WEBPACK_IMPORTED_MODULE_6__["select"])(hoveredElement).datum();
        var holderPosition = Object(d3_selection__WEBPACK_IMPORTED_MODULE_6__["select"])(this.services.domUtils.getHolder()).node().getBoundingClientRect();
        var barPosition = hoveredElement.getBoundingClientRect();
        var verticalOffset = this.model.getOptions().tooltip.datapoint.verticalOffset;
        // if there is a negative value bar chart, need to place the tooltip below the bar
        if (data.value <= 0) {
            // negative bars
            var tooltipPos = {
                left: (barPosition.left - holderPosition.left) + barPosition.width / 2,
                top: (barPosition.bottom - holderPosition.top) + verticalOffset
            };
            return { placement: _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__["TooltipPosition"].BOTTOM, position: tooltipPos };
        }
        else {
            // positive bars
            var tooltipPos = {
                left: (barPosition.left - holderPosition.left) + barPosition.width / 2,
                top: (barPosition.top - holderPosition.top) - verticalOffset
            };
            return { placement: _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__["TooltipPosition"].TOP, position: tooltipPos };
        }
    };
    /**
     * Returns the html for the bar single point tooltip
     * @param data associated values for the hovered bar
     */
    TooltipBar.prototype.getTooltipHTML = function (data) {
        var formattedValue = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
            this.model.getOptions().tooltip.valueFormatter(data.value) : data.value.toLocaleString("en");
        return "<div class=\"datapoint-tooltip\"><p class=\"value\">" + formattedValue + "</p></div>";
    };
    /**
     * Multip tooltips for bar charts include totals for each stack
     * @param data
     */
    TooltipBar.prototype.getMultilineTooltipHTML = function (data) {
        var _this = this;
        var points = data;
        points.reverse();
        // get the total for the stacked tooltip
        var total = points.reduce(function (sum, item) { return sum + item.value; }, 0);
        // format the total value
        total = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
            this.model.getOptions().tooltip.valueFormatter(total) : total.toLocaleString("en");
        return "<ul class='multi-tooltip'>" +
            points.map(function (datapoint) {
                var formattedValue = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(_this.model.getOptions(), "tooltip", "valueFormatter") ?
                    _this.model.getOptions().tooltip.valueFormatter(datapoint.value) : datapoint.value.toLocaleString("en");
                var indicatorColor = _this.model.getStrokeColor(datapoint.datasetLabel, datapoint.label, datapoint.value);
                return "\n\t\t\t\t<li>\n\t\t\t\t\t<div class=\"datapoint-tooltip\">\n\t\t\t\t\t\t<a style=\"background-color:" + indicatorColor + "\" class=\"tooltip-color\"></a>\n\t\t\t\t\t\t<p class=\"label\">" + datapoint.datasetLabel + "</p>\n\t\t\t\t\t\t<p class=\"value\">" + formattedValue + "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</li>";
            }).join("") +
            ("<li>\n\t\t\t\t\t<div class='total-val'>\n\t\t\t\t\t\t<p class='label'>Total</p>\n\t\t\t\t\t\t<p class='value'>" + total + "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</li>\n\t\t\t</ul>");
    };
    TooltipBar.prototype.positionTooltip = function (positionOverride) {
        var holder = this.services.domUtils.getHolder();
        var target = this.tooltip.node();
        var mouseRelativePos = Object(d3_selection__WEBPACK_IMPORTED_MODULE_6__["mouse"])(holder);
        var pos;
        // override position to place tooltip at {placement:.., position:{top:.. , left:..}}
        if (positionOverride) {
            // placement determines whether the tooltip is centered above or below the position provided
            var placement = positionOverride.placement === _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__["TooltipPosition"].TOP ? _carbon_utils_position__WEBPACK_IMPORTED_MODULE_4__["PLACEMENTS"].TOP : _carbon_utils_position__WEBPACK_IMPORTED_MODULE_4__["PLACEMENTS"].BOTTOM;
            pos = this.positionService.findPositionAt(positionOverride.position, target, placement);
        }
        else {
            // Find out whether tooltip should be shown on the left or right side
            var bestPlacementOption = this.positionService.findBestPlacementAt({
                left: mouseRelativePos[0],
                top: mouseRelativePos[1]
            }, target, [
                _carbon_utils_position__WEBPACK_IMPORTED_MODULE_4__["PLACEMENTS"].RIGHT,
                _carbon_utils_position__WEBPACK_IMPORTED_MODULE_4__["PLACEMENTS"].LEFT,
                _carbon_utils_position__WEBPACK_IMPORTED_MODULE_4__["PLACEMENTS"].TOP,
                _carbon_utils_position__WEBPACK_IMPORTED_MODULE_4__["PLACEMENTS"].BOTTOM
            ], function () { return ({
                width: holder.offsetWidth,
                height: holder.offsetHeight
            }); });
            var horizontalOffset = this.model.getOptions().tooltip.datapoint.horizontalOffset;
            if (bestPlacementOption === _carbon_utils_position__WEBPACK_IMPORTED_MODULE_4__["PLACEMENTS"].LEFT) {
                horizontalOffset *= -1;
            }
            // Get coordinates to where tooltip should be positioned
            pos = this.positionService.findPositionAt({
                left: mouseRelativePos[0] + horizontalOffset,
                top: mouseRelativePos[1]
            }, target, bestPlacementOption);
        }
        this.positionService.setElement(target, pos);
    };
    return TooltipBar;
}(_tooltip__WEBPACK_IMPORTED_MODULE_0__["Tooltip"]));



/***/ }),

/***/ "./src/components/essentials/tooltip-scatter.ts":
/*!******************************************************!*\
  !*** ./src/components/essentials/tooltip-scatter.ts ***!
  \******************************************************/
/*! exports provided: TooltipScatter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipScatter", function() { return TooltipScatter; });
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tooltip */ "./src/components/essentials/tooltip.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var TooltipScatter = /** @class */ (function (_super) {
    __extends(TooltipScatter, _super);
    function TooltipScatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TooltipScatter.prototype.getTooltipHTML = function (data) {
        var formattedValue = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
            this.model.getOptions().tooltip.valueFormatter(data.value) : data.value.toLocaleString("en");
        var indicatorColor = this.model.getStrokeColor(data.datasetLabel, data.label, data.value);
        return "\n\t\t\t<div class=\"datapoint-tooltip\">\n\t\t\t\t<a style=\"background-color:" + indicatorColor + "\" class=\"tooltip-color\"></a>\n\t\t\t\t<p class=\"label\">" + data.datasetLabel + "</p>\n\t\t\t\t<p class=\"value\">" + formattedValue + "</p>\n\t\t\t</div>";
    };
    return TooltipScatter;
}(_tooltip__WEBPACK_IMPORTED_MODULE_0__["Tooltip"]));



/***/ }),

/***/ "./src/components/essentials/tooltip.ts":
/*!**********************************************!*\
  !*** ./src/components/essentials/tooltip.ts ***!
  \**********************************************/
/*! exports provided: Tooltip */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return Tooltip; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
/* harmony import */ var _carbon_utils_position__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @carbon/utils-position */ "../../node_modules/@carbon/utils-position/index.js");
/* harmony import */ var carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! carbon-components/src/globals/js/settings */ "../../node_modules/carbon-components/src/globals/js/settings.js");
/* harmony import */ var carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../interfaces */ "./src/interfaces/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



// Carbon position service

// import the settings for the css prefix

// D3 Imports


var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip(model, services, configs) {
        var _this = _super.call(this, model, services, configs) || this;
        _this.type = "tooltip";
        _this.positionService = new _carbon_utils_position__WEBPACK_IMPORTED_MODULE_3__["default"]();
        _this.init();
        return _this;
    }
    Tooltip.prototype.init = function () {
        var _this = this;
        // Grab the tooltip element
        var holder = Object(d3_selection__WEBPACK_IMPORTED_MODULE_5__["select"])(this.services.domUtils.getHolder());
        var chartprefix = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "style", "prefix");
        this.tooltip = _services__WEBPACK_IMPORTED_MODULE_2__["DOMUtils"].appendOrSelect(holder, "div." + carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_4___default.a.prefix + "--" + chartprefix + "--tooltip");
        // Apply html content to the tooltip
        var tooltipTextContainer = _services__WEBPACK_IMPORTED_MODULE_2__["DOMUtils"].appendOrSelect(this.tooltip, "div.content-box");
        // listen to show-tooltip Custom Events to render the tooltip
        this.services.events.addEventListener("show-tooltip", function (e) {
            // check the type of tooltip and that it is enabled
            if ((e.detail.type === _interfaces__WEBPACK_IMPORTED_MODULE_6__["TooltipTypes"].DATAPOINT && _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(_this.model.getOptions(), "tooltip", "datapoint", "enabled"))
                || (e.detail.type === _interfaces__WEBPACK_IMPORTED_MODULE_6__["TooltipTypes"].GRIDLINE && _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(_this.model.getOptions(), "tooltip", "gridline", "enabled"))) {
                var data = Object(d3_selection__WEBPACK_IMPORTED_MODULE_5__["select"])(d3_selection__WEBPACK_IMPORTED_MODULE_5__["event"].target).datum();
                // Generate default tooltip
                var defaultHTML = void 0;
                if (e.detail.multidata) {
                    // multi tooltip
                    data = e.detail.multidata;
                    defaultHTML = _this.getMultilineTooltipHTML(data);
                }
                else {
                    defaultHTML = _this.getTooltipHTML(data);
                }
                // if there is a provided tooltip HTML function call it
                if (_tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(_this.model.getOptions(), "tooltip", "customHTML")) {
                    tooltipTextContainer.html(_this.model.getOptions().tooltip.customHTML(data, defaultHTML));
                }
                else {
                    // Use default tooltip
                    tooltipTextContainer.html(defaultHTML);
                }
                // Position the tooltip
                _this.positionTooltip();
                // Fade in
                _this.tooltip.classed("hidden", false);
            }
        });
        // listen to hide-tooltip Custom Events to hide the tooltip
        this.services.events.addEventListener("hide-tooltip", function () {
            _this.tooltip.classed("hidden", true);
        });
    };
    Tooltip.prototype.getTooltipHTML = function (data) {
        // this cleans up the data item, pie slices have the data within the data.data but other datapoints are self contained within data
        var dataVal = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(data, "data") ? data.data : data;
        // format the value if needed
        var formattedValue = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(this.model.getOptions(), "tooltip", "valueFormatter") ?
            this.model.getOptions().tooltip.valueFormatter(dataVal.value) : dataVal.value.toLocaleString("en");
        // pie charts don't have a dataset label since they only support one dataset
        var label = dataVal.datasetLabel ? dataVal.datasetLabel : dataVal.label;
        return "<div class=\"datapoint-tooltip\">\n\t\t\t\t\t<p class=\"label\">" + label + "</p>\n\t\t\t\t\t<p class=\"value\">" + formattedValue + "</p>\n\t\t\t\t</div>";
    };
    Tooltip.prototype.getMultilineTooltipHTML = function (data) {
        var _this = this;
        var points = data;
        // sort them so they are in the same order as the graph
        points.sort(function (a, b) { return b.value - a.value; });
        // tells us which value to use
        var scaleType = this.services.axes.getMainXAxis().scaleType;
        return "<ul class='multi-tooltip'>" +
            points.map(function (datapoint) {
                // check if the datapoint has multiple values associates (multiple axes)
                var datapointValue = datapoint.value;
                if (datapointValue instanceof Object) {
                    // scale type determines which value we care about since it should align with the scale data
                    datapointValue = scaleType === _interfaces__WEBPACK_IMPORTED_MODULE_6__["ScaleTypes"].TIME ? datapoint.value.date : datapoint.value.value;
                }
                var formattedValue = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].getProperty(_this.model.getOptions(), "tooltip", "valueFormatter") ?
                    _this.model.getOptions().tooltip.valueFormatter(datapointValue) : datapointValue.toLocaleString("en");
                var indicatorColor = _this.model.getStrokeColor(datapoint.datasetLabel, datapoint.label);
                return "\n\t\t\t\t<li>\n\t\t\t\t\t<div class=\"datapoint-tooltip\">\n\t\t\t\t\t\t<a style=\"background-color:" + indicatorColor + "\" class=\"tooltip-color\"></a>\n\t\t\t\t\t\t<p class=\"label\">" + datapoint.datasetLabel + "</p>\n\t\t\t\t\t\t<p class=\"value\">" + formattedValue + "</p>\n\t\t\t\t\t</div>\n\t\t\t\t</li>";
            }).join("") + "</ul>";
    };
    Tooltip.prototype.render = function () {
        this.tooltip.classed("hidden", true);
    };
    Tooltip.prototype.positionTooltip = function () {
        var holder = this.services.domUtils.getHolder();
        var target = this.tooltip.node();
        var mouseRelativePos = Object(d3_selection__WEBPACK_IMPORTED_MODULE_5__["mouse"])(holder);
        // Find out whether tooltip should be shown on the left or right side
        var bestPlacementOption = this.positionService.findBestPlacementAt({
            left: mouseRelativePos[0],
            top: mouseRelativePos[1]
        }, target, [
            _carbon_utils_position__WEBPACK_IMPORTED_MODULE_3__["PLACEMENTS"].RIGHT,
            _carbon_utils_position__WEBPACK_IMPORTED_MODULE_3__["PLACEMENTS"].LEFT,
            _carbon_utils_position__WEBPACK_IMPORTED_MODULE_3__["PLACEMENTS"].TOP,
            _carbon_utils_position__WEBPACK_IMPORTED_MODULE_3__["PLACEMENTS"].BOTTOM
        ], function () { return ({
            width: holder.offsetWidth,
            height: holder.offsetHeight
        }); });
        var horizontalOffset = this.model.getOptions().tooltip.datapoint.horizontalOffset;
        if (bestPlacementOption === _carbon_utils_position__WEBPACK_IMPORTED_MODULE_3__["PLACEMENTS"].LEFT) {
            horizontalOffset *= -1;
        }
        // Get coordinates to where tooltip should be positioned
        var pos = this.positionService.findPositionAt({
            left: mouseRelativePos[0] + horizontalOffset,
            top: mouseRelativePos[1]
        }, target, bestPlacementOption);
        this.positionService.setElement(target, pos);
    };
    return Tooltip;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/graphs/bar-grouped.ts":
/*!**********************************************!*\
  !*** ./src/components/graphs/bar-grouped.ts ***!
  \**********************************************/
/*! exports provided: GroupedBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupedBar", function() { return GroupedBar; });
/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar */ "./src/components/graphs/bar.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-color */ "../../node_modules/d3-color/src/index.js");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/src/index.js");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../interfaces */ "./src/interfaces/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports

// D3 Imports




var GroupedBar = /** @class */ (function (_super) {
    __extends(GroupedBar, _super);
    function GroupedBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "grouped-bar";
        // Highlight elements that match the hovered legend item
        _this.handleLegendOnHover = function (event) {
            var hoveredElement = event.detail.hoveredElement;
            _this.parent.selectAll("rect.bar")
                .transition(_this.services.transitions.getTransition("legend-hover-bar"))
                .attr("opacity", function (d) { return (d.datasetLabel !== hoveredElement.datum()["key"]) ? 0.3 : 1; });
        };
        // Un-highlight all elements
        _this.handleLegendMouseOut = function (event) {
            _this.parent.selectAll("rect.bar")
                .transition(_this.services.transitions.getTransition("legend-mouseout-bar"))
                .attr("opacity", 1);
        };
        return _this;
    }
    GroupedBar.prototype.init = function () {
        var eventsFragment = this.services.events;
        // Highlight correct circle on legend item hovers
        eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);
        // Un-highlight circles on legend item mouseouts
        eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
    };
    GroupedBar.prototype.getGroupWidth = function () {
        var datasets = this.model.getDisplayData().datasets;
        var padding = 5;
        return datasets.length * this.getBarWidth() + (padding * (datasets.length - 1));
    };
    GroupedBar.prototype.setGroupScale = function () {
        var datasets = this.model.getDisplayData().datasets;
        this.groupScale = Object(d3_scale__WEBPACK_IMPORTED_MODULE_3__["scaleBand"])()
            .domain(datasets.map(function (dataset) { return dataset.label; }))
            .rangeRound([0, this.getGroupWidth()]);
    };
    // Gets the correct width for bars based on options & configurations
    GroupedBar.prototype.getBarWidth = function () {
        var datasets = this.model.getDisplayData().datasets;
        return Math.min(this.services.axes.getMainXAxis().scale.step() / 2 / datasets.length, _super.prototype.getBarWidth.call(this));
    };
    GroupedBar.prototype.render = function (animate) {
        var _this = this;
        // Chart options mixed with the internal configurations
        var displayData = this.model.getDisplayData();
        this.setGroupScale();
        // Grab container SVG
        var svg = this.getContainerSVG();
        // Update data on bar groups
        var barGroups = svg.selectAll("g.bars")
            .data(displayData.labels);
        // Remove dot groups that need to be removed
        barGroups.exit()
            .attr("opacity", 0)
            .remove();
        // Add the bar groups that need to be introduced
        var barGroupsEnter = barGroups.enter()
            .append("g")
            .classed("bars", true);
        // Update data on all bars
        var bars = barGroupsEnter.merge(barGroups)
            .attr("transform", function (d, i) {
            var xValue = _this.services.axes.getXValue(d, i);
            return "translate(" + (xValue - _this.getGroupWidth() / 2) + ", 0)";
        })
            .selectAll("rect.bar")
            .data(function (d, i) { return _this.addLabelsToDataPoints(d, i); });
        // Remove bars that are no longer needed
        bars.exit()
            .attr("opacity", 0)
            .remove();
        // Add the circles that need to be introduced
        var barsEnter = bars.enter()
            .append("rect")
            .attr("opacity", 0);
        barsEnter.merge(bars)
            .classed("bar", true)
            .attr("x", function (d) { return _this.groupScale(d.datasetLabel); })
            .attr("width", this.getBarWidth.bind(this))
            .transition(this.services.transitions.getTransition("bar-update-enter", animate))
            .attr("y", function (d, i) { return _this.services.axes.getYValue(Math.max(0, d.value)); })
            .attr("height", function (d, i) {
            return Math.abs(_this.services.axes.getYValue(d, i) - _this.services.axes.getYValue(0));
        })
            .attr("fill", function (d) { return _this.model.getFillScale()[d.datasetLabel](d.label); })
            .attr("opacity", 1);
        // Add event listeners to elements drawn
        this.addEventListeners();
    };
    // TODO - This method could be re-used in more graphs
    GroupedBar.prototype.addLabelsToDataPoints = function (d, index) {
        var datasets = this.model.getDisplayData().datasets;
        return datasets.map(function (dataset) { return ({
            label: d,
            datasetLabel: dataset.label,
            value: dataset.data[index]
        }); });
    };
    GroupedBar.prototype.addEventListeners = function () {
        var self = this;
        this.parent.selectAll("rect.bar")
            .on("mouseover", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this);
            hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseover_fill_update"))
                .attr("fill", Object(d3_color__WEBPACK_IMPORTED_MODULE_2__["color"])(hoveredElement.attr("fill")).darker(0.7).toString());
            // Show tooltip
            self.services.events.dispatchEvent("show-tooltip", {
                hoveredElement: hoveredElement,
                type: _interfaces__WEBPACK_IMPORTED_MODULE_4__["TooltipTypes"].DATAPOINT
            });
        })
            .on("mouseout", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this);
            hoveredElement.classed("hovered", false);
            hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseout_fill_update"))
                .attr("fill", function (d) { return self.model.getFillScale()[d.datasetLabel](d.label); });
            // Hide tooltip
            self.services.events.dispatchEvent("hide-tooltip", { hoveredElement: hoveredElement });
        });
    };
    GroupedBar.prototype.destroy = function () {
        // Remove event listeners
        this.parent.selectAll("rect.bar")
            .on("mouseover", null)
            .on("mousemove", null)
            .on("mouseout", null);
        // Remove legend listeners
        var eventsFragment = this.services.events;
        eventsFragment.removeEventListener("legend-item-onhover", this.handleLegendOnHover);
        eventsFragment.removeEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
    };
    return GroupedBar;
}(_bar__WEBPACK_IMPORTED_MODULE_0__["Bar"]));



/***/ }),

/***/ "./src/components/graphs/bar-simple.ts":
/*!*********************************************!*\
  !*** ./src/components/graphs/bar-simple.ts ***!
  \*********************************************/
/*! exports provided: SimpleBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleBar", function() { return SimpleBar; });
/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bar */ "./src/components/graphs/bar.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-color */ "../../node_modules/d3-color/src/index.js");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../interfaces */ "./src/interfaces/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports

// D3 Imports



var SimpleBar = /** @class */ (function (_super) {
    __extends(SimpleBar, _super);
    function SimpleBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "simple-bar";
        _this.handleLegendOnHover = function (event) {
            var hoveredElement = event.detail.hoveredElement;
            _this.parent.selectAll("rect.bar")
                .transition(_this.services.transitions.getTransition("legend-hover-simple-bar"))
                .attr("opacity", function (d) { return (d.label !== hoveredElement.datum()["key"]) ? 0.3 : 1; });
        };
        _this.handleLegendMouseOut = function (event) {
            _this.parent.selectAll("rect.bar")
                .transition(_this.services.transitions.getTransition("legend-mouseout-simple-bar"))
                .attr("opacity", 1);
        };
        return _this;
    }
    SimpleBar.prototype.init = function () {
        var eventsFragment = this.services.events;
        // Highlight correct circle on legend item hovers
        eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);
        // Un-highlight circles on legend item mouseouts
        eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
    };
    SimpleBar.prototype.render = function (animate) {
        var _this = this;
        // Grab container SVG
        var svg = this.getContainerSVG();
        // Update data on bar groups
        var barGroups = svg.selectAll("g.bars")
            .data(this.model.getDisplayData().datasets, function (dataset) { return dataset.label; });
        // Remove dot groups that need to be removed
        barGroups.exit()
            .attr("opacity", 0)
            .remove();
        // Add the bar groups that need to be introduced
        var barGroupsEnter = barGroups.enter()
            .append("g")
            .classed("bars", true);
        // Update data on all bars
        var bars = barGroupsEnter.merge(barGroups)
            .selectAll("rect.bar")
            .data(function (d, i) { return _this.addLabelsToDataPoints(d, i); }, function (d) { return d.label; });
        // Remove bars that are no longer needed
        bars.exit()
            .attr("opacity", 0)
            .remove();
        // Add the circles that need to be introduced
        var barsEnter = bars.enter()
            .append("rect")
            .attr("opacity", 0);
        barsEnter.merge(bars)
            .classed("bar", true)
            .attr("x", function (d, i) {
            var barWidth = _this.getBarWidth();
            return _this.services.axes.getXValue(d, i) - barWidth / 2;
        })
            .attr("width", this.getBarWidth.bind(this))
            .transition(this.services.transitions.getTransition("bar-update-enter", animate))
            .attr("y", function (d, i) { return _this.services.axes.getYValue(Math.max(0, d.value)); })
            .attr("fill", function (d) { return _this.model.getFillScale()(d.label); })
            .attr("height", function (d, i) {
            return Math.abs(_this.services.axes.getYValue(d, i) - _this.services.axes.getYValue(0));
        })
            .attr("opacity", 1);
        // Add event listeners to elements drawn
        this.addEventListeners();
    };
    // TODO - This method could be re-used in more graphs
    SimpleBar.prototype.addLabelsToDataPoints = function (d, index) {
        var labels = this.model.getDisplayData().labels;
        return d.data.map(function (datum, i) { return ({
            date: datum.date,
            label: labels[i],
            datasetLabel: d.label,
            value: isNaN(datum) ? datum.value : datum
        }); });
    };
    SimpleBar.prototype.addEventListeners = function () {
        var self = this;
        this.parent.selectAll("rect.bar")
            .on("mouseover", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this);
            hoveredElement.classed("hovered", true);
            hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseover_fill_update"))
                .attr("fill", Object(d3_color__WEBPACK_IMPORTED_MODULE_2__["color"])(hoveredElement.attr("fill")).darker(0.7).toString());
            self.services.events.dispatchEvent("show-tooltip", {
                hoveredElement: hoveredElement,
                type: _interfaces__WEBPACK_IMPORTED_MODULE_3__["TooltipTypes"].DATAPOINT
            });
        })
            .on("mouseout", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this);
            hoveredElement.classed("hovered", false);
            hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseout_fill_update"))
                .attr("fill", function (d) { return self.model.getFillScale()(d.label); });
            // Hide tooltip
            self.services.events.dispatchEvent("hide-tooltip", { hoveredElement: hoveredElement });
        });
    };
    SimpleBar.prototype.destroy = function () {
        // Remove event listeners
        this.parent.selectAll("rect.bar")
            .on("mouseover", null)
            .on("mousemove", null)
            .on("mouseout", null);
        // Remove legend listeners
        var eventsFragment = this.services.events;
        eventsFragment.removeEventListener("legend-item-onhover", this.handleLegendOnHover);
        eventsFragment.removeEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
    };
    return SimpleBar;
}(_bar__WEBPACK_IMPORTED_MODULE_0__["Bar"]));



/***/ }),

/***/ "./src/components/graphs/bar-stacked.ts":
/*!**********************************************!*\
  !*** ./src/components/graphs/bar-stacked.ts ***!
  \**********************************************/
/*! exports provided: StackedBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StackedBar", function() { return StackedBar; });
/* harmony import */ var _interfaces_enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../interfaces/enums */ "./src/interfaces/enums.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var _bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bar */ "./src/components/graphs/bar.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-shape */ "../../node_modules/d3-shape/src/index.js");
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-color */ "../../node_modules/d3-color/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports



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
var StackedBar = /** @class */ (function (_super) {
    __extends(StackedBar, _super);
    function StackedBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "stacked-bar";
        // Highlight elements that match the hovered legend item
        _this.handleLegendOnHover = function (event) {
            var hoveredElement = event.detail.hoveredElement;
            _this.parent.selectAll("rect.bar")
                .transition(_this.services.transitions.getTransition("legend-hover-bar"))
                .attr("opacity", function (d) { return (d.datasetLabel !== hoveredElement.datum()["key"]) ? 0.3 : 1; });
        };
        // Un-highlight all elements
        _this.handleLegendMouseOut = function (event) {
            _this.parent.selectAll("rect.bar")
                .transition(_this.services.transitions.getTransition("legend-mouseout-bar"))
                .attr("opacity", 1);
        };
        return _this;
    }
    StackedBar.prototype.init = function () {
        var eventsFragment = this.services.events;
        // Highlight correct circle on legend item hovers
        eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);
        // Un-highlight circles on legend item mouseouts
        eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
    };
    StackedBar.prototype.getStackData = function () {
        var stackDataArray;
        var displayData = this.model.getDisplayData();
        var timeSeries = this.services.axes.getMainXAxis().scaleType === _interfaces_enums__WEBPACK_IMPORTED_MODULE_0__["ScaleTypes"].TIME;
        if (timeSeries) {
            // Get all date values provided in data
            // TODO - Could be re-used through the model
            var allDates_1 = [];
            displayData.datasets.forEach(function (dataset) {
                allDates_1 = allDates_1.concat(dataset.data.map(function (datum) { return Number(datum.date); }));
            });
            allDates_1 = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].removeArrayDuplicates(allDates_1).sort();
            // Go through all date values
            // And get corresponding data from each dataset
            stackDataArray = allDates_1.map(function (date, i) {
                var correspondingData = {};
                displayData.datasets.forEach(function (dataset) {
                    var correspondingDatum = dataset.data.find(function (datum) { return Number(datum.date) === Number(date); });
                    if (correspondingDatum) {
                        correspondingData[dataset.label] = correspondingDatum.value;
                    }
                    else {
                        correspondingData[dataset.label] = 0;
                    }
                });
                correspondingData["label"] = date;
                return correspondingData;
            });
        }
        else {
            // Create the stack datalist
            stackDataArray = displayData.labels.map(function (label, i) {
                var correspondingData = {};
                displayData.datasets.forEach(function (dataset) {
                    correspondingData[dataset.label] = !isNaN(dataset.data[i]) ? dataset.data[i] : dataset.data[i].value;
                });
                correspondingData["label"] = label;
                return correspondingData;
            });
        }
        return stackDataArray;
    };
    StackedBar.prototype.render = function (animate) {
        var _this = this;
        // Chart options mixed with the internal configurations
        var options = this.model.getOptions();
        // Grab container SVG
        var svg = this.getContainerSVG();
        // Create the data and keys that'll be used by the stack layout
        var displayData = this.model.getDisplayData();
        var stackDataArray = this.getStackData();
        var stackKeys = displayData.datasets.map(function (dataset) { return dataset.label; });
        // Update data on all bar groups
        var barGroups = svg.selectAll("g.bars")
            .data(Object(d3_shape__WEBPACK_IMPORTED_MODULE_4__["stack"])().keys(stackKeys)(stackDataArray), function (d) { return d.key; });
        // Remove elements that need to be exited
        // We need exit at the top here to make sure that
        // Data filters are processed before entering new elements
        // Or updating existing ones
        barGroups.exit()
            .attr("opacity", 0)
            .remove();
        // Add bar groups that need to be introduced
        barGroups.enter()
            .append("g")
            .classed("bars", true);
        // Update data on all bars
        var bars = svg.selectAll("g.bars").selectAll("rect.bar")
            .data(function (d) { return addLabelsAndValueToData(d); }, function (d) { return d.label; });
        // Remove bars that need to be removed
        bars.exit()
            .remove();
        // Update styling and position on existing bars
        // As well as bars that were just added
        bars.enter()
            .append("rect")
            .merge(bars)
            .classed("bar", true)
            .attr("x", function (d, i) {
            var barWidth = _this.getBarWidth();
            return _this.services.axes.getXValue(d, i) - (barWidth / 2);
        })
            .attr("width", this.getBarWidth.bind(this))
            .transition(this.services.transitions.getTransition("bar-update-enter", animate))
            .attr("y", function (d, i) { return _this.services.axes.getYValue(d[1], i); })
            .attr("fill", function (d) { return _this.model.getFillScale()[d.datasetLabel](d.label); })
            .attr("height", function (d, i) {
            var datasetLabel = d.datasetLabel;
            var datasetLabelIndex = stackKeys.indexOf(datasetLabel);
            var height = _this.services.axes.getYValue(d[0]) - _this.services.axes.getYValue(d[1]);
            if (datasetLabelIndex > 0 && height >= options.bars.dividerSize) {
                return height - options.bars.dividerSize;
            }
            return height;
        })
            .attr("opacity", 1);
        // Add event listeners for the above elements
        this.addEventListeners();
    };
    StackedBar.prototype.addEventListeners = function () {
        var self = this;
        this.parent.selectAll("rect.bar")
            .on("mouseover", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this);
            hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseover_fill_update"))
                .attr("fill", Object(d3_color__WEBPACK_IMPORTED_MODULE_5__["color"])(hoveredElement.attr("fill")).darker(0.7).toString());
        })
            .on("mousemove", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this);
            var itemData = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this).datum();
            hoveredElement.classed("hovered", true);
            var stackedData = itemData["data"];
            var sharedLabel = stackedData["label"];
            // Remove the label field
            delete stackedData["label"];
            // filter out the label from the datasets' and associated values
            var activePoints = Object.keys(stackedData)
                .map(function (key) { return ({
                datasetLabel: key,
                value: stackedData[key],
                label: sharedLabel
            }); });
            // Show tooltip
            self.services.events.dispatchEvent("show-tooltip", {
                multidata: activePoints,
                hoveredElement: hoveredElement,
                type: _interfaces_enums__WEBPACK_IMPORTED_MODULE_0__["TooltipTypes"].DATAPOINT
            });
        })
            .on("mouseout", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this);
            hoveredElement.classed("hovered", false);
            hoveredElement.transition(self.services.transitions.getTransition("graph_element_mouseout_fill_update"))
                .attr("fill", function (d) { return self.model.getFillScale()[d.datasetLabel](d.label); });
            // Hide tooltip
            self.services.events.dispatchEvent("hide-tooltip", { hoveredElement: hoveredElement });
        });
    };
    StackedBar.prototype.destroy = function () {
        // Remove event listeners
        this.parent.selectAll("rect.bar")
            .on("mouseover", null)
            .on("mousemove", null)
            .on("mouseout", null);
        // Remove legend listeners
        var eventsFragment = this.services.events;
        eventsFragment.removeEventListener("legend-item-onhover", this.handleLegendOnHover);
        eventsFragment.removeEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
    };
    return StackedBar;
}(_bar__WEBPACK_IMPORTED_MODULE_2__["Bar"]));



/***/ }),

/***/ "./src/components/graphs/bar.ts":
/*!**************************************!*\
  !*** ./src/components/graphs/bar.ts ***!
  \**************************************/
/*! exports provided: Bar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bar", function() { return Bar; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports

var Bar = /** @class */ (function (_super) {
    __extends(Bar, _super);
    function Bar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Gets the correct width for bars based on options & configurations
    Bar.prototype.getBarWidth = function () {
        var mainXAxis = this.services.axes.getMainXAxis();
        var options = this.model.getOptions();
        if (!mainXAxis.scale.step) {
            return Math.min(options.bars.maxWidth, (5 / mainXAxis.scale.ticks().length) * options.bars.maxWidth);
        }
        return Math.min(options.bars.maxWidth, mainXAxis.scale.step() / 2);
    };
    return Bar;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/graphs/donut.ts":
/*!****************************************!*\
  !*** ./src/components/graphs/donut.ts ***!
  \****************************************/
/*! exports provided: Donut */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Donut", function() { return Donut; });
/* harmony import */ var _pie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pie */ "./src/components/graphs/pie.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-interpolate */ "../../node_modules/d3-interpolate/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports



// D3 Imports


var donutCenterNumberTween = function (d3Ref, newNumber) {
    // Remove commas from the current value string, and convert to an int
    var currentValue = parseInt(d3Ref.text().replace(/[, ]+/g, ""), 10) || 0;
    var i = Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_4__["interpolateNumber"])(currentValue, newNumber);
    var formatInterpolatedValue = function (number) { return Math.floor(number).toLocaleString(); };
    return function (t) { return d3Ref.text(formatInterpolatedValue(i(t))); };
};
var Donut = /** @class */ (function (_super) {
    __extends(Donut, _super);
    function Donut() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "donut";
        return _this;
    }
    Donut.prototype.render = function (animate) {
        if (animate === void 0) { animate = true; }
        // Call render() from Pie
        _super.prototype.render.call(this, animate);
        var svg = _services__WEBPACK_IMPORTED_MODULE_1__["DOMUtils"].appendOrSelect(this.getContainerSVG(), "g.center");
        var options = this.model.getOptions();
        // Compute the outer radius needed
        var radius = this.computeRadius();
        var donutCenterFigure = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(options, "center", "number");
        if (!donutCenterFigure) {
            donutCenterFigure = this.getDataList().reduce(function (accumulator, d) {
                return accumulator + d.value;
            }, 0);
        }
        // Add the number shown in the center of the donut
        _services__WEBPACK_IMPORTED_MODULE_1__["DOMUtils"].appendOrSelect(svg, "text.donut-figure")
            .attr("text-anchor", "middle")
            .style("font-size", function () { return options.donut.center.numberFontSize(radius); })
            .transition(this.services.transitions.getTransition("donut-figure-enter-update", animate))
            .tween("text", function () {
            return donutCenterNumberTween(Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(this), donutCenterFigure);
        });
        // Add the label below the number in the center of the donut
        _services__WEBPACK_IMPORTED_MODULE_1__["DOMUtils"].appendOrSelect(svg, "text.donut-title")
            .attr("text-anchor", "middle")
            .style("font-size", function () { return options.donut.center.titleFontSize(radius); })
            .attr("y", options.donut.center.titleYPosition(radius))
            .text(options.donut.center.label);
    };
    Donut.prototype.getInnerRadius = function () {
        // Compute the outer radius needed
        var radius = this.computeRadius();
        return radius * (3 / 4);
    };
    return Donut;
}(_pie__WEBPACK_IMPORTED_MODULE_0__["Pie"]));



/***/ }),

/***/ "./src/components/graphs/line.ts":
/*!***************************************!*\
  !*** ./src/components/graphs/line.ts ***!
  \***************************************/
/*! exports provided: Line */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return Line; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../configuration */ "./src/configuration.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-shape */ "../../node_modules/d3-shape/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports


// D3 Imports


var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "line";
        return _this;
    }
    // TODORF - Remove these listeners in destroy()
    Line.prototype.init = function () {
        var _this = this;
        // Highlight correct scatter on legend item hovers
        this.services.events.addEventListener("legend-item-onhover", function (e) {
            var hoveredElement = e.detail.hoveredElement;
            _this.parent.selectAll("g.lines")
                .transition(_this.services.transitions.getTransition("legend-hover-line"))
                .attr("opacity", function (d) {
                if (d.label !== hoveredElement.datum()["key"]) {
                    return _configuration__WEBPACK_IMPORTED_MODULE_1__["lines"].opacity.unselected;
                }
                return _configuration__WEBPACK_IMPORTED_MODULE_1__["lines"].opacity.selected;
            });
        });
        // Un-highlight lines on legend item mouseouts
        this.services.events.addEventListener("legend-item-onmouseout", function (e) {
            _this.parent.selectAll("g.lines")
                .transition(_this.services.transitions.getTransition("legend-mouseout-line"))
                .attr("opacity", _configuration__WEBPACK_IMPORTED_MODULE_1__["lines"].opacity.selected);
        });
    };
    Line.prototype.render = function (animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        var svg = this.getContainerSVG();
        // D3 line generator function
        this.lineGenerator = Object(d3_shape__WEBPACK_IMPORTED_MODULE_3__["line"])()
            .x(function (d, i) { return _this.services.axes.getXValue(d, i); })
            .y(function (d, i) { return _this.services.axes.getYValue(d, i); })
            .curve(this.services.curves.getD3Curve());
        // Update the bound data on line groups
        var lineGroups = svg.selectAll("g.lines")
            .data(this.model.getDisplayData().datasets, function (dataset) { return dataset.label; });
        // Remove elements that need to be exited
        // We need exit at the top here to make sure that
        // Data filters are processed before entering new elements
        // Or updating existing ones
        lineGroups.exit()
            .attr("opacity", 0)
            .remove();
        // Add line groups that need to be introduced
        var enteringLineGroups = lineGroups.enter()
            .append("g")
            .classed("lines", true);
        var self = this;
        // Enter paths that need to be introduced
        var enteringPaths = enteringLineGroups.append("path")
            .attr("opacity", 0);
        // Apply styles and datum
        enteringPaths.merge(svg.selectAll("g.lines path"))
            .attr("stroke", function (d) {
            var parentDatum = Object(d3_selection__WEBPACK_IMPORTED_MODULE_2__["select"])(this.parentNode).datum();
            return self.model.getStrokeColor(parentDatum.label);
        })
            .datum(function (d) {
            var parentDatum = Object(d3_selection__WEBPACK_IMPORTED_MODULE_2__["select"])(this.parentNode).datum();
            this._datasetLabel = parentDatum.label;
            return parentDatum.data;
        })
            .transition(this.services.transitions.getTransition("line-update-enter", animate))
            .attr("opacity", 1)
            .attr("class", "line")
            .attr("d", this.lineGenerator);
    };
    return Line;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/graphs/pie.ts":
/*!**************************************!*\
  !*** ./src/components/graphs/pie.ts ***!
  \**************************************/
/*! exports provided: Pie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pie", function() { return Pie; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../interfaces/enums */ "./src/interfaces/enums.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-shape */ "../../node_modules/d3-shape/src/index.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-interpolate */ "../../node_modules/d3-interpolate/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports




// D3 Imports



// Pie slice tween function
function arcTween(a, arcFunc) {
    var _this = this;
    var i = Object(d3_interpolate__WEBPACK_IMPORTED_MODULE_6__["interpolate"])(this._current, a);
    return function (t) {
        _this._current = i(t);
        return arcFunc(_this._current);
    };
}
var Pie = /** @class */ (function (_super) {
    __extends(Pie, _super);
    function Pie() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "pie";
        // Highlight elements that match the hovered legend item
        _this.handleLegendOnHover = function (event) {
            var hoveredElement = event.detail.hoveredElement;
            _this.parent.selectAll("path.slice")
                .transition(_this.services.transitions.getTransition("legend-hover-bar"))
                .attr("opacity", function (d) { return (d.data.label !== hoveredElement.datum()["key"]) ? 0.3 : 1; });
        };
        // Un-highlight all elements
        _this.handleLegendMouseOut = function (event) {
            _this.parent.selectAll("path.slice")
                .transition(_this.services.transitions.getTransition("legend-mouseout-bar"))
                .attr("opacity", 1);
        };
        return _this;
    }
    Pie.prototype.init = function () {
        var eventsFragment = this.services.events;
        // Highlight correct circle on legend item hovers
        eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);
        // Un-highlight circles on legend item mouseouts
        eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
    };
    Pie.prototype.getDataList = function () {
        var displayData = this.model.getDisplayData();
        var dataset = displayData.datasets[0];
        return dataset.data.map(function (datum, i) { return ({
            label: displayData.labels[i],
            value: datum
        }); });
    };
    Pie.prototype.getInnerRadius = function () {
        var options = this.model.getOptions();
        return options.pie.innerRadius;
    };
    Pie.prototype.render = function (animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        var self = this;
        var svg = this.getContainerSVG();
        var options = this.model.getOptions();
        var dataList = this.getDataList();
        // Compute the outer radius needed
        var radius = this.computeRadius();
        this.arc = Object(d3_shape__WEBPACK_IMPORTED_MODULE_5__["arc"])()
            .innerRadius(this.getInnerRadius())
            .outerRadius(radius);
        // Set the hover arc radius
        this.hoverArc = Object(d3_shape__WEBPACK_IMPORTED_MODULE_5__["arc"])()
            .innerRadius(this.getInnerRadius())
            .outerRadius(radius + options.pie.hoverArc.outerRadiusOffset);
        // Setup the pie layout
        var pieLayout = Object(d3_shape__WEBPACK_IMPORTED_MODULE_5__["pie"])()
            .value(function (d) { return d.value; })
            .sort(function (a, b) { return b.value - a.value; })
            .padAngle(options.pie.padAngle);
        // Sort pie layout data based off of the indecies the layout creates
        var pieLayoutData = pieLayout(dataList)
            .sort(function (a, b) { return a.index - b.index; });
        // Update data on all slices
        var paths = _services__WEBPACK_IMPORTED_MODULE_1__["DOMUtils"].appendOrSelect(svg, "g.slices").selectAll("path.slice")
            .data(pieLayoutData, function (d) { return d.data.label; });
        // Remove slices that need to be exited
        paths.exit()
            .attr("opacity", 0)
            .remove();
        // Add new slices that are being introduced
        var enteringPaths = paths.enter()
            .append("path")
            .classed("slice", true)
            .attr("opacity", 0);
        // Update styles & position on existing and entering slices
        enteringPaths.merge(paths)
            .attr("fill", function (d) { return _this.model.getFillScale()(d.data.label); })
            .attr("d", this.arc)
            .transition(this.services.transitions.getTransition("pie-slice-enter-update", animate))
            .attr("opacity", 1)
            .attrTween("d", function (a) {
            return arcTween.bind(this)(a, self.arc);
        });
        // Draw the slice labels
        var labels = _services__WEBPACK_IMPORTED_MODULE_1__["DOMUtils"].appendOrSelect(svg, "g.labels")
            .selectAll("text.pie-label")
            .data(pieLayoutData, function (d) { return d.data.label; });
        // Remove labels that are existing
        labels.exit()
            .attr("opacity", 0)
            .remove();
        // Add labels that are being introduced
        var enteringLabels = labels.enter()
            .append("text")
            .classed("pie-label", true);
        // Update styles & position on existing & entering labels
        var calloutData = [];
        enteringLabels.merge(labels)
            .style("text-anchor", "middle")
            .text(function (d) { return _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].convertValueToPercentage(d.data.value, dataList) + "%"; })
            // Calculate dimensions in order to transform
            .datum(function (d) {
            var textLength = this.getComputedTextLength();
            d.textOffsetX = textLength / 2;
            d.textOffsetY = parseFloat(getComputedStyle(this).fontSize) / 2;
            var marginedRadius = radius + 7;
            var theta = ((d.endAngle - d.startAngle) / 2) + d.startAngle;
            d.xPosition = (d.textOffsetX + marginedRadius) * Math.sin(theta);
            d.yPosition = (d.textOffsetY + marginedRadius) * -Math.cos(theta);
            return d;
        })
            .attr("transform", function (d, i) {
            var totalSlices = dataList.length;
            var sliceAngleDeg = (d.endAngle - d.startAngle) * (180 / Math.PI);
            // check if last 2 slices (or just last) are < the threshold
            if (i >= totalSlices - 2) {
                if (sliceAngleDeg < options.pie.callout.minSliceDegree) {
                    var labelTranslateX = void 0, labelTranslateY = void 0;
                    if (d.index === totalSlices - 1) {
                        labelTranslateX = d.xPosition + options.pie.callout.offsetX + options.pie.callout.textMargin + d.textOffsetX;
                        labelTranslateY = d.yPosition - options.pie.callout.offsetY;
                        // Set direction of callout
                        d.direction = _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__["CalloutDirections"].RIGHT;
                        calloutData.push(d);
                    }
                    else {
                        labelTranslateX = d.xPosition - options.pie.callout.offsetX - d.textOffsetX - options.pie.callout.textMargin;
                        labelTranslateY = d.yPosition - options.pie.callout.offsetY;
                        // Set direction of callout
                        d.direction = _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__["CalloutDirections"].LEFT;
                        calloutData.push(d);
                    }
                    return "translate(" + labelTranslateX + ", " + labelTranslateY + ")";
                }
            }
            return "translate(" + d.xPosition + ", " + d.yPosition + ")";
        });
        // Render pie label callouts
        this.renderCallouts(calloutData);
        // Position Pie
        var pieTranslateX = radius + options.pie.xOffset;
        var pieTranslateY = radius + options.pie.yOffset;
        if (calloutData.length > 0) {
            pieTranslateY += options.pie.yOffsetCallout;
        }
        svg.attr("transform", "translate(" + pieTranslateX + ", " + pieTranslateY + ")");
        // Add event listeners
        this.addEventListeners();
    };
    Pie.prototype.renderCallouts = function (calloutData) {
        var svg = _services__WEBPACK_IMPORTED_MODULE_1__["DOMUtils"].appendOrSelect(this.getContainerSVG(), "g.callouts");
        var options = this.model.getOptions();
        // Update data on callouts
        var callouts = svg.selectAll("g.callout")
            .data(calloutData);
        callouts.exit().remove();
        var enteringCallouts = callouts.enter()
            .append("g")
            .classed("callout", true);
        // Update data values for each callout
        // For the horizontal and vertical lines to use
        enteringCallouts.merge(callouts)
            .datum(function (d) {
            var xPosition = d.xPosition, yPosition = d.yPosition, direction = d.direction;
            if (direction === _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__["CalloutDirections"].RIGHT) {
                d.startPos = {
                    x: xPosition,
                    y: yPosition + d.textOffsetY
                };
                // end position for the callout line
                d.endPos = {
                    x: xPosition + options.pie.callout.offsetX,
                    y: yPosition - options.pie.callout.offsetY + d.textOffsetY
                };
                // the intersection point of the vertical and horizontal line
                d.intersectPointX = d.endPos.x - options.pie.callout.horizontalLineLength;
            }
            else {
                // start position for the callout line
                d.startPos = {
                    x: xPosition,
                    y: yPosition + d.textOffsetY
                };
                // end position for the callout line should be bottom aligned to the title
                d.endPos = {
                    x: xPosition - options.pie.callout.offsetX,
                    y: yPosition - options.pie.callout.offsetY + d.textOffsetY
                };
                // the intersection point of the vertical and horizontal line
                d.intersectPointX = d.endPos.x + options.pie.callout.horizontalLineLength;
            }
            // Store the necessary data in the DOM element
            return d;
        });
        // draw vertical line
        var enteringVerticalLines = enteringCallouts.append("line")
            .classed("vertical-line", true);
        enteringVerticalLines.merge(svg.selectAll("line.vertical-line"))
            .datum(function (d) {
            return Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this.parentNode).datum();
        })
            .style("stroke-width", "1px")
            .attr("x1", function (d) { return d.startPos.x; })
            .attr("y1", function (d) { return d.startPos.y; })
            .attr("x2", function (d) { return d.intersectPointX; })
            .attr("y2", function (d) { return d.endPos.y; });
        // draw horizontal line
        var enteringHorizontalLines = enteringCallouts.append("line")
            .classed("horizontal-line", true);
        enteringHorizontalLines.merge(callouts.selectAll("line.horizontal-line"))
            .datum(function (d) {
            return Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this.parentNode).datum();
        })
            .style("stroke-width", "1px")
            .attr("x1", function (d) { return d.intersectPointX; })
            .attr("y1", function (d) { return d.endPos.y; })
            .attr("x2", function (d) { return d.endPos.x; })
            .attr("y2", function (d) { return d.endPos.y; });
    };
    Pie.prototype.addEventListeners = function () {
        var self = this;
        this.parent.selectAll("path.slice")
            .on("mousemove", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this);
            hoveredElement.classed("hovered", true)
                .transition(self.services.transitions.getTransition("pie_slice_mouseover"))
                .attr("d", self.hoverArc);
            // Dispatch mouse event
            self.services.events.dispatchEvent("pie-slice-mouseover", hoveredElement);
            // Show tooltip
            self.services.events.dispatchEvent("show-tooltip", {
                hoveredElement: hoveredElement,
                type: _interfaces_enums__WEBPACK_IMPORTED_MODULE_3__["TooltipTypes"].DATAPOINT
            });
        })
            .on("mouseout", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this);
            hoveredElement.classed("hovered", false)
                .transition(self.services.transitions.getTransition("pie_slice_mouseover"))
                .attr("d", self.arc);
            // Dispatch mouse event
            self.services.events.dispatchEvent("pie-slice-mouseout", hoveredElement);
            // Hide tooltip
            self.services.events.dispatchEvent("hide-tooltip", { hoveredElement: hoveredElement });
        })
            .on("click", function (d) { return self.services.events.dispatchEvent("pie-slice-click", d); });
    };
    // Helper functions
    Pie.prototype.computeRadius = function () {
        var options = this.model.getOptions();
        var _a = _services__WEBPACK_IMPORTED_MODULE_1__["DOMUtils"].getSVGElementSize(this.parent, { useAttrs: true }), width = _a.width, height = _a.height;
        var radius = Math.min(width, height) / 2;
        return radius + options.pie.radiusOffset;
    };
    return Pie;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/graphs/scatter.ts":
/*!******************************************!*\
  !*** ./src/components/graphs/scatter.ts ***!
  \******************************************/
/*! exports provided: Scatter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Scatter", function() { return Scatter; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../interfaces */ "./src/interfaces/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports

// D3 Imports


var Scatter = /** @class */ (function (_super) {
    __extends(Scatter, _super);
    function Scatter() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "scatter";
        _this.handleLegendOnHover = function (event) {
            var hoveredElement = event.detail.hoveredElement;
            _this.parent.selectAll("circle.dot")
                .transition(_this.services.transitions.getTransition("legend-hover-scatter"))
                .attr("opacity", function (d) { return (d.datasetLabel !== hoveredElement.datum()["key"]) ? 0.3 : 1; });
        };
        _this.handleLegendMouseOut = function (event) {
            _this.parent.selectAll("circle.dot")
                .transition(_this.services.transitions.getTransition("legend-mouseout-scatter"))
                .attr("opacity", 1);
        };
        return _this;
    }
    Scatter.prototype.init = function () {
        var eventsFragment = this.services.events;
        // Highlight correct circle on legend item hovers
        eventsFragment.addEventListener("legend-item-onhover", this.handleLegendOnHover);
        // Un-highlight circles on legend item mouseouts
        eventsFragment.addEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
    };
    Scatter.prototype.render = function (animate) {
        var _this = this;
        // Chart options mixed with the internal configurations
        var options = this.model.getOptions();
        // Grab container SVG
        var svg = this.getContainerSVG();
        // Update data on dot groups
        var dotGroups = svg.selectAll("g.dots")
            .data(this.model.getDisplayData().datasets, function (dataset) { return dataset.label; });
        // Remove dot groups that need to be removed
        dotGroups.exit()
            .attr("opacity", 0)
            .remove();
        // Add the dot groups that need to be introduced
        var dotGroupsEnter = dotGroups.enter()
            .append("g")
            .classed("dots", true);
        // Update data on all circles
        var dots = dotGroupsEnter.merge(dotGroups)
            .selectAll("circle.dot")
            .data(function (d, i) { return _this.addLabelsToDataPoints(d, i); });
        // Add the circles that need to be introduced
        var dotsEnter = dots.enter()
            .append("circle")
            .attr("opacity", 0);
        var filled = options.points.filled;
        // Apply styling & position
        dotsEnter.merge(dots)
            .raise()
            .classed("dot", true)
            .classed("filled", filled)
            .classed("unfilled", !filled)
            .attr("cx", function (d, i) { return _this.services.axes.getXValue(d, i); })
            .transition(this.services.transitions.getTransition("scatter-update-enter", animate))
            .attr("cy", function (d, i) { return _this.services.axes.getYValue(d, i); })
            .attr("r", options.points.radius)
            .attr("fill", function (d) {
            if (filled) {
                return _this.model.getFillScale()[d.datasetLabel](d.label);
            }
        })
            .attr("fill-opacity", filled ? 0.2 : 1)
            .attr("stroke", function (d) { return _this.model.getStrokeColor(d.datasetLabel, d.label, d.value); })
            .attr("opacity", 1);
        // Add event listeners to elements drawn
        this.addEventListeners();
    };
    // TODO - This method could be re-used in more graphs
    Scatter.prototype.addLabelsToDataPoints = function (d, index) {
        var labels = this.model.getDisplayData().labels;
        return d.data.map(function (datum, i) { return ({
            date: datum.date,
            label: labels[i],
            datasetLabel: d.label,
            value: isNaN(datum) ? datum.value : datum
        }); });
    };
    Scatter.prototype.addEventListeners = function () {
        var self = this;
        this.parent.selectAll("circle")
            .on("mouseover mousemove", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this);
            hoveredElement.classed("hovered", true);
            hoveredElement.style("fill", function (d) { return self.model.getFillScale()[d.datasetLabel](d.label); });
            // Show tooltip
            self.services.events.dispatchEvent("show-tooltip", {
                hoveredElement: hoveredElement,
                type: _interfaces__WEBPACK_IMPORTED_MODULE_2__["TooltipTypes"].DATAPOINT
            });
        })
            .on("mouseout", function () {
            var hoveredElement = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this);
            hoveredElement.classed("hovered", false);
            if (!self.configs.filled) {
                hoveredElement.style("fill", null);
            }
            // Hide tooltip
            self.services.events.dispatchEvent("hide-tooltip", { hoveredElement: hoveredElement });
        });
    };
    Scatter.prototype.destroy = function () {
        // Remove event listeners
        this.parent.selectAll("circle")
            .on("mousemove", null)
            .on("mouseout", null);
        // Remove legend listeners
        var eventsFragment = this.services.events;
        eventsFragment.removeEventListener("legend-item-onhover", this.handleLegendOnHover);
        eventsFragment.removeEventListener("legend-item-onmouseout", this.handleLegendMouseOut);
    };
    return Scatter;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/components/index.ts":
/*!*********************************!*\
  !*** ./src/components/index.ts ***!
  \*********************************/
/*! exports provided: Component, Legend, Title, Tooltip, TooltipBar, TooltipScatter, SimpleBar, GroupedBar, StackedBar, Line, Scatter, Pie, Donut, TwoDimensionalAxes, Axis, Grid, HorizontalZeroLine, LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./component */ "./src/components/component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return _component__WEBPACK_IMPORTED_MODULE_0__["Component"]; });

/* harmony import */ var _essentials_legend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./essentials/legend */ "./src/components/essentials/legend.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Legend", function() { return _essentials_legend__WEBPACK_IMPORTED_MODULE_1__["Legend"]; });

/* harmony import */ var _essentials_title__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./essentials/title */ "./src/components/essentials/title.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Title", function() { return _essentials_title__WEBPACK_IMPORTED_MODULE_2__["Title"]; });

/* harmony import */ var _essentials_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./essentials/tooltip */ "./src/components/essentials/tooltip.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Tooltip", function() { return _essentials_tooltip__WEBPACK_IMPORTED_MODULE_3__["Tooltip"]; });

/* harmony import */ var _essentials_tooltip_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./essentials/tooltip-bar */ "./src/components/essentials/tooltip-bar.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipBar", function() { return _essentials_tooltip_bar__WEBPACK_IMPORTED_MODULE_4__["TooltipBar"]; });

/* harmony import */ var _essentials_tooltip_scatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./essentials/tooltip-scatter */ "./src/components/essentials/tooltip-scatter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipScatter", function() { return _essentials_tooltip_scatter__WEBPACK_IMPORTED_MODULE_5__["TooltipScatter"]; });

/* harmony import */ var _graphs_bar_simple__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./graphs/bar-simple */ "./src/components/graphs/bar-simple.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleBar", function() { return _graphs_bar_simple__WEBPACK_IMPORTED_MODULE_6__["SimpleBar"]; });

/* harmony import */ var _graphs_bar_grouped__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./graphs/bar-grouped */ "./src/components/graphs/bar-grouped.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupedBar", function() { return _graphs_bar_grouped__WEBPACK_IMPORTED_MODULE_7__["GroupedBar"]; });

/* harmony import */ var _graphs_bar_stacked__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./graphs/bar-stacked */ "./src/components/graphs/bar-stacked.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackedBar", function() { return _graphs_bar_stacked__WEBPACK_IMPORTED_MODULE_8__["StackedBar"]; });

/* harmony import */ var _graphs_line__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./graphs/line */ "./src/components/graphs/line.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Line", function() { return _graphs_line__WEBPACK_IMPORTED_MODULE_9__["Line"]; });

/* harmony import */ var _graphs_scatter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./graphs/scatter */ "./src/components/graphs/scatter.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Scatter", function() { return _graphs_scatter__WEBPACK_IMPORTED_MODULE_10__["Scatter"]; });

/* harmony import */ var _graphs_pie__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./graphs/pie */ "./src/components/graphs/pie.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pie", function() { return _graphs_pie__WEBPACK_IMPORTED_MODULE_11__["Pie"]; });

/* harmony import */ var _graphs_donut__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./graphs/donut */ "./src/components/graphs/donut.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Donut", function() { return _graphs_donut__WEBPACK_IMPORTED_MODULE_12__["Donut"]; });

/* harmony import */ var _axes_two_dimensional_axes__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./axes/two-dimensional-axes */ "./src/components/axes/two-dimensional-axes.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TwoDimensionalAxes", function() { return _axes_two_dimensional_axes__WEBPACK_IMPORTED_MODULE_13__["TwoDimensionalAxes"]; });

/* harmony import */ var _axes_axis__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./axes/axis */ "./src/components/axes/axis.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Axis", function() { return _axes_axis__WEBPACK_IMPORTED_MODULE_14__["Axis"]; });

/* harmony import */ var _axes_grid__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./axes/grid */ "./src/components/axes/grid.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Grid", function() { return _axes_grid__WEBPACK_IMPORTED_MODULE_15__["Grid"]; });

/* harmony import */ var _axes_horizontal_zero_line__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./axes/horizontal-zero-line */ "./src/components/axes/horizontal-zero-line.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HorizontalZeroLine", function() { return _axes_horizontal_zero_line__WEBPACK_IMPORTED_MODULE_16__["HorizontalZeroLine"]; });

/* harmony import */ var _layout_layout__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./layout/layout */ "./src/components/layout/layout.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return _layout_layout__WEBPACK_IMPORTED_MODULE_17__["LayoutComponent"]; });


// ESSENTIALS





// GRAPHS







// MISC







/***/ }),

/***/ "./src/components/layout/layout.ts":
/*!*****************************************!*\
  !*** ./src/components/layout/layout.ts ***!
  \*****************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return LayoutComponent; });
/* harmony import */ var _component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../component */ "./src/components/component.ts");
/* harmony import */ var _interfaces_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../interfaces/index */ "./src/interfaces/index.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services */ "./src/services/index.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var d3_hierarchy__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-hierarchy */ "../../node_modules/d3-hierarchy/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports




// D3 Imports


// TODO - What if there is no "growth" object?
var LayoutComponent = /** @class */ (function (_super) {
    __extends(LayoutComponent, _super);
    function LayoutComponent(model, services, children, configs) {
        var _this = _super.call(this, model, services, configs) || this;
        _this.type = "layout";
        _this.configs = configs;
        _this.children = children;
        _this._instanceID = LayoutComponent.instanceID++;
        // Pass children data to the hierarchy layout
        // And calculate sum of sizes
        var directionIsReversed = (_this.configs.direction === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].ROW_REVERSE) ||
            (_this.configs.direction === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].COLUMN_REVERSE);
        if (directionIsReversed) {
            _this.children = _this.children.reverse();
        }
        _this.init();
        return _this;
    }
    LayoutComponent.prototype.init = function () {
        this.children.forEach(function (child) {
            child.components.forEach(function (component) {
                component.init();
            });
        });
    };
    LayoutComponent.prototype.getPreferedAndFixedSizeSum = function () {
        var svg = this.parent;
        var sum = 0;
        svg.selectAll("svg.layout-child-" + this._instanceID)
            .filter(function (d) {
            var growth = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(d, "data", "growth", "x");
            return growth === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].PREFERRED || growth === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].FIXED;
        })
            .each(function (d) {
            sum += d.data.size;
        });
        return sum;
    };
    LayoutComponent.prototype.getNumOfStretchChildren = function () {
        var svg = this.parent;
        return svg.selectAll("svg.layout-child-" + this._instanceID)
            .filter(function (d) {
            var growth = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(d, "data", "growth", "x");
            return growth === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].STRETCH;
        })
            .size();
    };
    LayoutComponent.prototype.render = function (animate) {
        var _this = this;
        if (animate === void 0) { animate = true; }
        // Get parent SVG to render inside of
        var svg = this.parent;
        var _a = _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].getSVGElementSize(svg, { useAttrs: true }), width = _a.width, height = _a.height;
        var root = Object(d3_hierarchy__WEBPACK_IMPORTED_MODULE_5__["hierarchy"])({
            children: this.children
        })
            .sum(function (d) { return d.size; });
        // Grab the correct treemap tile function based on direction
        var tileType = (this.configs.direction === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].ROW || this.configs.direction === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].ROW_REVERSE)
            ? d3_hierarchy__WEBPACK_IMPORTED_MODULE_5__["treemapDice"] : d3_hierarchy__WEBPACK_IMPORTED_MODULE_5__["treemapSlice"];
        // Compute the position of all elements within the layout
        Object(d3_hierarchy__WEBPACK_IMPORTED_MODULE_5__["treemap"])()
            .tile(tileType)
            .size([width, height])(root);
        // TODORF - Remove
        var horizontal = (this.configs.direction === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].ROW || this.configs.direction === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutDirection"].ROW_REVERSE);
        // Add new SVGs to the DOM for each layout child
        var updatedSVGs = svg.selectAll("svg.layout-child-" + this._instanceID)
            .data(root.leaves(), function (d) { return d.data.id; });
        updatedSVGs
            .attr("width", function (d) { return d.x1 - d.x0; })
            .attr("height", function (d) { return d.y1 - d.y0; });
        var enteringSVGs = updatedSVGs
            .enter()
            .append("svg")
            .attr("class", function (d) { return "layout-child layout-child-" + _this._instanceID + " " + d.data.id; })
            .attr("x", function (d) { return d.x0; })
            .attr("y", function (d) { return d.y0; });
        enteringSVGs.merge(svg.selectAll("svg.layout-child-" + this._instanceID))
            .each(function (d) {
            var _this = this;
            // Set parent component for each child
            d.data.components.forEach(function (itemComponent) {
                itemComponent.setParent(Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(_this));
                // Render preffered & fixed items
                var growth = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(d, "data", "growth", "x");
                if (growth === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].PREFERRED || growth === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].FIXED) {
                    itemComponent.render(animate);
                }
            });
        });
        svg.selectAll("svg.layout-child-" + this._instanceID)
            .each(function (d) {
            // Calculate preffered children sizes after internal rendering
            var growth = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(d, "data", "growth", "x");
            var matchingSVGDimensions = _services__WEBPACK_IMPORTED_MODULE_3__["DOMUtils"].getSVGElementSize(Object(d3_selection__WEBPACK_IMPORTED_MODULE_4__["select"])(this), { useBBox: true });
            if (growth === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].PREFERRED) {
                var matchingSVGWidth = horizontal ? matchingSVGDimensions.width : matchingSVGDimensions.height;
                var svgWidth = horizontal ? width : height;
                d.data.size = (matchingSVGWidth / svgWidth) * 100;
            }
        });
        updatedSVGs
            .exit()
            .remove();
        // Run through stretch x-items
        this.children
            .filter(function (child) {
            var growth = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(child, "growth", "x");
            return growth === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].STRETCH;
        })
            .forEach(function (child, i) {
            child.size = (100 - (+_this.getPreferedAndFixedSizeSum())) / (+_this.getNumOfStretchChildren());
        });
        // Pass children data to the hierarchy layout
        // And calculate sum of sizes
        root = Object(d3_hierarchy__WEBPACK_IMPORTED_MODULE_5__["hierarchy"])({
            children: this.children
        })
            .sum(function (d) { return d.size; });
        // Compute the position of all elements within the layout
        Object(d3_hierarchy__WEBPACK_IMPORTED_MODULE_5__["treemap"])()
            .tile(tileType)
            .size([width, height])
            .padding(0)(root);
        // Add new SVGs to the DOM for each layout child
        svg
            .selectAll("svg.layout-child-" + this._instanceID)
            .data(root.leaves(), function (d) { return d.data.id; })
            .attr("x", function (d) { return d.x0; })
            .attr("y", function (d) { return d.y0; })
            .attr("width", function (d) { return d.x1 - d.x0; })
            .attr("height", function (d) { return d.y1 - d.y0; })
            .each(function (d, i) {
            d.data.components.forEach(function (itemComponent) {
                var growth = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(d, "data", "growth", "x");
                if (growth === _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LayoutGrowth"].STRETCH) {
                    itemComponent.render(animate);
                }
            });
        });
    };
    // Pass on model to children as well
    LayoutComponent.prototype.setModel = function (newObj) {
        _super.prototype.setModel.call(this, newObj);
        this.children.forEach(function (child) {
            child.components.forEach(function (component) { return component.setModel(newObj); });
        });
    };
    // Pass on essentials to children as well
    LayoutComponent.prototype.setServices = function (newObj) {
        _super.prototype.setServices.call(this, newObj);
        this.children.forEach(function (child) {
            child.components.forEach(function (component) { return component.setServices(newObj); });
        });
    };
    LayoutComponent.prototype.destroy = function () {
        this.children.forEach(function (child) {
            child.components.forEach(function (component) { return component.destroy(); });
        });
    };
    // Give every layout component a distinct ID
    // so they don't interfere when querying elements
    LayoutComponent.instanceID = Math.floor(Math.random() * 99999999999);
    return LayoutComponent;
}(_component__WEBPACK_IMPORTED_MODULE_0__["Component"]));



/***/ }),

/***/ "./src/configuration.ts":
/*!******************************!*\
  !*** ./src/configuration.ts ***!
  \******************************/
/*! exports provided: legend, grid, baseTooltip, axisChartTooltip, barChartTooltip, axes, timeScale, options, lines, transitions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "legend", function() { return legend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "grid", function() { return grid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseTooltip", function() { return baseTooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axisChartTooltip", function() { return axisChartTooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "barChartTooltip", function() { return barChartTooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "axes", function() { return axes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timeScale", function() { return timeScale; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lines", function() { return lines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transitions", function() { return transitions; });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./src/tools.ts");
/* harmony import */ var _interfaces_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interfaces/index */ "./src/interfaces/index.ts");


/*
 *****************************
 * User configurable options *
 *****************************
 */
/**
 * Legend options
 */
var legend = {
    position: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["LegendPositions"].BOTTOM,
    clickable: true,
    items: {
        status: {
            ACTIVE: 1,
            DISABLED: 0
        },
        horizontalSpace: 12,
        verticalSpace: 24,
        textYOffset: 8
    },
    checkbox: {
        radius: 6.5,
        spaceAfter: 4
    }
};
/**
 * Grid options
 */
var grid = {
    x: {
        numberOfTicks: 5
    },
    y: {
        numberOfTicks: 5
    }
};
/**
 * Tooltip options
 */
var baseTooltip = {
    datapoint: {
        horizontalOffset: 10,
        enabled: true,
    },
};
var axisChartTooltip = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, baseTooltip, {
    gridline: {
        enabled: true,
        threshold: 0.25
    }
});
var barChartTooltip = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, axisChartTooltip, {
    datapoint: {
        verticalOffset: 4
    },
    gridline: {
        enabled: false
    }
});
// We setup no axes by default, the TwoDimensionalAxes component
// Will setup axes options based on what user provides
var axes = {};
var timeScale = {
    addSpaceOnEdges: true
};
/**
 * Base chart options common to any chart
 */
var chart = {
    width: "100%",
    height: "100%",
    resizable: true,
    theme: _interfaces_index__WEBPACK_IMPORTED_MODULE_1__["ChartTheme"].DEFAULT,
    tooltip: baseTooltip,
    legend: legend,
    style: {
        prefix: "cc"
    }
};
/**
 * Options common to any chart with an axis
 */
var axisChart = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, chart, {
    axes: axes,
    timeScale: timeScale,
    grid: grid,
    tooltip: axisChartTooltip
});
/**
 * options specific to simple bar charts
 */
var baseBarChart = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, axisChart, {
    bars: {
        maxWidth: 16
    },
    timeScale: _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge(timeScale, {
        addSpaceOnEdges: true
    }),
    tooltip: barChartTooltip
});
/**
 * options specific to simple bar charts
 */
var simpleBarChart = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, baseBarChart, {});
/**
 * options specific to simple bar charts
 */
var groupedBarChart = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, baseBarChart, {});
/**
 * options specific to stacked bar charts
 */
var stackedBarChart = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, baseBarChart, {
    bars: _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, baseBarChart.bars, {
        dividerSize: 1.5
    })
});
/**
 * options specific to line charts
 */
var lineChart = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, axisChart, {
    points: {
        // default point radius to 3
        radius: 3,
        filled: false
    }
});
/**
 * options specific to scatter charts
 */
var scatterChart = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, axisChart, {
    points: {
        // default point radius to 4
        radius: 4,
        fillOpacity: 0.3,
        filled: true
    }
});
/**
 * options specific to pie charts
 */
var pieChart = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, chart, {
    pie: {
        radiusOffset: -15,
        innerRadius: 2,
        padAngle: 0.007,
        hoverArc: {
            outerRadiusOffset: 3
        },
        xOffset: 30,
        yOffset: 20,
        yOffsetCallout: 10,
        callout: {
            minSliceDegree: 5,
            offsetX: 15,
            offsetY: 12,
            horizontalLineLength: 8,
            textMargin: 2
        }
    }
});
/**
 * options specific to donut charts
 */
var donutChart = _tools__WEBPACK_IMPORTED_MODULE_0__["Tools"].merge({}, pieChart, {
    donut: {
        center: {
            numberFontSize: function (radius) { return Math.min((radius / 100) * 24, 24) + "px"; },
            titleFontSize: function (radius) { return Math.min((radius / 100) * 15, 15) + "px"; },
            titleYPosition: function (radius) { return Math.min((radius / 80) * 20, 20); }
        }
    }
});
var options = {
    chart: chart,
    axisChart: axisChart,
    simpleBarChart: simpleBarChart,
    groupedBarChart: groupedBarChart,
    stackedBarChart: stackedBarChart,
    lineChart: lineChart,
    scatterChart: scatterChart,
    pieChart: pieChart,
    donutChart: donutChart
};
/**
 * Options for line behaviour
 */
var lines = {
    opacity: {
        unselected: 0.3,
        selected: 1
    }
};
/**
 * Base transition configuration
 */
var transitions = {
    default: {
        duration: 300
    },
    pie_slice_mouseover: {
        duration: 100
    },
    pie_chart_titles: {
        duration: 375
    },
    graph_element_mouseover_fill_update: {
        duration: 100
    },
    graph_element_mouseout_fill_update: {
        duration: 100
    }
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: interfaces, configurations, defaultColors, colorPalettes, SimpleBarChart, GroupedBarChart, StackedBarChart, LineChart, ScatterChart, PieChart, DonutChart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultColors", function() { return defaultColors; });
/* harmony import */ var _charts_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./charts/index */ "./src/charts/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SimpleBarChart", function() { return _charts_index__WEBPACK_IMPORTED_MODULE_0__["SimpleBarChart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupedBarChart", function() { return _charts_index__WEBPACK_IMPORTED_MODULE_0__["GroupedBarChart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StackedBarChart", function() { return _charts_index__WEBPACK_IMPORTED_MODULE_0__["StackedBarChart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LineChart", function() { return _charts_index__WEBPACK_IMPORTED_MODULE_0__["LineChart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScatterChart", function() { return _charts_index__WEBPACK_IMPORTED_MODULE_0__["ScatterChart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PieChart", function() { return _charts_index__WEBPACK_IMPORTED_MODULE_0__["PieChart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DonutChart", function() { return _charts_index__WEBPACK_IMPORTED_MODULE_0__["DonutChart"]; });

/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "configurations", function() { return _configuration__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interfaces */ "./src/interfaces/index.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "interfaces", function() { return _interfaces__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _services_colorPalettes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/colorPalettes */ "./src/services/colorPalettes.ts");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "colorPalettes", function() { return _services_colorPalettes__WEBPACK_IMPORTED_MODULE_3__; });

// Configs & interfaces



// TODO 1.0 - Remove deprecated API
var defaultColors = _services_colorPalettes__WEBPACK_IMPORTED_MODULE_3__["DEFAULT"];



/***/ }),

/***/ "./src/interfaces/enums.ts":
/*!*********************************!*\
  !*** ./src/interfaces/enums.ts ***!
  \*********************************/
/*! exports provided: ChartTheme, AxisPositions, AxisTypes, ScaleTypes, TooltipPosition, TooltipTypes, LegendPositions, LegendOrientations, LayoutDirection, LayoutGrowth, CalloutDirections */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartTheme", function() { return ChartTheme; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AxisPositions", function() { return AxisPositions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AxisTypes", function() { return AxisTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScaleTypes", function() { return ScaleTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipPosition", function() { return TooltipPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipTypes", function() { return TooltipTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LegendPositions", function() { return LegendPositions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LegendOrientations", function() { return LegendOrientations; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutDirection", function() { return LayoutDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutGrowth", function() { return LayoutGrowth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CalloutDirections", function() { return CalloutDirections; });
/**
 * enum of all supported chart themes
 */
var ChartTheme;
(function (ChartTheme) {
    ChartTheme["DEFAULT"] = "default";
    ChartTheme["G100"] = "g100";
    ChartTheme["G90"] = "g90";
    ChartTheme["G10"] = "g10";
})(ChartTheme || (ChartTheme = {}));
/**
 * enum of all possible axis positions
 */
var AxisPositions;
(function (AxisPositions) {
    AxisPositions["LEFT"] = "left";
    AxisPositions["RIGHT"] = "right";
    AxisPositions["TOP"] = "top";
    AxisPositions["BOTTOM"] = "bottom";
})(AxisPositions || (AxisPositions = {}));
var AxisTypes;
(function (AxisTypes) {
    AxisTypes["PRIMARY"] = "primary";
    AxisTypes["SECONDARY"] = "secondary";
})(AxisTypes || (AxisTypes = {}));
/**
 * enum of all possible scale types
 */
var ScaleTypes;
(function (ScaleTypes) {
    ScaleTypes["TIME"] = "time";
    ScaleTypes["LINEAR"] = "linear";
    ScaleTypes["LOG"] = "log";
    ScaleTypes["LABELS"] = "labels";
})(ScaleTypes || (ScaleTypes = {}));
/**
 * enum of supported tooltip position relative to
 */
var TooltipPosition;
(function (TooltipPosition) {
    TooltipPosition["MOUSE"] = "mouse";
    TooltipPosition["TOP"] = "top";
    TooltipPosition["BOTTOM"] = "bottom";
})(TooltipPosition || (TooltipPosition = {}));
/**
 * enum of tooltip types for custom tooltip event
 */
var TooltipTypes;
(function (TooltipTypes) {
    TooltipTypes["DATAPOINT"] = "datapoint";
    TooltipTypes["GRIDLINE"] = "gridline";
})(TooltipTypes || (TooltipTypes = {}));
/**
 * enum of all possible legend positions
 */
var LegendPositions;
(function (LegendPositions) {
    LegendPositions["RIGHT"] = "right";
    LegendPositions["LEFT"] = "left";
    LegendPositions["TOP"] = "top";
    LegendPositions["BOTTOM"] = "bottom";
})(LegendPositions || (LegendPositions = {}));
/**
 * enum of all possible legend orientations
 */
var LegendOrientations;
(function (LegendOrientations) {
    LegendOrientations["HORIZONTAL"] = "horizontal";
    LegendOrientations["VERTICAL"] = "vertical";
})(LegendOrientations || (LegendOrientations = {}));
/**
 * enum of all possible layout directions
 */
var LayoutDirection;
(function (LayoutDirection) {
    LayoutDirection["ROW"] = "row";
    LayoutDirection["COLUMN"] = "column";
    LayoutDirection["ROW_REVERSE"] = "row-reverse";
    LayoutDirection["COLUMN_REVERSE"] = "column-reverse";
})(LayoutDirection || (LayoutDirection = {}));
/**
 * enum of all possible layout growth values
 */
var LayoutGrowth;
(function (LayoutGrowth) {
    LayoutGrowth["FIXED"] = "fixed";
    LayoutGrowth["PREFERRED"] = "preferred";
    LayoutGrowth["STRETCH"] = "stretch";
})(LayoutGrowth || (LayoutGrowth = {}));
/**
 * enum of all possible callout directions
 */
var CalloutDirections;
(function (CalloutDirections) {
    CalloutDirections["LEFT"] = "left";
    CalloutDirections["RIGHT"] = "right";
})(CalloutDirections || (CalloutDirections = {}));


/***/ }),

/***/ "./src/interfaces/index.ts":
/*!*********************************!*\
  !*** ./src/interfaces/index.ts ***!
  \*********************************/
/*! exports provided: ChartTheme, AxisPositions, AxisTypes, ScaleTypes, TooltipPosition, TooltipTypes, LegendPositions, LegendOrientations, LayoutDirection, LayoutGrowth, CalloutDirections */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _enums__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enums */ "./src/interfaces/enums.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChartTheme", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["ChartTheme"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AxisPositions", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["AxisPositions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "AxisTypes", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["AxisTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScaleTypes", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["ScaleTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipPosition", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["TooltipPosition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TooltipTypes", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["TooltipTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LegendPositions", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["LegendPositions"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LegendOrientations", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["LegendOrientations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutDirection", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["LayoutDirection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutGrowth", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["LayoutGrowth"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CalloutDirections", function() { return _enums__WEBPACK_IMPORTED_MODULE_0__["CalloutDirections"]; });




/***/ }),

/***/ "./src/model-pie.ts":
/*!**************************!*\
  !*** ./src/model-pie.ts ***!
  \**************************/
/*! exports provided: PieChartModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PieChartModel", function() { return PieChartModel; });
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools */ "./src/tools.ts");
/* harmony import */ var _services_colorPalettes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/colorPalettes */ "./src/services/colorPalettes.ts");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports




// D3 Imports

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
var PieChartModel = /** @class */ (function (_super) {
    __extends(PieChartModel, _super);
    function PieChartModel(services) {
        return _super.call(this, services) || this;
    }
    PieChartModel.prototype.generateDataLabels = function (newData) {
        var dataLabels = {};
        newData.labels.forEach(function (label) {
            dataLabels[label] = _configuration__WEBPACK_IMPORTED_MODULE_0__["legend"].items.status.ACTIVE;
        });
        return dataLabels;
    };
    PieChartModel.prototype.getDisplayData = function () {
        var ACTIVE = _configuration__WEBPACK_IMPORTED_MODULE_0__["legend"].items.status.ACTIVE;
        var dataLabels = this.get("dataLabels");
        if (!this.get("data")) {
            return null;
        }
        // Remove datasets that have been disabled
        var displayData = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].clone(this.get("data"));
        var dataset = displayData.datasets[0];
        // Remove data values that correspond to labels that are disabled
        dataset.data = dataset.data.filter(function (datum, i) {
            var label = displayData.labels[i];
            return dataLabels[label] === ACTIVE;
        });
        // Remove labels that are disabled
        displayData.labels = displayData.labels.filter(function (label) { return dataLabels[label] === ACTIVE; });
        return displayData;
    };
    /*
     * Data labels
    */
    PieChartModel.prototype.toggleDataLabel = function (changedLabel) {
        var _a = _configuration__WEBPACK_IMPORTED_MODULE_0__["legend"].items.status, ACTIVE = _a.ACTIVE, DISABLED = _a.DISABLED;
        var dataLabels = this.get("dataLabels");
        var hasDeactivatedItems = Object.keys(dataLabels).some(function (label) { return dataLabels[label] === DISABLED; });
        var activeItems = Object.keys(dataLabels).filter(function (label) { return dataLabels[label] === ACTIVE; });
        // If there are deactivated items, toggle "changedLabel"
        if (hasDeactivatedItems) {
            // If the only active item is being toggled
            // Activate all items
            if (activeItems.length === 1 && activeItems[0] === changedLabel) {
                // If every item is active, then enable "changedLabel" and disable all other items
                Object.keys(dataLabels).forEach(function (label) {
                    dataLabels[label] = ACTIVE;
                });
            }
            else {
                dataLabels[changedLabel] = dataLabels[changedLabel] === DISABLED ? ACTIVE : DISABLED;
            }
        }
        else {
            // If every item is active, then enable "changedLabel" and disable all other items
            Object.keys(dataLabels).forEach(function (label) {
                dataLabels[label] = (label === changedLabel ? ACTIVE : DISABLED);
            });
        }
        // Update model
        this.set({
            dataLabels: dataLabels
        });
    };
    /*
     * Fill scales
    */
    PieChartModel.prototype.setColorScale = function () {
        var dataset = this.getDisplayData().datasets[0];
        if (dataset.fillColors) {
            this.colorScale = Object(d3_scale__WEBPACK_IMPORTED_MODULE_4__["scaleOrdinal"])().range(dataset.fillColors).domain(this.allDataLabels);
        }
        else {
            var colors = _services_colorPalettes__WEBPACK_IMPORTED_MODULE_3__["DEFAULT"];
            this.colorScale = Object(d3_scale__WEBPACK_IMPORTED_MODULE_4__["scaleOrdinal"])().range(colors).domain(this.allDataLabels);
        }
    };
    PieChartModel.prototype.getFillColor = function (label) {
        var options = this.getOptions();
        if (options.getFillColor) {
            return options.getFillColor(label);
        }
        return this.getFillScale()(label);
    };
    PieChartModel.prototype.getStrokeColor = function (label) {
        var options = this.getOptions();
        if (options.getStrokeColor) {
            return options.getStrokeColor(label);
        }
        return this.colorScale(label);
    };
    return PieChartModel;
}(_model__WEBPACK_IMPORTED_MODULE_1__["ChartModel"]));



/***/ }),

/***/ "./src/model-simple-bar.ts":
/*!*********************************!*\
  !*** ./src/model-simple-bar.ts ***!
  \*********************************/
/*! exports provided: SimpleBarChartModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SimpleBarChartModel", function() { return SimpleBarChartModel; });
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tools */ "./src/tools.ts");
/* harmony import */ var _services_colorPalettes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/colorPalettes */ "./src/services/colorPalettes.ts");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports




// D3 Imports

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
var SimpleBarChartModel = /** @class */ (function (_super) {
    __extends(SimpleBarChartModel, _super);
    function SimpleBarChartModel(services) {
        return _super.call(this, services) || this;
    }
    SimpleBarChartModel.prototype.generateDataLabels = function (newData) {
        var dataLabels = {};
        newData.labels.forEach(function (label) {
            dataLabels[label] = _configuration__WEBPACK_IMPORTED_MODULE_0__["legend"].items.status.ACTIVE;
        });
        return dataLabels;
    };
    SimpleBarChartModel.prototype.getDisplayData = function () {
        var ACTIVE = _configuration__WEBPACK_IMPORTED_MODULE_0__["legend"].items.status.ACTIVE;
        var dataLabels = this.get("dataLabels");
        if (!this.get("data")) {
            return null;
        }
        // Remove datasets that have been disabled
        var displayData = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].clone(this.get("data"));
        var dataset = displayData.datasets[0];
        // Remove data values that correspond to labels that are disabled
        dataset.data = dataset.data.filter(function (datum, i) {
            var label = displayData.labels[i];
            return dataLabels[label] === ACTIVE;
        });
        // Remove labels that are disabled
        displayData.labels = displayData.labels.filter(function (label) { return dataLabels[label] === ACTIVE; });
        return displayData;
    };
    /*
     * Fill scales
     *
    */
    SimpleBarChartModel.prototype.setColorScale = function () {
        var dataset = this.getDisplayData().datasets[0];
        if (dataset.fillColors) {
            this.colorScale = Object(d3_scale__WEBPACK_IMPORTED_MODULE_4__["scaleOrdinal"])().range(dataset.fillColors).domain(this.allDataLabels);
        }
        else {
            var colors = _services_colorPalettes__WEBPACK_IMPORTED_MODULE_3__["DEFAULT"];
            this.colorScale = Object(d3_scale__WEBPACK_IMPORTED_MODULE_4__["scaleOrdinal"])().range(colors).domain(this.allDataLabels);
        }
    };
    SimpleBarChartModel.prototype.getFillColor = function (label) {
        var options = this.getOptions();
        if (options.getFillColor) {
            return options.getFillColor(label);
        }
        else {
            return this.getFillScale()(label);
        }
    };
    SimpleBarChartModel.prototype.getStrokeColor = function (label) {
        var options = this.getOptions();
        if (options.getStrokeColor) {
            return options.getStrokeColor(label);
        }
        else {
            return this.colorScale(label);
        }
    };
    return SimpleBarChartModel;
}(_model__WEBPACK_IMPORTED_MODULE_1__["ChartModel"]));



/***/ }),

/***/ "./src/model.ts":
/*!**********************!*\
  !*** ./src/model.ts ***!
  \**********************/
/*! exports provided: ChartModel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartModel", function() { return ChartModel; });
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tools */ "./src/tools.ts");
/* harmony import */ var _services_colorPalettes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/colorPalettes */ "./src/services/colorPalettes.ts");
/* harmony import */ var d3_scale__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-scale */ "./node_modules/d3-scale/src/index.js");
// Internal Imports



// D3

/** The charting model layer which includes mainly the chart data and options,
 * as well as some misc. information to be shared among components */
var ChartModel = /** @class */ (function () {
    function ChartModel(services) {
        // Internal Model state
        this.state = {
            options: {}
        };
        // Fill scales & fill related objects
        this.patternScale = {};
        this.colorScale = {};
        this.services = services;
    }
    ChartModel.prototype.getDisplayData = function () {
        var ACTIVE = _configuration__WEBPACK_IMPORTED_MODULE_0__["legend"].items.status.ACTIVE;
        var dataLabels = this.get("dataLabels");
        if (!this.get("data")) {
            return null;
        }
        // Remove datasets that have been disabled
        var displayData = _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].clone(this.get("data"));
        displayData.datasets = displayData.datasets.filter(function (dataset) {
            return dataLabels[dataset.label] === ACTIVE;
        });
        return displayData;
    };
    ChartModel.prototype.getData = function () {
        return this.get("data");
    };
    /**
     *
     * @param newData The new raw data to be set
     */
    ChartModel.prototype.setData = function (newData) {
        var dataLabels = this.generateDataLabels(newData);
        this.set({
            data: newData,
            dataLabels: dataLabels
        });
        return this.state.data;
    };
    ChartModel.prototype.generateDataLabels = function (newData) {
        var dataLabels = {};
        newData.datasets.forEach(function (dataset) {
            dataLabels[dataset.label] = _configuration__WEBPACK_IMPORTED_MODULE_0__["legend"].items.status.ACTIVE;
        });
        return dataLabels;
    };
    /**
     * @return {Object} The chart's options
     */
    ChartModel.prototype.getOptions = function () {
        return this.state.options;
    };
    ChartModel.prototype.set = function (newState, skipUpdate) {
        if (skipUpdate === void 0) { skipUpdate = false; }
        this.state = Object.assign({}, this.state, newState);
        if (!skipUpdate) {
            this.update();
        }
    };
    ChartModel.prototype.get = function (property) {
        if (property) {
            return this.state[property];
        }
        else {
            return this.state;
        }
    };
    /**
     *
     * @param newOptions New options to be set
     */
    ChartModel.prototype.setOptions = function (newOptions) {
        this.set({
            options: _tools__WEBPACK_IMPORTED_MODULE_1__["Tools"].merge(this.getOptions(), newOptions)
        });
    };
    /**
     *
     * Updates miscellanous information within the model
     * such as the color scales, or the legend data labels
     */
    ChartModel.prototype.update = function () {
        if (!this.getDisplayData()) {
            return;
        }
        this.updateAllDataLabels();
        this.setColorScale();
        this.services.events.dispatchEvent("model-update");
    };
    ChartModel.prototype.setUpdateCallback = function (cb) {
        this.updateCallback = cb;
    };
    /*
     * Data labels
    */
    ChartModel.prototype.toggleDataLabel = function (changedLabel) {
        var _a = _configuration__WEBPACK_IMPORTED_MODULE_0__["legend"].items.status, ACTIVE = _a.ACTIVE, DISABLED = _a.DISABLED;
        var dataLabels = this.get("dataLabels");
        var hasDeactivatedItems = Object.keys(dataLabels).some(function (label) { return dataLabels[label] === DISABLED; });
        var activeItems = Object.keys(dataLabels).filter(function (label) { return dataLabels[label] === ACTIVE; });
        // If there are deactivated items, toggle "changedLabel"
        if (hasDeactivatedItems) {
            // If the only active item is being toggled
            // Activate all items
            if (activeItems.length === 1 && activeItems[0] === changedLabel) {
                // If every item is active, then enable "changedLabel" and disable all other items
                Object.keys(dataLabels).forEach(function (label) {
                    dataLabels[label] = ACTIVE;
                });
            }
            else {
                dataLabels[changedLabel] = dataLabels[changedLabel] === DISABLED ? ACTIVE : DISABLED;
            }
        }
        else {
            // If every item is active, then enable "changedLabel" and disable all other items
            Object.keys(dataLabels).forEach(function (label) {
                dataLabels[label] = (label === changedLabel ? ACTIVE : DISABLED);
            });
        }
        // Update model
        this.set({
            dataLabels: dataLabels
        });
    };
    /*
     * Fill scales
    */
    ChartModel.prototype.setColorScale = function () {
        var _this = this;
        if (this.getDisplayData().datasets[0].fillColors) {
            this.getDisplayData().datasets.forEach(function (dataset) {
                _this.colorScale[dataset.label] = Object(d3_scale__WEBPACK_IMPORTED_MODULE_3__["scaleOrdinal"])().range(dataset.fillColors).domain(_this.allDataLabels);
            });
        }
        else {
            var colors_1 = _services_colorPalettes__WEBPACK_IMPORTED_MODULE_2__["DEFAULT"];
            this.getDisplayData().datasets.forEach(function (dataset, i) {
                _this.colorScale[dataset.label] = Object(d3_scale__WEBPACK_IMPORTED_MODULE_3__["scaleOrdinal"])().range([colors_1[i]]).domain(_this.allDataLabels);
            });
        }
    };
    ChartModel.prototype.getFillColor = function (datasetLabel, label, value) {
        var options = this.getOptions();
        if (options.getFillColor) {
            return options.getFillColor(datasetLabel, label, value);
        }
        else {
            return this.getFillScale()[datasetLabel](label);
        }
    };
    ChartModel.prototype.getStrokeColor = function (datasetLabel, label, value) {
        var options = this.getOptions();
        if (options.getStrokeColor) {
            return options.getStrokeColor(datasetLabel, label, value);
        }
        else {
            return this.colorScale[datasetLabel](label);
        }
    };
    ChartModel.prototype.getFillScale = function () {
        // Choose patternScale or colorScale based on the "accessibility" flag
        // return this.get("options").accessibility ? this.patternScale : this.colorScale;
        return this.colorScale;
    };
    /*
     * Data labels
    */
    ChartModel.prototype.updateAllDataLabels = function () {
        var _this = this;
        // If allDataLabels hasn't been initialized yet
        // Set it to the current set of chart labels
        if (!this.allDataLabels) {
            this.allDataLabels = this.getDisplayData().labels;
        }
        else {
            // Loop through current chart labels
            this.getDisplayData().labels.forEach(function (label) {
                // If label hasn't been stored yet, store it
                if (_this.allDataLabels.indexOf(label) === -1) {
                    _this.allDataLabels.push(label);
                }
            });
        }
    };
    return ChartModel;
}());



/***/ }),

/***/ "./src/services/axes.ts":
/*!******************************!*\
  !*** ./src/services/axes.ts ***!
  \******************************/
/*! exports provided: Axes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Axes", function() { return Axes; });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./service */ "./src/services/service.ts");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../interfaces */ "./src/interfaces/index.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports


var Axes = /** @class */ (function (_super) {
    __extends(Axes, _super);
    function Axes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Find the main x-axis out of the 2 x-axis on the chart (when 2D axis is used)
    Axes.prototype.getMainXAxis = function () {
        var primaryAxis = this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisTypes"].PRIMARY);
        var secondaryAxis = this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisTypes"].SECONDARY);
        if (primaryAxis === this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].TOP) || primaryAxis === this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].BOTTOM)) {
            return primaryAxis;
        }
        else if (secondaryAxis === this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].TOP) || secondaryAxis === this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].BOTTOM)) {
            return secondaryAxis;
        }
        else {
            return this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].BOTTOM);
        }
    };
    // Find the main y-axis out of the 2 y-axis on the chart (when 2D axis is used)
    Axes.prototype.getMainYAxis = function () {
        var primaryAxis = this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisTypes"].PRIMARY);
        var secondaryAxis = this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisTypes"].SECONDARY);
        if (primaryAxis === this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].LEFT) || primaryAxis === this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].RIGHT)) {
            return primaryAxis;
        }
        else if (secondaryAxis === this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].LEFT) || secondaryAxis === this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].RIGHT)) {
            return secondaryAxis;
        }
        else {
            return this.model.get(_interfaces__WEBPACK_IMPORTED_MODULE_1__["AxisPositions"].LEFT);
        }
    };
    Axes.prototype.getXValue = function (d, i) {
        return this.getMainXAxis().getValueFromScale(d, i);
    };
    Axes.prototype.getYValue = function (d, i) {
        return this.getMainYAxis().getValueFromScale(d, i);
    };
    /** Uses the primary Y Axis to get data items associated with that value.  */
    Axes.prototype.getDataFromDomain = function (domainValue) {
        var displayData = this.model.getDisplayData();
        var activePoints = [];
        var scaleType = this.getMainXAxis().scaleType;
        switch (scaleType) {
            case _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].LABELS:
                // based on labels we use the index to get the associated data
                var index_1 = displayData.labels.indexOf(domainValue);
                displayData.datasets.forEach(function (dataset) {
                    activePoints.push({
                        datasetLabel: dataset.label,
                        value: dataset.data[index_1],
                    });
                });
                break;
            case _interfaces__WEBPACK_IMPORTED_MODULE_1__["ScaleTypes"].TIME:
                // time series we filter using the date
                var domainKey_1 = Object.keys(displayData.datasets[0].data[0]).filter(function (key) { return key !== "value"; })[0];
                displayData.datasets.forEach(function (dataset) {
                    var sharedLabel = dataset.label;
                    // filter the items in each dataset for the points associated with the Domain
                    var dataItems = dataset.data.filter(function (item) {
                        var date1 = new Date(item[domainKey_1]);
                        var date2 = new Date(domainValue);
                        return date1.getTime() === date2.getTime();
                    });
                    // assign the shared label on the data items and add them to the array
                    dataItems.forEach(function (item) {
                        activePoints.push(Object.assign({ datasetLabel: sharedLabel,
                            value: item.value,
                        }, item));
                    });
                });
                break;
        }
        return activePoints;
    };
    return Axes;
}(_service__WEBPACK_IMPORTED_MODULE_0__["Service"]));



/***/ }),

/***/ "./src/services/colorPalettes.ts":
/*!***************************************!*\
  !*** ./src/services/colorPalettes.ts ***!
  \***************************************/
/*! exports provided: WHITE, DARK, G10, G90, G100, DEFAULT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WHITE", function() { return WHITE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DARK", function() { return DARK; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G10", function() { return G10; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G90", function() { return G90; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "G100", function() { return G100; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT", function() { return DEFAULT; });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./src/services/colors.ts");

// TODO - Some hardcoded values aren't available
// in @carbon/colors yet. We should look at adding those
// colors
var WHITE = [
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].purple(70),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].cyan(50),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].teal(70),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].magenta(70),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].red(50),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].red(90),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].green(60),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].blue(80),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].magenta(50),
    "#b28600",
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].teal(50),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].cyan(90),
    "#8a3800",
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].purple(50)
];
var DARK = [
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].purple(60),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].cyan(40),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].teal(60),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].magenta(40),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].red(50),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].red(10),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].green(30),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].blue(50),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].magenta(60),
    "#d2a106",
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].teal(40),
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].cyan(20),
    "#ba4e00",
    _colors__WEBPACK_IMPORTED_MODULE_0__["default"].purple(30)
];
var G10 = WHITE;
var G90 = DARK;
var G100 = DARK;
var DEFAULT = WHITE;


/***/ }),

/***/ "./src/services/colors.ts":
/*!********************************!*\
  !*** ./src/services/colors.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _carbon_colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @carbon/colors */ "../../node_modules/@carbon/colors/es/index.js");

var getColor = function (obj, shade) { return obj[shade]; };
/* harmony default export */ __webpack_exports__["default"] = ({
    blue: function (shade) { return getColor(_carbon_colors__WEBPACK_IMPORTED_MODULE_0__["blue"], shade); },
    cyan: function (shade) { return getColor(_carbon_colors__WEBPACK_IMPORTED_MODULE_0__["cyan"], shade); },
    green: function (shade) { return getColor(_carbon_colors__WEBPACK_IMPORTED_MODULE_0__["green"], shade); },
    magenta: function (shade) { return getColor(_carbon_colors__WEBPACK_IMPORTED_MODULE_0__["magenta"], shade); },
    purple: function (shade) { return getColor(_carbon_colors__WEBPACK_IMPORTED_MODULE_0__["purple"], shade); },
    red: function (shade) { return getColor(_carbon_colors__WEBPACK_IMPORTED_MODULE_0__["red"], shade); },
    teal: function (shade) { return getColor(_carbon_colors__WEBPACK_IMPORTED_MODULE_0__["teal"], shade); }
});


/***/ }),

/***/ "./src/services/curves.ts":
/*!********************************!*\
  !*** ./src/services/curves.ts ***!
  \********************************/
/*! exports provided: Curves */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Curves", function() { return Curves; });
/* harmony import */ var d3_shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-shape */ "../../node_modules/d3-shape/src/index.js");
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service */ "./src/services/service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

// Internal Imports

var Curves = /** @class */ (function (_super) {
    __extends(Curves, _super);
    function Curves() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.curveTypes = {
            curveLinear: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveLinear"],
            curveLinearClosed: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveLinearClosed"],
            curveBasis: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveBasis"],
            curveBasisClosed: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveBasisClosed"],
            curveBasisOpen: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveBasisOpen"],
            curveBundle: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveBundle"],
            curveCardinal: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCardinal"],
            curveCardinalClosed: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCardinalClosed"],
            curveCardinalOpen: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCardinalOpen"],
            curveCatmullRom: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCatmullRom"],
            curveCatmullRomClosed: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCatmullRomClosed"],
            curveCatmullRomOpen: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveCatmullRomOpen"],
            curveMonotoneX: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveMonotoneX"],
            curveMonotoneY: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveMonotoneY"],
            curveNatural: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveNatural"],
            curveStep: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveStep"],
            curveStepAfter: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveStepAfter"],
            curveStepBefore: d3_shape__WEBPACK_IMPORTED_MODULE_0__["curveStepBefore"]
        };
        return _this;
    }
    Curves.prototype.getD3Curve = function () {
        var curveName = "curveLinear";
        var curveOptions = this.model.getOptions().curve;
        // Parse curve type whether the user provided a string
        // Or an object with more options
        if (curveOptions) {
            if (typeof curveOptions === "string") { // curve: 'string'
                curveName = curveOptions;
            }
            else { // curve: { name: 'string' }
                curveName = curveOptions.name;
            }
        }
        if (this.curveTypes[curveName]) {
            // Grab correct d3 curve function
            var curve_1 = this.curveTypes[curveName];
            // Apply user-provided options to the d3 curve
            if (curveOptions) {
                Object.keys(curveOptions).forEach(function (optionName) {
                    if (curve_1[optionName]) {
                        curve_1 = curve_1[optionName](curveOptions[optionName]);
                    }
                });
            }
            return curve_1;
        }
        console.warn("The curve type '" + curveName + "' is invalid, using 'curveLinear' instead");
        return this.curveTypes["curveLinear"];
    };
    return Curves;
}(_service__WEBPACK_IMPORTED_MODULE_1__["Service"]));



/***/ }),

/***/ "./src/services/essentials/dom-utils.ts":
/*!**********************************************!*\
  !*** ./src/services/essentials/dom-utils.ts ***!
  \**********************************************/
/*! exports provided: DOMUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMUtils", function() { return DOMUtils; });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service */ "./src/services/service.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! carbon-components/src/globals/js/settings */ "../../node_modules/carbon-components/src/globals/js/settings.js");
/* harmony import */ var carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! resize-observer-polyfill */ "../../node_modules/resize-observer-polyfill/dist/ResizeObserver.es.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports

// D3 Imports


// import the settings for the css prefix

// MISC

var DOMUtils = /** @class */ (function (_super) {
    __extends(DOMUtils, _super);
    function DOMUtils() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DOMUtils.getSVGElementSize = function (svgSelector, options) {
        if (!svgSelector.attr) {
            svgSelector = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(svgSelector);
        }
        var attrDimensions = {
            width: svgSelector.attr("width"),
            height: svgSelector.attr("height")
        };
        var bbox, bboxDimensions, boundingRect, boundingRectDimensions;
        // In many versions of Firefox
        // getBBox will cause an "NSFailure" error
        try {
            bbox = svgSelector.node().getBBox();
            bboxDimensions = {
                width: bbox.width,
                height: bbox.height
            };
        }
        catch (e) { }
        try {
            boundingRect = svgSelector.node().getBoundingClientRect();
            boundingRectDimensions = {
                width: boundingRect.width,
                height: boundingRect.height
            };
        }
        catch (e) { }
        var clientDimensions = {
            width: svgSelector.node().clientWidth,
            height: svgSelector.node().clientHeight
        };
        var validateDimensions = function (dimensions) {
            if (dimensions && dimensions.width && dimensions.height &&
                !isNaN(dimensions.height) && !isNaN(dimensions.width) &&
                ("" + dimensions.width + dimensions.height).indexOf("%") === -1 &&
                dimensions.width > 0 && dimensions.height > 0) {
                return true;
            }
            return false;
        };
        // If both attribute values are numbers
        // And not percentages or NaN
        if (options) {
            if (options.useAttrs && validateDimensions(attrDimensions)) {
                return attrDimensions;
            }
            if (options.useClientDimensions && validateDimensions(clientDimensions)) {
                return clientDimensions;
            }
            if (options.useBBox && validateDimensions(bboxDimensions)) {
                return bboxDimensions;
            }
            if (options.useBoundingRect && validateDimensions(boundingRectDimensions)) {
                return boundingRectDimensions;
            }
        }
        try {
            var nativeDimensions = {
                width: _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(svgSelector.node(), "width", "baseVal", "value"),
                height: _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(svgSelector.node(), "height", "baseVal", "value")
            };
            if (validateDimensions(nativeDimensions)) {
                return nativeDimensions;
            }
        }
        catch (e) {
            if (validateDimensions(clientDimensions)) {
                return clientDimensions;
            }
            if (validateDimensions(bboxDimensions)) {
                return bboxDimensions;
            }
            if (validateDimensions(attrDimensions)) {
                return attrDimensions;
            }
        }
        return {
            width: 0,
            height: 0
        };
    };
    DOMUtils.appendOrSelect = function (parent, query) {
        var querySections = query.split(".");
        var elementToAppend = querySections[0];
        var selection = parent.select(query);
        if (selection.empty()) {
            return parent.append(elementToAppend)
                .attr("class", querySections.slice(1).join(" "));
        }
        return selection;
    };
    DOMUtils.prototype.init = function () {
        // Add width & height to the chart holder if necessary, and add a classname
        this.styleHolderElement();
        // Add main SVG
        this.addSVGElement();
        if (this.model.getOptions().resizable) {
            this.addResizeListener();
        }
    };
    DOMUtils.prototype.styleHolderElement = function () {
        var holderElement = this.getHolder();
        var _a = this.model.getOptions(), width = _a.width, height = _a.height;
        // Add class to chart holder
        Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this.getHolder()).classed(carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3___default.a.prefix + "--chart-holder", true);
        // If width exists in options
        if (width) {
            // Apply formatted width attribute to chart
            holderElement.style.width = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].formatWidthHeightValues(width);
        }
        // If height exists in options
        if (height) {
            // Apply formatted height attribute to chart
            holderElement.style.height = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].formatWidthHeightValues(height);
        }
    };
    DOMUtils.prototype.getHolder = function () {
        return this.model.get("holder");
    };
    DOMUtils.prototype.addSVGElement = function () {
        var chartsprefix = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(this.model.getOptions(), "style", "prefix");
        var svg = Object(d3_selection__WEBPACK_IMPORTED_MODULE_1__["select"])(this.getHolder())
            .append("svg")
            .classed(carbon_components_src_globals_js_settings__WEBPACK_IMPORTED_MODULE_3___default.a.prefix + "--" + chartsprefix + "--chart-svg", true)
            .attr("height", "100%")
            .attr("width", "100%");
        this.svg = svg.node();
    };
    DOMUtils.prototype.getMainSVG = function () {
        return this.svg;
    };
    DOMUtils.prototype.addResizeListener = function () {
        var _this = this;
        var holder = this.getHolder();
        if (!holder) {
            return;
        }
        // Grab current dimensions of the chart holder
        var containerWidth = holder.clientWidth;
        var containerHeight = holder.clientHeight;
        // The resize callback function
        var resizeCallback = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].debounce(function (entries, observer) {
            if (!holder) {
                return;
            }
            if (Math.abs(containerWidth - holder.clientWidth) > 1
                || Math.abs(containerHeight - holder.clientHeight) > 1) {
                containerWidth = holder.clientWidth;
                containerHeight = holder.clientHeight;
                _this.services.events.dispatchEvent("chart-resize");
            }
        }, 12.5);
        // Observe the behaviour of resizing on the holder
        var resizeObserver = new resize_observer_polyfill__WEBPACK_IMPORTED_MODULE_4__["default"](resizeCallback);
        resizeObserver.observe(holder);
    };
    return DOMUtils;
}(_service__WEBPACK_IMPORTED_MODULE_0__["Service"]));



/***/ }),

/***/ "./src/services/essentials/events.ts":
/*!*******************************************!*\
  !*** ./src/services/essentials/events.ts ***!
  \*******************************************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service */ "./src/services/service.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports

var Events = /** @class */ (function (_super) {
    __extends(Events, _super);
    function Events() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Events.prototype.init = function () {
        // Setup the event fragment on the DOM
        this.documentFragment = document.createDocumentFragment();
    };
    Events.prototype.addEventListener = function (type, listener) {
        // Need the casting to any here since typescript
        // Is expecting a function of type EventListenerOrEventListenerObject here
        // Which seems unreasonable
        this.documentFragment.addEventListener(type, listener);
    };
    Events.prototype.removeEventListener = function (type, listener) {
        // Need the casting to any here since typescript
        // Is expecting a function of type EventListenerOrEventListenerObject here
        // Which seems unreasonable
        this.documentFragment.removeEventListener(type, listener);
    };
    Events.prototype.dispatchEvent = function (eventType, eventDetail) {
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
        this.documentFragment.dispatchEvent(newEvent);
    };
    return Events;
}(_service__WEBPACK_IMPORTED_MODULE_0__["Service"]));



/***/ }),

/***/ "./src/services/essentials/themes.ts":
/*!*******************************************!*\
  !*** ./src/services/essentials/themes.ts ***!
  \*******************************************/
/*! exports provided: Themes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Themes", function() { return Themes; });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service */ "./src/services/service.ts");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../interfaces */ "./src/interfaces/index.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-selection */ "../../node_modules/d3-selection/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports




var Themes = /** @class */ (function (_super) {
    __extends(Themes, _super);
    function Themes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Themes.prototype.init = function () {
        this.setTheme();
    };
    Themes.prototype.update = function () {
        this.setTheme();
    };
    Themes.prototype.setTheme = function () {
        var holderElement = this.services.domUtils.getHolder();
        var theme = _tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(this.model.getOptions(), "theme");
        if (theme !== _interfaces__WEBPACK_IMPORTED_MODULE_1__["ChartTheme"].DEFAULT) {
            Object(d3_selection__WEBPACK_IMPORTED_MODULE_3__["select"])(holderElement).classed("carbon--theme--" + theme, true);
        }
    };
    return Themes;
}(_service__WEBPACK_IMPORTED_MODULE_0__["Service"]));



/***/ }),

/***/ "./src/services/essentials/transitions.ts":
/*!************************************************!*\
  !*** ./src/services/essentials/transitions.ts ***!
  \************************************************/
/*! exports provided: Transitions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Transitions", function() { return Transitions; });
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service */ "./src/services/service.ts");
/* harmony import */ var _configuration__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../configuration */ "./src/configuration.ts");
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tools */ "./src/tools.ts");
/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-transition */ "../../node_modules/d3-transition/src/index.js");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// Internal Imports



// D3 Imports

var Transitions = /** @class */ (function (_super) {
    __extends(Transitions, _super);
    function Transitions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pendingTransitions = {};
        return _this;
    }
    // transitions: Transition<any, any, any, any>[];
    Transitions.prototype.init = function () {
        var _this = this;
        this.services.events
            .addEventListener("model-update", function () {
            _this.pendingTransitions = {};
        });
    };
    Transitions.prototype.getTransition = function (name, animate) {
        var _this = this;
        if (this.model.getOptions().animations === false || animate === false) {
            return this.getInstantTransition(name);
        }
        var t = Object(d3_transition__WEBPACK_IMPORTED_MODULE_3__["transition"])(name)
            .duration(_tools__WEBPACK_IMPORTED_MODULE_2__["Tools"].getProperty(_configuration__WEBPACK_IMPORTED_MODULE_1__["transitions"], name, "duration") || _configuration__WEBPACK_IMPORTED_MODULE_1__["transitions"].default.duration);
        this.pendingTransitions[t._id] = t;
        t.on("end", function () {
            delete _this.pendingTransitions[t._id];
        });
        return t;
    };
    Transitions.prototype.getInstantTransition = function (name) {
        var _this = this;
        var t = Object(d3_transition__WEBPACK_IMPORTED_MODULE_3__["transition"])(name).duration(0);
        this.pendingTransitions[t._id] = t;
        t.on("end", function () {
            delete _this.pendingTransitions[t._id];
        });
        return t;
    };
    Transitions.prototype.getPendingTransitions = function () {
        return this.pendingTransitions;
    };
    return Transitions;
}(_service__WEBPACK_IMPORTED_MODULE_0__["Service"]));



/***/ }),

/***/ "./src/services/index.ts":
/*!*******************************!*\
  !*** ./src/services/index.ts ***!
  \*******************************/
/*! exports provided: DOMUtils, Events, Themes, Transitions, Axes, Curves */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _essentials_dom_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./essentials/dom-utils */ "./src/services/essentials/dom-utils.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DOMUtils", function() { return _essentials_dom_utils__WEBPACK_IMPORTED_MODULE_0__["DOMUtils"]; });

/* harmony import */ var _essentials_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./essentials/events */ "./src/services/essentials/events.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return _essentials_events__WEBPACK_IMPORTED_MODULE_1__["Events"]; });

/* harmony import */ var _essentials_themes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./essentials/themes */ "./src/services/essentials/themes.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Themes", function() { return _essentials_themes__WEBPACK_IMPORTED_MODULE_2__["Themes"]; });

/* harmony import */ var _essentials_transitions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./essentials/transitions */ "./src/services/essentials/transitions.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Transitions", function() { return _essentials_transitions__WEBPACK_IMPORTED_MODULE_3__["Transitions"]; });

/* harmony import */ var _axes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./axes */ "./src/services/axes.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Axes", function() { return _axes__WEBPACK_IMPORTED_MODULE_4__["Axes"]; });

/* harmony import */ var _curves__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./curves */ "./src/services/curves.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Curves", function() { return _curves__WEBPACK_IMPORTED_MODULE_5__["Curves"]; });

// Essentials




// MISC




/***/ }),

/***/ "./src/services/service.ts":
/*!*********************************!*\
  !*** ./src/services/service.ts ***!
  \*********************************/
/*! exports provided: Service */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Service", function() { return Service; });
var Service = /** @class */ (function () {
    function Service(model, services) {
        this.model = model;
        this.services = services;
        this.init();
    }
    Service.prototype.init = function () { };
    Service.prototype.update = function () { };
    // Used to pass down information to the components
    Service.prototype.setModel = function (newObj) {
        this.model = newObj;
    };
    // Used to pass down services to the components
    Service.prototype.setServices = function (newObj) {
        this.services = newObj;
    };
    return Service;
}());



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
/* harmony import */ var lodash_es__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash-es */ "../../node_modules/lodash-es/lodash.js");

// Functions
var Tools;
(function (Tools) {
    // Export these functions from lodash
    Tools.debounce = lodash_es__WEBPACK_IMPORTED_MODULE_0__["debounce"];
    Tools.clone = lodash_es__WEBPACK_IMPORTED_MODULE_0__["cloneDeep"];
    Tools.merge = lodash_es__WEBPACK_IMPORTED_MODULE_0__["merge"];
    Tools.removeArrayDuplicates = lodash_es__WEBPACK_IMPORTED_MODULE_0__["uniq"];
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
    /**
     * Returns an elements's x and y translations from attribute transform
     * @param {HTMLElement} element
     * @returns an object containing the x and y translations or null
     */
    function getTranslationValues(elementRef) {
        // regex to ONLY get values for translate (instead of all rotate, translate, skew, etc)
        var translateRegex = /translate\([0-9]+\.?[0-9]*,[0-9]+\.?[0-9]*\)/;
        var transformStr = elementRef.getAttribute("transform").match(translateRegex);
        // check for the match
        if (transformStr[0]) {
            var transforms = transformStr[0].replace(/translate\(/, "").replace(/\)/, "").split(",");
            return {
                tx: transforms[0],
                ty: transforms[1]
            };
        }
        return null;
    }
    Tools.getTranslationValues = getTranslationValues;
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
    function formatWidthHeightValues(value) {
        var stringValue = value.toString();
        // If the value provided contains any letters
        // Return it the same way
        if (stringValue.match(/[a-z]/i)) {
            return stringValue;
        }
        return stringValue + "px";
    }
    Tools.formatWidthHeightValues = formatWidthHeightValues;
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
     * Get the percentage of a datapoint compared to the entire data-set.
     * Returns 1 significant digit if percentage is less than 1%.
     * @export
     * @param {any} item
     * @param {any} fullData
     * @returns The percentage in the form of a number
     */
    function convertValueToPercentage(item, fullData) {
        var percentage = item / fullData.reduce(function (accum, val) { return accum + val.value; }, 0) * 100;
        return percentage < 1 ? percentage.toPrecision(1) : Math.floor(percentage);
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
    // ================================================================================
    Tools.getProperty = function (object) {
        var propPath = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            propPath[_i - 1] = arguments[_i];
        }
        var position = object;
        if (position) {
            for (var _a = 0, propPath_1 = propPath; _a < propPath_1.length; _a++) {
                var prop = propPath_1[_a];
                if (position[prop]) {
                    position = position[prop];
                }
                else {
                    return null;
                }
            }
            return position;
        }
        return null;
    };
})(Tools || (Tools = {}));


/***/ })

/******/ });
});
//# sourceMappingURL=index.js.map