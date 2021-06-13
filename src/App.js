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
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import StripeCheckout from './components/Checkout/StripeCheckout';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useHistory } from "react-router-dom";
import CheckoutRedirect from './components/Redirects/CheckoutRedirect';
import Error from './components/Errors/Error';

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
function App() {
    const { location } = useHistory();
    const classes = useStyles();
    return (
<Elements stripe={stripePromise}> 
      <Router>
        <div className={clsx(classes.content)}>
        <div className={classes.drawerHeader} />
          <HeaderComponent/>
            <Switch>
                <Route path = "/login" exact component = {Login}></Route>
                <Route path = "/register" exact component = {Register}></Route>
                <Route path = "/profile" exact component = {UserInfo}></Route>
                <Route path = "/update" exact component = {UpdateAccount}></Route>
                <Route path='/delivery-address' component={DeliveryAddress}></Route>
                <Route path='/cart' component={OrderCart}></Route>
                    <Route path="/error/:error" exact component={Error}></Route>
                                <Route path={'/checkout/'} component={(location.pathname === "/cart" || location.pathname === "/checkout") ? StripeCheckout : CheckoutRedirect}></Route>
                </Switch>
            </div>
    </div>
            </Router>
    </Elements>
  );
}

export default App;