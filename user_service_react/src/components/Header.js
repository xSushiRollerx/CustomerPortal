import React, { Component } from 'react'

class Header extends Component {


    render() {
        return (
            <div>
                <header className="text-center">
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href='https://javaguides.net' className='navbar-brand'>SushiBytes</a></div>
                    </nav>
                </header>
                

            </div>
        )
    }
}

export default Header;