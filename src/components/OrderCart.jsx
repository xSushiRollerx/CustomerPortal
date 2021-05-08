import React, { Component } from 'react'
import Order from './Order';
import OrderSummary from './OrderSummary';
import DropOffForm from './DropOffForm';


class OrderCart extends Component {
    constructor(props) {
        super(props)
        this.state = {

            orders: [],
            address: {},
            showDropOffForm: false
        }
        this.changeItemQuantity = this.changeItemQuantity.bind(this);
        this.changeDeliveryAddress = this.changeDeliveryAddress.bind(this);
        this.changeShowDropOffForm = this.changeShowDropOffForm.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }

    checkOut = () => {
        if (this.state.orders.length === 0 && (this.state.orders[0].address.street === null)) {
            alert("There are No Order Items In Your Basket And You Haven't Filled Out The Delivery Form Completely");
        } else if (this.state.orders.length === 0) {
            alert("There are No Order Items In Your Basket");
        } else if (this.state.orders[0].address.street === null) {
            alert("You Haven't Filled Out The Delivery Form Completely");
        } else {
            this.props.history.push('/confirmation');
        }
        
    }

    changeDeleteOrderItem = (itemPosition, orderId) => {
        this.state.orders[orderId].orderItems.splice(itemPosition, 1);
        this.setState({ orders: this.state.orders });

        if (this.state.orders[orderId].orderItems.length === 0) {
            this.state.orders.splice(orderId, 1);
            this.setState({ orders: this.state.orders });
        }
        localStorage.setItem('orders', JSON.stringify(this.state.orders));
    }

    changeItemQuantity = (value, key, orderId) => {
        this.state.orders[orderId].orderItems[key].quantity = parseInt(value);
        this.setState({ order: this.state.orders });
        localStorage.setItem('orders', JSON.stringify(this.state.orders));
    }

    changeDeliveryAddress = (delivery) => {
        for (let i = 0; i < this.state.orders.length; i++) {
            this.state.orders[i].address = delivery;
        }
        this.setState({ order: this.state.orders });
        this.setState({ address: delivery });

        localStorage.setItem('orders', JSON.stringify(this.state.orders));
    }

    changeShowDropOffForm = () => {
        this.state.showDropOffForm ? this.setState({ showDropOffForm: false }) : this.setState({ showDropOffForm: true });
    }

    componentDidMount() {
        
        console.log("componenetdid mount " + localStorage.getItem('orders'));
        this.setState({ orders: JSON.parse(localStorage.getItem('orders')) });
        this.setState({ address: JSON.parse(localStorage.getItem('dropOffAddress')) });

    }


    render() {

        if (this.state.orders=== undefined) {
            return (<h1>LOADING</h1>);
        }

        let orders = null;
        if (this.state.orders.length !== 0) {
            orders = this.state.orders.map((order, index) =>
                <tr>
                    <Order id={index} order={order} quantityHandler={this.changeItemQuantity} deleteItemHandler={this.changeDeleteOrderItem} />
                </tr>
            );
        } else {
            orders = <p className="text-center" data-testid="NoItems">No Orders . . . Go Shopping!</p>;
        }
      
      
        let subTotal = 0;
        this.state.orders.map(order => order.orderItems.map(item => subTotal += (item.quantity * item.price)));
        
        
        return (
            <div className="" data-testid="Order">
            <div className='row'>
            <div className='col-8'>     
            <table className='table table-bordered'>
                <thead>
                    <th><h3>My Basket</h3></th>
                </thead>
                <tbody>
                    {orders}
                </tbody>
                </table>
            </div>
                <div className='col-4'>
                        <OrderSummary address={this.state.address} subtotal={subTotal}
                            deliveryfee={0.00} taxes={0.00} showDropOffFormHandler={this.changeShowDropOffForm}
                            showDropOffForm={this.showDropOffForm} checkOut={ this.checkOut } />
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

export default OrderCart;