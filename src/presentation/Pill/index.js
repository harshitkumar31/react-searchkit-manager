import React from 'react';
import { Tag } from 'antd';
import PropTypes from 'prop-types';

const propTypes = {
	text: PropTypes.string,
	onClickHandler: PropTypes.func,
	extraProps: PropTypes.object,
	noCloseIcon: PropTypes.bool,
	className: PropTypes.string,
};

  
const Pill = (props) => {
	const { text, onClickHandler, noCloseIcon, className, extraProps, key} = props;
	return <Tag key={key} closable={!noCloseIcon} onClick={()=> onClickHandler(extraProps)} >{text}</Tag>;
};

Pill.propTypes = propTypes;

export default Pill;