import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

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
    },
    pagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    paginationSort: {
        margin: 0,
        marginLeft: 10,
        fontSize: 12
    }
}));


export default function UserOrders(props) {

    const classes = useStyles();
    const theme = useTheme();

    let response = null;
    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [count, setCount] = useState(0);

    const handleChangePage = async (newPage) => {
        /*try {
            let res = await OrderService.getOrders(newPage, 10, "newest").then(res => response = res);
            setStatus(res.status);
            console.log(res);
            setOrders(res.data);
        } catch (error) {
            setStatus(500);
        }
        setPage(newPage);*/
    };

    useEffect(async() => {
        try {
            let res = await OrderService.getOrders(0, 10, "newest").then(res => response = res);
            console.log(res.data);
            setOrders(res.data);
            setStatus(res.status);
            setCount(res.data.length);
        } catch {
            setStatus(500);
        }

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
    console.log(orders);
    for (let order of orders) {
        if (sorted.length === 0) {
            sorted.push([order]);
        } else if (sorted[sorted.length - 1].stripe === order.stripe) {
            sorted[sorted.length - 1].push(order);
        } else {
            sorted.push([order]);
        }
    }
    console.log(status);
    let ordersBlock = sorted.map((o) => {
        return <Order orders={o} />
    });

    console.log(page + " " + count + " " + rowsPerPage);
    console.log((page >= Math.ceil(count / rowsPerPage) - 1) + "");
    return (
        <Grid container direction="row" alignItems="center" justify="center">
            <Grid item xs={10} direction="column">
                <h1>My Orders</h1>
                <Grid container direction="row" alignItems="center" justify="flex-end">
                    <Grid item>
                        <p className={classes.p}>Most Recent</p>
                    </Grid>
                    <Grid item >
                        <p className={classes.p, classes.paginationSort}>0-0 of 0</p>
                    </Grid>
                    <Grid item >
                        <div className={classes.pagination}>
                            <IconButton
                                onClick={handleChangePage(0)}
                                inputProps={{ 'data-testid': 'firstPageBtn' }}
                                disabled={page === 0}
                                aria-label="first page"
                            >
                                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                            </IconButton>
                            <IconButton inputProps={{ 'data-testid': 'lastPageBtn' }} onClick={handleChangePage(page - 1)} disabled={page === 0} aria-label="previous page">
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            </IconButton>
                            <IconButton
                                onClick={handleChangePage(page + 1)}
                                inputProps={{ 'data-testid': 'nextPageBtn' }}
                                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                                aria-label="next page"
                            >
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </IconButton>
                            <IconButton
                                onClick={handleChangePage(Math.max(0, Math.ceil(count / rowsPerPage) - 1))}
                                inputProps={{ 'data-testid': 'previousPageBtn' }}
                                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                                aria-label="last page"
                            >
                                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                            </IconButton>
                        </div>
                    </Grid>
                </Grid>
                
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
                    <Grid item xs={4}>
                        <Grid container direction="column" >
                            <p className={classes.p}>Order Date</p>
                            <p className={classes.p}>{props.orders[0].dateSubmitted === null ? "--" : props.orders[0].dateSubmitted}</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container direction="column" >
                            <p className={classes.p}>Delivery Address</p>
                            <p className={classes.p}>{props.orders[0].address.street}, {props.orders[0].address.city}, {props.orders[0].address.state} {props.orders[0].address.zipCode}</p>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container direction="column" justify="flex-end" alignItems="flex-end">
                            <br/>
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
    const classes = useStyles();
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
                <Grid container direction="column" justify="flex-start" alignItems="stretch" spacing={2}>
                    <Grid item>
                        <Grid container direction="row" justify="flex-start" alignItems="center" spacing={2}>
                           
                            
                            <Grid item xs="3">
                                <p className={classes.p}>Order Number# {props.order.id}</p>
                            </Grid>
                            <Grid item xs="3">
                                <p className={classes.p}>Pending</p>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container direction="column" alignItems="stretch" justify="flex-start">
                            {orderItemBlock}
                        </Grid>
                    </Grid>
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