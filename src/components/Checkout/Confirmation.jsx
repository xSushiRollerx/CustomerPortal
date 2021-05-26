import React, { Component } from 'react';
import CustomerOrderService from './../../services/CustomerOrderService';
import DropOffForm from './DropOffForm';
import Divider from '@material-ui/core/Divider';


class Confirmation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            showDropOffForm: false,
            address: {}
        }

        this.changeDeliveryAddress = this.changeDeliveryAddress.bind(this);
        this.changeShowDropOffForm = this.changeShowDropOffForm.bind(this);
    }

    changeDeliveryAddress = (delivery) => {
        this.state.orders.address = delivery;
        this.setState({ order: this.state.order });
        localStorage.setItem('orders', JSON.stringify(this.state.orders));
    }

    changeShowDropOffForm = () => {
        this.state.showDropOffForm ? this.setState({ showDropOffForm: false }) : this.setState({ showDropOffForm: true });
    }

    placeOrder = () => {
        CustomerOrderService.submitOrder(this.state.orders);
        this.props.history.push('/orders');

    }

    componentDidMount() {
        this.setState({ orders: JSON.parse(localStorage.getItem('orders')) });
        this.setState({ address: JSON.parse(localStorage.getItem('dropOffAddress'))});
    }


    render() {

        if (this.state.orders === undefined | this.state.orders.length === 0) {
            return (<h1>LOADING</h1>);
        }
        let deliveryfee = 0;
        let taxes = 0;
        let subTotal = 0;
        this.state.orders.map(o => o.orderItems.map(item => subTotal += (item.quantity * item.price)));
        let orderNames = this.state.orders.map(o => <p className='m-0'>{o.name}: </p>);
        let getTotal = (o) => {
            let sum = 0;
            o.orderItems.map(item => { sum += item.quantity * item.price });
            console.log(sum);
            return sum;
        }
        let orderTotals = this.state.orders.map(o => <p className='m-0'>${getTotal(o).toFixed(2)}</p>);
        return (

            <div className='row' data-testid="Confirmation">
                <div className='col-8' style={{ paddingRight: '40px' }}>
                    <div>
                        <Divider orientation="horizontal" flexItem />
                        <h3 className='border-bottom' style={{ padding: '14px' }}>Confirmation Details</h3>
                        <div className='row'>
                            <div className='col-9'>
                                <p className='m-0'>{this.state.address.street}</p>
                                <p className='m-0'>{this.state.address.city}, {this.state.address.state}</p>
                                <p className='m-0'>{this.state.address.zipCode}</p>
                            </div>
                            <div className='col-3'>
                                <div className='row'> 
                                    <button className='btn' onClick={this.changeShowDropOffForm}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>
                                </button>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='row'>
                        <h3 className='border-bottom' style={{ padding: '14px' }}>Payment</h3>
                        <div>Saved Payment Information</div>
                        <div>Enter New Payment Form</div>
                    </div>
                </div>
                
                <div className='col-4'>
                    <table className='table table-bordered'>
                        <thead>
                            <th><h3>Order Summary</h3></th>
                        </thead>
                        <tbody>
                            <tr className='row border-0'>
                                <div className='col-6'>
                                    {orderNames}
                                    <p className='m-0'>Delivery: </p>
                                    <p className='m-0'>Tax: </p>
                                </div>

                                <div className='col-6'>
                                    {orderTotals}
                                    <p className='m-0'>${(deliveryfee).toFixed(2)}</p>
                                    <p className='m-0'>${(taxes).toFixed(2)}</p>
                                </div>

                            </tr>
                            <tr className='row'>
                                <p className='col-6 m-0'>Total</p>
                                <p className='col-6 m-0'>${(subTotal + deliveryfee + taxes).toFixed(2)}</p>
                            </tr>
                            <button data-testId="PlaceOrder" className='w-100 btn btn-secondary rounded-0' onClick={this.placeOrder}>Place Order</button>
                       </tbody>
                    </table>
                </div>
                <div className='position-fixed'>
                    <DropOffForm address={this.state.address} addressHandler={this.changeDeliveryAddress} showDropOffFormHandler={this.changeShowDropOffForm} showDropOffForm={this.state.showDropOffForm} />
                </div>
            </div>
        
            
            );
    }
}

export default Confirmation;