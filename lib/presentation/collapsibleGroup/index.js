'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CollapsibleGroupForMobile = exports.CollapsibleGroup = undefined;

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _collapsible = require('./collapsible');

var _collapsible2 = _interopRequireDefault(_collapsible);

var _collapsibleForMobile = require('./collapsibleForMobile');

var _collapsibleForMobile2 = _interopRequireDefault(_collapsibleForMobile);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	collapsibleContentArray: _propTypes2.default.array
};

var CollapsibleGroup = exports.CollapsibleGroup = function (_React$Component) {
	(0, _inherits3.default)(CollapsibleGroup, _React$Component);

	function CollapsibleGroup(props) {
		(0, _classCallCheck3.default)(this, CollapsibleGroup);
		return (0, _possibleConstructorReturn3.default)(this, (CollapsibleGroup.__proto__ || (0, _getPrototypeOf2.default)(CollapsibleGroup)).call(this, props));
	}

	(0, _createClass3.default)(CollapsibleGroup, [{
		key: 'render',
		value: function render() {
			var collapsibleContentArray = this.props.collapsibleContentArray;
			var listOfCollapsibles = collapsibleContentArray.map(function (content, index) {
				return _react2.default.createElement(_collapsible2.default, (0, _extends3.default)({ key: index, show: true }, content));
			});
			return _react2.default.createElement(
				'div',
				{ className: 'custom-collapsible' },
				listOfCollapsibles
			);
		}
	}]);
	return CollapsibleGroup;
}(_react2.default.Component);

var CollapsibleGroupForMobile = exports.CollapsibleGroupForMobile = function (_React$Component2) {
	(0, _inherits3.default)(CollapsibleGroupForMobile, _React$Component2);

	function CollapsibleGroupForMobile(props) {
		(0, _classCallCheck3.default)(this, CollapsibleGroupForMobile);

		var _this2 = (0, _possibleConstructorReturn3.default)(this, (CollapsibleGroupForMobile.__proto__ || (0, _getPrototypeOf2.default)(CollapsibleGroupForMobile)).call(this, props));

		_this2.toggle = _this2.toggle.bind(_this2);
		_this2.select = _this2.select.bind(_this2);
		var collapsibleContentArray = _this2.props.collapsibleContentArray;
		var show = {};
		collapsibleContentArray.map(function (content) {
			show[content.title] = false;
			return null;
		});
		_this2.state = {
			showStates: show,
			selectedIndex: 0
		};
		return _this2;
	}

	(0, _createClass3.default)(CollapsibleGroupForMobile, [{
		key: 'toggle',
		value: function toggle(nameOfCollapsible, collapsedOrNot) {
			var collapsibleState = (0, _assign2.default)([], this.state.showStates);
			(0, _keys2.default)(collapsibleState).map(function (name) {
				if (name === nameOfCollapsible) {
					collapsibleState[name] = collapsedOrNot;
				} else {
					collapsibleState[name] = false;
				}
				return null;
			});
			this.setState({ showStates: collapsibleState });
		}
	}, {
		key: 'select',
		value: function select(index) {
			this.setState({
				selectedIndex: index
			});
		}
	}, {
		key: 'render',
		value: function render() {
			var _this3 = this;

			var collapsibleContentArray = this.props.collapsibleContentArray;
			var showStates = this.state.showStates;
			var selectedIndex = this.state.selectedIndex;

			var listOfCollapsibles = collapsibleContentArray.map(function (content, index) {
				content.show = showStates[content.title];
				return _react2.default.createElement(_collapsibleForMobile2.default, (0, _extends3.default)({ key: index, toggle: _this3.toggle }, content, { show: selectedIndex === index }));
			});

			var listOfTitles = collapsibleContentArray.map(function (content, index) {
				var className = selectedIndex === index ? 'filter-items class-active' : 'filter-items';
				var classNameForTitle = selectedIndex === index ? 'accordion-toggle filter-label active' : 'accordion-toggle filter-label';
				return _react2.default.createElement(
					'div',
					{ className: className, key: index },
					_react2.default.createElement(
						'h4',
						null,
						_react2.default.createElement(
							'a',
							{ onClick: function onClick(e) {
									return _this3.select(index);
								}, className: classNameForTitle },
							_react2.default.createElement('span', { className: 'caret-down' }),
							content.title
						)
					)
				);
			});
			/*{collapsibleContentArray[selectedIndex].content}*/
			return _react2.default.createElement(
				'div',
				{ className: 'custom-collapsible row' },
				_react2.default.createElement(
					'div',
					{ className: 'col-xs-4 col-sm-4 filter-left-nav' },
					listOfTitles
				),
				_react2.default.createElement(
					'div',
					{ className: 'col-xs-8 col-sm-8 filter-details-nav' },
					_react2.default.createElement(
						'div',
						{ className: 'filter-details' },
						listOfCollapsibles[selectedIndex]
					)
				)
			);
		}
	}]);
	return CollapsibleGroupForMobile;
}(_react2.default.Component);

CollapsibleGroupForMobile.propTypes = propTypes;