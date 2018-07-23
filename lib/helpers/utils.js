'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getQueryObjectFromString = exports.stripTrailingSlash = exports.clone = exports.setSelectedFitersFieldsToTrue = exports.setAllFieldsToFalse = exports.getObjectValuesFromQueryString = exports.stringifyQueryParams = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Utility function used by SearchKit to convert an object consisting of parameters into query string format
 * @param  {object} obj Object which needs to be converted to string
 * @return {String}
 */
var stringifyQueryParams = exports.stringifyQueryParams = function stringifyQueryParams(obj) {
	var ignorePage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	var returnStr = '';
	if (obj.page && ignorePage) {
		delete obj.page;
	}
	var array = (0, _keys2.default)(obj).map(function (v) {
		if (obj[v].constructor === Array) {
			return v + '=[' + obj[v].toString() + ']';
		}
		return v + '=' + obj[v].toString();
	});
	returnStr = array.join('&');
	return returnStr;
};

/**
 * Utility function used by SearchKit to extract values from the value string and convert each value into appropriate type
 * @param  {object} object with key and value pairs where value is always a string which is yet to be processed
 * @return {object}
 */
var getObjectValuesFromQueryString = exports.getObjectValuesFromQueryString = function getObjectValuesFromQueryString(obj) {
	var returnObj = {};

	var booleanArr = ['true', 'false'];

	(0, _keys2.default)(obj).map(function (v) {
		var value = obj[v];
		// value = decode(value);
		var flag = false;
		if (value.indexOf('[') > -1) {
			value = value.substring(1, value.length - 1);
			flag = true;
		}
		if (flag) {
			var arr = value.split(',');
			value = arr.map(function (member) {
				if (booleanArr.indexOf(member) > -1) {
					return JSON.parse(member);
				}
				return member;
			});
		}
		returnObj[v] = value;
		return null;
	});
	return returnObj;
};

/**
 * Util used by searchKit to set all fields checked value to a defaultValue
 * @param  {[type]}  fields       [description]
 * @param  {Boolean} defaultValue [description]
 * @return {[type]}               [description]
 */
var setAllFieldsToFalse = exports.setAllFieldsToFalse = function setAllFieldsToFalse(fields) {
	var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	(0, _keys2.default)(fields).map(function (v, index) {
		var innerFields = fields[v].values;
		if (typeof innerFields !== 'undefined') {
			(0, _keys2.default)(innerFields).map(function (y) {
				innerFields[y].checked = defaultValue;
				return null;
			});
		}
		return null;
	});
	return fields;
};

/**
 * Util used by the searchKit HOC to set the fields values
 * based on the selected filters(using fieldValues Object
 * which is extracted from the url)
 * @param  {[type]} fieldValues [description]
 * @param  {[type]} fields      [description]
 * @return {[type]}             [description]
 */
var setSelectedFitersFieldsToTrue = exports.setSelectedFitersFieldsToTrue = function setSelectedFitersFieldsToTrue(fieldValues, fields) {
	if ((0, _keys2.default)(fieldValues).length !== 0) {
		var x = (0, _keys2.default)(fieldValues).map(function (v, index) {
			var urlFieldValues = fieldValues[v];
			if (fields[v] !== undefined) {
				var innerFields = fields[v].values;
				(0, _keys2.default)(innerFields).map(function (y) {
					var indexOfStaticFieldInQueryObject = urlFieldValues.indexOf(innerFields[y].value);
					if (indexOfStaticFieldInQueryObject > -1) {
						innerFields[y].checked = true;
					}
					return null;
				});
			}
			return null;
		});
	}
	return fields;
};

var clone = exports.clone = function clone(o) {
	var v = void 0;
	var _key = void 0;
	var _out = Array.isArray(o) ? [] : {};
	for (_key in o) {
		v = o[_key];
		_out[_key] = (typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) === 'object' ? clone(v) : v;
	}
	return _out;
};

var stripTrailingSlash = exports.stripTrailingSlash = function stripTrailingSlash(str) {
	if (str.substr(-1) === '/') {
		return str.substr(0, str.length - 1);
	}
	return str;
};

var getQueryObjectFromString = exports.getQueryObjectFromString = function getQueryObjectFromString(query) {
	return _queryString2.default.parse(query);
};