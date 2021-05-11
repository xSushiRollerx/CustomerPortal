import React, { Component } from 'react'
import CustomerOrderService from '../services/CustomerOrderService'

class DeliveryAddressForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            streetAddress: '',
            city: '',
            state: '',
            zipCode: 0

        }
        this.changeStreetAddressHandler = this.changeStreetAddressHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.changeStateHandler = this.changeStateHandler.bind(this);
        this.saveDeliveryAddress = this.saveDeliveryAddress.bind(this);
    }

    saveDeliveryAddress = (event) => {
        event.preventDefault();
        let deliveryAddress = { id: this.state.id, street: this.state.streetAddress, city: this.state.city, state: this.state.state };
        console.log('delivery address: ' + JSON.stringify(deliveryAddress));

        CustomerOrderService.updateDeliveryAddress(deliveryAddress).then(response => {
            this.props.history.push('/orders');
        });
    }

    cancel() {
        this.props.history.push('/orders');
    }

    changeStreetAddressHandler = (event) => {
        this.setState({ streetAddress: event.target.value });
    }

    changeCityHandler = (event) => {
        this.setState({ city: event.target.value });
    }

    changeStateHandler = (event) => {
        this.setState({ state: event.target.value });
    }


    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className = 'card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Order Drop Off</h3>
                            <form>
                                <div className='form-group'>
                                    <label>Street Address:</label>
                                    <input placeholder='Street Address' name='streetAddress' className='form-control'
                                        value={this.state.streetAddress} onChange={this.changeStreetAddressHandler }></input>
                                </div>
                                <div className='form-group'>
                                    <label>City:</label>
                                    <input placeholder='City' name='city' className='form-control'
                                        value={this.state.city} onChange={this.changeCityHandler}></input>
                                </div>
                                <div className='form-group'>
                                    <label>State:</label>
                                    <input placeholder='State' name='state' className='form-control'
                                        value={this.state.state} onChange={this.changeStateHandler} style={{ marginBottom: '10px' }}></input>
                                </div>
                                <button className='btn btn-success' onClick={this.saveDeliveryAddress}>Submit</button>
                                <button className='btn btn-danger' onClick={this.cancel.bind(this)} style={{ marginLeft: '10px'}}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeliveryAddressForm;