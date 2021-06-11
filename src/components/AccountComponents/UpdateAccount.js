import React, { Component } from 'react'
import UserService from '../../services/UserService'

class UpdateAccount extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.cancel = this.cancel.bind(this);
    }
    cancel = (e)=> {
        e.preventDefault();
        this.props.history.push('profile');
    };
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
            if (user.username===null){

            }
            else {
                user.username=user.username.trim();
            }
            
            user.password = document.getElementById('password').value;
            let passwordConfirm = document.getElementById('passwordConfirmation').value;
            if (user.password == null||user.password === ""){
                document.getElementById("pwValid").textContent = null;
            }
            else if (user.password.length <= 6 || user.password.length >= 20) {
                document.getElementById("pwValid").textContent = 'Password length should be between 6 and 20 characters long'
                validations = false;
            }
            else if (user.password!==passwordConfirm) {
                document.getElementById("pwValid").textContent = 'Passwords do not match'
                validations = false;
            }
            else {
                document.getElementById("pwValid").textContent = null;
            }
            
            user.password = user.password.trim();
            
            user.firstName = document.getElementById('firstName').value;
            if (user.firstName === null||user.firstName === ""){
                document.getElementById("fnValid").textContent = null;
            }
            else if (!/^[A-Za-z ]+$/.test(user.firstName)){
                document.getElementById("fnValid").textContent  = 'Name must contain only letters'
                validations = false;
            }
            else if (user.firstName.trim()===""){
                document.getElementById("fnValid").textContent  = 'Name must not be made of only white spaces'
                validations = false;
            }
            else {
                document.getElementById("fnValid").textContent = null;
                user.firstName = user.firstName.trim();
            }
            
            user.lastName = document.getElementById('lastName').value;
            if (user.lastName === null||user.lastName === ""){
                document.getElementById("lnValid").textContent = null;
            }
            else if (!/^[A-Za-z ]+$/.test(user.lastName)){
                document.getElementById("lnValid").textContent = 'Name must contain only letters';
                validations = false;
            }
            else if (user.lastName.trim()===""){
                document.getElementById("lnValid").textContent  = 'Name must not be made of only white spaces'
                validations = false;
            }
            else{
                document.getElementById("lnValid").textContent = null;
                user.lastName = user.lastName.trim();
            }

            user.email = document.getElementById('email').value;
            if(user.email===null||user.email === ""){
                document.getElementById("eValid").textContent = null;
            }
            else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(user.email.trim())){
                document.getElementById("eValid").textContent = null;
                user.email = user.email.trim();
            }
            else {
                document.getElementById("eValid").textContent = 'Email format unknown';
                validations = false;
            }

            user.phone = document.getElementById('phone').value;
            if (user.phone === null||user.phone === ""){
                document.getElementById("pValid").textContent = null;
            }
            else if(!/^\d+$/.test(user.phone.trim())){
                validations = false;
                document.getElementById("pValid").textContent = 'Phone format not supported';
            }
            else {
                document.getElementById("pValid").textContent = null;
                user.phone = user.phone.trim();
            }

            if(!validations){
                console.log("Check your fields");
                return;
            }
            UserService.put(user).then((resp)=>{
                console.log(user.username + ' has been updated. Please log out for the changes to be applied.');
            }).catch((error)=>{
                console.log(error);
            });
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
                    <p1 id='unValid' style={{
                        color: 'red',
                    }}></p1>
                    <br/>
                    <label>Password: </label>
                    <input 
                    placeholder='password'
                    name='password'
                    className='form-control'
                    type='password' 
                    id='password'
                    />
                    <p1 id='pwValid' style={{
                        color: 'red',
                    }}></p1>
                    <br/>
                    <label>Password Confirmation: </label>
                    <input 
                    placeholder='password confirmation'
                    name='passwordConfirmation'
                    className='form-control'
                    type='password' 
                    id='passwordConfirmation'
                    />
                    <p1 id='pwcValid' style={{
                        color: 'red',
                    }}></p1>
                    <br/>
                    <label>First Name: </label>
                    <input 
                    placeholder='firstName'
                    name='First'
                    className='form-control'
                    type='text' 
                    id='firstName'
                    />
                    <p1 id='fnValid' style={{
                        color: 'red',
                    }}></p1>
                    <br/>
                    <label>Last Name: </label>
                    <input 
                    placeholder='Last'
                    name='lastName'
                    className='form-control'
                    type='text' 
                    id='lastName'
                    />
                    <p1 id='lnValid' style={{
                        color: 'red',
                    }}></p1>
                    <br/>
                    <label>Email: </label>
                    <input 
                    placeholder='email@example.com'
                    name='email'
                    className='form-control'
                    type='text' 
                    id='email'
                    />
                    <p1 id='eValid' style={{
                        color: 'red',
                    }}></p1>
                    <br/>
                    <label>Phone: </label>
                    <input 
                    placeholder='phone'
                    name='phone'
                    className='form-control'
                    type='text' 
                    id='phone'
                    />
                    <p1 id='pValid' style={{
                        color: 'red',
                    }}></p1>
                    <br/>
                    <button className="btn btn-success" 
                    onClick={submit}>
                        Submit
                    </button>
                    <button className="btn btn-danger" 
                    onClick={this.cancel}
                    style={{marginLeft: "10px"}}>
                        Cancel
                    </button>
                </form>
            </div>
        )
    }
}
export default UpdateAccount;