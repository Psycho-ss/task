import { createStore, applyMiddleware } from 'redux';
import { createPromise } from 'redux-promise-middleware'
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import appReducer from "./reducers";
import { createBrowserHistory } from 'history';

export const browserHistory = createBrowserHistory();

export default function configureStore() {
  const logDeps = [ReduxThunk];

  if (process.env.NODE_ENV !== 'production') {
    logDeps.push(logger);
  }
  const middleware = [
    createPromise({
      promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
    }),
    ...logDeps,
  ];

  const createReduxStore = applyMiddleware(...middleware);

  return createReduxStore(createStore)(appReducer);
}