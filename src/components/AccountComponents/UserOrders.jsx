import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import OrderService from '../../services/OrderService';
import { useState, useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
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
    },
    card: {
        borderRadius: 15,
        marginBottom: 20
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

export default function UserOrders(props) {

    const classes = useStyles();

    let response = null;
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(0);

    useEffect(() => {
        OrderService.getOrders(0, 10, "newest").then(res => response = res).then(() => { setOrders(response.data); setStatus(response.status); })
            .catch(err => console.log(err));

    }, []);

    if (status === 0) {
        return (
            <div data-testid="Waiting">
                <Backdrop className={classes.backdrop} open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>

        );
    } else if (status !== 200) {
        return <h1>Something Went Wrong Please Reload Page And Try Again</h1>
    }
    

    let sorted = [];
    for (let order of orders) {
        if (sorted.length === 0) {
            sorted.push([order]);
        } else if (sorted[sorted.length - 1].stripe === order.stripe) {
            sorted[sorted.length - 1].push(order);
        } else {
            sorted.push([order]);
        }
    }
    console.log(sorted);
    let ordersBlock = sorted.map((o) => {
        return <Order orders={o} />
    });


    return (
        <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={10} direction="column">
                <h1>My Orders</h1>
                <Divider className={classes.divider}/> 
                {ordersBlock}

            </Grid>
        </Grid>
       


    );
};

function Order(props) {
    const classes = useStyles();
    console.log(props.orders);
    let restaurantBlock = props.orders.map((o) => {
        return <Restaurant order={o} />
    });

    return (
        <Card className={classes.root, classes.card} elevation={0}>
            <CardContent>
                <Grid container direction="row" spacing={2} justify="flex-start">
                    <Grid item xs={2}>
                        <Grid container direction="column" >
                            <p className={classes.p}>Order Date</p>
                            <p className={classes.p}>{props.orders[0].dateSubmitted === null ? "--" : props.orders[0].dateSubmitted}</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container direction="column" >
                            <p className={classes.p}>Delivery Address</p>
                            <p className={classes.p}>{props.orders[0].address.street}, {props.orders[0].address.city}, {props.orders[0].address.state} {props.orders[0].address.zipCode}</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <Grid container direction="column" >
                            <p className={classes.p}>Status</p>
                            <p className={classes.p}>Pending</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container direction="column" justify="flex-end" alignItems="flex-end">
                            <p className={classes.p}>Order Number# XXXXXXXXXX</p>
                            <a href=""><p className={classes.p}>View Reciept</p></a>
                        </Grid>
                    </Grid>
                </Grid>
                {restaurantBlock}
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    );

}

function Restaurant(props) {
    let orderItemBlock = props.order.orderItems.map((o) => {
        return <OrderItem item={o} />
    });

    return (
        <Accordion elevation={0}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                <h4>{props.order.restaurant.name}</h4>
                </AccordionSummary>
            <AccordionDetails>
                <Grid container direction="column" alignItems="stretch" justify="flex-start">
                    {orderItemBlock}
                </Grid>
                   
                </AccordionDetails>
            </Accordion>
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
                <Grid container direction="column" justify="center" alignItems="center">
                    <h6><b>{props.item.name}</b></h6>
                </Grid>
            </Grid>
            <Grid item xs={3}>
                <Grid container direction="column" justify="center" alignItems="flex-end">
                    <p className={classes.p}>${props.item.price} x  {props.item.quantity}</p>
                    <p className={classes.p}>${props.item.price * props.item.quantity}</p>
                </Grid>
            </Grid>
            
        </Grid>
        );
}