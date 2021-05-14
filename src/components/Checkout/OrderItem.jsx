import React, { Component } from 'react'

class OrderItem extends Component {

    quantityChange = (event) => {
        this.props.quantityHandler(event.target.value, this.props.id, this.props.orderId);
    }

    deleteItemChange = () => {
        this.props.deleteItemHandler(this.props.id, this.props.orderId);
    }

    render() {

        return (
            <div className='row d-flex align-items-center border-bottom' data-testid={"Order " + this.props.orderId + " Item " + this.props.id} key={this.props.id} style={{marginBottom: "10px"} }>
                <div className='col-3'>
  
                </div>
                <div className='col-5'>
                    <h5>{this.props.item.name}</h5>
                    <p>${ this.props.item.price }</p>
                </div>
                <div className='col-3'>
                    <table>
                        <tbody>
                            <tr className='row'>
                                <th className='col-6 p-0'>Quantity: </th>
                                <th className='col-6 p-0'>
                                    <input type="number" placeholder={this.props.item.quantity} data-testid={"order " + this.props.orderId + " item quantity " + this.props.id}
                                        onChange={this.quantityChange} min="0" step="1" className='w-50' style={{ border: '0px' }} />
                                </th>
                            </tr>
                            <tr className='row'>
                                <th className='col-6 p-0'>Price: </th>
                                <th className='col-6 p-0'>${this.props.item.price}</th>
                            </tr>
                            <tr className='row'>
                                <th className='col-6 p-0'>Total: </th>
                                <th className='text-right col-6 p-0' data-testid={"order " + this.props.orderId + " item total " + this.props.id}>${((this.props.item.quantity) * (this.props.item.price)).toFixed(2)}</th>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className='col-1'>
                    <button className='btn center-block'>
                        <svg data-testid={"Order " + this.props.orderId + " Delete " + this.props.id} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="grey" className="bi bi-x" viewBox="0 0 16 16" onClick={this.deleteItemChange}>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                        </svg>
                    </button>
                </div>
            </div>
            
        )

    }
}

export default OrderItem;