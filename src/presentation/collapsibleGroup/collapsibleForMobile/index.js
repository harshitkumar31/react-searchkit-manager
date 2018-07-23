import React from 'react';
import PropTypes from 'prop-types';

// import './index.scss';

const propTypes = {
	content: PropTypes.any,
	title: PropTypes.string,
	show: PropTypes.bool,
	onClearClickHandler: PropTypes.func,
	toggle: PropTypes.func,
	extraProps: PropTypes.object,
};

class CollapsibleForMobile extends React.Component {

	constructor(props) {
		super(props);
		const show = this.props.show !== undefined ? this.props.show : false;
		const name = this.props.title;
		this.state = { show, name };
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		const show = this.props.show;
		this.props.toggle(this.state.name, !show);
	}
	onClearClickHandler(e, extraProps) {
		this.props.onClearClickHandler(e, extraProps);
	}
	render() {
    // const collapsedContent = this.state.show ? this.props.content : null;
		const collapsedContent = this.props.show ? this.props.content : null;
		const className = this.props.show ? 'filter-items class-active' : 'filter-items';
		const classNameForTitle = this.props.show ? 'accordion-toggle filter-label active' : 'accordion-toggle filter-label';
		const { extraProps } = this.props;
		return (
      <section>
        <div className={className}>
          {/*<h4>
            <a className={classNameForTitle}  onClick={this.toggle}>
              <span className="caret-down" />
              {this.props.title}
            </a>
            <a className="clear-filter active" onClick={e => this.onClearClickHandler(e, extraProps)}>Clear</a>
          </h4>*/}
          <div className="filter-details" >
            {collapsedContent}
          </div>
        </div>
      </section>);
	}

}

CollapsibleForMobile.propTypes = propTypes;

export default CollapsibleForMobile;
