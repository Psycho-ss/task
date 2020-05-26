import axios from 'axios';
import { ConstantsInterface } from "../types/Common";
import constants, {apiUrl} from "../utils/constants";

const typedConstants: ConstantsInterface = constants;

export const fetchAllPhones = (authToken: string) => ({
    type: typedConstants.FETCH_ALL_PHONES,
    payload: axios({
        method: 'get',
        url: `${apiUrl}api/v1/phones`,
        headers: {
            'Auth-Token': authToken,
        }
    })
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }

            return response;
        })
        .catch(reason => {
            throw reason;
        }),
});

export const returnPhone = (phoneID: string, authToken: string) => ({
    type: typedConstants.PROMISE_RETURN_PHONE,
    payload: axios({
        method: 'post',
        url: `${apiUrl}api/v1/phones/${phoneID}/return`,
        headers: {
            'Content-Type': 'application/json',
            'Auth-Token': authToken,
        }
    })
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }

            return response;
        })
        .catch(reason => {
            throw reason;
        }),
});

export const borrowPhone = (phoneID: string, authToken: string) => ({
    type: typedConstants.PROMISE_BORROW_PHONE,
    payload: axios({
        method: 'post',
        url: `${apiUrl}api/v1/phones/${phoneID}/borrow`,
        headers: {
            'Content-Type': 'application/json',
            'Auth-Token': authToken,
        }
    })
        .then(response => {
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }

            return response;
        })
        .catch(reason => {
            throw reason;
        }),
});

export const deletePhone = (phoneID: string, authToken: string) => ({
    type: typedConstants.PROMISE_DELETE_PHONE,
    payload: axios({
        method: 'delete',
        url: `${apiUrl}api/v1/phones/${phoneID}`,
        headers: {
            'Content-Type': 'application/json',
            'Auth-Token': authToken,
        }
    })
        .then(response => {
            if (response.status !== 204) {
                throw new Error(response.statusText);
            }

            return response;
        })
        .catch(reason => {
            throw reason;
        }),
});

export const filterChange = (path, value) => ({
    type: typedConstants.FILTER_CHANGE,
    payload: { path, value },
});

export const filter = () => ({
    type: typedConstants.FILTER,
})