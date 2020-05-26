import {connect} from "react-redux";
import React from "react";
import NavBar from "../NavBar";
import {AppState} from "../../reducers";
import { bindActionCreators, Dispatch } from 'redux';
import { ReduxComponentInterface } from "../../types/Common";
import { fetchAllPhones } from "../../actions/devicesActions";
import { getToken } from "../../utils/commonFunctions";
import { withStyles, LinearProgress, Grid} from "@material-ui/core";
import { DeviceListD } from "../../types/DeviceList";
import CardItem from "./CardItem";
import Filter from "./Filer";

interface DeviceListProps extends ReduxComponentInterface, DeviceListD {
}

const styles = (theme: any) => ({
    root: {
        marginTop: 20,
        paddingLeft: 40,
        paddingRight: 40,
    },
    test : {
        marginLeft: 20,
        marginRight: 40,
    }
});

class DeviceList extends React.PureComponent<DeviceListProps> {
    componentDidMount() {
        const { actions } = this.props;
        const userData = getToken(false);
        if (userData) actions.fetchAllPhones(userData?.token);
    }
    render() {
        const { list, classes, loading } = this.props;
        return (
            <Grid>
                <NavBar/>
                {loading && (
                    <div className='container'>
                        <LinearProgress/>
                    </div>
                )}
                {!loading && (
                    <React.StrictMode>
                        <Filter/>
                        <Grid className={classes.root} container spacing={2}>
                            {list.map((it: any, index: number) => <CardItem item={it} key={index}/>)}
                        </Grid>
                    </React.StrictMode>
                )}
            </Grid>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    list: state.devices.list,
    loading: state.devices.loading,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ fetchAllPhones  }, dispatch),
});



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(DeviceList));