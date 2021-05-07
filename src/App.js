import './App.css';
import OrderList from './components/OrderList';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DeliveryAddress from './components/DeliveryAddressForm';
import React, { Component } from 'react';
import Order from './components/Order';
import Confirmation from './components/Confirmation';

class App extends Component {
    constructor(props) {
        super(props)
        this.orderRef = React.createRef(); 
    }

    render() {
        return (
            <div>
                <Router>
                    <Header />
                    <div className='container'>
                        <Switch>
                            <Route path='/orders' component={OrderList}></Route>
                            <Route path='/delivery-address' component={DeliveryAddress}></Route>
                            <Route path='/active' ref={this.orderRef} component={Order}></Route>
                            <Route path='/confirmation' component={Confirmation}></Route>
                        </Switch>
                    </div>
                    <Footer />
                </Router>
            </div>

        );
    }
}

export default App;
