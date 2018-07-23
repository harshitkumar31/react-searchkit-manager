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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import './index.scss';

var propTypes = {
	content: _propTypes2.default.any,
	title: _propTypes2.default.string,
	show: _propTypes2.default.bool,
	onClearClickHandler: _propTypes2.default.func,
	toggle: _propTypes2.default.func,
	extraProps: _propTypes2.default.object
};

var CollapsibleForMobile = function (_React$Component) {
	(0, _inherits3.default)(CollapsibleForMobile, _React$Component);

	function CollapsibleForMobile(props) {
		(0, _classCallCheck3.default)(this, CollapsibleForMobile);

		var _this = (0, _possibleConstructorReturn3.default)(this, (CollapsibleForMobile.__proto__ || (0, _getPrototypeOf2.default)(CollapsibleForMobile)).call(this, props));

		var show = _this.props.show !== undefined ? _this.props.show : false;
		var name = _this.props.title;
		_this.state = { show: show, name: name };
		_this.toggle = _this.toggle.bind(_this);
		return _this;
	}

	(0, _createClass3.default)(CollapsibleForMobile, [{
		key: 'toggle',
		value: function toggle() {
			var show = this.props.show;
			this.props.toggle(this.state.name, !show);
		}
	}, {
		key: 'onClearClickHandler',
		value: function onClearClickHandler(e, extraProps) {
			this.props.onClearClickHandler(e, extraProps);
		}
	}, {
		key: 'render',
		value: function render() {
			// const collapsedContent = this.state.show ? this.props.content : null;
			var collapsedContent = this.props.show ? this.props.content : null;
			var className = this.props.show ? 'filter-items class-active' : 'filter-items';
			var classNameForTitle = this.props.show ? 'accordion-toggle filter-label active' : 'accordion-toggle filter-label';
			var extraProps = this.props.extraProps;

			return _react2.default.createElement(
				'section',
				null,
				_react2.default.createElement(
					'div',
					{ className: className },
					_react2.default.createElement(
						'div',
						{ className: 'filter-details' },
						collapsedContent
					)
				)
			);
		}
	}]);
	return CollapsibleForMobile;
}(_react2.default.Component);

CollapsibleForMobile.propTypes = propTypes;

exports.default = CollapsibleForMobile;