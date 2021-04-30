import React, { Component } from 'react'
import { DropdownButton } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

export default class AccountDropdown extends Component {
    render() {
        return (
            <DropdownButton title="Account">
                <DropdownItem href="/login" >Log In</DropdownItem>
                <DropdownItem href="/register">Register</DropdownItem>
            </DropdownButton>
        )
    }
}