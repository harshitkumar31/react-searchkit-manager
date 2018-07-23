'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _fieldsContainer = require('../presentation/fieldsContainer');

var _fieldsContainer2 = _interopRequireDefault(_fieldsContainer);

var _Pill = require('../presentation/Pill');

var _Pill2 = _interopRequireDefault(_Pill);

var _utils = require('../helpers/utils');

var _defaultEventHandlers = require('../helpers/defaultEventHandlers');

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

require('./index.less');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var searchKitManager = function searchKitManager(WrappedComponent, _ref) {
	var _ref$onSelectOptionCl = _ref.onSelectOptionClickHandler,
	    onSelectOptionClickHandler = _ref$onSelectOptionCl === undefined ? _defaultEventHandlers.defaultOnSelectOptionClickHandler : _ref$onSelectOptionCl,
	    _ref$onPillCloseHandl = _ref.onPillCloseHandler,
	    onPillCloseHandler = _ref$onPillCloseHandl === undefined ? _defaultEventHandlers.defaultOnPillCloseHandler : _ref$onPillCloseHandl,
	    _ref$multiCheckBoxCli = _ref.multiCheckBoxClickHandler,
	    multiCheckBoxClickHandler = _ref$multiCheckBoxCli === undefined ? _defaultEventHandlers.defaultMultiCheckBoxClickHandler : _ref$multiCheckBoxCli,
	    _ref$onRadioButtonTog = _ref.onRadioButtonToggleHandler,
	    onRadioButtonToggleHandler = _ref$onRadioButtonTog === undefined ? _defaultEventHandlers.defaultOnRadioButtonToggleHandler : _ref$onRadioButtonTog,
	    _ref$onClearClickHand = _ref.onClearClickHandler,
	    onClearClickHandler = _ref$onClearClickHand === undefined ? _defaultEventHandlers.defaultOnClearClickHandler : _ref$onClearClickHand,
	    _ref$onClearAllClickH = _ref.onClearAllClickHandler,
	    onClearAllClickHandler = _ref$onClearAllClickH === undefined ? _defaultEventHandlers.defaultOnClearAllClickHandler : _ref$onClearAllClickH,
	    _ref$onChangeDateRang = _ref.onChangeDateRangeHandler,
	    onChangeDateRangeHandler = _ref$onChangeDateRang === undefined ? _defaultEventHandlers.defaultOnChangeDateRangeHandler : _ref$onChangeDateRang,
	    _ref$inputRangeSlider = _ref.inputRangeSliderClickHandler,
	    inputRangeSliderClickHandler = _ref$inputRangeSlider === undefined ? _defaultEventHandlers.defaultInputRangeSliderClickHandler : _ref$inputRangeSlider,
	    _ref$onApplyClickHand = _ref.onApplyClickHandler,
	    onApplyClickHandler = _ref$onApplyClickHand === undefined ? _defaultEventHandlers.defaultOnApplyClickHandler : _ref$onApplyClickHand,
	    baseUrl = _ref.baseUrl;
	return function (_WrappedComponent) {
		(0, _inherits3.default)(SearchKitWrappedComponent, _WrappedComponent);

		function SearchKitWrappedComponent(props) {
			(0, _classCallCheck3.default)(this, SearchKitWrappedComponent);

			var _this = (0, _possibleConstructorReturn3.default)(this, (SearchKitWrappedComponent.__proto__ || (0, _getPrototypeOf2.default)(SearchKitWrappedComponent)).call(this, props));

			var filters = _this.props.results.filters;
			var search = _this.props.location.search;

			var query = (0, _utils.getQueryObjectFromString)(search);
			_this.handleFilterInMobileOnClick = _this.handleFilterInMobileOnClick.bind(_this);

			// this.onScrollSidebarFix = this.onScrollSidebarFix.bind(this);
			filters.fieldValues = (0, _utils.getObjectValuesFromQueryString)(query);

			filters.fieldValues = (0, _utils.getObjectValuesFromQueryString)(query);

			filters.fields = (0, _utils.setAllFieldsToFalse)(filters.fields);
			filters.fields = (0, _utils.setSelectedFitersFieldsToTrue)(filters.fieldValues, filters.fields);

			filters.pathname = baseUrl || _this.props.location.pathname;
			_this.pathname = filters.pathname;
			filters.show = !_this.props.isMobile;

			_this.isMobile = _this.props.isMobile;
			filters.isMobile = _this.props.isMobile;

			filters.onSelectOptionClickHandler = onSelectOptionClickHandler.bind(_this);
			filters.multiCheckBoxClickHandler = multiCheckBoxClickHandler.bind(_this);
			filters.onRadioButtonToggleHandler = onRadioButtonToggleHandler.bind(_this);
			filters.onClearClickHandler = onClearClickHandler.bind(_this);
			filters.handleFilterInMobileOnClick = _this.handleFilterInMobileOnClick.bind(_this);
			filters.onClearAllClickHandler = onClearAllClickHandler.bind(_this);
			filters.onChangeDateRangeHandler = onChangeDateRangeHandler.bind(_this);
			filters.inputRangeSliderClickHandler = inputRangeSliderClickHandler.bind(_this);
			filters.onApplyClickHandler = _defaultEventHandlers.defaultOnApplyClickHandler.bind(_this);

			filters.openFiltersMobile = _this.openFiltersMobile.bind(_this);
			filters.closeFiltersMobile = _this.closeFiltersMobile.bind(_this);

			_this.onPillCloseHandler = onPillCloseHandler.bind(_this);
			_this.onClearAllClickHandler = onClearAllClickHandler.bind(_this);
			_this.state = { filters: filters, prevFilters: null, applied: false };
			return _this;
		}

		(0, _createClass3.default)(SearchKitWrappedComponent, [{
			key: 'openFiltersMobile',
			value: function openFiltersMobile() {
				var filters = (0, _assign2.default)({}, this.state.filters);
				var prevFilters = (0, _utils.clone)(filters);
				filters.show = true;
				this.setState({
					filters: filters,
					prevFilters: prevFilters
				});
			}
		}, {
			key: 'closeFiltersMobile',
			value: function closeFiltersMobile() {
				var filters = (0, _assign2.default)({}, this.state.filters);
				filters.show = false;
				var _state = this.state,
				    applied = _state.applied,
				    prevFilters = _state.prevFilters;

				if (applied) {
					this.setState({
						filters: filters,
						prevFilters: null,
						applied: false
					});
				} else {
					prevFilters.show = false;
					this.setState({
						filters: prevFilters,
						prevFilters: null
					});
				}
			}
		}, {
			key: 'handleFilterInMobileOnClick',
			value: function handleFilterInMobileOnClick() {
				var filters = (0, _assign2.default)({}, this.state.filters);
				if (filters.show) {
					this.closeFiltersMobile();
				} else {
					this.openFiltersMobile();
				}
				filters.show = !filters.show;
				var body = document.querySelector('body');
				if (filters.show) {
					body.classList.add('no-scroll');
				} else {
					body.classList.remove('no-scroll');
				}
				// this.setState({ filters });
			}
		}, {
			key: 'shouldComponentUpdate',
			value: function shouldComponentUpdate(nextProps, nextState) {
				if (this.state.filters.show !== nextState.filters.show || nextProps.results !== this.props.results || nextState !== this.state) {
					return true;
				} else if (nextProps.location.search !== this.props.location.search) {
					return true;
				}
				return false; // HOC shouldn't re render if the URL query doesn't change
			}
		}, {
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.id = (0, _uniqueId2.default)();
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				this.searchResults = document.getElementById('srp-results');
				this.sideBar = document.getElementById('srp-filters');
				this.container = document.querySelector('.panel-group');
				/* if (!this.props.isMobile) {
    	window.addEventListener('scroll', this.onScrollSidebarFix);
    } */
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate() {
				this.searchResults = document.getElementById('srp-results');
				this.sideBar = document.getElementById('srp-filters');
				var content = document.getElementById('srp-results');
				this.contentHeight = content.clientHeight;

				var srpFilters = document.getElementById('srp-filters');

				if (this.contentHeight > this.sidebarHeight) {
					srpFilters.style.height = this.contentHeight + 'px';
				} else {
					srpFilters.style.height = this.sidebarHeight + 'px';
					this.container.classList.remove('sidebar-fixed');
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				var body = document.querySelector('body');
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

		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (nextProps.location.search !== this.props.location.search) {
					this.props.fetch();
					var filters = this.state.filters;

					var newFilters = nextProps.results.filters;

					var search = nextProps.location.search;

					var query = (0, _utils.getQueryObjectFromString)(search);
					filters.fieldValues = (0, _utils.getObjectValuesFromQueryString)(query);
					filters.fields = (0, _utils.setAllFieldsToFalse)(newFilters.fields);
					filters.fields = (0, _utils.setSelectedFitersFieldsToTrue)(filters.fieldValues, newFilters.fields);
					filters.pathname = baseUrl || nextProps.location.pathname;
					this.pathname = filters.pathname;
					this.setState({ filters: filters });
				} else if ('isAuthenticated' in this.props && this.props.isAuthenticated !== nextProps.isAuthenticated) {
					this.props.fetch();
				}
				if (this.props.isMobile !== nextProps.isMobile) {
					var _filters = this.state.filters;

					_filters.show = false;
					this.setState({
						filters: _filters
					});
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var _this2 = this;

				var searchResults = (0, _get3.default)(SearchKitWrappedComponent.prototype.__proto__ || (0, _getPrototypeOf2.default)(SearchKitWrappedComponent.prototype), 'render', this).call(this);
				var _props$location = this.props.location,
				    pathname = _props$location.pathname,
				    search = _props$location.search;

				var query = (0, _utils.getQueryObjectFromString)(search);
				var filters = this.state.filters;
				var title = this.props.results.title;
				// const { show } = filters;

				var fieldValues = filters.fieldValues;

				var fields = (0, _utils.setAllFieldsToFalse)(filters.fields);
				fields = (0, _utils.setSelectedFitersFieldsToTrue)(filters.fieldValues, filters.fields);
				// filters.isMobile = isMobile;
				var specialArgumentsForSearchKit = {
					fieldValues: fieldValues,
					pathname: pathname
				};
				var pills = [];
				if (fieldValues) {
					// pills = Object.keys(fieldValues).map((v, index) => {
					(0, _keys2.default)(fieldValues).map(function (v, index) {
						var propsForEventHandlers = (0, _extends3.default)({}, specialArgumentsForSearchKit, {
							urlCode: v
						});

						if (fields[v] !== undefined) {
							var innerFields = fields[v].values;
							// const subPills = Object.keys(innerFields).map((y) => {
							(0, _keys2.default)(innerFields).map(function (y) {
								var pillExtraProps = (0, _extends3.default)({}, propsForEventHandlers, {
									value: innerFields[y].value
								});
								// return innerFields[y].checked ? (<Pill key={this.id} text={innerFields[y].label} onClickHandler={onPillCloseHandler} extraProps={pillExtraProps} />) : null;
								if (innerFields[y].checked) {
									pills.push(_react2.default.createElement(_Pill2.default, {
										key: (0, _uniqueId2.default)('pill_'),
										text: innerFields[y].label,
										onClickHandler: _this2.onPillCloseHandler,
										extraProps: pillExtraProps
									}));
								}

								return null;
							});
							return null;
						}
						return null;
					});
				}

				if (pills.length > 0) {
					pills.push(_react2.default.createElement(_Pill2.default, {
						key: (0, _uniqueId2.default)('pill_'),
						text: 'Clear All',
						onClickHandler: function onClickHandler() {
							return _this2.onClearAllClickHandler(specialArgumentsForSearchKit);
						},
						extraProps: specialArgumentsForSearchKit,
						noCloseIcon: true,
						className: 'show-cursor'
					}));
				}
				var wrapperClassName = filters.show ? 'srp-wrapper bootstrap-reset filters-open' : 'srp-wrapper bootstrap-reset universal-anim';
				return _react2.default.createElement(
					'section',
					{
						ref: 'list',
						className: wrapperClassName,
						id: 'container'
					},
					_react2.default.createElement(
						'div',
						{ className: 'container' },
						_react2.default.createElement(
							'div',
							{ className: 'row' },
							_react2.default.createElement(_fieldsContainer2.default, {
								query: query,
								filters: filters,
								id: 'srp-filters'
							}),
							_react2.default.createElement(
								'div',
								{ className: 'col-xs-12 col-sm-12 col-md-9' },
								_react2.default.createElement(
									'div',
									{ className: 'srp-content' },
									_react2.default.createElement(
										'div',
										{ className: 'row visible-xs visible-sm' },
										_react2.default.createElement('div', { className: 'col-xs-6' })
									),
									_react2.default.createElement(
										'div',
										{ className: 'srp-results', id: 'srp-results' },
										_react2.default.createElement(
											'div',
											{ className: 'applied-results' },
											_react2.default.createElement(
												'h2',
												{ className: 'result-title' },
												title
											),
											pills.length !== 0 && _react2.default.createElement(
												'ul',
												{ className: 'applied-filter clearfix hidden-xs hidden-sm' },
												pills
											)
										),
										searchResults
									)
								)
							)
						)
					)
				);
			}
		}], [{
			key: 'fetchDataAsync',
			value: function fetchDataAsync(dispatch, params, _ref2, extraArguments) {
				var search = _ref2.search;

				var query = (0, _utils.getQueryObjectFromString)(search);
				var newQuery = (0, _utils.getObjectValuesFromQueryString)(query);
				return WrappedComponent.fetchDataAsync(dispatch, params, { query: newQuery }, extraArguments);
			}
		}]);
		return SearchKitWrappedComponent;
	}(WrappedComponent);
}; // Search Kit HOC
exports.default = searchKitManager;