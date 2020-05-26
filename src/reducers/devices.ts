import { ConstantsInterface } from "../types/Common";
import constants from "../utils/constants";
import { filterArray } from "../utils/commonFunctions";

const typedConstants: ConstantsInterface = constants;

const initialState = {
    original: [],
    list: [],
    models: [],
    loading: false,
    error: false,
    filter: {
        os: null,
        vendor: null,
        borrowed: false,
        model: '',
    }
};

const reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case typedConstants.FETCH_ALL_PHONES_ERROR: {
            return {
                ...state,
                loading: false,
                error: true,
            }
        }
        case typedConstants.FETCH_ALL_PHONES_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case typedConstants.FILTER_CHANGE: {
            const { path, value } = action.payload;
            return {
                ...state,
                filter: {
                    ...state.filter,
                    [path]: value,
                }
            }
        }
        case typedConstants.FILTER: {
            const filters = {
                os: (os) => {
                    return state.filter.os?.value ? os === state.filter.os?.value : true;
                },
                vendor: (vendor) => {
                    return state.filter.vendor?.value? vendor === state.filter.vendor?.value : true;
                },
                borrowed: (borrowed) => {
                    return state.filter.borrowed ? !borrowed : true;
                },
                model: (model) => {
                    return model?.toLowerCase().includes(state.filter.model?.toLowerCase());
                },
            };

            const list = filterArray(state.original, filters);
            return {
                ...state,
                list: list,
            }
        }
        case typedConstants.FETCH_ALL_PHONES_SUCCESS: {
            const { data } = action.payload;
            const getModels = data.map((it: any) => it.vendor);
            const models = getModels.filter((it: string, index:number) => it && getModels.indexOf(it) === index).map((it: string) => ({
                label: it,
                value: it,
            }));
            return {
                ...state,
                original: data,
                list: data.map((it: any) => ({ ...it, disabled: false})),
                models: models,
                loading: false,
                error: false,
            }
        }
        default: {
            return state;
        }
    }
};

export default reducer;