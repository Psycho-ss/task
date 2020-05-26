import React from 'react';
import Routes from "./routes";
import { getToken } from "../../actions/loginActions";
import { getToken as getData } from '../../utils/commonFunctions';
import { bindActionCreators } from 'redux';
import { ReduxComponentInterface } from "../../types/Common";
import { connect } from "react-redux";

interface AppProps extends ReduxComponentInterface {}

class App extends React.PureComponent<AppProps> {
    componentDidMount() {
        const { actions } = this.props;
        actions.getToken(getData(false));
    }

    render() {
        return (
            <div className="App">
                <Routes/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getToken }, dispatch),
});


export default connect(null, mapDispatchToProps)(App);
