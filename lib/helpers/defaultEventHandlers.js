'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

exports.defaultOnSelectOptionClickHandler = defaultOnSelectOptionClickHandler;
exports.defaultMultiCheckBoxClickHandler = defaultMultiCheckBoxClickHandler;
exports.defaultOnRadioButtonToggleHandler = defaultOnRadioButtonToggleHandler;
exports.defaultOnPillCloseHandler = defaultOnPillCloseHandler;
exports.defaultInputRangeSliderClickHandler = defaultInputRangeSliderClickHandler;
exports.defaultOnChangeDateRangeHandler = defaultOnChangeDateRangeHandler;
exports.defaultOnClearClickHandler = defaultOnClearClickHandler;
exports.defaultOnApplyClickHandler = defaultOnApplyClickHandler;
exports.defaultOnClearAllClickHandler = defaultOnClearAllClickHandler;

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Default Handler to the Select Component used by SearchKit HOC if you do not override the handler
 * SearchKit expects handler to change the url appropriately when any event occurs
 * Handler is bound to searchKit.
 * @param  {[type]} name
 * @param  {[type]} label
 * @param  {[type]} value
 * @param  {[type]} event                           event object
 * @param  {[type]} specialArgumentsForSearchKit    Object which contains extra arguments needed to populate the URL from an existing object
 * @return {none}
 */
function defaultOnSelectOptionClickHandler(name, label, value, event, specialArgumentsForSearchKit) {
	var key = specialArgumentsForSearchKit.urlCode;
	var queryObject = specialArgumentsForSearchKit.fieldValues;
	var pathname = (0, _utils.stripTrailingSlash)(specialArgumentsForSearchKit.pathname);
	queryObject[key] = [value];

	if (this.isMobile) {
		var filters = this.state.filters;

		var newState = (0, _assign2.default)({}, filters, { fieldValues: queryObject });
		this.setState({
			filters: newState
		});
	} else {
		var history = this.props.history;

		var url = (0, _utils.stringifyQueryParams)(queryObject);
		history.push(pathname + '/?' + url);
	}
}

/**
 * Default Handler to the Checkbox Component used by the SearchKit HOC if you do not override the existing handler
 * SearchKit expects handler to change appropriately the url when any event occurs
 * @param  {[type]} event                        [description]
 * @param  {[type]} specialArgumentsForSearchKit  Object which contains extra arguments needed to populate the URL from an existing object
 * @return {none}
 */
// import { browserHistory } from 'react-router';
function defaultMultiCheckBoxClickHandler(event, specialArgumentsForSearchKit) {
	var key = specialArgumentsForSearchKit.urlCode;
	var queryObject = specialArgumentsForSearchKit.fieldValues;
	var pathname = (0, _utils.stripTrailingSlash)(specialArgumentsForSearchKit.pathname);
	var value = specialArgumentsForSearchKit.value;
	if (queryObject[key] !== undefined) {
		var arr = queryObject[key];
		var ind = -1;
		if ((ind = arr.indexOf(value)) > -1) {
			arr.splice(ind, 1);
			if (arr.length > 0) {
				queryObject[key] = arr;
			} else {
				delete queryObject[key];
			}
		} else {
			var _queryObject$key;

			(_queryObject$key = queryObject[key]).push.apply(_queryObject$key, [value]);
		}
	} else {
		queryObject[key] = [value];
	}

	if (this.isMobile) {
		var filters = this.state.filters;

		var newState = (0, _assign2.default)({}, filters, { fieldValues: queryObject });
		this.setState({
			filters: newState
		});
	} else {
		var history = this.props.history;

		var url = (0, _utils.stringifyQueryParams)(queryObject);
		history.push(pathname + '/?' + url);
	}
}

/**
 * Default Handler to the RadioButton Component used by the SearchKit HOC if you do not override the handler
 * SearchKit expects handler to change appropriately the url when any event occurs
 * @param  {[type]} event                        [description]
 * @param  {[type]} specialArgumentsForSearchKit  Object which contains extra arguments needed to populate the URL from an existing object
 * @return {none}
 */
function defaultOnRadioButtonToggleHandler(event, specialArgumentsForSearchKit) {
	var key = specialArgumentsForSearchKit.urlCode;
	var queryObject = specialArgumentsForSearchKit.fieldValues;
	var pathname = (0, _utils.stripTrailingSlash)(specialArgumentsForSearchKit.pathname);
	if (specialArgumentsForSearchKit.checked) {
		queryObject[key] = [specialArgumentsForSearchKit.value];
	} else {
		delete queryObject[key];
	}

	if (this.isMobile) {
		var filters = this.state.filters;

		var newState = (0, _assign2.default)({}, filters, { fieldValues: queryObject });
		this.setState({
			filters: newState
		});
	} else {
		var history = this.props.history;

		var url = (0, _utils.stringifyQueryParams)(queryObject);
		history.push(pathname + '/?' + url);
	}
}

/**
 * Default Handler to the Pill Component used by the SearchKit HOC if you do not override the handler
 * SearchKit expects handler to change appropriately the url when any event occurs
 * @param  {[type]} event                        [description]
 * @param  {[type]} specialArgumentsForSearchKit  Object which contains extra arguments needed to populate the URL from an existing object
 * @return {none}
 */
function defaultOnPillCloseHandler(specialArgumentsForSearchKit) {
	var key = specialArgumentsForSearchKit.urlCode;
	var queryObject = specialArgumentsForSearchKit.fieldValues;
	var pathname = (0, _utils.stripTrailingSlash)(specialArgumentsForSearchKit.pathname);
	var value = specialArgumentsForSearchKit.value;
	if (queryObject[key] !== undefined) {
		var arr = queryObject[key];
		var ind = -1;
		ind = arr.indexOf(value);
		if (ind > -1) {
			arr.splice(ind, 1);
			if (arr.length > 0) {
				queryObject[key] = arr;
			} else {
				delete queryObject[key];
			}
		} else {
			var _queryObject$key2;

			(_queryObject$key2 = queryObject[key]).push.apply(_queryObject$key2, [value]);
		}
	} else {
		queryObject[key] = [value];
	}

	if (this.isMobile) {
		var filters = this.state.filters;

		var newState = (0, _assign2.default)({}, filters, { fieldValues: queryObject });
		this.setState({
			filters: newState
		});
	} else {
		var history = this.props.history;

		var url = (0, _utils.stringifyQueryParams)(queryObject);
		history.replace({ pathname: '' + pathname, search: '?' + url });
	}
}

function defaultInputRangeSliderClickHandler(values, specialArgumentsForSearchKit) {
	var history = this.props.history;

	var key = specialArgumentsForSearchKit.urlCode;
	var queryObject = specialArgumentsForSearchKit.fieldValues;
	var pathname = (0, _utils.stripTrailingSlash)(specialArgumentsForSearchKit.pathname);
	queryObject[key] = [values.min, values.max];
	var url = (0, _utils.stringifyQueryParams)(queryObject);
	history.replace({ pathname: '' + pathname, search: '?' + url });
}

function defaultOnChangeDateRangeHandler(fromDate, toDate, specialArgumentsForSearchKit) {
	var key = specialArgumentsForSearchKit.urlCode;
	var queryObject = specialArgumentsForSearchKit.fieldValues;
	queryObject[key] = [fromDate.valueOf() / 1000, toDate.valueOf() / 1000];
	var pathname = (0, _utils.stripTrailingSlash)(specialArgumentsForSearchKit.pathname);

	if (this.isMobile) {
		var filters = this.state.filters;

		var newState = (0, _assign2.default)({}, filters, { fieldValues: queryObject });
		this.setState({
			filters: newState
		});
	} else {
		var history = this.props.history;

		var url = (0, _utils.stringifyQueryParams)(queryObject);
		history.replace({ pathname: '' + pathname, search: '?' + url });
	}
}

/**
 * Default Handler to handle clear filters event
 * @param  {[type]} event                        [description]
 * @param  {[type]} specialArgumentsForSearchKit [description]
 * @return {[type]}                              [description]
 */
function defaultOnClearClickHandler(event, specialArgumentsForSearchKit) {
	var key = specialArgumentsForSearchKit.urlCode;
	var queryObject = specialArgumentsForSearchKit.fieldValues;
	var pathname = (0, _utils.stripTrailingSlash)(specialArgumentsForSearchKit.pathname);
	delete queryObject[key];

	if (this.isMobile) {
		var filters = this.state.filters;

		var newState = (0, _assign2.default)({}, filters, { fieldValues: queryObject });
		this.setState({
			filters: newState
		});
	} else {
		var history = this.props.history;

		var url = (0, _utils.stringifyQueryParams)(queryObject);
		history.replace({ pathname: '' + pathname, search: '?' + url });
	}
}

function defaultOnApplyClickHandler() {
	this.setState({
		applied: true
	});
	var history = this.props.history;

	var queryObject = this.state.filters.fieldValues;
	var pathname = (0, _utils.stripTrailingSlash)(this.pathname);
	var url = (0, _utils.stringifyQueryParams)(queryObject);
	history.replace({ pathname: '' + pathname, search: '?' + url });
}

/**
 * Default handler to clear all filters
 */
function defaultOnClearAllClickHandler(specialArgumentsForSearchKit) {
	var history = this.props.history;

	var pathname = (0, _utils.stripTrailingSlash)(specialArgumentsForSearchKit.pathname);
	history.push({ pathname: '' + pathname });
}