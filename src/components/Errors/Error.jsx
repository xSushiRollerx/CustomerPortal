import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

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

export default function Error() {
    const { error } = useParams();
    const style = useStyles();
    const [message, setMessage] = useState("Loading");

    useEffect(() => {
        if (error === "44") {
            setMessage("The Check Out Page Can Only Be Accessed From The Order Cart.");
        }
    }, [])

    console.log(error);
    console.log(message);
    return (
        <Grid container direction="column" justify="center" alignItems="center" >
            <h2>{message}</h2>
        </Grid>);
}