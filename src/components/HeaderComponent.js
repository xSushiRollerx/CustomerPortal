import React, {Component} from 'react';
import { DropdownButton, Nav, Navbar } from 'react-bootstrap';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state= {
        }
    }

    render() {
        //Retrieved from https://material-ui.com/components/tabs/
        // function LinkTab(props) {
        // return (
        //     <Tab
        //     component="a"
        //     onClick={(event) => {
        //         event.preventDefault();
        //     }}
        //     {...props}
        //     />
        // );
        // }
        // function a11yProps(index) {
        // return {
        //     id: `nav-tab-${index}`,
        //     "aria-controls": `nav-tabpanel-${index}`
        // };
        // }
        return (
            <div>
                <header>
                    <title>Customer Portal Application</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href ="/" className="navbar-brand">Customer Portal App</a> </div>
                    </nav>
                </header>
                {/* <AppBar position="static">
                    <Tabs variant="fullWidth"
                        aria-label="nav tabs example" >
                        <LinkTab label="orders" onClick={()=>{this.props.history.push("orders")}} {...a11yProps(0)} />
                    </Tabs>
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                        Navigation
                        </Typography>
                    </Toolbar>
                </AppBar> */}
                {/** 
                 * Figured out that you need to wrap with router to allow history push to happen
                */}
                <Navbar>
                    <Nav.Link onClick={()=>{this.props.history.push('orders');}}>Make new order</Nav.Link>
                    <Nav.Link onClick={()=>{this.props.history.push('cart');}}>Cart</Nav.Link>
                    <Nav.Link onClick={()=>{this.props.history.push('restaurants');}}>Restaurants</Nav.Link>
                    <Nav.Link onClick={()=>{this.props.history.push('news');}}>News</Nav.Link>
                </Navbar>
                <DropdownButton title="Account">
                    <DropdownItem onClick={()=>{this.props.history.push('profile');}} >Profile</DropdownItem>
                    <DropdownItem onClick={()=>{this.props.history.push('login');}} >Log In</DropdownItem>
                    <DropdownItem onClick={()=>{localStorage.removeItem('jwt');this.props.history.push('login');}} >Log Out</DropdownItem>
                    <DropdownItem onClick={()=>{this.props.history.push('register');}}>Register</DropdownItem>
                </DropdownButton>
            </div>
        );
    }
}

export default withRouter(HeaderComponent);