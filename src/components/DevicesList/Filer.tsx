import {connect} from "react-redux";
import React from "react";
import {AppState} from "../../reducers";
import { bindActionCreators, Dispatch } from 'redux';
import { ReduxComponentInterface } from "../../types/Common";
import {withStyles, Checkbox, TextField, FormControlLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import {filterChange, filter} from "../../actions/devicesActions";
import { models as defaultModels, os} from "../../utils/constants";
import { FilterD } from "../../types/DeviceList";

interface FilterProps extends ReduxComponentInterface, FilterD {
}

const styles = (theme: any) => ({
    filter : {
        marginLeft: 20,
        marginRight: 40,
    }
});

class Filter extends React.PureComponent<FilterProps> {
    handleFilterChange = async (path: string, value: any) : Promise<any> => {
        const { actions } = this.props;
        await actions.filterChange(path, value);
        actions.filter();
    };
    render() {
        const { classes, filter, models } = this.props;
        return (
            <div className='filter-container'>
                <Autocomplete
                    filterSelectedOptions
                    className={classes.filter}
                    options={os}
                    onChange={(_event, value) => this.handleFilterChange('os', value)}
                    getOptionLabel={(option: any) => option?.label}
                    value={filter?.os}
                    renderInput={(params: any) => <TextField {...params} label={'System'}/>}
                />
                <Autocomplete
                    filterSelectedOptions
                    value={filter?.vendor}
                    options={models.length > 1 ? models : defaultModels}
                    className={classes.filter}
                    onChange={(_event, value) => this.handleFilterChange('vendor', value)}
                    getOptionLabel={(option: any) => option?.label}
                    renderInput={(params: any) => <TextField {...params} label={'Vyrobce'}/>}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            color={'secondary'}
                            checked={filter?.borrowed}
                            onChange={(event) => this.handleFilterChange('borrowed', event.target.checked)}
                        />}
                    label={'Jen dostupne'}
                />
                <TextField
                  label="Hledat Model"
                  value={filter?.model}
                  onChange={(event) => this.handleFilterChange('model', event.target.value)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    filter: state.devices.filter,
    models: state.devices.models,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({ filterChange, filter }, dispatch),
});



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Filter));