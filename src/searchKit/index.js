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
