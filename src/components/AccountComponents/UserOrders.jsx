import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    divider: {

        marginBottom: 20
    },
    p: {
        margin: 0,
        fontSize: 12
    }
});

export default function UserOrders(props) {

    const classes = useStyles();

    return (
        <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={10} direction="column">
                <h1>My Orders</h1>
                <Divider className={classes.divider}/> 
                <Order />

            </Grid>
        </Grid>
       


    );
};

function Order(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container direction="row" spacing={2} justify="flex-start">
                    <Grid item xs={2}>
                        <Grid container direction="column" >
                            <p className={classes.p}>Delivery Date</p>
                            <p className={classes.p}>4/08/2020</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container direction="column" >
                            <p className={classes.p}>Delivery Address</p>
                            <p className={classes.p}>123 SmoothStack Ln, Atlanta, GA </p>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container direction="column" justify="flex-end" alignItems="flex-end">
                            <p className={classes.p}>Order Number# XXXXXXXXXX</p>
                            <a href=""><p className={classes.p}>View Reciept</p></a>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Restaurant />
                <Restaurant />
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    );

}

function Restaurant(props) {

    return (
        <Grid container direction="row">
            <h4>Restaurant</h4>
            <OrderItem />
            <OrderItem />
        </Grid>
    );

}

function OrderItem(props) {
    const classes = useStyles();
    return (
        <Grid container direction="row" alignItems="center" justify="flex-start">
            <Grid item xs={3}>
                <Grid container direction="row" alignItems="center" justify="center">
                    <h6>Image</h6>
                </Grid>
            </Grid>
            <Grid item xs={6}>
                <Grid container direction="column">
                    <h6><b>Name</b></h6>
                    <p>summarry asdahdjb ahd asdhj adsha haja a hsj s ahduas</p>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Grid container direction="column" justify="center" alignItems="flex-end">
                    <p className={classes.p}>$12.99  x  3</p>
                    <p className={classes.p}>$39.87</p>
                </Grid>
            </Grid>
            
        </Grid>
        );
}