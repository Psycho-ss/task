import axios from 'axios';
import { ConstantsInterface } from "../types/Common";
import constants, {apiUrl} from "../utils/constants";

const typedConstants: ConstantsInterface = constants;

export const createFormChange = (path: string, value: any) => ({
    type: typedConstants.CREATE_FORM_CHANGE,
    payload: { path, value }
});

export const addPhone = (data: any, authToken: string) => ({
    type: typedConstants.PROMISE_ADD_PHONE,
    payload: axios({
        method: 'post',
        url: `${apiUrl}api/v1/phones`,
        data: data,
        headers: {
            'Content-Type': 'application/json',
            'Auth-Token': authToken,
        }
    })
        .then(response => {
            if (response.status !== 201) {
                throw new Error(response.statusText);
            }

            return response;
        })
        .catch(reason => {
            throw reason;
        }),
});