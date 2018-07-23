import queryString from 'query-string';

/**
 * Utility function used by SearchKit to convert an object consisting of parameters into query string format
 * @param  {object} obj Object which needs to be converted to string
 * @return {String}
 */
export const stringifyQueryParams = (obj, ignorePage = true) => {
<<<<<<< HEAD
	let returnStr = '';
	if (obj.page && ignorePage) {
		delete obj.page;
	}
	const array = Object.keys(obj).map(v => {
		if (obj[v].constructor === Array) {
			return `${v}=[${obj[v].toString()}]`;
		}
		return `${v}=${obj[v].toString()}`;
	});
	returnStr = array.join('&');
	return returnStr;
=======
    let returnStr = '';
    if (obj.page && ignorePage) {
        delete obj.page;
    }
    const array = Object.keys(obj).map(v => {
        if (obj[v].constructor === Array) {
            return `${v}=[${obj[v].toString()}]`;
        }
        return `${v}=${obj[v].toString()}`;
    });
    returnStr = array.join('&');
    return returnStr;
>>>>>>> Searchkit, complete rewrite
};

/**
 * Utility function used by SearchKit to extract values from the value string and convert each value into appropriate type
 * @param  {object} object with key and value pairs where value is always a string which is yet to be processed
 * @return {object}
 */
export const getObjectValuesFromQueryString = (obj) => {
<<<<<<< HEAD
	const returnObj = {};

	const booleanArr = ['true', 'false'];

	Object.keys(obj).map(v => {
		let value = obj[v];
    // value = decode(value);
		let flag = false;
		if (value.indexOf('[') > -1) {
			value = value.substring(1, value.length - 1);
			flag = true;
		}
		if (flag) {
			const arr = value.split(',');
			value = arr.map(member => {
				if (booleanArr.indexOf(member) > -1) {
					return JSON.parse(member);
				}
				return member;
			});
		}
		returnObj[v] = value;
		return null;
	});
	return returnObj;
=======
    const returnObj = {};

    const booleanArr = ['true', 'false'];

    Object.keys(obj).map(v => {
        let value = obj[v];
        // value = decode(value);
        let flag = false;
        if (value.indexOf('[') > -1) {
            value = value.substring(1, value.length - 1);
            flag = true;
        }
        if (flag) {
            const arr = value.split(',');
            value = arr.map(member => {
                if (booleanArr.indexOf(member) > -1) {
                    return JSON.parse(member);
                }
                return member;
            });
        }
        returnObj[v] = value;
        return null;
    });
    return returnObj;
>>>>>>> Searchkit, complete rewrite
};

/**
 * Util used by searchKit to set all fields checked value to a defaultValue
 * @param  {[type]}  fields       [description]
 * @param  {Boolean} defaultValue [description]
 * @return {[type]}               [description]
 */
export const setAllFieldsToFalse = (fields, defaultValue = false) => {
<<<<<<< HEAD
	Object.keys(fields).map((v, index) => {
		const innerFields = fields[v].values;
		if (typeof innerFields !== 'undefined') {
			Object.keys(innerFields).map((y) => {
				innerFields[y].checked = defaultValue;
				return null;
			});
		}
		return null;
	});
	return fields;
=======
    Object.keys(fields).map((v, index) => {
        const innerFields = fields[v].values;
        if (typeof innerFields !== 'undefined') {
            Object.keys(innerFields).map((y) => {
                innerFields[y].checked = defaultValue;
                return null;
            });
        }
        return null;
    });
    return fields;
>>>>>>> Searchkit, complete rewrite
};

/**
 * Util used by the searchKit HOC to set the fields values
 * based on the selected filters(using fieldValues Object
 * which is extracted from the url)
 * @param  {[type]} fieldValues [description]
 * @param  {[type]} fields      [description]
 * @return {[type]}             [description]
 */
export const setSelectedFitersFieldsToTrue = (fieldValues, fields) => {
<<<<<<< HEAD
	if (Object.keys(fieldValues).length !== 0) {
		const x = Object.keys(fieldValues).map((v, index) => {
			const urlFieldValues = fieldValues[v];
			if (fields[v] !== undefined) {
				const innerFields = fields[v].values;
				Object.keys(innerFields).map((y) => {
					const indexOfStaticFieldInQueryObject = urlFieldValues.indexOf(innerFields[y].value);
					if (indexOfStaticFieldInQueryObject > -1) {
						innerFields[y].checked = true;
					}
					return null;
				});
			}
			return null;
		});
	}
	return fields;
};

export const clone = (o) => {
	let v;
	let _key;
	const _out = Array.isArray(o) ? [] : {};
	for (_key in o) {
		v = o[_key];
		_out[_key] = (typeof v === 'object') ? clone(v) : v;
	}
	return _out;
};

export const stripTrailingSlash = (str) => {
	if (str.substr(-1) === '/') {
		return str.substr(0, str.length - 1);
	}
	return str;
};

export const getQueryObjectFromString = (query) => {
	return queryString.parse(query);
=======
    if (Object.keys(fieldValues).length !== 0) {
        const x = Object.keys(fieldValues).map((v, index) => {
            const urlFieldValues = fieldValues[v];
            if (fields[v] !== undefined) {
                const innerFields = fields[v].values;
                Object.keys(innerFields).map((y) => {
                    const indexOfStaticFieldInQueryObject = urlFieldValues.indexOf(innerFields[y].value);
                    if (indexOfStaticFieldInQueryObject > -1) {
                        innerFields[y].checked = true;
                    }
                    return null;
                });
            }
            return null;
        });
    }
    return fields;
};

export const clone = (o) => {
    let v;
    let _key;
    const _out = Array.isArray(o) ? [] : {};
    for (_key in o) {
        v = o[_key];
        _out[_key] = (typeof v === 'object') ? clone(v) : v;
    }
    return _out;
};

export const stripTrailingSlash = (str) => {
    if (str.substr(-1) === '/') {
        return str.substr(0, str.length - 1);
    }
    return str;
};

export const getQueryObjectFromString = (query) => {
    return queryString.parse(query);
>>>>>>> Searchkit, complete rewrite
};
