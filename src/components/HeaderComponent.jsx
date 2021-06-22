import React, {Component} from 'react';
import { withRouter } from "react-router";
import NavigationDrawer from "../components/Navigation/NavigationDrawer"

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state= {
        }
    }

    render() {
        return (
            <div>
                <header>
                    <title>Customer Portal Application</title>
                </header>
                <NavigationDrawer/>
            </div>
        );
    }
}

export default withRouter(HeaderComponent);