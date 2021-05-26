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
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

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
  const classes = useStyles();
  return (
  <div>
    <div>
      <Router>
        <div className={clsx(classes.content)}>
        <div className={classes.drawerHeader} />
          <HeaderComponent/>
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