import React, { Component } from 'react'
import Order from './Order';
import OrderSummary from './OrderSummary';
import DeliveryAddress from '../Restaurants/DeliveryAddress';


class OrderCart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            address: {},
            showDropOffForm: false,
            errorText: ""
        }
        this.changeItemQuantity = this.changeItemQuantity.bind(this);
        this.changeDeliveryAddress = this.changeDeliveryAddress.bind(this);
        this.changeShowDropOffForm = this.changeShowDropOffForm.bind(this);
        this.checkOut = this.checkOut.bind(this);
    }

    checkOut = () => {
        if (this.state.orders.length === 0 && (this.state.address.streetAddress === null)) {
            this.setState({ errorText: "Cannot checkout! There are no order items in your basket and you haven't filled out where you want your order(s) dropped off!" });
        } else if (this.state.orders.length === 0) {
            this.setState({ errorText: "Cannot checkout! There are no order items in your basket!" });
            //alert("There are No Order Items In Your Basket");
        } else if (this.state.orders[0].address.street === null) {
            this.setState({ errorText: "Cannot checkout. You haven't filled out where you want your order(s) dropped off!" });
        } else {
            this.props.history.push('/checkout');
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

    changeDeliveryAddress = () => {
        console.log("handle address change run");
        console.log(document.getElementById('dropOffSelect').value);
        if (document.getElementById('dropOffSelect').value.trim() !== "") {
            let temp = document.getElementById('dropOffSelect').value.trim().split(",");
            let tempOrders = this.state.orders;
            for (let i = 0; i < this.state.orders.length; i++) {
                tempOrders[i].address = { streetAddress: temp[0], city: temp[1], state: temp[2], zipCode: null };
            }
            this.setState({ orders: tempOrders });
            this.setState({ address: { streetAddress: temp[0], city: temp[1], state: temp[2], zipCode: null } });

            localStorage.setItem('dropOffAddress', JSON.stringify({ streetAddress: temp[0], city: temp[1], state: temp[2], zipCode: null }));
            localStorage.setItem('orders', JSON.stringify(this.state.orders));
        }

    }

    changeShowDropOffForm = () => {
        this.state.showDropOffForm ? this.setState({ showDropOffForm: false }) : this.setState({ showDropOffForm: true });
    }

    componentDidMount() {
        console.log(JSON.parse(localStorage.getItem('orders')));
        this.setState({ orders: JSON.parse(localStorage.getItem('orders')) });
        this.setState({ address: JSON.parse(localStorage.getItem('dropOffAddress')) });

    }

    
    render() {

        console.log(JSON.parse(localStorage.getItem('orders')));
        console.log(this.state.orders);
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
                            showDropOffForm={this.showDropOffForm} checkOut={this.checkOut} errorText={this.state.errorText}/>
                    </div>
                    <div className='position-fixed'>
                        <DeliveryAddress open={this.state.showDropOffForm} close={this.changeShowDropOffForm} addressChange={this.changeDeliveryAddress}/>
                    </div>
                </div>  
            </div>   
            
        )
          
    }
}

export default OrderCart;