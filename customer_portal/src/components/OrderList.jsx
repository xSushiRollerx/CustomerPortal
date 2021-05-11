import React, { Component } from 'react'

class OrderList extends Component {
    constructor(props) {
        super(props) 
        this.state = {

            orders: []

        }

        this.deliveryAddress = this.deliveryAddress.bind(this);
    }

    deliveryAddress() {
        this.props.history.push('/delivery-address')
    }

    componentDidMount() {
       // CustomerOrderService.getAllOrders().then((response) => {
         //   this.setState({ orders: response.data });
        //});
    }
 

    render() {
        return (
            <div>
                <h2 className="text-center">Orders</h2>
                <div className='row'>
                    <button className='btn btn-primary' onClick={this.deliveryAddress}>Update Delivery Address</button>
                </div>
                <div className='row'>
                    <table className='table table-striped table-bordered'>

                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>State</th>
                                <th>Refund Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.orders.map(order =>
                                    <tr key={order.id}>
                                        <th>{order.id}</th>
                                        <th>{order.state}</th>
                                        <th>{order.refunded}</th>

                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default OrderList;