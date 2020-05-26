import { ConstantsInterface } from "../types/Common";
import constants from "../utils/constants";
import {browserHistory} from "../configureStore";

const typedConstants: ConstantsInterface = constants;

const initialState = {
    name: '',
    password: '',
    error: false,
    errorMsg: '',
    pathname: '/login',
    user: {},
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case typedConstants.PROMISE_LOG_IN_ERROR: {
            const { response } = action.payload;
            const errorsMsg = response?.data?.error;
            return {
                ...state,
                error: true,
                errorMsg: errorsMsg,
            };
        }
        case typedConstants.GET_TOKEN: {
            const userData = action.payload;
            return {
                ...state,
                user: userData,
            }
        }
        case typedConstants.LOG_OUT: {
            localStorage.removeItem('userData');
            setTimeout(() => {
                browserHistory.push('login');
            }, 1);
            return {
                ...state,
            }
        }
        case typedConstants.PROMISE_LOG_IN_SUCCESS: {
            const { data } = action.payload;
            localStorage.setItem('userData', JSON.stringify(data));
            setTimeout(() => {
                browserHistory.push('list');
            }, 1);
            return state;
        }
        case typedConstants.HANDLE_LOGIN_FORM_CHANGE: {
            const { name, value } = action.payload;
            return {
                ...state,
                [name]: value,
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;