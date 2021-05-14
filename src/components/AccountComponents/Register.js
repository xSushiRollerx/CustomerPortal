import React, { Component } from 'react'
import { Redirect } from 'react-router';
import UserService from '../../services/UserService'

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
            let validations = true;
            user.username = document.getElementById('username').value;
            if (user.username==="" || user.password===null){
                document.getElementById("username").value = null;
                document.getElementById("username").placeholder = 'Username cannot be empty'
                validations = false;
            }
            user.username = user.username.trim();
            
            user.password = document.getElementById('password').value;
            let passwordConfirm = document.getElementById('passwordConfirmation').value;
            if (user.password==="" || user.password===null){
                document.getElementById("password").value = null;
                document.getElementById("password").placeholder = 'Password cannot be empty'
                validations = false;
            }
            else if (user.password.length <= 6 || user.password.length >= 20) {
                document.getElementById("password").value = null;
                document.getElementById("password").placeholder = 'Password length should be between 6 and 20 exclusive'
                validations = false;
            }
            else if (user.password!==passwordConfirm) {
                document.getElementById("passwordConfirmation").value = null;
                document.getElementById("passwordConfirmation").placeholder = 'Passwords do not match'
                validations = false;
            }
            
            user.password = user.password.trim();
            
            user.firstName = document.getElementById('firstName').value;
            if (user.firstName === null || user.firstName==="" ){
                document.getElementById("firstName").value = null;
                document.getElementById("firstName").placeholder = 'Name cannot be empty'
                validations = false;
            }
            else if (!/^[A-Za-z ]+$/.test(user.firstName)){
                document.getElementById('firstName').value = null;
                document.getElementById("firstName").placeholder = 'Name must contain only letters'
                validations = false;
            }
            user.firstName = user.firstName.trim();
            
            user.lastName = document.getElementById('lastName').value.trim();
            if (user.firstName === null || user.firstName.trim()==="" ){
                document.getElementById("lastName").value = null;
                document.getElementById("lastName").placeholder = 'Name cannot be empty'
                validations = false;
            }
            else if (!/^[A-Za-z ]+$/.test(user.lastName)){
                document.getElementById('lastName').value = null;
                document.getElementById("lastName").placeholder = 'Name must contain only letters'
                validations = false;
            }
            user.firstName = user.firstName.trim();

            user.email = document.getElementById('email').value;
            if (user.email === null || user.email.trim()==="" ){
                document.getElementById("email").value = null;
                document.getElementById("email").placeholder = 'Email cannot be empty';
                validations = false;
            }
            else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email.trim())){
                document.getElementById("email").value = null;
                document.getElementById("email").placeholder = 'Email format unknown';
                validations = false;
            }
            user.email = user.email.trim();

            user.phone = document.getElementById('phone').value.trim();
            if (user.phone === null || user.phone === ""){
                document.getElementById("phone").value = null;
                document.getElementById("phone").placeholder = 'Phone cannot be empty';
            }
            else if (user.phone.trim().length!==10||!/^[A-Za-z ]+$/.test(user.phone.trim())){
                validations = false;
                document.getElementById("phone").value = null;
                document.getElementById("phone").placeholder = 'Phone format not supported';
            }
            user.phone = user.phone.trim();

            if(!validations){
                alert("Check your fields");
                return;
            }
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
                <h2>Register</h2>
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
                    <label>Password Confirmation: </label>
                    <input 
                    placeholder='password confirmation'
                    name='passwordConfirmation'
                    className='form-control'
                    type='password' 
                    id='passwordConfirmation'
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
