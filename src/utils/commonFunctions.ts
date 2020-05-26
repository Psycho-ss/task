import { availablePaths } from './constants';

/*
*   Function responsible for receiving auth token or auth user
*   for later use
*/

export const getToken = (onlyToken = true) => {
    const data = JSON.parse(localStorage.getItem('userData') || '{}');
    if (data && onlyToken) return data?.token;
    else if (data && !onlyToken) return data;
    else return null;
};

/*
*   Function responsible for declaring paths
*/

export const getRedirectPath = (pathName, token) => {
    let path = '';
    if (token && (pathName === '/login' || pathName === '/')) {
        path = '/list'
    } else if (!token && pathName !== '/login') {
        path = '/login'
    } else if (token && !availablePaths.includes(pathName)) {
        path = '/404'
    } else {
        path = pathName;
    }
    return path;
};

/*
*   Function responsible for arrays filters
*/

export const filterArray = (array, filters) => {
    const filterKeys = Object.keys(filters);
    return array.filter(item => {
        return filterKeys.every(key => {
            if (typeof filters[key] !== 'function') return true;
            return filters[key](item[key]);
        });
    });
};

export const remapData = (data) => ({
    code: data?.code,
    os: data?.os?.value,
    vendor: data?.vendor?.value,
    model: data?.model,
    osVersion: data?.osVersion,
    image: data?.image,
});