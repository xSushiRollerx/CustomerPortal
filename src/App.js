import './App.css';
import Login from "./components/AccountComponents/Login"
import UserInfo from "./components/AccountComponents/UserInfo"
import Register from "./components/AccountComponents/Register"
import UpdateAccount from "./components/AccountComponents/UpdateAccount"
import OrderCart from './components/Checkout/OrderCart';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import RestaurantProfile from './components/Restaurants/RestaurantProfile';
import RestaurantSearch from './components/Restaurants/RestaurantSearch';
import StripeCheckout from './components/Checkout/StripeCheckout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useHistory } from "react-router-dom";
import CheckoutRedirect from './components/Redirects/CheckoutRedirect';
import Error from './components/Errors/Error';
import HeaderComponent from './components/HeaderComponent';
import UserOrders from './components/AccountComponents/UserOrders';
import AccountManagement from './components/AdminComponents/AccountManagement'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 100,
    marginRight: 100,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));

const stripePromise = loadStripe("pk_test_51Iwe6JI3Xcs3HqD5tqc5jdf19qqrUZ7QzkB1jmAdgYOFVSNPZswQ3UFtwVANBw2kbB2XWBHvhVjlD6ijn42BwXpN00MOlvXkn5");

function App() {
    const { location } = useHistory();
    const classes = useStyles();

    if (localStorage.getItem('orders') === null) {
        localStorage.setItem('orders', '[]');
    }

    if (localStorage.getItem('dropOffAddress') === null) {
        localStorage.setItem('dropOffAddress', JSON.stringify({ streetAddress: null, city: null, state: null, zipCode: null } ));
    }

    return (
<Elements stripe={stripePromise}> 
      <Router>
        <div className={clsx(classes.content)}>
                    <div className={classes.drawerHeader} />
                    <HeaderComponent />
            <Switch>
                <Route path = "/login" exact component = {Login}></Route>
                <Route path = "/register" exact component = {Register}></Route>
                <Route path = "/account" exact component = {UserInfo}></Route>
                <Route path = "/update" exact component = {UpdateAccount}></Route>

                <Route path='/basket' component={OrderCart}></Route>
                <Route path='/restaurant/:id' component={RestaurantProfile}></Route>
                <Route path={'/restaurants/'} component={RestaurantSearch}></Route>
                <Route path="/error/:error" exact component={Error}></Route>
                <Route exact path={'/checkout'} component={(location.pathname === "/cart" || location.pathname === "/checkout") ? StripeCheckout : CheckoutRedirect}></Route>
                <Route path="/account/:id/orders" exact component={UserOrders}></Route>
                <Route path="/admin_temp" exact component={AccountManagement}></Route>

            </Switch>
          </div>
      </Router>
</Elements>
  );
}

export default App;