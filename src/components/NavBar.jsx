import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    navBar: {
        padding:30,
        display: "flex",
        justifyContent: "center",
	}

}));

export default function NavBar() {
    const style = useStyles();
    const handleClick = () => {

    };

    return (
       
        <Breadcrumbs aria-label="breadcrumb" className={style.navBar}>
            <Link color="inherit" href="/login">Login</Link>
            <Link color="inherit" href="/register">Register</Link>
            <Link color="inherit" href="/cart">Cart</Link>
        </Breadcrumbs>
        
        );
}