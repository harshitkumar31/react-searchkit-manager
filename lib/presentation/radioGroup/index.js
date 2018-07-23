'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _antd = require('antd');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RadioGroup = _antd.Radio.Group;

var RadioGroupWrapper = function (_React$Component) {
	(0, _inherits3.default)(RadioGroupWrapper, _React$Component);

	function RadioGroupWrapper(props) {
		(0, _classCallCheck3.default)(this, RadioGroupWrapper);

		var _this = (0, _possibleConstructorReturn3.default)(this, (RadioGroupWrapper.__proto__ || (0, _getPrototypeOf2.default)(RadioGroupWrapper)).call(this, props));

		_this.onChange = function (e) {
			// console.log('radio checked', e.target.value);
			_this.setState({
				value: e.target.value
			});
			var _this$props = _this.props,
			    extraProps = _this$props.extraProps,
			    handler = _this$props.handler;

			handler(e, extraProps);
		};

		_this.onClick = function (e, extraProps) {
			extraProps.checked = !extraProps.checked;
			_this.setState({
				value: extraProps.value
			});
			var handler = _this.props.handler;

			handler(e, extraProps);
		};

		_this.state = {
			value: props.defaultValue
		};
		return _this;
	}

	(0, _createClass3.default)(RadioGroupWrapper, [{
		key: 'render',
		value: function render() {
			var _this2 = this;

			var radioStyle = {
				display: 'block',
				height: '30px',
				lineHeight: '30px'
			};
			var _props = this.props,
			    items = _props.items,
			    extraProps = _props.extraProps;

			return _react2.default.createElement(
				RadioGroup,
				null,
				items.map(function (item) {
					return _react2.default.createElement(
						_antd.Radio,
						{ onClick: function onClick(e) {
								return _this2.onClick(e, (0, _extends3.default)({}, extraProps, item));
							}, style: radioStyle, key: item.id, value: item.value, checked: item.checked },
						item.label
					);
				})
			);
		}
	}]);
	return RadioGroupWrapper;
}(_react2.default.Component);

RadioGroupWrapper.propTypes = {
	items: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		label: _propTypes2.default.string,
		value: _propTypes2.default.string,
		id: _propTypes2.default.string,
		checked: _propTypes2.default.bool
	})),
	handler: _propTypes2.default.func,
	name: _propTypes2.default.string,
	extraProps: _propTypes2.default.any
};

exports.default = RadioGroupWrapper;