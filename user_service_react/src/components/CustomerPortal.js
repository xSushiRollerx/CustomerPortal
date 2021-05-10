
import React, {Component} from 'react';
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Login from "./Login"
import UserInfo from "./UserInfo"
import Register from "./Register"
import UpdateAccount from "./UpdateAccount"
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';

class UserPortal extends Component {
    constructor(props) {
        super(props);
        this.state= {
            redirect: false,
        };
        this.logout = this.logout.bind(this)
    };
    logout() {
        localStorage.removeItem('jwt');
        this.setState({ redirect: true });
    };
    render() {
        return (
            <div>
                { this.state.redirect ? (<Redirect push to="/login"/>) : null }
                <h1> User Portal </h1>
                <div className="tab">
                <button className="tablinks" >Make New Order</button>
                <button className="tablinks" >Track Delivery</button>
                <button className="tablinks" >Restaurants</button>
                <button className="tablinks" >News and Updates</button>
                <DropdownButton title="Account">
                    <DropdownItem href="/profile" >Profile</DropdownItem>
                    <DropdownItem href="/login" >Log In</DropdownItem>
                    <DropdownItem onClick={this.logout} >Log Out</DropdownItem>
                    <DropdownItem href="/register">Register</DropdownItem>
                </DropdownButton>
                <Router>
                    <Switch>
                        <Route path = "/login" exact component = {Login}></Route>
                        <Route path = "/register" exact component = {Register}></Route>
                        <Route path = "/profile" exact component = {UserInfo}></Route>
                        <Route path = "/update" exact component = {UpdateAccount}></Route>
                    </Switch>
                </Router>
                
                </div>
            </div>
        );
    }
}

export default UserPortal;