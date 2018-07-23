// import { browserHistory } from 'react-router';
import { stringifyQueryParams,stripTrailingSlash } from './utils';

/**
 * Default Handler to the Select Component used by SearchKit HOC if you do not override the handler
 * SearchKit expects handler to change the url appropriately when any event occurs
 * Handler is bound to searchKit.
 * @param  {[type]} name
 * @param  {[type]} label
 * @param  {[type]} value
 * @param  {[type]} event                           event object
 * @param  {[type]} specialArgumentsForSearchKit    Object which contains extra arguments needed to populate the URL from an existing object
 * @return {none}
 */
function defaultOnSelectOptionClickHandler(name, label, value, event, specialArgumentsForSearchKit) {
    const key = specialArgumentsForSearchKit.urlCode;
    const queryObject = specialArgumentsForSearchKit.fieldValues;
    const pathname = stripTrailingSlash(specialArgumentsForSearchKit.pathname);
    queryObject[key] = [value];

    if (this.isMobile) {
        const { filters } = this.state;
        const newState = Object.assign({}, filters, { fieldValues: queryObject });
        this.setState({
            filters: newState,
        });
    } else {
        const { history } = this.props;
        const url = stringifyQueryParams(queryObject);
        history.push(`${pathname}/?${url}`);
    }
}

/**
 * Default Handler to the Checkbox Component used by the SearchKit HOC if you do not override the existing handler
 * SearchKit expects handler to change appropriately the url when any event occurs
 * @param  {[type]} event                        [description]
 * @param  {[type]} specialArgumentsForSearchKit  Object which contains extra arguments needed to populate the URL from an existing object
 * @return {none}
 */

function defaultMultiCheckBoxClickHandler(event, specialArgumentsForSearchKit) {
    const key = specialArgumentsForSearchKit.urlCode;
    const queryObject = specialArgumentsForSearchKit.fieldValues;
    const pathname = stripTrailingSlash(specialArgumentsForSearchKit.pathname);
    const value = specialArgumentsForSearchKit.value;
    if (queryObject[key] !== undefined) {
        const arr = queryObject[key];
        let ind = -1;
        if ((ind = arr.indexOf(value)) > -1) {
            arr.splice(ind, 1);
            if (arr.length > 0) {
                queryObject[key] = arr;
            } else {
                delete queryObject[key];
            }
        } else {
            queryObject[key].push(...[value]);
        }
    } else {
        queryObject[key] = [value];
    }

    if (this.isMobile) {
        const { filters } = this.state;
        const newState = Object.assign({}, filters, { fieldValues: queryObject });
        this.setState({
            filters: newState,
        });
    } else {
        const { history } = this.props;
        const url = stringifyQueryParams(queryObject);
        history.push(`${pathname}/?${url}`);
    }

}

/**
 * Default Handler to the RadioButton Component used by the SearchKit HOC if you do not override the handler
 * SearchKit expects handler to change appropriately the url when any event occurs
 * @param  {[type]} event                        [description]
 * @param  {[type]} specialArgumentsForSearchKit  Object which contains extra arguments needed to populate the URL from an existing object
 * @return {none}
 */

function defaultOnRadioButtonToggleHandler(event, specialArgumentsForSearchKit) {
    const key = specialArgumentsForSearchKit.urlCode;
    const queryObject = specialArgumentsForSearchKit.fieldValues;
    const pathname = stripTrailingSlash(specialArgumentsForSearchKit.pathname);
    if (specialArgumentsForSearchKit.checked) {
        queryObject[key] = [specialArgumentsForSearchKit.value];
    } else {
        delete queryObject[key];
    }

    if (this.isMobile) {
        const { filters } = this.state;
        const newState = Object.assign({}, filters, { fieldValues: queryObject });
        this.setState({
            filters: newState,
        });
    } else {
        const { history } = this.props;
        const url = stringifyQueryParams(queryObject);
        history.push(`${pathname}/?${url}`);
    }

}


/**
 * Default Handler to the Pill Component used by the SearchKit HOC if you do not override the handler
 * SearchKit expects handler to change appropriately the url when any event occurs
 * @param  {[type]} event                        [description]
 * @param  {[type]} specialArgumentsForSearchKit  Object which contains extra arguments needed to populate the URL from an existing object
 * @return {none}
 */

function defaultOnPillCloseHandler(specialArgumentsForSearchKit) {
    const key = specialArgumentsForSearchKit.urlCode;
    const queryObject = specialArgumentsForSearchKit.fieldValues;
    const pathname = stripTrailingSlash(specialArgumentsForSearchKit.pathname);
    const value = specialArgumentsForSearchKit.value;
    if (queryObject[key] !== undefined) {
        const arr = queryObject[key];
        let ind = -1;
        ind = arr.indexOf(value);
        if (ind > -1) {
            arr.splice(ind, 1);
            if (arr.length > 0) {
                queryObject[key] = arr;
            } else {
                delete queryObject[key];
            }
        } else {
            queryObject[key].push(...[value]);
        }
    } else {
        queryObject[key] = [value];
    }

    if (this.isMobile) {
        const { filters } = this.state;
        const newState = Object.assign({}, filters, { fieldValues: queryObject });
        this.setState({
            filters: newState,
        });
    } else {
        const { history } = this.props;
        const url = stringifyQueryParams(queryObject);
        history.replace({pathname: `${pathname}`, search: `?${url}`});
    }
}

function defaultInputRangeSliderClickHandler(values, specialArgumentsForSearchKit) {
    const { history } = this.props;
    const key = specialArgumentsForSearchKit.urlCode;
    const queryObject = specialArgumentsForSearchKit.fieldValues;
    const pathname = stripTrailingSlash(specialArgumentsForSearchKit.pathname);
    queryObject[key] = [values.min, values.max];
    const url = stringifyQueryParams(queryObject);
    history.replace({pathname: `${pathname}`, search: `?${url}`});
}

function defaultOnChangeDateRangeHandler(fromDate, toDate, specialArgumentsForSearchKit) {
    const key = specialArgumentsForSearchKit.urlCode;
    const queryObject = specialArgumentsForSearchKit.fieldValues;
    queryObject[key] = [fromDate.valueOf() / 1000, toDate.valueOf() / 1000];
    const pathname = stripTrailingSlash(specialArgumentsForSearchKit.pathname);

    if (this.isMobile) {
        const { filters } = this.state;
        const newState = Object.assign({}, filters, { fieldValues: queryObject });
        this.setState({
            filters: newState,
        });
    } else {
        const { history } = this.props;
        const url = stringifyQueryParams(queryObject);
        history.replace({pathname: `${pathname}`, search: `?${url}`});
    }
}

/**
 * Default Handler to handle clear filters event
 * @param  {[type]} event                        [description]
 * @param  {[type]} specialArgumentsForSearchKit [description]
 * @return {[type]}                              [description]
 */

function defaultOnClearClickHandler(event, specialArgumentsForSearchKit) {
    const key = specialArgumentsForSearchKit.urlCode;
    const queryObject = specialArgumentsForSearchKit.fieldValues;
    const pathname = stripTrailingSlash(specialArgumentsForSearchKit.pathname);
    delete queryObject[key];

    if (this.isMobile) {
        const { filters } = this.state;
        const newState = Object.assign({}, filters, { fieldValues: queryObject });
        this.setState({
            filters: newState,
        });
    } else {
        const { history } = this.props;
        const url = stringifyQueryParams(queryObject);
        history.replace({pathname: `${pathname}`, search: `?${url}`});
    }
}

function defaultOnApplyClickHandler() {
    this.setState({
        applied: true,
    });
    const { history } = this.props;
    const queryObject = this.state.filters.fieldValues;
    const pathname = stripTrailingSlash(this.pathname);
    const url = stringifyQueryParams(queryObject);
    history.replace({pathname: `${pathname}`, search: `?${url}`});

}

/**
 * Default handler to clear all filters
 */
function defaultOnClearAllClickHandler(specialArgumentsForSearchKit) {
    const { history } = this.props;
    const pathname = stripTrailingSlash(specialArgumentsForSearchKit.pathname);
    history.push({pathname: `${pathname}`});
}

export {
    defaultInputRangeSliderClickHandler,
    defaultMultiCheckBoxClickHandler,
    defaultOnApplyClickHandler,
    defaultOnChangeDateRangeHandler,
    defaultOnSelectOptionClickHandler,
    defaultOnRadioButtonToggleHandler,
    defaultOnPillCloseHandler,
    defaultOnClearClickHandler,
    defaultOnClearAllClickHandler
};
