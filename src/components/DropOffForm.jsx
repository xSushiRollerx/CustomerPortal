import React, { Component } from 'react'

class DropOffForm extends Component {

    submitDeliveryAddress = (event) => {
        event.preventDefault();
       
        this.props.showDropOffFormHandler();
        this.props.addressHandler(this.props.address);
    }

    streetHandler = (event) => {
        this.props.address.street = event.target.value;
    }

    cityHandler = (event) => {
        this.props.address.city = event.target.value;
    }

    stateHandler = (event) => {
        this.props.address.state = event.target.value;
    }

    zipCodeHandler = (event) => {
        this.props.address.zipCode = parseInt(event.target.value);
    }


    render() {
        return (
            <div className='container-fluid' data-testid="DropOffForm" style={{ display: (this.props.showDropOffForm ? 'block' : 'none') }}>
                <div>
                    <div className='row'>
                        <div className='card col-md-4 offset-md-3 offset-md-3'>
                                <h3 className='text-center'>Order Drop Off</h3>
                            <form>
                                <div className='form-group'>
                                    <label>Street Address:</label>
                                    <input placeholder='Street Address' name='streetAddress' className='form-control'
                                        data-testid="DropOffFormStreet" onChange={this.streetHandler}></input>
                                </div>
                                <div className='form-group'>
                                    <label>City:</label>
                                    <input placeholder='City' name='city' className='form-control'
                                        data-testid="DropOffFormCity" onChange={this.cityHandler}></input>
                                </div>
                                <div className='form-group'>
                                    <label>State:</label>
                                    <input placeholder='State' name='state' className='form-control'
                                        data-testid="DropOffFormState" onChange={this.stateHandler} style={{ marginBottom: '10px' }}></input>
                                </div>
                                <div className='form-group'>
                                    <label>Zip Code: </label>
                                    <input placeholder='Zip Code' name='zipCode' className='form-control'
                                        data-testid="DropOffFormZipCode" onChange={this.zipCodeHandler} style={{ marginBottom: '10px' }}></input>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button className='btn btn-secondary rounded-0' data-testid="DropOffFormSubmit" onClick={this.submitDeliveryAddress}
                                        >Submit</button>
                                    <button className='btn btn-secondary rounded-0' onClick={this.props.showDropOffFormHandler}
                                        style={{ marginLeft: '10px' }} data-testid="DropOffFormCancel">Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
         
        )
    }
}

export default DropOffForm