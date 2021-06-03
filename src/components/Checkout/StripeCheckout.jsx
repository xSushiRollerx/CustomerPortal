import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Grid from '@material-ui/core/Grid';
import PaymentService from '../../services/PaymentService';
import { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {
                color: "#aab7c4",
            },
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a",
        },
    },
    placeOrder: {
        padding: "-12px"
    }
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    cardName: {
        marginBottom: 8,
        width: "100%"
    }
}));
let response = {};

const states = [
    { state: 'Alabama', code: 'AL' },
    { state: 'Alaska', code: 'AK' },
    { state: 'Arizona', code: 'AZ' },
    { state: 'Arkansas', code: 'AR' },
    { state: 'California', code: 'CA' },
    { state: 'Colorado', code: 'CO' },
    { state: 'Connecticut', code: 'CT' },
    { state: 'Delaware', code: 'DE' },
    { state: 'Florida', code: 'FL' },
    { state: 'Georgia', code: 'GA' },
    { state: 'Hawaii', code: 'HI' },
    { state: 'Idaho', code: 'ID' },
    { state: 'Illinois', code: 'IL' },
    { state: 'Indiana', code: 'IN' },
    { state: 'Iowa', code: 'IA' },
    { state: 'Kansas', code: 'KS' },
    { state: 'Kentucky', code: 'KY' },
    { state: 'Louisianna', code: 'LA' },
    { state: 'Maine', code: 'ME' },
    { state: 'Maryland', code: 'MD' },
    { state: 'Massachusetts', code: 'MA' },
    { state: 'Michigan', code: 'MI' },
    { state: 'Minnesota', code: 'MN' },
    { state: 'Mississippi', code: 'MS' },
    { state: 'Missouri', code: 'MO' },
    { state: 'Montana', code: 'MT' },
    { state: 'Nebraska', code: 'NE' },
    { state: 'Nevada', code: 'NV' },
    { state: 'New Hampshire', code: 'NH' },
    { state: 'New Jersey', code: 'NJ' },
    { state: 'New Mexico', code: 'NM' },
    { state: 'New York', code: 'NY' },
    { state: 'North Carolina', code: 'NC' },
    { state: 'North Dakota', code: 'ND' },
    { state: 'Ohio', code: 'OH' },
    { state: 'Oklahoma', code: 'OK' },
    { state: 'Oregon', code: 'OR' },
    { state: 'Pennslyvania', code: 'PA' },
    { state: 'Rhode Island', code: 'RI' },
    { state: 'South Carolina', code: 'SC' },
    { state: 'South Dakota', code: 'SD' },
    { state: 'Tennessee', code: 'TN' },
    { state: 'Texas', code: 'TX' },
    { state: 'Utah', code: 'UT' },
    { state: 'Vermont', code: 'VT' },
    { state: 'Virginia', code: 'VA' },
    { state: 'Washington', code: 'WA' },
    { state: 'West Virginia', code: 'WV' },
    { state: 'Wisconsim', code: 'WI' },
    { state: 'Wyoming', code: 'WY' },
]
const orders = JSON.parse(localStorage.getItem('orders'));
export default function StripeCheckout() {
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const [secret, setSecret] = useState(null);
    const [status, setStatus] = useState(0);


    const stateProps = {
        options: states,
        getOptionLabel: (state) => state.code,
    };
    

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const result = await stripe.confirmCardPayment('{CLIENT_SECRET}', {
            payment_method: {
                card: elements.getElement(CardElement),
                    
                billing_details: {
                    name: document.getElementById("billingFirstName").value + " " + document.getElementById("billingLastName").value,
                    address: {
                        city: document.getElementById("billingCity").value,
                        country: "USA",
                        line1: document.getElementById("billingAddress").value,
                        line2: null,
                        postal_code: document.getElementById("billingZipCode").value,
                        state: document.getElementById("billingState").value
                    }
                }//add the setup for usage? 
            }
            //where to get email
        });

        if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
            }
        }
    };


    useEffect(() => {
        PaymentService.getClientSecret().then(res => response = res).then(() => { setStatus(response.status); setSecret(response.data); });
        console.log(secret);
    }, []);

    if (status !== 0) {
        console.log(status);
        console.log(secret);
    }
    console.log(response);

    let deliveryfee = 0;
    let taxes = 0;
    let subTotal = 0;
    orders.map(o => o.orderItems.map(item => subTotal += (item.quantity * item.price)));
    let orderNames = orders.map(o => <p className='m-0'>{o.name}: </p>);
    let getTotal = (o) => {
        let sum = 0;
        o.orderItems.map(item => { sum += item.quantity * item.price });
        return sum;
    }
    let orderTotals = orders.map(o => <p className='m-0'>${getTotal(o).toFixed(2)}</p>);
    return (
        <div>
            <Grid container direction="row" alignItems="stretch" justify="center" spacing={3}>
                <Grid item xs={9}>
                    <Grid container direction="column" justify="center" alignItems="stretch">
                        <Divider orientation="horizontal" flexItem />
                        <h3 style={{ padding: '14px' }}>Billing Details</h3>
                        <Divider orientation="horizontal" flexItem />
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs={6}>
                                <TextField className={classes.cardName} id="standard-basic" label="First Name" size="small" inputProps={{id: "billingFirstName"} } />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.cardName} id="standard-basic" label="Last Name" size="small" inputProps={{ id: "billingLastName" }} />
                            </Grid>
                        </Grid>
                        <TextField className={classes.cardName} id="standard-basic" label="Address" size="small" inputProps={{ id: "billingAddress" }} />
                        <Grid container direction="row" justify="space-between" alignItems="flex-end">
                            <Grid item xs={6}>
                                <TextField className={classes.cardName} id="standard-basic" label="City" size="small" inputProps={{ id: "billingCity" }} />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    {...stateProps}
                                    id="auto-select"
                                    autoSelect
                                    size="small" 
                                    renderInput={(params) => <TextField {...params} label="State" margin="normal" inputProps={{ id: "billingState" }}/>}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField className={classes.cardName} id="standard-basic" label="Zip Code" size="small" inputProps={{ id: "billingZipCode" }} />
                            </Grid>


                        </Grid>

                        <CardElement options={CARD_ELEMENT_OPTIONS} />
                            
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction="column" alignItems="stretch" justify="center">
                        <table className='table table-bordered'>
                            <thead>
                                <th><h3>Order Summary</h3></th>
                            </thead>
                            <tbody>
                                <tr className='row border-0'>
                                    <div className='col-6'>
                                        {orderNames}
                                        <p className='m-0'>Delivery: </p>
                                        <p className='m-0'>Tax: </p>
                                    </div>

                                    <div className='col-6'>
                                        {orderTotals}
                                        <p className='m-0'>${(deliveryfee).toFixed(2)}</p>
                                        <p className='m-0'>${(taxes).toFixed(2)}</p>
                                    </div>

                                </tr>
                                <tr className='row'>
                                    <p className='col-6 m-0'>Total</p>
                                    <p className='col-6 m-0'>${(subTotal + deliveryfee + taxes).toFixed(2)}</p>
                                </tr>
                                <button className={classes.placeOrder} data-testId="PlaceOrder" className='w-100 btn btn-secondary rounded-0' onClick={handleSubmit}>Place Order</button>
                            </tbody>
                        </table>
                    </Grid>
                </Grid>
            </Grid>
         
        </div>
    );
}