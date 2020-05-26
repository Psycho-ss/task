/*
*   Function responsible for creating _FETCH, _ERROR, _SUCCESS constants
*   for later use in reducer's
*/

const addKeys = (constants: string[]) => {
    const newArray: string[] = [];
    for (const it of constants) {
        if (it.includes('FETCH') || it.includes('PROMISE')) {
            newArray.push(`${it}_START`);
            newArray.push(`${it}_ERROR`);
            newArray.push(`${it}_SUCCESS`);
            newArray.push(it);
        } else {
            newArray.push(it);
        }
    }
    return newArray;
};

/*
*   Constants used as type handler in actions/reducers
*   add any constants
*/

const defaultConstants: string[] = [
    'PROMISE_LOG_IN',
    'TEST',
    'FETCH_ALL_PHONES',
    'PROMISE_RETURN_PHONE',
    'PROMISE_BORROW_PHONE',
    'HANDLE_LOGIN_FORM_CHANGE',
    'GET_TOKEN',
    'CREATE_FORM_CHANGE',
    'LOG_OUT',
    'PROMISE_ADD_PHONE',
    'FILTER_CHANGE',
    'FILTER',
    'PROMISE_DELETE_PHONE',
];

const constants: string[] = addKeys(defaultConstants);

export default constants.reduce((obj, it) => ({...obj, [it]: it}), {});

/*
*   Path for react-router rendering
*   add any path for new page
*/

export const availablePaths: string [] = [
    '/list',
    '/createDevice',
    '/',
];

/*
*   Options for createDevice from
*/

export const models: Array<any> = [
    {
        label: 'Samsung',
        value: 'SAMSUNG'
    },
    {
        label: 'Acer',
        value: 'ACER'
    },
    {
        label: 'Apple',
        value: 'APPLE'
    },
    {
        label: 'Asus',
        value: 'ASUS'
    },
    {
        label: 'Huawei',
        value: 'HUAWEI'
    },
    {
        label: 'Motorola',
        value: 'MOTOROLA'
    },
    {
        label: 'Lg',
        value: 'LG'
    },
];

export const os: Array<any> = [
    {
        label: 'Android',
        value: 'ANDROID'
    },
    {
        label: 'iOs',
        value: 'IOS'
    },
];

export const apiUrl = 'https://js-test-api.etnetera.cz/';