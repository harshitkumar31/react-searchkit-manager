import React from 'react';
import Collapsible from './collapsible';
import CollapsibleForMobile from './collapsibleForMobile';
import PropTypes from 'prop-types';

const propTypes = {
	collapsibleContentArray: PropTypes.array,
};

export class CollapsibleGroup extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		const collapsibleContentArray = this.props.collapsibleContentArray;
		const listOfCollapsibles = collapsibleContentArray.map((content, index) =>
      (<Collapsible key={index} show {...content} />),
    );
		return (<div className="custom-collapsible">{listOfCollapsibles}</div>);
	}
}


export class CollapsibleGroupForMobile extends React.Component {
	constructor(props) {
		super(props);
		this.toggle = this.toggle.bind(this);
		this.select = this.select.bind(this);
		const collapsibleContentArray = this.props.collapsibleContentArray;
		const show = {};
		collapsibleContentArray.map((content) => {
			show[content.title] = false;
			return null;
		});
		this.state = {
			showStates: show,
			selectedIndex: 0,
		};
	}
	static propTypes = propTypes;
	toggle(nameOfCollapsible, collapsedOrNot) {
		const collapsibleState = Object.assign([], this.state.showStates);
		Object.keys(collapsibleState).map((name) => {
			if (name === nameOfCollapsible) {
				collapsibleState[name] = collapsedOrNot;
			} else {
				collapsibleState[name] = false;
			}
			return null;
		});
		this.setState({ showStates: collapsibleState });
	}

	select(index) {
		this.setState({
			selectedIndex: index,
		});
	}
	render() {
		const collapsibleContentArray = this.props.collapsibleContentArray;
		const showStates = this.state.showStates;
		const { selectedIndex } = this.state;
		const listOfCollapsibles = collapsibleContentArray.map((content, index) => {
			content.show = showStates[content.title];
			return (<CollapsibleForMobile key={index} toggle={this.toggle} {...content} show={selectedIndex === index} />);
		},
    );

		const listOfTitles = collapsibleContentArray.map((content, index) => {
			const className = selectedIndex === index ? 'filter-items class-active' : 'filter-items';
			const classNameForTitle = selectedIndex === index ? 'accordion-toggle filter-label active' : 'accordion-toggle filter-label';
			return (
        <div className={className} key={index}>
          <h4 >
            <a onClick={e => this.select(index)} className={classNameForTitle}>
              <span className="caret-down" />
              {content.title}
            </a>
          </h4>
        </div>);
		});
    /*{collapsibleContentArray[selectedIndex].content}*/
		return (<div className="custom-collapsible row">
      <div className="col-xs-4 col-sm-4 filter-left-nav">
        {listOfTitles}
      </div>
      <div className="col-xs-8 col-sm-8 filter-details-nav">
        <div className="filter-details">
          {listOfCollapsibles[selectedIndex]}
        </div>
      </div></div>);
	}
}
