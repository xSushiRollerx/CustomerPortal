import './App.css';
import Login from "./components/AccountComponents/Login"
import UserInfo from "./components/AccountComponents/UserInfo"
import Register from "./components/AccountComponents/Register"
import UpdateAccount from "./components/AccountComponents/UpdateAccount"
import OrderCart from './components/Checkout/OrderCart';
import Confirmation from './components/Checkout/Confirmation';
import OrderCompletion from './components/Checkout/OrderCompletion';
<<<<<<< HEAD
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
=======
import RestaurantProfile from './components/Restaurants/RestaurantProfile';
import RestaurantSearch from './components/Restaurants/RestaurantSearch';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
>>>>>>> c581758e7e61d7e1b87193b936984f0b64a53c99

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
<<<<<<< HEAD
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
=======
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
>>>>>>> c581758e7e61d7e1b87193b936984f0b64a53c99
      </Router>
    </div>
  </div>
  );
}

export default App;