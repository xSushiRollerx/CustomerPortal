
import React, {Component} from 'react';
import AccountDropdown from "./AccountDropdown"
import Login from "./Login"

class UserPortal extends Component {
    constructor(props) {
        super(props);
        this.state= {
        };
    }
    render() {
        return (
            <div>
                <h1> User Portal </h1>
                <div className="tab">
                <button className="tablinks" >Make New Order</button>
                <button className="tablinks" >Track Delivery</button>
                <button className="tablinks" >Restaurants</button>
                <button className="tablinks" >News and Updates</button>
                <AccountDropdown/>
                <Login/>
                </div>
                <h2>{this.state.jwt}</h2>
            </div>
        );
    }
}

export default UserPortal;