'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import s from './index.scss';

var propTypes = {
	content: _propTypes2.default.any,
	title: _propTypes2.default.string,
	show: _propTypes2.default.bool,
	onClearClickHandler: _propTypes2.default.func,
	filterClassName: _propTypes2.default.string,
	extraProps: _propTypes2.default.any,
	showClear: _propTypes2.default.bool
};

var Collapsible = function (_React$Component) {
	(0, _inherits3.default)(Collapsible, _React$Component);

	function Collapsible(props) {
		(0, _classCallCheck3.default)(this, Collapsible);

		var _this = (0, _possibleConstructorReturn3.default)(this, (Collapsible.__proto__ || (0, _getPrototypeOf2.default)(Collapsible)).call(this, props));

		var show = _this.props.show !== undefined ? _this.props.show : false;
		var name = _this.props.title;
		_this.state = { show: show, name: name };
		_this.toggle = _this.toggle.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(Collapsible, [{
		key: 'toggle',
		value: function toggle() {
			this.setState({
				show: !this.state.show
			});
		}
	}, {
		key: 'onClearClickHandler',
		value: function onClearClickHandler(e, extraProps) {
			this.props.onClearClickHandler(e, extraProps);
		}
	}, {
		key: 'render',
		value: function render() {
			var _this2 = this;

			var filterClassName = this.props.filterClassName ? 'filter-details ' + this.props.filterClassName : 'filter-details';
			var collapsedContent = this.state.show ? this.props.content : null;
			var className = this.state.show ? 'filter-items class-active' : 'filter-items';
			var _props = this.props,
			    extraProps = _props.extraProps,
			    showClear = _props.showClear;

			return _react2.default.createElement(
				'section',
				null,
				_react2.default.createElement(
					'div',
					{ className: className },
					_react2.default.createElement(
						'h4',
						null,
						_react2.default.createElement(
							'a',
							{ className: 'accordion-toggle filter-label', onClick: this.toggle },
							this.state.show ? _react2.default.createElement(_antd.Icon, { type: 'up' }) : _react2.default.createElement(_antd.Icon, { type: 'down' }),
							this.props.title
						),
						showClear && _react2.default.createElement(
							'a',
							{ className: 'clear-filter active', onClick: function onClick(e) {
									return _this2.onClearClickHandler(e, extraProps);
								} },
							'Clear'
						)
					),
					_react2.default.createElement(
						'div',
						{ className: filterClassName },
						collapsedContent
					)
				)
			);
		}
	}]);
	return Collapsible;
}(_react2.default.Component);

Collapsible.propTypes = propTypes;

exports.default = Collapsible;