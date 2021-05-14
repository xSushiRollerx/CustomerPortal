import React, { Component } from 'react';
import CustomerOrderService from './../../services/CustomerOrderService';
import DropOffForm from './DropOffForm';


class Confirmation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            order: {},
            showDropOffForm: false
        }

        this.changeDeliveryAddress = this.changeDeliveryAddress.bind(this);
        this.changeShowDropOffForm = this.changeShowDropOffForm.bind(this);
    }

    changeDeliveryAddress = (delivery) => {
        this.state.order.address = delivery;
        this.setState({ order: this.state.order });
        localStorage.setItem('order', JSON.stringify(this.state.order));
    }

    changeShowDropOffForm = () => {
        this.state.showDropOffForm ? this.setState({ showDropOffForm: false }) : this.setState({ showDropOffForm: true });
    }

    placeOrder = () => {
        CustomerOrderService.submitOrder(this.state.order);
        this.props.history.push('/orders');

    }

    componentDidMount() {
        let foodOrder = {
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
            'refunded': 0,
            'state': 0
        }

        localStorage.setItem('order', JSON.stringify(foodOrder));
        this.setState({ order: JSON.parse(localStorage.getItem('order'))});
    }


    render() {

        if (this.state.order.orderItems === undefined | this.state.order.address === undefined) {
            return (<h1>LOADING</h1>);
        }
        let deliveryfee = 0;
        let taxes = 0;
        let subTotal = 0;
        this.state.order.orderItems.map(item => subTotal += (item.quantity * item.price));

        return (

            <div className='row' data-testid="Confirmation">
                <div className='col-8' style={{ paddingRight: '40px' }}>
                    <div>
                        <h3 className='border-bottom' style={{ padding: '14px' }}>Confirmation Details</h3>
                        <div className='row'>
                            <div className='col-9'>
                                <p className='m-0'>{this.state.order.address.street}</p>
                                <p className='m-0'>{this.state.order.address.city}, {this.state.order.address.state}</p>
                                <p className='m-0'>{this.state.order.address.zipCode}</p>
                            </div>
                            <div className='col-3'>
                                <div className='row'> 
                                    <button className='btn' onClick={this.changeShowDropOffForm}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>
                                </button>
                                <button className='btn btn-secondary rounded-0 w-100'>Continue</button>
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
                                    <p className='m-0'>Subtotal: </p>
                                    <p className='m-0'>Delivery: </p>
                                    <p className='m-0'>Tax: </p>
                                </div>

                                <div className='col-6'>
                                    <p className='m-0'>${(subTotal).toFixed(2)}</p>
                                    <p className='m-0'>${(deliveryfee).toFixed(2)}</p>
                                    <p className='m-0'>${(taxes).toFixed(2)}</p>
                                </div>

                            </tr>
                            <tr className='row'>
                                <p className='col-6 m-0'>Total</p>
                                <p className='col-6 m-0'>${(subTotal + deliveryfee + taxes).toFixed(2)}</p>
                            </tr>
                            <button className='w-100 btn btn-secondary rounded-0' onClick={this.placeOrder}>Place Order</button>
                       </tbody>
                    </table>
                </div>
                <div className='position-fixed'>
                    <DropOffForm address={this.state.order.address} addressHandler={this.changeDeliveryAddress} showDropOffFormHandler={this.changeShowDropOffForm} showDropOffForm={this.state.showDropOffForm} />
                </div>
            </div>
        
            
            );
    }
}

export default Confirmation;