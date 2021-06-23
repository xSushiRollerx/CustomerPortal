import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Grid from '@material-ui/core/Grid';
import PaymentService from '../../services/PaymentService';
import { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';


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
console.log(orders);
export default function StripeCheckout() {
    const classes = useStyles();
    const stripe = useStripe();
    const elements = useElements();
    const [secret, setSecret] = useState(null);
    const [status, setStatus] = useState(0);
    const [fields, setFields] = useState({
        street: {error: false, text: null},
        city: { error: false, text: null },
        state: { error: false, text: null },
        zipCode: { error: false, text: null },
        firstName: { error: false, text: null },
        lastName: { error: false, text: null }
           
    });
    const [zipCodeValue, setZipCodeValue] = useState(null);
    const [stateValue, setStateValue] = useState(null);
    const { street, city, state, zipCode, firstName, lastName } = fields;
    const stateProps = {
        options: states,
        getOptionLabel: (state) => state.code,
    };
    const [cardErrorText, setCardErrorText] = useState(null);
    const [stripeResponse, setStripeResponse] = useState(null);
    const [divs, setDivs] = useState({
        confirmingShow: false,
        responseShow: false
    });
    const { confirmingShow, responseShow } = divs;
    const [main, setMain] = useState(true);
    const notValid = () => {
        let fieldsHolder = "{ ";
        let errors = false
        let inputs = [document.getElementById("billingFirstName"), document.getElementById("billingLastName"), document.getElementById("billingAddress"), document.getElementById("billingCity"),
            document.getElementById("billingState"), document.getElementById("billingZipCode")];

        for (let input of inputs) {
            if (input.id === "billingState") {
                if (stateValue === null | stateValue === undefined) {
                    fieldsHolder = fieldsHolder.concat("\"" + "state" + "\": {\"error\": true, \"text\":  \"This field is not filled out\" },");
                    errors = true;
                }  else {
                    fieldsHolder = fieldsHolder.concat("\"" + "state" + "\": {\"error\": false, \"text\":  null },");
                }
            } 
            if (input.value === null | input.value.trim() === "") {
                fieldsHolder = fieldsHolder.concat("\"" + input.name + "\": {\"error\": true, \"text\":  \"This field is not filled out\" },");
                errors = true;
            } else if (input.name === "zipCode" && input.value.length < 5) {
                fieldsHolder = fieldsHolder.concat("\"" + input.name + "\": {\"error\": true, \"text\":  \"This field must contain a numeric five digit postal code\" },");
                errors = true;
            } else {
                fieldsHolder = fieldsHolder.concat("\"" + input.name + "\": {\"error\": false, \"text\":  null },");
            }
        }

        if (cardErrorText != null) {
            errors = true;
        } else if (document.getElementById("cardContainer").classList.contains("StripeElement--empty")) {
            errors = true;
            setCardErrorText("Card information must be filled out");
        }

        fieldsHolder = fieldsHolder.substring(0, (fieldsHolder.length - 1));
        fieldsHolder = fieldsHolder.concat(" }");
        setFields(JSON.parse(fieldsHolder));
        return errors;
    }

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();
        console.log("handlesubmit");
        if (notValid()) {
            return;
        }

        setMain(false);
        setDivs({ ...divs, confirmingShow: true });

        if (!stripe || !elements) {
            console.log("stripe not loaded");
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }
        console.log("stripe confirmation ran");
        let result = await stripe.confirmCardPayment(secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                    
                billing_details: {
                    name: document.getElementById("billingFirstName").value + " " + document.getElementById("billingLastName").value,
                    address: {
                        city: document.getElementById("billingCity").value,
                        country: "US", 
                        line1: document.getElementById("billingAddress").value,
                        line2: null,
                        postal_code: document.getElementById("billingZipCode").value,
                        state: stateValue
                    }
                }//add the setup for usage? 
            }
            //where to get email
        });
        setDivs({ ...divs, responseShow: true });
        console.log(result);
        if (result.error) {
            // Show error to your customer (e.g., insufficient funds
            setStripeResponse({ text: "Your Order Was Not Processed Successfully. " + result.error.message, link: "/checkout", btnText: "Back To Checkout" });
            console.log(result.error.message);
        } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
                console.log("success");
                setStripeResponse({ text: "Your Order Has Been Processed Successfully!", link: "", btnText: "Home" });
                localStorage.setItem("orders", "[]")
            }
        }
        console.log("submission end");
    };

    const handleCardChange = ({ error }) => {
        if (error) {
            setCardErrorText(error.message);
        } else {
            setCardErrorText(null);
        }
    }

    useEffect(() => {
        PaymentService.getClientSecret().then(res => response = res).then(() => { setStatus(response.status); setSecret(response.data); });
    }, []);


    if ((status !== 201) && (status !== 0)) {
        return (
            <Grid container direction="column" alignItems="center" justifyItems="center">
                <h2>Something Went Wrong. Please Reload Page and Try Again.</h2>
            </Grid>
            );
    }

    let deliveryfee = 0;
    let taxes = 0;
    let subTotal = 0;
    console.log(orders);
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
            <div hidden={!main}>
            <Grid container direction="row" alignItems="stretch" justify="center" spacing={3}>
                <Grid item xs={9}>
                    <Grid container direction="column" justify="center" alignItems="stretch">
                            <Divider orientation="horizontal" flexItem />
                            <h3 style={{ padding: '14px' }}  >Billing Details</h3>
                            <Divider orientation="horizontal" />
                        <Grid container direction="row" justify="space-between" alignItems="center">
                            <Grid item xs={6}>
                                    <TextField className={classes.cardName} id="standard-basic" label="First Name" size="small" name="firstName" error={firstName.error} inputProps={{ id: "billingFirstName" }}
                                         />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField className={classes.cardName} id="standard-basic" label="Last Name" size="small" name="lastName" error={lastName.error} inputProps={{ id: "billingLastName" }} />
                            </Grid>
                        </Grid>
                        <Grid container direction="row" justify="space-between" alignItems="flex-start">
                            <Grid item xs={6}>
                                <FormHelperText error={true}>{firstName.text}</FormHelperText>
                            </Grid>
                            <Grid item xs={6}>
                                <FormHelperText error={true}>{lastName.text}</FormHelperText>
                            </Grid>
                        </Grid>
                        <TextField className={classes.cardName} id="standard-basic" label="Address" size="small" error={street.error} name="street" inputProps={{ id: "billingAddress" }} />
                        <FormHelperText error={true}>{street.text}</FormHelperText>
                        <Grid container direction="row" justify="space-between" alignItems="flex-end">
                            <Grid item xs={6}>
                                <TextField className={classes.cardName} id="standard-basic" label="City"  size="small" error={city.error} name="city" inputProps={{ id: "billingCity" }} />
                            </Grid>
                            <Grid item xs={3}>
                                <Autocomplete
                                    {...stateProps}
                                    id="billingState"
                                    autoSelect
                                    size="small" 
                                    name="state"
                                    onChange={(event) => setStateValue(event.target.value) }
                                    renderInput={(params) => <TextField {...params} error={state.error} label="State" margin="normal"/>}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField className={classes.cardName} id="standard-basic" label="Zip Code" size="small" name="zipCode" error={zipCode.error} inputProps={{ id: "billingZipCode" }}
                                    value={zipCodeValue}
                                    onChange={(event) => {
                                        const regex = /^([0-9]){0,5}$/i;
                                        if (event.target.value === '' || regex.test(event.target.value)) {
                                            setZipCodeValue( event.target.value );
                                        }
                                    }}
                                />
                            </Grid>


                        </Grid>
                        <Grid container direction="row" justify="space-between" alignItems="flex-start">
                            <Grid item xs={6}>
                                <FormHelperText error={true}>{city.text}</FormHelperText>
                            </Grid>
                            <Grid item xs={3}>
                                <FormHelperText error={true}>{state.text}</FormHelperText>
                            </Grid>
                            <Grid item xs={3}>
                                <FormHelperText error={true}>{zipCode.text}</FormHelperText>
                            </Grid>


                        </Grid>
                        <CardElement id="cardContainer" options={CARD_ELEMENT_OPTIONS} onChange={handleCardChange} />
                        <FormHelperText error={true} >{cardErrorText}</FormHelperText>
                            
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Grid container direction="column" alignItems="stretch" justify="center">
                        <Divider orientation="horizontal" flexItem />
                        <h3>Order Summary</h3>
                        <Divider orientation="horizontal" flexItem />
                        <Grid item>
                            <Grid container direction="row">
                                <Grid item xs={6}>
                                    {orderNames}
                                    <p className='m-0'>Delivery: </p>
                                    <p className='m-0'>Tax: </p>
                                </Grid>
                                <Grid item xs={6}>
                                    {orderTotals}
                                    <p className='m-0'>${(deliveryfee).toFixed(2)}</p>
                                    <p className='m-0'>${(taxes).toFixed(2)}</p>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Divider orientation="horizontal" flexItem />
                        <Grid item>
                            <Grid container direction="row">
                                <Grid item xs={6}>
                                    <p className='col-6 m-0'>Total</p>
                                </Grid>
                                <Grid item xs={6}>
                                    <p className='col-6 m-0'>${(subTotal + deliveryfee + taxes).toFixed(2)}</p>
                                </Grid>
                            </Grid>
                        </Grid>
                                    
                        <Divider orientation="horizontal" flexItem />
                        <button className={classes.placeOrder} data-testId="PlaceOrder" className='w-100 btn btn-secondary rounded-0' onClick={handleSubmit} disabled={!stripe}>Place Order</button>
                    </Grid>
                </Grid>
            </Grid>
            </div>
            <div hidden class="d-flex justify-content-center" style={{display: confirmingShow ? "block" : "none"}}>
                <Grid container direction="column" alignItems="center" justifyItems="center">
                    <h2 style={{ display: confirmingShow ? "block" : "none" }}>Processing Order. Please Do Not Close Or Reload This Tab. This May Take A Few Minutes.</h2>
                    <div style={{ display: confirmingShow ? "block" : "none" }} class="spinner-border" role="status">
                        <span class="sr-only"></span>
                    </div>
                </Grid>
            </div>
            <div class="d-flex justify-content-center">
                <Grid container direction="column" alignItems="center" justifyItems="center">
                    <h2 style={{ display: responseShow ? "block" : "none" }}>{stripeResponse !== null ? stripeResponse.text : "" }</h2>
                    <a style={{ display: responseShow ? "block" : "none" }} href={stripeResponse !== null ? "/" + stripeResponse.link : ""}>
                        <button style={{ display: responseShow ? "block" : "none" }} className={classes.placeOrder} className='w-100 btn btn-secondary rounded-0'>{stripeResponse !== null ? stripeResponse.btnText : ""}</button>
                    </a>
                </Grid>
            </div>
        </div>
    );
}