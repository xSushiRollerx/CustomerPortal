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
        marginBottom: 0
    },
    image: {
        textAlign: 'center',
        top: '50%',
        marginTop: 0
    },
    p: {
        margin: 0,
        fontSize: 12
    },
    card: {
        paddingLeft: 20,
        marginBottom:0
    }
});

export default function RestaurantResult(props) {

    const style = useStyles();

    return (
        <Grid item xs={12} className={style.card}>
            <Grid container direction="row" justify="flex-start" xs={12}>
                <Grid container item justify="center" alignItems="center" xs={4}>Image</Grid>
                <Grid item>
                    <Grid container direction="column" justify="flex-start" alignItems="stretch">
                        <h6>Restaurant Name</h6>
                        <p className={style.p}>rating</p>
                        <p className={style.p}>price category</p>
                        <Grid item className={style.tags}>
                            <Grid container direction="row" justify="flex-start" spacing={1}>
                                <Chip label={"hey"} variant="outlined" size="small" className={style.tag} />
                                <Chip label={"hola"} variant="outlined" size="small" className={style.tag} />
                                <Chip label={"howdy"} variant="outlined" size="small" className={style.tag} />
                                <Chip label={"hello"} variant="outlined" size="small" className={style.tag} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider orientation="horizontal" flexItem className={style.divider} />
        </Grid>
        );
}