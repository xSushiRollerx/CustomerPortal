import React, { Component, useState } from 'react';
import UserService from '../../services/UserService';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import jwt_decode from 'jwt-decode';
import { withRouter } from "react-router";
import { Redirect } from 'react-router-dom';

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: {},
        user_loaded: false,
        redirect: false,
    }
  }
  //loads in user
  //keeps user fields hidden when the user cannot be loaded
  componentDidMount() {
    try{
      UserService.get().then(res => {
        this.setState({user: res.data});
        this.setState({user_loaded: true});
      }).catch((error)=>{
        console.log(error);
        this.setState({user_loaded: false});
      });
    }
    catch(e){
      console.log(e);
    }
    
  }
  render (){
    //exits to root page on successful closing of the account
    function closeAccount() {
      if(localStorage.getItem("jwt")!==null&&document.getElementById('confirmation').value===jwt_decode(localStorage.getItem("jwt")).sub){
        try{
          UserService.delete().then(resp => {
            console.log('User account deleted');
            localStorage.removeItem('jwt');
            this.props.history.push('login');
          }).catch((e)=>{
            console.log(e);
          });
        }
        catch(e){
          console.log(e);
        }
      }
      else{
        document.getElementById('confirmation_mismatch').textContent='Username mismatch';
      }
    }
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
              <br/>
              <p1 id='confirmation_mismatch' style={{color:'red'}}></p1>
              <br/>
              <button onClick={closeAccount}>submit</button>
            </div>
          </Collapse>
        </>
      );
    }
    return (
      <div>
        {this.state.redirect?<Redirect push to='/login'/>:null}
        <h1>Welcome to the User Info </h1>
        {this.state.user_loaded?(
          <div>
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
            <button onClick={()=>{this.props.history.push('update');}}>Update your Account</button>
          </div>
          <div>
            <CloseConfirmation/>
          </div>
          </div>
        ):null}        
    </div>
    );
    }
  }

  export default withRouter(UserInfo);