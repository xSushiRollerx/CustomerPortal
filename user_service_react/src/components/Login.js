import React, { Component } from 'react'
import AuthenticationService from '../services/AuthenticationService'

export default class Login extends Component {
    render() {
        function login(e) {
            e.preventDefault();
            let authrequest = {
                username: null,
                password: null
            }
            authrequest.username = document.getElementById('username').value;
            authrequest.password = document.getElementById('password').value;
            AuthenticationService.login(authrequest).then((resp)=>{
                localStorage.setItem("jwt",resp.data.jwt);
            }).catch((error)=>{
                alert(error);
            });
        };
        function cancel(e) {
            e.preventDefault();
            alert("Not implemented yet")
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
                    <button className="btn btn-success" 
                    onClick={login}>
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
