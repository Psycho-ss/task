import App from './App';
import React from 'react';
import { Provider } from "react-redux";

interface RootComponentProps {
    store: any;
}

export default class RootComponent extends React.PureComponent<RootComponentProps> {
    render() {
        return (
            <Provider store={this.props.store}>
                <App />
            </Provider>
        );
    }
}