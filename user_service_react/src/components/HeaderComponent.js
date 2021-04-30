
import React, {Component} from 'react';

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
                    <title>User Service Application</title>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous"/>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href ="/" className="navbar-brand">User Service App</a> </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;