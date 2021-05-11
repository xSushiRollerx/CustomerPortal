import React, { Component } from 'react'
import OrderItem from './OrderItem';

class Order extends Component {
    /**
    props needs
    - order : restaurantname, orderItems
    - changeDelteOrderItem()
    - changeItemQuantity()
    **/


    render() {
        let items = this.props.order.orderItems.map((item, index) =>
                <OrderItem id={index} item={item} quantityHandler={this.props.quantityHandler} deleteItemHandler={this.props.deleteItemHandler} orderId={this.props.id} />
        );

        let total = 0;
        this.props.order.orderItems.map(item => total += (item.quantity * item.price));
        return (
            <div style={{ marginBottom: "20px" }} data-testid={"Order " + this.props.id}>
                <div className="border-bottom"><h5>{this.props.order.name}</h5></div>
                <div>{items}</div>
                <div className="row">
                    <h5 className='col text-right'>Total:    ${(total).toFixed(2)}</h5>
                </div>
            </div>
        )

    }
}

export default Order;