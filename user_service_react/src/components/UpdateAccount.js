import React, { Component } from 'react'
import { Redirect } from 'react-router';
import UserService from '../services/UserService'

export default class UpdateAccount extends Component {
    render() {
        function submit(e) {
            e.preventDefault();
            let user = {
                username: null,
                password: null,
                email: null,
                firstName: null,
                lastName: null,
                phone: null
            }
            user.username = document.getElementById('username').value;
            user.password = document.getElementById('password').value;
            user.firstName = document.getElementById('firstName').value;
            user.lastName = document.getElementById('lastName').value;
            user.email = document.getElementById('email').value;
            user.phone = document.getElementById('phone').value;
            UserService.update(user).then((resp)=>{
                alert(user.username + ' has been updated. Please log out for the changes to be applied.');
            }).catch((error)=>{
                alert(error);
            });
        };
        function cancel(e) {
            e.preventDefault();
            Redirect('/');
        };
        return (
            <div>
                <h2>Update Account</h2>
                <h3>Fill in the fields you want changed</h3>
                <form>
                    <label>Username: </label>
                    <input 
                    placeholder='username'
                    name='username'
                    className='form-control'
                    type='text' 
                    id='username'
                    />
                    <label>First Name: </label>
                    <input 
                    placeholder='firstName'
                    name='firstName'
                    className='form-control'
                    type='text' 
                    id='firstName'
                    />
                    <label>Last Name: </label>
                    <input 
                    placeholder='lastName'
                    name='lastName'
                    className='form-control'
                    type='text' 
                    id='lastName'
                    />
                    <br/>
                    <label>Password: </label>
                    <input 
                    placeholder='password'
                    name='password'
                    className='form-control'
                    type='password' 
                    id='password'
                    />
                    <label>Email: </label>
                    <input 
                    placeholder='email@example.com'
                    name='email'
                    className='form-control'
                    type='text' 
                    id='email'
                    />
                    <br/>
                    <label>Phone: </label>
                    <input 
                    placeholder='phone'
                    name='phone'
                    className='form-control'
                    type='text' 
                    id='phone'
                    />
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
