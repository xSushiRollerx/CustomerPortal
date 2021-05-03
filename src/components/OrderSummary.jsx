import React, { Component } from 'react';

class OrderSummary extends Component {

    render() {

        console.log("ordersumary address: " + this.props.address);

        return (
            <div>
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
                                <p className='m-0'>${(this.props.subtotal).toFixed(2)}</p>
                                <p className='m-0'>${(this.props.deliveryfee).toFixed(2)}</p>
                                <p className='m-0'>${(this.props.taxes).toFixed(2)}</p>
                        </div>

                    </tr>
                    <tr className=''>
                        <p className='col-6 m-0'>Total</p>
                        <p className='col-6 m-0'>${ (this.props.subtotal + this.props.deliveryfee + this.props.taxes).toFixed(2)}</p>
                    </tr>
                        <tr>
                            <div className='row d-flex align-items-center'>  
                                <div className='col'>
                                    <h6 className='m-0'>Drop Off Location</h6>
                                </div>
                              <div className='col'>
                                    <button className='btn center-block' onClick={this.props.showDropOffFormHandler}>
                                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                 </svg>
                              </button>
                            </div>
                        </div>
                            <p className='m-0'>{this.props.address.street}</p>
                            <p className='m-0'>{this.props.address.city}, {this.props.address.state}</p>
                            <p className='m-0'>{this.props.address.zipCode}</p>
                    </tr>
                </tbody>
            </table>
                <button className='w-100 btn btn-secondary rounded-0'>Check Out</button>
            </div>
        )
    }

    
}

export default OrderSummary;