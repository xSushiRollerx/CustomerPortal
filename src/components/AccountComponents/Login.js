import React, { Component } from 'react'
import AuthenticationService from '../../services/AuthenticationService'
import jwt_decode from 'jwt-decode'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
        this.cancel = this.cancel.bind(this);
        this.login = this.login.bind(this);
    }
    cancel = (e)=> {
        e.preventDefault();
        this.props.history.push('/');
    };
    //sends user to home page on login
    login = (e) => {
        e.preventDefault();
        let authrequest = {
            username: null,
            password: null
        }
        authrequest.username = document.getElementById('username').value;
        authrequest.password = document.getElementById('password').value;
        AuthenticationService.post(authrequest).then((resp)=>{
            localStorage.setItem("jwt",resp.data.jwt);
            localStorage.setItem("userId", jwt_decode(resp.data.jwt).sub);
            this.props.history.push('/');
        }).catch((error)=>{
            console.log(error);
        });
    };
    render() {
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
                    onClick={this.login}>
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
