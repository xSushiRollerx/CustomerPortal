import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    divider: {
        marginBottom: 10,
        marginTop: 20
    },
});

export default function CheckoutRedirect() {

    const style = useStyles();

    return (
        <Redirect to="/error/44"/>);
}