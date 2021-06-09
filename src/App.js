import './App.css';
import Login from "./components/AccountComponents/Login"
import UserInfo from "./components/AccountComponents/UserInfo"
import Register from "./components/AccountComponents/Register"
import UpdateAccount from "./components/AccountComponents/UpdateAccount"
import OrderCart from './components/Checkout/OrderCart';
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

const stripePromise = loadStripe("pk_test_51Iwe6JI3Xcs3HqD5tqc5jdf19qqrUZ7QzkB1jmAdgYOFVSNPZswQ3UFtwVANBw2kbB2XWBHvhVjlD6ijn42BwXpN00MOlvXkn5");

function App() {
    const { location } = useHistory();
    return (
<Elements stripe={stripePromise}> 
  <div>
    <div>
        <NavBar />
        <Router>
            <div className="container">
                <Switch>
                    <Route path = "/login" exact component = {Login}></Route>
                    <Route path = "/register" exact component = {Register}></Route>
                    <Route path = "/profile" exact component = {UserInfo}></Route>
                    <Route path = "/update" exact component = {UpdateAccount}></Route>
                    <Route path='/cart' component={OrderCart}></Route>
                    <Route path='/restaurant/:id' component={RestaurantProfile}></Route>
                    <Route path={'/restaurants/'} component={RestaurantSearch}></Route>
                    <Route path="/error/:error" exact component={Error}></Route>
                                <Route path={'/checkout/'} component={(location.pathname === "/cart" || location.pathname === "/checkout") ? StripeCheckout : CheckoutRedirect}></Route>
                </Switch>
            </div>
      </Router>
    </div>
            </div>
    </Elements>
  );
}

export default App;