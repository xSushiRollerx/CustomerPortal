import React, { Component } from 'react'
import AuthenticationService from '../../services/AuthenticationService'
import jwt_decode from 'jwt-decode'

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            passwordValid: false,
            usernameValid: false,
        }
        this.cancel = this.cancel.bind(this);
        this.login = this.login.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUsername = this.handleChangeUsername.bind(this);
    }
    cancel = (e)=> {
        e.preventDefault();
        this.props.history.push('/');
    };
    //sends user to home page on login
    login = (e) => {
        e.preventDefault();
        if(!(this.state.passwordValid&&this.state.usernameValid)){
            return;
        }
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

    handleChangeUsername(){
        let username = document.getElementById('username').value;
        if (username===null||username.trim()===""){
            document.getElementById('uValid').textContent = "Username invalid";
            this.setState({usernameValid: false});
        }
        else{
            document.getElementById('uValid').textContent = null;
            this.setState({usernameValid: true});
        }
    };
    handleChangePassword(){
        let password = document.getElementById('password').value;
        if (password==="" || password===null){
            document.getElementById("pwValid").textContent = 'Password cannot be empty';
            this.setState({passwordValid: false});
        }
        else if (password.length <= 6 || password.length >= 20) {
            document.getElementById("pwValid").textContent = 'Password length should be between 6 and 20 exclusive';
            this.setState({passwordValid: false});
        }
        else {
            document.getElementById("pwValid").textContent = null;
            this.setState({passwordValid: true});
        }
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
                    onChange={this.handleChangeUsername}
                    />
                    <p id='uValid'></p>
                    <br/>
                    <label>Password: </label>
                    <input 
                    placeholder='password'
                    name='password'
                    className='form-control'
                    type='password' 
                    id='password'
                    onChange={this.handleChangePassword}
                    />
                    <p id='pwValid'></p>
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
