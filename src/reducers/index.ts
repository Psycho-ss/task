import { combineReducers } from 'redux';
import loginPage from './loginPage';
import devices from './devices';
import create from './create';

const appReducer = combineReducers({
    loginPage,
    devices,
    create,
});

export type AppState = ReturnType<typeof appReducer>;
export default appReducer;