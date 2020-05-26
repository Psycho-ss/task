import React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { Button, TextField, Container, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import {connect} from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { logIn, handleLoginFormChange, getToken } from "../../actions/loginActions";
import {AppState} from "../../reducers";
import { ReduxComponentInterface } from "../../types/Common";
import { LoginPageD } from "../../types/LoginPage";
import {getToken as getData} from "../../utils/commonFunctions";

const styles = (theme: any) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

interface LoginPageProps extends ReduxComponentInterface, LoginPageD {
}

class LoginPage extends React.PureComponent<LoginPageProps> {
    handleFormSubmit = async (event: any): Promise<any> => {
        event.preventDefault();
        const {actions, name, password} = this.props;
        await actions.logIn({
            login: name,
            password: password,
        });
        actions.getToken(getData(false));
    };
    handleFormChange = (event: any, name: string) : void => {
        const { actions } = this.props;
        const value = event?.target?.value;
        actions.handleLoginFormChange(name, value);
    };
    render() {
        const { classes, name, password, error, errorMsg } = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Příhlášení
                    </Typography>
                    <form className={classes.form} onSubmit={this.handleFormSubmit}>
                        {error && (<Alert severity={'error'}>{errorMsg}</Alert>)}
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            onChange={(event) => this.handleFormChange(event, 'name')}
                            value={name}
                            id="email"
                            label="Emailová adresa"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            onChange={(event) => this.handleFormChange(event, 'password')}
                            value={password}
                            required
                            fullWidth
                            label="Heslo"
                            type="password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            Přihlásit se
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    name: state.loginPage.name,
    password: state.loginPage.password,
    error: state.loginPage.error,
    errorMsg: state.loginPage.errorMsg,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ logIn, handleLoginFormChange, getToken }, dispatch),
});


// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));