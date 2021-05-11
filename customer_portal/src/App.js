import './App.css';
import OrderList from './components/checkout/OrderList';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DeliveryAddress from './components/checkout/DeliveryAddressForm';
import React, { Component } from 'react';
import OrderCart from './components/checkout/OrderCart';
import Confirmation from './components/checkout/Confirmation';
import CustomerPortal from "./components/CustomerPortal";

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let foodOrder = [
            {
                'name': 'Tokyo Sushi',
                'restaurantId': 1,
                'address': {
                    'city': 'nowhere', 'deliveryTime': null,
                    'id': null,
                    'state': 'KN',
                    'street': 'XXXX YOLO',
                    'zipCode': 66666
                },
                'customerId': 96,
                'id': null,
                'orderItems': [
                    {
                        'foodId': 1,
                        'id': null,
                        'isActive': 1,
                        'name': "Miso Soup",
                        'price': 3.99,
                        'quantity': 2
                        },
                     {
                        'foodId': 2,
                         'id': null,
                        'isActive': 1,
                        'name': "California Roll",
                        'price': 6.99,
                        'quantity': 4
                     }
                ],
                'dateSubmitted': null,
                'refunded': 0,
                'state': 0
            },
            {
                'name': 'French Bistro',
                'restaurantId': 2,
                'address': {
                    'city': 'nowhere', 'deliveryTime': null,
                    'id': null,
                    'state': 'KN',
                    'street': 'XXXX YOLO',
                    'zipCode': 66666
                },
                'customerId': 96,
                'id': null,
                'orderItems': [
                    {
                        'foodId': 1,
                        'id': null,
                        'isActive': 1,
                        'name': "Croissant",
                        'price': 2.99,
                        'quantity': 2
                    },
                    {
                        'foodId': 2,
                        'id': null,
                        'isActive': 1,
                        'name': "Pan Francaise",
                        'price': 4.99,
                        'quantity': 4
                    }
                ],
                'dateSubmitted': null,
                'refunded': 0,
                'state': 0
            }

        ]

        let address = {
            'city': 'nowhere', 'deliveryTime': null,
            'id': null,
            'state': 'KN',
            'street': 'XXXX YOLO',
            'zipCode': 66666
        };

        localStorage.setItem('orders', JSON.stringify(foodOrder));
        localStorage.setItem('dropOffAddress', JSON.stringify(address));
        return (
            <div>
                <Router>
                    <Header />
                    <div className='container'>
                        <Switch>
                            <Route path='/orders' component={OrderList}></Route>
                            <Route path='/delivery-address' component={DeliveryAddress}></Route>
                            <Route path='/active' component={OrderCart}></Route>
                            <Route path='/confirmation' component={Confirmation}></Route>
                            <Route path="/*" exact component={CustomerPortal}></Route>
                        </Switch>
                    </div>
                    <Footer />
                </Router>
            </div>

        );
    }
}

export default App;
