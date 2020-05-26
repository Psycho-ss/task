import { ConstantsInterface } from "../types/Common";
import constants from "../utils/constants";

const typedConstants: ConstantsInterface = constants;

const initialState = {
    code: '',
    os: null,
    osVersion: '',
    vendor: null,
    image: '',
    model: '',
    error: false,
    errorMsg: '',
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case typedConstants.PROMISE_ADD_PHONE_ERROR: {
            const { response } = action.payload;
            const errorsMsg = response?.data?.error;
            return {
                ...state,
                error: true,
                errorMsg: errorsMsg,
            };
        }
        case typedConstants.PROMISE_ADD_PHONE_SUCCESS: {
            return initialState;
        }
        case typedConstants.CREATE_FORM_CHANGE: {
            const { path, value } = action.payload;
            return {
                ...state,
                [path]: value,
            }
        }
        default: {
            return state;
        }
    }
};

export default reducer;