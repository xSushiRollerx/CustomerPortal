
import React, {Component} from 'react';
import { DropdownButton, Nav, Navbar } from 'react-bootstrap';
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
                <h1> Main Customer Portal </h1>
                <Navbar>
                    <Nav.Link href="make_order">Make new order</Nav.Link>
                    <Nav.Link href="tracking">Make new order</Nav.Link>
                    <Nav.Link href="restaurants">Make new order</Nav.Link>
                    <Nav.Link href="news">Make new order</Nav.Link>
                </Navbar>
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
                        <Route path = "/put" exact component = {UpdateAccount}></Route>
                    </Switch>
                </Router>
                <Navbar>
                    <Nav.Link href="admin">admin</Nav.Link>
                    <Nav.Link href="driver">driver</Nav.Link>
                </Navbar>
            </div>
        );
    }
}

export default UserPortal;