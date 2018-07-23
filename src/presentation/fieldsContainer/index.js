import React from 'react';
import { CollapsibleGroup, CollapsibleGroupForMobile } from '../collapsibleGroup';
import RadioButtonGroup from '../radioGroup';
import MediaQuery from 'react-responsive';
// import InputRange from 'react-input-range';
// import 'react-input-range/lib/css/index.css';
import { getObjectValuesFromQueryString, setAllFieldsToFalse, setSelectedFitersFieldsToTrue } from '../../helpers/utils';
import PropTypes from 'prop-types';
import { Checkbox, Button } from 'antd';

const CheckboxGroup = Checkbox.Group;

const propTypes = {

	filters: PropTypes.shape({
		fieldValues: PropTypes.object,
		fields: PropTypes.object,
		onRadioButtonToggleHandler: PropTypes.func,
		multiCheckBoxClickHandler: PropTypes.func,
		onClearClickHandler: PropTypes.func,
		onClearAllClickHandler: PropTypes.func,
		onChangeDateRangeHandler: PropTypes.func,
		show: PropTypes.bool,
		isMobile: PropTypes.bool,
		pathname: PropTypes.string,
		handleFilterInMobileOnClick: PropTypes.func,
		inputRangeSliderClickHandler: PropTypes.func,
		onApplyClickHandler: PropTypes.func,
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
	id: PropTypes.string,
};

const FieldsContainer = (props) => {
	const { filters, query } = props;
  /* filters.fieldValues = getObjectValuesFromQueryString(query);*/

	filters.fields = setAllFieldsToFalse(filters.fields);
	filters.fields = setSelectedFitersFieldsToTrue(filters.fieldValues, filters.fields);

	const { isMobile } = filters;
	const fieldValues = filters.fieldValues;
	const style = filters.show ? { display: 'block' } : { display: 'none' };

	const {
    multiCheckBoxClickHandler,
    onRadioButtonToggleHandler,
    onClearClickHandler,
    handleFilterInMobileOnClick,
    onClearAllClickHandler,
    onChangeDateRangeHandler,
    inputRangeSliderClickHandler,
    onApplyClickHandler,
    // openFiltersMobile,
    // closeFiltersMobile,
  } = filters;


	const specialPropsForSearchKit = {
		fieldValues,
		pathname: filters.pathname,
	};

	const fieldList = Object.keys(filters.fields).map((v, index) => {
		const field = filters.fields[v];

		field.label = field.default;
		const camelTitle = field.urlCode;
		if (fieldValues !== undefined) {
			if (fieldValues[camelTitle] !== undefined) {
				if (fieldValues[camelTitle].constructor === Array) {
					field.label = fieldValues[camelTitle][0];
				} else {
					field.label = fieldValues[camelTitle];
				}
			}
		}
		const extraProps = {
			...specialPropsForSearchKit,
			title: field.title,
			urlCode: field.urlCode,
		};

    // TODO - render diff components based on field type
		let inputComponent = null;
		let componentToBeCollapsed = null;
		let filterClassName = null;
		const showClear = !!fieldValues[field.urlCode];
		switch (field.type) {
		case 1: {
			break;
		}
		case 2: {
			const newValues = field.values.map((item) => ({
				label: item.label,
				value: item.value,
				checked: item.checked,
				id: `${field.urlCode}_${item.value}`
			}));
			inputComponent = (
          <RadioButtonGroup items={newValues} handler={onRadioButtonToggleHandler} name={field.urlCode} extraProps={extraProps} />);
			componentToBeCollapsed = inputComponent;
			break;
		}

		case 3: {
			const handleCheckBoxClick = field.customHandler ? field.handler : multiCheckBoxClickHandler;
        // inputComponent = (
        //   <SearchableListFilter
        //     listOfItems={field.values}
        //     handleCheckBoxClick={handleCheckBoxClick}
        //     extraProps={extraProps}
        //     isMobile={isMobile}
        //   />);
			inputComponent = (<CheckboxGroup onChange={handleCheckBoxClick} options={field.values} />);
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
		default: {
			break;
		}
		}

    // const collapseOrNot = !props.isMobile;
		return { content: componentToBeCollapsed, title: field.title, extraProps, onClearClickHandler, filterClassName, showClear };//  show: collapseOrNot
	});
  // fieldList.push({ content: <DateField />, title: 'Date', onClearClickHandler });
  // const collapsibleGroup = props.isMobile ? <CollapsibleGroupForMobile collapsibleContentArray={fieldList} /> : <CollapsibleGroup collapsibleContentArray={fieldList} />;
  // const mobileDoneFilterCheckButton = props.isMobile ? <Button className="btn btn-primary" onClick={handleFilterInMobileOnClick}>Apply</Button> : null;
	return (
    <div className="col-xs-12 col-sm-12 col-md-3" id={props.id}>
      <MediaQuery query="(min-width: 1024px)">
        <div className="panel-group filters clearfix" id="accordion">
          <div className="filter-title">
            {/*<i className="icon-close" onClick={handleFilterInMobileOnClick} />*/}
                 Filter By
          </div>
          <CollapsibleGroup collapsibleContentArray={fieldList} />
        </div>
      </MediaQuery>
      <MediaQuery query="(max-width: 1023px)">
        <div className="panel-group filters clearfix" style={style} id="accordion">
          <div className="filter-title">
            <i className="icon-close" onClick={handleFilterInMobileOnClick} />
            Filter By
          </div>
          <CollapsibleGroupForMobile collapsibleContentArray={fieldList} />
          <div className="btn-fixed full-width">
            <Button className="btn btn-primary txt-white full-width" style={{ width: '40%', background: '#525252', borderColor: '#525252' }} onClick={e => onClearAllClickHandler(specialPropsForSearchKit)}>Reset</Button>
            <Button className="btn btn-primary" style={{ width: '60%' }} onClick={(e) => { onApplyClickHandler(); handleFilterInMobileOnClick(); }}>Apply</Button>
          </div>
        </div>

      </MediaQuery>
    </div>);
};

FieldsContainer.propTypes = propTypes;

// const FieldsContainer = (props) => <div className="field">Container</div>;

export default FieldsContainer;
