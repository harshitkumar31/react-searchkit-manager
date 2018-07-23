<<<<<<< HEAD
// Search Kit HOC
import React from 'react';
import FieldsContainer from '../presentation/fieldsContainer';
import Pill from '../presentation/Pill';
import {
  getObjectValuesFromQueryString,
  setAllFieldsToFalse,
  setSelectedFitersFieldsToTrue,
  clone,
  getQueryObjectFromString
} from '../helpers/utils';
import {
  defaultOnSelectOptionClickHandler,
  defaultMultiCheckBoxClickHandler,
  defaultOnRadioButtonToggleHandler,
  defaultOnPillCloseHandler,
  defaultOnClearAllClickHandler,
  defaultOnClearClickHandler,
  defaultInputRangeSliderClickHandler,
  defaultOnChangeDateRangeHandler,
  defaultOnApplyClickHandler
} from '../helpers/defaultEventHandlers';
import uniqueId from 'lodash/uniqueId';

import './index.less';
// import './index.scss';


/**
 * Searchkit HOC
 * (Follows Inversion Inheritance, for more info look at https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#.uwwihnxkg )
 * It is intended to be used with any component to populate appropriate filters and pills
 * This HOC should be wrapped by connect from 'react-redux' and withRouter from 'react-router' in order
 * for it to access the appropriate URL parameters and props
 * The filters should be provided by the MapStateToProps of the Wrapped Component( The filters are accessed
 * in the HOC using this.props.results.filters )
 * SearchKit stores the filters in state in order to re render all child components whenever the URL changes
 * ------IMPORTANT---------
 * Don't forget to set the filters in the mapStateToProps or in the selector(if using reselect)
 * ------------------------
 * SearchKitHoc expects the below parameters. If the handlers are not provided, default event handlers are
 * invoked
 *
 * @param  {React.Component} WrappedComponent             The Component(normally a results page/search page ) which
 *                                                        needs filters and pill behaviour
 * @param  {function} options.onSelectOptionClickHandler  Handler function to be invoked when an option from the Select
 *                                                        or similar component is clicked
 * @param  {function} options.onPillCloseHandler          Handler function to be invoked when close-icon of a Pill component
 *                                                        is clicked
 * @param  {function} options.multiCheckBoxClickHandler   Handler function to be invoked when check-box is clicked
 * @param  {function} options.onRadioButtonToggleHandler  Handler function to be invoked when a radio button is clicked
 * @return {React.Component}                              Returns a React.Component which takes care of rendering filters,pills
 *                                                        and also supplies the components with corresponding handlers
 * ---------Example Usage--------
 * export default withRouter(connect(mapStateToProps, null)(searchKitManager(RolesBrowsePage,
 *                                                                          { onSelectOptionClickHandler,
 *                                                                          onPillCloseHandler,
 *                                                                          multiCheckBoxClickHandler,
 *                                                                          onRadioButtonToggleHandler })));
 * -------------------------------
 * You can also have custom handlers for each particular field like
 * field.customHandler = () => {
 *   ...do something
 * }
 * // TODO find a better way to populate base URL
 */
const searchKitManager =
  (WrappedComponent,
    {
    onSelectOptionClickHandler = defaultOnSelectOptionClickHandler,
      onPillCloseHandler = defaultOnPillCloseHandler,
      multiCheckBoxClickHandler = defaultMultiCheckBoxClickHandler,
      onRadioButtonToggleHandler = defaultOnRadioButtonToggleHandler,
      onClearClickHandler = defaultOnClearClickHandler,
      onClearAllClickHandler = defaultOnClearAllClickHandler,
      onChangeDateRangeHandler = defaultOnChangeDateRangeHandler,
      inputRangeSliderClickHandler = defaultInputRangeSliderClickHandler,
      onApplyClickHandler = defaultOnApplyClickHandler,
      baseUrl,
  }) =>
    (class SearchKitWrappedComponent extends WrappedComponent {
	constructor(props) {
		super(props);
		const { filters } = this.props.results;
		const { search } = this.props.location;
		const query = getQueryObjectFromString(search);
		this.handleFilterInMobileOnClick = this.handleFilterInMobileOnClick.bind(this);

		// this.onScrollSidebarFix = this.onScrollSidebarFix.bind(this);
		filters.fieldValues = getObjectValuesFromQueryString(query);

		filters.fieldValues = getObjectValuesFromQueryString(query);

		filters.fields = setAllFieldsToFalse(filters.fields);
		filters.fields = setSelectedFitersFieldsToTrue(filters.fieldValues, filters.fields);

		filters.pathname = baseUrl || this.props.location.pathname;
		this.pathname = filters.pathname;
		filters.show = !this.props.isMobile;

		this.isMobile = this.props.isMobile;
		filters.isMobile = this.props.isMobile;


		filters.onSelectOptionClickHandler = onSelectOptionClickHandler.bind(this);
		filters.multiCheckBoxClickHandler = multiCheckBoxClickHandler.bind(this);
		filters.onRadioButtonToggleHandler = onRadioButtonToggleHandler.bind(this);
		filters.onClearClickHandler = onClearClickHandler.bind(this);
		filters.handleFilterInMobileOnClick = this.handleFilterInMobileOnClick.bind(this);
		filters.onClearAllClickHandler = onClearAllClickHandler.bind(this);
		filters.onChangeDateRangeHandler = onChangeDateRangeHandler.bind(this);
		filters.inputRangeSliderClickHandler = inputRangeSliderClickHandler.bind(this);
		filters.onApplyClickHandler = defaultOnApplyClickHandler.bind(this);

		filters.openFiltersMobile = this.openFiltersMobile.bind(this);
		filters.closeFiltersMobile = this.closeFiltersMobile.bind(this);
    
		this.onPillCloseHandler = onPillCloseHandler.bind(this);
		this.onClearAllClickHandler = onClearAllClickHandler.bind(this);
		this.state = { filters, prevFilters: null, applied: false };
	}
	static fetchDataAsync(dispatch, params, { search }, extraArguments) {
		const query = getQueryObjectFromString(search);
		const newQuery = getObjectValuesFromQueryString(query);
		return WrappedComponent.fetchDataAsync(dispatch, params, { query: newQuery }, extraArguments);
	}

	openFiltersMobile() {
		const filters = Object.assign({}, this.state.filters);
		const prevFilters = clone(filters);
		filters.show = true;
		this.setState({
			filters,
			prevFilters,
		});
	}

	closeFiltersMobile() {
		const filters = Object.assign({}, this.state.filters);
		filters.show = false;
		const { applied, prevFilters } = this.state;
		if (applied) {
			this.setState({
				filters,
				prevFilters: null,
				applied: false,
			});
		} else {
			prevFilters.show = false;
			this.setState({
				filters: prevFilters,
				prevFilters: null,
			});
		}
	}

	handleFilterInMobileOnClick() {
		const filters = Object.assign({}, this.state.filters);
		if (filters.show) {
			this.closeFiltersMobile();
		} else {
			this.openFiltersMobile();
		}
		filters.show = !filters.show;
		const body = document.querySelector('body');
		if (filters.show) {
			body.classList.add('no-scroll');
		} else {
			body.classList.remove('no-scroll');
		}
        // this.setState({ filters });
	}
	shouldComponentUpdate(nextProps, nextState) {
		if (this.state.filters.show !== nextState.filters.show || nextProps.results !== this.props.results || nextState !== this.state) {
			return true;
		} else if (nextProps.location.search !== this.props.location.search) {
			return true;
		}
		return false; // HOC shouldn't re render if the URL query doesn't change
	}
	componentWillMount() {
		this.id = uniqueId();
	}
	componentDidMount() {
		this.searchResults = document.getElementById('srp-results');
		this.sideBar = document.getElementById('srp-filters');
		this.container = document.querySelector('.panel-group');
		/* if (!this.props.isMobile) {
			window.addEventListener('scroll', this.onScrollSidebarFix);
		} */
	}
	componentDidUpdate() {
		this.searchResults = document.getElementById('srp-results');
		this.sideBar = document.getElementById('srp-filters');
		const content = document.getElementById('srp-results');
		this.contentHeight = content.clientHeight;

		const srpFilters = document.getElementById('srp-filters');

		if (this.contentHeight > this.sidebarHeight) {
			srpFilters.style.height = `${this.contentHeight}px`;
		} else {
			srpFilters.style.height = `${this.sidebarHeight}px`;
			this.container.classList.remove('sidebar-fixed');
		}
	}
	componentWillUnmount() {
		const body = document.querySelector('body');
		body.classList.remove('no-scroll');
		// window.removeEventListener('scroll', this.onScrollSidebarFix);
	}


	/* onScrollSidebarFix = () => {
		const footerOffsetHeight = document.querySelector('.footer').offsetTop;

		const content = document.getElementById('srp-results');
		const srpFilters = document.getElementById('srp-filters');
		const sideBar = document.querySelector('.panel-group');

		this.contentHeight = content.clientHeight;

		this.sidebarHeight = sideBar.clientHeight;

		const x = document.body;
		const w = x.scrollTop;

		const windowHeight = window.innerHeight;
		const halfsidebar = (windowHeight - this.sidebarHeight) - 100;

		this.container = document.querySelector('.panel-group');
        /* console.log(contentHeight);/

		if (this.contentHeight > this.sidebarHeight) {
			srpFilters.style.height = `${this.contentHeight}px`;

			if (w > Math.abs(halfsidebar) || document.documentElement.scrollTop > Math.abs(halfsidebar)) {
            // console.log('sidebar sticky');
				this.container.classList.add('sidebar-fixed');
			} else {
				this.container.classList.remove('sidebar-fixed');
			}

			if (w + windowHeight > footerOffsetHeight - 20 || document.documentElement.scrollTop + windowHeight > footerOffsetHeight - 20) {
            // console.log('Reached footer');
				this.container.classList.remove('sidebar-fixed');
				this.container.classList.add('sidebar-not-fixed');
			} else {
				this.container.classList.remove('sidebar-not-fixed');
			}
		} else {
			this.container.classList.remove('sidebar-fixed');
		}
	} */

	componentWillReceiveProps(nextProps) {
		if (nextProps.location.search !== this.props.location.search) {
			this.props.fetch();
			const { filters } = this.state;
			const newFilters = nextProps.results.filters;

			const { search } = nextProps.location;
			const query = getQueryObjectFromString(search);
			filters.fieldValues = getObjectValuesFromQueryString(query);
			filters.fields = setAllFieldsToFalse(newFilters.fields);
			filters.fields = setSelectedFitersFieldsToTrue(filters.fieldValues, newFilters.fields);
			filters.pathname = baseUrl || nextProps.location.pathname;
			this.pathname = filters.pathname;
			this.setState({ filters });
		} else if ('isAuthenticated' in this.props && this.props.isAuthenticated !== nextProps.isAuthenticated) {
			this.props.fetch();
		}
		if (this.props.isMobile !== nextProps.isMobile) {
			const { filters } = this.state;
			filters.show = false;
			this.setState({
				filters,
			});
		}
	}
	render() {
		const searchResults = super.render();
		const { pathname, search } = this.props.location;
		const query = getQueryObjectFromString(search);
		const { filters } = this.state;
		const { results: { title } } = this.props;
        // const { show } = filters;
		const { fieldValues } = filters;
		let fields = setAllFieldsToFalse(filters.fields);
		fields = setSelectedFitersFieldsToTrue(filters.fieldValues, filters.fields);
        // filters.isMobile = isMobile;
		const specialArgumentsForSearchKit = {
			fieldValues,
			pathname,
		};
		const pills = [];
		if (fieldValues) {
          // pills = Object.keys(fieldValues).map((v, index) => {
			Object.keys(fieldValues).map((v, index) => {
				const propsForEventHandlers = {
					...specialArgumentsForSearchKit,
					urlCode: v,
				};

				if (fields[v] !== undefined) {
					const innerFields = fields[v].values;
              // const subPills = Object.keys(innerFields).map((y) => {
					Object.keys(innerFields).map((y) => {
						const pillExtraProps = {
							...propsForEventHandlers,
							value: innerFields[y].value,
						};
                // return innerFields[y].checked ? (<Pill key={this.id} text={innerFields[y].label} onClickHandler={onPillCloseHandler} extraProps={pillExtraProps} />) : null;
						if (innerFields[y].checked) {
							pills.push(<Pill
                    key={uniqueId('pill_')}
                    text={innerFields[y].label}
                    onClickHandler={this.onPillCloseHandler}
                    extraProps={pillExtraProps}
                  />);
						}

						return null;
					});
					return null;
				}
				return null;
			});
		}

		if (pills.length > 0) {
			pills.push(<Pill
            key={uniqueId('pill_')}
            text="Clear All"
            onClickHandler={() => this.onClearAllClickHandler(specialArgumentsForSearchKit)}
            extraProps={specialArgumentsForSearchKit}
            noCloseIcon
            className="show-cursor"
          />);
		}
		const wrapperClassName = filters.show ? 'srp-wrapper bootstrap-reset filters-open' : 'srp-wrapper bootstrap-reset universal-anim';
		return (
          <section
            ref="list"
            className={wrapperClassName}
            id="container"
          >
            <div className="container">
              <div className="row">
                <FieldsContainer
                  query={query}
                  filters={filters}
                  id="srp-filters"
                />
                <div className="col-xs-12 col-sm-12 col-md-9">
                  <div className="srp-content">
                    <div className="row visible-xs visible-sm">
                      <div className="col-xs-6">
                        {/* <a className="filter-box visible-xs visible-sm" onClick={this.handleFilterInMobileOnClick}>Filter
                          <span className="applied" style={{ display: 'none' }}><i className="icon-tick" /></span>
                          <i className="icon-arrow-down pull-right" />
                        </a> */}
                      </div>
                    </div>
                    <div className="srp-results" id="srp-results">
                      <div className="applied-results">
                        <h2 className="result-title">{title}</h2>
                        {pills.length !== 0 && <ul className="applied-filter clearfix hidden-xs hidden-sm">
                          {pills}
                        </ul>}
                      </div>
                      {searchResults}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>);
	}
    }
    );


export default searchKitManager;
=======
import React, { Component } from 'react';
import {
    defaultInputRangeSliderClickHandler,
    defaultOnApplyClickHandler,
    defaultMultiCheckBoxClickHandler,
    defaultOnChangeDateRangeHandler,
    defaultOnClearAllClickHandler,
    defaultOnClearClickHandler,
    defaultOnPillCloseHandler,
    defaultOnRadioButtonToggleHandler,
    defaultOnSelectOptionClickHandler
} from '../helpers/defaultEventHandlers';
import Button from '../button';

const searchKit = (WrappedComponent , {
    onSelectOptionClickHandler = defaultOnSelectOptionClickHandler,
    onPillCloseHandler = defaultOnPillCloseHandler,
    multiCheckBoxClickHandler = defaultMultiCheckBoxClickHandler,
    onRadioButtonToggleHandler = defaultOnRadioButtonToggleHandler,
    onClearClickHandler = defaultOnClearClickHandler,
    onClearAllClickHandler = defaultOnClearAllClickHandler,
    onChangeDateRangeHandler = defaultOnChangeDateRangeHandler,
    inputRangeSliderClickHandler = defaultInputRangeSliderClickHandler,
    onApplyClickHandler = defaultOnApplyClickHandler,
    baseUrl
}) => (
    class SearchKitWrappedComponent extends WrappedComponent {
        constructor(props) {
            super(props);
            const filters = {};
            filters.onSelectOptionClickHandler = onSelectOptionClickHandler.bind(this);
            filters.multiCheckBoxClickHandler = multiCheckBoxClickHandler.bind(this);
            filters.onRadioButtonToggleHandler = onRadioButtonToggleHandler.bind(this);
            filters.onClearClickHandler = onClearClickHandler.bind(this);
            filters.handleFilterInMobileOnClick = this.handleFilterInMobileOnClick;
            filters.onClearAllClickHandler = onClearAllClickHandler.bind(this);
            filters.onChangeDateRangeHandler = onChangeDateRangeHandler.bind(this);
            filters.inputRangeSliderClickHandler = inputRangeSliderClickHandler.bind(this);
            filters.onApplyClickHandler = defaultOnApplyClickHandler.bind(this);

            filters.openFiltersMobile = this.openFiltersMobile;
            filters.closeFiltersMobile = this.closeFiltersMobile;

            this.state = {
                filters,
            };
        }

        openFiltersMobile = () => {
            const filters = Object.assign({}, this.state.filters);
            const prevFilters = clone(filters);
            filters.show = true;
            this.setState({
                filters,
                prevFilters,
            });
        }

        closeFiltersMobile = () => {
            const filters = Object.assign({}, this.state.filters);
            filters.show = false;
            const { applied, prevFilters } = this.state;
            if (applied) {
                this.setState({
                    filters,
                    prevFilters: null,
                    applied: false,
                });
            } else {
                prevFilters.show = false;
                this.setState({
                    filters: prevFilters,
                    prevFilters: null,
                });
            }
        }

        handleFilterInMobileOnClick = () => {
            const filters = Object.assign({}, this.state.filters);
            if (filters.show) {
                this.closeFiltersMobile();
            } else {
                this.openFiltersMobile();
            }
            filters.show = !filters.show;
            const body = document.querySelector('body');
            if (filters.show) {
                body.classList.add('no-scroll');
            } else {
                body.classList.remove('no-scroll');
            }
            // this.setState({ filters });
        }

        onClick = (e) => {
            this.fetchData({xyz: 'hello'})
            .then((res)=>res.json())
            .catch(e=>e);;
        }

        shouldComponentUpdate(nextProps, nextState) {
            if (this.state.filters.show !== nextState.filters.show || nextProps.results !== this.props.results || nextState !== this.state) {
                return true;
            } else if (nextProps.location.search !== this.props.location.search) {
                return true;
            }
            return false; // HOC shouldn't re render if the URL query doesn't change
        }

        render() {
            const { filters } = this.props;
            console.log('filters here =>', filters);
            return (<div className="snb">
            {super.render(this.props)}
            <Button title="Click Me" onClick={this.onClick} ></Button>
            </div>);
        }
    }
);

export default searchKit;

>>>>>>> Searchkit, complete rewrite
