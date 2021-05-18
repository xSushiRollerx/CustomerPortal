import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import MenuItem from './FoodItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

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

export default function AddToCart() {

    const style = useStyles();

    return (null);
}