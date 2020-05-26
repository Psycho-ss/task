import {connect} from "react-redux";
import React from "react";
import NavBar from "../NavBar";
import { Typography, Grid, TextField, Button, withStyles } from "@material-ui/core";
import {Alert, Autocomplete} from "@material-ui/lab";
import { models as defaultModels, os } from "../../utils/constants";
import {AppState} from "../../reducers";
import { bindActionCreators, Dispatch } from 'redux';
import { ReduxComponentInterface } from "../../types/Common";
import { createFormChange, addPhone } from "../../actions/createActions";
import { remapData, getToken } from "../../utils/commonFunctions";

const styles = (theme: any) => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop: theme.spacing(2) * 8,
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
});

interface CreateDeviceProps extends ReduxComponentInterface{
    classes: any;
    models: any;
    form: any;
}

class CreateDevice extends React.PureComponent<CreateDeviceProps> {
    handleCreateFormChange = (path, value: any): void => {
        const { actions } = this.props;
        actions.createFormChange(path, value);
    };
    handleSubmit = async (event: any) : Promise<any> => {
        event.preventDefault();
        const { actions, form } = this.props;
        const token = getToken();
        await actions.addPhone(remapData(form), token);
    };
    render() {
        const { classes, models, form } = this.props;
        return (
            <div>
                <NavBar />
                <form onSubmit={this.handleSubmit}>
                <Grid className={classes.layout} container spacing={3}>
                    {form?.error && (<Alert severity={'error'}>{form?.errorMsg}</Alert>)}
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Nove zarizeni
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            label="Kodove oznaceni"
                            fullWidth
                            value={form?.code}
                            onChange={(event) => this.handleCreateFormChange('code', event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            value={form?.vendor}
                            filterSelectedOptions
                            options={models.length > 0 ? models : defaultModels}
                            getOptionLabel={(option: any) => option?.label}
                            renderInput={(params: any) => <TextField {...params} variant="outlined" label={'Vyrobce'}/>}
                            onChange={(_event, value) => this.handleCreateFormChange('vendor', value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            value={form?.model}
                            name="address2"
                            label="Model"
                            fullWidth
                            autoComplete="shipping address-line2"
                            onChange={(event) => this.handleCreateFormChange('model',event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            filterSelectedOptions
                            options={os}
                            value={form?.os}
                            getOptionLabel={(option: any) => option?.label}
                            renderInput={(params: any) => <TextField {...params} variant="outlined" label={'OS'}/>}
                            fullWidth
                            onChange={(_event,value) => this.handleCreateFormChange('os', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            variant="outlined"
                            value={form?.osVersion}
                            label="Verze OS"
                            onChange={(event) => this.handleCreateFormChange('osVersion',event.target.value)}
                            fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            value={form?.image}
                            label="Obrazek (URL)"
                            fullWidth
                            autoComplete="shipping postal-code"
                            onChange={(event) => this.handleCreateFormChange('image', event.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type={'submit'} variant="outlined" color={'primary'}>
                            Vytvorit
                        </Button>
                    </Grid>
                </Grid>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    models: state.devices.models,
    form: state.create,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators({ createFormChange, addPhone }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateDevice));