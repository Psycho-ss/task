import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import { ReduxComponentInterface } from "../../types/Common";
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from "react-redux";
import { logOut } from "../../actions/loginActions";
import {AppState} from "../../reducers";
import { Link } from 'react-router-dom';
import { browserHistory } from "../../configureStore";

const styles = (theme: any) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

interface NavBarProps extends ReduxComponentInterface {
    classes: any;
    user: any
}

class NavBar extends React.PureComponent<NavBarProps> {
    handleClick = (event: any) => {
        event.preventDefault();
        const { actions } = this.props;
        actions.logOut();
    };
    render() {
        const isList = browserHistory.location.pathname === '/list';
        const { classes, user } = this.props;
        return (
            <div>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            <Button color="inherit">
                                <Link to='/list'>Device Checker</Link>
                            </Button>
                        </Typography>
                        {(user?.type === 'admin' && isList) && (
                            <Button color="inherit">
                                <Link to='/createDevice'>Pridat zarizeni</Link>
                            </Button>
                        )}
                        {(user?.type === 'admin' && !isList) && (
                            <Button color="inherit">
                                <Link to='/list'>List</Link>
                            </Button>
                        )}
                        <Button onClick={this.handleClick} color="inherit">Odhlaseni</Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    user: state.loginPage.user,
});


const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ logOut }, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NavBar));