import React, { Component } from 'react'
import { Redirect } from 'react-router';
import UserService from '../services/UserService'

export default class Register extends Component {
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
            UserService.register(user).then((resp)=>{
                alert(user.username + ' has been successfully registered');
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
                <h2>Log in</h2>
                <form>
                    <label>Username: </label>
                    <input 
                    placeholder='username'
                    name='username'
                    className='form-control'
                    type='text' 
                    id='username'
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
                    <label>First Name: </label>
                    <input 
                    placeholder='firstName'
                    name='First'
                    className='form-control'
                    type='text' 
                    id='firstName'
                    />
                    <br/>
                    <label>Last Name: </label>
                    <input 
                    placeholder='Last'
                    name='lastName'
                    className='form-control'
                    type='text' 
                    id='lastName'
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
