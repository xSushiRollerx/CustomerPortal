import React, {Component} from 'react';
import { Nav, Navbar } from 'react-bootstrap';

class FooterComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {
        return (
            <div>
                <Navbar>
                    <Nav.Link href="admin">admin</Nav.Link>
                    <Nav.Link href="driver">driver</Nav.Link>
                </Navbar>
                <footer className="footer">
                    <span className="text-muted"> All Rights Reserved 2021 SushiBytes</span>
                </footer>
            </div>
        );
    }
}

export default FooterComponent;
