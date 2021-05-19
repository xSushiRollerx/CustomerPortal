import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Modal from '@material-ui/core/Modal';
import { useState} from 'react';
import ControlPoint from '@material-ui/icons/ControlPoint';


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        top: '33%',
        left: '33%',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius: 15
    },

    card: {
        width: '100%',
        borderRadius: 15
    },

    addNumber: {
        width: 70,
        marginBottom: 10,
        borderRadius: 30

    },
    addToBasket: {
        width: '100%',
        borderRadius: 30
    }

}));

export default function MenuItem(props) {
    const style = useStyles();

    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLoginOpen = () => {
        setLoginOpen(true);
    }

    const handleLoginClose = () => {
        setLoginOpen(false);
    }

    const isLoggedIn = () => {
        localStorage.setItem('jwt', 'Bearer ');
        if (localStorage.getItem('jwt') !== '' && localStorage.getItem('jwt') !== null) {
            return handleOpen();
        } else {
            return handleLoginOpen();
        }
    }

    const handleQuantityChange = (event) => {
        setQuantity(event.target.value);
    }

    //fix bugs
    const addItem = (value) => {
        //localStorage.setItem('orders', '[]')
        console.log(localStorage.getItem('orders'));
        let orders = JSON.parse(localStorage.getItem('orders'));
        let order = orders.find((o) => o.restaurantId === props.restaurant.id);
        //adds to current order item if order by restaurant already exists
        if (order !== undefined) {
            orders.splice(orders.indexOf(order), 1);

            let item = order.orderItems.find((i) => i.foodId === props.item.id);
            //checks if orderItem with its id has already been added to order
            if (item !== undefined) {
                order.orderItems[order.orderItems.indexOf(item)].quantity += parseInt(quantity);
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));
                handleClose();
            } else {
                item = {
                    'foodId': props.item.id,
                    'isActive': 1,
                    'name': props.item.name,
                    'price': props.item.cost,
                    'quantity': parseInt(quantity)
                }
                order.orderItems.push(item);
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));
                handleClose();
            }
        } else {
            console.log('no order of restaurant started');
            let order = {
                'name': props.restaurant.name,
                'restaurantId': props.restaurant.id,
                'address': {
                    'city': null,
                    'state': null,
                    'street': null,
                    'zipCode': null
                },
                'customerId': null,
                'orderItems': []
            };

            let item = {
                'foodId': props.item.id,
                'isActive': 1,
                'name': props.item.name,
                'price': props.item.cost,
                'quantity': parseInt(quantity)
            }

            //saves item to order which is then saved to local storage
            order.orderItems.push(item);
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            handleClose();
        }
        
        console.log(JSON.parse(localStorage.getItem('orders')));
    };

    return(
          
            <Grid container item alignItems="center" alignItems="stretch" xs={6}>
            <Card variant="outlined" className={style.card}>
                <CardContent>
                        <Grid container direction="row" alignItems="stretch" justify="flex-start">
                            <Grid container item justify="center" alignItems="center" xs={4}>Image</Grid>
                            <Grid container item direction="column" justify="flex-start" alignItems="stretch" xs={7}>
                                <h6>{props.item.name}</h6>
                                <p>{props.item.summary}</p>
                                <p>${props.item.cost}</p>
                            </Grid>
                            <Grid container item justify="center" alignItems="center" xs={1}>
                            <IconButton aria-label="Add Food To Cart" fontSize="large" onClick={isLoggedIn}>
                                    <ControlPoint />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            <Modal open={open} onClose={handleClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" >
                <Card variant="outlined">
                    <CardContent className={style.paper}>
                            <Grid container item justify="center" alignItems="center" >Image</Grid>
                            <Grid container item justify="flex-start" alignItems="stretch" direction="column">
                                <h6>{props.item.name}</h6>
                                <p>{props.item.summary}</p>
                                <p>${props.item.cost}</p>
                            </Grid>
                        <Grid container item direction="column" justify="center" alignItems="center">
                            
                            <TextField id="standard-number" type="number" className={style.addNumber} deaultValue="1" variant="outlined"
                                InputLabelProps={{ shrink: true, }} size="small" color="black" onChange={handleQuantityChange} />
                            <Button aria-label="Add Food To Cart" fontSize="large" variant="outlined" onClick={addItem} className={style.addToBasket} error={true}>
                                Add To Basket
                                </Button>
                            </Grid>
                    </CardContent>
                </Card>
            </Modal>

            <Modal open={loginOpen} onClose={handleLoginClose} aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" >
                <Card variant="outlined">
                    <CardContent className={style.paper}>
                        <Grid container item justify="center" alignItems="center" >Please Login To Add Items To Cart</Grid>
                           
                    </CardContent>
                </Card>
            </Modal> 
             </Grid>
              );
}