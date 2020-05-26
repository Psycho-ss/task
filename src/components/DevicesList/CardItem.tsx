import React from 'react';
import {AppState} from "../../reducers";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch} from 'redux';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';
import { withStyles } from "@material-ui/core";
import { borrowPhone, returnPhone, fetchAllPhones, deletePhone } from "../../actions/devicesActions";
import { ReduxComponentInterface } from "../../types/Common";
import {getToken} from "../../utils/commonFunctions";
import { CardItemD } from "../../types/DeviceList";

const styles = (theme: any) => ({
    root: {
        margin: 15,
    },
    media: {
        height: 140,
    },
    button: {
    }
});

interface CardItemProps extends ReduxComponentInterface, CardItemD{

}

class CardItem extends React.PureComponent<CardItemProps> {

    handleBorrowItem = async (event: any) => {
        event.preventDefault();
        const { actions, item } = this.props;
        const token = getToken();
        await actions.borrowPhone(item?.id, token);
        actions.fetchAllPhones(token);

    };

    handleReturnItem = async (event: any) => {
        event.preventDefault();
        const { actions, item } = this.props;
        const token = getToken();
        await actions.returnPhone(item?.id, token);
        actions.fetchAllPhones(token);
    };

    handleDeleteItem = async (event: any) => {
        event.preventDefault();
        const { actions, item } = this.props;
        const token = getToken();
        await actions.deletePhone(item?.id, token);
        actions.fetchAllPhones(token);
    };

    render() {
        const { classes, item, user } = this.props;
        const sameUser = item?.borrowed?.user?.id === user?.id;
        const isAdmin = user?.type === 'admin';
        return (
          <Grid item xs={2}>
              <Card className={classes.root}>
                  <CardActionArea>
                      <CardMedia
                          className={classes.media}
                          image={item?.image || 'https://redi.eu/wp-content/uploads/2015/08/not-available-300x217.png'}
                          title="Contemplative Reptile"
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                              {item?.model}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                              {item?.vendor}
                          </Typography>
                          <Typography variant="caption" color="primary" component="p">
                              {item?.osVersion}
                          </Typography>
                      </CardContent>
                  </CardActionArea>
                  <CardActions>
                      <Button disabled={item?.borrowed && !sameUser} onClick={sameUser ? this.handleReturnItem : this.handleBorrowItem} variant={'contained'} fullWidth size="small" color="primary">
                          {sameUser ? 'Vratit' : 'Pujcit'}
                      </Button>
                      {isAdmin && (
                          <Button onClick={this.handleDeleteItem} variant={'contained'} fullWidth size="small" color="primary">
                              Odebrat
                          </Button>
                      )}
                  </CardActions>
              </Card>
          </Grid>
        );
    }
}


const mapStateToProps = (state: AppState) => ({
    user: state.loginPage.user,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    actions: bindActionCreators({ borrowPhone, returnPhone, fetchAllPhones, deletePhone }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CardItem));