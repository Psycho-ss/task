import LoginPage from "../LoginPage";
import CreateDevice from "../CreateDevice";
import DeviceList from "../DevicesList";
import NotFound from "../404";
import { Router, Route, Redirect } from 'react-router-dom';
import React from "react";
import { browserHistory } from "../../configureStore";
import { getToken, getRedirectPath } from "../../utils/commonFunctions";

interface RoutesProps {
}

export default class Routes extends React.PureComponent<RoutesProps> {
    render() {
        const token = getToken();
        const pathName = browserHistory.location.pathname;
        const path = getRedirectPath(pathName, token);
        return (
            <Router home={token ? '/list' : '/login'} history={browserHistory}>
                    <Redirect to={path} key={0}/>
                    <Route exact path='/createDevice' component={CreateDevice} key={1}/>
                    <Route exact path='/list' component={DeviceList} key={2} />
                    <Route exact path='/login' component={LoginPage} key={3} />
                <Route exact path='/404' component={NotFound} key={4} />
            </Router>
        );
    }
}
