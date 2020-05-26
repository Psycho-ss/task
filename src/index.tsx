import React from 'react';
import ReactDOM from 'react-dom';
import './components/App/index.css';
import RootComponent from "./components/RootComponent";
import * as serviceWorker from './serviceWorker';
import configureStore from "./configureStore";

const store = configureStore();
const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <RootComponent store={store}/>
  </React.StrictMode>,
    rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
