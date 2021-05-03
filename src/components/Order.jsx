import React, { Component } from 'react'
import OrderItem from './OrderItem';
import OrderSummary from './OrderSummary';
import DropOffForm from './DropOffForm';


class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {

            order: {},
            //don't delete address idk why but it fails if deleted
            address: {},
            showDropOffForm: false
        }
        this.changeItemQuantity = this.changeItemQuantity.bind(this);
        this.changeDeliveryAddress = this.changeDeliveryAddress.bind(this);
        this.changeShowDropOffForm = this.changeShowDropOffForm.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }

    checkOut = () => {
        if (this.state.order.orderItems.length === 0 && (this.state.order.address.street === null | this.state.order.address.city === null | this.state.order.address.state === null | this.state.order.address.zipCode === null)) {
            alert("There are No Order Items In Your Basket And You Haven't Filled Out The Delivery Form Completely");
        } else if (this.state.order.orderItems.length === 0) {
            alert("There are No Order Items In Your Basket");
        } else if (this.state.order.address.street === null | this.state.order.address.city === null | this.state.order.address.state === null | this.state.order.address.zipCode === null) {
            alert("You Haven't Filled Out The Delivery Form Completely");
        } else {
            this.props.history.push('/delivery-address');
        }
        
    }

    changeDeleteOrderItem = (itemPosition) => {
        this.state.order.orderItems.splice(itemPosition, 1);
        this.setState({ order: this.state.order });
        localStorage.setItem('order', JSON.stringify(this.state.order));
    }

    changeItemQuantity = (value, key) => {
        this.state.order.orderItems[key].quantity = value;
        this.setState({ order: this.state.order });
        localStorage.setItem('order', JSON.stringify(this.state.order));
    }

    changeDeliveryAddress = (delivery) => {
        this.state.order.address = delivery;
        this.setState({ order: this.state.order });
        localStorage.setItem('order', JSON.stringify(this.state.order));
    }

    changeShowDropOffForm = () => {
        this.state.showDropOffForm ? this.setState({ showDropOffForm: false }) : this.setState({ showDropOffForm: true });
    }

    componentDidMount() {
        let foodOrder = {
             'address': {'city': null, 'deliveryTime': null,
                'id': null,
                'state': null,
                'street': null,
                'zipCode': null
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
        this.setState({ order: JSON.parse(localStorage.getItem('order')) });
    }


    render() {

        if (this.state.order.orderItems === undefined | this.state.order.address === undefined) {
            return (<h1>LOADING</h1>);
        }

        let items = null;
        if (this.state.order.orderItems.length !== 0) {
            items = this.state.order.orderItems.map((item, index) =>
                <tr>
                    <OrderItem id={index} item={item} quantityHandler={this.changeItemQuantity} deleteItemHandler={this.changeDeleteOrderItem} />
                </tr>
            );
        } else {
            items = <p className="text-center">No Items . . . Go Shopping!</p>;
        }
      
      
        let subTotal = 0;
        this.state.order.orderItems.map(item => subTotal += (item.quantity * item.price));
        
        
        return (
            <div>
            <div className='row'>
            <div className='col-8'>     
            <table className='table table-bordered'>
                <thead>
                    <th><h3>My Basket</h3></th>
                </thead>
                <tbody>
                    {items}
                </tbody>
                </table>
            </div>
                <div className='col-4'>
                        <OrderSummary key={this.state.order.id} address={this.state.order.address} subtotal={subTotal}
                            deliveryfee={0.00} taxes={0.00} showDropOffFormHandler={this.changeShowDropOffForm}
                            showDropOffForm={this.showDropOffForm} checkOut={ this.checkOut } />
                    </div>
                    <div className='position-fixed'>
                        <DropOffForm address={this.state.order.address} addressHandler={this.changeDeliveryAddress} showDropOffFormHandler={this.changeShowDropOffForm} showDropOffForm={this.state.showDropOffForm} />
                    </div>
                </div>  
            </div>   
            
        )
          
    }
}

export default Order;