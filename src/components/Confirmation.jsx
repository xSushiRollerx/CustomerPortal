import React, { Component } from 'react';
import CustomerOrderService from '../services/CustomerOrderService';
import DropOffForm from './DropOffForm';
import OrderSummary from './OrderSummary';



class Confirmation extends Component {
    constructor(props) {
        super(props)
        this.state = {

            orders: [],
            address: {},
            showDropOffForm: false
        }
        this.changeDeliveryAddress = this.changeDeliveryAddress.bind(this);
        this.changeShowDropOffForm = this.changeShowDropOffForm.bind(this);
    }


    changeDeliveryAddress = (delivery) => {
        for (let i = 0; i < this.state.orders.length; i++) {
            this.state.orders[i].address = delivery;
        }
        this.setState({ order: this.state.orders });
        this.setState({ address: delivery });

        localStorage.setItem('orders', JSON.stringify(this.state.orders));
        localStorage.setItem('dropOffAddress', JSON.stringify(this.state.orders));
    }

    changeShowDropOffForm = () => {
        this.state.showDropOffForm ? this.setState({ showDropOffForm: false }) : this.setState({ showDropOffForm: true });
    }

    placeOrder = () => {
        let orders = [];
        for (let i = 0; i < this.state.orders.length; i++) {
            let order = this.state.orders[i];
          
            delete order.name;
            console.log(order);
            if (CustomerOrderService.submitOrder(order) !== 204) {
                orders.push(this.state.orders[i]);
            }     
        }
        localStorage.setItem("orders", orders);
        this.props.history.push('/completion');
    }

    componentDidMount() {

        this.setState({ orders: JSON.parse(localStorage.getItem('orders')) });
        this.setState({ address: JSON.parse(localStorage.getItem('dropOffAddress')) });
    }


    render() {

        if (this.state.orders === undefined || this.state.orders === 0 || this.state.address === {}) {
            return (<h1>LOADING</h1>);
        }

        let deliveryfee = 0;
        let taxes = 0;
        let subTotal = 0;
        this.state.orders.map(order => order.orderItems.map(item => subTotal += (item.quantity * item.price)));

        return (
            <div className="" data-testid="Order">
                <div className='row'>
                    <div className='col-8'>
                        <table className='table table-bordered'>
                            <thead>
                                <th><h3>Payment Information</h3></th>
                            </thead>
                            <tbody>
                                <tr><h4>Saved Payment</h4></tr> 
                                <tr><h4>New Paymentt</h4></tr> 
                            </tbody>
                        </table>
                    </div>
                    <div className='col-4'>
                        <OrderSummary address={this.state.address} subtotal={subTotal}
                            deliveryfee={deliveryfee} taxes={taxes} showDropOffFormHandler={this.changeShowDropOffForm}
                            showDropOffForm={this.showDropOffForm} checkOut={this.placeOrder} buttonName="Place Order" orders={this.state.orders}/>
                    </div>
                    <div className='position-fixed'>
                        <DropOffForm address={this.state.address} addressHandler={this.changeDeliveryAddress}
                            showDropOffFormHandler={this.changeShowDropOffForm} showDropOffForm={this.state.showDropOffForm} />
                    </div>
                </div>
            </div>  

        )

    }
}


export default Confirmation;