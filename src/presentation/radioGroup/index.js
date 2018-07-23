import React from 'react';
import { Radio, Input } from 'antd';
import PropTypes from 'prop-types';

const RadioGroup = Radio.Group;

class RadioGroupWrapper extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: props.defaultValue
		};
	}
	onChange = (e) => {
		// console.log('radio checked', e.target.value);
		this.setState({
			value: e.target.value,
		});
		const { extraProps, handler } = this.props;
		handler(e, extraProps);
	}
  
	onClick = (e, extraProps) => {
		extraProps.checked = !extraProps.checked;
		this.setState({
			value: extraProps.value,
		});
		const { handler } = this.props;
		handler(e, extraProps);
	}

	render() {
		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
		};
		const {items, extraProps} = this.props;
		return (
      <RadioGroup >
        {items.map((item) => (<Radio onClick={(e) => this.onClick(e, {...extraProps, ...item})} style={radioStyle} key={item.id} value={item.value} checked={item.checked} >{item.label}</Radio>))}
      </RadioGroup>
		);
	}
}

RadioGroupWrapper.propTypes = {
	items: PropTypes.arrayOf(PropTypes.shape({
		label: PropTypes.string,
		value: PropTypes.string,
		id: PropTypes.string,
		checked: PropTypes.bool,
	})),
	handler: PropTypes.func,
	name: PropTypes.string,
	extraProps: PropTypes.any,
};

export default RadioGroupWrapper;