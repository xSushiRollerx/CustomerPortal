import React from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tags: {
        marginTop: 8,
        marginBottom: 8
    },
    tag: {
        marginRight: 8,
        fontSize: 12
    },
    divider: {
        marginTop: 10,
        marginBottom: 10
    },
    image: {
        textAlign: 'center',
        top: '50%',
        marginTop: 0
    },
    p: {
        margin: 0,
        fontSize: 14
    },
    card: {
        paddingRight: 20,
        marginBottom: 0
    }
});

export default function SearchFilter(props) {

    const style = useStyles();

    return (
        <Grid container direction="column" justify="flex-start" alignItems="stretch" className={style.card}>
            <h5>Location</h5>
            <p className={style.p}>1234 Main St</p>
            <p className={style.p}>Principal, GX</p>
            <p className={style.p}>67890</p>
            <Divider orientation="horizontal" flexItem className={style.divider} />
            <h5>Filters</h5>
            <p className={style.p}>Rating - Select</p>
            <p className={style.p}>Price Category - Checkbox</p>
        </Grid>
    );
}