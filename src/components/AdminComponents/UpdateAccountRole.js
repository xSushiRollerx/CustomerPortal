import React, { Component } from 'react'
import { Redirect } from 'react-router';
import UserService from '../../services/UserService'

export default class UpdateAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectValue: 0,
        }
    }
    handleChange(e){
        this.setState({selectValue: e.target.value});
    }
    render() {
        function submit(e) {
            e.preventDefault();
            let username = document.getElementById('username').value;
            UserService.updateUserRole(username,this.state.selectValue);
        };
        function cancel(e) {
            e.preventDefault();
            Redirect('/');
        };
        return (
            <div>
                <h2>Update Account Role</h2>
                <h3>Assign user a given role</h3>
                <form>
                    <label>Username: </label>
                    <input 
                    placeholder='username'
                    name='username'
                    className='form-control'
                    type='text' 
                    id='username'
                    />
                    <select 
                        value={this.state.selectValue} 
                        onChange={this.handleChange}>
                        <option value="0">Select Desired User Role</option>
                        <option value="1">Admin</option>
                        <option value="2">Customer</option>
                        <option value="3">Driver</option>
                        <option value="4">Owner</option>
                    </select>
                    <button className="btn btn-success" 
                    onClick={submit}>
                        Submit
                    </button>
                    <button className="btn btn-danger" 
                    onClick={cancel}
                    style={{marginLeft: "10px"}}>
                        Cancel
                    </button>
                </form>
            </div>
        )
    }
}
