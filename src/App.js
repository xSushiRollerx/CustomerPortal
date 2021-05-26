import './App.css';
import Login from "./components/AccountComponents/Login"
import UserInfo from "./components/AccountComponents/UserInfo"
import Register from "./components/AccountComponents/Register"
import UpdateAccount from "./components/AccountComponents/UpdateAccount"
import OrderCart from './components/Checkout/OrderCart';
import Confirmation from './components/Checkout/Confirmation';
import OrderCompletion from './components/Checkout/OrderCompletion';
import RestaurantProfile from './components/Restaurants/RestaurantProfile';
import RestaurantSearch from './components/Restaurants/RestaurantSearch';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

function App() {
  return (
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
                    <Route path='/confirmation' component={Confirmation}></Route>
                    <Route path='/completion' component={OrderCompletion}></Route>
                    <Route path='/restaurant/:id' component={RestaurantProfile}></Route>
                    <Route path={'/restaurants/'} component={RestaurantSearch}></Route>
                </Switch>
            </div>
      </Router>
    </div>
  </div>
  );
}

export default App;