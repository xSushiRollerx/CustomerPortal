import React, { Component, useState } from 'react'
import UserService from '../../services/UserService'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {},
        user_loaded: false,
    }
  }
  componentDidMount() {
    try{
      UserService.read().then(res => {
        this.setState({user: res.data});
        this.setState({user_loaded: true});
      }).catch((error)=>{
        console.log(error);
      });
    }
    catch(e){
      console.log(e);
    }
    
  }
  closeAccount() {
    try{
      UserService.delete().then(resp => {
        this.props.history.push('/login');
      }).catch((e)=>{
        console.log(e);
      });
    }
    catch(e){
      console.log(e);
    }
  }
  render (){
    function CloseConfirmation() {
      const [open, setOpen] = useState(false);
      return (
        <>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Close Account
          </Button>
          <Collapse in={open}>
            <div id="example-collapse-text">
              <input id='confirmation' type='text'></input>
              <br/>
              <p1>Type your username to confirm the closing of your account</p1>
              <button onClick={this.closeAccount}>submit</button>
            </div>
          </Collapse>
        </>
      );
    }
    return (
    <div className="UserInfo">
        <h1>Welcome to the User Info </h1>
        <Collapse in={this.state.user_loaded}>
          <h2>Username: </h2>
          <p1 id='username'>{this.state.user.username}</p1>
          <h2>First Name:</h2>
          <p1 id='firstName'>{this.state.user.firstName}</p1>
          <h2>Last Name:</h2>
          <p1 id='lastName'>{this.state.user.lastName}</p1>
          <h2>Email:</h2>
          <p1 id='email'>{this.state.user.email}</p1>
          <h2>Phone:</h2>
          <p1 id='phone'>{this.state.user.phone}</p1>
          <div>
            <a href='../update'>Update your Account</a>
          </div>
        <CloseConfirmation/>
        </Collapse>
        
    </div>
    );
    }
  }