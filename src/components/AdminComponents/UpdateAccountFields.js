import React, { Component } from 'react'
import UserService from '../../services/UserService'

class UpdateAccountFields extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this);
    }
    submit = (e) => {
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
        user.username = document.getElementById('username2').value;
        if (user.username===null||typeof(user.username)==='undefined'){

        }
        else {
            user.username=user.username.trim();
        }
        
        user.password = document.getElementById('password2').value;
        let passwordConfirm = document.getElementById('passwordConfirmation2').value;
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
        
        user.firstName = document.getElementById('firstName1').value;
        if (user.firstName === null||user.firstName === ""||typeof(user.firstName)==='undefined'){
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
        
        user.lastName = document.getElementById('lastName2').value;
        if (user.lastName === null||user.lastName === ""||typeof(user.lastName)==='undefined'){
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
            user.firstName = user.firstName.trim();
        }

        user.email = document.getElementById('email2').value;
        if(user.email===null||user.email === ""||typeof(user.email)==='undefined'){
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

        user.phone = document.getElementById('phone2').value;
        if (user.phone === null||user.phone === ""||typeof(user.phone)==='undefined'){
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
        console.log(user);
        UserService.updateUser(this.props.name, user).then((resp)=>{
            console.log(user.username + ' has been updated.');
        }).catch((error)=>{
            console.log(error);
        });
    };
    cancel = (e)=> {
        e.preventDefault();
        this.props.history.push('profile');
    };
    render() {
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
                    id='username2'
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
                    id='password2'
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
                    id='passwordConfirmation2'
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
                    id='firstName1'
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
                    id='lastName2'
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
                    id='email2'
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
                    id='phone2'
                    />
                    <p1 id='pValid' style={{
                        color: 'red',
                    }}></p1>
                    <br/>
                    <button className="btn btn-success" 
                    onClick={this.submit}>
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
export default UpdateAccountFields;