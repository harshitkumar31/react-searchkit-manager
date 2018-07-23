import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
// import s from './index.scss';

const propTypes = {
	content: PropTypes.any,
	title: PropTypes.string,
	show: PropTypes.bool,
	onClearClickHandler: PropTypes.func,
	filterClassName: PropTypes.string,
	extraProps: PropTypes.any,
	showClear: PropTypes.bool,
};

class Collapsible extends React.Component {

	constructor(props) {
		super(props);
		const show = this.props.show !== undefined ? this.props.show : false;
		const name = this.props.title;
		this.state = { show, name };
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			show: !this.state.show,
		});
	}
	onClearClickHandler(e, extraProps) {
		this.props.onClearClickHandler(e, extraProps);
	}
	render() {
		const filterClassName = this.props.filterClassName ? `filter-details ${this.props.filterClassName}` : 'filter-details';
		const collapsedContent = this.state.show ? this.props.content : null;
		const className = this.state.show ? 'filter-items class-active' : 'filter-items';
		const { extraProps, showClear } = this.props;
		return (
      <section>
        <div className={className}>
          <h4>
            <a className="accordion-toggle filter-label" onClick={this.toggle}>
							{this.state.show ? <Icon type="up" /> : <Icon type="down" />}
              {this.props.title}
            </a>
            {showClear && <a className="clear-filter active" onClick={e => this.onClearClickHandler(e, extraProps)}>Clear</a>}
          </h4>
          <div className={filterClassName} >
            {collapsedContent}
          </div>
        </div>
      </section>);
	}

}

Collapsible.propTypes = propTypes;

export default Collapsible;
