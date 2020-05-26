import axios from 'axios';
import { ConstantsInterface } from "../types/Common";
import { LoginD } from "../types/Login";
import constants, { apiUrl } from "../utils/constants";

const typedConstants: ConstantsInterface = constants;

export const logIn = (data: LoginD) => ({
    type: typedConstants.PROMISE_LOG_IN,
    payload: axios({
        method: 'post',
        url: `${apiUrl}api/v1/login`,
        data: data,
        headers: {
            'Content-Type': 'application/json'
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

export const getToken = (authToken: string) => ({
    type: typedConstants.GET_TOKEN,
    payload: authToken,
});

export const logOut = () => ({
    type: typedConstants.LOG_OUT,
});

export const handleLoginFormChange = (name: string, value: string) => ({
    type: typedConstants.HANDLE_LOGIN_FORM_CHANGE,
    payload: { name, value },
});