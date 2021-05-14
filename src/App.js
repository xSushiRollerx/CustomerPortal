import './App.css';
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import Login from "./components/AccountComponents/Login"
import UserInfo from "./components/AccountComponents/UserInfo"
import Register from "./components/AccountComponents/Register"
import UpdateAccount from "./components/AccountComponents/UpdateAccount"
import DeliveryAddress from './components/Checkout/DeliveryAddressForm';
import OrderCart from './components/Checkout/OrderCart';
import OrderList from './components/Checkout/OrderList';
import Confirmation from './components/Checkout/Confirmation';
import OrderCompletion from './components/Checkout/OrderCompletion';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
  <div>
    <HeaderComponent/>
    <div>
      <Router>
        <div className="container">
            <Switch>
                <Route path = "/login" exact component = {Login}></Route>
                <Route path = "/register" exact component = {Register}></Route>
                <Route path = "/profile" exact component = {UserInfo}></Route>
                <Route path = "/update" exact component = {UpdateAccount}></Route>
                <Route path='/orders' component={OrderList}></Route>
                <Route path='/delivery-address' component={DeliveryAddress}></Route>
                <Route path='/cart' component={OrderCart}></Route>
                <Route path='/confirmation' component={Confirmation}></Route>
                <Route path='/completion' component={OrderCompletion}></Route>
            </Switch>
        </div>
      </Router>
    </div>
    
    <FooterComponent/>
  </div>
  );
}

export default App;