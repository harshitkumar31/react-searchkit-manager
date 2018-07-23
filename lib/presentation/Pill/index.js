'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propTypes = {
	text: _propTypes2.default.string,
	onClickHandler: _propTypes2.default.func,
	extraProps: _propTypes2.default.object,
	noCloseIcon: _propTypes2.default.bool,
	className: _propTypes2.default.string
};

var Pill = function Pill(props) {
	var text = props.text,
	    onClickHandler = props.onClickHandler,
	    noCloseIcon = props.noCloseIcon,
	    className = props.className,
	    extraProps = props.extraProps,
	    key = props.key;

	return _react2.default.createElement(
		_antd.Tag,
		{ key: key, closable: !noCloseIcon, onClick: function onClick() {
				return onClickHandler(extraProps);
			} },
		text
	);
};

Pill.propTypes = propTypes;

exports.default = Pill;