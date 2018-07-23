'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _collapsibleGroup = require('../collapsibleGroup');

var _radioGroup = require('../radioGroup');

var _radioGroup2 = _interopRequireDefault(_radioGroup);

var _reactResponsive = require('react-responsive');

var _reactResponsive2 = _interopRequireDefault(_reactResponsive);

var _utils = require('../../helpers/utils');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _antd = require('antd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxGroup = _antd.Checkbox.Group;
// import InputRange from 'react-input-range';
// import 'react-input-range/lib/css/index.css';


var propTypes = {

  filters: _propTypes2.default.shape({
    fieldValues: _propTypes2.default.object,
    fields: _propTypes2.default.object,
    onRadioButtonToggleHandler: _propTypes2.default.func,
    multiCheckBoxClickHandler: _propTypes2.default.func,
    onClearClickHandler: _propTypes2.default.func,
    onClearAllClickHandler: _propTypes2.default.func,
    onChangeDateRangeHandler: _propTypes2.default.func,
    show: _propTypes2.default.bool,
    isMobile: _propTypes2.default.bool,
    pathname: _propTypes2.default.string,
    handleFilterInMobileOnClick: _propTypes2.default.func,
    inputRangeSliderClickHandler: _propTypes2.default.func,
    onApplyClickHandler: _propTypes2.default.func
  }),
  // fieldValues: PropTypes.object,
  // filters: PropTypes.object,
  // onSelectOptionClickHandler: PropTypes.func,
  // onRadioButtonToggleHandler: PropTypes.func,
  // multiCheckBoxClickHandler: PropTypes.func,
  // onClearClickHandler: PropTypes.func,
  // onClearAllClickHandler: PropTypes.func,
  // onChangeDateRangeHandler: PropTypes.func,
  // show: PropTypes.bool,
  // isMobile: PropTypes.bool,
  // pathname: PropTypes.string,
  // handleFilterInMobileOnClick: PropTypes.func,
  // inputRangeSliderClickHandler: PropTypes.func,
  // onApplyClickHandler: PropTypes.func,
  id: _propTypes2.default.string
};

var FieldsContainer = function FieldsContainer(props) {
  var filters = props.filters,
      query = props.query;
  /* filters.fieldValues = getObjectValuesFromQueryString(query);*/

  filters.fields = (0, _utils.setAllFieldsToFalse)(filters.fields);
  filters.fields = (0, _utils.setSelectedFitersFieldsToTrue)(filters.fieldValues, filters.fields);

  var isMobile = filters.isMobile;

  var fieldValues = filters.fieldValues;
  var style = filters.show ? { display: 'block' } : { display: 'none' };

  var multiCheckBoxClickHandler = filters.multiCheckBoxClickHandler,
      onRadioButtonToggleHandler = filters.onRadioButtonToggleHandler,
      onClearClickHandler = filters.onClearClickHandler,
      handleFilterInMobileOnClick = filters.handleFilterInMobileOnClick,
      onClearAllClickHandler = filters.onClearAllClickHandler,
      onChangeDateRangeHandler = filters.onChangeDateRangeHandler,
      inputRangeSliderClickHandler = filters.inputRangeSliderClickHandler,
      onApplyClickHandler = filters.onApplyClickHandler;


  var specialPropsForSearchKit = {
    fieldValues: fieldValues,
    pathname: filters.pathname
  };

  var fieldList = (0, _keys2.default)(filters.fields).map(function (v, index) {
    var field = filters.fields[v];

    field.label = field.default;
    var camelTitle = field.urlCode;
    if (fieldValues !== undefined) {
      if (fieldValues[camelTitle] !== undefined) {
        if (fieldValues[camelTitle].constructor === Array) {
          field.label = fieldValues[camelTitle][0];
        } else {
          field.label = fieldValues[camelTitle];
        }
      }
    }
    var extraProps = (0, _extends3.default)({}, specialPropsForSearchKit, {
      title: field.title,
      urlCode: field.urlCode
    });

    // TODO - render diff components based on field type
    var inputComponent = null;
    var componentToBeCollapsed = null;
    var filterClassName = null;
    var showClear = !!fieldValues[field.urlCode];
    switch (field.type) {
      case 1:
        {
          break;
        }
      case 2:
        {
          var newValues = field.values.map(function (item) {
            return {
              label: item.label,
              value: item.value,
              checked: item.checked,
              id: field.urlCode + '_' + item.value
            };
          });
          inputComponent = _react2.default.createElement(_radioGroup2.default, { items: newValues, handler: onRadioButtonToggleHandler, name: field.urlCode, extraProps: extraProps });
          componentToBeCollapsed = inputComponent;
          break;
        }

      case 3:
        {
          var handleCheckBoxClick = field.customHandler ? field.handler : multiCheckBoxClickHandler;
          // inputComponent = (
          //   <SearchableListFilter
          //     listOfItems={field.values}
          //     handleCheckBoxClick={handleCheckBoxClick}
          //     extraProps={extraProps}
          //     isMobile={isMobile}
          //   />);
          inputComponent = _react2.default.createElement(CheckboxGroup, { onChange: handleCheckBoxClick, options: field.values });
          // filterClassName = 'overflow-hidden';
          componentToBeCollapsed = inputComponent;
          break;
        }
      /* case 4: {
        inputComponent = <DateRange extraProps={extraProps} values={field} onChangeDateRange={onChangeDateRangeHandler} />;
        filterClassName = 'overflow-visible';
        componentToBeCollapsed = inputComponent;
        break;
      }
       case 5: {
        inputComponent = (<InputRangeSlider
          maxValue={field.max}
          minValue={field.min}
          min={fieldValues[field.urlCode] ? parseInt(fieldValues[field.urlCode][0], 10) || field.min : field.min}
          max={fieldValues[field.urlCode] ? parseInt(fieldValues[field.urlCode][1], 10) || field.max : field.max}
          formatLabel={value => `${value}`}
          extraProps={extraProps}
          handleChange={inputRangeSliderClickHandler}
        />);
        componentToBeCollapsed = inputComponent;
        break;
      } */
      default:
        {
          break;
        }
    }

    // const collapseOrNot = !props.isMobile;
    return { content: componentToBeCollapsed, title: field.title, extraProps: extraProps, onClearClickHandler: onClearClickHandler, filterClassName: filterClassName, showClear: showClear }; //  show: collapseOrNot
  });
  // fieldList.push({ content: <DateField />, title: 'Date', onClearClickHandler });
  // const collapsibleGroup = props.isMobile ? <CollapsibleGroupForMobile collapsibleContentArray={fieldList} /> : <CollapsibleGroup collapsibleContentArray={fieldList} />;
  // const mobileDoneFilterCheckButton = props.isMobile ? <Button className="btn btn-primary" onClick={handleFilterInMobileOnClick}>Apply</Button> : null;
  return _react2.default.createElement(
    'div',
    { className: 'col-xs-12 col-sm-12 col-md-3', id: props.id },
    _react2.default.createElement(
      _reactResponsive2.default,
      { query: '(min-width: 1024px)' },
      _react2.default.createElement(
        'div',
        { className: 'panel-group filters clearfix', id: 'accordion' },
        _react2.default.createElement(
          'div',
          { className: 'filter-title' },
          'Filter By'
        ),
        _react2.default.createElement(_collapsibleGroup.CollapsibleGroup, { collapsibleContentArray: fieldList })
      )
    ),
    _react2.default.createElement(
      _reactResponsive2.default,
      { query: '(max-width: 1023px)' },
      _react2.default.createElement(
        'div',
        { className: 'panel-group filters clearfix', style: style, id: 'accordion' },
        _react2.default.createElement(
          'div',
          { className: 'filter-title' },
          _react2.default.createElement('i', { className: 'icon-close', onClick: handleFilterInMobileOnClick }),
          'Filter By'
        ),
        _react2.default.createElement(_collapsibleGroup.CollapsibleGroupForMobile, { collapsibleContentArray: fieldList }),
        _react2.default.createElement(
          'div',
          { className: 'btn-fixed full-width' },
          _react2.default.createElement(
            _antd.Button,
            { className: 'btn btn-primary txt-white full-width', style: { width: '40%', background: '#525252', borderColor: '#525252' }, onClick: function onClick(e) {
                return onClearAllClickHandler(specialPropsForSearchKit);
              } },
            'Reset'
          ),
          _react2.default.createElement(
            _antd.Button,
            { className: 'btn btn-primary', style: { width: '60%' }, onClick: function onClick(e) {
                onApplyClickHandler();handleFilterInMobileOnClick();
              } },
            'Apply'
          )
        )
      )
    )
  );
};

FieldsContainer.propTypes = propTypes;

// const FieldsContainer = (props) => <div className="field">Container</div>;

exports.default = FieldsContainer;