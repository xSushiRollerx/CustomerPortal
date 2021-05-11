import React, { Component, useState } from 'react'
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router';
import UserService from '../services/UserService'
import Button from 'react-bootstrap/Button'
import Collapse from 'react-bootstrap/Collapse'

function isLoggedIn() {
  let token = localStorage.getItem('jwt');
  return token;
}

export default class UserInfo extends Component {
  
  render (){
    function closeAccount() {
      alert('Not implemented yet');
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
              <button onClick={closeAccount}>submit</button>
            </div>
          </Collapse>
        </>
      );
    }
    return (
    <div className="UserInfo">
      <header className="User-header" >
        <h1>Welcome to the User Info </h1>
        <button onClick={isLoggedIn}>Render Name</button>
      </header>
      <div>
        <a href='../update'>Update your Account</a>
      </div>
      <CloseConfirmation/>
    </div>
    );
    }
  }